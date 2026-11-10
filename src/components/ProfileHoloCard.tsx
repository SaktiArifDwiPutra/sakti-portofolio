'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { Lock, Sparkles } from 'lucide-react';

interface ProfileHoloCardProps {
  name: string;
  focus: string;
  locale: string;
}

export const PROFILE_PHOTO_SRC = '/images/profile/sakti-pilot.png';
export const HACKER_PHOTO_SRC = '/images/profile/sakti-hacker.jpg';

export function ProfileHoloCard({ name, focus, locale }: ProfileHoloCardProps) {
  const isId = locale === 'id';
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.35 });

  const [viewMode, setViewMode] = useState<'pilot' | 'hacker'>('pilot');
  const [isEating, setIsEating] = useState(false);
  const [hasTeased, setHasTeased] = useState(false);
  const [isTeasing, setIsTeasing] = useState(false);

  // Preloaded image references for instant 60fps canvas pixel distortion eater
  const pilotImgRef = useRef<HTMLImageElement | null>(null);
  const hackerImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pImg = new window.Image();
      pImg.src = PROFILE_PHOTO_SRC;
      pilotImgRef.current = pImg;

      const hImg = new window.Image();
      hImg.src = HACKER_PHOTO_SRC;
      hackerImgRef.current = hImg;
    }
  }, []);

  // Desktop Pointer Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, isHovered: false });

  // One-time mobile & desktop scroll peek teaser (visual curiosity cue)
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

  // Desktop Mouse Tilt
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    setTilt({
      x: -normY * 4.5,
      y: normX * 5.5,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
      isHovered: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt((prev) => ({ ...prev, x: 0, y: 0, isHovered: false }));
  }, []);

  // ---------------------------------------------------------------------------
  // PIXEL DISTORTION EATER TRANSITION (Bottom-Left -> Top-Right Diagonal Wave)
  // ---------------------------------------------------------------------------
  const toggleIdentity = useCallback(() => {
    if (isEating) return;

    const canvas = canvasRef.current;
    const fromImg = viewMode === 'pilot' ? pilotImgRef.current : hackerImgRef.current;
    const toImg = viewMode === 'pilot' ? hackerImgRef.current : pilotImgRef.current;

    // Fallback jika gambar belum siap di canvas
    if (!canvas || !fromImg || !toImg || !fromImg.complete || !toImg.complete) {
      setViewMode((prev) => (prev === 'pilot' ? 'hacker' : 'pilot'));
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setViewMode((prev) => (prev === 'pilot' ? 'hacker' : 'pilot'));
      return;
    }

    setIsEating(true);

    const width = 320;
    const height = 400;
    canvas.width = width;
    canvas.height = height;

    const blockSize = 16;
    const cols = Math.ceil(width / blockSize);
    const rows = Math.ceil(height / blockSize);
    const maxDiag = cols - 1 + rows - 1; // Jarak diagonal maksimum (kanan atas)

    const duration = 650; // ms
    let startTime: number | null = null;
    let animId: number;

    const renderWave = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Gelombang menyapu dari pojok kiri bawah (diag = 0) ke kanan atas (diag = maxDiag)
      const waveFront = progress * (maxDiag + 8);
      const waveBand = 3.5; // Lebar pita distorsi piksel aktif

      ctx.clearRect(0, 0, width, height);

      const colors = ['#00f0ff', '#ff0055', '#a855f7', '#ffea00', '#00ff66'];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Jarak diagonal dari pojok kiri bawah (c=0, r=rows-1)
          const diag = c + (rows - 1 - r);
          const bx = c * blockSize;
          const by = r * blockSize;

          if (diag < waveFront - waveBand) {
            // 1. SUDAH DIMAKAN (EATEN): Langsung menampilkan foto baru secara bersih
            ctx.drawImage(toImg, bx, by, blockSize, blockSize, bx, by, blockSize, blockSize);
          } else if (diag <= waveFront + 1) {
            // 2. SEDANG DIMAKAN DISTORSI PIKSEL (ACTIVE EATER WAVE):
            // Ada jitter, pergeseran kubus piksel warna-warni, dan foto baru mulai muncul seketika!
            const jitterX = (Math.random() - 0.5) * 8;
            const jitterY = (Math.random() - 0.5) * 6;

            // Sebagian blok di gelombang langsung menyingkap foto tujuan (toImg)
            const showNew = Math.random() > 0.35;
            const activeImg = showNew ? toImg : fromImg;

            ctx.drawImage(
              activeImg,
              bx,
              by,
              blockSize,
              blockSize,
              bx + jitterX,
              by + jitterY,
              blockSize,
              blockSize
            );

            // Kubus piksel warna-warni berkedip di garis batas pemakan
            if (Math.random() > 0.4) {
              ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
              ctx.globalAlpha = 0.8;
              ctx.fillRect(bx + jitterX, by + jitterY, blockSize, blockSize);
              ctx.globalAlpha = 1.0;
            }
          } else {
            // 3. BELUM TERSENTUH GELOMBANG: Masih menampilkan foto lama
            ctx.drawImage(fromImg, bx, by, blockSize, blockSize, bx, by, blockSize, blockSize);
          }
        }
      }

      if (progress < 1) {
        animId = requestAnimationFrame(renderWave);
      } else {
        // Transisi selesai total
        setViewMode((prev) => (prev === 'pilot' ? 'hacker' : 'pilot'));
        setIsEating(false);
      }
    };

    animId = requestAnimationFrame(renderWave);
  }, [isEating, viewMode]);

  // Keyboard accessibility
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
      {/* Mobile Visual Cue 1: Folded Corner Peel (Dog-Ear Tab) di Pojok Kanan-Atas */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-9 h-9 pointer-events-none z-30 overflow-hidden rounded-tr-3xl"
      >
        {/* Corner Flap Triangle */}
        <div
          className={`absolute top-0 right-0 w-8 h-8 -translate-y-2 translate-x-2 rotate-45 border shadow-xl transition-all duration-300 group-hover:scale-110 ${
            isHacker
              ? 'bg-purple-900/90 border-purple-400/70 shadow-purple-500/30'
              : 'bg-cyan-900/90 border-cyan-400/70 shadow-cyan-500/30'
          }`}
        />
        {/* Subtle breathing micro-dot */}
        <span
          className={`absolute top-2 right-2 h-1.5 w-1.5 rounded-full animate-ping ${
            isHacker ? 'bg-purple-400' : 'bg-cyan-400'
          }`}
        />
      </div>

      {/* Mobile Visual Cue 2: Stacked Card Sub-Layer Offset (Petunjuk fisik kartu bertumpuk) */}
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
        {/* Dynamic Glare Highlight di Desktop */}
        {tilt.isHovered && !shouldReduceMotion && (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none rounded-3xl z-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 280px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.06), transparent 70%)`,
            }}
          />
        )}

        {/* Viewport Foto Portrait dengan Corner Cyber Brackets */}
        <div
          className={`relative aspect-[4/5] w-full max-w-[320px] mx-auto rounded-2xl overflow-hidden border-2 bg-[var(--bg-canvas)] shadow-2xl transition-all duration-500 ${
            isHacker
              ? 'border-purple-500/60 shadow-[0_0_35px_rgba(168,85,247,0.22)]'
              : 'border-cyan-400/40 shadow-[0_0_35px_rgba(0,240,255,0.12)]'
          }`}
        >
          {/* Static Photo Layers */}
          <div className="relative w-full h-full">
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${
                isHacker ? 'opacity-0' : 'opacity-100'
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

            <div
              className={`absolute inset-0 transition-opacity duration-300 ${
                isHacker ? 'opacity-100' : 'opacity-0'
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

          {/* ACTIVE CANVAS PIXEL DISTORTION EATER OVERLAY (Menyapu dari Kiri Bawah ke Kanan Atas) */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full pointer-events-none z-20 ${
              isEating ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ imageRendering: 'pixelated' }}
          />

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
