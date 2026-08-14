# Color And Token System

Use this reference when creating or revising palettes, themes, elevation, shadows, or motion curves. Build a project-owned semantic system. Treat Open Props as a useful catalog of raw values and naming ideas, not a formal specification or an automatic dependency.

## Contents

- Token layers
- Perceptual color
- Themes and contrast
- Depth and motion
- Implementation pattern
- Review checklist
- Source basis

## Token Layers

Separate tokens by responsibility:

1. Raw scales describe available values: hue ramps, neutral ramps, spacing steps, radii, shadow recipes, durations, and easing curves.
2. Semantic tokens describe product intent: `surface`, `text-muted`, `border-strong`, `accent`, `danger`, `focus-ring`, and `success`.
3. Component tokens describe a narrow contract only when a shared component needs an intentional exception: `button-primary-bg` or `chart-gridline`.

Components should consume semantic or component tokens, not raw palette positions. This allows theme changes without rewriting every selector.

- Reuse existing project token names when they are coherent.
- Keep the semantic set small enough to understand and broad enough to cover real states.
- Name tokens by role, not appearance. Prefer `--color-danger` over `--red-500` in component code.
- Avoid creating a token for every literal value. Tokens should encode repeatable decisions.
- Document foreground and background pairings, not isolated colors.

## Perceptual Color

- Use OKLCH as an authoring tool when the support target allows it. Adjust lightness, chroma, and hue deliberately rather than generating ramps by arbitrary hex interpolation.
- Keep hue and chroma changes intentional across a scale. Equal numeric steps do not guarantee equal visual or accessibility results.
- Reduce chroma when a color leaves the display gamut or becomes harsh at very high or low lightness.
- Do not treat OKLCH lightness as a WCAG contrast score. Test the rendered foreground and background pair directly.
- Keep semantic colors distinguishable from one another as well as readable against their surfaces.
- Use redundant cues such as icon, text, shape, position, or pattern for error, warning, success, and chart series.

Open Props can accelerate exploration with curated colors, gradients, shadows, easings, sizes, and other custom properties. Copy or import only the subset the project needs, then map it into project-owned semantic roles.

## Themes And Contrast

- Design light and dark themes independently. Do not invert a light palette mechanically.
- Preserve hierarchy, visual weight, and state distinction in every theme.
- Use quiet surfaces and restrained borders to structure density; do not force every boundary through a shadow.
- Check body text, secondary text, placeholders, controls, disabled states, focus indicators, icons, charts, and text over imagery.
- Provide a solid fallback when transparency, backdrop effects, or imagery could reduce contrast.
- Respect forced-colors and increased-contrast environments. Do not remove useful system outlines without a replacement.
- Keep theme transitions optional and non-disruptive; never animate large color changes when reduced motion is requested.

## Depth And Motion

- Define a small elevation ladder tied to real stacking and interaction needs.
- Compose shadows from subtle ambient and directional layers when the visual direction needs depth. Avoid identical heavy shadows on every card.
- Derive border, highlight, and shadow colors from the current surface and theme.
- Use radius tokens consistently, but allow a justified signature shape or component exception.
- Define motion tokens by function: immediate feedback, component transition, page transition, and emphasized moment.
- Choose easing for the interaction: deceleration for arrival, acceleration for exit, and symmetric curves for continuous movement.
- Keep duration proportional to distance and hierarchy. A token catalog is not permission to animate every state.

## Implementation Pattern

Start with explicit fallbacks, then enhance when the browser policy permits:

```css
:root {
  --raw-blue-7: #1769e0;
  --raw-blue-7: oklch(0.58 0.2 255);
  --raw-slate-1: #f7f8fa;
  --raw-slate-1: oklch(0.98 0.01 255);

  --color-surface: var(--raw-slate-1);
  --color-text: #172033;
  --color-accent: var(--raw-blue-7);
  --color-focus-ring: var(--raw-blue-7);

  --shadow-raised:
    0 1px 2px rgb(16 24 40 / 0.08),
    0 10px 28px rgb(16 24 40 / 0.10);
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

Replace illustrative values with brand-appropriate, contrast-tested values. Keep literal fallbacks before enhanced declarations when legacy support matters.

For utility frameworks, map the semantic variables into the framework theme instead of bypassing them with unrelated arbitrary values. For an existing design system, extend its token pipeline rather than creating a parallel one in component files.

## Review Checklist

- Do components consume semantic roles rather than raw palette steps?
- Are foreground and background pairs documented and contrast-tested?
- Do light, dark, forced-color, disabled, focus, and data states remain distinct?
- Are OKLCH values used for perceptual control rather than assumed accessibility?
- Are shadows, radii, durations, and easings a small coherent system?
- Is an imported token library justified, scoped, and mapped to product semantics?
- Can the interface fall back without losing meaning or task completion?

## Source Basis

- [Open Props](https://open-props.style/)
- [MDN `oklch()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklch)
- [Stripe: Designing accessible color systems](https://stripe.com/blog/accessible-color-systems)
- [Stripe Apps style and design tokens](https://docs.stripe.com/stripe-apps/style)
- [W3C Understanding Success Criterion 1.4.3: Contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [W3C Understanding Success Criterion 1.4.11: Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
