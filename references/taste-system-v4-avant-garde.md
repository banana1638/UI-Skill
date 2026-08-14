# Taste System V4: Avant-Garde Art Direction & Tactile Physics

Use this reference to create high-tension, tactile, editorial interfaces without turning every product into the same dark, glowing demo. Apply the ideas as an art direction system with calibrated physical motion and modern CSS primitives.

---

## 1. Fit Test & Motion Intensity Budget

Before implementation, set a strict intensity budget:

- **One Dominant Gesture**: Broken-grid overlap, oversized editorial headline, tactile physical control array, or spatial floating viewport.
- **One Material Motif**: Soft neumorphic bevels, warm paper grain, optical frosted glass, or obsidian dark tiers.
- **One Motion Family**: Spring-loaded reveal (`cubic-bezier(0.34, 1.56, 0.64, 1)`), cursor spotlight, or scroll-driven parallax.

Do not combine giant background type, multiple ambient blobs, glass on every card, 3D tilt on every button, and continuous parallax in a single viewport.

---

## 2. Spring Physics Easing Curves

Never use standard `ease` or `linear` transitions for interactive components. Use the calibrated spring cubic-beziers defined in the project token blueprint (SKILL.md §3):

- **`--ease-snappy`** `cubic-bezier(0.16, 1, 0.3, 1)` — Popovers, dialogs, drawers
- **`--ease-bounce`** `cubic-bezier(0.34, 1.56, 0.64, 1)` — Buttons, toggles, icon clicks
- **`--ease-atmospheric`** `cubic-bezier(0.65, 0, 0.35, 1)` — View transitions, theme shifts

See [accessibility-motion-performance.md](accessibility-motion-performance.md) §1 for frame-budget and GPU constraints.

---

## 3. Skeuomorphism & Neumorphism Tactile Recipes

### Concave / Convex Physical Button Component (React / CSS)

```css
.tactile-button {
  background: hsl(220 20% 94%);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  /* Raised convex resting state */
  box-shadow:
    6px 6px 12px hsl(220 15% 85%),
    -6px -6px 12px hsl(0 0% 100%),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  transition: transform 150ms var(--ease-bounce), box-shadow 150ms var(--ease-bounce);
  cursor: pointer;
}

.tactile-button:hover {
  transform: translateY(-2px);
  box-shadow:
    8px 8px 16px hsl(220 15% 82%),
    -8px -8px 16px hsl(0 0% 100%),
    inset 0 1px 0 rgba(255, 255, 255, 1);
}

.tactile-button:active {
  /* Pressed inset concave state */
  transform: translateY(1px) scale(0.98);
  box-shadow:
    inset 3px 3px 6px hsl(220 15% 82%),
    inset -3px -3px 6px hsl(0 0% 100%);
}
```

---

## 4. Modern CSS Primitives (2026/2027 Standards)

### Parent Selection via `:has()`
Dynamic parent styling when nested checkboxes, radios, or input focus states update:

```css
/* Highlight card container when child input is checked */
.pricing-card:has(input[type="checkbox"]:checked) {
  border-color: var(--accent-brand);
  background: var(--surface-raised-highlight);
  box-shadow: var(--shadow-tactile);
  transform: scale(1.02);
  transition: all 250ms var(--ease-bounce);
}
```

### Container Queries (`@container`)

Enable self-contained responsive layouts independent of viewport width. See [fluid-layout-and-typography.md](fluid-layout-and-typography.md) §3 and [compound-components-and-modern-css.md](compound-components-and-modern-css.md) for full container query patterns and component examples.

### Scroll-Driven Parallax Animations
Zero-JS scroll progress effects:

```css
@supports (animation-timeline: scroll()) {
  .scroll-parallax-header {
    animation: shrink-header linear forwards;
    animation-timeline: scroll();
    animation-range: 0px 300px;
  }

  @keyframes shrink-header {
    to {
      transform: translateY(-20px) scale(0.95);
      opacity: 0.8;
    }
  }
}
```

---

## 5. CSS-Variable Pointer Tilt Physics

Keep pointer coordinates outside React state for 60fps performance:

```tsx
function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
  const target = e.currentTarget;
  const rect = target.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;

  target.style.setProperty('--tilt-x', `${-y * 6}deg`);
  target.style.setProperty('--tilt-y', `${x * 6}deg`);
}

function handlePointerLeave(e: React.PointerEvent<HTMLDivElement>) {
  const target = e.currentTarget;
  target.style.setProperty('--tilt-x', '0deg');
  target.style.setProperty('--tilt-y', '0deg');
}
```

```css
.tilt-card {
  transform: perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
  transition: transform 300ms var(--ease-snappy);
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .tilt-card {
    transform: none !important;
  }
}
```

---

## 6. Final Craft Verification

Reject the implementation if:
- Motion drops below 60fps on mid-range mobile devices.
- Buttons lack active press depth or focus-visible rings.
- Reduced motion setting (`prefers-reduced-motion: reduce`) breaks functional state changes.
- Ambient blurs intercept mouse clicks (missing `pointer-events: none`).

