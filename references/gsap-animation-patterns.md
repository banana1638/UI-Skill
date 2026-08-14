# GSAP Animation Patterns

Use this reference when an animation requirement exceeds CSS-only capabilities: coordinated multi-element timelines, scroll-driven pinning, text splitting, path animation, or physics-based elastic easing. GSAP is a complement to CSS motion — not a replacement.

## Contents

- CSS vs GSAP decision boundary
- ScrollTrigger patterns
- Timeline orchestration
- Text animation (SplitText)
- Elastic and physics-based easing
- Performance and accessibility
- Framework integration
- Source basis

---

## 1. CSS vs GSAP Decision Boundary

| Scenario | Use CSS | Use GSAP |
| :--- | :--- | :--- |
| Button hover / press / focus transitions | ✅ | ❌ Unnecessary overhead |
| Simple fade-in on scroll (`animation-timeline: scroll()`) | ✅ If browser support allows | ✅ ScrollTrigger for wider compat |
| Multi-element staggered entrance | ⚠️ Possible but brittle | ✅ `gsap.from()` + `stagger` |
| Scroll-pinned narrative sections | ❌ | ✅ ScrollTrigger `pin` |
| SVG path morph / motion path | ❌ | ✅ MotionPath / MorphSVG |
| Text split (per-character / per-line) | ❌ | ✅ SplitText |
| Numeric counter animation | ❌ | ✅ `gsap.to({ value })` |
| Complex sequenced timeline (hero reveal) | ❌ Impractical | ✅ `gsap.timeline()` |

**Rule**: If the animation can be expressed as a single `transition` or `@keyframes` on one element, keep it in CSS. Reach for GSAP when you need **coordination, sequencing, or scroll-binding**.

---

## 2. ScrollTrigger Patterns

### Basic Scroll-Triggered Entrance

```js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.reveal-up').forEach(el => {
  gsap.from(el, {
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });
});
```

### Staggered Grid Entrance

```js
gsap.from('.feature-card', {
  y: 80,
  opacity: 0,
  duration: 0.7,
  ease: 'power3.out',
  stagger: {
    amount: 0.6,
    from: 'start',
  },
  scrollTrigger: {
    trigger: '.features-grid',
    start: 'top 80%',
  },
});
```

### Pin + Scrub (Scroll Narrative)

```js
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.narrative-section',
    start: 'top top',
    end: '+=200%',
    pin: true,
    scrub: 1,
  },
});

tl.from('.narrative-title', { y: 100, opacity: 0 })
  .from('.narrative-image', { scale: 0.8, opacity: 0 }, '-=0.3')
  .from('.narrative-body', { y: 40, opacity: 0 }, '-=0.2');
```

### Horizontal Scroll Gallery

```js
const container = document.querySelector('.horizontal-gallery');
const panels = gsap.utils.toArray('.gallery-panel');

gsap.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: container,
    start: 'top top',
    end: () => `+=${container.scrollWidth - window.innerWidth}`,
    pin: true,
    scrub: 1,
    snap: 1 / (panels.length - 1),
  },
});
```

### Multi-Layer Parallax

```js
gsap.to('.parallax-bg', {
  yPercent: -30,
  ease: 'none',
  scrollTrigger: {
    trigger: '.parallax-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
});

gsap.to('.parallax-fg', {
  yPercent: -15,
  ease: 'none',
  scrollTrigger: {
    trigger: '.parallax-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
});
```

---

## 3. Timeline Orchestration

### Sequential Hero Reveal

```js
const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

heroTl
  .from('.hero-eyebrow', { y: 20, opacity: 0 })
  .from('.hero-headline', { y: 40, opacity: 0 }, '-=0.5')
  .from('.hero-subtext', { y: 30, opacity: 0 }, '-=0.4')
  .from('.hero-cta', { y: 20, opacity: 0, scale: 0.9 }, '-=0.3')
  .from('.hero-image', { x: 60, opacity: 0 }, '-=0.6');
```

### Labels and Callbacks

```js
const tl = gsap.timeline();

tl.addLabel('start')
  .from('.logo', { scale: 0, ease: 'back.out(1.7)' }, 'start')
  .from('.nav-item', { y: -20, opacity: 0, stagger: 0.1 }, 'start+=0.2')
  .addLabel('contentIn')
  .from('.main-card', { y: 60, opacity: 0 }, 'contentIn')
  .call(() => console.log('Animation complete'));
```

---

## 4. Text Animation

### SplitText Per-Character Entrance

```js
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

const split = new SplitText('.split-headline', { type: 'chars, words' });

gsap.from(split.chars, {
  y: 40,
  opacity: 0,
  rotateX: -90,
  duration: 0.6,
  ease: 'back.out(1.7)',
  stagger: 0.03,
  scrollTrigger: {
    trigger: '.split-headline',
    start: 'top 80%',
  },
});
```

### Line-by-Line Reveal

```js
const split = new SplitText('.reveal-paragraph', { type: 'lines' });

// Wrap lines for overflow hidden clipping
split.lines.forEach(line => {
  const wrapper = document.createElement('div');
  wrapper.style.overflow = 'hidden';
  line.parentNode.insertBefore(wrapper, line);
  wrapper.appendChild(line);
});

gsap.from(split.lines, {
  y: '100%',
  duration: 0.7,
  ease: 'power3.out',
  stagger: 0.1,
});
```

### Numeric Counter

```js
const counter = { value: 0 };
const target = document.querySelector('.stat-number');
const endValue = parseFloat(target.dataset.value);

gsap.to(counter, {
  value: endValue,
  duration: 2,
  ease: 'power2.out',
  onUpdate: () => {
    target.textContent = Math.round(counter.value).toLocaleString();
  },
  scrollTrigger: {
    trigger: target,
    start: 'top 85%',
  },
});
```

---

## 5. Elastic and Physics-Based Easing

### GSAP Easing vs CSS Cubic-Bezier Mapping

| GSAP Ease | Character | CSS Equivalent (Approximate) |
| :--- | :--- | :--- |
| `power3.out` | Smooth deceleration | `cubic-bezier(0.16, 1, 0.3, 1)` (`--ease-snappy`) |
| `back.out(1.7)` | Overshoot bounce | `cubic-bezier(0.34, 1.56, 0.64, 1)` (`--ease-bounce`) |
| `elastic.out(1, 0.3)` | Spring oscillation | No CSS equivalent |
| `bounce.out` | Multi-bounce landing | No CSS equivalent |
| `expo.inOut` | Dramatic acceleration | `cubic-bezier(0.87, 0, 0.13, 1)` |

### Usage Examples

```js
// Elastic modal entrance — spring with overshoot
gsap.from('.modal-panel', {
  scale: 0.8,
  opacity: 0,
  duration: 0.6,
  ease: 'elastic.out(1, 0.4)',
});

// Back easing — subtle overshoot for button icons
gsap.from('.icon-checkmark', {
  scale: 0,
  duration: 0.4,
  ease: 'back.out(2)',
});

// Bounce — notification badge
gsap.from('.badge', {
  y: -30,
  duration: 0.8,
  ease: 'bounce.out',
});
```

### CustomEase for Brand-Specific Curves

```js
import { CustomEase } from 'gsap/CustomEase';
gsap.registerPlugin(CustomEase);

CustomEase.create('brand-spring', 'M0,0 C0.12,0.75 0.25,1.1 0.45,1.03 0.65,0.97 0.82,1 1,1');

gsap.to('.hero-element', {
  y: 0,
  ease: 'brand-spring',
  duration: 0.8,
});
```

---

## 6. Performance and Accessibility

### GPU-Friendly Properties Only

Animate only `transform` and `opacity` for 60fps rendering. Never animate `width`, `height`, `top`, `left`, `margin`, or `padding` with GSAP. Use GSAP's built-in transforms:

```js
// ✅ Good — GPU-composited
gsap.to(el, { x: 100, y: 50, scale: 1.1, opacity: 0.8, rotation: 5 });

// ❌ Bad — triggers layout reflow
gsap.to(el, { width: '200px', marginLeft: '20px', top: '100px' });
```

### will-change Management

```js
// Add will-change before animation starts
gsap.set(el, { willChange: 'transform, opacity' });

gsap.to(el, {
  x: 100,
  opacity: 1,
  duration: 0.6,
  onComplete: () => {
    // Remove will-change after animation to free GPU memory
    gsap.set(el, { willChange: 'auto' });
  },
});
```

### prefers-reduced-motion Fallback

```js
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Skip all decorative animations — set final states immediately
  gsap.set('.reveal-up', { opacity: 1, y: 0 });
  gsap.set('.split-headline', { opacity: 1 });
  // Disable all ScrollTrigger instances
  ScrollTrigger.getAll().forEach(st => st.kill());
} else {
  // Run full animation suite
  initScrollAnimations();
  initHeroTimeline();
}
```

### Component Cleanup

Always kill GSAP instances when a component unmounts to prevent memory leaks:

```js
// Vanilla JS
const ctx = gsap.context(() => {
  // All GSAP calls here are scoped
  gsap.from('.card', { y: 40, opacity: 0, stagger: 0.1 });
}, containerRef);

// On teardown:
ctx.revert();  // Kills all animations and reverts inline styles
```

### Avoid Blocking First Paint

Do not run heavy GSAP timelines synchronously on page load. Defer entrance animations:

```js
// Wait for DOM paint before starting hero animation
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    heroTimeline.play();
  });
});
```

---

## 7. Framework Integration

### React: useGSAP Hook

```tsx
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function FeatureSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.feature-card', {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
    });
  }, { scope: containerRef });  // Auto-cleanup on unmount

  return (
    <section ref={containerRef}>
      <div className="feature-card">...</div>
      <div className="feature-card">...</div>
    </section>
  );
}
```

### Vue: onMounted + gsap.context

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';

const sectionRef = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.card', {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      ease: 'power3.out',
    });
  }, sectionRef.value);
});

onUnmounted(() => ctx?.revert());
</script>
```

### Next.js: Client Component Boundary

```tsx
'use client';

import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with GSAP
const AnimatedHero = dynamic(() => import('./AnimatedHero'), {
  ssr: false,
  loading: () => <HeroFallback />,
});
```

Inside the client component, use the `useGSAP` hook pattern from the React section above.

---

## Source Basis

- [GSAP Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [SplitText](https://gsap.com/docs/v3/Plugins/SplitText/)
- [useGSAP React Hook](https://gsap.com/docs/v3/GSAP/gsap.context()/)
- [CustomEase](https://gsap.com/docs/v3/Eases/CustomEase/)
- [GSAP + Next.js guide](https://gsap.com/resources/nextjs/)
