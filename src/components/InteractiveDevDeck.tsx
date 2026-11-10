'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Sparkles, Zap, BatteryCharging, Radio } from 'lucide-react';

export function InteractiveDevDeck() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [comboCount, setComboCount] = useState(0);
  const [screenText, setScreenText] = useState('LVL 99 DEV');
  const [isPowered, setIsPowered] = useState(true);
  const [activeLed, setActiveLed] = useState(false);
  const [canDrag, setCanDrag] = useState(false);

  useEffect(() => {
    const checkPointer = () => {
      // Strictly enable dragging only on desktop devices with fine pointer (mouse/trackpad)
      // Never enable drag on touch screens or mobile to prevent scroll hijacking and jitter
      const isFinePointer = window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches;
      setCanDrag(isFinePointer);
    };
    checkPointer();
    window.addEventListener('resize', checkPointer);
    return () => window.removeEventListener('resize', checkPointer);
  }, []);

  const handleButtonPress = (action: string) => {
    setActiveLed(true);
    setTimeout(() => setActiveLed(false), 200);

    if (action === 'A') {
      const phrases = ['CRIT HIT! +150 XP', 'REACT HOOK LOADED', 'GODOT NODE READY', 'SQL QUERY OPTIMIZED', 'Odoo ERP SYNCED'];
      const nextText = phrases[comboCount % phrases.length];
      setScreenText(nextText);
      setComboCount((prev) => prev + 1);
    } else if (action === 'B') {
      setScreenText('DODGE! FPS 120');
      setComboCount((prev) => prev + 1);
    } else if (action === 'TURBO') {
      setScreenText('TURBO COMPILATION!');
      setComboCount((prev) => prev + 5);
    }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto" ref={constraintsRef}>
      {/* Micro-Deck Container (Drag enabled strictly on desktop mouse, tap-safe on mobile) */}
      <motion.div
        drag={canDrag}
        dragConstraints={canDrag ? constraintsRef : false}
        dragElastic={canDrag ? 0.12 : false}
        whileHover={canDrag ? { scale: 1.02 } : undefined}
        whileDrag={canDrag ? { scale: 1.05, cursor: 'grabbing', zIndex: 40 } : undefined}
        className={`select-none rounded-[28px] p-5 theme-card shadow-2xl relative overflow-hidden backdrop-blur-xl touch-manipulation ${
          canDrag ? 'cursor-grab' : 'cursor-default'
        }`}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
          touchAction: canDrag ? 'none' : 'pan-y',
        }}
      >
        {/* Top Status & Speaker Grill */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-hairline)] mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                isPowered
                  ? activeLed
                    ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]'
                    : 'bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)]'
                  : 'bg-neutral-600'
              }`}
            />
            <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider">
              {isPowered ? 'DECK ACTIVE' : 'STANDBY'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--accent-primary)]">
            <BatteryCharging className="h-3.5 w-3.5" />
            <span>100%</span>
          </div>
        </div>

        {/* Cyber Display Screen with Sakti's Avatar */}
        <div className="rounded-2xl p-3.5 bg-neutral-900 border border-neutral-800 shadow-inner space-y-3">
          <div className="flex items-center gap-3">
            {/* Avatar Photo Frame */}
            <div className="relative h-14 w-14 rounded-xl overflow-hidden border border-[var(--accent-primary)]/40 bg-neutral-950 shrink-0 flex items-center justify-center shadow-md">
              <div className="w-full h-full bg-gradient-to-tr from-neutral-800 to-neutral-700 flex flex-col items-center justify-center text-center p-1">
                <svg className="w-8 h-8 text-[var(--accent-primary)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a5 5 0 105 5 5 5 0 00-5-5zm0 8a3 3 0 113-3 3 3 0 01-3 3zm9 11v-1a7 7 0 00-7-7h-4a7 7 0 00-7 7v1h2v-1a5 5 0 015-5h4a5 5 0 015 5v1z" />
                </svg>
              </div>
              <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[8px] font-mono text-center text-[var(--accent-primary)] py-0.5">
                DEV PASS
              </span>
            </div>

            {/* Screen Readout */}
            <div className="flex-1 min-w-0 font-mono text-xs space-y-1">
              <div className="flex items-center justify-between text-[10px] text-neutral-400">
                <span>PILOT: SAKTI</span>
                <span className="text-[var(--accent-primary)]">COMBOS: {comboCount}</span>
              </div>
              <p className="text-white font-bold truncate text-[11px] bg-neutral-950 px-2 py-1 rounded border border-neutral-800 text-[var(--accent-primary)]">
                &gt; {screenText}
              </p>
              <div className="text-[9px] text-neutral-500 flex justify-between">
                <span>FULLSTACK // GODOT</span>
                <span>ONLINE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tactile Hardware Controls */}
        <div className="mt-4 pt-3 flex items-center justify-between gap-4">
          {/* D-Pad Simulation */}
          <div className="relative w-16 h-16 bg-neutral-900 rounded-full border border-neutral-800 p-1 flex items-center justify-center shadow-inner">
            <div className="w-12 h-12 relative flex items-center justify-center">
              <button
                type="button"
                onClick={() => handleButtonPress('TURBO')}
                className="absolute inset-x-0 h-4 bg-neutral-700 hover:bg-neutral-600 rounded active:scale-95 transition-transform touch-manipulation cursor-pointer"
                title="D-Pad Vertical"
              />
              <button
                type="button"
                onClick={() => handleButtonPress('TURBO')}
                className="absolute inset-y-0 w-4 bg-neutral-700 hover:bg-neutral-600 rounded active:scale-95 transition-transform touch-manipulation cursor-pointer"
                title="D-Pad Horizontal"
              />
              <div className="relative z-10 h-3 w-3 rounded-full bg-neutral-900 pointer-events-none" />
            </div>
          </div>

          {/* Action Buttons A & B */}
          <div className="flex items-center gap-2.5">
            <div className="text-center">
              <button
                type="button"
                onClick={() => handleButtonPress('B')}
                className="h-10 w-10 rounded-full bg-neutral-800 hover:bg-neutral-700 active:scale-90 text-[var(--accent-secondary)] border border-neutral-700 font-mono font-bold text-xs shadow-md transition-all flex items-center justify-center touch-manipulation cursor-pointer"
              >
                B
              </button>
              <span className="text-[9px] font-mono text-[var(--text-muted)] mt-0.5 block">DODGE</span>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => handleButtonPress('A')}
                className="h-10 w-10 rounded-full bg-[var(--accent-primary)] text-[var(--accent-primary-ink)] active:scale-90 font-mono font-bold text-xs shadow-md shadow-[var(--accent-primary)]/20 transition-all flex items-center justify-center touch-manipulation cursor-pointer"
              >
                A
              </button>
              <span className="text-[9px] font-mono text-[var(--text-muted)] mt-0.5 block">ACTION</span>
            </div>
          </div>
        </div>

        {/* Instruction Footer Pill */}
        <div className="mt-3 pt-2 border-t border-[var(--border-hairline)] flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
          <span className="flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-[var(--accent-primary)]" />
            <span>Hardware Deck</span>
          </span>
          <span className="opacity-75">
            {canDrag ? 'Drag deck around 🕹️' : 'Tap controls to play 🕹️'}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

