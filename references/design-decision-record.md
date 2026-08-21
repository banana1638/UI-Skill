# Design Decision Record (DDR) Protocol

This protocol establishes a formal **Design Decision Record (DDR)** system—modeled after Architecture Decision Records (ADRs)—to document, audit, and justify critical UX and UI architectural choices.

---

## 1. Why DDRs Matter

Codex must never justify design choices with subjective platitudes such as *"I chose a Drawer because it looks cleaner"* or *"I used a modal because it feels modern"*.

Every structural design decision represents an **engineering trade-off** between spatial context, cognitive focus, motor cost, and device scalability. DDRs capture the context, evaluated alternatives, deliberate trade-offs, and downstream consequences.

---

## 2. Standard DDR Schema & Format

```markdown
### DDR-[NNN]: [Descriptive Title of Decision]

- **Status**: [Proposed | Accepted | Superseded by DDR-XXX]
- **Date**: [YYYY-MM-DD]
- **Scope**: [Component / Flow / System Area]

#### 1. Context & User Problem
[What specific operational dilemma, screen constraint, or user mental model triggered this decision?]

#### 2. Evaluated Options
- **Option A**: [Description + Pros / Cons]
- **Option B**: [Description + Pros / Cons]
- **Option C**: [Description + Pros / Cons]

#### 3. Chosen Decision & Rationale
- **Decision**: [Selected Option]
- **Core Reason**: [Why this option best serves user goals, business metrics, and technical constraints]

#### 4. Explicit Trade-offs & Compromises
[What advantages did we deliberately sacrifice to gain our primary benefit?]

#### 5. Downstream Consequences & Mitigations
- **Mobile Viewport**: [How does this scale down to small screens?]
- **Keyboard / A11y**: [Focus management, ARIA roles, trap behavior]
- **State Complexity**: [URL sync, optimistic rollbacks, caching]
```

---

## 3. Real-World DDR Examples

### DDR-001: Detail Inspection via Contextual Drawer vs Modal vs Dedicated Page

- **Status**: Accepted
- **Scope**: Course Registration Conflict Inspector

#### 1. Context & User Problem
During registration, students encounter timetable clashes (e.g., lecture times overlapping). Navigating to a separate page loses their scroll position and cart context in the weekly calendar grid. A centered modal obscures the calendar blocks they are attempting to compare against.

#### 2. Evaluated Options
- **Option A (Centered Modal)**: High interruption focus, but covers the weekly grid completely, forcing students to remember schedule conflicts from memory.
- **Option B (Contextual Slide-Out Drawer)**: Retains visible calendar columns on the left (60% viewport), while presenting conflict analysis and alternate lecture sections on the right (40%).
- **Option C (Dedicated Full Sub-Page)**: Maximum screen space, but creates heavy route transition friction and loses all in-memory draft selections.

#### 3. Chosen Decision & Rationale
- **Decision**: **Option B (Slide-Out Right Drawer)**.
- **Core Reason**: Preserves visual spatial context with the master weekly schedule, allowing instant comparison without cognitive working memory strain.

#### 4. Explicit Trade-offs
- Sacrifices horizontal reading width inside the drawer for multi-column syllabus text.

#### 5. Downstream Consequences & Mitigations
- **Mobile (< 768px)**: Drawer automatically transforms into a bottom sheet with 90vh height and swipe-down dismiss gestures.
- **Keyboard Navigation**: Focus moves into the drawer upon opening and traps tab cycle until dismissed with `Escape` or the close trigger.

---

### DDR-002: Batch Registration Optimistic Feedback vs Blocking Modal

- **Status**: Accepted
- **Scope**: Course Registration Commit Action

#### 1. Context & User Problem
At 9:00 AM registration opening, backend concurrency spikes, causing registration API responses to range between 800ms and 2.5s.

#### 2. Evaluated Options
- **Option A (Full-Screen Blocking Overlay Spinner)**: Prevents double submission, but freezes the UI and causes anxiety during high-traffic moments.
- **Option B (Optimistic Local State Commit with Toast Queue)**: Updates calendar to "Reserved" immediately and rolls back with localized alert banner if the server rejects the request.

#### 3. Chosen Decision & Rationale
- **Decision**: **Option B (Optimistic Commit with Reversible Toast Notification)**.
- **Core Reason**: Delivers instantaneous perceived performance and reduces panic clicks while maintaining data integrity through idempotent retry tokens.

#### 4. Downstream Consequences & Mitigations
- **Rollback Handling**: If enrollment rejects due to seat exhaustion, calendar reverts with gentle amber shake animation and automatically opens the alternate section drawer.

---

## 4. When to Author a DDR

Author an inline DDR whenever making architectural decisions on:
1. **Container Form Factor**: Modal vs Drawer vs Dedicated Route vs Popover vs Inline.
2. **Data Manipulation Pattern**: Batch selection vs Single-item inline edit vs Wizard.
3. **Density / Layout Paradigm**: High-density data grid vs Visual card gallery.
4. **State Feedback Mechanism**: Optimistic UI rollback vs Blocking modal spinner.
