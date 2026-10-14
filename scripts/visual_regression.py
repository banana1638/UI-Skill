#!/usr/bin/env python3
"""Compare named PNG screenshots with an explicit normalized difference threshold."""

from __future__ import annotations

import argparse
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, List

from PIL import Image, ImageChops, ImageStat


@dataclass
class Comparison:
    name: str
    difference: float
    passed: bool
    reason: str = ""


def compare_images(baseline: Path, candidate: Path, threshold: float) -> Comparison:
    with Image.open(baseline).convert("RGBA") as expected, Image.open(candidate).convert("RGBA") as actual:
        if expected.size != actual.size:
            return Comparison(baseline.name, 1.0, False, f"size mismatch: {expected.size} != {actual.size}")
        stat = ImageStat.Stat(ImageChops.difference(expected, actual))
        difference = sum(stat.mean) / (len(stat.mean) * 255)
    return Comparison(baseline.name, difference, difference <= threshold)


def compare_directories(baseline_dir: Path, candidate_dir: Path, threshold: float) -> List[Comparison]:
    expected = {path.name: path for path in baseline_dir.glob("*.png")}
    actual = {path.name: path for path in candidate_dir.glob("*.png")}
    comparisons: List[Comparison] = []
    for name in sorted(expected.keys() | actual.keys()):
        if name not in expected:
            comparisons.append(Comparison(name, 1.0, False, "missing baseline"))
        elif name not in actual:
            comparisons.append(Comparison(name, 1.0, False, "missing candidate"))
        else:
            comparisons.append(compare_images(expected[name], actual[name], threshold))
    return comparisons


def main() -> None:
    parser = argparse.ArgumentParser(description="Compare screenshot directories for visual regressions.")
    parser.add_argument("baseline", type=Path)
    parser.add_argument("candidate", type=Path)
    parser.add_argument("--threshold", type=float, default=0.02, help="Allowed normalized mean pixel difference")
    args = parser.parse_args()
    if not 0 <= args.threshold <= 1:
        parser.error("--threshold must be between 0 and 1")

    comparisons = compare_directories(args.baseline, args.candidate, args.threshold)
    if not comparisons:
        print("No PNG screenshots found; visual regression cannot pass without a named baseline.")
        raise SystemExit(1)
    for result in comparisons:
        status = "PASS" if result.passed else "FAIL"
        suffix = f" ({result.reason})" if result.reason else ""
        print(f"{status} {result.name}: {result.difference:.4f}{suffix}")
    if not all(result.passed for result in comparisons):
        raise SystemExit(1)


if __name__ == "__main__":
    main()
