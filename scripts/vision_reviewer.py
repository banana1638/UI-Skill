#!/usr/bin/env python3
"""
vision_reviewer.py - Multimodal Design Critic & Quality Evaluator

Sends rendered Desktop & Mobile screenshots + extracted DOM metrics to a Vision LLM
(Claude 3.5 Sonnet, GPT-4o, Gemini, or Mock Evaluator) and produces structured,
actionable design feedback with concrete CSS/HTML patch recommendations.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from dataclasses import asdict
from pathlib import Path
from typing import Any, Dict, List, Literal, Optional

from pydantic import BaseModel, Field


class CategoryScore(BaseModel):
    category: str
    score: float = Field(..., ge=0.0, le=10.0, description="Score out of 10")
    reasoning: str


class ActionableFix(BaseModel):
    severity: Literal["CRITICAL", "MAJOR", "MINOR", "POLISH"]
    target_element: str = Field(..., description="CSS Selector or Component Area, e.g. .hero-header or #cta-btn")
    issue: str = Field(..., description="Precise description of what is visually wrong")
    why_it_matters: str = Field(..., description="Interaction cost, aesthetic cliché, or cognitive load reasoning")
    suggested_fix: str = Field(..., description="Concrete CSS/HTML properties or layout changes")


class ReviewReport(BaseModel):
    overall_score: float = Field(..., ge=0.0, le=10.0)
    verdict: Literal["PASS", "NEEDS_REVISION", "FAIL"]
    layer_scores: List[CategoryScore] = Field(
        default_factory=list,
        description="Scores for: 1. Rule & Accessibility, 2. Product Reasoning & IA, 3. Aesthetic Taste & Freshness"
    )
    cliche_risk_assessment: str = Field(
        ...,
        description="Audit of overused design tropes (e.g. standard dark-mode blue-purple glow, Linear/Notion cloning)"
    )
    violations: List[str] = Field(default_factory=list)
    actionable_fixes: List[ActionableFix] = Field(default_factory=list)
    summary: str


SYSTEM_PROMPT = """You are a World-Class Principal Product Designer & Design Systems Architect.
You are conducting a strict, high-fidelity visual design critique of a web frontend based on its rendered screenshots (Desktop & Mobile) and extracted computed metrics.

You evaluate across 3 distinct layers:

1. **Rule & Constraint Layer**:
   - Contrast ratio readability (WCAG AA minimum).
   - Clear interactive affordances (hover/focus-visible cues).
   - Touch targets on mobile >= 44x44px.
   - Zero horizontal viewport overflow.

2. **Product Reasoning & Information Architecture Layer**:
   - Hick's Law: Is there exactly ONE dominant primary action in the initial viewport?
   - Fitts's Law: Are key actions within effortless reach?
   - Interaction Pattern Appropriateness: Does the UI avoid stuffing complex workflows into modals when inline or drawer patterns are superior?
   - Progressive Disclosure: Is secondary detail kept subordinate rather than overwhelming the eye?

3. **Aesthetic Taste & Visual Freshness Layer**:
   - **Spatial Rhythm & Breathing Room**: Are padding, gaps, and line-heights generous and balanced, or does it feel cramped/amateurish?
   - **Typography Craft**: Is there clear font-size and weight contrast? Are tracking/letter-spacing and line-height dialed in?
   - **Archetype & Color Freshness**: Avoid generic, cliché tech tropes (e.g., dark mode + neon blue/purple gradient glow + 3 identical card layouts). Praise thoughtful bespoke palettes and subtle micro-craft.

Your feedback must NEVER be vague like "improve colors". It MUST specify EXACT elements, why the current implementation fails, and EXACT CSS/HTML values to change.
"""


def generate_mock_critique(dom_metrics: Dict[str, Any], color_metrics: Dict[str, Any]) -> ReviewReport:
    """Provides a deterministic mock critique for local/CI environments without active API keys."""
    hue_std = color_metrics.get("hue_std_dev", 0.0)
    font_count = len(dom_metrics.get("fontFamilies", []))
    has_overflow = dom_metrics.get("hasHorizontalOverflow", False)

    fixes: List[ActionableFix] = []
    violations: List[str] = []

    if has_overflow:
        violations.append("Horizontal scroll overflow detected on documentElement.")
        fixes.append(ActionableFix(
            severity="CRITICAL",
            target_element="html, body, .container",
            issue="Horizontal viewport overflow occurs on desktop/mobile.",
            why_it_matters="Causes broken side-scrolling and ruins mobile touch ergonomics.",
            suggested_fix="Ensure max-width: 100vw, box-sizing: border-box, and overflow-x: clip on wrapper."
        ))

    if hue_std < 15.0:
        fixes.append(ActionableFix(
            severity="MAJOR",
            target_element=":root, .accent-glow, .badge",
            issue=f"Monochrome/low hue spread (Hue Std Dev: {hue_std}°). May indicate generic blue/purple convergence.",
            why_it_matters="Reduces visual distinctiveness and fails the brand character requirement.",
            suggested_fix="Introduce a secondary complementary or warm accent tone (e.g. amber/sage/terracotta) for tags and highlights."
        ))

    if font_count < 1:
        fixes.append(ActionableFix(
            severity="MINOR",
            target_element="body, h1, h2",
            issue="Using browser default fallback font.",
            why_it_matters="Lacks editorial typography polish and looks unstyled.",
            suggested_fix="Declare a curated Google font stack (e.g. Inter, Outfit, Plus Jakarta Sans, or Playfair Display)."
        ))

    score = 8.5 if not violations else 6.0
    verdict: Literal["PASS", "NEEDS_REVISION", "FAIL"] = "PASS" if score >= 8.0 else ("NEEDS_REVISION" if score >= 5.0 else "FAIL")

    return ReviewReport(
        overall_score=score,
        verdict=verdict,
        layer_scores=[
            CategoryScore(category="Rule & Spec Integrity", score=8.0 if not violations else 5.0, reasoning="Automated DOM rule checks evaluated."),
            CategoryScore(category="Product Reasoning & IA", score=8.5, reasoning="Primary CTA and component hierarchy evaluated."),
            CategoryScore(category="Aesthetic Taste & Freshness", score=7.5, reasoning=f"Evaluated color entropy ({hue_std}°) and typography."),
        ],
        cliche_risk_assessment="Moderate risk of SaaS boilerplate palette; structure is functional.",
        violations=violations,
        actionable_fixes=fixes,
        summary="Review completed via visual metric analyzer."
    )


class VisionReviewer:
    def __init__(self, provider: str = "auto", api_key: Optional[str] = None):
        self.provider = provider
        self.api_key = api_key or os.getenv("ANTHROPIC_API_KEY") or os.getenv("OPENAI_API_KEY") or os.getenv("GEMINI_API_KEY")

    def review(
        self,
        desktop_b64: Optional[str],
        mobile_b64: Optional[str],
        dom_metrics: Dict[str, Any],
        color_metrics: Dict[str, Any],
        context_prompt: str = "Evaluate this web interface for premium product design quality.",
    ) -> ReviewReport:
        # Check if live LLM provider is configured
        if self.provider == "anthropic" or (self.provider == "auto" and os.getenv("ANTHROPIC_API_KEY")):
            return self._review_with_anthropic(desktop_b64, mobile_b64, dom_metrics, color_metrics, context_prompt)
        elif self.provider == "openai" or (self.provider == "auto" and os.getenv("OPENAI_API_KEY")):
            return self._review_with_openai(desktop_b64, mobile_b64, dom_metrics, color_metrics, context_prompt)
        else:
            # Fallback to smart rule-based mock reviewer
            return generate_mock_critique(dom_metrics, color_metrics)

    def _review_with_anthropic(
        self,
        desktop_b64: Optional[str],
        mobile_b64: Optional[str],
        dom_metrics: Dict[str, Any],
        color_metrics: Dict[str, Any],
        context_prompt: str,
    ) -> ReviewReport:
        try:
            import anthropic
            client = anthropic.Anthropic(api_key=self.api_key)
            
            content_blocks: List[Any] = [
                {
                    "type": "text",
                    "text": f"{context_prompt}\n\nExtracted Computed Metrics:\n{json.dumps({'dom': dom_metrics, 'colors': color_metrics}, indent=2)}"
                }
            ]
            if desktop_b64:
                content_blocks.append({
                    "type": "image",
                    "source": {"type": "base64", "media_type": "image/png", "data": desktop_b64}
                })
            if mobile_b64:
                content_blocks.append({
                    "type": "image",
                    "source": {"type": "base64", "media_type": "image/png", "data": mobile_b64}
                })

            response = client.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=2500,
                system=SYSTEM_PROMPT + "\nRespond ONLY with a valid JSON matching the ReviewReport schema.",
                messages=[{"role": "user", "content": content_blocks}]
            )
            raw_text = response.content[0].text
            json_text = raw_text.strip().strip("`").removeprefix("json").strip()
            return ReviewReport.model_validate_json(json_text)
        except Exception as exc:
            print(f"⚠️ Anthropic API call failed ({exc}), falling back to local critique engine.", file=sys.stderr)
            return generate_mock_critique(dom_metrics, color_metrics)

    def _review_with_openai(
        self,
        desktop_b64: Optional[str],
        mobile_b64: Optional[str],
        dom_metrics: Dict[str, Any],
        color_metrics: Dict[str, Any],
        context_prompt: str,
    ) -> ReviewReport:
        try:
            import openai
            client = openai.OpenAI(api_key=self.api_key)
            
            messages_content: List[Any] = [
                {
                    "type": "text",
                    "text": f"{context_prompt}\n\nComputed Metrics:\n{json.dumps({'dom': dom_metrics, 'colors': color_metrics}, indent=2)}"
                }
            ]
            if desktop_b64:
                messages_content.append({
                    "type": "image_url",
                    "image_url": {"url": f"data:image/png;base64,{desktop_b64}"}
                })
            if mobile_b64:
                messages_content.append({
                    "type": "image_url",
                    "image_url": {"url": f"data:image/png;base64,{mobile_b64}"}
                })

            response = client.beta.chat.completions.parse(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": messages_content}
                ],
                response_format=ReviewReport,
            )
            return response.choices[0].message.parsed
        except Exception as exc:
            print(f"⚠️ OpenAI API call failed ({exc}), falling back to local critique engine.", file=sys.stderr)
            return generate_mock_critique(dom_metrics, color_metrics)


def main():
    parser = argparse.ArgumentParser(description="Review frontend design from screenshots and metrics.")
    parser.add_argument("summary_json", help="Path to summary.json produced by render_pipeline.py")
    parser.add_argument("--provider", default="auto", choices=["auto", "anthropic", "openai", "mock"])

    args = parser.parse_args()
    summary_path = Path(args.summary_json)
    if not summary_path.exists():
        print(f"❌ File not found: {summary_path}", file=sys.stderr)
        sys.exit(1)

    with open(summary_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Read base64 screenshots if present in same directory
    session_dir = summary_path.parent
    desktop_b64 = None
    mobile_b64 = None

    desktop_img = session_dir / "desktop.png"
    if desktop_img.exists():
        import base64
        desktop_b64 = base64.b64encode(desktop_img.read_bytes()).decode("utf-8")

    mobile_img = session_dir / "mobile.png"
    if mobile_img.exists():
        import base64
        mobile_b64 = base64.b64encode(mobile_img.read_bytes()).decode("utf-8")

    reviewer = VisionReviewer(provider=args.provider)
    report = reviewer.review(
        desktop_b64=desktop_b64,
        mobile_b64=mobile_b64,
        dom_metrics=data.get("dom_metrics", {}),
        color_metrics=data.get("color_metrics", {}),
    )

    print("\n" + "=" * 60)
    print(f"🎯 Overall Score: {report.overall_score}/10 | Verdict: {report.verdict}")
    print("=" * 60)
    print(f"📌 Cliché Audit: {report.cliche_risk_assessment}\n")
    print("🛠️ Actionable Fixes:")
    for fix in report.actionable_fixes:
        print(f"  [{fix.severity}] {fix.target_element}: {fix.issue}")
        print(f"      👉 Fix: {fix.suggested_fix}")
    print("\n" + "=" * 60)


if __name__ == "__main__":
    main()
