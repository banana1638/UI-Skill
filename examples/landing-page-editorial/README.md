# Editorial Paper & Luxury — Landing Page Example

A complete end-to-end reference implementation demonstrating the **Editorial Paper & Luxury (纸质高奢)** visual archetype, from token definition through component styling to GSAP scroll animation.

## Content Note

The brand name, metrics, claims, and testimonial in this example are fictional placeholders for demonstrating layout and motion patterns. Do not reuse them as product facts. Replace sample content with user-supplied or verified content in real work.

## Design Decisions

### Visual Thesis
> *"This interface should feel **elegant, unhurried, and tactile** through **high-contrast serif typography, warm paper texture, and generous rhythmic whitespace**, while keeping **content discovery** effortless and accessible."*

### Archetype Selection
**Editorial Paper & Luxury** was chosen because:
- The sample content is long-form editorial (articles, featured products, customer story areas)
- The audience expects a premium, magazine-like reading experience
- The warm paper canvas creates instant visual distinction from typical dark-mode AI demos

### Motion Intensity Budget
- **One Dominant Gesture**: Oversized editorial headline with SplitText character reveal
- **One Material Motif**: Warm paper grain texture overlay
- **One Motion Family**: Scroll-triggered fade-up reveals (`power3.out` deceleration)

### Typography Pairing
| Role | Typeface | Rationale |
|:--|:--|:--|
| Display | `Instrument Serif` | High-contrast editorial presence |
| Body | `Inter` | Maximum legibility at small sizes |
| Labels | `JetBrains Mono` | Wide tracking for category badges |

### Token Architecture
All visual values live in `tokens.css` as CSS custom properties organized by layer:
1. **Raw scales** — HSL color values, spacing steps
2. **Semantic tokens** — `--surface-canvas`, `--text-primary`, `--accent-brand`
3. **Component tokens** — None needed for this scope

### GSAP Usage
- Hero headline: SplitText per-character entrance
- Sections: ScrollTrigger staggered fade-up
- Numeric stats: Counter animation
- All decorative animations respect `prefers-reduced-motion`

## Files

| File | Purpose |
|:--|:--|
| `index.html` | Semantic HTML structure |
| `tokens.css` | Raw → Semantic token definitions |
| `styles.css` | Component styles consuming tokens |
| `animations.js` | GSAP ScrollTrigger + SplitText entrance animations |

## How to Preview

Open `index.html` directly in a browser. No build step required. GSAP is loaded via CDN.
