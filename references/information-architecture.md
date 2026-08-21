# Information Architecture (IA) Protocol

This protocol guides Codex in structuring intuitive, scalable information spaces, navigational ontologies, and routing architectures before designing physical screen layouts.

---

## 1. Information Architecture is NOT a Sidebar

> 💡 **Core Design Law**:
> A Sidebar, Header, or Bottom Nav is merely a physical UI implementation detail.
> **Information Architecture (IA)** is the structural ontology of the product: how data, capabilities, and workflows are categorized, nested, related, and discovered.

Codex must design the mental model and content hierarchy of the system first, then select the navigation components that best express that structure.

---

## 2. Navigational Ontologies & Topologies

Select the navigation topology based on product breadth, depth, and user role complexity:

### A. Flat / Hub-and-Spoke (Consumer / Single-Purpose Tool)
*Ideal for*: Focused utilities, lightweight SaaS tools, consumer checkout.
*Structure*: Single root workspace with contextual modal/drawer overlays.

### B. Deep Hierarchical Tree (Enterprise / B2B SaaS)
*Ideal for*: Multi-tenant systems, enterprise ERPs, university portals.
*Structure*: Multi-tier nesting: `Organization` → `Domain Module` → `Resource Collection` → `Individual Entity`.

### C. Matrix / Workspace Faceted (High-Density Professional Tools)
*Ideal for*: IDEs, analytics studios, creative suites (e.g., Figma, Linear).
*Structure*: Global command bar (`Cmd+K`) + persistent split-view panes + context-switching sidebar.

---

## 3. Standard Route & Sitemap Hierarchy (University Platform Case)

```text
/ (Root Portal Hub)
├── /admissions (Prospective & Applicant Portal)
│   ├── /programmes
│   │   └── /:programmeId (Overview, Entry Requirements, Fees)
│   ├── /applications
│   │   ├── /new (Multi-step wizard)
│   │   └── /:applicationId (Status Tracker, Document Vault)
│   └── /offers/:offerId (Decision Letter, Acceptance E-Sign)
│
├── /academics (Student & Faculty Core)
│   ├── /courses
│   │   ├── /catalog (Search, Faceted Filters, Degree Audit check)
│   │   └── /:courseId (Syllabus, Sections, Prerequisites)
│   ├── /registration (Weekly Timetable Simulator, Cart, Conflict Drawer)
│   ├── /timetable (Live Schedule, Calendar ICS Sync)
│   └── /grades (Transcript, GPA Simulator, Academic Standing)
│
├── /finance (Bursar & Financial Aid)
│   ├── /statements (Itemized Term Ledger, Outstanding Balances)
│   ├── /payments (Installment Scheduler, Card Management)
│   └── /scholarships (Disbursals, Eligibility Audits)
│
└── /settings (Identity & Security)
    ├── /profile (Personal Details, Emergency Contacts)
    ├── /security (MFA, Active Sessions)
    └── /notifications (Preferences, SMS/Email Triggers)
```

---

## 4. Content Hierarchy & Chunking Principles

1. **Rule of 7 ± 2 (Miller's Law)**: Top-level navigation items must never exceed 5–7 items to prevent visual fragmentation and decision paralysis.
2. **L-O-C-A-T-S Grouping Taxonomy**: Organize domain data logically by:
   - **Location**: Campus branch, physical building, server region.
   - **Organization**: Department, faculty, tenant organization.
   - **Category**: Course type (Core, Elective, General Education).
   - **Alphabetical / Numerical**: Course codes (CS101, CS202).
   - **Time**: Semester, academic year, billing cycle.
   - **Status**: Active, Draft, Archived, Under Review.
3. **Progressive Disclosure Depth**: Primary screen exposes top-level summary metrics and core action; secondary drill-downs reveal granular audit logs and nested metadata.

---

## 5. Faceted Search & Filtering Architecture

High-density resource lists demand a structured filter taxonomy:

```text
Global Search Box (Universal Keywords / IDs)
  │
  ├── Quick Filters (Single-click status pills: [All] [Open Seats] [Prerequisites Met])
  │
  ├── Faceted Filter Drawer / Popover
  │     ├── Attribute 1: Academic Department (Multi-select checkbox)
  │     ├── Attribute 2: Credit Hours (Range slider: 1 - 5)
  │     └── Attribute 3: Class Delivery Mode (Radio: In-Person / Hybrid / Async)
  │
  └── Active Filter Chips (Removable tags + "Clear All" action)
```

---

## 6. Role & Permission-Aware Navigation (RBAC Architecture)

Never render navigation routes or action buttons that lead to `403 Forbidden` dead ends. Design role-filtered route projections:

| Route Namespace | Student Role | Faculty Role | Academic Dean / Admin |
| :--- | :--- | :--- | :--- |
| `/academics/registration` | Full Read/Write (Self) | Read-Only (Advisees) | Full Override / Admin |
| `/academics/grades/entry` | Hidden | Full Read/Write (Assigned Classes) | Full Audit & Publish |
| `/finance/bursar-admin` | Hidden | Hidden | Full Financial Reconciliation |

---

## 7. IA Review & Validation Checklist

- [ ] Is the primary sitemap structured logically by user domain rather than internal database schemas?
- [ ] Is top-level navigation constrained to $\le 7$ primary categories?
- [ ] Are deep links (URL routes) deterministic, shareable, and state-preserving?
- [ ] Does the route hierarchy support role-based permission visibility without dead links?
