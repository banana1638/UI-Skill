# Accessibility, Frame-Perfect Motion, And GPU Performance

Use this reference before shipping motion effects, tactile physical depth, custom controls, or layered visual components. Maintain high visual craft while ensuring 60fps/120fps rendering performance and WCAG AA accessibility.

---

## 1. Frame-Perfect Motion Physics

- **Never Use Generic Easing**: Prohibit `ease`, `linear`, or uncalibrated transitions for primary interactive elements. Use calibrated spring cubic-beziers (`cubic-bezier(0.16, 1, 0.3, 1)` or `cubic-bezier(0.34, 1.56, 0.64, 1)`).
- **Zero-Lag Active Feedback**: Active button press (`:active`) or toggle interaction must provide instantaneous physical feedback (within 16ms / 1 frame).
- **No Layout Shift (CLS)**: Never animate `width`, `height`, `top`, `left`, `margin`, or `padding`. Animate only `transform` and `opacity`.

---

## 2. GPU Rendering & Compositing Rules

- **Property Isolation**: Use `transform: translateZ(0)` or `will-change: transform` strictly on active animated elements, and remove it when idle to prevent memory bloat.
- **Backdrop Blur Budget**: Limit full-screen `backdrop-filter: blur(...)` to maximum 2 overlapping layers. Excessive glass blur layers cause GPU frame drops on mobile viewports.
- **Grain & Texture Efficiency**: Use a single SVG noise layer with `pointer-events: none` instead of duplicating noise filters across multiple card containers.

---

## 3. Motion Preference & Accessibility (`prefers-reduced-motion`)

Provide an intentionally designed static/low-motion composition for users who prefer reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  .parallax,
  .pointer-tilt,
  .ambient-loop,
  .shimmer-pass {
    animation: none !important;
    transform: none !important;
  }

  .state-transition,
  .tactile-button {
    transition-duration: 1ms !important;
  }
}
```

---

## 3.5 Script-Dependent Visibility Must Fail Safe

Any element whose visibility or final state depends on a third-party script
(a CDN-hosted animation library, a font loader, etc.) must be visible and
usable by default. The script may only *opt in* to a hidden starting state
after it has confirmed it can complete the reveal — never the reverse.

**Do not do this:**

```css
/* Element is invisible until JS proves it can rescue it. If the script
   fails to load, times out, or throws, this content is gone forever. */
.reveal-up {
  opacity: 0;
  transform: translateY(40px);
}
```

**Do this instead:**

```css
/* Default: fully visible. A loader class, added only by JS that has
   confirmed the animation library is present and the user has not
   requested reduced motion, is what turns on the hidden starting state. */
html.motion-ready .reveal-up {
  opacity: 0;
  transform: translateY(40px);
}
```

```javascript
if (typeof gsap === 'undefined') return;  // stays visible, no rescue needed
if (prefersReducedMotion) return;          // stays visible, no rescue needed
document.documentElement.classList.add('motion-ready');  // now safe to hide-then-reveal
```

Apply the same principle to any third-party `<script>` tag that gates
visibility: add `integrity` + `crossorigin` (pin an exact version so the
hash matches), and an `onerror` handler that adds a `motion-unavailable`
class or otherwise signals the failure so a CSS fallback can engage.

---

## 4. Focus Ring, Contrast & Typography Accessibility Standards

- **Typography Size Floor**:
  - Body text must **never be smaller than 14px (`text-sm`)**.
  - `text-xs` (12px) is restricted strictly to badges, tags, or secondary timestamps.
- **Visible Focus Rings**: Never set `outline: none` without providing a high-contrast focus indicator.
- **Two-Color Offset Focus Ring**:
  ```css
  .control:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 3px;
    box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.8);
  }
  ```
- **WCAG AA Contrast Standards**:
  - Maintain minimum **4.5:1** contrast for body copy and **3:1** for interactive icons/borders.
  - **Dark mode threshold**: Never use body text lower than `text-slate-400`.
  - **Light mode threshold**: Never use body text lower than `text-slate-500`.

---

## 5. Touch Devices & Performance Degradation

- **Physical Hit Targets**: All interactive elements must occupy a minimum **44x44px** hit area (via `min-h-[44px] min-w-[44px]`, `p-2`, or `::after` hit area expansion).
- **Hover Degradation**: Wrap all non-instant hover animations in `@media (hover: hover)` to prevent sticky active hover states on mobile touchscreens:
  ```css
  @media (hover: hover) {
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
  }
  ```
- **Backdrop-Blur Performance Fallback**: Avoid excessive nested `backdrop-filter: blur(*)`. Provide solid/semi-opaque fallbacks (`bg-background/95`) on mobile or low-spec devices to maintain a consistent 60fps frame budget.

