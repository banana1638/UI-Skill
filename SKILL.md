---
name: design-premium-frontends
description: End-to-end Product Design and Senior Frontend Engineering system. Orchestrates product reasoning from Discovery → Strategy → Feature Architecture → UX & IA → Interaction Design → Visual Direction → Design System → Production Implementation → Design Validation. Enforces complexity-based workflows (Level 1 Surgical Fix to Level 4 Full Product Design), interaction decision trees (Modal vs Drawer vs Page), cognitive load management (Hick's, Fitts's, Progressive Disclosure), state feedback loops, token architecture, and 10-dimension design review scoring. Do not trigger for backend-only work, pure copy edits, or database tasks.
---

# Product Design & Premium Frontend Architecture System

Transform high-level, ambiguous product requirements into rigorous, authentic, production-grade digital experiences. This system treats **Product Strategy, Domain Modeling, Information Architecture, Interaction Ergonomics, Visual Art Direction, Motion Physics, and Defensive Code Craft** as one seamless discipline.

---

## 1. The 10-Layer Product Design Pipeline

Codex reasons through product initiatives via a ten-layer architectural cascade:

```text
01 PRODUCT DISCOVERY      ──> Problem Quad-Layer, Personas, JTBD, Non-Goals
        ↓
02 PRODUCT STRATEGY       ──> Vision, Opinionated Principles, Scoping, Metrics
        ↓
03 PRODUCT ARCHITECTURE   ──> Capability Mapping, Feature Decomposition
        ↓
04 UX ARCHITECTURE        ──> User Journeys, Route Sitemaps, Information Architecture
        ↓
05 INTERACTION DESIGN     ──> User Flows, Form Factors (Drawer vs Modal), DDRs
        ↓
06 VISUAL DIRECTION       ──> Visual Thesis, Archetype DNA, Typography & Color
        ↓
07 DESIGN SYSTEM          ──> 3-Layer Token Scale, Semantic Roles, CVA Primitives
        ↓
08 PROTOTYPING            ──> Multi-state Workflows, Screen Transitions, Micro-haptics
        ↓
09 FRONTEND CRAFT         ──> Defensive UI, A11y (WCAG AA), Mobile 320px+, Touch Targets
        ↓
10 DESIGN VALIDATION      ──> 10-Dimension Scorecard, 9-Point Anti-AI-Slop Audit
```

---

## 2. Task Classification & Complexity Gate (Orchestration Engine)

Before writing any code or documentation, classify the incoming request into the appropriate complexity tier:

```text
┌─────────────────────────────────────────────────────────────┐
│ Is this a backend-only / non-UI task?                       │
│ └── YES: Do NOT trigger UI/Product Design workflows.       │
├─────────────────────────────────────────────────────────────┤
│ Level 1: Surgical UI Fix                                    │
│ (CSS bugs, alignment, padding, token swap, minor copy)     │
│ └── Workflow: Inspect → Fix → Validate                     │
├─────────────────────────────────────────────────────────────┤
│ Level 2: Screen Design                                      │
│ (Single standalone view, landing page, settings screen)     │
│ └── Workflow: Context → Hierarchy → Thesis → UI → Review   │
├─────────────────────────────────────────────────────────────┤
│ Level 3: Feature Design                                     │
│ (Multi-step flow, checkout, course registration, messaging)│
│ └── Workflow: Problem → Scope → Flow → IA → DDR → UI → QA  │
├─────────────────────────────────────────────────────────────┤
│ Level 4: Full Product Design                                │
│ (Greenfield SaaS, multi-role portal, enterprise system)     │
│ └── Workflow: Discovery → Strategy → Capability → IA →     │
│               Journey → Domain UX → Tokens → Screens → QA   │
└─────────────────────────────────────────────────────────────┘
```

> **Cardinal Rule on Premature UI**:
> For **Level 3** and **Level 4** initiatives, **DO NOT** jump straight from requirement to HTML/React/CSS markup. First establish and present the structural product foundation (Scope, IA, Flow, Key DDRs).

---

## 3. Product Discovery & Strategic Modeling (Levels 3 & 4)

1. **Problem Framing (Quad-Layer)**: Dissect every request into Business, User, Technical, and Design problems. Never treat a requested feature (e.g., *"Make a dashboard"*) as the root problem. (See [references/product-discovery-protocol.md](references/product-discovery-protocol.md)).
2. **Jobs To Be Done (JTBD)**: Model user intent using the outcome formula:
   > *When [Context], I want to [Core Action], so that [Outcome/Relief].*
3. **Opinionated Principles & Non-Goals**: Establish explicit trade-off rules (e.g., *Context preservation over screen estate*) and document what the product deliberately will **NOT** solve. (See [references/product-strategy-protocol.md](references/product-strategy-protocol.md)).
4. **Feature Decomposition**: Break domains down hierarchically: **Capability → Feature → User Task → Interaction**. Never treat layout containers (Table, Modal, Card) as features. (See [references/feature-decomposition.md](references/feature-decomposition.md)).
5. **Domain → UX Mapping**: Translate domain entities into authentic mental models and UI metaphors (e.g., *Advising Degree Tree, Kitchen Preparation Workbench, Financial Ledger*). (See [references/domain-to-ux.md](references/domain-to-ux.md)).

---

## 4. Information Architecture & Interaction Design

1. **Information Architecture (IA)**: Design logical sitemaps, route hierarchies, and faceted filter structures prior to page layout. (See [references/information-architecture.md](references/information-architecture.md)).
2. **5-Level Flow Modeling**: Map progressions through **Journey → User Flow → Task Flow → Screen Flow → Interaction Flow**. (See [references/user-journey-protocol.md](references/user-journey-protocol.md)).
3. **Interaction Pattern Decision Tree**:
   - **Modal**: Interruptive, destructive confirmations or micro-actions only. *Never put multi-step forms or heavy data tables inside a modal.*
   - **Sheet / Drawer**: Contextual inspection/editing of a list item while preserving background scroll anchor.
   - **Dedicated Page / Sub-page**: High-focus, multi-stage wizards, and immersive analytics.
   - **Inline Edit / Popover**: Zero-interruption in-place editing for low-risk single fields.
4. **Design Decision Records (DDR)**: Justify structural trade-offs with context, evaluated options, chosen rationale, and mobile mitigations. (See [references/design-decision-record.md](references/design-decision-record.md)).

---

## 5. Visual Direction & Design System Architecture

1. **Visual Thesis**: Formulate an intentional design thesis statement:
   > *"This interface should feel [2-3 emotional qualities] through [2-3 concrete visual mechanisms], while keeping [primary task] effortless and accessible."*
2. **Archetype DNA**: Select a tailored visual persona (Modern Tech, Neo-Brutalism, Warm Editorial, Enterprise Clean, Obsidian Cyberpunk, Skeuomorphic Tactile). (See [references/visual-direction-system.md](references/visual-direction-system.md)).
3. **3-Tier Token Blueprint**: Define tokens strictly by hierarchy: **Raw Scales → Semantic Roles → Component Overrides**.
   ```css
   :root {
     --surface-canvas: hsl(220 20% 98%);
     --text-primary: hsl(220 30% 10%);
     --accent-brand: hsl(245 80% 60%);
     --border-subtle: hsl(220 15% 90%);
     --ease-snappy: cubic-bezier(0.16, 1, 0.3, 1);
     --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
     --shadow-elevation: 0 8px 24px -4px rgba(0, 0, 0, 0.08);
   }
   ```
4. **CVA Component Architecture**: Decouple styling variants with Class Variance Authority (`cva`) and utility helpers (`cn()`). Never dump >12 arbitrary Tailwind classes into raw markup. (See [references/framework-adapters.md](references/framework-adapters.md)).

---

## 6. Frontend Engineering & Defensive Craft

1. **Accessibility Floor (WCAG AA)**:
   - Body copy size $\ge 14\text{px}$ (`text-sm`); `text-xs` restricted to badges and secondary timestamps.
   - Text contrast ratio $\ge 4.5:1$ against surface background.
   - Interactive touch targets $\ge 44 \times 44\text{px}$ on mobile.
   - Visible high-contrast focus rings (`:focus-visible`).
2. **Defensive UI Integrity**:
   - Flex parents must include `min-w-0` to avoid layout blowout; dynamic text must use `truncate` or `line-clamp-*`.
   - Every data view must implement **Loading (Skeleton), Actionable Empty, and Error Retry** states.
3. **Calibrated Motion Physics**:
   - Primary panels & drawers: Snappy Spring `cubic-bezier(0.16, 1, 0.3, 1)`.
   - Buttons & tactile controls: Bounce `cubic-bezier(0.34, 1.56, 0.64, 1)`.
   - Motion safety: Wrap hover styles in `@media (hover: hover)` and respect `prefers-reduced-motion`.

---

## 7. Product Validation & Design Quality Gates

Before delivery, evaluate the work using the **10-Dimension Scorecard** and the **9-Point Anti-AI-Slop Test Suite** (See [references/product-validation.md](references/product-validation.md)):

```markdown
### 📊 Design Review Scorecard
- Product Fit: [X]/10
- User Understanding: [X]/10
- Task Clarity: [X]/10
- Information Architecture: [X]/10
- Interaction Design: [X]/10
- Visual Hierarchy: [X]/10
- Visual Identity: [X]/10
- Accessibility: [X]/10
- Consistency: [X]/10
- Technical Quality: [X]/10
**Overall Score: [X.X] / 10.0** — Verdict: [PASS | REVISE]
```

### The 9-Point Anti-AI-Slop Tests
1. **Squint Test**: Does visual hierarchy hold at low resolution?
2. **Logo Removal Test**: Does brand character persist without a logo?
3. **Motion Purpose Test**: Does all movement serve spatial feedback?
4. **High Contrast Test**: Is copy legible in pure grayscale?
5. **Template Test**: Is layout custom-derived from the domain rather than generic cards?
6. **Metaphor Test**: Do UI metaphors match real user mental models?
7. **Hierarchy Test**: Is there only ONE clear Primary Action per viewport?
8. **Task Test**: Can users complete their core JTBD with minimal friction?
9. **Consistency Test**: Are 100% of styles derived from design tokens?

---

## 8. Reference Protocols Catalog

- [references/product-discovery-protocol.md](references/product-discovery-protocol.md) — Quad-layer problem definition, Persona taxonomy, JTBD, Goals, Non-goals.
- [references/product-strategy-protocol.md](references/product-strategy-protocol.md) — Product vision, opinionated principles, MoSCoW scoping, KPIs, Product Brief template.
- [references/feature-decomposition.md](references/feature-decomposition.md) — Capability → Feature → Task → Interaction 4-tier cascade.
- [references/domain-to-ux.md](references/domain-to-ux.md) — Domain concepts to user mental models, interaction models, and authentic UI metaphors.
- [references/user-journey-protocol.md](references/user-journey-protocol.md) — 5-level flow hierarchy, journey narratives, and exception path recovery.
- [references/information-architecture.md](references/information-architecture.md) — Sitemaps, navigation ontologies, faceted search, RBAC route projections.
- [references/design-decision-record.md](references/design-decision-record.md) — DDR schema, architectural trade-offs, and interaction justification.
- [references/design-deliverables.md](references/design-deliverables.md) — Level 1 to Level 4 output contracts and premature UI prevention rules.
- [references/product-validation.md](references/product-validation.md) — 8-pillar validation matrix, 10-dimension review score, and 9-point Anti-AI-Slop suite.
- [references/product-design-protocol.md](references/product-design-protocol.md) — Interaction pattern trees, cognitive load laws (Hick's/Fitts's), and feedback loops.
- [references/visual-direction-system.md](references/visual-direction-system.md) — 7 visual archetypes, typography matrix, and visual DNA formulas.
- [references/color-and-token-system.md](references/color-and-token-system.md) — 3-layer token scale, OKLCH/HSL color roles, and elevation mechanics.
- [references/framework-adapters.md](references/framework-adapters.md) — CVA architecture, Tailwind token binding, and React/Vue/Svelte adapters.
- [references/gsap-animation-patterns.md](references/gsap-animation-patterns.md) — Timeline orchestration, ScrollTrigger, and spring easing physics.
- [references/accessibility-motion-performance.md](references/accessibility-motion-performance.md) — WCAG AA compliance, focus rings, and reduced motion safety.
- [references/interface-craft-checklist.md](references/interface-craft-checklist.md) — Component state auditing, defensive containment, and delivery checks.
- [references/fluid-layout-and-typography.md](references/fluid-layout-and-typography.md) — Fluid type scales, intrinsic layouts, and container queries.
- [references/form-and-trust-patterns.md](references/form-and-trust-patterns.md) — Inline form validation, error recovery, and high-trust patterns.
