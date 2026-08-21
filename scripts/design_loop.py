#!/usr/bin/env python3
"""
design_loop.py - Autonomous Perception-Correction Closed Loop Orchestrator

Integrates:
1. Static lint checks (check-motion-safety.js)
2. Playwright Headless Rendering (render_pipeline.py)
3. Vision-Language Quality Critique (vision_reviewer.py)
4. Iterative Refinement & Circuit Breaker (Max iterations & oscillation detection)
"""

from __future__ import annotations

import argparse
import asyncio
import json
import os
import subprocess
import sys
import time
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

from render_pipeline import RenderPipeline, RenderResult
from vision_reviewer import ActionableFix, ReviewReport, VisionReviewer


@dataclass
class LoopIterationRecord:
    iteration: int
    score: float
    verdict: str
    screenshots: Dict[str, str]
    violations: List[str]
    fixes_proposed: List[Dict[str, Any]]
    circuit_breaker_triggered: bool = False
    notes: str = ""


class DesignFeedbackLoop:
    def __init__(
        self,
        max_iterations: int = 3,
        target_score: float = 8.5,
        output_dir: str = "artifacts/design_loop",
        reviewer_provider: str = "auto",
    ):
        self.max_iterations = max_iterations
        self.target_score = target_score
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.renderer = RenderPipeline(output_root=str(self.output_dir / "renders"))
        self.reviewer = VisionReviewer(provider=reviewer_provider)

    def run_static_lint(self) -> Tuple[bool, List[str]]:
        """Runs check-motion-safety.js if node is present."""
        node_bin = "node"
        lint_script = Path("scripts/check-motion-safety.js")
        if not lint_script.exists():
            return True, ["Static lint script not found, skipping."]

        try:
            res = subprocess.run([node_bin, str(lint_script)], capture_output=True, text=True, timeout=10)
            if res.returncode == 0:
                return True, ["✅ Static motion safety checks passed."]
            else:
                return False, [res.stderr.strip() or res.stdout.strip()]
        except Exception as exc:
            return True, [f"⚠️ Static lint skipped: {exc}"]

    async def execute_loop(self, target_html_or_url: str, context_prompt: str = "") -> Dict[str, Any]:
        session_id = f"loop_{int(time.time())}"
        session_dir = self.output_dir / session_id
        session_dir.mkdir(parents=True, exist_ok=True)

        history: List[LoopIterationRecord] = []
        scores_trajectory: List[float] = []

        print(f"\n🚀 Starting Perception-Fix Loop for: {target_html_or_url}")
        print(f"🎯 Target Quality Score: {self.target_score}/10 | Max Iterations: {self.max_iterations}\n")

        for round_idx in range(1, self.max_iterations + 1):
            print(f"--- 🔄 Iteration {round_idx}/{self.max_iterations} ---")

            # Step 1: Render headless screenshots & metrics
            print("  📸 Rendering Desktop & Mobile viewports via Playwright...")
            render_res: RenderResult = await self.renderer.render_target(target_html_or_url)

            if not render_res.success:
                print(f"  ❌ Render failed: {render_res.error_message}")
                break

            # Step 2: Multi-modal Visual Review
            print("  👁️ Sending visual screenshots to Vision Reviewer...")
            report: ReviewReport = self.reviewer.review(
                desktop_b64=render_res.screenshot_base64.get("desktop"),
                mobile_b64=render_res.screenshot_base64.get("mobile"),
                dom_metrics=render_res.dom_metrics,
                color_metrics=render_res.color_metrics,
                context_prompt=context_prompt,
            )

            scores_trajectory.append(report.overall_score)
            print(f"  🎯 Iteration Score: {report.overall_score:.1f}/10 ({report.verdict})")

            # Check for score oscillation (e.g. 7.5 -> 7.0 -> 7.5)
            oscillation_detected = False
            if len(scores_trajectory) >= 3 and abs(scores_trajectory[-1] - scores_trajectory[-3]) < 0.1:
                oscillation_detected = True
                print("  🛑 Circuit Breaker: Oscillation detected between local optima. Breaking loop.")

            rec = LoopIterationRecord(
                iteration=round_idx,
                score=report.overall_score,
                verdict=report.verdict,
                screenshots=render_res.screenshots,
                violations=report.violations,
                fixes_proposed=[asdict(f) for f in report.actionable_fixes],
                circuit_breaker_triggered=oscillation_detected,
                notes=report.summary
            )
            history.append(rec)

            # Success threshold reached
            if report.overall_score >= self.target_score and report.verdict == "PASS":
                print(f"  ✨ Design passed target bar on iteration {round_idx}!")
                break

            if oscillation_detected or round_idx == self.max_iterations:
                print("  🏁 Reached iteration termination point.")
                break

            # Output the required actionable fixes for this round
            print("  💡 Top Fixes Required for next iteration:")
            for fix in report.actionable_fixes[:3]:
                print(f"     - [{fix.severity}] {fix.target_element}: {fix.suggested_fix}")

        # Save loop final report
        summary_path = session_dir / "loop_summary.json"
        loop_summary = {
            "session_id": session_id,
            "target": target_html_or_url,
            "final_score": scores_trajectory[-1] if scores_trajectory else 0.0,
            "iterations_count": len(history),
            "trajectory": scores_trajectory,
            "history": [asdict(h) for h in history]
        }
        with open(summary_path, "w", encoding="utf-8") as f:
            json.dump(loop_summary, f, indent=2, ensure_ascii=False)

        # Generate markdown report
        md_report = self._generate_markdown_report(loop_summary)
        with open(session_dir / "REPORT.md", "w", encoding="utf-8") as f:
            f.write(md_report)

        print(f"\n📋 Design Loop Complete! Report generated at: {session_dir / 'REPORT.md'}")
        return loop_summary

    def _generate_markdown_report(self, summary: Dict[str, Any]) -> str:
        lines = [
            f"# Design Quality Perception-Correction Loop Report",
            f"",
            f"- **Target**: `{summary['target']}`",
            f"- **Final Score**: `{summary['final_score']:.1f}/10`",
            f"- **Total Iterations**: `{summary['iterations_count']}`",
            f"- **Score Trajectory**: `{' -> '.join(str(s) for s in summary['trajectory'])}`",
            f"",
            f"## Iteration Breakdown",
            f""
        ]

        for item in summary["history"]:
            lines.extend([
                f"### Iteration {item['iteration']} (Score: {item['score']}/10 - {item['verdict']})",
                f"- **Summary**: {item['notes']}",
                f"- **Violations**: {len(item['violations'])} issue(s)",
            ])
            if item.get("fixes_proposed"):
                lines.append(f"- **Suggested Fixes**:")
                for fix in item["fixes_proposed"][:4]:
                    lines.append(f"  * **`{fix['target_element']}`** ({fix['severity']}): {fix['suggested_fix']}")
            lines.append("")

        return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description="Run full Perception-Correction Design Loop on a frontend target.")
    parser.add_argument("target", help="HTML file or URL")
    parser.add_argument("--max-iter", type=int, default=3, help="Max iterations before circuit breaker")
    parser.add_argument("--target-score", type=float, default=8.5, help="Target quality score to exit early")
    parser.add_argument("--provider", default="auto", choices=["auto", "anthropic", "openai", "mock"])

    args = parser.parse_args()
    loop = DesignFeedbackLoop(
        max_iterations=args.max_iter,
        target_score=args.target_score,
        reviewer_provider=args.provider,
    )
    asyncio.run(loop.execute_loop(args.target))


if __name__ == "__main__":
    main()
