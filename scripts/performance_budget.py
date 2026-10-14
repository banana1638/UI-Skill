#!/usr/bin/env python3
"""Evaluate render-pipeline resource and web-vital metrics against a stated budget."""

from __future__ import annotations

import argparse
import json
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Dict, List


DEFAULT_BUDGET: Dict[str, float] = {
    "totalTransferBytes": 1_000_000,
    "scriptTransferBytes": 350_000,
    "imageTransferBytes": 500_000,
    "fontTransferBytes": 250_000,
    "lcpMs": 2500,
    "cls": 0.1,
    "inpMs": 200,
}


@dataclass
class BudgetResult:
    metric: str
    value: float | None
    budget: float
    passed: bool
    status: str


def evaluate_budget(metrics: Dict[str, Any], budget: Dict[str, float] | None = None) -> List[BudgetResult]:
    budget = {**DEFAULT_BUDGET, **(budget or {})}
    transfers = metrics.get("transferByType", {})
    values = {
        "totalTransferBytes": metrics.get("totalTransferBytes"),
        "scriptTransferBytes": transfers.get("script", 0),
        "imageTransferBytes": transfers.get("img", 0) + transfers.get("image", 0),
        "fontTransferBytes": transfers.get("font", 0),
        "lcpMs": metrics.get("lcpMs"),
        "cls": metrics.get("cls"),
        "inpMs": metrics.get("inpMs"),
    }
    results: List[BudgetResult] = []
    for metric, limit in budget.items():
        value = values.get(metric)
        if value is None:
            results.append(BudgetResult(metric, None, limit, False, "not-measured"))
        else:
            results.append(BudgetResult(metric, float(value), limit, float(value) <= limit, "pass" if float(value) <= limit else "over-budget"))
    return results


def main() -> None:
    parser = argparse.ArgumentParser(description="Evaluate a render summary against frontend performance budgets.")
    parser.add_argument("summary", type=Path, help="summary.json emitted by render_pipeline.py")
    parser.add_argument("--budget", type=Path, help="Optional JSON object overriding default limits")
    parser.add_argument("--strict", action="store_true", help="Fail when a metric was not measured")
    args = parser.parse_args()
    summary = json.loads(args.summary.read_text(encoding="utf-8"))
    custom_budget = json.loads(args.budget.read_text(encoding="utf-8")) if args.budget else {}
    results = evaluate_budget(summary.get("performance_metrics", {}), custom_budget)
    for result in results:
        value = "not measured" if result.value is None else f"{result.value:g}"
        print(f"{result.status.upper():12} {result.metric}: {value} (budget {result.budget:g})")
    if any(not result.passed and (args.strict or result.status == "over-budget") for result in results):
        raise SystemExit(1)


if __name__ == "__main__":
    main()
