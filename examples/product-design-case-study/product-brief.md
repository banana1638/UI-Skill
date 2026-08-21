# Product Design Case Study: "Apex Academic" University Student Portal

This case study demonstrates the complete **End-to-End Product Design Pipeline** executed by Codex under the V2 Product Design Skill architecture.

---

## 1. Product Discovery
- **Business Problem**: University registrar experiences an overwhelming influx of 4,000+ support tickets during course registration week due to prerequisite confusions and unresolvable timetable collisions.
- **User Problem**: Students feel severe anxiety during enrollment morning; fragmented tabular systems force them to cross-reference course lists against personal calendars manually, resulting in missed graduation prerequisites.
- **Primary Persona**: *Elena (Junior, Computer Science Major)* — Needs to register 4 core subjects and 1 elective within a 15-minute registration window while avoiding schedule overlaps with her lab assistant shift.
- **Key JTBD**:
  > *When enrollment opens at 9:00 AM, I want to simulate my weekly schedule and resolve class time collisions in real-time, so that I can secure my required degree courses with zero administrative panic.*
- **Explicit Non-Goals**:
  - Will **NOT** handle tuition fee payment gateway in this screen (handled via `/finance/payments`).
  - Will **NOT** support cross-university credit transfer applications in V1.

---

## 2. Product Strategy & Opinionated Principles
- **Product Vision**: Create the fastest, zero-anxiety academic planning and registration workbench in higher education.
- **Core Principles**:
  1. *Context Preservation over Navigation*: Never navigate away from the weekly calendar grid during conflict resolution.
  2. *Proactive Collision Prevention over Post-Submit Rejection*: Calculate timetable and prerequisite conflicts in the client before the student clicks "Commit".
- **Target Metrics**:
  - Time to complete 5-course enrollment: $< 90$ seconds.
  - Registration conflict support tickets: $-60\%$.

---

## 3. Capability Mapping & Feature Decomposition

```text
Apex Academic Platform
└── Academic Course Operations (Capability)
    ├── Feature 1: Interactive Timetable Planner
    │   ├── Task: Visualize weekly calendar grid (Mon-Fri 08:00-18:00)
    │   └── Task: Drag-and-drop / select alternate class sections
    ├── Feature 2: Client-Side Conflict Detector
    │   ├── Task: Real-time overlap collision calculation
    │   └── Task: Visual conflict banner with 1-click alternative drawer
    └── Feature 3: Optimistic Batch Registration
        ├── Task: 1-click commit of all cart items
        └── Task: Instant optimistic confirmation + ICS calendar export
```

---

## 4. Information Architecture (IA) & Route Structure

```text
/academics/portal
├── [Left Nav / Header]
│   ├── Courses (/courses)
│   ├── Timetable Planner (/registration) [Active View]
│   ├── Degree Audit (/degree-audit)
│   └── Grades & Transcript (/grades)
│
└── [Active Workspace: /registration]
    ├── Section A: Degree Progress Header & Cart Summary (Top)
    ├── Section B: Interactive Weekly Timetable Grid (Center-Left 65%)
    ├── Section C: Available Course Staging Shelf (Right 35%)
    └── Overlay: Slide-Out Conflict Resolution Drawer (Preserves Calendar View)
```

---

## 5. User Journey & Screen Flow

```text
[JOURNEY]
Discover Courses ──> Staging to Timetable ──> Detect Conflict ──> Open Drawer ──> Swap Section ──> Optimistic Enroll ──> Success State

[SCREEN FLOW]
`/registration` (Grid View) ──[Click Conflicted Section]──> `?drawer=conflict-cs402` (Drawer slides from right) ──[Select Alternative]──> `?drawer=closed` (Grid updates instantly) ──[Click "Commit Schedule"]──> Optimistic Lock + Confetti/Success Badge
```

---

## 6. Design Decision Record (DDR-001)

- **Decision**: Slide-out Right Drawer for Conflict Resolution instead of a Centered Modal.
- **Context**: Resolving a time conflict requires students to see which day and time slots on their weekly schedule are blocked.
- **Reasoning**: A modal completely hides the underlying Monday–Friday calendar grid. A 400px right drawer keeps the calendar 100% visible, allowing students to compare alternate lecture times directly against open slots.
- **Downstream Mobile Fallback**: Transforms into a 90vh Bottom Sheet with drag-to-dismiss handle on viewports $< 768\text{px}$.

---

## 7. Visual Direction & Design System
- **Archetype**: Modern Tech meets Academic Clarity.
- **Canvas**: Clean slate canvas with subtle 1px borders (`hsl(220 15% 92%)`).
- **Typography**: Inter (Body & UI Numbers) paired with space-grotesk accents for course codes.
- **Color Roles**:
  - Primary Brand: Deep Academic Indigo (`hsl(238, 70%, 55%)`)
  - Conflict Alert: High-Contrast Amber / Rose (`hsl(350, 80%, 60%)`)
  - Success State: Emerald (`hsl(155, 75%, 42%)`)
