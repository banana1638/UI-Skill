import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "scripts"))

from frontend_quality_gate import audit_html


class TestFrontendQualityGate(unittest.TestCase):
    def test_valid_semantic_document_passes(self):
        html = """<html lang='en'><body><label for='email'>Email</label><input id='email'><img alt='Chart'><button>Save</button></body></html>"""
        self.assertEqual(audit_html(html), [])

    def test_reports_core_semantic_failures(self):
        html = "<html><body><img src='x'><input id='email'><button></button><div role='dialog'></div></body></html>"
        codes = {finding.code for finding in audit_html(html)}
        self.assertTrue({"html-lang", "image-alt", "input-label", "button-name", "dialog-name", "dialog-modal"}.issubset(codes))


if __name__ == "__main__":
    unittest.main()
