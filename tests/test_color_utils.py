import sys
import unittest
from pathlib import Path

# Add scripts directory to sys.path
sys.path.insert(0, str(Path(__file__).parent.parent / "scripts"))

from render_pipeline import parse_rgb_string, rgb_to_hsl


class TestColorUtils(unittest.TestCase):
    def test_rgb_to_hsl_boundaries(self):
        # Pure Black
        self.assertEqual(rgb_to_hsl(0, 0, 0), (0.0, 0.0, 0.0))
        # Pure White
        self.assertEqual(rgb_to_hsl(255, 255, 255), (0.0, 0.0, 1.0))
        # Pure Gray (delta = 0 branch)
        h, s, l = rgb_to_hsl(128, 128, 128)
        self.assertEqual(h, 0.0)
        self.assertEqual(s, 0.0)
        self.assertAlmostEqual(l, 0.502, places=2)

    def test_rgb_to_hsl_primaries(self):
        # Pure Red (cmax == r_norm)
        self.assertEqual(rgb_to_hsl(255, 0, 0), (0.0, 1.0, 0.5))
        # Pure Green (cmax == g_norm)
        self.assertEqual(rgb_to_hsl(0, 255, 0), (120.0, 1.0, 0.5))
        # Pure Blue (cmax == b_norm)
        self.assertEqual(rgb_to_hsl(0, 0, 255), (240.0, 1.0, 0.5))

    def test_rgb_to_hsl_secondary_colors(self):
        # Yellow
        self.assertEqual(rgb_to_hsl(255, 255, 0), (60.0, 1.0, 0.5))
        # Cyan
        self.assertEqual(rgb_to_hsl(0, 255, 255), (180.0, 1.0, 0.5))
        # Magenta
        self.assertEqual(rgb_to_hsl(255, 0, 255), (300.0, 1.0, 0.5))

    def test_parse_rgb_string_valid(self):
        self.assertEqual(parse_rgb_string("rgb(255, 0, 0)"), (255, 0, 0))
        self.assertEqual(parse_rgb_string("rgba(0, 128, 255, 0.8)"), (0, 128, 255))
        self.assertEqual(parse_rgb_string("rgb( 10 , 20 , 30 )"), (10, 20, 30))

    def test_parse_rgb_string_invalid(self):
        self.assertIsNone(parse_rgb_string("invalid"))
        self.assertIsNone(parse_rgb_string("hsl(0, 100%, 50%)"))
        self.assertIsNone(parse_rgb_string("#ff0000"))


if __name__ == "__main__":
    unittest.main()
