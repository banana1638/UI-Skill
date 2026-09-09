#!/usr/bin/env python3
"""
patch_generator.py - Autonomous Frontend Patch Synthesis & Safe Application

Translates structured ActionableFix recommendations from VisionReviewer into
concrete, validated code diffs and applies them to target source files.
Features structural integrity defenses and safe rollback on validation failure.
"""

from __future__ import annotations

import difflib
import os
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Dict, List, Optional

from vision_reviewer import ActionableFix


@dataclass
class PatchResult:
    success: bool
    diff: str = ""
    error: Optional[str] = None
    patched_file: Optional[str] = None


class PatchGenerator:
    def __init__(
        self,
        provider: str = "auto",
        api_key: Optional[str] = None,
    ):
        self.provider = provider
        self.api_key = api_key or os.getenv("ANTHROPIC_API_KEY") or os.getenv("OPENAI_API_KEY")

    def apply_fixes(self, target_file: Path, fixes: List[ActionableFix]) -> PatchResult:
        """Applies a list of ActionableFix suggestions to a target file safely."""
        if not fixes:
            return PatchResult(success=True, diff="", patched_file=str(target_file))

        if not target_file.exists() or not target_file.is_file():
            return PatchResult(
                success=False,
                error=f"Target file does not exist or is not a file: {target_file}",
            )

        try:
            original_content = target_file.read_text(encoding="utf-8")
        except Exception as exc:
            return PatchResult(success=False, error=f"Failed to read {target_file}: {exc}")

        # Choose patch strategy
        active_provider = self._resolve_provider()
        try:
            if active_provider == "anthropic":
                patched_content = self._patch_with_anthropic(original_content, fixes)
            elif active_provider == "openai":
                patched_content = self._patch_with_openai(original_content, fixes)
            else:
                patched_content = self._patch_with_mock_rules(original_content, fixes)

            # Defensive validation: ensure content integrity before writing
            self._validate_html_integrity(original_content, patched_content)

            diff = self._compute_diff(original_content, patched_content, filename=target_file.name)
            if diff:
                target_file.write_text(patched_content, encoding="utf-8")
                return PatchResult(success=True, diff=diff, patched_file=str(target_file))
            else:
                return PatchResult(success=True, diff="", patched_file=str(target_file))
        except Exception as exc:
            return PatchResult(success=False, error=str(exc))

    def _has_module(self, mod_name: str) -> bool:
        import importlib.util
        return importlib.util.find_spec(mod_name) is not None

    def _resolve_provider(self) -> str:
        if (self.provider == "anthropic" or (self.provider == "auto" and os.getenv("ANTHROPIC_API_KEY"))) and self._has_module("anthropic"):
            return "anthropic"
        elif (self.provider == "openai" or (self.provider == "auto" and os.getenv("OPENAI_API_KEY"))) and self._has_module("openai"):
            return "openai"
        return "mock"

    def _validate_html_integrity(self, original: str, patched: str) -> None:
        """Defensive validation: prevents LLM truncation or destruction of document structure."""
        orig_len = len(original.strip())
        patch_len = len(patched.strip())

        if patch_len < orig_len * 0.4:
            raise ValueError(
                f"Patched output suspiciously truncated ({patch_len} chars vs original {orig_len} chars). Refusing to apply."
            )

        # Ensure essential structure tags are preserved
        for tag in ["<html", "</html>", "<body", "</body>"]:
            if tag in original and tag not in patched:
                raise ValueError(
                    f"Structural tag '{tag}' missing in patched output. Refusing to corrupt target file."
                )

    def _build_patch_prompt(self, original: str, fixes: List[ActionableFix]) -> str:
        fix_lines = [
            f"- [{f.severity}] Target: `{f.target_element}`\n  Issue: {f.issue}\n  Required Fix: {f.suggested_fix}"
            for f in fixes
        ]
        fix_summary = "\n\n".join(fix_lines)

        return (
            "You are an expert frontend engineer and UI/UX systems specialist.\n"
            "Below is a source file and a prioritized list of actionable design fixes to apply.\n\n"
            "### REQUIRED FIXES:\n"
            f"{fix_summary}\n\n"
            "### RULES:\n"
            "1. Apply ONLY the specified fixes.\n"
            "2. Preserve all existing structure, components, styles, scripts, and content not mentioned in the fixes.\n"
            "3. Output the COMPLETE updated file content directly with NO markdown wrapping, NO backticks, and NO conversational comments.\n\n"
            "### ORIGINAL FILE:\n"
            f"{original}"
        )

    def _patch_with_anthropic(self, original: str, fixes: List[ActionableFix]) -> str:
        import importlib
        anthropic = importlib.import_module("anthropic")
        client = anthropic.Anthropic(api_key=self.api_key)
        prompt = self._build_patch_prompt(original, fixes)

        response = client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=8192,
            messages=[{"role": "user", "content": prompt}],
        )
        content = response.content[0].text.strip()
        # Clean potential markdown fences if model inadvertently included them
        fence_match = re.match(r"^```(?:html|css|javascript)?\s*([\s\S]*?)\s*```$", content)
        if fence_match:
            content = fence_match.group(1).strip()
        return content

    def _patch_with_openai(self, original: str, fixes: List[ActionableFix]) -> str:
        import importlib
        openai = importlib.import_module("openai")
        client = openai.OpenAI(api_key=self.api_key)
        prompt = self._build_patch_prompt(original, fixes)

        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You apply precise frontend patches. Return ONLY the full file content."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.1,
        )
        content = response.choices[0].message.content.strip()
        fence_match = re.match(r"^```(?:html|css|javascript)?\s*([\s\S]*?)\s*```$", content)
        if fence_match:
            content = fence_match.group(1).strip()
        return content

    def _patch_with_mock_rules(self, original: str, fixes: List[ActionableFix]) -> str:
        """Deterministic rule-based patcher for testing & offline closed-loop simulation."""
        patched = original

        for fix in fixes:
            # Rule 1: Horizontal scroll overflow fix
            if "overflow" in fix.issue.lower() or "overflow-x: clip" in fix.suggested_fix.lower():
                if "overflow-x: clip" not in patched and "overflow-x: hidden" not in patched:
                    if "</head>" in patched:
                        fix_css = "\n  <style>\n    html, body { max-width: 100vw; overflow-x: clip; box-sizing: border-box; }\n  </style>\n"
                        patched = patched.replace("</head>", f"{fix_css}</head>")
                    elif "<body" in patched:
                        patched = re.sub(r'(<body[^>]*>)', r'\1\n<style>html, body { overflow-x: clip; }</style>', patched)

            # Rule 2: Low hue spread / monochrome palette enrichment
            if "monochrome" in fix.issue.lower() or "hue spread" in fix.issue.lower():
                if ":root" in patched and "--color-accent-warm" not in patched:
                    patched = patched.replace(
                        ":root {",
                        ":root {\n    --color-accent-warm: #f97316; /* Injected secondary accent */"
                    )

            # Rule 3: Browser fallback font declaration
            if "fallback font" in fix.issue.lower() or "font stack" in fix.suggested_fix.lower():
                if "font-family" in patched:
                    patched = re.sub(
                        r'font-family:\s*[^;]+;',
                        "font-family: 'Inter', system-ui, -apple-system, sans-serif;",
                        patched,
                        count=1
                    )

        return patched

    def _compute_diff(self, original: str, patched: str, filename: str = "file") -> str:
        """Computes a git-like unified diff string between original and patched contents."""
        lines_orig = original.splitlines(keepends=True)
        lines_patch = patched.splitlines(keepends=True)
        diff = difflib.unified_diff(
            lines_orig,
            lines_patch,
            fromfile=f"a/{filename}",
            tofile=f"b/{filename}",
            n=3,
        )
        return "".join(diff)
