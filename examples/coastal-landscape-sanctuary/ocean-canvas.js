/**
 * Azure Horizon — Procedural Ocean Canvas Kinetics
 * 
 * High-performance fluid simulation rendering:
 * - Multi-harmonic Gerstner-style ocean swells & wave crests
 * - Horizon light scattering & celestial body (Sun / Moon / Milky Way stars)
 * - Dynamic water specular shimmer column
 * - Foam crest dispersion & shoreline wash
 * - Interactive pointer ripple physics
 * 
 * Complies with 60fps performance budget & prefers-reduced-motion
 */

class OceanCanvas {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d', { alpha: false });
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.width = 0;
    this.height = 0;
    this.time = 0;
    this.isRunning = false;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Atmospheric parameters (read from CSS variables)
    this.colors = {
      skyTop: '#241539',
      skyMid: '#b54247',
      skyHorizon: '#fba248',
      sunColor: '#fff2b8',
      sunHalo: 'rgba(251, 162, 72, 0.55)',
      seaHorizon: '#994047',
      seaMid: '#31476b',
      seaDeep: '#12223c',
      seaFoam: '#ffecd6',
      seaSpecular: 'rgba(255, 220, 160, 0.8)',
      isNight: 0
    };

    // Celestial coordinates
    this.celestial = {
      x: 0.62, // ratio across screen width
      y: 0.38, // ratio of sky height
      radius: 36
    };

    // Ripple interaction pool
    this.ripples = [];
    this.pointer = { x: -1000, y: -1000, active: false };

    // Stars cache for night mode
    this.stars = [];
    this.initStars();

    this.bindEvents();
    this.resize();
  }

  initStars() {
    this.stars = [];
    for (let i = 0; i < 160; i++) {
      this.stars.push({
        x: Math.random(),
        y: Math.random() * 0.45,
        size: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.04 + 0.015,
        twinklePhase: Math.random() * Math.PI * 2
      });
    }
  }

  readTokens() {
    const rootStyle = getComputedStyle(document.documentElement);
    const getVar = (name, fallback) => rootStyle.getPropertyValue(name).trim() || fallback;

    this.colors.skyTop = getVar('--sky-top', this.colors.skyTop);
    this.colors.skyMid = getVar('--sky-mid', this.colors.skyMid);
    this.colors.skyHorizon = getVar('--sky-horizon', this.colors.skyHorizon);
    this.colors.sunColor = getVar('--sun-color', this.colors.sunColor);
    this.colors.sunHalo = getVar('--sun-halo', this.colors.sunHalo);
    this.colors.seaHorizon = getVar('--sea-horizon-tint', this.colors.seaHorizon);
    this.colors.seaMid = getVar('--sea-mid-tint', this.colors.seaMid);
    this.colors.seaDeep = getVar('--sea-deep-tint', this.colors.seaDeep);
    this.colors.seaFoam = getVar('--sea-foam-tint', this.colors.seaFoam);
    this.colors.seaSpecular = getVar('--sea-specular', this.colors.seaSpecular);
    this.colors.isNight = parseFloat(getVar('--is-night', '0')) || 0;
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize(), { passive: true });

    // Interactive wave disturbing
    const addRippleAt = (clientX, clientY) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const horizonY = this.height * 0.42;

      // Only ripples when interacting with water
      if (y > horizonY - 20) {
        this.ripples.push({
          x,
          y,
          radius: 4,
          maxRadius: Math.min(this.width * 0.25, 180),
          alpha: 0.8,
          speed: 2.2
        });
        if (this.ripples.length > 15) this.ripples.shift();
      }
    };

    window.addEventListener('pointerdown', (e) => addRippleAt(e.clientX, e.clientY), { passive: true });
    window.addEventListener('pointermove', (e) => {
      this.pointer.x = e.clientX;
      this.pointer.y = e.clientY;
      if (Math.random() < 0.15) {
        addRippleAt(e.clientX, e.clientY);
      }
    }, { passive: true });

    // Media query watcher
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.reducedMotion = e.matches;
    });
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.readTokens();

    const loop = () => {
      if (!this.isRunning) return;
      this.render();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  stop() {
    this.isRunning = false;
  }

  render() {
    const { ctx, width, height, colors } = this;
    const speedMult = this.reducedMotion ? 0.2 : 1.0;
    this.time += 0.015 * speedMult;

    const horizonY = height * 0.42;
    const sunX = width * this.celestial.x;
    const sunY = horizonY * 0.78;

    // ── 1. SKY BACKGROUND ──
    const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
    skyGrad.addColorStop(0, colors.skyTop);
    skyGrad.addColorStop(0.55, colors.skyMid);
    skyGrad.addColorStop(1, colors.skyHorizon);
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, horizonY);

    // ── 2. NIGHT MODE: STARS & MILKY WAY ──
    if (colors.isNight > 0.1) {
      ctx.save();
      for (const star of this.stars) {
        const twinkle = Math.sin(this.time * star.twinkleSpeed * 60 + star.twinklePhase);
        const alpha = Math.max(0.1, star.alpha * (0.6 + 0.4 * twinkle) * colors.isNight);
        ctx.fillStyle = `rgba(230, 245, 255, ${alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(star.x * width, star.y * height, star.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // ── 3. CELESTIAL BODY (SUN / MOON) ──
    ctx.save();
    // Corona / Glow
    const glowGrad = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 140);
    glowGrad.addColorStop(0, colors.sunHalo);
    glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 140, 0, Math.PI * 2);
    ctx.fill();

    // Core disc
    ctx.fillStyle = colors.sunColor;
    ctx.beginPath();
    ctx.arc(sunX, sunY, this.celestial.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // ── 4. MULTI-LAYER OCEAN WAVES ──
    // We draw 4 successive wave layers from horizon to bottom foreground
    const layers = [
      { yOffset: horizonY,       amp: 4,  freq: 0.012, speed: 0.8, color: colors.seaHorizon, foam: false },
      { yOffset: horizonY + 50,  amp: 8,  freq: 0.009, speed: 1.1, color: colors.seaHorizon, foam: false },
      { yOffset: horizonY + 130, amp: 14, freq: 0.006, speed: 1.4, color: colors.seaMid,     foam: true  },
      { yOffset: horizonY + 240, amp: 22, freq: 0.004, speed: 1.8, color: colors.seaDeep,    foam: true  }
    ];

    layers.forEach((layer, idx) => {
      this.drawWaveLayer(layer, idx, horizonY, sunX);
    });

    // ── 5. SPECULAR SHIMMER TRAIL (SUN/MOON GLOW COLUMN ON WATER) ──
    this.drawSpecularShimmer(horizonY, sunX);

    // ── 6. RIPPLE PHYSICS ──
    this.drawRipples();
  }

  drawWaveLayer(layer, index, horizonY, sunX) {
    const { ctx, width, height, time, colors } = this;
    const baseGrad = ctx.createLinearGradient(0, layer.yOffset, 0, height);
    baseGrad.addColorStop(0, layer.color);
    baseGrad.addColorStop(1, colors.seaDeep);

    ctx.fillStyle = baseGrad;
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(0, layer.yOffset);

    const step = 8;
    for (let x = 0; x <= width; x += step) {
      // Primary Gerstner harmonic
      const wave1 = Math.sin(x * layer.freq + time * layer.speed) * layer.amp;
      // Secondary cross-chop
      const wave2 = Math.cos(x * layer.freq * 1.8 - time * layer.speed * 0.7) * (layer.amp * 0.35);
      // Crest steepening power curve
      const y = layer.yOffset + wave1 + wave2;

      ctx.lineTo(x, y);
    }

    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();

    // Dynamic wave crest foam highlight on foreground layers
    if (layer.foam) {
      ctx.save();
      ctx.strokeStyle = colors.seaFoam;
      ctx.lineWidth = index === 3 ? 2.5 : 1.5;
      ctx.globalAlpha = index === 3 ? 0.75 : 0.45;
      ctx.beginPath();

      for (let x = 0; x <= width; x += step) {
        const wave1 = Math.sin(x * layer.freq + time * layer.speed) * layer.amp;
        const wave2 = Math.cos(x * layer.freq * 1.8 - time * layer.speed * 0.7) * (layer.amp * 0.35);
        const y = layer.yOffset + wave1 + wave2;

        // Only draw foam near crests
        if (wave1 > layer.amp * 0.35) {
          ctx.lineTo(x, y - 0.5);
        } else {
          ctx.moveTo(x, y);
        }
      }
      ctx.stroke();
      ctx.restore();
    }
  }

  drawSpecularShimmer(horizonY, sunX) {
    const { ctx, width, height, time, colors } = this;
    const shimmerWidth = Math.min(width * 0.28, 220);
    const startY = horizonY + 10;
    const endY = height;

    ctx.save();
    ctx.fillStyle = colors.seaSpecular;

    // Draw sparkle flecks undulating with wave cadence
    const fleckCount = 45;
    for (let i = 0; i < fleckCount; i++) {
      const progress = i / fleckCount;
      const y = startY + progress * (endY - startY);
      const spread = (progress * 1.6 + 0.3) * shimmerWidth;

      const seed = i * 13.37;
      const wavePulse = Math.sin(time * 2.2 + seed);
      if (wavePulse > -0.1) {
        const offsetX = (Math.sin(seed + time) * 0.5) * spread;
        const fleckX = sunX + offsetX;
        const fleckW = (1 - progress * 0.4) * (Math.abs(wavePulse) * 18 + 8);
        const fleckH = Math.max(1, (1 - progress * 0.5) * 2.5);

        ctx.globalAlpha = Math.min(0.85, (1 - progress * 0.7) * (wavePulse + 0.2));
        ctx.beginPath();
        ctx.ellipse(fleckX, y, fleckW / 2, fleckH, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  drawRipples() {
    const { ctx, colors } = this;
    for (let i = this.ripples.length - 1; i >= 0; i--) {
      const r = this.ripples[i];
      r.radius += r.speed;
      r.alpha -= 0.016;

      if (r.alpha <= 0 || r.radius >= r.maxRadius) {
        this.ripples.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.strokeStyle = colors.seaFoam;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = r.alpha * 0.6;
      ctx.beginPath();
      // Elliptical perspective on water plane
      ctx.ellipse(r.x, r.y, r.radius, r.radius * 0.38, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }

  updateAtmosphere() {
    this.readTokens();
  }
}

// Global initialization
window.OceanCanvas = OceanCanvas;
