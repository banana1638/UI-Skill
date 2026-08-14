(function () {
  'use strict';

  function renderStaticCounters() {
    document.querySelectorAll('.counter').forEach(el => {
      const suffix = el.dataset.suffix || '';
      const target = parseFloat(el.dataset.value);
      el.textContent = Number.isFinite(target)
        ? Math.round(target).toLocaleString() + suffix
        : el.textContent;
    });
  }

  MotionInit.run(
    (gsap) => {
      gsap.from('.card', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
      });

      gsap.from('.stream-row', {
        x: -20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        delay: 0.3,
        ease: 'power2.out',
      });

      document.querySelectorAll('.counter').forEach(el => {
        const target = parseFloat(el.dataset.value);
        const suffix = el.dataset.suffix || '';
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toLocaleString() + suffix;
          },
        });
      });
    },
    renderStaticCounters
  );

  // 2. Micro-Interaction: Keyboard shortcut trigger feedback
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const btn = document.getElementById('deploy-btn');
      if (!btn) return;

      if (typeof gsap !== 'undefined') {
        // Route through GSAP so this never fights a GSAP-driven transform
        // elsewhere in the app for state ownership.
        gsap.to(btn, {
          scale: 0.95,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: 'power1.inOut',
          onComplete: () => alert('Quick Command Palette invoked [⌘K]'),
        });
      } else {
        // GSAP unavailable — plain CSS class toggle as a safe fallback.
        btn.classList.add('is-pressed');
        setTimeout(() => {
          btn.classList.remove('is-pressed');
          alert('Quick Command Palette invoked [⌘K]');
        }, 100);
      }
    }
  });
})();
