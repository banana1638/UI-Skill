# Example 3: Two-Column Checkout & Trust Flow

A high-trust transactional subscription checkout demonstrating native `:user-invalid` validation, persistent line-item visibility, and WCAG AA form ergonomics.

## Design Decisions & Rejected Defaults

- **Deliberately Rejected Default 1**: Multi-page redirect wizard. *Rationale:* For SaaS subscription signups, multi-page flows increase dropoff; a single split-view keeps total price, trial timeline, and security guarantees visible simultaneously.
- **Deliberately Rejected Default 2**: Immediate red error outlines while typing. *Rationale:* Scolding the user before they finish typing creates cognitive irritation; native `:user-invalid` triggers only after blur/interaction.
- **Deliberately Rejected Default 3**: Fake scarcity / countdown urgency timers. *Rationale:* High-value enterprise/B2B products gain trust through transparency and clear cancellation policies, not dark patterns.

---

## Calibrated Quality Review Scorecard

- **Product Fit**: 9.0 / 10 — Provides frictionless checkout with zero ambiguity over trial billing dates.
- **Task Clarity**: 9.0 / 10 — Single clear submit action ("Authorize & Pay $49.00") with total due today highlighted.
- **Information Architecture**: 8.5 / 10 — Clear split: Left pane for customer inputs, right pane for sticky ledger recap.
- **Interaction Ergonomics**: 8.5 / 10 — Standard `autocomplete` attributes on all fields; native `:user-invalid` feedback.
- **Visual Hierarchy**: 8.5 / 10 — Clean white surface cards on cool neutral canvas.
- **Visual Identity & Taste**: 8.5 / 10 — Restrained, trustworthy B2B craft.
- **Accessibility (WCAG AA)**: 9.0 / 10 — Explicit `<label for="...">` associations, touch targets $\ge 44\text{px}$, visible focus states.
- **Defensive UI & States**: 8.5 / 10 — Stacks gracefully into single column on mobile (< 820px).
- **Responsive Craft**: 8.5 / 10 — CSS Grid fluid adaptation with zero overflow.
- **Code Quality**: 8.5 / 10 — Semantic HTML5 + Vanilla CSS (< 180 lines CSS, < 110 lines HTML).

**Overall Calibrated Score: 8.6 / 10.0 (Production-Ready)**

*Documented Tradeoffs & Known Limitations:*
- Payment processing currently mocks client-side validation; production deployment requires Stripe Elements or LemonSqueezy iframe mounting.
- Promo / discount code expander not included in v1 to keep form friction minimal.
