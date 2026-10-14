# Layout, Fluid Systems & Content Resilience

Vanilla CSS layout architecture that naturally adapts to any screen, language, or content volume without breaking.

---

## 1. Vanilla CSS Fluid Typography & Spacing

Avoid rigid breakpoint switching with dozens of media queries. Use mathematical `clamp()` functions to create smooth, continuous fluid scaling between mobile (360px) and desktop (1280px):

```css
:root {
  /* Fluid Typographic Scale */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.8125rem);
  --text-sm: clamp(0.8125rem, 0.77rem + 0.22vw, 0.875rem);
  --text-base: clamp(0.9375rem, 0.88rem + 0.3vw, 1.0625rem);
  --text-lg: clamp(1.125rem, 1.02rem + 0.5vw, 1.375rem);
  --text-xl: clamp(1.35rem, 1.2rem + 0.75vw, 1.75rem);
  --text-2xl: clamp(1.75rem, 1.5rem + 1.25vw, 2.5rem);
  --text-3xl: clamp(2.25rem, 1.8rem + 2.25vw, 3.5rem);

  /* Fluid Spacing Scale */
  --space-fluid-sm: clamp(0.75rem, 0.6rem + 0.75vw, 1.25rem);
  --space-fluid-md: clamp(1.25rem, 1rem + 1.25vw, 2rem);
  --space-fluid-lg: clamp(2rem, 1.5rem + 2.5vw, 4rem);
}
```

---

## 2. Intrinsic CSS Grid & Subgrid

Build layouts that reorganize based on content availability rather than device types:

### Auto-Fit Responsive Grid
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: var(--space-fluid-md);
}
```

### Perfectly Aligned Card Subgrid
Align card footers and headers across columns without fixed heights:
```css
.card-grid-subgrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-auto-rows: auto 1fr auto;
  gap: var(--space-4);
}
.card-item {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid;
}
```

---

## 3. Container Queries (`@container`)

Decouple component styling from the viewport. A component should adapt based on the size of its parent container:

```css
.card-container {
  container-type: inline-size;
  container-name: card;
}

.user-profile-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

@container card (min-width: 420px) {
  .user-profile-card {
    flex-direction: row;
    align-items: center;
  }
}
```

---

## 4. Defensive Layout Integrity & Content Resilience

1. **Flex Child Blowout Prevention**: Every flex child containing dynamic text MUST have `min-width: 0;` to allow truncation:
   ```css
   .truncate-text {
     min-width: 0;
     white-space: nowrap;
     overflow: hidden;
     text-overflow: ellipsis;
   }
   ```
2. **Multi-line Clamp**:
   ```css
   .line-clamp-2 {
     display: -webkit-box;
     -webkit-line-clamp: 2;
     -webkit-box-orient: vertical;
     overflow: hidden;
   }
   ```
3. **Extreme String Tolerance**: Test with long non-spaced strings (e.g., German compounds, URLs, hashes). Use `overflow-wrap: anywhere;` or `word-break: break-word;` where appropriate.
4. **Mobile 320px Floor**: Check layouts on a 320px viewport without horizontal scrolling (`overflow-x: hidden` is a band-aid; fix the intrinsic widths).

---

## 5. Framework Architecture & Vanilla CSS Compatibility

Antigravity defaults to **Vanilla CSS with native CSS Custom Properties** for maximum flexibility and performance.

When integrating with component frameworks (React, Vue, Svelte, Web Components):
- **Universal Design Token Contract**: Expose tokens via CSS Custom Properties on `:root` or container scopes.
- **Style Encapsulation**: Use CSS Modules, native scoped CSS, or BEM naming (`.c-card`, `.c-card__header`, `.c-card--featured`).
- **Tailwind CSS**: Use Tailwind *only when the user explicitly requests it*. When requested, bind Tailwind colors and spacing directly to the CSS custom properties rather than hardcoding hex codes in `tailwind.config.js`.
