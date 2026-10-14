---
name: design-premium-frontends
description: Product design and premium frontend architecture for substantial user-facing UI work: new products, multi-step features, screen redesigns, dashboards, design systems, and sophisticated interaction or motion implementation. Grounds work in the project's existing standards, applies proportionate product reasoning, enforces accessible production craft, and makes deliberate, non-templated visual decisions. Do not trigger for backend-only work, pure copy edits, data/schema tasks, or small UI fixes unless the user asks for design judgment, interaction craft, or visual polish.
---

# Product Design & Premium Frontend Architecture System

Transform high-level, ambiguous product requirements into rigorous, authentic, production-grade digital experiences. This system treats **Product Strategy, Domain Modeling, Information Architecture, Interaction Ergonomics, Visual Art Direction, Motion Physics, and Defensive Code Craft** as one seamless discipline. Apply it proportionally: preserve the requested scope, avoid ceremony for small fixes, and add process only when it improves the outcome.

## Operating Charter: Authority, Restraint, and Evidence

### 1. Authority hierarchy — never overwrite local truth

Resolve conflicts in this order:

1. Explicit user requirements and approved brand, legal, or accessibility requirements.
2. Repository instructions and source-of-truth documents (`AGENTS.md`, `DESIGN.md`, contribution guides, component-library docs, tokens, screenshots, and established patterns).
3. Framework/platform conventions and published accessibility standards.
4. This skill's defaults and examples.

Before choosing a visual direction or architecture, inspect the relevant local guidance and adjacent components. Reuse the existing token names, primitives, icon system, state patterns, and framework idioms when they exist. Do not introduce a new font, library, motion system, token layer, or visual archetype merely to make the output look more impressive.

If the repository has no governing design guidance, state the assumptions briefly and create only the smallest reusable contract required for the task. When a user instruction conflicts with a local convention, follow the user and name the impact rather than silently replacing unrelated work.

### 2. Proportionality rule — earn every artifact

- **Level 1:** inspect, make the smallest safe change, and run a targeted check. Do not produce discovery documents, visual theses, or scorecards.
- **Level 2:** record a concise task, audience, hierarchy, and visual direction before building. Keep this to a short working note unless the user requests a formal document.
- **Level 3–4:** establish scope, IA/flow, and material interaction decisions before implementation. Surface a compact rationale; produce formal briefs, maps, or DDRs only when they change an implementation decision or the user requests them.
- Do not add a design system, animation, illustration, or a novel interaction solely because the skill mentions it. Omit it when it does not serve the primary task.

### 3. Delivery evidence — claims must be checkable

Never claim the design is accessible, responsive, tokenized, or validated without inspecting or testing the relevant result. If a check cannot run, report the gap and the manual evidence instead. Treat generated patches and automated critique as suggestions; review their diff and preserve project conventions before applying them.

### 4. Source-of-truth continuity — design, code, and delivery agree

When a Figma file, design specification, component API, or token source exists, identify which artifact is authoritative for each decision. Preserve a traceable chain: **brief → source design or contract → token/component → implementation → validation evidence**. Record material deviations with the reason and owner. If no design source exists, say so; never invent a Figma link, component contract, analytics event, security claim, or benchmark result.

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
> For **Level 3** and **Level 4** initiatives, **DO NOT** jump straight from requirement to HTML/React/CSS markup. First establish the structural product foundation (Scope, IA, Flow, Key DDRs). Present only the smallest summary needed to align the user; do not turn planning into a deliverable by default.

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
4. **Component Architecture**: When patterns repeat or variants multiply, use the project's established variant and composition pattern. In Tailwind projects, this may be Class Variance Authority (`cva`) and `cn()`; do not introduce them where another local pattern is authoritative. Extract repeated styling because it repeats or has meaningful states—not because a class-count threshold was crossed. (See [references/framework-adapters.md](references/framework-adapters.md) and [references/compound-components-and-modern-css.md](references/compound-components-and-modern-css.md)).

### Distinctiveness and Restraint Gate (Level 2+)

Ground the visual direction in the actual subject matter, audience, content, materials, and task—not a generic style label. Before implementation, write a compact design contract:

- **Primary job and audience:** What must become easier for whom?
- **Signature decision:** The one visual, spatial, typographic, or interaction choice that makes this work recognizably specific to the brief.
- **Restraint budget:** Spend boldness in one place; keep the surrounding hierarchy quiet, legible, and task-focused.
- **Three rejected defaults:** Name three tempting choices that would make this design feel interchangeable, and why they do not fit this brief.

Do not reach automatically for centered hero copy, a metric-card grid, evenly rounded cards, decorative gradients, a single acid accent on near-black, warm-cream editorial styling, generic typefaces, all-caps eyebrows, or arrows appended to every action. They are permitted only when they are demonstrably the best fit for this project. Prefer real content and subject-specific visual material over placeholder copy and decorative chrome. See [references/design-inspiration-and-benchmarks.md](references/design-inspiration-and-benchmarks.md) and [references/visual-direction-system.md](references/visual-direction-system.md).

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

Motion is opt-in, not decoration. Add it only when it clarifies hierarchy, spatial continuity, status feedback, or direct manipulation. One well-orchestrated transition is preferable to scattered entrance effects; static clarity always wins over theatricality. See [references/taste-system-v4-avant-garde.md](references/taste-system-v4-avant-garde.md).

### Content Resilience, Localization, and Performance (when applicable)

- Treat production content as a layout input. Test long headings, names, navigation labels, unbroken identifiers, zero/large values, loading, empty, partial-permission, and error states before calling a data-bearing interface complete.
- When a product is localized, supports multiple writing directions, or could receive international input, use semantic HTML and logical CSS properties. Verify translated dates, numbers, addresses, input methods, long strings, and RTL order; never use English placeholder copy as the only layout proof.
- Preserve the repository's browser-support policy. Prefer progressive enhancement for modern CSS and platform APIs, with an explicit fallback when a core task would otherwise fail.
- Set a task-appropriate performance budget before adding expensive fonts, images, scripts, canvas, video, or animation. Measure relevant resource transfer, LCP/INP/CLS where the environment supports it; explain any exceeded budget rather than hiding it behind visual polish.
- For identity, payment, health, permissions, destructive actions, or other high-trust paths, make authority, consequences, recovery, and data handling legible. Do not invent security claims, compliance badges, urgency, scarcity, or testimonials.

---

## 7. Scripted Validation & Toolchain

Use scripts when they add observable confidence and their prerequisites are available. Keep them proportional to risk:

- **Static motion safety:** `node scripts/check-motion-safety.js <target>` for substantial animation work or unsafe-property review.
- **Render inspection:** `python scripts/render_pipeline.py <html-file-or-url>` when visual output, viewport behavior, color use, or DOM metrics matter.
- **Vision review:** `python scripts/vision_reviewer.py <path-to-summary.json> --provider mock|openai|anthropic` after a render. Use `mock` for deterministic offline checks; live providers require configured credentials and user authorization for external calls.
- **Design loop:** `python scripts/design_loop.py <html-file-or-url> --max-iter 3 --target-score 8.5 --provider mock|openai|anthropic` only for high-value iterative polish.
- **Patch generation:** Treat `scripts/patch_generator.py` output as a draft. Inspect the diff and test it before applying it.
- **Accessibility gate:** `python scripts/frontend_quality_gate.py <html-file> --strict` for a static semantic and interaction-contract scan. For interactive pages, also walk the primary flow by keyboard in a real browser.
- **Visual regression:** `python scripts/visual_regression.py <baseline-dir> <candidate-dir> --threshold 0.02` after rendering the agreed viewport and state matrix. A reviewed screenshot is not a visual-regression pass.
- **Performance budget:** `python scripts/performance_budget.py <path-to-summary.json>` after rendering a new or materially changed page. Use the project budget when present; otherwise report the default budget as a starting point, not a universal standard.


If a dependency or browser is unavailable, fall back to manual inspection and explicitly report that validation gap. Do not silently substitute a mock result for a visual review.

---

## 8. Product Validation & Design Quality Gates

Before delivery, validate proportionally. Level 1 needs targeted checks. Level 2–4 work with meaningful product or visual decisions should use the **10-Dimension Scorecard** and the **9-Point Anti-AI-Slop Test Suite**. A score is a diagnostic, not evidence; attach concrete observations or test output to any score that affects the verdict. (See [references/product-validation.md](references/product-validation.md).)

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
9. **Consistency Test**: Are recurring styles derived from coherent tokens rather than scattered one-off values?

### Non-Negotiable Release Gate

Do not mark work complete when any applicable item is unresolved:

- A local design or engineering convention was replaced without an explicit reason.
- A core path lacks a loading, empty, error, or recovery state where data or asynchronous actions are involved.
- Keyboard focus, reduced motion, contrast, responsive containment, or touch-target requirements were not checked.
- The signature decision cannot be connected to the brief, or decoration competes with the primary action.
- Validation was skipped or failed and the delivery note does not say so.
- A localized, data-bearing, sensitive, or permissioned flow shipped without the applicable content, trust, and recovery checks.
- A material design-to-code deviation, token addition, or component API change lacks a traceable source and migration note.

---

## 9. Reference Protocols Catalog

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
- [references/compound-components-and-modern-css.md](references/compound-components-and-modern-css.md) — Composition contracts, overlay semantics, and progressive modern CSS.
- [references/design-inspiration-and-benchmarks.md](references/design-inspiration-and-benchmarks.md) — Design references, typography sources, and anti-slop taste calibration.
- [references/taste-system-v4-avant-garde.md](references/taste-system-v4-avant-garde.md) — Fit-tested art direction, tactile treatments, and modern CSS primitives.
- [references/quality-assurance-and-evaluation.md](references/quality-assurance-and-evaluation.md) — Scenario-based skill evaluation, accessibility gates, and visual-regression evidence.
- [references/performance-and-content-resilience.md](references/performance-and-content-resilience.md) — Performance budgets, real-content stress tests, localization, and browser support.
- [references/design-system-governance.md](references/design-system-governance.md) — Token lifecycle, naming review, theme compatibility, and migration records.
- [references/trust-observability-and-handoff.md](references/trust-observability-and-handoff.md) — Sensitive-flow trust patterns, outcome telemetry, and design-to-code traceability.
