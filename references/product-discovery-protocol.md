# Product Discovery Protocol

This protocol guides Codex and product designers through **rigorous problem framing, stakeholder alignment, and user empathy** before any architecture or visual synthesis begins.

---

## 1. Problem Definition & Quad-Layer Framing

Never accept a user's requested UI component or feature as the starting problem statement. When a stakeholder asks for *"a dashboard"*, *"a modern modal"*, or *"a table with filters"*, these are proposed implementation solutions—not verified problems.

Codex must dissect incoming requirements across four distinct problem layers:

```text
┌─────────────────────────────────────────────────────────────┐
│ 1. Business Problem                                         │
│    (Revenue loss, low conversion, high churn, support cost) │
├─────────────────────────────────────────────────────────────┤
│ 2. User Problem                                             │
│    (Friction, cognitive overload, anxiety, missing context) │
├─────────────────────────────────────────────────────────────┤
│ 3. Technical Problem                                        │
│    (Latency, rate limits, sync conflicts, legacy data model)│
├─────────────────────────────────────────────────────────────┤
│ 4. Design Problem                                           │
│    (Unclear hierarchy, wrong affordances, high motor cost)  │
└─────────────────────────────────────────────────────────────┘
```

### The "5 Whys" De-Solutionizing Filter

When given a solution-oriented prompt (e.g., *"Build an analytics dashboard for course enrollments"*):

1. **Why does the user want this view?** → To see why enrollment dropped in Q3.
2. **Why can't they see it today?** → Data is fragmented across 4 disparate tabular screens.
3. **What critical decision will they make once they see it?** → Allocate marketing budget or open additional course sections.
4. **What is the real problem?** → *Lack of timely decision support for resource allocation*, not *lack of a dashboard*.

---

## 2. Persona & Stakeholder Taxonomy

Scale persona depth based on task complexity. Avoid generic stock personas ("John, 35, loves tech"). Focus on **operational context, frequency of use, domain expertise, and cognitive stressors**.

### Persona Hierarchy

* **Primary User**: Spends $\ge 70\%$ of time in the core flow. The interface ergonomics and keyboard efficiency must cater directly to their mental model.
* **Secondary User**: Interacts periodically (e.g., weekly approval, monthly export). Requires high visual clarity and zero learning curve.
* **Operational / Field User**: Constrained by high pressure, small mobile screens, poor network connectivity, or loud/distracting environments.
* **Administrator / Super-user**: Manages permissions, bulk operations, configuration, and audit logs. Demands high data density and low-latency workflows.
* **Executive / Stakeholder**: Consumes high-level summaries and exports. Demands trustworthy rollups, trend indicators, and zero jargon.

---

## 3. Jobs To Be Done (JTBD) Framework

Capture user motivation independent of current technology or visual trends using the standard outcome-driven JTBD structure:

```text
When [Situation / Trigger]
I want to [Core Motivation / Action]
So that [Desired Outcome / Emotional Benefit]
```

### Example JTBD Formulation

| User Role | Situation / Trigger | Core Motivation | Desired Outcome |
| :--- | :--- | :--- | :--- |
| Academic Advisor | During enrollment week when classes hit capacity | Find and approve course substitutions quickly | Students graduate on time without manual paperwork friction |
| Student | When tuition invoice is published | Compare balance against financial aid disbursals | Understand exact out-of-pocket obligation with zero anxiety |
| Department Head | At the end of every semester | Review faculty workload and grade distributions | Ensure accreditation compliance without querying SQL databases |

---

## 4. Multi-Tier Goal Specification

Every product initiative must establish explicit, unambiguous goals across five dimensions:

1. **Business Goals**: Measurable commercial or operational targets (e.g., *Reduce onboarding drop-off by 25%*, *Cut manual support tickets by 40%*).
2. **Product Goals**: System-level outcomes (e.g., *Enable end-to-end self-service enrollment in < 3 minutes*).
3. **User Goals**: Emotional and task-oriented objectives (e.g., *Feel confident that financial aid is applied correctly*).
4. **UX / Usability Goals**: Ergonomic and cognitive benchmarks (e.g., *Zero unhandled form errors*, *Max 2 clicks to reach primary audit log*, *Sub-100ms perceived response time*).
5. **Technical Constraints**: Hard operational limits (e.g., *Offline-first caching required*, *WCAG 2.1 AA compliance*, *Legacy REST API with 1.2s p95 latency*).

---

## 5. Explicit Non-Goals & Scope Boundaries

To prevent fatal scope creep and feature bloat, Codex must explicitly document what the product or feature will **NOT** solve in the current iteration:

> **🛑 Explicit Non-Goals**:
> - Will **NOT** support custom user-built SQL reporting in V1 (curated presets only).
> - Will **NOT** build an integrated real-time video conferencing tool (deep-link to Zoom/Teams instead).
> - Will **NOT** migrate legacy batch invoicing (read-only historical sync only).

---

## 6. Discovery Output Summary Template

For Level 3 (Feature Design) and Level 4 (Product Design) tasks, output the discovery synthesis using this standardized structure:

```markdown
### 📋 Product Discovery Summary
- **Core Problem**: [Business & User Problem Statement]
- **Target Persona**: [Primary & Operational Roles]
- **Key JTBD**: When [X], I want to [Y], so that [Z].
- **Success Criteria**: [1-2 measurable outcomes]
- **Explicit Non-Goals**: [What we are deliberately not doing]
- **Key Constraint**: [Technical, compliance, or time boundary]
```
