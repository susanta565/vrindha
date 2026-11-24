// Vardhan Media Transition Sound Manager
// High-performance audio player supporting mobile (iOS Safari, Android Chrome) and desktop with zero latency

const AUDIO_PATH_MP3 = '/transition-sound.mp3';
const AUDIO_PATH_MPEG = '/audio_vardhan.mpeg';

let audioCtx = null;
let audioBuffer = null;
let isAudioBufferLoading = false;
let currentSourceNode = null;
let currentHtmlAudio = null;
let isMuted = false;
let lastPlayTimestamp = 0;
let hasInitialSoundPlayed = false;
let isUnlocked = false;

// Initialize mute state from localStorage
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
  if (isMuted) {
    stopCurrentPlayback();
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
  return audioCtx;
}

// Pre-load and decode audio into Web Audio memory for 0ms delay
async function loadAudioBuffer() {
  if (typeof window === 'undefined' || audioBuffer || isAudioBufferLoading) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  isAudioBufferLoading = true;
  try {
    const response = await fetch(AUDIO_PATH_MP3).catch(() => fetch(AUDIO_PATH_MPEG));
    if (!response || !response.ok) {
      throw new Error('Failed to fetch transition audio');
    }
    const arrayBuffer = await response.arrayBuffer();
    audioBuffer = await ctx.decodeAudioData(arrayBuffer);
  } catch (err) {
    console.warn('Web Audio buffer decode note:', err);
  } finally {
    isAudioBufferLoading = false;
  }
}

// Pre-created HTML5 Audio element for instant fallback
function getHtmlAudioElement() {
  if (typeof window === 'undefined') return null;
  if (!currentHtmlAudio) {
    currentHtmlAudio = new Audio();
    currentHtmlAudio.src = AUDIO_PATH_MP3;
    currentHtmlAudio.preload = 'auto';
    currentHtmlAudio.volume = 0.9;
    currentHtmlAudio.load();
  }
  return currentHtmlAudio;
}

// Stop any currently playing audio to prevent conflicts and overlapping echoes
function stopCurrentPlayback() {
  if (currentSourceNode) {
    try {
      currentSourceNode.stop(0);
      currentSourceNode.disconnect();
    } catch (e) {}
    currentSourceNode = null;
  }
  if (currentHtmlAudio) {
    try {
      currentHtmlAudio.pause();
      currentHtmlAudio.currentTime = 0;
    } catch (e) {}
  }
}

// Unlock audio pipeline for mobile iOS/Android
function unlockMobileAudio() {
  if (isUnlocked && hasInitialSoundPlayed) return;

  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  // Pre-load the buffer if not yet loaded
  loadAudioBuffer();

  const htmlAudio = getHtmlAudioElement();
  if (htmlAudio) {
    const primePromise = htmlAudio.play();
    if (primePromise !== undefined) {
      primePromise
        .then(() => {
          isUnlocked = true;
          // If the initial opening transition sound was blocked by mobile browser autoplay policy,
          // play it now on the user's first touch/interaction!
          if (!hasInitialSoundPlayed && !isMuted) {
            hasInitialSoundPlayed = true;
            // Let the audio play as the opening sound!
          } else {
            htmlAudio.pause();
            htmlAudio.currentTime = 0;
          }
        })
        .catch(() => {
          // Will unlock on subsequent user interaction
        });
    }
  }
}

// Register global touch / interaction listeners for mobile devices
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      loadAudioBuffer();
      getHtmlAudioElement();
    });
  } else {
    loadAudioBuffer();
    getHtmlAudioElement();
  }

  const interactionEvents = ['touchstart', 'touchend', 'click', 'pointerdown'];
  const handleFirstInteraction = () => {
    unlockMobileAudio();
    interactionEvents.forEach(evt => window.removeEventListener(evt, handleFirstInteraction, true));
  };

  interactionEvents.forEach(evt => {
    window.addEventListener(evt, handleFirstInteraction, { capture: true, passive: true });
  });
}

/**
 * Plays the user's official transition sound effect for Vardhan Media
 * Guarantees zero latency, prevents overlapping echoes, and works on mobile & desktop.
 */
export function playTransitionSound() {
  if (isMuted || typeof window === 'undefined') return;

  const nowMs = Date.now();
  // Prevent duplicate triggering within 140ms
  if (nowMs - lastPlayTimestamp < 140) {
    return;
  }
  lastPlayTimestamp = nowMs;

  // Stop any previous instance to avoid conflicts and duplicate sound
  stopCurrentPlayback();

  const ctx = getAudioContext();

  // Try Web Audio API first if buffer is ready (0ms latency, best performance)
  if (ctx && audioBuffer) {
    try {
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const source = ctx.createBufferSource();
      const gainNode = ctx.createGain();

      source.buffer = audioBuffer;
      gainNode.gain.setValueAtTime(0.9, ctx.currentTime);

      source.connect(gainNode);
      gainNode.connect(ctx.destination);

      currentSourceNode = source;
      source.onended = () => {
        if (currentSourceNode === source) {
          currentSourceNode = null;
        }
      };

      source.start(0);
      hasInitialSoundPlayed = true;
      return;
    } catch (err) {
      console.warn('Web Audio buffer playback failed, falling back to HTML5 Audio:', err);
    }
  }

  // Fallback: HTML5 Audio element
  try {
    const htmlAudio = getHtmlAudioElement();
    if (htmlAudio) {
      htmlAudio.currentTime = 0;
      const playPromise = htmlAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            hasInitialSoundPlayed = true;
          })
          .catch((err) => {
            console.warn('Playback waiting for user gesture on mobile:', err);
          });
      }
    }
  } catch (err) {
    console.warn('Audio playback error:', err);
  }
}
