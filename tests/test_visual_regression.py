import sys
import tempfile
import unittest
from pathlib import Path

from PIL import Image

sys.path.insert(0, str(Path(__file__).parent.parent / "scripts"))

from visual_regression import compare_directories, compare_images


class TestVisualRegression(unittest.TestCase):
    def test_identical_images_pass(self):
        with tempfile.TemporaryDirectory(dir=Path.cwd()) as directory:
            root = Path(directory)
            baseline = root / "baseline.png"
            candidate = root / "candidate.png"
            Image.new("RGBA", (4, 4), "white").save(baseline)
            Image.new("RGBA", (4, 4), "white").save(candidate)
            self.assertTrue(compare_images(baseline, candidate, 0).passed)

    def test_missing_candidate_fails(self):
        with tempfile.TemporaryDirectory(dir=Path.cwd()) as directory:
            root = Path(directory)
            baseline_dir = root / "baseline"
            candidate_dir = root / "candidate"
            baseline_dir.mkdir()
            candidate_dir.mkdir()
            Image.new("RGBA", (4, 4), "white").save(baseline_dir / "desktop.png")
            result = compare_directories(baseline_dir, candidate_dir, 0.02)
            self.assertEqual(result[0].reason, "missing candidate")
            self.assertFalse(result[0].passed)


if __name__ == "__main__":
    unittest.main()
