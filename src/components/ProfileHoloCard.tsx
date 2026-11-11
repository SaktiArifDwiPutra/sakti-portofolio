'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useInView } from 'framer-motion';

interface ProfileHoloCardProps {
  name: string;
  focus: string;
  locale: string;
}

export const PROFILE_PHOTO_SRC = '/images/profile/sakti-pilot.png';
export const HACKER_PHOTO_SRC = '/images/profile/sakti-hacker.jpg';

// Helper menggambar gambar ke canvas dengan 'object-cover'
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  w: number,
  h: number
) {
  if (!img || !img.naturalWidth || !img.naturalHeight) return;
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const targetRatio = w / h;
  let sw = img.naturalWidth;
  let sh = img.naturalHeight;
  let sx = 0;
  let sy = 0;

  if (imgRatio > targetRatio) {
    sw = img.naturalHeight * targetRatio;
    sx = (img.naturalWidth - sw) / 2;
  } else {
    sh = img.naturalWidth / targetRatio;
    sy = (img.naturalHeight - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
}

export function ProfileHoloCard({ name, focus, locale }: ProfileHoloCardProps) {
  const isId = locale === 'id';
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.35 });

  // Gambar yang sedang berada di DEPAN ('pilot' atau 'hacker')
  const [frontImage, setFrontImage] = useState<'pilot' | 'hacker'>('pilot');
  const [isEating, setIsEating] = useState(false);
  const [hasTeased, setHasTeased] = useState(false);
  const [isTeasing, setIsTeasing] = useState(false);

  // Preloaded Image elements & Offscreen buffer
  const pilotImgRef = useRef<HTMLImageElement | null>(null);
  const hackerImgRef = useRef<HTMLImageElement | null>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Inisialisasi canvas offscreen 320 × 400
    const offCanvas = document.createElement('canvas');
    offCanvas.width = 320;
    offCanvas.height = 400;
    offscreenCanvasRef.current = offCanvas;

    // Helper preload aman (berlaku baik saat gambar di-cache maupun baru dimuat)
    const preload = (src: string, targetRef: React.MutableRefObject<HTMLImageElement | null>) => {
      const img = new window.Image();
      img.src = src;
      targetRef.current = img;
    };

    preload(PROFILE_PHOTO_SRC, pilotImgRef);
    preload(HACKER_PHOTO_SRC, hackerImgRef);

    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    };
  }, []);

  // Desktop Pointer Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, isHovered: false });

  // One-time mobile & desktop scroll peek teaser
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
  // PIXEL DISTORTION EATER DISSOLVE
  // Gambar depan terdistorsi & menghilang dari kiri-bawah ke kanan-atas,
  // menyingkap gambar yang sudah siap di belakangnya secara instan.
  // Setelah hilang total, gambar depan berpindah posisi ke belakang.
  // ---------------------------------------------------------------------------
  const toggleIdentity = useCallback(() => {
    if (isEating) return;

    const canvas = canvasRef.current;
    const offCanvas = offscreenCanvasRef.current;
    const currentImg = frontImage === 'pilot' ? pilotImgRef.current : hackerImgRef.current;

    // Fallback instan jika kanvas/gambar belum siap
    if (!canvas || !offCanvas || !currentImg || !currentImg.complete) {
      setFrontImage((prev) => (prev === 'pilot' ? 'hacker' : 'pilot'));
      return;
    }

    const ctx = canvas.getContext('2d');
    const offCtx = offCanvas.getContext('2d');
    if (!ctx || !offCtx) {
      setFrontImage((prev) => (prev === 'pilot' ? 'hacker' : 'pilot'));
      return;
    }

    const width = 320;
    const height = 400;
    canvas.width = width;
    canvas.height = height;

    // 1. Salin gambar depan yang saat ini aktif ke buffer offscreen
    offCtx.clearRect(0, 0, width, height);
    drawCover(offCtx, currentImg, width, height);

    // 2. Tampilkan salinan gambar depan utuh di canvas aktif
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(offCanvas, 0, 0);

    // Aktifkan mode makan (gambar depan di DOM disembunyikan sesaat, digantikan canvas)
    setIsEating(true);

    const blockSize = 16;
    const cols = Math.ceil(width / blockSize);
    const rows = Math.ceil(height / blockSize);
    const maxDiag = cols - 1 + rows - 1; // Diagonal maksimum (pojok kanan atas)

    const duration = 580; // ms
    let startTime: number | null = null;
    const colors = ['#00f0ff', '#ff0055', '#a855f7', '#ffea00', '#00ff66'];

    const renderWave = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min(1, (timestamp - startTime) / duration);

      // Gelombang penghancur bergerak dari pojok kiri bawah (diag = 0) ke kanan atas (diag = maxDiag)
      const waveFront = progress * (maxDiag + 8);
      const waveBand = 3.5;

      ctx.clearRect(0, 0, width, height);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const diag = c + (rows - 1 - r);
          const bx = c * blockSize;
          const by = r * blockSize;

          if (diag < waveFront - waveBand) {
            // 1. SUDAH DIMAKAN:
            // Dikosongkan (transparan) -> Gambar di belakang (di DOM) langsung terlihat seketika!
            continue;
          } else if (diag <= waveFront + 1) {
            // 2. GELOMBANG DISTORSI PIKSEL AKTIF:
            // Potongan gambar depan bergetar (jitter glitch) & kubus neon berkedip
            const jitterX = (Math.random() - 0.5) * 8;
            const jitterY = (Math.random() - 0.5) * 6;

            if (Math.random() > 0.35) {
              ctx.drawImage(
                offCanvas,
                bx,
                by,
                blockSize,
                blockSize,
                bx + jitterX,
                by + jitterY,
                blockSize,
                blockSize
              );
            }

            if (Math.random() > 0.45) {
              ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
              ctx.globalAlpha = 0.85;
              ctx.fillRect(bx + jitterX, by + jitterY, blockSize, blockSize);
              ctx.globalAlpha = 1.0;
            }
          } else {
            // 3. BELUM TERSENTUH GELOMBANG:
            // Masih menampilkan gambar depan yang utuh
            ctx.drawImage(offCanvas, bx, by, blockSize, blockSize, bx, by, blockSize, blockSize);
          }
        }
      }

      if (progress < 1) {
        animIdRef.current = requestAnimationFrame(renderWave);
      } else {
        // Transisi selesai:
        // Gambar depan telah hilang total dan kini berpindah posisi ke belakang!
        ctx.clearRect(0, 0, width, height);
        animIdRef.current = null;
        setFrontImage((prev) => (prev === 'pilot' ? 'hacker' : 'pilot'));
        setIsEating(false);
      }
    };

    animIdRef.current = requestAnimationFrame(renderWave);
  }, [isEating, frontImage]);

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

  const isHackerFront = frontImage === 'hacker';

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
        <div
          className={`absolute top-0 right-0 w-8 h-8 -translate-y-2 translate-x-2 rotate-45 border shadow-xl transition-all duration-300 group-hover:scale-110 ${
            isHackerFront
              ? 'bg-purple-900/90 border-purple-400/70 shadow-purple-500/30'
              : 'bg-cyan-900/90 border-cyan-400/70 shadow-cyan-500/30'
          }`}
        />
        <span
          className={`absolute top-2 right-2 h-1.5 w-1.5 rounded-full animate-ping ${
            isHackerFront ? 'bg-purple-400' : 'bg-cyan-400'
          }`}
        />
      </div>

      {/* Mobile Visual Cue 2: Stacked Card Sub-Layer Offset (Petunjuk fisik kartu bertumpuk) */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 rounded-3xl transition-transform duration-300 pointer-events-none -z-10 translate-x-1.5 translate-y-1.5 sm:translate-x-2 sm:translate-y-2 border ${
          isHackerFront
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
          isHackerFront
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
            isHackerFront
              ? 'border-purple-500/60 shadow-[0_0_35px_rgba(168,85,247,0.22)]'
              : 'border-cyan-400/40 shadow-[0_0_35px_rgba(0,240,255,0.12)]'
          }`}
        >
          {/* 
            DUAL-LAYER DOM STACK:
            Gambar depan berada di z-20, gambar belakang selalu siap dan solid di z-10.
            Ketika gambar depan dimakan oleh canvas (z-25), gambar belakang langsung terlihat.
            Setelah selesai, gambar depan berpindah ke z-10 (ke belakang).
          */}
          <div className="relative w-full h-full">
            {/* 1. LAYER FOTO PILOT */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-200"
              style={{
                zIndex: frontImage === 'pilot' ? 20 : 10,
                opacity: frontImage === 'pilot' && isEating ? 0 : 1,
              }}
            >
              <Image
                src={PROFILE_PHOTO_SRC}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover object-center"
                priority
              />
            </div>

            {/* 2. LAYER FOTO HACKER */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-200"
              style={{
                zIndex: frontImage === 'hacker' ? 20 : 10,
                opacity: frontImage === 'hacker' && isEating ? 0 : 1,
              }}
            >
              <Image
                src={HACKER_PHOTO_SRC}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          {/* ACTIVE CANVAS PIXEL DISTORTION EATER OVERLAY (z-25) */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              zIndex: 25,
              imageRendering: 'pixelated',
              display: isEating ? 'block' : 'none',
            }}
          />

          {/* Vignette Overlay Lembut */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 pointer-events-none z-30"
          />

          {/* Corner Cyber Accents */}
          <span
            className={`absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 transition-colors duration-300 z-30 ${
              isHackerFront ? 'border-purple-400' : 'border-cyan-400'
            }`}
          />
          <span
            className={`absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 transition-colors duration-300 z-30 ${
              isHackerFront ? 'border-purple-400' : 'border-cyan-400'
            }`}
          />
          <span
            className={`absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 transition-colors duration-300 z-30 ${
              isHackerFront ? 'border-purple-400' : 'border-cyan-400'
            }`}
          />
          <span
            className={`absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 transition-colors duration-300 z-30 ${
              isHackerFront ? 'border-purple-400' : 'border-cyan-400'
            }`}
          />
        </div>

        {/* Identity Details - Bersih, Elegan, & Rapi */}
        <div className="mt-5 text-center space-y-1">
          <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)]">
            {name}
          </h3>
          <p
            className={`font-mono text-xs font-semibold tracking-wide transition-colors duration-300 ${
              isHackerFront ? 'text-purple-400' : 'text-cyan-400'
            }`}
          >
            {isHackerFront
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
