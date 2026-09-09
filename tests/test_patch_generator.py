import sys
import unittest
from pathlib import Path

# Add scripts directory to sys.path
sys.path.insert(0, str(Path(__file__).parent.parent / "scripts"))

from patch_generator import PatchGenerator, PatchResult
from vision_reviewer import ActionableFix


class TestPatchGenerator(unittest.TestCase):
    def setUp(self):
        self.patcher = PatchGenerator(provider="mock")

    def test_validate_html_integrity_valid(self):
        original = "<!DOCTYPE html><html><head><title>Test</title></head><body><h1>Hello</h1></body></html>"
        patched = "<!DOCTYPE html><html><head><title>Test Patched</title></head><body><h1>Hello World</h1></body></html>"
        # Should not raise
        self.patcher._validate_html_integrity(original, patched)

    def test_validate_html_integrity_truncated(self):
        original = "<!DOCTYPE html><html><head><title>Test</title></head><body><h1>Hello</h1>" + ("<p>Content</p>" * 50) + "</body></html>"
        patched = "<h1>Hello</h1>"
        with self.assertRaises(ValueError) as ctx:
            self.patcher._validate_html_integrity(original, patched)
        self.assertIn("truncated", str(ctx.exception).lower())

    def test_validate_html_integrity_missing_tag(self):
        original = "<!DOCTYPE html><html><head><title>Test</title></head><body><h1>Hello</h1></body></html>"
        patched = "<!DOCTYPE html><div><h1>Hello</h1></div>"
        with self.assertRaises(ValueError) as ctx:
            self.patcher._validate_html_integrity(original, patched)
        self.assertIn("missing", str(ctx.exception).lower())

    def test_compute_diff(self):
        original = "line1\nline2\n"
        patched = "line1\nline2_modified\n"
        diff = self.patcher._compute_diff(original, patched, filename="test.html")
        self.assertIn("--- a/test.html", diff)
        self.assertIn("+++ b/test.html", diff)
        self.assertIn("-line2", diff)
        self.assertIn("+line2_modified", diff)

    def test_mock_patch_overflow(self):
        original = "<!DOCTYPE html><html><head><title>Test</title></head><body><h1>Test</h1></body></html>"
        fixes = [
            ActionableFix(
                severity="CRITICAL",
                target_element="html, body",
                issue="Horizontal viewport overflow occurs on desktop/mobile.",
                why_it_matters="Causes broken layout.",
                suggested_fix="Ensure max-width: 100vw and overflow-x: clip on wrapper."
            )
        ]
        patched = self.patcher._patch_with_mock_rules(original, fixes)
        self.assertIn("overflow-x: clip", patched)
        self.patcher._validate_html_integrity(original, patched)


if __name__ == "__main__":
    unittest.main()
