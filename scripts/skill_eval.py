#!/usr/bin/env python3
"""Validate the versioned scenario contract used to evaluate this skill."""

from __future__ import annotations

import argparse
import json
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Iterable, List


REQUIRED_FIELDS = {"id", "title", "level", "prompt", "must_pass", "must_not_do", "evidence"}
REQUIRED_CATEGORIES = {
    "surgical-fix",
    "existing-system",
    "localized-content",
    "dense-data",
    "state-recovery",
    "performance",
    "high-trust",
    "visual-direction",
    "complex-widget",
}


@dataclass
class EvaluationIssue:
    scenario_id: str
    message: str


def validate_suite(payload: dict[str, Any]) -> List[EvaluationIssue]:
    issues: List[EvaluationIssue] = []
    scenarios = payload.get("scenarios")
    if not isinstance(scenarios, list):
        return [EvaluationIssue("suite", "scenarios must be a list")]
    if not 8 <= len(scenarios) <= 12:
        issues.append(EvaluationIssue("suite", "the suite must contain 8–12 scenarios"))

    ids: set[str] = set()
    categories: set[str] = set()
    for index, scenario in enumerate(scenarios, start=1):
        scenario_id = str(scenario.get("id", f"scenario-{index}")) if isinstance(scenario, dict) else f"scenario-{index}"
        if not isinstance(scenario, dict):
            issues.append(EvaluationIssue(scenario_id, "scenario must be an object"))
            continue
        missing = REQUIRED_FIELDS - scenario.keys()
        if missing:
            issues.append(EvaluationIssue(scenario_id, f"missing fields: {', '.join(sorted(missing))}"))
        if scenario_id in ids:
            issues.append(EvaluationIssue(scenario_id, "scenario id must be unique"))
        ids.add(scenario_id)
        if scenario.get("level") not in {1, 2, 3, 4}:
            issues.append(EvaluationIssue(scenario_id, "level must be an integer from 1 to 4"))
        for field in ("must_pass", "must_not_do", "evidence"):
            if not scenario.get(field):
                issues.append(EvaluationIssue(scenario_id, f"{field} must not be empty"))
        category = scenario.get("category")
        if isinstance(category, str):
            categories.add(category)
        else:
            issues.append(EvaluationIssue(scenario_id, "category is required"))

    absent = REQUIRED_CATEGORIES - categories
    if absent:
        issues.append(EvaluationIssue("suite", f"missing required categories: {', '.join(sorted(absent))}"))
    return issues


def main() -> None:
    parser = argparse.ArgumentParser(description="Validate the frontend skill evaluation-suite contract.")
    parser.add_argument("suite", type=Path)
    parser.add_argument("--strict", action="store_true", help="Exit non-zero if any contract issue exists")
    args = parser.parse_args()
    payload = json.loads(args.suite.read_text(encoding="utf-8"))
    issues = validate_suite(payload)
    if issues:
        for issue in issues:
            print(f"FAIL {issue.scenario_id}: {issue.message}")
        if args.strict:
            raise SystemExit(1)
    else:
        print(f"PASS: {args.suite} contains {len(payload['scenarios'])} valid evaluation scenarios.")


if __name__ == "__main__":
    main()
