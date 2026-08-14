---
name: design-premium-frontends
description: Design and implement distinctive, polished, production-ready web interfaces when the user explicitly asks to create, redesign, premium-polish, art-direct, or add sophisticated motion to a frontend. Use for substantial user-facing UI work involving HTML/CSS, Tailwind, React, Vue, Svelte, Next.js, component systems, fluid typography, semantic design tokens, micro-interactions, container-aware layouts, view transitions, GSAP, ScrollTrigger, timelines, or SplitText. Do not trigger for routine bug fixes, copy edits, backend work, or small CSS adjustments unless the user asks for visual quality, interaction craft, or a less generic interface.
---

# Design Premium Frontends

Create web interfaces that feel authored specifically for the target product rather than assembled from generic AI templates or fashionable defaults. Treat aesthetics, usability, accessibility, responsive behavior, tactile depth, motion physics, and production code quality as one craft.

---

## 1. Start With Context & Visual Thesis

Before modifying or creating code, choose the smallest effective operating mode:

- **Full design pass**: Use for new pages, redesigns, landing pages, dashboards, design systems, or motion-heavy experiences.
- **Scoped polish pass**: Use when improving an existing screen; preserve layout, data, and component contracts unless the user asks for a larger redesign.
- **Surgical fix**: Use only the relevant checklist item for small UI corrections; do not introduce a new visual system.

Then:

1. **Inspect Context**: Analyze existing page structure, global styles, tokens, typography, assets, and framework conventions.
2. **Identify Product Persona**: Determine audience, trust requirements, content density, and brand voice.
3. **Preserve Trusted Behavior**: Never degrade established business logic, validation, accessibility, or security to simplify visual styling.
4. **Formulate a Visual Thesis**: For full design passes, write a concise visual thesis statement in this format:
   > *"This interface should feel [2-3 emotional qualities] through [2-3 concrete design/motion mechanisms], while keeping [primary task] effortless and accessible."*
5. **Select a Design Archetype**: For full design passes, choose one of 7 distinct visual styles (do not mix conflicting themes arbitrarily):
   - **Skeuomorphic & Soft Neumorphic (拟物/新拟物触感)**: Multi-layered soft inset/outset shadows, metallic/leather finish, physical toggle switches, tactile press depth.
   - **Neo-Brutalism & Retro Modern (新粗犷主义)**: Stark 3px-4px black borders, offset solid shadows (`4px 4px 0 #000`), bold primary colors, high-impact poster headlines.
   - **Editorial Paper & Luxury (纸质高奢)**: High-contrast serif display font + clean sans copy, subtle paper grain texture, warm ivory canvas (`hsl(40 20% 97%)`), generous whitespace.
   - **Obsidian Cyberpunk & Dark Mode (黑曜石深色/赛博空间)**: Deep dark background contrast tiers (0-5% HSL lightness), subtle ambient light halos, neon accent pops (`hsl(160 100% 50%)`).
   - **Swiss International Minimalist (瑞士国际极简)**: Rigid grid alignment, crisp typography contrast, bold monochrome palette with single accent hue, zero ambient blur.
   - **Spatial Glassmorphism (空间玻璃)**: Dynamic `backdrop-filter: blur(16px) saturate(180%)`, multi-surface glass border highlights, glowing light filters.
   - **Product-Led High-Trust SaaS (当代高信任度 SaaS)**: Refined micro-interactions, subtle surface elevation, maximum legibility, zero layout shift.

---

## 2. Frame-Perfect Motion Physics & Micro-Interactions

Treat motion as physical feedback, continuity, and hierarchy—never as aimless decoration.

### Spring Easing Physics
For primary tactile interactions, avoid generic `ease` or `linear` transitions unless the project already has a coherent motion token system. Use calibrated cubic-beziers:
- **Snappy Spring (Panels, Menus, Modals)**: `cubic-bezier(0.16, 1, 0.3, 1)`
- **Tactile Bounce (Button Press, Toggles, Switches)**: `cubic-bezier(0.34, 1.56, 0.64, 1)`
- **Atmospheric Transition (Theme Shift, View Transitions)**: `cubic-bezier(0.65, 0, 0.35, 1)`

### Complete Interaction States
Every user-facing interactive element touched by the work must define distinct, polished visual feedback across relevant states:
- **Resting**: Clean surface elevation and legible text.
- **Hover**: Subtle lift (`translateY(-2px)`), shimmer pass, or ambient border highlight with snappy easing.
- **Active / Press**: Tactile compression (`scale(0.97)` or inset shadow shift) with zero delay.
- **Focus-Visible**: High-contrast, 2px-offset focus ring (`outline: 2px solid var(--focus-ring); outline-offset: 2px`).
- **Loading / Skeleton**: Smooth GPU shimmer gradient (`background: linear-gradient(90deg, ...)`) without layout shift.
- **Disabled**: Reduced opacity (`0.5`), `cursor: not-allowed`, no hover/active transforms.
- **Success / Error**: Semantic color pulse and clear inline message or icon state.

### CSS vs GSAP Decision Boundary
CSS transitions and `@keyframes` are sufficient for single-element hover, press, focus, and skeleton states. When the animation requires **coordinated multi-element timelines, scroll-driven pinning, text splitting, path morphing, or physics-based elastic easing**, use GSAP if the dependency already exists or the user approves adding it. Account for licensing and fallbacks; SplitText is not always available. See `references/gsap-animation-patterns.md` for ScrollTrigger, timeline orchestration, SplitText, and framework integration patterns.

---

## 3. Deliberate System Architecture & Token Blueprint

Establish CSS custom properties or framework tokens before scattering hardcoded values. Reuse existing token names when they are coherent. Organize new tokens by responsibility: **Raw scales → Semantic roles → Component overrides**.

```css
:root {
  /* Surfaces */       --surface-canvas: hsl(220 20% 98%);
  /* Text */            --text-primary: hsl(220 30% 10%);
  /* Accent */          --accent-brand: hsl(245 80% 60%);
  /* Borders */         --border-subtle: hsl(220 15% 90%);
  /* Focus */           --focus-ring: hsl(245 90% 58%);
  /* Spring Easing */   --ease-snappy: cubic-bezier(0.16, 1, 0.3, 1);
  /* Typography */      --font-display: 'Syne', 'Playfair Display', sans-serif;
  /* Elevation */       --shadow-md: 0 8px 24px -4px rgba(0, 0, 0, 0.08);
}
```

See [references/color-and-token-system.md](references/color-and-token-system.md) for the full token layer architecture, OKLCH perceptual color, theme contrast rules, and review checklist.

---

## 4. Modern CSS & Production Quality

Use modern platform features when the project's browser support allows them, and provide a functional baseline when support is uncertain.

1. **Container Queries (`@container`)**: Make reusable components respond to their container width, not just the viewport width.
2. **`:has()` Parent Selection**: Style cards or form groups dynamically based on child state (`card:has(input:checked)`) with tightly scoped selectors.
3. **CSS Subgrid**: Align nested form grids or card layouts seamlessly to their parent grid when supported.
4. **Native Popover & Dialog API**: Use native `<dialog>` and `popover` only when their behavior matches the interaction contract.
5. **Scroll-Driven Animations**: Use `animation-timeline: scroll()` for progressive enhancement; prefer GSAP ScrollTrigger when compatibility or orchestration matters.
6. **View Transitions API**: Smoothly animate route or state morphing when it does not obscure loading, focus, or navigation state.
7. **Hardware Acceleration**: Animate only GPU-friendly properties (`transform`, `opacity`). Avoid animating `height`, `margin`, or `padding` to prevent layout reflows (CLS).

### Tailwind CSS Integration
When using Tailwind CSS, map all semantic tokens into `tailwind.config.js` → `theme.extend` rather than scattering arbitrary values (`text-[hsl(220,30%,10%)]`) across templates. Components should reference theme keys (`text-primary`, `bg-surface-canvas`) so the design system remains centralized and theme-switchable.

---

## 5. Anti-AI-Slop Craft Review

Reject or refine the interface if any of the following cliché AI tropes are present:

- ❌ **Generic Purple-on-Dark Glow**: Adding random purple/pink radial blurs behind dark boxes without brand context.
- ❌ **Unvarying Bento Cards**: Forcing every section into identical square cards without visual hierarchy or focal tension.
- ❌ **Font Indifference**: Defaulting automatically to system Inter/Roboto without choosing an intentional display typeface.
- ❌ **Decorative Fake Content**: Inventing fake metrics, charts, testimonials, or claims to fill empty space.
- ❌ **Jittery / Rigid Motion**: Motion that lags, jumps, or uses standard linear transition curves.
- ❌ **Mobile Stacking Failure**: Desktop layout looks decorated, but mobile collapses into a plain vertical list without thoughtful touch adaptation.
- ❌ **Missing Interaction States**: Controls lack explicit `:focus-visible`, active press depth, empty states, or error handling.

---

## 6. Quality Gates Before Delivery

Before finishing substantial UI work:

1. **Run the app or open the artifact** and inspect the actual rendered page, not only the source.
2. **Check desktop and mobile widths** including 320px, an intermediate breakpoint, and a wide desktop viewport.
3. **Stress test content** with long labels, empty states, loading states, error states, and missing images when relevant.
4. **Verify keyboard and reduced-motion behavior**: focus indicators are visible, tab order is logical, and `prefers-reduced-motion` keeps the interface usable.
5. **Verify script-failure resilience**: for any element whose reveal depends on a CDN-hosted script (GSAP, font loaders, etc.), simulate the script failing to load (block the request in devtools, or disable JS) and confirm the content remains visible and usable. See [references/accessibility-motion-performance.md](references/accessibility-motion-performance.md) §3.5. Never ship a hidden-by-default state that only JS can rescue.
6. **Check visual integrity**: no clipped text, horizontal overflow, incoherent overlap, layout shift, blurry transformed text, or decorative layers intercepting pointer events.
7. **Do not invent facts**: use real supplied content or clearly labeled placeholder/sample content.

---

## 7. Recommended References

- Read [references/visual-direction-system.md](references/visual-direction-system.md) for the 7 Design Archetypes, Skeuomorphism/Neumorphism formulas, and typography pairing matrix.
- Read [references/design-inspiration-and-benchmarks.md](references/design-inspiration-and-benchmarks.md) for industry benchmark products by archetype, curated font catalogs, UI ecosystem layering, and the "Squint Test" visual audit.
- Read [references/framework-adapters.md](references/framework-adapters.md) for Tailwind CSS token mapping, React/Next.js client boundaries, Vue 3 GSAP context, and Svelte 5 spring physics.
- Read [references/taste-system-v4-avant-garde.md](references/taste-system-v4-avant-garde.md) for tactile depth physics, pointer tilt, spring motion curves, and CSS 3D transforms.
- Read [references/accessibility-motion-performance.md](references/accessibility-motion-performance.md) for frame-perfect motion budgets, GPU acceleration, WCAG AA focus rings, and reduced motion fallbacks.
- Read [references/interface-craft-checklist.md](references/interface-craft-checklist.md) for state completeness auditing, form polish, touch target sizing, and anti-slop verification.
- Read [references/color-and-token-system.md](references/color-and-token-system.md) for HSL semantic role architecture and dark/light mode elevation scaling.
- Read [references/compound-components-and-modern-css.md](references/compound-components-and-modern-css.md) for modern HTML5 popover, container query, and top-layer UI patterns.
- Read [references/fluid-layout-and-typography.md](references/fluid-layout-and-typography.md) for fluid type scales, intrinsic layout primitives (Stack/Switcher/Sidebar), container-aware components, and font delivery optimization.
- Read [references/form-and-trust-patterns.md](references/form-and-trust-patterns.md) for form validation timing, autofill compatibility, high-trust submission patterns, and data presentation integrity.
- Read [references/gsap-animation-patterns.md](references/gsap-animation-patterns.md) for GSAP ScrollTrigger, timeline orchestration, SplitText, elastic easing, and framework integration patterns (React/Vue/Next.js).
