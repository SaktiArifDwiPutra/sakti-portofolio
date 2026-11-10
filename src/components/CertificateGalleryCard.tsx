'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, type PanInfo } from 'framer-motion';
import type { CertificateEntry } from '@/data/portfolio';
import { tField } from '@/data/portfolio';
import type { Locale } from '@/i18n/routing';
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ShieldCheck,
  X,
  Clock,
  CheckCircle2,
  Maximize2,
  FileText,
} from 'lucide-react';

interface CertificateGalleryCardProps {
  cert: CertificateEntry;
  locale: Locale;
}

export function CertificateGalleryCard({ cert, locale }: CertificateGalleryCardProps) {
  const isId = locale === 'id';
  const [activeSlide, setActiveSlide] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasMultiplePages = cert.images.length > 1;

  // Keyboard navigation for full-screen view
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
      if (e.key === 'ArrowRight' && hasMultiplePages) {
        setActiveSlide((prev) => (prev + 1) % cert.images.length);
      }
      if (e.key === 'ArrowLeft' && hasMultiplePages) {
        setActiveSlide((prev) => (prev - 1 + cert.images.length) % cert.images.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, hasMultiplePages, cert.images.length]);

  // Handle swipe / slide navigation (mouse drag or finger touch swipe)
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!hasMultiplePages) return;
    const swipeThreshold = 35;
    if (info.offset.x < -swipeThreshold || info.velocity.x < -180) {
      // Slid left -> next page
      setActiveSlide((prev) => (prev + 1) % cert.images.length);
    } else if (info.offset.x > swipeThreshold || info.velocity.x > 180) {
      // Slid right -> previous page
      setActiveSlide((prev) => (prev - 1 + cert.images.length) % cert.images.length);
    }
  };

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      <article
        className={`group relative rounded-3xl theme-card border transition-all duration-300 p-5 sm:p-7 shadow-xl ${
          isExpanded
            ? 'border-[var(--accent-primary)]/60 bg-[var(--bg-elevated)] shadow-2xl shadow-[var(--accent-primary)]/10 ring-1 ring-[var(--accent-primary)]/20'
            : 'border-white/[0.08] hover:border-[var(--accent-primary)]/40 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/5'
        }`}
      >
        {/* Certificate Image Frame with Slide Gesture & Click-to-Fullscreen */}
        <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden border border-white/[0.08] bg-[var(--bg-canvas)] shadow-inner touch-pan-y select-none group/frame">
          <motion.div
            drag={hasMultiplePages ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={handleDragEnd}
            onTap={() => setIsModalOpen(true)}
            className="relative w-full h-full cursor-zoom-in"
            title={isId ? 'Tekan foto untuk melihat layar penuh' : 'Tap image to view fullscreen'}
          >
            <Image
              src={cert.images[activeSlide]}
              alt={`${tField(cert.title, locale)} - Page ${activeSlide + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              className="object-cover object-top transition-transform duration-500 group-hover/frame:scale-[1.02] pointer-events-none"
              priority
            />

            {/* Subtle Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

            {/* Top Bar Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-black/75 border border-white/20 text-[11px] font-mono font-bold text-[var(--accent-primary)] backdrop-blur-md shadow-md">
                {cert.code}
              </span>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/15 text-[10px] font-mono text-white/80 backdrop-blur-md">
                <Maximize2 className="h-3 w-3 text-[var(--accent-primary)]" />
                <span>{isId ? 'Fullscreen' : 'Fullscreen'}</span>
              </div>
            </div>

            {/* Bottom Status & Swipe Hint */}
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 pointer-events-none">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 border border-white/20 text-[10px] font-mono text-emerald-400 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{isId ? 'Sertifikat Resmi' : 'Official Certificate'}</span>
                </span>

                {hasMultiplePages && (
                  <div className="px-2.5 py-0.5 rounded-md bg-black/85 border border-white/20 text-[10px] font-mono text-cyan-300 backdrop-blur-md flex items-center gap-2">
                    <span>{activeSlide === 0 ? (isId ? 'Hal 1: Sertifikat' : 'Page 1: Certificate') : (isId ? 'Hal 2: Silabus' : 'Page 2: Syllabus')}</span>
                    <span className="text-[9px] text-white/60">({isId ? 'Geser layar' : 'Swipe image'})</span>
                  </div>
                )}
              </div>

              {hasMultiplePages && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/70 border border-white/15 backdrop-blur-md">
                  {cert.images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${
                        activeSlide === idx ? 'w-4 bg-[var(--accent-primary)]' : 'w-1.5 bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Card Title & Dedicated Detail Toggle Button */}
        <div className="mt-4 pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display font-bold text-base sm:text-lg text-[var(--text-primary)] truncate">
              {tField(cert.title, locale)}
            </h3>
            <p className="font-mono text-xs text-[var(--text-muted)] truncate">
              {tField(cert.issuer, locale)}
            </p>
          </div>

          {/* Dedicated Press-to-Toggle Details Button */}
          <button
            type="button"
            onClick={toggleExpand}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent-primary)] text-black font-mono text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <FileText className="h-3.5 w-3.5 text-black" />
            <span>{isExpanded ? (isId ? 'Tutup Detail' : 'Hide Details') : (isId ? 'Lihat Detail' : 'View Details')}</span>
            {isExpanded ? (
              <ChevronUp className="h-3.5 w-3.5 text-black" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5 text-black" />
            )}
          </button>
        </div>

        {/* Detailed Information Section (Revealed strictly on button press) */}
        {isExpanded && (
          <div className="mt-5 pt-5 border-t border-white/[0.08] space-y-5 animate-fadeIn">
            {/* Title, Category & Issuer */}
            <div>
              <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider block">
                {tField(cert.category, locale)}
              </span>
              <h4 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)] mt-1 tracking-tight">
                {tField(cert.title, locale)}
              </h4>
              <p className="font-mono text-xs text-[var(--accent-primary)] mt-1 font-semibold">
                {tField(cert.issuer, locale)}
              </p>
            </div>

            {/* Narrative Description */}
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {tField(cert.description, locale)}
            </p>

            {/* Skills & Modules Tags */}
            <div>
              <span className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider block mb-2">
                {isId ? 'Kompetensi & Modul Teruji:' : 'Tested Skills & Competencies:'}
              </span>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[var(--text-primary)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Meta Row: Date, Duration & Credential ID */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] font-mono text-xs">
              <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                <span>{tField(cert.date, locale)}</span>
                {cert.hours && (
                  <>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-[var(--accent-primary)]">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{cert.hours}</span>
                    </span>
                  </>
                )}
              </div>

              {cert.credentialId && (
                <span className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-white font-bold text-[11px]">
                  ID: {cert.credentialId}
                </span>
              )}
            </div>

            {/* Official Verification Button */}
            {cert.credentialUrl ? (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-mono text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-200 shadow-xl shadow-cyan-500/20 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <ShieldCheck className="h-4 w-4 text-black" />
                <span>{isId ? 'Verifikasi Kredensial Resmi Dicoding' : 'Verify Official Dicoding Credential'}</span>
                <ExternalLink className="h-4 w-4 text-black" />
              </a>
            ) : (
              <div className="inline-flex w-full items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/90 font-mono text-xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>{tField(cert.statusNote, locale)}</span>
              </div>
            )}
          </div>
        )}
      </article>

      {/* Pure Full-Screen Immersive Lightbox with Swipe-to-Slide (No distracting UI header/footer) */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 sm:bg-black/98 backdrop-blur-md animate-fadeIn select-none p-2 sm:p-4 touch-pan-y"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Minimal Unobtrusive Close Button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[110] p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white/70 hover:text-white border border-white/20 transition-all hover:scale-105 cursor-pointer shadow-2xl"
            aria-label="Close Fullscreen"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Certificate Image Viewport (Swipe left/right to change page without buttons) */}
          <motion.div
            drag={hasMultiplePages ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="relative w-full h-full max-w-[96vw] max-h-[96vh] flex items-center justify-center cursor-grab active:cursor-grabbing"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={cert.images[activeSlide]}
              alt={tField(cert.title, locale)}
              fill
              sizes="100vw"
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] pointer-events-none"
              priority
            />

            {/* Minimal Page Indicator */}
            {hasMultiplePages && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-black/75 border border-white/20 text-xs font-mono text-white/80 backdrop-blur-md pointer-events-none shadow-xl flex items-center gap-2">
                <span>{activeSlide + 1} / {cert.images.length}</span>
                <span className="text-[11px] text-white/50">({isId ? 'Geser untuk ganti halaman' : 'Swipe to change page'})</span>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
}
