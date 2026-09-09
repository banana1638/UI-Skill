/* ==========================================================================
   Lumina AI Design Studio — Interactive Application Engine
   
   Features:
   1. Synthesized Web Audio API tactile feedback
   2. GSAP timeline orchestration & numeric counters
   3. Interactive Inspection Drawer (Sheet) with real-time parameter injection
   4. Interactive "New Generation" Composer Modal with live generation engine
   5. Generative Matrix State Filtering (All / In Progress / Complete / Alerts)
   6. Live WebSocket Telemetry stream simulator
   7. Defensive Error Recovery (Instant Retry workflow)
   ========================================================================== */

(function app() {
  'use strict';

  // ══════════════════════════════════════════════════════════════════════════
  // 1. SYNTHESIZED TACTILE WEB AUDIO API (Zero external assets needed)
  // ══════════════════════════════════════════════════════════════════════════

  let audioEnabled = true;
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx && typeof window.AudioContext !== 'undefined') {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playHapticTone(type) {
    if (!audioEnabled) return;
    initAudio();
    if (!audioCtx || audioCtx.state === 'suspended') {
      audioCtx?.resume();
    }
    if (!audioCtx) return;

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'click') {
      // Crisp subtle tactile click (440Hz -> 880Hz short pop)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.03);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.start(now);
      osc.stop(now + 0.03);
    } else if (type === 'open') {
      // Ascending drawer chime
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(560, now + 0.08);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'success') {
      // Shimmer chord for generation completion
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.06); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.12); // G5
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    }
  }

  // Audio Toggle Switch
  const audioToggle = document.getElementById('audio-toggle');
  if (audioToggle) {
    audioToggle.addEventListener('click', () => {
      audioEnabled = !audioEnabled;
      const sw = audioToggle.querySelector('.audio-switch');
      if (sw) sw.classList.toggle('active', audioEnabled);
      if (audioEnabled) playHapticTone('click');
    });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 2. GSAP ENTRANCE & COUNTER ROLL-UP ANIMATIONS
  // ══════════════════════════════════════════════════════════════════════════

  if (typeof gsap !== 'undefined' && document.documentElement.classList.contains('motion-ready')) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.7 } });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        tl.to('.metric-card.reveal-up', { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 }, 0.1)
          .to('.gen-card.reveal-scale', { opacity: 1, scale: 1, stagger: 0.1, duration: 0.6 }, 0.3)
          .to('.activity-panel.reveal-left', { opacity: 1, x: 0, duration: 0.6 }, 0.2);

        // Numeric counters
        document.querySelectorAll('.counter').forEach(el => {
          const endValue = parseFloat(el.dataset.value);
          const isDecimal = endValue % 1 !== 0;
          const counter = { val: 0 };

          gsap.to(counter, {
            val: endValue,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = isDecimal ? counter.val.toFixed(1) : Math.round(counter.val).toLocaleString();
            }
          });
        });
      });
    });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 3. INSPECTION DRAWER (SHEET) — Interaction Design DDR-001
  // ══════════════════════════════════════════════════════════════════════════

  const drawer = document.getElementById('inspection-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');

  // Artifact details dictionary
  const artifactData = {
    'gen-001': {
      title: 'Meridian Liquid Aurora — Var C',
      img: 'assets/hero_art.jpg',
      res: '1920 × 1080 PX',
      format: '16-BIT COLOR DEPTH',
      prompt: '"Futuristic 3D abstract fluid art with luminescent violet ripples, neon cyan caustics, octane render, 8k hyper-detailed, luxury brand aesthetic"',
      model: 'SDXL Turbo v2.1',
      seed: '948172'
    },
    'gen-002': {
      title: 'Parametric Biometric Mesh Topography',
      img: 'assets/pattern_mesh.jpg',
      res: '2048 × 2048 PX',
      format: 'RGBA 32-BIT TILEABLE',
      prompt: '"Organic parametric wireframe mesh and teal gradient topographic contours floating over deep dark obsidian background, precision biometric grid lines"',
      model: 'Flux-Pro v1.1',
      seed: '412093'
    },
    'gen-003': {
      title: 'Aethel Luxury Serum Packaging',
      img: 'assets/packaging.jpg',
      res: '1536 × 1024 PX',
      format: 'RAW UNCOMPRESSED HDR',
      prompt: '"Minimalist matte black cosmetic bottle on geometric marble pedestal, soft atmospheric studio lighting, gentle caustics, architectural composition"',
      model: 'Midjourney v6 API',
      seed: '887102'
    },
    'gen-004': {
      title: 'Sculptural Chrome Typography',
      img: 'assets/typography.jpg',
      res: '2048 × 1024 PX',
      format: 'SRGB VECTOR-ENHANCED',
      prompt: '"Sculptural typography 3D art of abstract serif letterforms in polished chrome and obsidian glass floating in dark studio fog, dramatic caustics"',
      model: 'StableCascade v2',
      seed: '109844'
    }
  };

  function openDrawer(id) {
    const data = artifactData[id];
    if (!data) return;

    document.getElementById('drawer-title').textContent = data.title;
    document.getElementById('drawer-img').src = data.img;
    document.getElementById('drawer-resolution').textContent = data.res;
    document.getElementById('drawer-format').textContent = data.format;
    document.getElementById('drawer-prompt').textContent = data.prompt;
    document.getElementById('drawer-model').textContent = data.model;
    document.getElementById('drawer-seed').textContent = data.seed;

    drawer.classList.add('open');
    drawerBackdrop.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    playHapticTone('open');
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    drawerBackdrop.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    playHapticTone('click');
  }

  // Bind click on all cards
  function bindCardClicks() {
    document.querySelectorAll('.gen-card').forEach(card => {
      card.onclick = (e) => {
        if (e.target.closest('.btn-retry')) return; // Ignore retry clicks
        const id = card.dataset.id;
        openDrawer(id);
      };
    });
  }
  bindCardClicks();

  drawerCloseBtn?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);

  // Drawer action buttons
  document.getElementById('btn-upscale')?.addEventListener('click', () => {
    showToast('⚡ Upscaling queue task dispatched to GPU Node 01');
    playHapticTone('success');
    closeDrawer();
  });
  document.getElementById('btn-fork')?.addEventListener('click', () => {
    openComposerWithPrompt(document.getElementById('drawer-prompt').textContent);
    closeDrawer();
  });
  document.getElementById('btn-export')?.addEventListener('click', () => {
    showToast('📥 16-Bit master asset downloaded successfully');
    playHapticTone('click');
  });

  // ══════════════════════════════════════════════════════════════════════════
  // 4. NEW GENERATION COMPOSER MODAL FLOW
  // ══════════════════════════════════════════════════════════════════════════

  const composerBackdrop = document.getElementById('composer-backdrop');
  const openComposerBtn = document.getElementById('open-composer-btn');
  const composerCloseBtn = document.getElementById('composer-close-btn');
  const composerCancelBtn = document.getElementById('composer-cancel-btn');
  const composerForm = document.getElementById('composer-form');
  const promptInput = document.getElementById('prompt-input');
  const tokenCounter = document.getElementById('token-counter');

  function openComposer() {
    composerBackdrop.classList.add('open');
    playHapticTone('open');
    promptInput.focus();
  }

  function openComposerWithPrompt(text) {
    promptInput.value = text.replace(/^"|"$/g, '');
    updateTokenCount();
    openComposer();
  }

  function closeComposer() {
    composerBackdrop.classList.remove('open');
    playHapticTone('click');
  }

  openComposerBtn?.addEventListener('click', openComposer);
  composerCloseBtn?.addEventListener('click', closeComposer);
  composerCancelBtn?.addEventListener('click', closeComposer);

  // Quick Style Chips toggle
  document.querySelectorAll('.style-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      playHapticTone('click');
      const text = chip.textContent.replace('+', '').trim();
      if (chip.classList.contains('active')) {
        promptInput.value = promptInput.value + ', ' + text;
      }
      updateTokenCount();
    });
  });

  // Ratio buttons toggle
  document.querySelectorAll('.ratio-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ratio-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      playHapticTone('click');
    });
  });

  function updateTokenCount() {
    const words = promptInput.value.trim().split(/\s+/).filter(Boolean).length;
    const tokens = Math.round(words * 1.3);
    if (tokenCounter) tokenCounter.textContent = `${tokens} / 77 tokens`;
  }
  promptInput?.addEventListener('input', updateTokenCount);

  // Form Submit -> Dynamic Generation Flow
  composerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    closeComposer();
    playHapticTone('success');
    showToast('✦ Synthesis initiated on GPU Cluster. Allocating tensor pipeline...');

    // Prepend a dynamic new generating card
    const grid = document.getElementById('generations-grid');
    const newId = 'gen-' + Date.now();
    const promptText = promptInput.value.trim();

    artifactData[newId] = {
      title: 'Custom Synthesis — ' + new Date().toLocaleTimeString(),
      img: 'assets/hero_art.jpg',
      res: '1920 × 1080 PX',
      format: '16-BIT COLOR DEPTH',
      prompt: `"${promptText}"`,
      model: document.getElementById('model-select').value,
      seed: String(Math.floor(Math.random() * 900000 + 100000))
    };

    const newCard = document.createElement('article');
    newCard.className = 'gen-card';
    newCard.dataset.state = 'generating';
    newCard.dataset.id = newId;
    newCard.tabIndex = 0;
    newCard.innerHTML = `
      <div class="gen-preview">
        <img src="assets/hero_art.jpg" alt="Generated Canvas" class="gen-image">
        <div class="skeleton-shimmer" aria-hidden="true"></div>
        <div class="gen-preview-badge-layer">
          <span class="gen-status-pill gen-status-pill--generating">
            <span class="status-dot status-dot--pulse" aria-hidden="true"></span>
            Inferencing <span class="dyn-prog">12%</span>
          </span>
          <span class="model-badge">Flux-Pro v1.1</span>
        </div>
        <div class="gen-progress-bar" role="progressbar" aria-valuenow="12" aria-valuemin="0" aria-valuemax="100">
          <div class="gen-progress-fill" style="width: 12%"></div>
        </div>
      </div>
      <div class="gen-info">
        <div class="gen-title-row">
          <h3 class="gen-title">${artifactData[newId].title}</h3>
          <span class="gen-time">Just now</span>
        </div>
        <p class="gen-prompt">"${promptText}"</p>
        <div class="gen-meta">
          <span>📐 1920×1080</span>
          <span>⚡ 30 Steps</span>
          <span>🎲 Seed: ${artifactData[newId].seed}</span>
          <span class="inspect-hint">Click to Inspect ↗</span>
        </div>
      </div>
    `;

    grid.insertBefore(newCard, grid.firstChild);
    bindCardClicks();

    // Animate progress smoothly to 100%
    let prog = 12;
    const progFill = newCard.querySelector('.gen-progress-fill');
    const dynText = newCard.querySelector('.dyn-prog');

    const interval = setInterval(() => {
      prog += Math.random() * 18 + 8;
      if (prog >= 100) {
        prog = 100;
        clearInterval(interval);
        newCard.dataset.state = 'complete';
        const pill = newCard.querySelector('.gen-status-pill');
        pill.className = 'gen-status-pill gen-status-pill--complete';
        pill.innerHTML = '<span class="status-dot" aria-hidden="true"></span> Complete';
        newCard.querySelector('.skeleton-shimmer')?.remove();
        playHapticTone('success');
        showToast('✓ Artifact completed and cached in 1.42s');
      }
      if (progFill) progFill.style.width = prog + '%';
      if (dynText) dynText.textContent = Math.round(prog) + '%';
    }, 350);
  });

  // ══════════════════════════════════════════════════════════════════════════
  // 5. FILTER TAB BAR (All / In Progress / Complete / Alerts)
  // ══════════════════════════════════════════════════════════════════════════

  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      playHapticTone('click');

      const filter = tab.dataset.filter;
      document.querySelectorAll('.gen-card').forEach(card => {
        const state = card.dataset.state;
        if (filter === 'all' || 
           (filter === 'generating' && state === 'generating') ||
           (filter === 'complete' && state === 'complete') ||
           (filter === 'failed' && state === 'failed')) {
          card.style.display = 'flex';
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(card, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.3 });
          }
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // 6. DEFENSIVE RECOVERY: INSTANT RETRY ON CARD 4
  // ══════════════════════════════════════════════════════════════════════════

  document.querySelectorAll('.btn-retry').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      playHapticTone('click');
      const card = btn.closest('.gen-card');
      if (!card) return;

      btn.disabled = true;
      btn.textContent = 'Retrying...';
      showToast('🔄 Rerouting task to Node 01 with 32GB VRAM allocation...');

      setTimeout(() => {
        card.dataset.state = 'complete';
        const preview = card.querySelector('.gen-preview');
        preview.classList.remove('gen-preview--dimmed');

        const pill = card.querySelector('.gen-status-pill');
        pill.className = 'gen-status-pill gen-status-pill--complete';
        pill.innerHTML = '<span class="status-dot" aria-hidden="true"></span> Recovered';

        const metaRow = card.querySelector('.gen-meta');
        metaRow.innerHTML = `
          <span>📐 2048×1024</span>
          <span>✓ Recovered in 2.2s</span>
          <span>🎲 Seed: 109844</span>
          <span class="inspect-hint">Click to Inspect ↗</span>
        `;
        playHapticTone('success');
        showToast('✓ Typography exploration successfully rendered!');
      }, 1600);
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // 7. REAL-TIME TELEMETRY FEED SIMULATOR
  // ══════════════════════════════════════════════════════════════════════════

  const streamList = document.getElementById('stream-list');
  const telemetryEvents = [
    { type: 'gen', badge: 'INF', msg: 'Tensor core batch #92 dispatched to Node 2' },
    { type: 'system', badge: 'SYS', msg: 'Cluster thermal dissipation normal (61°C)' },
    { type: 'model', badge: 'MDL', msg: 'Midjourney v6 API response token authenticated' },
    { type: 'gen', badge: 'GEN', msg: 'Latent upscaler pass 1/2 complete' },
    { type: 'system', badge: 'OPT', msg: 'Shared VRAM page cache hit ratio 96.8%' }
  ];

  let evIdx = 0;
  function pushTelemetry() {
    if (!streamList) return;
    const ev = telemetryEvents[evIdx % telemetryEvents.length];
    const now = new Date();
    const time = now.toTimeString().split(' ')[0];

    const row = document.createElement('div');
    row.className = 'stream-row';
    row.innerHTML = `
      <span class="stream-time">${time}</span>
      <span class="event-badge event-badge--${ev.type}">${ev.badge}</span>
      <span class="stream-message">${ev.msg}</span>
    `;

    streamList.insertBefore(row, streamList.firstChild);
    while (streamList.children.length > 15) {
      streamList.removeChild(streamList.lastChild);
    }
    evIdx++;

    // Randomize telemetry gauges
    const gpuVal = document.getElementById('gauge-gpu-val');
    const vramVal = document.getElementById('gauge-vram-val');
    if (gpuVal) {
      const g = Math.floor(68 + Math.random() * 12);
      gpuVal.textContent = g + '%';
      document.querySelector('.gauge-fill--violet').style.width = g + '%';
    }
    if (vramVal) {
      const v = Math.floor(54 + Math.random() * 10);
      vramVal.textContent = v + '%';
      document.querySelector('.gauge-fill--cyan').style.width = v + '%';
    }
  }
  setInterval(pushTelemetry, 5000);

  // ══════════════════════════════════════════════════════════════════════════
  // 8. TOAST NOTIFICATION UTILITY
  // ══════════════════════════════════════════════════════════════════════════

  function showToast(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 9. GLOBAL KEYBOARD SHORTCUTS (⌘K / Ctrl+K)
  // ══════════════════════════════════════════════════════════════════════════

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openComposer();
    }
    if (e.key === 'Escape') {
      closeDrawer();
      closeComposer();
    }
  });

  console.info('[Lumina OS] Complete reactive frontend engine initialized.');
})();
