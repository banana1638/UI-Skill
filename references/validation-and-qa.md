# Design Validation & Quality Assurance

Calibrated evaluation protocols to verify real-world craft and eradicate AI slop.

---

## 1. The 10-Dimension Design Scorecard

Evaluate output honestly. **Never award self-congratulatory 10/10 or 98/100 scores**. Real-world engineering requires pragmatic tradeoffs; an authentic high-quality implementation typically scores **8.0 – 8.8 / 10.0** with clearly documented edge cases or future iterations.

```markdown
### 📊 Design Review Scorecard
- [ ] Product Fit: [X]/10 — Does this solve the core user JTBD?
- [ ] Task Clarity: [X]/10 — Is there exactly ONE primary visual action per screen?
- [ ] Information Architecture: [X]/10 — Are groups, filters, and relationships logical?
- [ ] Interaction Ergonomics: [X]/10 — Are container patterns (modal vs drawer vs page) appropriate?
- [ ] Visual Hierarchy: [X]/10 — Does the eye flow effortlessly from primary to tertiary?
- [ ] Visual Identity & Taste: [X]/10 — Does it avoid cliché AI templates and tropes?
- [ ] Accessibility (WCAG AA): [X]/10 — Contrast $\ge 4.5:1$, touch targets $\ge 44\text{px}$, visible focus?
- [ ] Defensive UI & States: [X]/10 — Are loading, empty, error, and overflow states handled?
- [ ] Responsive Craft: [X]/10 — Does layout adapt gracefully down to 320px without horizontal scroll?
- [ ] Code Quality: [X]/10 — Clean, semantic, tokenized Vanilla CSS without bloated dependencies?

**Overall Calibrated Score: [X.X] / 10.0**
*Documented Tradeoffs & Next Iterations:* [Brief note on what was prioritized and what remains for v2]
```

---

## 2. The 9-Point Anti-AI-Slop Test Suite

Before finalizing an interface, pass it through this critical audit:

1. **Squint Test**: Blur your eyes or reduce window size by 50%. Does the primary call-to-action remain immediately distinguishable from background cards?
2. **Logo Removal Test**: If brand colors or logos are removed, does the interface still convey intentional typography, rhythm, and domain-specific layout?
3. **Template Test**: Does the layout match the authentic domain metaphor (e.g. ledger, workbench, canvas) or did it fall back to generic 3-column cards?
4. **Contrast Grayscale Test**: In pure grayscale, is all secondary text and border hierarchy clearly legible without color cues?
5. **Reduced Motion Test**: With `prefers-reduced-motion` enabled, do all interactions remain fully functional with zero jarring snap-backs?
6. **Touch Target Test**: On mobile viewports, are all buttons and interactive targets at least 44 × 44px with adequate breathing room?
7. **Single Primary Action Test**: Is there only ONE visual primary button visible above the fold? (Secondary actions must use outline, ghost, or text styling).
8. **Extreme Content Test**: Does the layout survive a 35-character username, a 0-value metric, and a 100-character description without overflow?
9. **Token Purity Test**: Are all colors, shadows, and spacings bound to semantic CSS variables rather than hardcoded magic numbers?

---

## 3. Pre-Release Gate Checklist

Mark work as complete ONLY when every applicable requirement passes:

- [ ] Semantic HTML tags used throughout (`<main>`, `<nav>`, `<article>`, `<dialog>`, `<button>`).
- [ ] All interactive buttons have explicit `:focus-visible` ring styling.
- [ ] Dynamic forms use `:user-invalid` styling rather than premature error flags.
- [ ] Mobile viewports down to 320px render cleanly with zero unwanted horizontal scrollbars.
- [ ] Three Rejected Defaults are explicitly documented in code comments.
- [ ] Zero dead scripts or non-functional dependencies.
