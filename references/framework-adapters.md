# Framework Adapters & Token Mapping

Use this reference when integrating the design system tokens, typography, and motion curves into specific modern frontend frameworks and utility tools (Tailwind CSS, React / Next.js, Vue 3, Svelte 5).

---

## 1. Tailwind CSS Integration (v3 & v4)

Map semantic CSS variables into `tailwind.config.js` to preserve themeability and avoid scattered arbitrary values (`text-[hsl(...)]`).

### `tailwind.config.js` Theme Mapping

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--surface-canvas)',
        raised: 'var(--surface-raised)',
        overlay: 'var(--surface-overlay)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        muted: 'var(--text-muted)',
        brand: {
          DEFAULT: 'var(--accent-brand)',
          hover: 'var(--accent-hover)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          strong: 'var(--border-strong)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      transitionTimingFunction: {
        snappy: 'var(--ease-snappy)',
        bounce: 'var(--ease-bounce)',
        atmospheric: 'var(--ease-atmospheric)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        tactile: 'var(--shadow-tactile)',
      },
    },
  },
  plugins: [],
};
### Component Variant Architecture (`cva` + `cn`)

Avoid monolithic class dumping in JSX (>12 classes per tag). Decouple component styling using `class-variance-authority` and `clsx`/`tailwind-merge`:

```tsx
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        subtle: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10 min-h-[44px] min-w-[44px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
```

---

## 2. React / Next.js (App Router) Integration

### Client vs Server Boundary for Animations

Keep layout and data fetching in Server Components, isolate animations in lightweight Client Component leaves:

```tsx
// app/components/AnimatedCard.tsx
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function AnimatedCard({ title, description, icon }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(cardRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    });
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className="p-6 rounded-card bg-raised border border-border-subtle shadow-md hover:shadow-lg transition-shadow duration-normal ease-snappy"
    >
      <div className="text-2xl mb-3 text-brand">{icon}</div>
      <h3 className="font-display font-medium text-lg text-primary">{title}</h3>
      <p className="text-sm text-secondary mt-1">{description}</p>
    </div>
  );
}
```

### Next.js Native View Transitions API

Enable smooth cross-route morphing without heavy router libraries:

```tsx
// app/layout.tsx
import { ViewTransitions } from 'next-view-transitions';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className="bg-canvas text-primary font-body antialiased">
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
```

---

## 3. Vue 3 (Composition API)

### Token Scoping & GSAP Lifecycle

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

onMounted(() => {
  if (sectionRef.value) {
    ctx = gsap.context(() => {
      gsap.from('.stagger-item', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 80%',
        },
      });
    }, sectionRef.value);
  }
});

onUnmounted(() => {
  ctx?.revert(); // Prevent memory leak and clear active listeners
});
</script>

<template>
  <section ref="sectionRef" class="py-16">
    <div class="stagger-item p-4 bg-[var(--surface-raised)] rounded-[var(--radius-card)]">
      <slot />
    </div>
  </section>
</template>
```

---

## 4. Svelte 5 (Runes)

### Spring Physics & Transition Primitives

```svelte
<script lang="ts">
  import { spring } from 'svelte/motion';

  // Svelte spring physics for tactile pointer tilt
  const coords = spring({ x: 0, y: 0 }, {
    stiffness: 0.1,
    damping: 0.35
  });

  function handlePointerMove(e: PointerEvent) {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    coords.set({ x: -y * 8, y: x * 8 });
  }

  function handlePointerLeave() {
    coords.set({ x: 0, y: 0 });
  }
</script>

<div
  role="region"
  aria-label="Interactive Tilt Card"
  onpointermove={handlePointerMove}
  onpointerleave={handlePointerLeave}
  style:transform="perspective(800px) rotateX({$coords.x}deg) rotateY({$coords.y}deg)"
  class="tilt-surface p-6 rounded-card bg-raised border border-border-subtle"
>
  <slot />
</div>

<style>
  .tilt-surface {
    will-change: transform;
    transition: box-shadow var(--duration-normal) var(--ease-snappy);
  }
  @media (prefers-reduced-motion: reduce) {
    .tilt-surface {
      transform: none !important;
    }
  }
</style>
```
