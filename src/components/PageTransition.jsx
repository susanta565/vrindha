import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, Volume2, VolumeX } from 'lucide-react';
import { playTransitionSound, isSoundMuted, toggleSound } from '../utils/soundEffects';

export default function PageTransition() {
  const location = useLocation();
  const [phase, setPhase] = useState('idle'); // 'idle' | 'enter' | 'active' | 'exit'
  const [muted, setMuted] = useState(isSoundMuted());
  const [pageName, setPageName] = useState('Vardhan Media');
  const isFirstRender = useRef(true);

  // Map route to clean label
  const getPageTitle = (path) => {
    switch (path) {
      case '/': return 'Home';
      case '/services': return 'Our Services';
      case '/about': return 'About Us';
      case '/work': return 'Our Work & Portfolio';
      case '/election-campaign': return 'Political & Election Campaign';
      case '/contact': return 'Contact Us';
      default: return 'Vardhan Media';
    }
  };

  const triggerTransition = (targetPath) => {
    setPageName(getPageTitle(targetPath));
    setPhase('enter');

    // Play cinematic agency transition sound effect
    playTransitionSound();

    // Move to active phase
    const timer1 = setTimeout(() => {
      setPhase('active');
    }, 50);

    // Start exit transition
    const timer2 = setTimeout(() => {
      setPhase('exit');
    }, 620);

    // Fully complete and hide
    const timer3 = setTimeout(() => {
      setPhase('idle');
    }, 880);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  useEffect(() => {
    // Trigger transition on initial load and on every page change
    const cleanup = triggerTransition(location.pathname);
    return () => cleanup && cleanup();
  }, [location.pathname]);

  const handleToggleSound = (e) => {
    e.stopPropagation();
    const newMuted = toggleSound();
    setMuted(newMuted);
    if (!newMuted) {
      playTransitionSound();
    }
  };

  if (phase === 'idle') return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070514] transition-all duration-300 ease-out select-none ${
        phase === 'enter'
          ? 'opacity-0 scale-98'
          : phase === 'active'
          ? 'opacity-100 scale-100'
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Main Brand Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-xl mx-auto space-y-6">
        
        {/* Official Logo Emblem */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-purple-600 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition-opacity animate-pulse" />
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#09061c] border border-white/20 p-2 flex items-center justify-center shadow-2xl">
            <img
              src="/logo-official.jpg"
              alt="Vardhan Media"
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
        </div>

        {/* Brand Name "VARDHAN MEDIA" */}
        <div className="space-y-2">
          <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl tracking-[0.22em] text-white uppercase drop-shadow-[0_0_35px_rgba(245,158,11,0.35)]">
            VARDHAN <span className="bg-gradient-to-r from-amber-400 via-rose-300 to-amber-200 bg-clip-text text-transparent">MEDIA</span>
          </h1>

          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-amber-400/95">
            Digital Growth • Powerful Branding • Real Business Results
          </p>
        </div>

        {/* Dynamic Route Indicator */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <span>Opening {pageName}...</span>
        </div>

        {/* Sleek Animated Progress Bar */}
        <div className="w-48 sm:w-64 h-1 rounded-full bg-white/10 overflow-hidden relative">
          <div className="h-full w-full bg-gradient-to-r from-amber-400 via-purple-500 to-amber-300 rounded-full animate-progress" />
        </div>
      </div>

      {/* Sound Indicator / Toggle Pill */}
      <button
        onClick={handleToggleSound}
        className="absolute bottom-6 right-6 z-20 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-slate-300 hover:text-white transition-all cursor-pointer shadow-lg"
        title={muted ? 'Click to Unmute Sound' : 'Click to Mute Sound'}
      >
        {muted ? (
          <>
            <VolumeX className="w-3.5 h-3.5 text-rose-400" />
            <span>Sound: OFF</span>
          </>
        ) : (
          <>
            <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Sound: ON</span>
          </>
        )}
      </button>
    </div>
  );
}
