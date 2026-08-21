# User Journey & Flow Architecture Protocol

This protocol guides Codex in architecting coherent, multi-phase user progressions, distinguishing high-level emotional journeys from concrete operational screen flows.

---

## 1. The 5-Level Flow Hierarchy

Never conflate high-level customer journeys with low-level screen navigation. Model the experience across five cascading levels:

```text
Level 1: User Journey (End-to-End Experience & Emotional Narrative)
    │
    └── Level 2: User Flow (System Capabilities & Decision Paths)
          │
          └── Level 3: Task Flow (Stepwise Operational Execution)
                │
                └── Level 4: Screen Flow (Route Transitions & Viewport States)
                      │
                      └── Level 5: Interaction / Micro-State Flow (Atomic State Loop)
```

### Definitions & Boundaries

1. **User Journey**: Broad, macro-level chronological narrative spanning multiple touchpoints, emotional stages, and user mindsets (*e.g., Enrollment Discovery to Graduation*).
2. **User Flow**: The branching path a user takes through the software system to accomplish a specific objective, including error branches and conditional forks.
3. **Task Flow**: The singular, happy-path sequence of actions required to complete one isolated job (*e.g., Pay Tuition via Credit Card*).
4. **Screen Flow**: The physical URL routing and UI viewport transitions connecting screens (*e.g., `/courses` → `/courses/:id` → `/courses/:id/enroll`*).
5. **Interaction Flow**: In-page component state changes without page navigation (*e.g., Button Idle → Loading → Optimistic Update → Success Toast*).

---

## 2. Real-World Walkthrough: Course Registration

```text
[LEVEL 1: USER JOURNEY]
Phase 1: Discover      Phase 2: Evaluate      Phase 3: Validate      Phase 4: Confirm       Phase 5: Success
Explore catalogue  →   Check prerequisites →   Check timetable    →   Commit selections  →   Sync timetable
(Curious & open)       (Analytical / anxious) (Anxious / focused)    (Determined)           (Relieved & confident)

[LEVEL 2: USER FLOW]
                   ┌───────────────────────────────────────────────┐
                   │               Course Catalogue                │
                   └──────────────────────┬────────────────────────┘
                                          │ Click Course Card
                                          ▼
                   ┌───────────────────────────────────────────────┐
                   │           Course Detail & Syllabus            │
                   └──────────────────────┬────────────────────────┘
                                          │ Select Section
                                          ▼
                                /───────────────────\
                               < Prerequisites Met?  >
                                \───────────────────/
                                  │ YES           │ NO
                                  ▼               ▼
                    /───────────────────\   ┌───────────────────────┐
                   < Timetable Conflict? >  │ Inline Warning Banner │
                    \───────────────────/   │ + Override Request CTA│
                      │ NO            │ YES └───────────────────────┘
                      ▼               ▼
        ┌───────────────────────┐   ┌───────────────────────┐
        │ Ready for Enrollment  │   │ Conflict Resolution   │
        │ Cart                  │   │ Drawer (Show Overlap) │
        └─────────────┬─────────┘   └───────────────────────┘
                      │ Click "Confirm & Enroll"
                      ▼
        ┌───────────────────────────────────────────────────┐
        │ Registration Confirmation & Calendar Sync Prompt  │
        └───────────────────────────────────────────────────┘

[LEVEL 3: TASK FLOW]
1. Search "CS402" → 2. Select Section B → 3. Run Pre-check → 4. Click Enroll → 5. Download Receipt

[LEVEL 4: SCREEN FLOW]
`/academics/catalogue` ──(Push)──> `/academics/courses/cs402` ──(Drawer)──> `?drawer=conflict` ──(Replace)──> `/academics/timetable`

[LEVEL 5: INTERACTION FLOW]
Enroll Button: `IDLE` ──(Click)──> `SPINNER_LOCKED` ──(200 OK)──> `SUCCESS_CHECKMARK` ──(Auto-dismiss)──> `CALENDAR_UPDATED`
```

---

## 3. Mandatory Edge & Exception Path Mapping

A flow is incomplete if it only accounts for the happy path. Every user flow must explicitly diagram four exception branches:

1. **Permission Denied / Auth Expiry Branch**: Seamless inline re-auth or contextual login modal preserving entered form data.
2. **Data Conflict / Race Condition Branch**: Informative toast or drawer explaining the collision (*e.g., "Seat just taken by another student; 2 alternate sections available"*).
3. **Network / Server Degradation Branch**: Non-blocking retry queue with preserved client state.
4. **Abandonment & Recovery Branch**: Auto-saved draft state when navigating away before completion.

---

## 4. Flow Specification Deliverable Template

When designing Level 3 (Feature) or Level 4 (Product) workflows, document flows in this standardized format:

```markdown
### 🔄 User Flow: [Feature Name]

#### 1. Journey Stage: [e.g., Discovery / Validation / Execution]
- **User Mindset**: [e.g., High urgency, low tolerance for latency]
- **Primary Goal**: [e.g., Reserve seat in lecture without schedule clash]

#### 2. Happy Path Flow
[Step 1: Screen/Trigger] ──> [Step 2: Decision/Action] ──> [Step 3: Verification] ──> [Step 4: Outcome]

#### 3. Edge & Error Recovery Paths
- **If Condition A Fails**: [Actionable recovery mechanism]
- **If Session Drops**: [Preserved draft state strategy]
```
