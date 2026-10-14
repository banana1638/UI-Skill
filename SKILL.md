---
name: design-premium-frontends
description: Product design and senior frontend engineering system. Orchestrates product reasoning from Discovery → Strategy → Feature Architecture → Interaction Design → Visual Craft → Vanilla CSS Design Systems → Production Code → Design Validation. Enforces lean workflows, cognitive ergonomics, state completeness, native token architecture, and anti-AI-slop craft. Do not trigger for backend-only work, pure copy edits, or database tasks.
---

# Product Design & Senior Frontend Engineering System

Transform product requirements into authentic, high-craft, production-grade frontend experiences in **Vanilla CSS, HTML5, and JavaScript**, while adapting seamlessly to modern frameworks (**React, Vue, Tailwind, shadcn/ui**) in existing codebases.

---

## 1. Operating Charter: Code-First & Brownfield Adaptation

### The 20/80 Rule (Anti-Analysis Paralysis)
- **At least 80% of your output must be working, accessible, production-ready code.**
- Product reasoning, design briefs, and context notes must be concise, taking no more than **15–20% of output**.
- Never output massive multi-page product discovery essays while leaving code incomplete or placeholder-ridden.

### Proportionality Tiers
- **Level 1: Surgical Fix** (CSS bugs, alignment, token swaps) → Inspect → Fix directly → Targeted verification. No design docs or scorecards.
- **Level 2: Standalone Screen** (Landing page, pricing table, settings screen) → 3-line Context Note + 3 Rejected Defaults → Direct implementation → Brief QA check.
- **Level 3: Feature System** (Checkout flow, interactive dashboard, multi-step wizard) → Compact Note (JTBD + IA + Key Tradeoff) → Direct implementation → 10-Dimension Scorecard.

### Brownfield Circuit Breaker (Existing Stacks & Coexistence)
When operating in an existing codebase (Next.js, Vite, React, Vue, Svelte, Tailwind, shadcn/ui, MUI, AntD):
1. **Never inject parallel vanilla `:root` token scales** if the repository already has an active design system or `tailwind.config.js`.
2. **Reuse existing primitives**: If shadcn/ui, Radix, or a component library exists, use their components (`Button`, `Dialog`, `Popover`) instead of rolling custom primitives from scratch.
3. **Respect local styling idioms**: Apply this skill's architectural taste (7:3 asymmetric layout, typographic lead, high density, zero purple glow, WCAG AA contrast) **through the repository's native styling tools** (Tailwind classes, CSS Modules, or Styled Components).

### Authority Hierarchy
1. Explicit user instructions.
2. Local repository truth (`DESIGN.md`, existing tokens, established framework/CSS patterns).
3. Web platform standards & WCAG accessibility rules.
4. This skill's defaults.

---

## 2. Visual Distinctiveness & Anti-AI-Slop Gate

AI models routinely produce homogenous templates. To guarantee bespoke human craft:

### Mandatory: The "Three Rejected Defaults"
Before writing layout code, **record three tempting defaults you deliberately rejected in code comments** and why they do not fit the specific domain:

```css
/*
 * DESIGN DIRECTION & REJECTED DEFAULTS:
 * Rejected Default 1: Dark Obsidian theme with neon purple glow -> Needs clean daylight contrast for dense tabular scannability.
 * Rejected Default 2: Centered marketing hero with 3 metric cards -> User primary task is instant data entry, not marketing overview.
 * Rejected Default 3: Heavy glassmorphism / backdrop-blur -> Reduces text contrast and degrades rendering performance.
 */
```

### Positive Structural Layout Archetypes (Hard Constraints)
Every screen must commit to one of these three explicit structural layout paradigms to prevent falling back on symmetrical 3-card grids:
1. **The 7:3 Asymmetric Functional Split**: Desktop viewport is split into 70% primary work canvas (table, editor, form) and 30% persistent, sticky contextual inspection or action rail.
2. **Left-Aligned Typographic Lead**: Oversized display headline (`clamp(2.25rem, 4vw, 4rem)`), tight tracking (`-0.03em`), left-aligned with a parallel metadata sidebar (status badge, timestamp, author), completely replacing centered marketing slogans.
3. **High-Density Linear Ledger**: Full-width horizontal rows with hairline borders, tabular-numeric columns (`tabular-nums`), inline state chips, and zero nested cards.

*(See [references/visual-craft.md](references/visual-craft.md) for benchmark studies on Pitch, Liveblocks, Resend, and Cal.com).*

---

## 3. Interaction Decision Matrix

Choose container patterns that protect user attention and minimize cognitive context switches:

- **Modal (`<dialog>`)**: Destructive confirmations, critical system alerts, or simple single-field micro-actions. *Never put multi-step forms or wide data tables in a modal.*
- **Drawer / Sheet**: Deep inspection or editing of a list/table row while keeping background scroll context visible.
- **Dedicated Page**: High-focus multi-stage wizards, account dashboards, complex configuration.
- **Native Popover (`popover`)**: Transient filter menus, contextual action toolbars, field hints.
- **Inline Edit**: In-place single field updates with optimistic feedback.

*(See [references/product-process.md](references/product-process.md) for JTBD formulas and flow modeling).*

---

## 4. Vanilla CSS & Token Architecture (Greenfield Projects)

For greenfield projects without existing frameworks, default to **Vanilla CSS with native CSS Custom Properties** for maximum performance and flexibility.

### 3-Tier Token Blueprint
```css
:root {
  /* Tier 1: Primitives */
  --color-slate-50:  hsl(210 20% 98%);
  --color-slate-900: hsl(215 25% 12%);
  --color-blue-600:  hsl(221 83% 53%);

  /* Tier 2: Semantic Roles */
  --surface-canvas:    var(--color-slate-50);
  --surface-card:      #ffffff;
  --text-primary:      var(--color-slate-900);
  --border-subtle:     hsl(215 14% 88%);
  --intent-primary:    var(--color-blue-600);

  /* Physics & Durations */
  --ease-snappy: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 160ms;

  /* Elevation */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05);
  --shadow-card: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}
```

### Layout Resilience & Modern CSS
- **Fluid Typography**: Use `clamp()` for continuous font and spacing scaling between 360px and 1280px.
- **Intrinsic Grids**: `grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));`.
- **Defensive Sizing**: Flex children with text truncation must include `min-width: 0;`.
- **Container Queries**: Use `@container` to adapt child components to parent width, not just window width.

*(See [references/layout-and-resilience.md](references/layout-and-resilience.md) for fluid scales and defensive CSS).*

---

## 5. Defensive State Coverage & Accessibility Floor

Every production frontend interface must satisfy non-negotiable craft requirements:

### The 5 Essential UI States
1. **Ideal State**: Clean presentation with balanced hierarchy.
2. **Loading State**: Content-shaped shimmer skeletons matching upcoming layout geometry (avoid full-page spinners).
3. **Empty State**: Purposeful graphic or indicator, friendly explanation, and primary action to populate data.
4. **Error State**: Actionable recovery message with a "Retry" trigger, preserving entered user input.
5. **Partial / Overflow State**: Handles 40-character names, missing avatars, null data fallbacks (`—`), and 320px mobile viewports.

### Accessibility Floor (WCAG 2.2 AA)
- Touch targets $\ge 44 \times 44\text{px}$ on touch viewports.
- Text contrast ratio $\ge 4.5:1$ against surface background.
- High-contrast `:focus-visible` outline rings on all interactive elements.
- Native form validation using `:user-invalid` so users aren't scolded prematurely while typing.
- Full keyboard operability (Tab order, Escape to close dialogs/menus).

*(See [references/interaction-and-a11y.md](references/interaction-and-a11y.md) for HTML5 `<dialog>`, Popover API, and trust patterns).*

---

## 6. Calibrated Motion Design

1. **CSS First**: Implement transitions and state animations in native CSS.
2. **Motion Safety**: Always include `@media (prefers-reduced-motion: reduce)` overrides to disable animations for users sensitive to motion.
3. **GSAP Restraint**: Use standard free GSAP 3 core only when complex multi-track timeline scrubbing or coordinate choreography is strictly necessary. Never reference paid Club GreenSock plugins.

*(See [references/motion-and-gsap.md](references/motion-and-gsap.md) for spring easing physics and GSAP cleanup patterns).*

---

## 7. Design Validation & Quality Gates

Assess output honestly. **Never award self-congratulatory 10/10 or 98/100 scores**. High-craft production code typically scores **8.0 – 8.8 / 10.0** with documented tradeoffs and next iteration steps.

```markdown
### 📊 Calibrated Design Review
- Product Fit: [X]/10
- Task Clarity (Single Primary Action): [X]/10
- Information Architecture: [X]/10
- Interaction Ergonomics: [X]/10
- Visual Hierarchy & Taste: [X]/10
- Accessibility (WCAG AA, Touch $\ge 44\text{px}$): [X]/10
- Defensive UI (5 States, 320px responsive): [X]/10
- Code Quality (Token consistency, zero dead bloat): [X]/10
**Overall Calibrated Score: [X.X] / 10.0**
*Documented Tradeoffs & Next Iterations:* [Brief note]
```

### The 9-Point Anti-AI-Slop Test
1. **Squint Test**: Does visual hierarchy hold at low resolution?
2. **Logo Removal Test**: Does brand character persist without a logo?
3. **Template Test**: Is layout custom-derived from the domain rather than generic cards?
4. **Contrast Grayscale Test**: Is copy and boundary hierarchy clear in pure grayscale?
5. **Reduced Motion Test**: Does the interface function cleanly without motion?
6. **Touch Target Test**: Are all mobile buttons $\ge 44 \times 44\text{px}$?
7. **Single Primary Action Test**: Is there only ONE visual primary button above the fold?
8. **Extreme Content Test**: Does layout survive 35-character strings and zero metrics?
9. **Token Purity Test**: Are all values bound to design tokens without arbitrary magic numbers?

*(See [references/validation-and-qa.md](references/validation-and-qa.md) for full gate criteria).*

---

## 8. Reference Protocols Catalog

All detailed references are consolidated into 6 lean, high-density files:

- [references/visual-craft.md](references/visual-craft.md) — Positive structural layout archetypes (7:3, typographic lead, ledger), non-trope benchmarks (Pitch, Resend, Cal.com), and 3-tier token architecture.
- [references/product-process.md](references/product-process.md) — 20/80 time budget rule, JTBD formulas, interaction decision matrix, and lean DDRs.
- [references/interaction-and-a11y.md](references/interaction-and-a11y.md) — WCAG AA/AAA floor, Popover API, `<dialog>`, `:user-invalid`, and 5 core UI states.
- [references/motion-and-gsap.md](references/motion-and-gsap.md) — CSS-first transitions, spring curves, reduced motion, and lightweight GSAP core.
- [references/layout-and-resilience.md](references/layout-and-resilience.md) — Fluid typography (`clamp()`), subgrid, container queries, and defensive CSS sizing.
- [references/validation-and-qa.md](references/validation-and-qa.md) — 10-dimension calibrated scorecard, 9-point anti-slop audit, and release gates.

---

## 9. Production Example Implementations

Study these three concise, real-world examples:

1. **[examples/saas-pricing-tier](examples/saas-pricing-tier)** — High-converting pricing comparison with annual/monthly switch, fluid type, and honest 8.5/10 review.
2. **[examples/analytics-dashboard](examples/analytics-dashboard)** — High-density SRE edge latency telemetry with monospace tabular alignment, live indicators, and honest 8.4/10 review.
3. **[examples/checkout-flow](examples/checkout-flow)** — Accessible split-screen subscription checkout with native `:user-invalid` validation, trust indicators, and honest 8.6/10 review.
