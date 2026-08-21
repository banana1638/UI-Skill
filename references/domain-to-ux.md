# Domain → UX Mapping Protocol

This protocol guides Codex in translating abstract domain models and business realities into intuitive, high-resonance **UX concepts, interaction models, and authentic UI metaphors**.

---

## 1. The Domain-to-UX Translation Cascade

Interfaces become immediately intuitive when their spatial and interaction models map directly to how domain practitioners mentally model their work.

```text
Domain Concept (Business Reality & Data Model)
      ↓
User Mental Model (How the human thinks about the entity)
      ↓
UX Concept (Information hierarchy & entity relationships)
      ↓
Interaction Model (Verbs, state shifts, and user manipulation)
      ↓
UI Metaphor & Presentation (Visual styling, tactile cues, spatial layout)
```

---

## 2. Authentic Metaphors vs Forced Gimmicks

### The Core Law
> **A UI Metaphor is valid if and only if it reduces cognitive load by matching existing domain mental models.**
> 
> - ✅ **Valid**: Designing an airline dispatch board like an interactive timetable Gantt chart with physical runway occupancy lanes.
> - ❌ **Forced Gimmick**: Adding 3D skeuomorphic leather textures, fake paperclips, or realistic coffee stains to an enterprise CRM for purely aesthetic vanity.

---

## 3. Domain Archetype Translation Matrix

| Domain Field | Domain Concept | User Mental Model | UX Concept | Interaction Model | Authentic UI Metaphor |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Coffee / Quick Food F&B** | Order Lifecycle | Ticket moving across kitchen stations | Station-based state pipeline | Drag/swipe ticket between prep stages; tactile buzzer on ready | **Preparation Workbench / Station KDS** |
| **Retail & Membership** | Stored Value / Loyalty | Physical wallet card with stamped balances | Card identity + chronologic transaction ledger | Tap-to-expand card reveal; pull-to-refresh statement balance | **Digital Pass / Embossed Member Card + Ledger** |
| **Food & Beverage Lab** | Custom Beverage Formula | Recipe proportions and brewing variables | Component ratio balancing | Linked slider adjustments; real-time visual liquid beaker fills | **Recipe Spec Card / Chemistry Sheet** |
| **Academic Advising** | Degree Progress & Prerequisites | Path dependencies & milestone unlocks | Directed dependency graph & prerequisite chain | Interactive node progression; click prerequisite to highlight unlock paths | **Academic Curriculum Tree / Degree Map** |
| **Healthcare / Clinic** | Patient Triage & Vitals | Immediate triage urgency & clinical summary | Patient bed card with real-time telemetry | Priority-sorted cards with color-coded vital pulse indicators | **Clinical Clip Chart / Triage Status Board** |
| **Supply Chain / Logistics** | Freight Manifest & Bill of Lading | Physical container inspection & seal verification | Stepwise checklist with tamper seals | Multi-point checkoff with digital signature seal animation | **Interactive Manifest / Seal Verification Tag** |

---

## 4. Step-by-Step Domain Mapping Workflow

When designing an interface for a specific domain:

1. **Extract Core Domain Nouns**: What are the actual entities used by professionals in this field? (*e.g., Ledger, Manifest, Batch, Spec Sheet, Triage Queue, Syllabus*).
2. **Identify Primary Domain Verbs**: What actions do users perform on these entities? (*e.g., Reconcile, Dispatch, Dispense, Substitute, Authorize*).
3. **Map State Transitions**: How does the entity transform over time? (*e.g., Draft → Submitted → Under Review → Approved → Enrolled*).
4. **Choose the Resonant Spatial Metaphor**: Select layout structures that reflect physical or conceptual workflows (e.g., Kanban pipeline for sequential stations, Split-pane for comparison, Gantt for temporal overlap).
5. **Inject Micro-Sensory Feedback**: Reinforce the domain feel through subtle audio/visual haptics (e.g., crisp mechanical click for authorization, gentle stamp impression for certificate approvals).

---

## 5. Domain Mapping Validation Filter

Before finalizing a UI layout, answer these three questions:
1. *Would a veteran practitioner of this domain recognize their daily terminology and workflow instantly without reading a tutorial?*
2. *Does the visual metaphor clarify the relationship between entities, or does it clutter the interface with decorative artifacts?*
3. *Does the interaction model respect the operational speed demanded by the domain (e.g., keyboard shortcuts for high-speed dispatchers)?*
