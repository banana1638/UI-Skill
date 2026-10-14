import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "scripts"))

from performance_budget import evaluate_budget


class TestPerformanceBudget(unittest.TestCase):
    def test_passing_metrics(self):
        metrics = {
            "totalTransferBytes": 400000,
            "transferByType": {"script": 100000, "img": 150000, "font": 50000},
            "lcpMs": 1800,
            "cls": 0.02,
            "inpMs": 80,
        }
        self.assertTrue(all(result.passed for result in evaluate_budget(metrics)))

    def test_over_budget_metric_fails(self):
        results = evaluate_budget({"totalTransferBytes": 2_000_000, "transferByType": {}, "lcpMs": 1000, "cls": 0, "inpMs": 1})
        total = next(result for result in results if result.metric == "totalTransferBytes")
        self.assertFalse(total.passed)
        self.assertEqual(total.status, "over-budget")


if __name__ == "__main__":
    unittest.main()
