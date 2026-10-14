# Trust, Observability, And Handoff

Use this reference for sensitive flows, Level 3–4 product work, and design-to-code handoff.

## 1. High-Trust Interaction Contract

For identity, payment, health, permissions, irreversible actions, and destructive changes, make four facts visible before commitment: who has authority, what will change, what data is used or exposed, and how the user can recover. Use confirmations for irreversible or high-impact actions, but do not make routine low-risk work needlessly interruptive.

Show permission-denied and partial-permission states as actionable explanations, not blank areas. State factual privacy and security behavior only when verified. Never invent claims, badges, urgency, social proof, or compliance language.

## 2. Outcome Instrumentation

For Level 3–4 core flows, define a small event map before release:

| Event | Purpose |
| --- | --- |
| `task_started` | Detect entry into the core task |
| `task_completed` | Measure successful completion |
| `task_abandoned` | Identify friction or unclear exits |
| `task_error_recovered` | Measure whether recovery works |

Name events according to the repository's analytics convention. Record only the minimum data needed, avoid sensitive content, and document consent or privacy constraints. Events validate a product hypothesis; they do not justify fabricated dashboard metrics.

## 3. Design-To-Code Traceability

For each material screen or component, record its source design/specification, token source, component API, implementation location, and validation evidence. If implementation deviates from the source, capture the rationale, approver when applicable, and whether the design source must be updated. This is a change record, not a demand to create design artifacts that do not exist.
