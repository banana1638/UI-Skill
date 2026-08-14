# Fluid Layout And Typography

Use this reference when establishing responsive composition, type, spacing, grids, containers, or font delivery. Build systems that respond to available space and real content instead of reproducing a few fixed canvases.

## Contents

1. Fluid foundations
2. Intrinsic layout primitives
3. Container-aware components
4. Typography art direction
5. Font delivery
6. Content stress tests
7. Source basis

## 1. Fluid Foundations

Define bounded fluid tokens between a narrow and wide viewport. Avoid unrelated one-off `clamp()` expressions for every element.

```css
:root {
  --step--1: clamp(0.875rem, 0.84rem + 0.16vw, 0.975rem);
  --step-0: clamp(1rem, 0.95rem + 0.22vw, 1.125rem);
  --step-1: clamp(1.25rem, 1.11rem + 0.61vw, 1.6rem);
  --step-2: clamp(1.56rem, 1.28rem + 1.22vw, 2.25rem);
  --step-3: clamp(1.95rem, 1.46rem + 2.12vw, 3.15rem);

  --space-1: clamp(0.5rem, 0.46rem + 0.18vw, 0.625rem);
  --space-2: clamp(0.875rem, 0.77rem + 0.45vw, 1.125rem);
  --space-3: clamp(1.25rem, 1.04rem + 0.9vw, 1.75rem);
  --space-4: clamp(2rem, 1.58rem + 1.8vw, 3rem);
  --space-5: clamp(3rem, 2.16rem + 3.6vw, 5rem);
}
```

Treat the values as an example. Derive the actual ratio, minimum, maximum, and viewport range from the product's density, typeface, and content.

- Keep body text within a comfortable bounded range; do not make it shrink to preserve a desktop composition.
- Let display text become dramatic only where line length and localization allow it.
- Use fluid spacing pairs when a component needs more expansion than a single scale step can provide.
- Prefer logical properties such as `margin-inline`, `padding-block`, and `inset-inline-start` when localization or alternate writing directions matter.

## 2. Intrinsic Layout Primitives

Compose a small set of content-driven primitives instead of adding a media query for each component.

### Stack

Use vertical flow with a shared gap token. Let children determine height.

### Cluster

Use wrapping inline groups for actions, tags, filters, metadata, and navigation. Define both row and column gaps.

### Switcher

Let sibling regions switch from horizontal to vertical when their combined ideal widths no longer fit.

```css
.switcher {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.switcher > * {
  flex-grow: 1;
  flex-basis: calc((42rem - 100%) * 999);
}
```

### Sidebar

Give the supporting region a bounded ideal width and let the primary region occupy the remainder. Stack when the primary region would become too narrow.

### Intrinsic Grid

Use `repeat(auto-fit, minmax(min(100%, var(--card-min)), 1fr))` for repeated peers. Use an explicit editorial grid only when card roles genuinely differ.

### Frame And Cover

Use `aspect-ratio` for media whose crop is intentional. Use `object-fit` and `object-position` to preserve the focal subject. Do not apply fixed heights to text-bearing cards merely to align rows.

## 3. Container-Aware Components

Prefer container queries when a component's design should respond to its own allocated width rather than the viewport.

```css
.feature-region {
  container-type: inline-size;
}

@container (min-width: 36rem) {
  .feature-card {
    grid-template-columns: minmax(0, 1.2fr) minmax(12rem, 0.8fr);
    align-items: center;
  }
}
```

- Keep viewport queries for page-level changes such as navigation mode or global gutters.
- Keep container queries for reusable cards, panels, toolbars, and embedded modules.
- Test components in their narrowest and widest actual parent, not only in an isolated story.
- Avoid changing semantic or focus order with CSS visual reordering.

## 4. Typography Art Direction

Choose type from content, language, brand tone, and rendering quality.

- Assign roles before choosing sizes: display, heading, body, label, data, annotation, and code.
- Use one family when its optical sizes, widths, weights, or italics provide sufficient contrast.
- Pair two families when their proportions and texture create deliberate contrast without competing.
- Check the required scripts, diacritics, currency symbols, numerals, punctuation, and fallback coverage.
- Use tabular numerals for aligned changing values; use proportional numerals in prose.
- Keep all-caps and wide tracking to short labels in scripts where the treatment remains readable.
- Control measure with `ch` only as a starting point; inspect the chosen typeface and real copy.
- Avoid clipping ascenders, descenders, accents, or wrapped headings with fixed line boxes.

Typography should survive without the display font. The fallback experience must preserve hierarchy and remain usable.

## 5. Font Delivery

- Prefer WOFF2 and load only required families, styles, weights, axes, and character subsets.
- Consider a variable font when several axes or weights are actually used; a variable file is not automatically smaller than a few static styles.
- Preload only critical fonts used above the fold. Excess preloads compete with more important resources.
- Choose `font-display` by priority: `optional` can protect performance and layout stability; `swap` shows text quickly but requires well-matched fallback metrics.
- Use `size-adjust`, `ascent-override`, `descent-override`, and `line-gap-override` when needed to align fallback and web-font metrics.
- Avoid icon fonts when accessible SVG or existing icon components are available.
- Preserve font licensing and confirm whether self-hosting and subsetting are allowed.
- Inspect FCP, LCP, and CLS after changing typography; visual polish is not a reason to make the page unstable.

## 6. Content Stress Tests

Test the actual implementation with:

- narrow mobile, wide desktop, and intermediate widths where wrapping decisions change;
- 200% browser zoom and text-only enlargement;
- a long localized headline, long navigation labels, and unbroken identifiers;
- empty, one-item, typical, and unusually large collections;
- user text-spacing overrides: `line-height: 1.5`, paragraph spacing `2em`, letter spacing `0.12em`, and word spacing `0.16em`;
- loading fonts disabled or delayed;
- images missing, unusually tall, or unusually wide;
- RTL or vertical writing requirements when the product supports them.

Revise any fixed height, absolute placement, negative margin, or decorative crop that hides or overlaps meaningful content.

## 7. Source Basis

- Utopia fluid type and spacing: https://utopia.fyi/
- Every Layout intrinsic primitives: https://every-layout.dev/layouts/
- web.dev font best practices: https://web.dev/articles/font-best-practices
- W3C WCAG 2.2 text spacing: https://www.w3.org/WAI/WCAG22/Understanding/text-spacing

Last reviewed: 2026-07-21.
