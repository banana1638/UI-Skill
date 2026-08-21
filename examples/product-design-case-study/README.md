# Product Design Case Study: Apex Academic

This example demonstrates the complete **End-to-End Product Design Pipeline** (Level 4 Product Architecture) applied to higher-education registration.

---

## What This Example Demonstrates

Unlike superficial UI templates that assemble generic cards and sidebars, this case study documents the complete reasoning trail:

1. **Problem Framing**: Dissected user anxiety during enrollment morning into a proactive conflict resolution need.
2. **JTBD Alignment**: Built around the primary job: *"Simulate weekly schedule and resolve class time collisions in real-time."*
3. **Capability Decomposition**: Academic Course Operations → Timetable Planning & Conflict Detection.
4. **Information Architecture**: Single-glance split workspace (Timetable 65% / Staged Shelf 35%) with non-blocking contextual drawer.
5. **DDR-001**: Used a slide-out drawer over a centered modal to preserve the visual spatial anchor of the weekly Monday–Friday schedule.
6. **Design System & Tokens**: Clean 3-tier token architecture with WCAG AA compliance and spring physics.
7. **Production Implementation**: Fully interactive simulator with optimistic commit loops and instant feedback.

---

## Artifacts in this Example

- `product-brief.md`: The Discovery, Strategy, Feature Decomposition, IA, Journey, and DDR documentation.
- `tokens.css`: The 3-tier design token scale.
- `styles.css`: Complete responsive styling, grid layout, and drawer transitions.
- `index.html`: Production-grade markup with semantic elements and accessibility attributes.
- `app.js`: Interactive state controller demonstrating conflict swapping and optimistic commits.
