# Product & Design Validation Protocol

This protocol provides the authoritative quality validation framework, the **10-Dimension Design Review Scorecard**, and the expanded **Anti-AI-Slop Sensory & Structural Test Suite**.

---

## 1. The 8-Pillar Product Validation Matrix

Before considering any design deliverable complete, validate against the eight foundational pillars:

```text
┌─────────────────────────────────────────────────────────────┐
│ 1. Product Fit (Does the UI solve the root domain problem?) │
├─────────────────────────────────────────────────────────────┤
│ 2. Task Success (Can primary users finish tasks friction-free?) │
├─────────────────────────────────────────────────────────────┤
│ 3. Cognitive Load (Are non-essential choices removed?)      │
├─────────────────────────────────────────────────────────────┤
│ 4. Information Architecture (Is mental hierarchy predictable?)│
├─────────────────────────────────────────────────────────────┤
│ 5. Interaction Integrity (Are states and feedback complete?)│
├─────────────────────────────────────────────────────────────┤
│ 6. Accessibility & A11y (WCAG AA, touch targets, focus)     │
├─────────────────────────────────────────────────────────────┤
│ 7. Visual Quality & Brand DNA (Distinction, hierarchy, type)│
├─────────────────────────────────────────────────────────────┤
│ 8. Technical Quality (Responsive 320px+, CVA, performance)  │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. The 10-Dimension Design Review Scorecard

For Level 2, 3, and 4 deliverables, compute an audited score across ten criteria (each graded out of 10.0):

```markdown
### 📊 Design Review Scorecard: [Project Name]

| Evaluation Dimension | Score | Assessment & Observations |
| :--- | :---: | :--- |
| **1. Product Fit** | 9.0/10 | Directly addresses real user friction without extraneous bloat |
| **2. User Understanding** | 8.5/10 | Respects operational constraints and domain mental model |
| **3. Task Clarity** | 9.5/10 | Single unmistakable Primary Action per viewport; zero ambiguity |
| **4. Information Architecture** | 8.5/10 | Logical route hierarchy; clear progressive disclosure nesting |
| **5. Interaction Design** | 9.0/10 | Optimal form factors (Drawer vs Modal); optimistic recovery |
| **6. Visual Hierarchy** | 8.5/10 | Clear focal tension; strong display vs body typographical contrast |
| **7. Visual Identity & Brand** | 8.5/10 | Distinct personality; zero generic AI template clichés |
| **8. Accessibility (A11y)** | 9.0/10 | WCAG AA contrast, $\ge 44\text{px}$ touch targets, visible focus rings |
| **9. Design Consistency** | 9.0/10 | Strict token adherence; coherent spacing and radius scales |
| **10. Technical Quality** | 9.5/10 | Modular CVA architecture, zero layout shift (CLS), mobile 320px+ safe |

**Overall Score: 8.8 / 10.0** — **VERDICT: PASS**

#### 🚨 Critical Issues (Must fix before production):
- None.

#### ⚠️ Major Issues (Improve in next immediate iteration):
1. Mobile bottom sheet on small viewports (<360px) needs slightly tighter vertical padding (`py-3`).
2. Add explicit `aria-expanded` attributes to timetable accordion triggers.

#### 💡 Minor Polish Points:
1. Increase spring tension on drawer entrance from `cubic-bezier(0.16, 1, 0.3, 1)` to enhance snappiness.
```

---

## 3. The 9-Point Anti-AI-Slop Sensory & Structural Test Suite

Run these 9 rigorous tests to ensure the interface feels genuinely authored by a world-class designer rather than cloned by an LLM:

### 1. The Squint Test (Visual Hierarchy)
*Method*: Blur your eyes or view the screen at 20% zoom.
*Pass Criteria*: The Primary Action button, primary headline, and core content grouping remain immediately identifiable. If the screen dissolves into a uniform gray mush or identical bento boxes, hierarchy has failed.

### 2. The Logo Removal Test (Brand Distinction)
*Method*: Remove the product logo and brand name from the header.
*Pass Criteria*: The interface's typography, color rhythm, border physics, and spatial proportions still convey a distinctive brand personality rather than generic Tailwind UI defaults.

### 3. The Motion Purpose Test (Animation Craft)
*Method*: Inspect every animation frame.
*Pass Criteria*: Every movement communicates spatial continuity, loading progression, or tactile physical compression. Zero gratuitous wobbling, floating particles, or unmotivated marquee ribbons.

### 4. The High Contrast Stress Test (Legibility & A11y)
*Method*: Convert the interface to pure grayscale and inspect in bright ambient light.
*Pass Criteria*: All labels, active tabs, and secondary buttons retain legible separation ($\ge 4.5:1$ contrast ratio). No faint `#94A3B8` text on dark gray surfaces.

### 5. The Template Test (Structural Freshness)
*Method*: Compare against standard AI landing page tropes (e.g., 3-column pricing card, 6-card bento grid with purple glow).
*Pass Criteria*: Layout structure is custom-derived from the actual domain data model rather than forcing data into popular template molds.

### 6. The Metaphor Test (Authenticity)
*Method*: Verify whether UI metaphors (e.g., Ledger, Ticket, Spec Card) correspond to genuine domain workflows.
*Pass Criteria*: Metaphor reduces working memory load for practitioners without introducing decorative visual kitsch.

### 7. The Hierarchy Test (Cognitive Load & Hick's Law)
*Method*: Count the number of high-emphasis Primary buttons visible simultaneously in the default viewport.
*Pass Criteria*: Exactly **ONE** primary call-to-action is prominent. Secondary options use subtle/outline styles.

### 8. The Task Test (Operational Speed)
*Method*: Trace the minimum number of clicks, keypresses, and viewport transitions required to complete the primary JTBD.
*Pass Criteria*: Primary workflow achieves completion with minimal cognitive friction and zero unnecessary modal interruptions.

### 9. The Consistency Test (Token Integrity)
*Method*: Audit CSS values across components.
*Pass Criteria*: Spacing, radii, shadow elevations, and color scales map 100% to centralized design tokens rather than ad-hoc arbitrary values (e.g. `p-[13px]`).

---

## 4. Severity Classification for Review Findings

When reviewing designs or automated test output, categorize defects into four severity tiers:

* **CRITICAL**: Functional blockage, missing primary action, broken responsive overflow at 375px, or illegible contrast (< 3.0:1) on key interactive text.
* **MAJOR**: Sub-optimal form factor (e.g., multi-step wizard trapped inside a modal), missing empty/error states, or touch targets $< 40\text{px}$.
* **MINOR**: Inconsistent border radius token, minor spring curve variance, or secondary label contrast between 4.0:1 and 4.5:1.
* **POLISH**: Micro-typography letter-spacing adjustment, subtle elevation shadow gradient tuning, or micro-haptic timing refinement.
