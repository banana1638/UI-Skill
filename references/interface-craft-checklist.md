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

## 3. Defensive UI & Edge Case Auditing

- [ ] **Text Overflow & Flex Containment**: All dynamic labels, names, and titles are protected with `truncate` or `line-clamp-*`. Flex parent containers declare `min-w-0` to prevent layout burst.
- [ ] **Loading Skeleton (`animate-pulse`)**: Loading state renders structural skeleton matching target layout without causing cumulative layout shift (CLS).
- [ ] **Empty State**: Missing or zero data views display an icon, clear explanatory copy, and a primary action CTA.
- [ ] **Error Fallback**: Local component-level error banner with retry capability without breaking parent layout.

---

## 4. Code Architecture & Component Hygiene

- [ ] **No Monolithic Class Dumping**: Elements avoid >12 direct Tailwind classes; variants are decoupled using `cva` (Class Variance Authority) and `cn()`.
- [ ] **Hover Degradation**: Desktop hover effects are scoped within `@media (hover: hover)` to prevent sticky/ghost hover on touch devices.
- [ ] **Glass Performance Fallback**: High-density or mobile views provide clean solid/semi-opaque backgrounds (`bg-background/95`) instead of stacked `backdrop-blur-*`.

---

## 5. Anti-AI-Slop & A11y Verification

- [ ] **Distinct Product Identity**: The design is customized for the specific product persona and does not look like a generic AI template.
- [ ] **Zero Unused Bento Grids**: Layout structure reflects content hierarchy rather than forcing every section into identical square cards.
- [ ] **Zero Fake Content**: No invented statistics, fake metrics, or dummy testimonials.
- [ ] **Body Text $\ge 14\text{px}$**: No body copy is styled `< 14px` (`text-sm`). `text-xs` is strictly limited to badges and secondary timestamps.
- [ ] **WCAG AA Contrast ($\ge 4.5:1$)**: No unreadable low-contrast text (e.g. darker than `text-slate-400` on dark bg, lighter than `text-slate-500` on light bg).
- [ ] **Mobile Responsiveness (320px+)**: Layouts scale gracefully down to 320px width without horizontal overflow or clipped targets.
- [ ] **Touch Hit Target Size**: All interactive buttons, icons, and toggles provide a minimum 44px x 44px physical touch area.

---

## 6. Pre-Flight Self-Check (Must Pass Before Delivery)

1. [ ] Did I decouple variants with CVA instead of dumping huge class lists into the HTML?
2. [ ] Is body text $\ge 14\text{px}$ with WCAG AA $\ge 4.5:1$ contrast against the background?
3. [ ] If usernames, descriptions, or titles become extremely long, is the layout protected via `min-w-0` and `truncate`/`line-clamp`?
4. [ ] Can mobile fingers comfortably tap all interactive controls ($\ge 44 \times 44\text{px}$ target)?

