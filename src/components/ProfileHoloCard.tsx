'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { Lock } from 'lucide-react';

interface ProfileHoloCardProps {
  name: string;
  focus: string;
  locale: string;
}

export const PROFILE_PHOTO_SRC = '/images/profile/sakti-pilot.png';
export const HACKER_PHOTO_SRC = '/images/profile/sakti-hacker.jpg';

// Grid ukuran 8 kolom × 10 baris untuk transisi piksel diagonal (Bottom-Left ke Top-Right)
const GRID_COLS = 8;
const GRID_ROWS = 10;
const TOTAL_DIAG = GRID_COLS + GRID_ROWS - 2; // Nilai maksimum diagonal

interface DiagonalPixel {
  col: number;
  row: number;
  diagRatio: number; // 0.0 di pojok kiri bawah, 1.0 di pojok kanan atas
  color: string;
  size: number;
}

// Generate titik-titik kubus piksel dengan urutan diagonal dari kiri-bawah (0, ROWS-1) ke kanan-atas (COLS-1, 0)
const DIAGONAL_PIXELS: DiagonalPixel[] = [];
const PALETTE = ['#00f0ff', '#ff0055', '#a855f7', '#ffea00', '#00ff66', '#ffffff'];

for (let r = 0; r < GRID_ROWS; r++) {
  for (let c = 0; c < GRID_COLS; c++) {
    // Jarak diagonal dari kiri bawah:
    // Kiri-bawah adalah c = 0, r = GRID_ROWS - 1. Jarak = c + (GRID_ROWS - 1 - r).
    const diagDist = c + (GRID_ROWS - 1 - r);
    const diagRatio = diagDist / TOTAL_DIAG;
    const color = PALETTE[(c * 3 + r * 7) % PALETTE.length];
    DIAGONAL_PIXELS.push({
      col: c,
      row: r,
      diagRatio,
      color,
      size: (c + r) % 3 === 0 ? 22 : (c + r) % 2 === 0 ? 16 : 12,
    });
  }
}

export function ProfileHoloCard({ name, focus, locale }: ProfileHoloCardProps) {
  const isId = locale === 'id';
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.4 });

  const [viewMode, setViewMode] = useState<'pilot' | 'hacker'>('pilot');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasTeased, setHasTeased] = useState(false);
  const [isTeasing, setIsTeasing] = useState(false);

  // 3D Pointer Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, isHovered: false });

  // One-time mobile & desktop scroll peek teaser (tanpa teks instruksi, hanya gerakan visual rasa ingin tahu)
  useEffect(() => {
    if (isInView && !hasTeased && !shouldReduceMotion) {
      setHasTeased(true);
      const timer = setTimeout(() => {
        setIsTeasing(true);
        setTimeout(() => setIsTeasing(false), 850);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasTeased, shouldReduceMotion]);

  // Handle Mouse Tilt (Desktop tactile feedback)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1; // -1 to 1
    const normY = (y / rect.height) * 2 - 1; // -1 to 1

    setTilt({
      x: -normY * 4.5, // tiltX (derajat)
      y: normX * 5.5,  // tiltY (derajat)
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
      isHovered: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt((prev) => ({ ...prev, x: 0, y: 0, isHovered: false }));
  }, []);

  // Handle Card Click (Trigger bottom-left to top-right diagonal wave transformation)
  const toggleIdentity = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Ganti persona tepat saat gelombang diagonal mencapai separuh jalan (240ms)
    setTimeout(() => {
      setViewMode((prev) => (prev === 'pilot' ? 'hacker' : 'pilot'));
    }, 240);

    // Selesaikan efek gelombang (560ms)
    setTimeout(() => {
      setIsTransitioning(false);
    }, 560);
  }, [isTransitioning]);

  // Keyboard accessibility (Enter / Space)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleIdentity();
      }
    },
    [toggleIdentity]
  );

  const isHacker = viewMode === 'hacker';

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      role="button"
      aria-label={isId ? 'Beralih tampilan identitas Sakti' : "Toggle Sakti's alter-ego identity"}
      onClick={toggleIdentity}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative select-none outline-none group cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400/80 rounded-3xl"
    >
      {/* Visual Cue: Stacked Card Sub-Layer (Memberi petunjuk visual bahwa ada lapisan sisi lain tanpa instruksi teks) */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 rounded-3xl transition-transform duration-300 pointer-events-none -z-10 translate-x-1.5 translate-y-1.5 sm:translate-x-2 sm:translate-y-2 border ${
          isHacker
            ? 'border-purple-500/25 bg-purple-950/20 shadow-purple-900/10'
            : 'border-white/[0.06] bg-white/[0.02] shadow-black/40'
        } shadow-xl group-hover:translate-x-2.5 group-hover:translate-y-2.5`}
      />

      {/* Main Interactive Card Frame */}
      <motion.div
        animate={
          isTeasing
            ? { rotateY: [0, 16, 0], z: [0, 12, 0] }
            : shouldReduceMotion
            ? { rotateX: 0, rotateY: 0 }
            : {
                rotateX: tilt.x,
                rotateY: tilt.y,
              }
        }
        transition={
          isTeasing
            ? { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
            : { duration: 0.15, ease: 'easeOut' }
        }
        whileTap={{ scale: 0.985 }}
        className={`relative rounded-3xl theme-card border p-6 sm:p-7 shadow-2xl transition-colors duration-300 overflow-hidden ${
          isHacker
            ? 'border-purple-500/40 hover:border-purple-400/70 shadow-purple-950/20'
            : 'border-white/[0.08] hover:border-cyan-400/50 shadow-cyan-950/10'
        }`}
      >
        {/* Dynamic Glare Highlight (mengikuti kursor di desktop) */}
        {tilt.isHovered && !shouldReduceMotion && (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none rounded-3xl z-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 280px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.06), transparent 70%)`,
            }}
          />
        )}

        {/* DIAGONAL PIXEL WAVE OVERLAY: Bergerak dari Kiri-Bawah ke Kanan-Atas saat transisi */}
        {isTransitioning && (
          <div aria-hidden="true" className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
            {/* Sapuan cahaya diagonal */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 via-purple-500/20 to-transparent mix-blend-screen animate-pulse"
              style={{
                clipPath: 'polygon(0% 100%, 100% 0%, 100% 100%)',
              }}
            />

            {/* Partikel Kubus Piksel Berantai dari Kiri-Bawah ke Kanan-Atas */}
            {DIAGONAL_PIXELS.map((p, idx) => {
              // Delay berbanding lurus dengan jarak diagonalnya
              const startDelay = p.diagRatio * 0.28; // 0s di kiri bawah s/d 0.28s di kanan atas
              const leftPercent = (p.col / GRID_COLS) * 100 + 4;
              const topPercent = (p.row / GRID_ROWS) * 100 + 4;

              return (
                <motion.div
                  key={idx}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.35, 0.9, 0],
                    opacity: [0, 1, 0.85, 0],
                    x: [(p.col % 2 === 0 ? -4 : 4), 0],
                    y: [(p.row % 2 === 0 ? 4 : -4), 0],
                  }}
                  transition={{
                    duration: 0.32,
                    delay: startDelay,
                    ease: 'easeOut',
                  }}
                  style={{
                    position: 'absolute',
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    backgroundColor: p.color,
                    boxShadow: `0 0 10px ${p.color}`,
                    imageRendering: 'pixelated',
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Viewport Foto Portrait dengan Corner Cyber Brackets */}
        <div
          className={`relative aspect-[4/5] w-full max-w-[320px] mx-auto rounded-2xl overflow-hidden border-2 bg-[var(--bg-canvas)] shadow-2xl transition-all duration-500 ${
            isHacker
              ? 'border-purple-500/60 shadow-[0_0_35px_rgba(168,85,247,0.22)]'
              : 'border-cyan-400/40 shadow-[0_0_35px_rgba(0,240,255,0.12)]'
          }`}
        >
          {/* Dual Layer Photos: Sapuan Transisi Mulus Diagonal dari Kiri-Bawah ke Kanan-Atas */}
          <div className="relative w-full h-full">
            {/* Foto 1: Sakti Pilot (Normal) */}
            <div
              className={`absolute inset-0 transition-all duration-500 ${
                isHacker ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              <Image
                src={PROFILE_PHOTO_SRC}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover object-center pointer-events-none"
                priority
              />
            </div>

            {/* Foto 2: Sakti Hacker (Alter Ego) */}
            <div
              className={`absolute inset-0 transition-all duration-500 ${
                isHacker ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            >
              <Image
                src={HACKER_PHOTO_SRC}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover object-center pointer-events-none"
                priority
              />
            </div>
          </div>

          {/* Vignette Overlay Lembut */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 pointer-events-none"
          />

          {/* Corner Cyber Accents */}
          <span
            className={`absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 transition-colors duration-300 ${
              isHacker ? 'border-purple-400' : 'border-cyan-400'
            }`}
          />
          <span
            className={`absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 transition-colors duration-300 ${
              isHacker ? 'border-purple-400' : 'border-cyan-400'
            }`}
          />
          <span
            className={`absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 transition-colors duration-300 ${
              isHacker ? 'border-purple-400' : 'border-cyan-400'
            }`}
          />
          <span
            className={`absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 transition-colors duration-300 ${
              isHacker ? 'border-purple-400' : 'border-cyan-400'
            }`}
          />

          {/* Persona Floating Tag */}
          <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-[11px] font-mono text-white/90 backdrop-blur-md bg-black/75 px-3 py-1.5 rounded-lg border border-white/10 shadow-lg">
            {isHacker ? (
              <>
                <span className="font-bold text-purple-300 flex items-center gap-1">
                  <Lock className="h-3 w-3 text-purple-400" />
                  <span>ALTER EGO // SHADOW</span>
                </span>
                <span className="text-cyan-400 font-semibold">CLEARANCE // ROOT</span>
              </>
            ) : (
              <>
                <span className="font-bold text-cyan-300">PILOT // SAKTI</span>
                <span className="text-emerald-400 font-semibold">EXP // 3+ YRS</span>
              </>
            )}
          </div>
        </div>

        {/* Identity Details - Bersih, Elegan, & Rapi */}
        <div className="mt-5 text-center space-y-1">
          <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)]">
            {name}
          </h3>
          <p
            className={`font-mono text-xs font-semibold tracking-wide transition-colors duration-300 ${
              isHacker ? 'text-purple-400' : 'text-cyan-400'
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
