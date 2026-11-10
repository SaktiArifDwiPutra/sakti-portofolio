'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { Compass } from 'lucide-react';
import { DeveloperWorldMiniature } from './DeveloperWorldMiniature';

interface SpecSheetFlipCardProps {
  name: string;
  specHeading: string;
  specNameLabel: string;
  specFocusLabel: string;
  specFocusVal: string;
  specLanguagesLabel: string;
  specLanguagesVal: string;
  specInterestsLabel: string;
  specInterestsVal: string;
  locale: string;
}

export function SpecSheetFlipCard({
  name,
  specHeading,
  specNameLabel,
  specFocusLabel,
  specFocusVal,
  specLanguagesLabel,
  specLanguagesVal,
  specInterestsLabel,
  specInterestsVal,
  locale,
}: SpecSheetFlipCardProps) {
  const isId = locale === 'id';
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.4 });

  const [isFlipped, setIsFlipped] = useState(false);
  const [hasTeased, setHasTeased] = useState(false);
  const [isTeasing, setIsTeasing] = useState(false);

  // Desktop Pointer Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, isHovered: false });

  // One-time scroll peek teaser for mobile & desktop (memicu rasa penasaran secara visual tanpa teks instruksi)
  useEffect(() => {
    if (isInView && !hasTeased && !shouldReduceMotion && !isFlipped) {
      setHasTeased(true);
      const timer = setTimeout(() => {
        setIsTeasing(true);
        setTimeout(() => setIsTeasing(false), 900);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasTeased, shouldReduceMotion, isFlipped]);

  // Handle Mouse Tilt on Desktop
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isFlipped || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = (x / rect.width) * 2 - 1;
      const normY = (y / rect.height) * 2 - 1;

      setTilt({
        x: -normY * 4,
        y: normX * 5,
        glareX: (x / rect.width) * 100,
        glareY: (y / rect.height) * 100,
        isHovered: true,
      });
    },
    [isFlipped]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt((prev) => ({ ...prev, x: 0, y: 0, isHovered: false }));
  }, []);

  // Keyboard accessibility
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      }
    },
    []
  );

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      role="button"
      aria-expanded={isFlipped}
      aria-label={isId ? 'Balik kartu spesifikasi developer' : 'Flip developer specification card'}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative [perspective:1200px] w-full select-none outline-none group cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400/80 rounded-3xl"
      style={{ minHeight: '440px' }}
    >
      {/* Visual Cue: Stacked Layer Underneath (Petunjuk visual kartu berlapis tanpa teks) */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 rounded-3xl transition-transform duration-300 pointer-events-none -z-10 translate-x-1.5 translate-y-1.5 sm:translate-x-2 sm:translate-y-2 border ${
          isFlipped
            ? 'border-amber-500/25 bg-amber-950/20 shadow-amber-900/10'
            : 'border-white/[0.06] bg-white/[0.02] shadow-black/40'
        } shadow-xl group-hover:translate-x-2.5 group-hover:translate-y-2.5`}
      />

      {/* Tilt Wrapper (Desktop Hover Response) */}
      <motion.div
        animate={
          isTeasing
            ? { rotateY: [0, 18, 0], z: [0, 14, 0] }
            : shouldReduceMotion
            ? { rotateX: 0, rotateY: 0 }
            : {
                rotateX: isFlipped ? 0 : tilt.x,
                rotateY: isFlipped ? 0 : tilt.y,
              }
        }
        transition={
          isTeasing
            ? { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
            : { duration: 0.15, ease: 'easeOut' }
        }
        whileTap={{ scale: 0.985 }}
        className="w-full h-full [transform-style:preserve-3d]"
      >
        {/* Flip 3D Core Layer */}
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
          className="relative w-full h-full [transform-style:preserve-3d]"
        >
          {/* FRONT FACE: 03 // Developer Specification Sheet */}
          <div
            onClick={() => setIsFlipped(true)}
            className={`relative p-6 sm:p-8 rounded-3xl theme-card border border-white/[0.08] hover:border-[var(--accent-primary)]/50 shadow-2xl transition-all duration-300 select-none [backface-visibility:hidden] flex flex-col justify-between ${
              isFlipped ? 'pointer-events-none' : 'pointer-events-auto'
            }`}
          >
            {/* Mobile Visual Cue: Tactile Folded Corner Peel (Dog-Ear Tab di Pojok Kanan-Atas) */}
            <div
              aria-hidden="true"
              className="absolute top-0 right-0 w-9 h-9 pointer-events-none z-20 overflow-hidden rounded-tr-3xl"
            >
              <div className="absolute top-0 right-0 w-8 h-8 -translate-y-2 translate-x-2 rotate-45 border border-amber-400/60 bg-amber-500/20 shadow-lg shadow-amber-500/20 transition-all duration-300 group-hover:scale-110" />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
            </div>

            {/* Dynamic Glare Highlight on Front Face */}
            {tilt.isHovered && !isFlipped && !shouldReduceMotion && (
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none rounded-3xl z-20 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle 320px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.06), transparent 70%)`,
                }}
              />
            )}

            {/* Section Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-mono text-xs text-[var(--accent-primary)] tracking-widest font-semibold block">
                    03 // IDENTITY &amp; TELEMETRY
                  </span>
                  <h3 className="font-display font-bold text-xl text-[var(--text-primary)]">
                    {specHeading}
                  </h3>
                </div>
              </div>
            </div>

            {/* Specification Data Rows */}
            <div className="space-y-3 font-mono text-xs divide-y divide-white/[0.06] my-4">
              <div className="py-3 flex justify-between gap-2">
                <span className="text-[var(--text-muted)]">{specNameLabel}</span>
                <span className="font-bold text-[var(--text-primary)]">{name}</span>
              </div>
              <div className="py-3 flex justify-between gap-2">
                <span className="text-[var(--text-muted)]">{specFocusLabel}</span>
                <span className="text-[var(--text-primary)] text-right font-medium">{specFocusVal}</span>
              </div>
              <div className="py-3 flex justify-between gap-2">
                <span className="text-[var(--text-muted)]">{specLanguagesLabel}</span>
                <span className="text-[var(--text-primary)] text-right">{specLanguagesVal}</span>
              </div>
              <div className="py-3 flex flex-col gap-1.5">
                <span className="text-[var(--text-muted)]">{specInterestsLabel}</span>
                <span className="text-[var(--text-primary)] leading-relaxed">{specInterestsVal}</span>
              </div>
            </div>

            {/* Bottom Telemetry Footer - Bersih & Rapi tanpa Teks Instruksi */}
            <div className="mt-2 pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)]">
              <span>SPEC_SHEET // VALID</span>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80 animate-pulse" />
            </div>
          </div>

          {/* BACK FACE: "A Tiny World, After Hours" Pixel Art Micro-Environment */}
          <div
            onClick={() => setIsFlipped(false)}
            className={`absolute inset-0 p-5 sm:p-6 rounded-3xl theme-card border border-amber-500/30 bg-[#12131a] shadow-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between cursor-pointer ${
              !isFlipped ? 'pointer-events-none' : 'pointer-events-auto'
            }`}
          >
            <DeveloperWorldMiniature
              locale={locale}
              isFlipped={isFlipped}
              onFlipBack={() => setIsFlipped(false)}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
