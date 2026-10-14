#!/usr/bin/env python3
"""Static semantic and interaction-contract checks for standalone HTML."""

from __future__ import annotations

import argparse
import json
from dataclasses import asdict, dataclass
from html.parser import HTMLParser
from pathlib import Path
from typing import Dict, List, Optional


@dataclass
class Finding:
    code: str
    severity: str
    message: str
    line: int


class _AuditParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.findings: List[Finding] = []
        self.ids: Dict[str, int] = {}
        self.labels_for: set[str] = set()
        self.inputs: List[tuple[Dict[str, str], int]] = []
        self._text_stack: List[List[str]] = []
        self._button_stack: List[tuple[Dict[str, str], int, List[str]]] = []

    def handle_starttag(self, tag: str, attrs: List[tuple[str, Optional[str]]]) -> None:
        attributes = {key: value or "" for key, value in attrs}
        line = self.getpos()[0]
        if tag == "html" and not attributes.get("lang"):
            self.findings.append(Finding("html-lang", "error", "The html element needs a language declaration.", line))
        if tag == "img" and "alt" not in attributes:
            self.findings.append(Finding("image-alt", "error", "Images need an alt attribute; use empty alt only for decorative images.", line))
        if attributes.get("id"):
            self.ids[attributes["id"]] = line
        if tag == "label" and attributes.get("for"):
            self.labels_for.add(attributes["for"])
        if tag == "input" and attributes.get("type", "text").lower() != "hidden":
            self.inputs.append((attributes, line))
        if tag == "button" or attributes.get("role") == "button":
            self._button_stack.append((attributes, line, []))
        if attributes.get("role") in {"dialog", "alertdialog"} or tag == "dialog":
            if not (attributes.get("aria-label") or attributes.get("aria-labelledby")):
                self.findings.append(Finding("dialog-name", "error", "Dialogs need an accessible name.", line))
            if tag != "dialog" and attributes.get("aria-modal") != "true":
                self.findings.append(Finding("dialog-modal", "warning", "Modal role=dialog elements should declare aria-modal=true.", line))

    def handle_data(self, data: str) -> None:
        if self._button_stack:
            self._button_stack[-1][2].append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag == "button" and self._button_stack:
            attributes, line, text = self._button_stack.pop()
            if not ("".join(text).strip() or attributes.get("aria-label") or attributes.get("aria-labelledby")):
                self.findings.append(Finding("button-name", "error", "Buttons need visible text or an accessible name.", line))

    def finish(self) -> List[Finding]:
        for attributes, line in self.inputs:
            input_id = attributes.get("id", "")
            named = attributes.get("aria-label") or attributes.get("aria-labelledby")
            if not named and (not input_id or input_id not in self.labels_for):
                self.findings.append(Finding("input-label", "error", "Inputs need an associated label or accessible name.", line))
        return self.findings


def audit_html(source: str) -> List[Finding]:
    parser = _AuditParser()
    parser.feed(source)
    parser.close()
    return parser.finish()


def main() -> None:
    parser = argparse.ArgumentParser(description="Check baseline semantic and interaction contracts in HTML.")
    parser.add_argument("target", help="HTML file to inspect")
    parser.add_argument("--strict", action="store_true", help="Fail on warnings as well as errors")
    parser.add_argument("--json", action="store_true", help="Emit machine-readable findings")
    args = parser.parse_args()

    target = Path(args.target)
    findings = audit_html(target.read_text(encoding="utf-8"))
    if args.json:
        print(json.dumps([asdict(finding) for finding in findings], indent=2))
    elif findings:
        for finding in findings:
            print(f"[{finding.severity}] {target}:{finding.line} {finding.code}: {finding.message}")
    else:
        print(f"PASS: {target} satisfies the static semantic contract.")

    severities = {finding.severity for finding in findings}
    if "error" in severities or (args.strict and "warning" in severities):
        raise SystemExit(1)


if __name__ == "__main__":
    main()
