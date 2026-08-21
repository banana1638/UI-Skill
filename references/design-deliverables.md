# Design Deliverables Contract

This protocol establishes strict **delivery tiers and output contracts** based on task complexity, ensuring appropriate rigor without bureaucratic overhead.

---

## 1. Complexity-Based Tiering Matrix

Codex must categorize every incoming request into one of four operational tiers:

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ Level 1: Surgical UI Fix                                                │
│ (CSS bugs, alignment, token swaps, minor text edits, contrast tweaks)  │
├─────────────────────────────────────────────────────────────────────────┤
│ Level 2: Screen Design                                                  │
│ (Single standalone screen, landing page, settings view, detail view)    │
├─────────────────────────────────────────────────────────────────────────┤
│ Level 3: Feature Design                                                 │
│ (Multi-step flow, checkout, course registration, checkout, messaging)   │
├─────────────────────────────────────────────────────────────────────────┤
│ Level 4: Full Product Design                                            │
│ (Greenfield SaaS, multi-role platform, enterprise portal, major revamp) │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Tier Deliverables & Protocol Execution

### Level 1 — Surgical UI Fix
- **Triggers**: *"Fix the button alignment"*, *"Adjust the badge contrast"*, *"Fix mobile horizontal scroll on card"*.
- **Mandatory Workflow**:
  1. **Inspect**: Pinpoint the broken CSS rule, class conflict, or DOM structure.
  2. **Fix**: Apply minimal, robust patch using existing design tokens.
  3. **Validate**: Verify visual fix across desktop and mobile without regressions.
- **Strict Boundary**: 🛑 **DO NOT** execute product discovery, personas, or design system refactors for Level 1 tasks.
- **Output**: Direct code patch + 1-sentence explanation.

---

### Level 2 — Screen Design
- **Triggers**: *"Design a landing page for our developer API"*, *"Create a settings profile page"*, *"Design an analytics dashboard screen"*.
- **Mandatory Workflow**:
  1. **Context & User Goal**: State primary screen objective and target audience.
  2. **Information Hierarchy**: Define Primary Action, Secondary actions, and content zones.
  3. **Interaction Pattern Selection**: Choose layout form factors (Hero, Bento, Feed, Data Table).
  4. **Visual Direction & Thesis**: Formulate visual personality statement and select typography/colors.
  5. **UI & Defensive States**: Build complete screen with Loading, Empty, and Error states.
  6. **Design Review**: Run Pre-Flight check and visual quality score.
- **Output Contract**:
  - `💡 Screen Design Rationale`: Summary of Goal, IA hierarchy, and Visual Thesis.
  - Complete, production-ready code with defensive edge states.

---

### Level 3 — Feature Design
- **Triggers**: *"Design the checkout and payment experience"*, *"Build the student course registration flow"*, *"Implement the document verification workflow"*.
- **Mandatory Workflow**:
  1. **Problem & Scope**: Identify user friction and feature boundaries (Must vs Won't Have).
  2. **User Journey & Flow**: Diagram happy-path steps and exception/recovery branches.
  3. **Information Architecture**: Define sub-routes and drawer/modal interaction boundaries.
  4. **Design Decision Records (DDR)**: Justify structural trade-offs (e.g., Drawer vs Modal).
  5. **Visual Direction & Design System Integration**: Bind tokens, typography, and motion curves.
  6. **Interactive Components & State Completeness**: Implement all resting, hover, active, loading, empty, and error states.
  7. **Validation**: Audit task completion friction and responsive fidelity.
- **Output Contract**:
  - `📋 Feature Architecture Summary`: Scope, JTBD, and Flow Diagram.
  - `💡 Key DDRs`: Justification for component form factors.
  - Interactive multi-state UI implementation.

---

### Level 4 — Full Product Design
- **Triggers**: *"Design a new university student portal from scratch"*, *"Build a multi-tenant logistics management platform"*, *"Architect a complete B2B SaaS product"*.
- **Mandatory Workflow**:
  1. **Product Discovery** (`references/product-discovery-protocol.md`): Quad-layer problem analysis, Personas, JTBD, Goals, Non-goals.
  2. **Product Strategy** (`references/product-strategy-protocol.md`): Vision, opinionated principles, MoSCoW scoping, KPI targets, Product Brief.
  3. **Feature Decomposition** (`references/feature-decomposition.md`): Capability → Feature → User Task → Interaction breakdown.
  4. **Domain → UX Mapping** (`references/domain-to-ux.md`): Domain concepts translated to authentic mental models and UI metaphors.
  5. **Information Architecture** (`references/information-architecture.md`): Global sitemap, route hierarchy, faceted search, RBAC projections.
  6. **User Journey & Flow** (`references/user-journey-protocol.md`): Multi-stage journeys, detailed user flows, and error recovery paths.
  7. **Visual Direction & Thesis** (`references/visual-direction-system.md`): Archetype DNA, brand thesis, typography pairing, token scale.
  8. **Design System & Tokens** (`references/color-and-token-system.md`): Semantic token layers, components, CVA architecture.
  9. **Interactive Screens & Prototypes**: Full implementation of critical path screens and high-fidelity micro-interactions.
  10. **Product Validation & QA** (`references/product-validation.md`): 10-dimension review score, Anti-AI-Slop audit, automated linter verification.
- **Output Contract**:
  - `📄 Product Architecture Brief` (Discovery, Strategy, Feature Map, IA, Flows, DDRs).
  - Production-grade Design System & Component Library.
  - Interactive Prototype / Multi-Screen Frontend Code.
  - `📊 Design Review Scorecard` (10 dimensions with severity grading).

---

## 3. Operational Anti-Premature UI Rule

> ⚠️ **MANDATORY ENFORCEMENT**:
> For **Level 3** and **Level 4** requests, Codex is strictly prohibited from generating raw HTML/JSX markup in the first response without first presenting the **Product Architecture & Design Decision Summary**.
> 
> *First establish the domain foundation, user flows, and interaction trade-offs—then build the pixel-perfect implementation.*
