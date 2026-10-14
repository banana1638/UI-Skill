# Motion Design & GSAP Guidelines

Deliberate, physics-grounded motion that clarifies spatial relationships without slowing users down.

---

## 1. Hierarchy of Motion Implementation

Always choose the lowest-overhead tool that meets the interaction requirement:

1. **Native CSS Transitions (80% of use cases)**: State toggles, button hovers, dropdown reveals, color transitions, transforms.
2. **Native CSS Animations & `@starting-style` (15% of use cases)**: Dialog entrances, skeleton shimmers, scroll-driven header collapse using `animation-timeline: scroll()`.
3. **GSAP Core (5% of use cases)**: Only when multi-step timeline sequencing, coordinate interpolation, or complex scroll-scrub pinning is explicitly required.

---

## 2. Calibrated Physics & Easing Tokens

Avoid generic `ease-in-out`. Use purposeful spring-like physics curves:

```css
:root {
  /* Fast micro-actions (buttons, toggles, badges) */
  --ease-snappy: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-snappy: 160ms;

  /* Panels, drawers, and modal transitions */
  --ease-panel: cubic-bezier(0.2, 0.8, 0.2, 1);
  --duration-panel: 280ms;

  /* Playful pops and checkmarks */
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Reduced Motion Override (Mandatory) */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 3. Native CSS Smooth Entry Pattern (`@starting-style`)

Modern browsers support animating elements from `display: none` natively:

```css
dialog[open] {
  opacity: 1;
  transform: scale(1);
  transition: opacity 200ms var(--ease-snappy), transform 200ms var(--ease-snappy), display 200ms allow-discrete;

  @starting-style {
    opacity: 0;
    transform: scale(0.96);
  }
}
```

---

## 4. GSAP Usage Rules (When Strictly Necessary)

- **Free Core Only**: Never use or reference paid GreenSock Club plugins (SplitText, MorphSVG, CustomEase, InertiaPlugin). Use standard GSAP 3 core or free plugins (ScrollTrigger).
- **Mandatory Lifecycle Cleanup**: Always scope animations with `gsap.context()` in modern component workflows to prevent memory leaks and orphaned RAF loops.
- **MatchMedia Guard**: Wrap scroll/motion triggers in `gsap.matchMedia()` to automatically disable complex effects on mobile or when `prefers-reduced-motion` is active:

```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
  const ctx = gsap.context(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: ".feature-section",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    })
    .from(".feature-row", {
      opacity: 0,
      y: 20,
      stagger: 0.08,
      duration: 0.4,
      ease: "power2.out"
    });
  });

  return () => ctx.revert(); // Clean up on unmount
});
```
