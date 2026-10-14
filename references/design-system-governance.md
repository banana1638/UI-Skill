# Design System Governance

Use this protocol when adding or changing tokens, components, variants, themes, or component APIs. The objective is a coherent system that can evolve without semantic drift.

## 1. Token Admission

Before adding a token, search existing semantic and component tokens. Add one only when an existing role cannot truthfully express the need. A token name must describe product intent rather than a raw visual value; prefer `surface-danger` over `red-600`.

Every new token records: purpose, layer (raw/semantic/component), supported themes, consuming components, contrast-sensitive contexts, and an owner or source decision. Do not create aliases that mean the same thing under different names.

## 2. Lifecycle And Migration

Tokens and components move through **proposed → active → deprecated → removed**. Deprecation requires a replacement, migration guidance, and a removal milestone. Keep legacy aliases only for the agreed transition period; do not leave them permanently as a second system.

When altering a component API or behavior, document affected consumers, visual states, accessibility contract, compatibility impact, and test coverage. Versioning should follow the host repository's policy.

## 3. Theme Compatibility

Every semantic addition must be reviewed across supported color modes, density modes, and brand themes. Verify contrast, focus, disabled, selected, error, success, and overlay states. Components consume semantic roles and never bypass the system with raw values except for a documented one-off visual asset.

## 4. Change Record Template

```markdown
### DS-[NNN]: [Change]
- Source: [brief, design file, issue, or decision]
- Decision: [new/change/deprecate token or component]
- Rationale: [why an existing role is insufficient]
- Affected consumers and themes: [list]
- Accessibility and migration: [contract, replacement, deadline]
- Validation: [visual, automated, and manual evidence]
```
