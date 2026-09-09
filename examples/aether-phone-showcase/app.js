/* ==========================================================================
   Aether Phone 1 — Interactive 3D Exploded Anatomy Logic
   ========================================================================== */

(function app() {
  'use strict';

  // ══════════════════════════════════════════════════════════════════════════
  // 1. SYNTHESIZED WEB AUDIO FEEDBACK
  // ══════════════════════════════════════════════════════════════════════════
  let audioCtx = null;
  function playClick() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.03);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.start(now);
      osc.stop(now + 0.03);
    } catch(e) {}
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 2. EXPLODED ANATOMY HOTSPOT DATA & INTERACTION
  // ══════════════════════════════════════════════════════════════════════════
  const layerData = {
    'soc': {
      tag: 'LAYER 03 // SILICON ARCHITECTURE',
      title: 'Aether X1 Neural Processing Unit (2nm)',
      desc: 'The world’s first 2nm quantum architecture with 24-core neural tensor engine. Capable of executing 70B parameter multimodal AI models locally at 48 tokens/sec with zero cloud latency.',
      spec1: { label: 'FABRICATION', val: '2nm TSMC GAA' },
      spec2: { label: 'AI COMPUTE', val: '68 TOPS NPU' },
      spec3: { label: 'PEAK CLOCK', val: '4.35 GHz' },
      spec4: { label: 'MEMORY BUS', val: 'LPDDR5X 10.7Gbps' },
      zoom: 'scale(1.18) translate(-4%, 2%)'
    },
    'screen': {
      tag: 'LAYER 01 // DISPLAY OPTICS',
      title: 'Tandem Ceramic OLED Matrix (120Hz ProMotion)',
      desc: 'Dual-stack organic emitter panels delivering 3,200 nits peak outdoor brightness. Front surface reinforced with micro-crystalline Ceramic Armor with 4× scratch resistance.',
      spec1: { label: 'RESOLUTION', val: '3120 × 1440 (520 PPI)' },
      spec2: { label: 'PEAK NIT', val: '3,200 Nits HDR' },
      spec3: { label: 'REFRESH', val: '1Hz – 120Hz LTPO' },
      spec4: { label: 'COLOR', val: '100% DCI-P3 10-bit' },
      zoom: 'scale(1.15) translate(0%, 14%)'
    },
    'optics': {
      tag: 'LAYER 02 // PHOTONIC IMAGING',
      title: 'Periscope Quad-Optic Prism Array',
      desc: 'Sub-millimeter voice-coil optical image stabilization with 7-element fluorite glass lenses and 1-inch 50MP Sony LYT-900 sensor with 14.2 stops of dynamic range.',
      spec1: { label: 'MAIN SENSOR', val: '50MP 1-inch LYT-900' },
      spec2: { label: 'OPTICAL ZOOM', val: '10× Periscope Prism' },
      spec3: { label: 'STABILIZATION', val: '3D Sensor-Shift OIS' },
      spec4: { label: 'VIDEO CAPTURE', val: '8K 60FPS ProRes LOG' },
      zoom: 'scale(1.22) translate(-14%, 6%)'
    },
    'vc': {
      tag: 'LAYER 04 // THERMAL DISSIPATION',
      title: '3D Stainless Steel Vapor Chamber Cooling',
      desc: 'Micro-channeled deionized liquid loop covering 4,800mm² of the mainboard. Keeps peak gaming temperatures below 38.5°C during sustained 120FPS ray-tracing loads.',
      spec1: { label: 'VC SURFACE AREA', val: '4,800 mm²' },
      spec2: { label: 'THERMAL CONDUCT', val: '10,000 W/m·K' },
      spec3: { label: 'DELTA TEMP', val: '-8.5°C Under Load' },
      spec4: { label: 'WICK STRUCTURE', val: 'Sintered Copper Mesh' },
      zoom: 'scale(1.15) translate(-8%, -2%)'
    },
    'battery': {
      tag: 'LAYER 05 // ENERGY ARCHITECTURE',
      title: 'Graphite-Enhanced 5,400 mAh Silicon-Carbon Cell',
      desc: 'High-density silicon-anode battery technology providing 32 hours of continuous mixed usage. 120W HyperCharge powers 0% to 100% in 18 minutes.',
      spec1: { label: 'CAPACITY', val: '5,400 mAh' },
      spec2: { label: 'WIRED CHARGE', val: '120W (18m full)' },
      spec3: { label: 'WIRELESS', val: '50W MagSafe Qi2' },
      spec4: { label: 'CYCLE LIFE', val: '1,600 cycles (80%)' },
      zoom: 'scale(1.14) translate(4%, -10%)'
    },
    'frame': {
      tag: 'LAYER 06 // METALLURGY',
      title: 'Aerospace Grade 5 Titanium Unibody Chassis',
      desc: 'Precision CNC-milled from a solid billet of Ti-6Al-4V titanium. Features integrated antenna bands with zero signal attenuation and IP68 6-meter water submersion resistance.',
      spec1: { label: 'ALLOY COMPOSITION', val: 'Ti-6Al-4V Grade 5' },
      spec2: { label: 'TENSILE STRENGTH', val: '950 MPa' },
      spec3: { label: 'TOTAL WEIGHT', val: '194 grams' },
      spec4: { label: 'WATER RESIST', val: 'IP68 (6m 30min)' },
      zoom: 'scale(1.12) translate(8%, -16%)'
    }
  };

  const explodedImg = document.getElementById('exploded-img');
  const deckTag = document.getElementById('deck-tag');
  const deckTitle = document.getElementById('deck-title');
  const deckDesc = document.getElementById('deck-desc');
  const spec1Label = document.getElementById('deck-spec1-label');
  const spec1Val = document.getElementById('deck-spec1-val');
  const spec2Label = document.getElementById('deck-spec2-label');
  const spec2Val = document.getElementById('deck-spec2-val');
  const spec3Label = document.getElementById('deck-spec3-label');
  const spec3Val = document.getElementById('deck-spec3-val');
  const spec4Label = document.getElementById('deck-spec4-label');
  const spec4Val = document.getElementById('deck-spec4-val');

  function updateLayer(key) {
    playClick();

    // Update hotspots active state
    document.querySelectorAll('.hotspot-pin').forEach(pin => {
      pin.classList.toggle('active', pin.dataset.target === key);
    });

    // Update tabs active state
    document.querySelectorAll('.layer-tab-btn').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.layer === key);
    });

    if (key === 'all') {
      if (explodedImg) explodedImg.style.transform = 'scale(1) translate(0, 0)';
      deckTag.textContent = 'SYSTEM OVERVIEW // 6 MODULAR LAYERS';
      deckTitle.textContent = 'Complete 3D Architecture Exploded Assembly';
      deckDesc.textContent = 'All subsystems engineered in tandem: from the 3,200 nit Tandem OLED display down to the aerospace-grade Grade 5 titanium frame.';
      spec1Label.textContent = 'CHASSIS'; spec1Val.textContent = 'Grade 5 Titanium';
      spec2Label.textContent = 'PROCESSOR'; spec2Val.textContent = '2nm Aether X1';
      spec3Label.textContent = 'BATTERY'; spec3Val.textContent = '5,400 mAh';
      spec4Label.textContent = 'CAMERA'; spec4Val.textContent = '50MP 1-inch LYT-900';
      return;
    }

    const data = layerData[key];
    if (!data) return;

    if (explodedImg) {
      explodedImg.style.transform = data.zoom;
    }

    deckTag.textContent = data.tag;
    deckTitle.textContent = data.title;
    deckDesc.textContent = data.desc;

    spec1Label.textContent = data.spec1.label; spec1Val.textContent = data.spec1.val;
    spec2Label.textContent = data.spec2.label; spec2Val.textContent = data.spec2.val;
    spec3Label.textContent = data.spec3.label; spec3Val.textContent = data.spec3.val;
    spec4Label.textContent = data.spec4.label; spec4Val.textContent = data.spec4.val;
  }

  // Bind Hotspot clicks
  document.querySelectorAll('.hotspot-pin').forEach(pin => {
    pin.addEventListener('click', () => {
      updateLayer(pin.dataset.target);
    });
  });

  // Bind Layer Tab clicks
  document.querySelectorAll('.layer-tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      updateLayer(tab.dataset.layer);
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // 3. COLOR FINISH SWITCHER
  // ══════════════════════════════════════════════════════════════════════════
  document.querySelectorAll('.color-swatch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      playClick();
      document.querySelectorAll('.color-swatch-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // 4. PRE-ORDER BUTTON
  // ══════════════════════════════════════════════════════════════════════════
  document.querySelectorAll('.btn-preorder').forEach(btn => {
    btn.addEventListener('click', () => {
      playClick();
      alert('✦ Aether Phone 1 Pre-Order reserved! Priority queue token allocated.');
    });
  });

  console.info('[Aether Hardware] 3D Exploded Anatomy Experience ready.');
})();
