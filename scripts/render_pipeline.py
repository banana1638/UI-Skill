#!/usr/bin/env python3
"""
render_pipeline.py - Headless Browser Renderer & Computed Style Extractor

Renders HTML/CSS frontends across multiple viewports using Playwright,
capturing high-resolution screenshots and extracting computed style & DOM metrics.
"""

from __future__ import annotations

import argparse
import asyncio
import base64
import json
import math
import os
import re
import sys
import time
from dataclasses import asdict, dataclass, field
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

try:
    from playwright.async_api import async_playwright
except ImportError:
    async_playwright = None  # Handled gracefully if not installed yet


@dataclass
class ViewportConfig:
    name: str
    width: int
    height: int
    device_scale_factor: float = 2.0
    is_mobile: bool = False


DEFAULT_VIEWPORTS = [
    ViewportConfig(name="desktop", width=1440, height=900, device_scale_factor=2.0),
    ViewportConfig(name="mobile", width=375, height=812, device_scale_factor=3.0, is_mobile=True),
]


@dataclass
class ColorTokenMetric:
    raw_value: str
    rgb: Tuple[int, int, int]
    hsl: Tuple[float, float, float]
    count: int


@dataclass
class RenderResult:
    target_url: str
    timestamp: float
    output_dir: str
    screenshots: Dict[str, str] = field(default_factory=dict)
    screenshot_base64: Dict[str, str] = field(default_factory=dict)
    dom_metrics: Dict[str, Any] = field(default_factory=dict)
    color_metrics: Dict[str, Any] = field(default_factory=dict)
    console_errors: List[str] = field(default_factory=list)
    success: bool = True
    error_message: Optional[str] = None


def rgb_to_hsl(r: int, g: int, b: int) -> Tuple[float, float, float]:
    """Converts RGB (0-255) to HSL (H: 0-360, S: 0-1, L: 0-1)."""
    r_norm, g_norm, b_norm = r / 255.0, g / 255.0, b / 255.0
    cmax = max(r_norm, g_norm, b_norm)
    cmin = min(r_norm, g_norm, b_norm)
    delta = cmax - cmin

    # Luminance
    l = (cmax + cmin) / 2.0

    if delta == 0:
        h = 0.0
        s = 0.0
    else:
        # Saturation
        s = delta / (1.0 - abs(2.0 * l - 1.0)) if (1.0 - abs(2.0 * l - 1.0)) != 0 else 0.0

        # Hue
        if cmax == r_norm:
            h = (60.0 * (((g_norm - b_norm) / delta) % 6.0))
        elif cmax == g_norm:
            h = (60.0 * (((b_norm - r_norm) / delta) + 2.0))
        else:
            h = (60.0 * (((r_norm - g_norm) / delta) + 4.0))

    if h < 0:
        h += 360.0

    return (round(h, 2), round(s, 4), round(l, 4))


def parse_rgb_string(color_str: str) -> Optional[Tuple[int, int, int]]:
    """Parses 'rgb(r, g, b)' or 'rgba(r, g, b, a)' strings."""
    match = re.search(r'rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)', color_str, re.IGNORECASE)
    if match:
        return (int(match.group(1)), int(match.group(2)), int(match.group(3)))
    return None


DOM_INSPECTOR_SCRIPT = """
() => {
    const metrics = {
        title: document.title,
        headingCount: {
            h1: document.querySelectorAll('h1').length,
            h2: document.querySelectorAll('h2').length,
            h3: document.querySelectorAll('h3').length,
        },
        buttons: Array.from(document.querySelectorAll('button, a[role="button"], .btn')).map(b => ({
            text: (b.innerText || '').trim().slice(0, 40),
            visible: b.offsetWidth > 0 && b.offsetHeight > 0,
            hasAriaLabel: b.hasAttribute('aria-label') || b.hasAttribute('aria-labelledby'),
            rect: {
                width: Math.round(b.getBoundingClientRect().width),
                height: Math.round(b.getBoundingClientRect().height),
            }
        })),
        colors: {},
        backgroundColors: {},
        fontFamilies: new Set(),
        hasMotionSafetyClass: document.documentElement.classList.contains('motion-ready') || document.body.classList.contains('motion-ready'),
        hasHorizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        bodyScrollWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
    };

    // Scan all visible elements
    const elements = document.querySelectorAll('body *');
    elements.forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return;

        const color = style.color;
        const bg = style.backgroundColor;
        const ff = style.fontFamily;

        if (color && color !== 'rgba(0, 0, 0, 0)') {
            metrics.colors[color] = (metrics.colors[color] || 0) + 1;
        }
        if (bg && bg !== 'rgba(0, 0, 0, 0)') {
            metrics.backgroundColors[bg] = (metrics.backgroundColors[bg] || 0) + 1;
        }
        if (ff) {
            metrics.fontFamilies.add(ff.split(',')[0].replace(/['"]/g, '').trim());
        }
    });

    metrics.fontFamilies = Array.from(metrics.fontFamilies);
    return metrics;
}
"""


class RenderPipeline:
    def __init__(self, output_root: str = "artifacts/renders"):
        self.output_root = Path(output_root)
        self.output_root.mkdir(parents=True, exist_ok=True)

    async def render_target(
        self,
        target_path_or_url: str,
        viewports: Optional[List[ViewportConfig]] = None,
        wait_time_ms: int = 1500,
    ) -> RenderResult:
        if async_playwright is None:
            return RenderResult(
                target_url=target_path_or_url,
                timestamp=time.time(),
                output_dir=str(self.output_root),
                success=False,
                error_message="Playwright is not installed. Please run: pip install playwright && playwright install chromium",
            )

        viewports = viewports or DEFAULT_VIEWPORTS
        target = Path(target_path_or_url)
        if target.exists():
            url = f"file:///{target.resolve().as_posix()}"
        else:
            url = target_path_or_url

        session_id = f"render_{int(time.time())}"
        session_dir = self.output_root / session_id
        session_dir.mkdir(parents=True, exist_ok=True)

        result = RenderResult(
            target_url=url,
            timestamp=time.time(),
            output_dir=str(session_dir),
        )

        try:
            async with async_playwright() as p:
                browser = await p.chromium.launch(headless=True)
                for vp in viewports:
                    context = await browser.new_context(
                        viewport={"width": vp.width, "height": vp.height},
                        device_scale_factor=vp.device_scale_factor,
                        is_mobile=vp.is_mobile,
                    )
                    page = await context.new_page()

                    # Listen for console errors
                    page.on("pageerror", lambda err: result.console_errors.append(str(err)))
                    page.on("console", lambda msg: result.console_errors.append(f"[{msg.type}] {msg.text}") if msg.type == "error" else None)

                    await page.goto(url, wait_until="networkidle", timeout=15000)
                    if wait_time_ms > 0:
                        await asyncio.sleep(wait_time_ms / 1000.0)

                    screenshot_path = session_dir / f"{vp.name}.png"
                    await page.screenshot(path=str(screenshot_path), full_page=False)

                    result.screenshots[vp.name] = str(screenshot_path)

                    # Encode to base64 for LLM inspection
                    with open(screenshot_path, "rb") as img_f:
                        result.screenshot_base64[vp.name] = base64.b64encode(img_f.read()).decode("utf-8")

                    # Extract DOM inspection metrics from desktop view
                    if vp.name == "desktop":
                        dom_metrics = await page.evaluate(DOM_INSPECTOR_SCRIPT)
                        result.dom_metrics = dom_metrics
                        result.color_metrics = self._analyze_colors(dom_metrics.get("colors", {}), dom_metrics.get("backgroundColors", {}))

                    await context.close()

                await browser.close()
                result.success = True
        except Exception as exc:
            result.success = False
            result.error_message = str(exc)

        # Save metadata summary
        summary_file = session_dir / "summary.json"
        with open(summary_file, "w", encoding="utf-8") as f:
            summary_data = asdict(result)
            summary_data.pop("screenshot_base64", None)  # Exclude large binary from json
            json.dump(summary_data, f, indent=2, ensure_ascii=False)

        return result

    def _analyze_colors(self, text_colors: Dict[str, int], bg_colors: Dict[str, int]) -> Dict[str, Any]:
        """Calculates palette diversity, dominant hues, and hue standard deviation."""
        all_colors = {**text_colors, **bg_colors}
        hues: List[float] = []
        parsed_tokens: List[Dict[str, Any]] = []

        for col_str, count in all_colors.items():
            rgb = parse_rgb_string(col_str)
            if not rgb:
                continue
            h, s, l = rgb_to_hsl(*rgb)
            # Filter near-monochrome colors (blacks, whites, grays) for hue variance calculation
            if s > 0.15 and 0.08 < l < 0.92:
                hues.extend([h] * min(count, 10))
            parsed_tokens.append({
                "raw": col_str,
                "rgb": rgb,
                "hsl": [h, s, l],
                "count": count
            })

        # Calculate circular/standard deviation of saturated hues
        hue_std_dev = 0.0
        if len(hues) > 1:
            mean_h = sum(hues) / len(hues)
            variance = sum((x - mean_h) ** 2 for x in hues) / len(hues)
            hue_std_dev = round(math.sqrt(variance), 2)

        return {
            "token_count": len(parsed_tokens),
            "saturated_hue_samples": len(hues),
            "hue_std_dev": hue_std_dev,
            "tokens": sorted(parsed_tokens, key=lambda x: x["count"], reverse=True)[:15]
        }


def main():
    parser = argparse.ArgumentParser(description="Render frontend target with Playwright and extract design metrics.")
    parser.add_argument("target", help="HTML file path or URL to render")
    parser.add_argument("--output", default="artifacts/renders", help="Directory to save rendered screenshots")
    parser.add_argument("--wait", type=int, default=1500, help="Wait time in ms after load")

    args = parser.parse_args()
    pipeline = RenderPipeline(output_root=args.output)
    result = asyncio.run(pipeline.render_target(args.target, wait_time_ms=args.wait))

    if result.success:
        print(f"✅ Render successful! Output saved to: {result.output_dir}")
        print(f"📸 Screenshots: {list(result.screenshots.keys())}")
        print(f"🎨 Saturated Hue Std Dev: {result.color_metrics.get('hue_std_dev', 0)}°")
        print(f"🔤 Font Families Detected: {result.dom_metrics.get('fontFamilies', [])}")
    else:
        print(f"❌ Render failed: {result.error_message}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
