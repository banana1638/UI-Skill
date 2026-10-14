# Performance And Content Resilience

Use this reference for content-bearing, localized, or performance-sensitive interfaces. Performance and resilient content are core UX constraints, not polish tasks deferred until the end.

## 1. Lightweight Performance Contract

Start from the repository budget. If it has none, use these review defaults as prompts for measurement, not universal pass/fail limits:

| Metric | Default review budget |
| --- | ---: |
| JavaScript transfer | 350 KB |
| Image transfer above the fold | 500 KB |
| Font transfer | 250 KB |
| Total measured transfer | 1 MB |
| LCP | 2.5 s |
| CLS | 0.1 |
| INP | 200 ms |

Before adding a dependency, font, animation library, video, canvas, or image treatment, identify its task value and cost. Prefer responsive images, fixed image dimensions, font subsetting, deferred non-critical behavior, and transform/opacity motion. Do not use a performance number captured from a development machine as a production guarantee.

## 2. Content Stress Matrix

Use real or representative production-shaped values. Check:

- Short, typical, and very long headings, labels, names, and navigation items.
- Unbroken URLs, IDs, code-like strings, and large numbers.
- Empty, zero, loading, stale, partial-permission, offline, and error states.
- Locale-specific dates, currencies, decimals, addresses, and input methods.
- RTL direction and logical layout properties when the product supports RTL.

Keep DOM and focus order aligned with reading order. Do not rely on visual CSS reordering to create a layout that becomes nonsensical for keyboard or assistive technology users.

## 3. Browser And Enhancement Policy

Read the project's supported-browser policy before adopting a new web platform feature. For a non-essential enhancement, graceful absence is acceptable. For a core task, provide a fallback with the same outcome. Test both paths when the feature meaningfully changes behavior.
