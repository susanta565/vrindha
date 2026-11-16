// Web Audio API Cinematic Sound Synthesizer for Vardhan Media
let audioCtx = null;
let isMuted = false;

// Check localStorage for saved sound preference
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem('vardhan_sound_enabled');
    if (saved !== null) {
      isMuted = saved === 'false';
    }
  } catch (e) {
    // ignore localStorage errors
  }
}

export function isSoundMuted() {
  return isMuted;
}

export function toggleSound() {
  isMuted = !isMuted;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('vardhan_sound_enabled', String(!isMuted));
    } catch (e) {}
  }
  return isMuted;
}

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  if (!audioCtx) {
    audioCtx = new AudioCtx();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Unlock AudioContext on first user interaction to comply with browser autoplay policies
if (typeof window !== 'undefined') {
  const unlock = () => {
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    window.removeEventListener('click', unlock);
    window.removeEventListener('keydown', unlock);
    window.removeEventListener('touchstart', unlock);
  };
  window.addEventListener('click', unlock, { once: true, passive: true });
  window.addEventListener('keydown', unlock, { once: true, passive: true });
  window.addEventListener('touchstart', unlock, { once: true, passive: true });
}

/**
 * Plays a cinematic agency brand transition sound effect:
 * Layer 1: Warm cinematic sub-bass swell
 * Layer 2: Futuristic rising whoosh / frequency sweep
 * Layer 3: Crystalline harmonic shimmer / chime on reveal
 */
export function playTransitionSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Master Gain Node
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.35, now);
    masterGain.connect(ctx.destination);

    // ==========================================
    // Layer 1: Cinematic Sub-Bass Swell
    // ==========================================
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(65, now);
    subOsc.frequency.exponentialRampToValueAtTime(36, now + 0.6);

    subGain.gain.setValueAtTime(0.001, now);
    subGain.gain.linearRampToValueAtTime(0.38, now + 0.12);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    subOsc.connect(subGain);
    subGain.connect(masterGain);
    subOsc.start(now);
    subOsc.stop(now + 0.75);

    // ==========================================
    // Layer 2: Futuristic Rising Whoosh
    // ==========================================
    const whooshOsc = ctx.createOscillator();
    const whooshGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    whooshOsc.type = 'triangle';
    whooshOsc.frequency.setValueAtTime(130, now);
    whooshOsc.frequency.exponentialRampToValueAtTime(540, now + 0.35);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, now);
    filter.frequency.exponentialRampToValueAtTime(1900, now + 0.35);
    filter.frequency.exponentialRampToValueAtTime(350, now + 0.65);

    whooshGain.gain.setValueAtTime(0.001, now);
    whooshGain.gain.linearRampToValueAtTime(0.22, now + 0.2);
    whooshGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    whooshOsc.connect(filter);
    filter.connect(whooshGain);
    whooshGain.connect(masterGain);
    whooshOsc.start(now);
    whooshOsc.stop(now + 0.7);

    // ==========================================
    // Layer 3: Crystalline Shimmer / Chime (Reveal)
    // ==========================================
    const chimeFrequencies = [587.33, 880, 1174.66, 1760]; // D5, A5, D6, A6 (Ethereal major chords)
    chimeFrequencies.forEach((freq, i) => {
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();

      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(freq, now + 0.22 + (i * 0.035));

      const startTime = now + 0.22 + (i * 0.035);
      chimeGain.gain.setValueAtTime(0.001, startTime);
      chimeGain.gain.linearRampToValueAtTime(0.09 / (i + 1), startTime + 0.04);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.55);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(masterGain);
      chimeOsc.start(startTime);
      chimeOsc.stop(startTime + 0.6);
    });

  } catch (err) {
    // Graceful silent handling if browser blocks or restricts audio
    console.warn('Audio playback note:', err);
  }
}
