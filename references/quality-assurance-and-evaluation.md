# Quality Assurance And Skill Evaluation

Use this protocol when changing the skill, its scripts, or a substantial interactive frontend. It separates a claim that a result was inspected from evidence that it passed a repeatable gate.

## 1. Scenario-Based Skill Evaluation

Maintain a small, versioned evaluation suite rather than judging the skill from one impressive page. Each scenario must state:

- **Prompt and context:** The user need, repository constraints, and any established system.
- **Scope level:** The expected Level 1–4 route.
- **Must pass:** Observable rules that cannot be traded away for aesthetics.
- **Must not do:** Scope creep, invented assets, broken conventions, or unjustified dependencies.
- **Evidence:** The expected inspection, test, or delivery note.

Cover at least: a surgical fix; extension of an existing system; a localized form; a dense data view; long and hostile content; loading/empty/error recovery; a high-trust or destructive flow; a performance-sensitive page; a visual redesign; and a complex overlay/widget. Run the suite whenever core instructions or validators change. Failures should become scenarios, not anecdotes.

## 2. Accessibility Evidence

Static scans catch only a subset of accessibility failures. For every interactive page, inspect the primary keyboard path: entry point, visible focus, activation, escape/dismissal where relevant, focus restoration, form error recovery, and exit. For composite widgets, verify the matching WAI-ARIA APG keyboard contract rather than adding ARIA attributes mechanically.

Use an automated scanner when available, but report its limits. A passing static scan does not prove usable labels, meaningful announcements, reading order, or touch ergonomics. Do not report screen-reader testing unless it was actually performed.

## 3. Visual Regression Evidence

Choose a named viewport and a named state matrix before capturing a baseline. At minimum include desktop and mobile plus any state that changes hierarchy or layout: loading, populated, empty, error, validation error, permission denied, and open overlay where applicable.

Use the same browser, scale factor, fonts, and deterministic data for baseline and candidate captures. Set an explicit pixel-difference threshold and review every failure: a small diff may be intentional, while a threshold pass may still hide a meaningful usability regression. Store the reason for accepted baseline updates.

## 4. Release Evidence Matrix

| Claim | Minimum evidence |
| --- | --- |
| Keyboard accessible | Automated scan plus primary keyboard-path record |
| Responsive | Rendered desktop/mobile screenshots and overflow check |
| Visual regression passed | Baseline/candidate comparison at declared threshold |
| Performance budget passed | Captured resource and web-vital report |
| Localized/RTL ready | Content stress matrix including RTL when supported |
| Design-system compliant | Referenced token/component source and migration note |

If evidence is unavailable, mark it as **not run** with the reason. Never replace it with an unqualified pass.
