'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Monitor,
  Gamepad2,
  Layers,
  Cpu,
  Code2,
  Zap,
} from 'lucide-react';

interface ProfileHoloCardProps {
  name: string;
  focus: string;
  locale: string;
}

/**
 * =======================================================================
 * FOTO PROFIL SAKTI (PROFILE PHOTO CONFIGURATION)
 * =======================================================================
 * Untuk mengganti foto dengan foto asli Anda, cukup simpan foto Anda di:
 * public/images/profile/nama-foto-anda.jpg (atau .png)
 * lalu ubah nilai konstanta PROFILE_PHOTO_SRC di bawah ini:
 */
export const PROFILE_PHOTO_SRC = '/images/profile/sakti-pilot.svg';
// =======================================================================

export function ProfileHoloCard({ name, focus, locale }: ProfileHoloCardProps) {
  const isId = locale === 'id';
  const [viewMode, setViewMode] = useState<'photo' | 'station'>('photo');
  const [isGlitching, setIsGlitching] = useState(false);

  const handleCardClick = () => {
    setIsGlitching(true);
    setTimeout(() => {
      setViewMode((prev) => (prev === 'photo' ? 'station' : 'photo'));
    }, 120);

    setTimeout(() => {
      setIsGlitching(false);
    }, 380);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group relative rounded-3xl theme-card border p-6 sm:p-8 shadow-2xl transition-all duration-300 cursor-pointer select-none overflow-hidden ${
        isGlitching
          ? 'border-cyan-400 shadow-[0_0_40px_rgba(0,240,255,0.4)] ring-2 ring-cyan-400/50'
          : 'border-white/[0.08] hover:border-[var(--accent-primary)]/60 hover:shadow-[var(--accent-primary)]/10'
      }`}
      title={isId ? 'Klik kartu untuk beralih tampilan (Glitch Swap)' : 'Click card to toggle view (Glitch Swap)'}
    >
      {/* Glitch Overlay Effect during swap */}
      {isGlitching && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 z-40 pointer-events-none bg-cyan-500/10 mix-blend-screen animate-pulse"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 z-40 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,240,255,0.2)_3px,transparent_4px)]"
          />
        </>
      )}

      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs font-bold text-emerald-400 tracking-wider">
            STATUS // ONLINE
          </span>
        </div>

        {/* Glitch Hint Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono text-[var(--accent-primary)] group-hover:bg-[var(--accent-primary)]/10 transition-colors">
          <Zap className="h-3 w-3 animate-bounce" />
          <span>{isId ? 'KLIK KARTU (GLITCH SWAP)' : 'CLICK CARD (GLITCH SWAP)'}</span>
        </div>
      </div>

      {/* Main Interactive Screen Frame */}
      <motion.div
        animate={
          isGlitching
            ? {
                x: [-6, 6, -3, 3, 0],
                skewX: [-4, 5, -2, 0],
                filter: [
                  'drop-shadow(3px 0 #00f0ff) drop-shadow(-3px 0 #ff0055) hue-rotate(90deg)',
                  'drop-shadow(-3px 0 #00f0ff) drop-shadow(3px 0 #ff0055) hue-rotate(-90deg)',
                  'none',
                ],
              }
            : { x: 0, skewX: 0, filter: 'none' }
        }
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="mt-6"
      >
        {viewMode === 'photo' ? (
          /* Mode 1: Cyberpunk Holographic Photo Frame */
          <div className="space-y-5">
            {/* Photo Viewport with Corner Brackets */}
            <div className="relative aspect-[4/5] w-full max-w-[320px] mx-auto rounded-2xl overflow-hidden border-2 border-[var(--accent-primary)]/40 bg-[var(--bg-canvas)] shadow-[0_0_35px_rgba(0,240,255,0.15)] group/img">
              {/* Photo Element */}
              <Image
                src={PROFILE_PHOTO_SRC}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover object-center transition-transform duration-700 group-hover/img:scale-105 pointer-events-none"
                priority
              />

              {/* Subtle Scanlines & Cyber Overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none"
              />

              {/* Cyberpunk Glowing Corner Accents */}
              <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[var(--accent-primary)]" />
              <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[var(--accent-primary)]" />
              <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[var(--accent-primary)]" />
              <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[var(--accent-primary)]" />

              {/* Floating Pilot Tag */}
              <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-[11px] font-mono text-white/90 backdrop-blur-md bg-black/60 px-3 py-1.5 rounded-lg border border-white/10 shadow-lg">
                <span className="font-bold text-[var(--accent-primary)]">PILOT // SAKTI</span>
                <span className="text-emerald-400">EXP // 3+ YRS</span>
              </div>
            </div>

            {/* Identity Details */}
            <div className="text-center space-y-1">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)]">
                {name}
              </h3>
              <p className="font-mono text-xs text-[var(--accent-primary)] font-semibold">
                {focus}
              </p>
            </div>
          </div>
        ) : (
          /* Mode 2: Battle Station & Daily Tech Setup Breakdown */
          <div className="space-y-4">
            <div className="text-left pb-2 border-b border-white/[0.06]">
              <span className="font-mono text-[10px] uppercase text-[var(--accent-primary)] font-bold tracking-wider">
                ENGINEERING WORKSTATION &amp; TOOLKIT
              </span>
              <h4 className="font-display font-bold text-lg text-white mt-0.5">
                {isId ? 'Lingkungan Pengembangan' : 'Daily Development Rig'}
              </h4>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              {/* Hardware & OS */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
                <Monitor className="h-5 w-5 text-cyan-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] block uppercase">Operating Environment</span>
                  <span className="text-white font-semibold">Windows 11 &amp; Arch WSL Dual Stack</span>
                </div>
              </div>

              {/* Code Editor */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
                <Code2 className="h-5 w-5 text-blue-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] block uppercase">Core Code Editor</span>
                  <span className="text-white font-semibold">VS Code (Cyberpunk Theme &amp; Strict TS)</span>
                </div>
              </div>

              {/* Game Engines */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
                <Gamepad2 className="h-5 w-5 text-amber-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] block uppercase">Game Engines</span>
                  <span className="text-white font-semibold">Phaser (HTML5 Canvas) &amp; Godot 4</span>
                </div>
              </div>

              {/* Databases */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
                <Layers className="h-5 w-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] block uppercase">Persistence &amp; Cloud DB</span>
                  <span className="text-white font-semibold">PostgreSQL, Neon Cloud, Supabase, SQLite</span>
                </div>
              </div>

              {/* Backend Standard */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
                <Cpu className="h-5 w-5 text-purple-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] block uppercase">API Frameworks</span>
                  <span className="text-white font-semibold">Laravel REST API, Hono.js, Node.js</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
