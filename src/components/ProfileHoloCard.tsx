'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  ShieldAlert,
  Terminal,
  Sparkles,
  Lock,
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
 * Foto normal:
 * public/images/profile/sakti-pilot.png
 * 
 * Foto hacker misterius:
 * public/images/profile/sakti-hacker.jpg
 */
export const PROFILE_PHOTO_SRC = '/images/profile/sakti-pilot.png';
export const HACKER_PHOTO_SRC = '/images/profile/sakti-joker.jpg';
// =======================================================================

// Array kubus piksel warna-warni yang muncul saat glitch animasi swap
const PIXEL_CUBES = [
  { top: '8%', left: '12%', size: 18, color: '#00f0ff' },
  { top: '12%', left: '38%', size: 24, color: '#ff0055' },
  { top: '15%', left: '72%', size: 14, color: '#00ff66' },
  { top: '22%', left: '20%', size: 20, color: '#ffea00' },
  { top: '25%', left: '82%', size: 26, color: '#9d00ff' },
  { top: '32%', left: '10%', size: 16, color: '#00f0ff' },
  { top: '36%', left: '52%', size: 30, color: '#ff0055' },
  { top: '42%', left: '28%', size: 22, color: '#00ff66' },
  { top: '48%', left: '75%', size: 24, color: '#ffea00' },
  { top: '54%', left: '42%', size: 18, color: '#ffffff' },
  { top: '60%', left: '15%', size: 28, color: '#9d00ff' },
  { top: '65%', left: '68%', size: 20, color: '#00f0ff' },
  { top: '70%', left: '85%', size: 22, color: '#ff0055' },
  { top: '75%', left: '30%', size: 26, color: '#00ff66' },
  { top: '80%', left: '55%', size: 24, color: '#ffea00' },
  { top: '85%', left: '18%', size: 16, color: '#00f0ff' },
  { top: '88%', left: '78%', size: 28, color: '#9d00ff' },
  { top: '92%', left: '40%', size: 20, color: '#ff0055' },
  { top: '18%', left: '58%', size: 14, color: '#00ff66' },
  { top: '62%', left: '88%', size: 18, color: '#00f0ff' },
  { top: '45%', left: '8%', size: 22, color: '#ff0055' },
  { top: '78%', left: '5%', size: 16, color: '#ffea00' },
];

export function ProfileHoloCard({ name, focus, locale }: ProfileHoloCardProps) {
  const isId = locale === 'id';
  const [viewMode, setViewMode] = useState<'pilot' | 'hacker'>('pilot');
  const [isGlitching, setIsGlitching] = useState(false);

  const handleCardClick = () => {
    if (isGlitching) return;
    setIsGlitching(true);

    // Ganti foto tepat di tengah-tengah glitch (180ms)
    setTimeout(() => {
      setViewMode((prev) => (prev === 'pilot' ? 'hacker' : 'pilot'));
    }, 180);

    // Selesaikan efek glitch dan kembali normal total (420ms)
    setTimeout(() => {
      setIsGlitching(false);
    }, 420);
  };

  const isHacker = viewMode === 'hacker';

  return (
    <div
      onClick={handleCardClick}
      className={`group relative rounded-3xl theme-card border p-6 sm:p-8 shadow-2xl transition-all duration-300 cursor-pointer select-none overflow-hidden ${
        isHacker
          ? 'border-purple-500/40 hover:border-purple-400/80 hover:shadow-purple-500/10'
          : 'border-white/[0.08] hover:border-[var(--accent-primary)]/60 hover:shadow-[var(--accent-primary)]/10'
      }`}
      title={isId ? 'Klik kartu untuk beralih persona' : 'Click card to toggle alter-ego'}
    >
      {/* GLITCH ANIMATION OVERLAY: HANYA AKTIF SAAT ISGLITCHING === TRUE */}
      <AnimatePresence>
        {isGlitching && (
          <div aria-hidden="true" className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
            {/* 1. Flash latar belakang pixel noise */}
            <div className="absolute inset-0 bg-cyan-500/15 mix-blend-screen" />
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(255,0,85,0.25)_4px,transparent_6px)]" />

            {/* 2. Kubus-kubus piksel warna-warni (Pixel Blocks / Cubes) */}
            {PIXEL_CUBES.map((cube, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.4, 1, 0],
                  opacity: [0, 1, 0.9, 0],
                  x: [0, (idx % 2 === 0 ? 8 : -8), 0],
                  y: [0, (idx % 3 === 0 ? -6 : 6), 0],
                }}
                transition={{
                  duration: 0.38,
                  delay: (idx % 6) * 0.025,
                  ease: 'easeInOut',
                }}
                style={{
                  position: 'absolute',
                  top: cube.top,
                  left: cube.left,
                  width: `${cube.size}px`,
                  height: `${cube.size}px`,
                  backgroundColor: cube.color,
                  boxShadow: `0 0 12px ${cube.color}`,
                  imageRendering: 'pixelated',
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Top Telemetry Header - Benar-benar Normal dan Bersih saat Tidak Animasi */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              isHacker ? 'bg-purple-400 shadow-[0_0_8px_#a855f7]' : 'bg-emerald-400'
            }`}
          />
          <span
            className={`font-mono text-xs font-bold tracking-wider ${
              isHacker ? 'text-purple-300' : 'text-emerald-400'
            }`}
          >
            {isHacker ? 'STATUS // CIPHER PROTOCOL' : 'STATUS // ONLINE'}
          </span>
        </div>

        {/* Persona Switch Hint Badge */}
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono transition-colors ${
            isHacker
              ? 'bg-purple-500/10 border-purple-500/30 text-purple-300'
              : 'bg-white/[0.04] border-white/10 text-[var(--accent-primary)] group-hover:bg-[var(--accent-primary)]/10'
          }`}
        >
          {isHacker ? (
            <>
              <Terminal className="h-3 w-3 text-purple-400" />
              <span>{isId ? 'KLIK KARTU (KEMBALI KE PROFIL)' : 'CLICK CARD (REVEAL PROFILE)'}</span>
            </>
          ) : (
            <>
              <Zap className="h-3 w-3 text-[var(--accent-primary)]" />
              <span>{isId ? 'KLIK KARTU (GLITCH SWAP)' : 'CLICK CARD (GLITCH SWAP)'}</span>
            </>
          )}
        </div>
      </div>

      {/* Main Screen Frame */}
      <motion.div
        animate={
          isGlitching
            ? {
                x: [-4, 5, -2, 3, 0],
                skewX: [-2, 3, -1, 0],
              }
            : { x: 0, skewX: 0 }
        }
        transition={{ duration: 0.35 }}
        className="mt-6 space-y-5"
      >
        {/* Photo Viewport with Cyber Brackets */}
        <div
          className={`relative aspect-[4/5] w-full max-w-[320px] mx-auto rounded-2xl overflow-hidden border-2 bg-[var(--bg-canvas)] shadow-2xl transition-all duration-300 group/img ${
            isHacker
              ? 'border-purple-500/60 shadow-[0_0_35px_rgba(168,85,247,0.25)]'
              : 'border-[var(--accent-primary)]/40 shadow-[0_0_35px_rgba(0,240,255,0.15)]'
          }`}
        >
          {/* Photo Render */}
          <div
            className={`relative w-full h-full transition-transform duration-700 group-hover/img:scale-105 ${
              isGlitching ? 'image-pixelated' : ''
            }`}
          >
            <Image
              src={isHacker ? HACKER_PHOTO_SRC : PROFILE_PHOTO_SRC}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover object-center pointer-events-none"
              priority
            />
          </div>

          {/* Vignette Overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none"
          />

          {/* Corner Cyber Brackets */}
          <span
            className={`absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 ${
              isHacker ? 'border-purple-400' : 'border-[var(--accent-primary)]'
            }`}
          />
          <span
            className={`absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 ${
              isHacker ? 'border-purple-400' : 'border-[var(--accent-primary)]'
            }`}
          />
          <span
            className={`absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 ${
              isHacker ? 'border-purple-400' : 'border-[var(--accent-primary)]'
            }`}
          />
          <span
            className={`absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 ${
              isHacker ? 'border-purple-400' : 'border-[var(--accent-primary)]'
            }`}
          />

          {/* Persona Floating Tag */}
          <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-[11px] font-mono text-white/90 backdrop-blur-md bg-black/70 px-3 py-1.5 rounded-lg border border-white/10 shadow-lg">
            {isHacker ? (
              <>
                <span className="font-bold text-purple-300 flex items-center gap-1">
                  <Lock className="h-3 w-3 text-purple-400" />
                  <span>ALTER EGO // SHADOW</span>
                </span>
                <span className="text-cyan-400">CLEARANCE // ROOT</span>
              </>
            ) : (
              <>
                <span className="font-bold text-[var(--accent-primary)]">PILOT // SAKTI</span>
                <span className="text-emerald-400">EXP // 3+ YRS</span>
              </>
            )}
          </div>
        </div>

        {/* Identity Details - Selalu Bersih, Tajam, & Rapi */}
        <div className="text-center space-y-1">
          <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)]">
            {name}
          </h3>
          <p
            className={`font-mono text-xs font-semibold ${
              isHacker ? 'text-purple-400' : 'text-[var(--accent-primary)]'
            }`}
          >
            {isHacker
              ? isId
                ? 'Arsitek Sistem Otonom & Game Engine'
                : 'Autonomous Systems & Game Engine Architect'
              : focus}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
