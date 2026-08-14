/**
 * motion-init.js — Single source of truth for "should decorative motion run?"
 *
 * Usage:
 *   MotionInit.run(
 *     (gsap) => { ... register your GSAP animations here ... },
 *     () => { ... optional: fallback for when motion is skipped ... }
 *   );
 *
 * Guarantees:
 *   - setupFn only runs if GSAP is loaded AND the user has not requested
 *     reduced motion.
 *   - If either condition fails, fallbackFn runs instead (if provided),
 *     and setupFn is never called.
 *   - Callers do not need to re-check gsap availability or matchMedia
 *     themselves — this is the only place that decision is made.
 */
(function (global) {
  'use strict';

  function run(setupFn, fallbackFn) {
    const gsapAvailable = typeof global.gsap !== 'undefined';
    const prefersReducedMotion = global.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!gsapAvailable) {
      console.warn('[motion-init] GSAP not available — skipping decorative motion.');
      if (typeof fallbackFn === 'function') fallbackFn();
      return;
    }

    if (prefersReducedMotion) {
      if (typeof fallbackFn === 'function') fallbackFn();
      return;
    }

    setupFn(global.gsap);
  }

  global.MotionInit = { run };
})(window);
