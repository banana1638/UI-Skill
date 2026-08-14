# Visual Direction System & Design Archetypes

Use this reference when establishing a visual identity, selecting an art direction, or creating theme-specific CSS variables. Do not settle for generic AI dark-mode defaults. Match the product context to one of 7 distinct visual archetypes.

---

## 1. The 7 Visual Design Archetypes

### Archetype 1: Skeuomorphic & Soft Neumorphic (拟物 / 新拟物触感)
*Ideal for: Music apps, audio equipment, smart home controllers, financial vaults, game dashboards, hardware control surfaces.*

- **Tactile Material Physics**: Mimics physical materials (brushed aluminium, leather, frosted glass, rubberized buttons).
- **Dual-Light Source Shadow Formula**:
  - **Convex (Outset/Raised surface)**:
    ```css
    box-shadow: 6px 6px 14px hsl(220 15% 82%), -6px -6px 14px hsl(0 0% 100%);
    ```
  - **Concave (Inset/Pressed surface)**:
    ```css
    box-shadow: inset 4px 4px 8px hsl(220 15% 82%), inset -4px -4px 8px hsl(0 0% 100%);
    ```
  - **Metallic Rim / Bevel**:
    ```css
    border: 1px solid rgba(255, 255, 255, 0.6);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 4px 12px rgba(0, 0, 0, 0.1);
    ```
- **Interactive Mechanical Motion**: On click/press, transition smoothly from convex shadow to concave inset shadow with `transform: scale(0.97)` using `cubic-bezier(0.34, 1.56, 0.64, 1)`.

---

### Archetype 2: Neo-Brutalism & Retro Modern (新粗犷主义)
*Ideal for: Developer tools, creative agency showcases, youth brands, web3 projects, poster layouts, high-impact campaigns.*

- **High Contrast Borders**: Stark 3px to 4px solid borders (`border: 3px solid #000`).
- **Offset Solid Shadows**: Un-blurred solid drop shadows (`box-shadow: 4px 4px 0px #000` or `5px 5px 0px var(--accent)`).
- **Vibrant Unapologetic Palette**: Saturated primary colors (electric yellow `hsl(50 100% 50%)`, vivid cyan, hot pink) combined with stark white and pure black.
- **Poster Typography**: Extra-bold sans-serif headlines (`Space Grotesk`, `Cabinet Grotesk`, `Archivo Black`) with uppercase monospaced metadata badges.

---

### Archetype 3: Editorial Paper & Luxury (纸质高奢 / 杂志风格)
*Ideal for: High-end commerce, architecture portfolios, luxury hospitality, coffee/dining, literary publications, long-form journalism.*

- **Warm Tactile Canvas**: Warm ivory/paper base (`hsl(40 20% 97%)` or `hsl(35 15% 94%)`) with subtle paper noise texture overlay (`opacity: 0.025`).
- **High-Contrast Editorial Typography**: Elegant high-contrast display serif (`Playfair Display`, `Instrument Serif`, `Bodoni`) paired with crisp geometric sans or mono body copy.
- **Rhythmic Whitespace & Asymmetry**: Generous padding (`py-24`, `gap-16`), overlapping hero crops, and wide letter-spacing (`tracking-[0.2em]`) for category labels.

---

### Archetype 4: Obsidian Cyberpunk & Dark Mode (黑曜石深色 / 赛博空间)
*Ideal for: AI platforms, analytics consoles, developer IDEs, crypto tools, futuristic dashboards.*

- **Multi-Tiered Obsidian Contrast**: Depth established through dark gray/black surfaces (Tier 0: `hsl(220 25% 6%)`, Tier 1: `hsl(220 20% 10%)`, Tier 2: `hsl(220 18% 14%)`).
- **Restrained Ambient Light**: Bounded radial gradient glows (`blur(100px)` at 10-15% opacity) deriving from brand accents (`hsl(160 100% 50%)` mint green or `hsl(270 100% 65%)` violet).
- **Code-Density Precision**: Monospaced font accents (`JetBrains Mono`, `Fira Code`), thin 1px borders (`hsl(220 15% 20%)`), and glowing status dots.

---

### Archetype 5: Swiss International Minimalist (瑞士国际极简主义)
*Ideal for: Modern fintech, corporate communications, design systems, architectural studios, premium SaaS.*

- **Grid-Bound Alignment**: Strict asymmetric 12-column grid structure with zero unnecessary decoration.
- **Monochrome Base + Purposeful Accent**: 90% neutral black/white/gray with a single high-chroma semantic accent color (e.g. international orange `hsl(14 100% 53%)`).
- **Typography Scale Rules**: Clear visual hierarchy built through weight and size contrast (`Helvetica Now`, `Neue Haas Grotesk`, `Inter`).

**Token Foundation**:
```css
:root {
  --surface-canvas: hsl(0 0% 100%);
  --surface-raised: hsl(0 0% 97%);
  --text-primary: hsl(0 0% 8%);
  --text-secondary: hsl(0 0% 40%);
  --accent-signal: hsl(14 100% 53%);     /* International orange — sole accent */
  --border-rule: hsl(0 0% 88%);
  --font-display: 'Neue Haas Grotesk Display', 'Inter', system-ui;
  --font-body: 'Inter', system-ui, sans-serif;
}
```

**Strict Grid Structure**:
```css
.swiss-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: clamp(1rem, 2vw, 2rem);
  row-gap: 0;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: clamp(1rem, 4vw, 3rem);
}

.swiss-grid .headline-area {
  grid-column: 1 / 8;    /* Asymmetric — content never centered */
}

.swiss-grid .content-area {
  grid-column: 4 / 12;   /* Offset start creates visual tension */
}
```

**Typography Hierarchy (Weight + Size Only)**:
```css
.display-xl { font: 700 clamp(3rem, 5vw, 5.5rem)/1.05 var(--font-display); letter-spacing: -0.03em; color: var(--text-primary); }
.heading-l  { font: 600 clamp(1.5rem, 2.5vw, 2.5rem)/1.2 var(--font-display); color: var(--text-primary); }
.body-m     { font: 400 1rem/1.6 var(--font-body); color: var(--text-secondary); }
.label-s    { font: 500 0.75rem/1.4 var(--font-body); letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-secondary); }
```

---

### Archetype 6: Spatial Glassmorphism (空间玻璃)
*Ideal for: Next-gen OS web apps, media players, floating toolbars, modal dialogs, visual creative tools.*

- **Multi-Surface Refraction**:
  ```css
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  ```
- **Dark Glass Variant**:
  ```css
  background: rgba(15, 20, 30, 0.65);
  backdrop-filter: blur(24px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  ```

---

### Archetype 7: Product-Led High-Trust SaaS (当代高信任度 SaaS)
*Ideal for: B2B enterprise software, checkout flows, settings panels, medical or legal applications.*

- **Clarity & Predictability**: Clear card boundaries, subtle shadows, accessible high-contrast text.
- **Refined Micro-Interactions**: Smooth focus rings, explicit hover highlight, instant form validation, clear empty/error states.
- **Zero Decorative Surprise**: No ambient glows, no parallax, no unexpected motion. Every pixel earns trust.

**Shadow Elevation Ladder**:
```css
:root {
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 12px -2px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 12px 32px -4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.04);
  --shadow-focus: 0 0 0 3px hsla(220, 80%, 55%, 0.35);
}
```

**Complete Form Control States**:
```css
.trust-input {
  padding: 0.625rem 0.875rem;
  border: 1.5px solid hsl(220 15% 82%);
  border-radius: 8px;
  background: hsl(0 0% 100%);
  font: 400 0.9375rem/1.5 'Inter', system-ui;
  color: hsl(220 25% 12%);
  transition: border-color 150ms var(--ease-snappy), box-shadow 150ms var(--ease-snappy);
}

.trust-input:hover {
  border-color: hsl(220 20% 70%);
}

.trust-input:focus-visible {
  border-color: hsl(220 80% 55%);
  box-shadow: var(--shadow-focus);
  outline: none;
}

.trust-input[aria-invalid="true"] {
  border-color: hsl(0 72% 51%);
  box-shadow: 0 0 0 3px hsla(0, 72%, 51%, 0.15);
}

.trust-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: hsl(220 15% 96%);
}
```

**Primary Button with Loading State**:
```css
.trust-button {
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 8px;
  background: hsl(220 80% 50%);
  color: #fff;
  font: 600 0.875rem/1.4 'Inter', system-ui;
  cursor: pointer;
  transition: background 150ms var(--ease-snappy), transform 100ms var(--ease-bounce);
}

.trust-button:hover { background: hsl(220 85% 45%); }
.trust-button:active { transform: scale(0.97); }
.trust-button:focus-visible { box-shadow: var(--shadow-focus); outline: none; }

.trust-button[aria-busy="true"] {
  pointer-events: none;
  opacity: 0.75;
  /* Spinner via pseudo-element */
}

.trust-button[aria-busy="true"]::after {
  content: '';
  display: inline-block;
  width: 1em; height: 1em;
  margin-inline-start: 0.5em;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 600ms linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }
```

---

## 2. Curated Typography Pairing Matrix

| Archetype / Mood | Display Typeface | Body Copy Typeface | Monospace / Label Typeface |
| :--- | :--- | :--- | :--- |
| **Avant-Garde SaaS** | `Syne` / `Cabinet Grotesk` | `Plus Jakarta Sans` | `Space Mono` |
| **Editorial Luxury** | `Instrument Serif` / `Playfair` | `Inter` / `Outfit` | `JetBrains Mono` |
| **Precision Dev Tool** | `Space Grotesk` | `Inter` | `JetBrains Mono` |
| **Modern Fintech** | `Satoshi` / `Switzer` | `Plus Jakarta Sans` | `IBM Plex Mono` |
| **Neo-Brutalism** | `Archivo Black` / `Clash Display` | `Public Sans` | `Fira Code` |
| **Obsidian Cyberpunk** | `Orbitron` / `Space Grotesk` | `Inter` / `DM Sans` | `JetBrains Mono` / `Fira Code` |
| **Spatial Glassmorphism** | `Outfit` / `General Sans` | `Plus Jakarta Sans` | `Space Mono` |

---

## 3. Direction & Fit Test

Before implementation, validate the chosen visual thesis against these three questions:

1. **Can this interface be recognized without its brand logo?** If changing the logo makes it look like any generic template, increase visual tension or refine character details.
2. **Does the chosen style match the trust level?** Do not use Neo-Brutalism or heavy Skeuomorphism for medical checkout flows where clarity and speed are paramount.
3. **Does the composition remain responsive on mobile?** Ensure tactile depth, multi-layered glass, and broken grids degrade cleanly to touch viewports.

