# Feature Decomposition Protocol

This protocol defines the structural methodology for breaking complex product spaces into clean, hierarchical functional trees.

---

## 1. The 4-Tier Decomposition Cascade

Codex must decompose a product systematically through four discrete tiers:

```text
Tier 1: Product Capability (Strategic Business Domain)
  │
  └── Tier 2: Feature (User-Facing Functional Unit)
        │
        └── Tier 3: User Task (Actionable Goal Flow)
              │
              └── Tier 4: Interaction (Atomic UI State / Trigger)
```

### The Cardinal Rule: UI Elements are NOT Features

> ❌ **FORBIDDEN MISTAKE**: Treating UI containers or presentation patterns as product capabilities.
> - *"Dashboard"* is NOT a capability; it is a presentation layout.
> - *"Sidebar"* is NOT a feature; it is a navigation component.
> - *"Modal"* is NOT a feature; it is a focus-trapping dialog.
> - *"Table"* is NOT a capability; it is a tabular data visualization.

---

## 2. Structural Decomposition Hierarchy

### Tier 1: Capability (What the system enables)
A high-level business or functional domain that delivers an independent category of value.
*Examples*: *Identity & Access*, *Course Enrollment*, *Billing & Invoicing*, *Academic Records*.

### Tier 2: Feature (How value is packaged)
A distinct functional capability delivered to an end-user to solve a specific job.
*Examples*: *Prerequisite Validation Engine*, *Schedule Conflict Resolver*, *One-Click Tuition Payment*.

### Tier 3: User Task (What the user executes)
The chronological sequence of operational steps the user performs to achieve a goal.
*Examples*: *Search elective course by instructor rating*, *Swap discussion sections*, *Authorize installment payment plan*.

### Tier 4: Interaction & Affordance (How the interface responds)
The tactile UI patterns, state transitions, micro-interactions, and visual feedback mechanisms.
*Examples*: *Typeahead autocomplete with tag pill creation*, *Drag-and-drop course block snapping with red collision line*, *Inline CVV verification with instant card brand badge*.

---

## 3. Real-World Decomposition Case: University Academic Platform

```text
University Platform
├── 1. Admissions & Enrollment
│   ├── Feature: Programme Discovery
│   │   ├── Task: Filter majors by degree type & tuition budget
│   │   └── Task: Compare prerequisite requirements side-by-side
│   ├── Feature: Digital Application
│   │   ├── Task: Auto-populate high school transcript data
│   │   └── Task: Upload certified PDF credentials with instant preview
│   └── Feature: Offer & Decision Management
│       ├── Task: Review scholarship conditions
│       └── Task: Digitally sign letter of acceptance
│
├── 2. Academic Course Operations
│   ├── Feature: Timetable Planning & Registration
│   │   ├── Task: Build hypothetical weekly schedule permutations
│   │   │   └── Interaction: Grid block collision alert (red border + shake)
│   │   ├── Task: Detect prerequisite and co-requisite conflicts
│   │   │   └── Interaction: Inline drawer explanation with override request CTA
│   │   └── Task: Instant 1-click batch registration
│   │       └── Interaction: Optimistic lock spinner → Success toast + Calendar sync
│   └── Feature: Grade Audit & Graduation Tracker
│       ├── Task: Simulate GPA impact of future letter grades
│       └── Task: Verify completion of core degree requirements
│
└── 3. Student Financial Services
    ├── Feature: Tuition Ledger & Itemized Statement
    │   └── Task: Break down lab fees, room & board, and scholarship credits
    └── Feature: Installment Payment Plan
        ├── Task: Select 3-month or 6-month payment distribution
        └── Task: Bind payment method with recurring authorization
```

---

## 4. Capability Mapping Matrix (Scoping & Ownership)

When modeling complex platforms, construct a Capability-to-Task mapping matrix before authoring UI components:

| Capability Domain | Target Feature | Primary User Task | Complexity | Interaction Form Factor |
| :--- | :--- | :--- | :--- | :--- |
| **Academic** | Conflict Resolver | Resolve overlapping lecture times | High (Algorithmic) | Interactive weekly calendar grid + Drawer alternatives |
| **Admissions** | Document Verification | Verify certified PDF signatures | Medium (Compliance) | Split-view PDF viewer with inline checklist |
| **Finance** | Installment Calculator | Adjust down payment slider & review fees | Low (Calculative) | Real-time reactive slider + Summary breakdown card |

---

## 5. Anti-Pattern Checklist

- [ ] Did you label a section "Dashboard" without defining what domain capabilities live within it?
- [ ] Did you confuse layout containers (Tabs, Drawers, Modals) with user tasks?
- [ ] Are all Tier 3 tasks framed from the user's operational intent (verbs: *Resolve, Compare, Submit, Audit*) rather than system actions (*Render, Display, Show*)?
