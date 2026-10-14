/**
 * Azure Horizon — Procedural Ocean Soundscape Engine
 * 
 * Generates organic, living binaural ocean surf & coastal wind sounds entirely 
 * in-browser via the Web Audio API. Requires zero external audio assets.
 * 
 * Architecture:
 * - Procedural Pink Noise Synthesis (Paul Kellet's algorithm)
 * - Rhythmic Tidal Cadence Modulation (LFO + Dual Filter Swell)
 * - Resonant Sea-Breeze Wind Generator
 * - Safe AudioParam automation with anti-pop ramps
 */

class CoastalSoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.cadenceSpeed = 1.0; // 0.6 = lazy calm, 1.4 = brisk swell
    this.volume = 0.5;

    // Internal nodes
    this.noiseNode = null;
    this.surfFilter = null;
    this.surfGain = null;
    this.windFilter = null;
    this.windGain = null;
    this.lfoInterval = null;
  }

  /**
   * Initializes AudioContext upon user gesture
   */
  init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioCtx();

    // Master bus
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  /**
   * Generate 6 seconds of looping pink noise
   */
  createPinkNoiseBuffer() {
    const bufferSize = this.ctx.sampleRate * 6;
    const buffer = this.ctx.createBuffer(2, bufferSize, this.ctx.sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
      const output = buffer.getChannelData(channel);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      }
    }
    return buffer;
  }

  start() {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.isPlaying) return;

    const t = this.ctx.currentTime;
    const pinkBuffer = this.createPinkNoiseBuffer();

    // 1. Noise Source (Surf)
    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = pinkBuffer;
    this.noiseNode.loop = true;

    // 2. Surf Filter (Dynamic Lowpass for wave crest & backwash)
    this.surfFilter = this.ctx.createBiquadFilter();
    this.surfFilter.type = 'lowpass';
    this.surfFilter.frequency.setValueAtTime(220, t);
    this.surfFilter.Q.setValueAtTime(2.5, t);

    // 3. Surf Gain
    this.surfGain = this.ctx.createGain();
    this.surfGain.gain.setValueAtTime(0.01, t);

    // 4. Wind Layer (Bandpass for gentle coastal breeze)
    this.windFilter = this.ctx.createBiquadFilter();
    this.windFilter.type = 'bandpass';
    this.windFilter.frequency.setValueAtTime(550, t);
    this.windFilter.Q.setValueAtTime(1.8, t);

    this.windGain = this.ctx.createGain();
    this.windGain.gain.setValueAtTime(0.12, t);

    // Routing
    this.noiseNode.connect(this.surfFilter);
    this.surfFilter.connect(this.surfGain);
    this.surfGain.connect(this.masterGain);

    this.noiseNode.connect(this.windFilter);
    this.windFilter.connect(this.windGain);
    this.windGain.connect(this.masterGain);

    this.noiseNode.start(t);
    this.isPlaying = true;

    // Smooth entry
    this.surfGain.gain.setTargetAtTime(0.35, t + 0.1, 1.5);

    // Start wave rhythm simulation loop
    this.startTidalOscillation();
  }

  /**
   * Modulates filters to match realistic wave cresting & recede cycles
   */
  startTidalOscillation() {
    let phase = 0;
    const updateCycle = () => {
      if (!this.isPlaying || !this.ctx) return;

      const t = this.ctx.currentTime;
      phase += 0.035 * this.cadenceSpeed;
      
      // Wave shape: slow swell, steep breaking peak, long fizzling recede
      const waveCycle = (Math.sin(phase) + 1) / 2; // 0 to 1
      const crestShape = Math.pow(waveCycle, 2.2);

      // Surf filter cutoff: 160Hz (deep swell) to 1250Hz (crashing crest spray)
      const targetFreq = 160 + crestShape * 1100;
      this.surfFilter.frequency.setTargetAtTime(targetFreq, t, 0.25);

      // Surf gain swell
      const targetSurfGain = 0.08 + crestShape * 0.45;
      this.surfGain.gain.setTargetAtTime(targetSurfGain, t, 0.25);

      // Wind modulation (subtle gusts)
      const windFreq = 480 + Math.sin(phase * 0.5) * 160;
      this.windFilter.frequency.setTargetAtTime(windFreq, t, 0.4);

      this.lfoInterval = requestAnimationFrame(updateCycle);
    };

    this.lfoInterval = requestAnimationFrame(updateCycle);
  }

  stop() {
    if (!this.isPlaying || !this.ctx) return;

    const t = this.ctx.currentTime;
    if (this.surfGain) {
      this.surfGain.gain.setTargetAtTime(0.001, t, 0.5);
    }
    if (this.windGain) {
      this.windGain.gain.setTargetAtTime(0.001, t, 0.5);
    }

    setTimeout(() => {
      if (this.noiseNode) {
        try {
          this.noiseNode.stop();
          this.noiseNode.disconnect();
        } catch (e) {}
      }
      if (this.lfoInterval) {
        cancelAnimationFrame(this.lfoInterval);
      }
      this.isPlaying = false;
    }, 600);
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.08);
    }
  }

  setCadence(val) {
    // 0.5 (gentle low swell) to 1.8 (vigorous breakers)
    this.cadenceSpeed = Math.max(0.4, Math.min(2.0, val));
  }
}

// Global singleton instance
window.coastalAudio = new CoastalSoundEngine();
