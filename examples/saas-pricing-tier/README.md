# Example 1: SaaS Pricing & Feature Tier

A clean, production-grade SaaS pricing comparison matrix demonstrating typographic hierarchy, semantic token architecture, accessible toggling, and zero AI-slop tropes.

## Design Decisions & Rejected Defaults

- **Deliberately Rejected Default 1**: Dark Obsidian mode with neon purple glow. *Rationale:* Developers and engineering leads comparing budgets need crisp daylight contrast and clear tabular scannability.
- **Deliberately Rejected Default 2**: Centered marketing hero with abstract gradient blobs. *Rationale:* Lead directly with the pricing matrix; users navigating to `/pricing` already understand the product category.
- **Deliberately Rejected Default 3**: Accordion-hidden feature matrices. *Rationale:* Hiding key limits (like bandwidth and retention) creates distrust during purchasing evaluation.

---

## Calibrated Quality Review Scorecard

- **Product Fit**: 8.5 / 10 — Directly solves the buyer's evaluation JTBD with instant annual/monthly calculation.
- **Task Clarity**: 9.0 / 10 — One standout Primary Action ("Start 14-Day Trial" on Pro), with secondary actions quieted down.
- **Information Architecture**: 8.5 / 10 — Clean 3-tier progressive capability scale (Starter → Pro → Enterprise).
- **Interaction Ergonomics**: 8.5 / 10 — Accessible `role="group"` with `aria-pressed` states on the billing switch.
- **Visual Hierarchy**: 8.5 / 10 — Clear visual anchor on the featured tier without excessive decoration.
- **Visual Identity & Taste**: 8.0 / 10 — Clean, utilitarian craft without generic AI templates.
- **Accessibility (WCAG AA)**: 9.0 / 10 — All touch targets $\ge 44\text{px}$, focus rings styled, contrast ratios exceed 5.5:1.
- **Defensive UI & States**: 8.0 / 10 — Clean down to 320px mobile viewports; tabular numbers prevent layout jitter during number switches.
- **Responsive Craft**: 8.5 / 10 — Fluid typography (`clamp()`) and auto-fit intrinsic grid.
- **Code Quality**: 8.5 / 10 — Pure HTML5 + Vanilla CSS (< 180 lines CSS, < 120 lines HTML), zero external runtime dependencies.

**Overall Calibrated Score: 8.5 / 10.0 (Production-Ready)**

*Documented Tradeoffs & Known Limitations:*
- Does not yet include a multi-currency switcher (e.g., EUR / GBP) for international billing.
- Enterprise tier currently links to `#contact-sales` rather than opening an inline lead qualification drawer.
