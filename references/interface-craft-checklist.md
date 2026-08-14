# Interface Craft & Micro-Interaction Checklist

Use this reference during component implementation and design QA to audit state completeness, micro-interaction physics, responsive adaptation, and visual polish across all 7 visual archetypes.

---

## 1. Micro-Interaction & Motion Craft Checklist

- [ ] **Spring Easing Installed**: All interactive buttons, cards, drawers, and popovers use spring-calibrated cubic-beziers (`--ease-snappy` or `--ease-bounce`). Zero generic `ease` or `linear` transitions.
- [ ] **Press Depth Feedback (`:active`)**: Buttons, cards, and toggles provide instant visual compression (`scale(0.97)` or concave shadow) upon click/touch.
- [ ] **Focus-Visible Ring**: Keyboard focus shows a high-contrast offset focus ring (`:focus-visible`). See [accessibility-motion-performance.md](accessibility-motion-performance.md) §4 for the two-color offset pattern.
- [ ] **GPU Property Constraints**: Animations mutate only `transform` and `opacity`. No layout shift (CLS).
- [ ] **Hover Shimmer & Lift**: Hover states feature subtle lift (`translateY(-2px)`) or ambient glow without causing text blur or pointer jitter.
- [ ] **Skeleton Shimmer Shimmering**: Loading states render GPU-accelerated gradient shimmer without altering layout height.

---

## 2. Multi-Theme Craft Auditing

### Skeuomorphism / Neumorphism Checklist
- [ ] Concave inset shadow on active/pressed state vs convex outset shadow on resting state.
- [ ] Dual-light source angle consistency across all elements on the page.
- [ ] Metallic rim/bevel highlight layer for control surfaces.

### Neo-Brutalism Checklist
- [ ] Consistent `3px-4px` solid border on cards and buttons.
- [ ] Offset un-blurred solid shadow (`4px 4px 0 #000`) that translates down on click.
- [ ] High-contrast poster font headlines (`Space Grotesk`, `Archivo Black`).

### Editorial Paper Checklist
- [ ] Warm paper/ivory background tone (`hsl(40 20% 97%)`).
- [ ] High-contrast serif headlines paired with wide letter-spacing mono labels.
- [ ] Generous padding and asymmetric reading rhythm.

### Obsidian Cyberpunk Checklist
- [ ] Layered dark background contrast (0%, 5%, 10% HSL lightness tiers).
- [ ] Monospaced metadata tags and status indicators.
- [ ] Bounded ambient gradient glow fields with `pointer-events: none`.

---

## 3. Anti-AI-Slop Final Verification

- [ ] **Distinct Product Identity**: The design is customized for the specific product persona and does not look like a generic AI template.
- [ ] **Zero Unused Bento Grids**: Layout structure reflects content hierarchy rather than forcing every section into identical square cards.
- [ ] **Zero Fake Content**: No invented statistics, fake metrics, or dummy testimonials.
- [ ] **Mobile Responsiveness**: Layouts scale gracefully down to 320px width without horizontal overflow or clipped targets.
- [ ] **Touch Target Size**: Touch targets meet minimum 44px x 44px on mobile devices.

