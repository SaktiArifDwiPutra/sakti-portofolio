'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative [perspective:1000px] w-full"
      style={{ minHeight: '440px' }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full h-full [transform-style:preserve-3d]"
      >
        {/* FRONT FACE: 03 // Developer Specification Sheet */}
        <div
          onClick={() => setIsFlipped(true)}
          className={`p-6 sm:p-8 rounded-3xl theme-card border border-white/[0.08] hover:border-[var(--accent-primary)]/50 shadow-2xl transition-all duration-300 cursor-pointer select-none [backface-visibility:hidden] flex flex-col justify-between ${
            isFlipped ? 'pointer-events-none' : 'pointer-events-auto'
          }`}
        >
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

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-[10px]">
              <span>MINI WORLD ☕</span>
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

          <div className="mt-2 pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)]">
            <span>SPEC_SHEET // VALID</span>
            <span className="text-amber-300 hover:underline">
              {isId ? 'Klik kartu untuk menjelajah dunia mini ☕' : 'Click card to explore mini world ☕'}
            </span>
          </div>
        </div>

        {/* BACK FACE: "A Tiny World, After Hours" Pixel Art Micro-Environment */}
        <div
          className={`absolute inset-0 p-5 sm:p-6 rounded-3xl theme-card border border-amber-500/30 bg-[#12131a] shadow-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between ${
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
    </div>
  );
}
