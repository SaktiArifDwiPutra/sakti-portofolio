'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { CertificateEntry } from '@/data/portfolio';
import { tField } from '@/data/portfolio';
import type { Locale } from '@/i18n/routing';
import {
  Award,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  ShieldCheck,
  X,
  FileText,
  Clock,
  CheckCircle2,
} from 'lucide-react';

interface CertificateGalleryCardProps {
  cert: CertificateEntry;
  locale: Locale;
}

export function CertificateGalleryCard({ cert, locale }: CertificateGalleryCardProps) {
  const isId = locale === 'id';
  const [activeSlide, setActiveSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasMultiplePages = cert.images.length > 1;

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % cert.images.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + cert.images.length) % cert.images.length);
  };

  return (
    <>
      <article className="group rounded-3xl theme-card border border-white/[0.08] hover:border-[var(--accent-primary)]/40 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-[var(--accent-primary)]/5">
        <div>
          {/* Card Header Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold text-[var(--accent-primary)] tracking-wider">
                {cert.code}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-[var(--text-secondary)]">
                {tField(cert.category, locale)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs text-emerald-400 font-medium">
                {isId ? 'Terverifikasi' : 'Verified'}
              </span>
            </div>
          </div>

          {/* Slide-Out Certificate Viewport */}
          <div className="mt-6 space-y-3">
            {/* Viewport Frame */}
            <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden border border-white/[0.08] bg-[var(--bg-canvas)] group/view shadow-inner">
              <Image
                src={cert.images[activeSlide]}
                alt={`${tField(cert.title, locale)} - Page ${activeSlide + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-500 group-hover/view:scale-[1.02]"
              />

              {/* Slide Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              {/* Expand Lightbox Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 hover:bg-black/90 border border-white/20 text-white backdrop-blur-md transition-transform hover:scale-110 shadow-lg cursor-pointer"
                title={isId ? 'Lihat Foto Penuh' : 'View Full Image'}
              >
                <Maximize2 className="h-4 w-4" />
              </button>

              {/* Multiple Pages Slide Controls */}
              {hasMultiplePages && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevSlide();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white backdrop-blur-md transition-all hover:scale-110 shadow-md cursor-pointer"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextSlide();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white backdrop-blur-md transition-all hover:scale-110 shadow-md cursor-pointer"
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  {/* Bottom Slide Badge */}
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/70 border border-white/20 text-[11px] font-mono text-cyan-300 backdrop-blur-md">
                    {activeSlide === 0
                      ? isId
                        ? 'Hal 1: Sertifikat Kelulusan'
                        : 'Page 1: Certificate'
                      : isId
                      ? 'Hal 2: Silabus & Rincian Kompetensi'
                      : 'Page 2: Syllabus & Competencies'}
                  </div>
                </>
              )}
            </div>

            {/* Slide Navigation Tabs for Multi-Page Certificates */}
            {hasMultiplePages && (
              <div className="flex items-center gap-2 pt-1">
                {cert.images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    className={`flex-1 py-1.5 px-3 rounded-lg font-mono text-xs transition-all border ${
                      activeSlide === idx
                        ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-bold'
                        : 'border-white/[0.06] bg-white/[0.02] text-[var(--text-muted)] hover:text-white hover:bg-white/[0.05]'
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

          {/* Certificate Title & Details */}
          <div className="mt-5 space-y-3">
            <div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors tracking-tight">
                {tField(cert.title, locale)}
              </h2>
              <p className="font-mono text-xs text-[var(--accent-primary)] mt-1 font-medium">
                {tField(cert.issuer, locale)}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {tField(cert.description, locale)}
            </p>

            {/* Skills & Modules Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-xs">
              {cert.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[var(--text-secondary)] hover:border-[var(--accent-primary)]/40 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer: Date, Hours, and Official Verification Button */}
        <div className="mt-8 pt-5 border-t border-white/[0.08] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-1.5">
              <span>{tField(cert.date, locale)}</span>
              {cert.hours && (
                <>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-[var(--text-secondary)]">
                    <Clock className="h-3 w-3" />
                    <span>{cert.hours}</span>
                  </span>
                </>
              )}
            </div>

            {cert.credentialId && (
              <span className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.08] text-white/80 font-mono text-[11px]">
                ID: {cert.credentialId}
              </span>
            )}
          </div>

          {cert.credentialUrl ? (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-cyan-500/20 hover:scale-[1.01] active:scale-[0.99]"
            >
              <ShieldCheck className="h-4 w-4 text-black" />
              <span>{isId ? 'Verifikasi Kredensial Resmi' : 'Verify Official Credential'}</span>
              <ExternalLink className="h-3.5 w-3.5 text-black" />
            </a>
          ) : (
            <div className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/80 font-mono text-xs">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>{tField(cert.statusNote, locale)}</span>
            </div>
          )}
        </div>
      </article>

      {/* Lightbox High-Resolution Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-[var(--bg-elevated)] border border-white/[0.1] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
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
            <div className="relative flex-1 min-h-[400px] sm:min-h-[550px] bg-black flex items-center justify-center p-2">
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
                    className={`px-4 py-1.5 rounded-lg font-mono text-xs transition-all ${
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

