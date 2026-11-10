'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { CertificateEntry } from '@/data/portfolio';
import { tField } from '@/data/portfolio';
import type { Locale } from '@/i18n/routing';
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  ShieldCheck,
  X,
  Clock,
  CheckCircle2,
  Info,
  Sparkles,
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

  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveSlide((prev) => (prev + 1) % cert.images.length);
  };

  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveSlide((prev) => (prev - 1 + cert.images.length) % cert.images.length);
  };

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      <article
        onClick={toggleExpand}
        className={`group relative rounded-3xl theme-card border transition-all duration-300 p-5 sm:p-7 shadow-xl cursor-pointer ${
          isExpanded
            ? 'border-[var(--accent-primary)]/60 bg-[var(--bg-elevated)] shadow-2xl shadow-[var(--accent-primary)]/10 ring-1 ring-[var(--accent-primary)]/20'
            : 'border-white/[0.08] hover:border-[var(--accent-primary)]/50 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/5'
        }`}
      >
        {/* Certificate Image Frame (Always Visible) */}
        <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden border border-white/[0.08] bg-[var(--bg-canvas)] group/view shadow-inner">
          <Image
            src={cert.images[activeSlide]}
            alt={`${tField(cert.title, locale)} - Page ${activeSlide + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            className="object-cover object-top transition-transform duration-500 group-hover/view:scale-[1.02]"
            priority
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Top Status Indicators */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-black/75 border border-white/20 text-[11px] font-mono font-bold text-[var(--accent-primary)] backdrop-blur-md shadow-md">
              {cert.code}
            </span>

            <div className="flex items-center gap-2 pointer-events-auto">
              {/* Fullscreen Modal Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
                className="p-2 rounded-xl bg-black/60 hover:bg-black/90 border border-white/20 text-white backdrop-blur-md transition-transform hover:scale-110 shadow-lg cursor-pointer"
                title={isId ? 'Perbesar Foto Sertifikat' : 'Enlarge Certificate Image'}
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Bottom Badges on Image */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 pointer-events-none">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 border border-white/20 text-[10px] font-mono text-emerald-400 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{isId ? 'Sertifikat Resmi' : 'Official Certificate'}</span>
              </span>

              {hasMultiplePages && (
                <div className="px-2.5 py-0.5 rounded-md bg-black/80 border border-white/20 text-[10px] font-mono text-cyan-300 backdrop-blur-md">
                  {activeSlide === 0
                    ? isId
                      ? 'Hal 1 / 2 : Sertifikat Kelulusan'
                      : 'Page 1 / 2 : Certificate'
                    : isId
                    ? 'Hal 2 / 2 : Silabus & Rincian Materi'
                    : 'Page 2 / 2 : Syllabus & Modules'}
                </div>
              )}
            </div>

            {/* Click to expand hint button */}
            <div className="pointer-events-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--accent-primary)] text-black font-mono text-xs font-bold uppercase tracking-wider shadow-lg transition-transform hover:scale-105">
                <Info className="h-3.5 w-3.5" />
                <span>{isExpanded ? (isId ? 'Tutup' : 'Close') : (isId ? 'Detail' : 'Details')}</span>
                {isExpanded ? (
                  <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" />
                )}
              </span>
            </div>
          </div>

          {/* Multi-Page Slide Quick Flip Arrows on Image */}
          {hasMultiplePages && (
            <>
              <button
                type="button"
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black/95 border border-white/20 text-white backdrop-blur-md transition-all hover:scale-110 shadow-lg cursor-pointer"
                aria-label="Previous Page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black/95 border border-white/20 text-white backdrop-blur-md transition-all hover:scale-110 shadow-lg cursor-pointer"
                aria-label="Next Page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        {/* Detailed Information Section (Slides Down When Pressed) */}
        {isExpanded ? (
          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-6 pt-5 border-t border-white/[0.08] space-y-5 animate-fadeIn"
          >
            {/* Slide Navigation Tabs for Multi-Page Certificates */}
            {hasMultiplePages && (
              <div className="flex items-center gap-2">
                {cert.images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    className={`flex-1 py-2 px-3 rounded-xl font-mono text-xs transition-all border cursor-pointer ${
                      activeSlide === idx
                        ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] font-bold shadow-sm'
                        : 'border-white/[0.08] bg-white/[0.02] text-[var(--text-muted)] hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    {idx === 0
                      ? isId
                        ? 'Halaman 1 (Sertifikat)'
                        : 'Page 1 (Certificate)'
                      : isId
                      ? 'Halaman 2 (Silabus & Kompetensi)'
                      : 'Page 2 (Syllabus & Competency)'}
                  </button>
                ))}
              </div>
            )}

            {/* Title, Category & Issuer */}
            <div>
              <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider block">
                {tField(cert.category, locale)}
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)] mt-1 tracking-tight">
                {tField(cert.title, locale)}
              </h3>
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

            {/* Close Toggle Button */}
            <div className="pt-1 text-center">
              <button
                type="button"
                onClick={toggleExpand}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-white transition-colors cursor-pointer"
              >
                <ChevronUp className="h-3.5 w-3.5" />
                <span>{isId ? 'Tutup Detail' : 'Collapse Details'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Subtle collapsed prompt bar */
          <div className="mt-3.5 flex items-center justify-between font-mono text-xs text-[var(--text-muted)] px-1">
            <span className="font-semibold text-[var(--text-primary)] truncate max-w-[240px]">
              {tField(cert.title, locale)}
            </span>
            <span className="text-[var(--accent-primary)] text-[11px] font-medium flex items-center gap-1">
              <span>{isId ? 'Tekan untuk detail' : 'Press for details'}</span>
              <ChevronDown className="h-3 w-3" />
            </span>
          </div>
        )}
      </article>

      {/* Lightbox High-Resolution Full-Screen Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] bg-[var(--bg-elevated)] border border-white/[0.1] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 bg-[var(--bg-surface)] border-b border-white/[0.08]">
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-white">
                  {tField(cert.title, locale)}
                </h3>
                <p className="font-mono text-xs text-[var(--accent-primary)]">
                  {tField(cert.issuer, locale)}{' '}
                  {hasMultiplePages && (
                    <span>
                      · {isId ? `Halaman ${activeSlide + 1} dari ${cert.images.length}` : `Page ${activeSlide + 1} of ${cert.images.length}`}
                    </span>
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white transition-colors cursor-pointer"
                aria-label="Close Preview"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Image Viewport */}
            <div className="relative flex-1 min-h-[420px] sm:min-h-[560px] bg-black flex items-center justify-center p-2">
              <Image
                src={cert.images[activeSlide]}
                alt={tField(cert.title, locale)}
                fill
                className="object-contain"
                priority
              />

              {hasMultiplePages && (
                <>
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white backdrop-blur-md transition-all hover:scale-110 shadow-xl cursor-pointer"
                    aria-label="Previous Page"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white backdrop-blur-md transition-all hover:scale-110 shadow-xl cursor-pointer"
                    aria-label="Next Page"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Modal Footer */}
            {hasMultiplePages && (
              <div className="flex items-center justify-center gap-2 p-3 bg-[var(--bg-surface)] border-t border-white/[0.08]">
                {cert.images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    className={`px-4 py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer ${
                      activeSlide === idx
                        ? 'bg-[var(--accent-primary)] text-black font-bold'
                        : 'bg-white/[0.04] text-[var(--text-secondary)] hover:text-white'
                    }`}
                  >
                    {idx === 0
                      ? isId
                        ? 'Halaman 1 (Sertifikat)'
                        : 'Page 1 (Certificate)'
                      : isId
                      ? 'Halaman 2 (Silabus)'
                      : 'Page 2 (Syllabus)'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
