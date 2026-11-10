'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShieldCheck, Zap, Sparkles, Terminal, Code2 } from 'lucide-react';

interface PrincipleItem {
  code: string;
  title: string;
  body: string;
}

interface InteractivePhilosophyCardProps {
  principle: PrincipleItem;
  locale: string;
}

export function InteractivePhilosophyCard({ principle, locale }: InteractivePhilosophyCardProps) {
  const isId = locale === 'id';
  const [activeDemo, setActiveDemo] = useState(false);

  const getInteractiveContent = () => {
    if (principle.code === 'ARC-01') {
      return (
        <div className="mt-4 pt-3 border-t border-white/[0.08] text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveDemo((prev) => !prev)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 transition-all cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" />
              <span>{activeDemo ? (isId ? 'Tutup Tes' : 'Close Test') : (isId ? 'Tes Latensi API' : 'Simulate API Route')}</span>
            </span>
            <span className="text-[10px] uppercase font-bold text-emerald-400">200 OK</span>
          </button>

          <AnimatePresence>
            {activeDemo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2.5 p-3 rounded-xl bg-black/60 border border-white/10 text-[11px] text-neutral-300 space-y-1 overflow-hidden"
              >
                <div className="flex justify-between text-[10px] text-neutral-400">
                  <span>POST /api/v1/auth/verify</span>
                  <span className="text-emerald-400 font-bold">14ms latency</span>
                </div>
                <p className="text-[10px] text-cyan-300">
                  &gt; JWT Session Verified · Row Level Security Passed · PostgreSQL Neon Connected
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    if (principle.code === 'CRAFT-02') {
      return (
        <div className="mt-4 pt-3 border-t border-white/[0.08] text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveDemo((prev) => !prev)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 transition-all cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <Code2 className="h-3.5 w-3.5" />
              <span>{activeDemo ? (isId ? 'Sembunyikan Kontrak Tipe' : 'Hide Type Contract') : (isId ? 'Buka Kontrak Tipe' : 'Inspect Type Contract')}</span>
            </span>
            <span className="text-[10px] uppercase font-bold text-purple-400">TypeScript</span>
          </button>

          <AnimatePresence>
            {activeDemo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2.5 p-3 rounded-xl bg-black/60 border border-white/10 text-[11px] font-mono text-neutral-300 space-y-1 overflow-hidden"
              >
                <p className="text-[10px] text-purple-300">
                  interface CandidateVote &#123; id: UUID; voterHash: SHA256; timestamp: ISO; valid: boolean; &#125;
                </p>
                <p className="text-[10px] text-neutral-400">
                  Strict domain enforcement prevents runtime undefined errors across Pilketos &amp; CritiPlay.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    // AESTH-03
    return (
      <div className="mt-4 pt-3 border-t border-white/[0.08] text-xs font-mono">
        <button
          type="button"
          onClick={() => setActiveDemo((prev) => !prev)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 transition-all cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{activeDemo ? (isId ? 'Tutup Game Loop' : 'Close Game Loop') : (isId ? 'Jalankan Game Loop 60FPS' : 'Run 60FPS Loop')}</span>
          </span>
          <span className="text-[10px] uppercase font-bold text-amber-400">Phaser 3</span>
        </button>

        <AnimatePresence>
          {activeDemo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2.5 p-3 rounded-xl bg-black/60 border border-white/10 text-[11px] font-mono text-neutral-300 space-y-1 overflow-hidden"
            >
              <div className="flex justify-between text-[10px] text-neutral-400">
                <span>update(time, delta)</span>
                <span className="text-amber-400 font-bold">60.0 FPS</span>
              </div>
              <p className="text-[10px] text-amber-300">
                &gt; SceneTree tick: Canvas 2D sprites choreographed with tactile feedback in Daus Anak Soleh.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl theme-card border border-white/[0.08] hover:border-[var(--accent-primary)]/40 transition-all flex flex-col justify-between shadow-lg group">
      <div>
        <span className="font-mono text-xs text-[var(--accent-primary)] font-bold block mb-2">
          {principle.code}
        </span>
        <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent-primary)] transition-colors">
          {principle.title}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {principle.body}
        </p>
      </div>

      {/* Interactive Micro-Widget */}
      {getInteractiveContent()}
    </div>
  );
}
