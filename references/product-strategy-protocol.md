# Product Strategy Protocol

This protocol bridges qualitative discovery insights into an **executable product strategy, phased scoping roadmap, and unified product brief**.

---

## 1. Product Vision & North Star

A product vision provides durable architectural and design orientation. It defines the ideal future state once the user problem is solved at scale.

```text
┌─────────────────────────────────────────────────────────────┐
│ For [Target Users]                                          │
│ Who [Experience Core Friction / Pain Point]                 │
│ The [Product Name] is a [Product Category / Mechanism]       │
│ That [Delivers Distinct Value Proposition]                  │
│ Unlike [Legacy Alternatives / Competitors],                 │
│ Our Product [Provides Differentiating Architectural Moat].  │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Product Principles (Design Anchor Points)

Product principles are **opinionated trade-off rules** that resolve UI/UX ambiguities during design execution. Generic statements like *"Make it intuitive"* are banned. Principles must choose one virtue over another:

* **Speed over Configuration**: *"Default to zero-config instant sync; sacrifice advanced custom field mapping in favor of sub-second load times."*
* **Context Preservation over Screen Estate**: *"Keep master record visible in background drawer rather than navigating away to a dedicated full-page editor."*
* **High Trust over Casual Frictionlessness**: *"Require explicit two-factor authentication and detailed summary confirmations before executing financial ledger transfers."*

---

## 3. Value Proposition & Differentiation Matrix

Clarify why this product wins against alternative workflows (including Excel, manual paperwork, and existing enterprise software):

| Dimension | Legacy / Existing Alternative | Our Product Proposition | Architectural / UX Enabler |
| :--- | :--- | :--- | :--- |
| **Data Ingestion** | Manual batch upload & CSV cleanup | Real-time optimistic parsing & inline error highlight | Web Worker + Streaming parser |
| **Decision Speed** | 15-minute cross-tab navigation | Single-glance command bar + drawer preview | Unified Information Architecture |
| **Error Recovery** | Hard fail with opaque HTTP 500 error | Non-blocking inline correction + undo queue | Optimistic state rollback |

---

## 4. MVP vs Future Scope Prioritization (MoSCoW Matrix)

Prevent bloated delivery by categorizing capabilities into clear temporal release horizons:

```text
┌──────────────────────────────┬──────────────────────────────┐
│ MUST HAVE (MVP Release)      │ SHOULD HAVE (Next Milestone) │
│ • Core registration flow     │ • Bulk CSV export / import   │
│ • Conflict detection engine  │ • Custom timetable calendar  │
│ • Instant invoice generator  │ • Real-time advisor chat     │
├──────────────────────────────┼──────────────────────────────┤
│ COULD HAVE (Backlog / Future)│ WON'T HAVE (Out of Scope)    │
│ • AI study plan prediction   │ • Native campus bus tracking │
│ • Gamified peer study groups │ • Custom SQL query builder   │
└──────────────────────────────┴──────────────────────────────┘
```

---

## 5. Success Metrics & Key Performance Indicators (KPIs)

Connect every major design decision to tangible product telemetry:

1. **Task Completion Rate (TCR)**: $\ge 95\%$ of students complete course registration without abandoning session.
2. **Time to Task Completion (TTC)**: Mean time to resolve registration conflicts reduced from 8.5 minutes to $< 90$ seconds.
3. **System Usability Scale (SUS)**: Benchmark score $\ge 82$ (Top 10th percentile).
4. **Error Encounter Rate (EER)**: $< 3\%$ of submitted forms trigger server-side validation rejections.

---

## 6. Constraints, Assumptions & Risk Analysis

Document the friction and vulnerabilities before designing:

* **Technical Constraints**: Legacy REST API lacks batch endpoints; must handle throttled individual calls.
* **User Assumptions**: Primary users will access via mobile viewport (390px) on unreliable campus Wi-Fi.
* **High-Severity Risks**: High concurrency during 9:00 AM registration opening could cause race condition overselling; UX must provide instant deterministic queue status feedback.

---

## 7. The Standard Product Brief (Deliverable Template)

Before starting wireframing or UI component design for any substantial product initiative (Level 4), synthesize strategy into this concise Product Brief:

```markdown
# 📄 Product Brief: [Product Name]

## 1. Executive Summary & Vision
- **North Star Vision**: [1-2 sentences on target transformation]
- **Core Value Proposition**: [Primary differentiator]

## 2. Target Audience & Roles
- **Primary Persona**: [Role, environment, primary JTBD]
- **Secondary Roles**: [Admins, auditors, approvers]

## 3. Opinionated Product Principles
1. [Principle 1]: [Trade-off decision rule]
2. [Principle 2]: [Trade-off decision rule]

## 4. Scope Horizon
- **MVP (Must Have)**: [Core features 1, 2, 3]
- **Post-MVP**: [Enhancements 1, 2]
- **Explicit Non-Goals**: [Out of scope boundary]

## 5. Success Metrics & Validation Gates
- [Target Metric 1]
- [Target Metric 2]
```
