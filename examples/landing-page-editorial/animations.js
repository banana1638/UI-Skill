/* ==========================================================================
   GSAP Animations — Editorial Paper & Luxury
   ScrollTrigger entrance reveals, SplitText headline, numeric counters.
   Respects prefers-reduced-motion. All animations are decorative.
   ========================================================================== */

(function () {
  'use strict';

  MotionInit.run((gsap) => {
    document.documentElement.classList.add('motion-ready');
    gsap.registerPlugin(ScrollTrigger);

    document.fonts.ready.then(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          initHeroAnimation();
          initScrollReveals();
          initCounters();
        });
      });
    });
  });

  // ── Hero Timeline ──
  function initHeroAnimation() {
    // SplitText for headline (if SplitText plugin is available)
    if (typeof SplitText !== 'undefined') {
      const split = new SplitText('.hero-headline', { type: 'chars, words' });

      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      heroTl
        .from('.hero-eyebrow', {
          y: 20,
          opacity: 0,
          duration: 0.6,
        })
        .from(split.chars, {
          y: 50,
          opacity: 0,
          rotateX: -40,
          duration: 0.7,
          stagger: 0.025,
          ease: 'back.out(1.7)',
        }, '-=0.3')
        .from('.hero-subtext', {
          y: 30,
          opacity: 0,
          duration: 0.7,
        }, '-=0.4')
        .from('.hero-cta', {
          y: 20,
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          ease: 'back.out(1.7)',
        }, '-=0.3');
    } else {
      // Fallback without SplitText — animate whole elements
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

      heroTl
        .from('.hero-eyebrow', { y: 20, opacity: 0 })
        .from('.hero-headline', { y: 40, opacity: 0 }, '-=0.5')
        .from('.hero-subtext', { y: 30, opacity: 0 }, '-=0.4')
        .from('.hero-cta', { y: 20, opacity: 0, scale: 0.9 }, '-=0.3');
    }
  }

  // ── Scroll-Triggered Reveals ──
  function initScrollReveals() {
    // General reveal-up elements
    gsap.utils.toArray('.reveal-up').forEach(el => {
      gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    // Feature cards — staggered entrance
    const featureCards = gsap.utils.toArray('.feature-card');
    if (featureCards.length) {
      gsap.from(featureCards, {
        y: 60,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: {
          amount: 0.5,
          from: 'start',
        },
        scrollTrigger: {
          trigger: '.features-grid',
          start: 'top 80%',
        },
      });
    }

    // Testimonial — scale entrance
    const testimonial = document.querySelector('.testimonial');
    if (testimonial) {
      gsap.from(testimonial, {
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: testimonial,
          start: 'top 85%',
        },
      });
    }
  }

  // ── Numeric Counters ──
  function initCounters() {
    gsap.utils.toArray('.stat-number[data-value]').forEach(el => {
      const endValue = parseFloat(el.dataset.value);
      const suffix = el.dataset.suffix || '';
      const counter = { value: 0 };

      gsap.to(counter, {
        value: endValue,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = Math.round(counter.value).toLocaleString() + suffix;
        },
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });
  }
})();
