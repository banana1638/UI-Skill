import json
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "scripts"))

from skill_eval import validate_suite


class TestSkillEval(unittest.TestCase):
    def test_committed_suite_passes_contract(self):
        suite = Path(__file__).parent.parent / "evals" / "frontend-contracts.json"
        self.assertEqual(validate_suite(json.loads(suite.read_text(encoding="utf-8"))), [])

    def test_missing_scenarios_fail_contract(self):
        issues = validate_suite({"scenarios": []})
        self.assertTrue(issues)
        self.assertIn("8–12", issues[0].message)


if __name__ == "__main__":
    unittest.main()
