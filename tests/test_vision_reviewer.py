import json
import sys
import unittest
from pathlib import Path

# Add scripts directory to sys.path
sys.path.insert(0, str(Path(__file__).parent.parent / "scripts"))

from vision_reviewer import ActionableFix, ReviewReport, VisionReviewer, generate_mock_critique


class TestVisionReviewer(unittest.TestCase):
    def test_mock_critique_honesty(self):
        dom_metrics = {"fontFamilies": ["Inter"], "hasHorizontalOverflow": False}
        color_metrics = {"hue_std_dev": 25.0}

        report = generate_mock_critique(dom_metrics, color_metrics)
        self.assertEqual(report.reviewer_source, "mock")
        self.assertEqual(report.confidence, 0.4)
        self.assertGreaterEqual(report.overall_score, 8.0)
        self.assertEqual(report.verdict, "PASS")

    def test_mock_critique_violations(self):
        dom_metrics = {"fontFamilies": [], "hasHorizontalOverflow": True}
        color_metrics = {"hue_std_dev": 5.0}

        report = generate_mock_critique(dom_metrics, color_metrics)
        self.assertEqual(report.reviewer_source, "mock")
        self.assertEqual(report.confidence, 0.4)
        self.assertEqual(report.verdict, "NEEDS_REVISION")
        self.assertGreaterEqual(len(report.violations), 1)
        self.assertGreaterEqual(len(report.actionable_fixes), 2)

    def test_extract_json_markdown_fences(self):
        raw = """Here is the critique:
```json
{
  "overall_score": 8.5,
  "verdict": "PASS"
}
```
Hope this helps!"""
        extracted = VisionReviewer._extract_json(raw)
        data = json.loads(extracted)
        self.assertEqual(data["overall_score"], 8.5)
        self.assertEqual(data["verdict"], "PASS")

    def test_extract_json_raw_braces(self):
        raw = "Prefix text {\"overall_score\": 9.0, \"verdict\": \"PASS\"} suffix text"
        extracted = VisionReviewer._extract_json(raw)
        data = json.loads(extracted)
        self.assertEqual(data["overall_score"], 9.0)


if __name__ == "__main__":
    unittest.main()
