# Product Process & Architecture Protocol

Proportionate product thinking designed to produce robust code, not endless documentation.

---

## 1. The 20/80 Time Budget Rule

> **CRITICAL DIRECTIVE**:
> In any user response, **Product Analysis & Design Documentation must take up NO MORE than 15-20% of the total output**. The remaining **80%+ MUST be working, fully realized, production-ready code**.
> Never output 2,000 words of discovery essays while leaving code incomplete.

### Compact Note Rule
Instead of generating separate standalone documents for Personas, JTBD, and IA, summarize key strategic decisions in a concise **5 to 10 line working note** (or inside code comments):

```text
[DESIGN CONTEXT NOTE]
- Target Persona & JTBD: Operations manager reconciling monthly payouts with zero mismatch error.
- Core Mental Model: Spreadsheet ledger with instant row-level drawer inspection.
- Key Tradeoff (DDR): In-context side drawer chosen over full-page route to preserve multi-row filter state.
- Primary Action: Single prominent "Approve Payout" trigger per viewport.
```

---

## 2. Streamlined Complexity Tiers

Workflows are strictly proportioned to risk:

| Tier | Scope | Required Workflow | Deliverable |
| :--- | :--- | :--- | :--- |
| **Level 1: Surgical Fix** | Bug fix, token swap, alignment, micro copy | Inspect code → Fix directly → Targeted verification | Clean code diff only |
| **Level 2: Standalone View** | Single landing page, pricing page, settings tab | 3-line Context Note → 3 Rejected Defaults → Implementation | Brief note + complete HTML/CSS |
| **Level 3: Feature System** | Multi-step checkout, interactive dashboard, booking flow | Compact Note (JTBD + IA + DDR) → UI Implementation → QA Checklist | Concise note + production code |

*(Note: Heavy enterprise systems are handled iteratively as Level 3 features rather than drowning the user in discovery paperwork.)*

---

## 3. Domain-to-UX Metaphor Mapping

Never dump domain data into generic container cards. Map core domain entities to real-world operational models:

- **Financial Ledger / Audit**: Strict row-based tabular hierarchy, monospace numeric alignment, visual reconciliation indicators (matching vs discrepancy).
- **Scheduling / Availability**: Timeline grids, slot cards with clear duration blocks, instant collision detection.
- **Workflow / Pipelines**: Linear step progress with explicit dependency states (Completed, Active, Locked, Blocked).
- **Creator / Canvas**: Toolbars anchored to selection, unconstrained canvas surface, persistent properties inspector.

---

## 4. Interaction Decision Matrix: Where does the UI live?

Choose the container pattern that minimizes cognitive friction and context loss:

| Pattern | When to Use | When NOT to Use |
| :--- | :--- | :--- |
| **Modal (`<dialog>`)** | Destructive confirmation, critical interrupting alerts, single micro-actions (< 3 fields). | Multi-step flows, complex forms, data tables, anything requiring background comparison. |
| **Drawer / Sheet** | Deep inspection or editing of a list/table item where background context must remain visible. | Primary global navigation, short confirmation messages. |
| **Dedicated Page** | High-focus multi-stage workflows, immersive dashboards, settings directories. | Quick single-field edits, transient statuses. |
| **Popover (Native API)** | Secondary filters, quick selectors, inline contextual actions. | Forms with multiple required inputs or file uploads. |
| **Inline Editing** | Low-risk single data edits (e.g., renaming a project title). | Edits requiring complex cross-field validation or cascading side effects. |

---

## 5. Design Decision Records (DDR)

When making a non-obvious architecture or interaction decision, capture it in 3 lines:
1. **Context & Problem**: What specific constraint forced a choice?
2. **Options Evaluated**: Option A vs Option B.
3. **Rationale**: Why Option A was chosen and how potential drawbacks are mitigated.
