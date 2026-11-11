'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { ExperienceEntry } from '@/data/portfolio';
import { tField } from '@/data/portfolio';
import type { Locale } from '@/i18n/routing';
import {
  Calendar,
  ExternalLink,
  Gamepad2,
  Globe,
  Sparkles,
  ChevronRight,
  X,
  Compass,
  MapPin,
  Flag,
  Navigation,
} from 'lucide-react';

interface TrajectoryInteractiveTimelineProps {
  experiences: ExperienceEntry[];
  locale: Locale;
}

const PROJECT_COVERS: Record<string, string> = {
  'exp-pilketos-school': '/images/projects/pilketos-cover.png',
  'exp-daus-gamedev': '/images/projects/daus-anak-soleh-cover.png',
  'exp-obathaus': '/images/projects/obathaus-cover.svg',
  'exp-coordina': '/images/projects/coordina-cover.svg',
  'exp-critiplay-collab': '/images/projects/critiplay-cover.png',
  'exp-dragonhold-independent': '/images/projects/dragonhold-cover.svg',
};

const PROJECT_ACTIONS: Record<string, { url: string; labelId: string; labelEn: string; icon: string }> = {
  'exp-critiplay-collab': {
    url: 'https://www.critiplay.my.id',
    labelId: 'Live CritiPlay',
    labelEn: 'Live CritiPlay',
    icon: 'globe',
  },
  'exp-daus-gamedev': {
    url: 'https://archdragonstudio.itch.io/daus-anak-soleh',
    labelId: 'Mainkan di itch.io',
    labelEn: 'Play on itch.io',
    icon: 'game',
  },
};

// Pengaturan layout peta harta karun (Treasure Map Waypoint Specs)
// Variasi posisi, offset, rotasi kasual, dan jarak dinamis agar tidak monoton
interface WaypointLayout {
  desktopSide: 'left' | 'right' | 'center';
  desktopX: number; // Persentase X pada canvas SVG desktop (0-100)
  rotationDeg: number;
  marginTopClass: string;
  mobileAlign: 'left' | 'right' | 'center';
  badgePosition: 'left' | 'right' | 'bottom';
  isDestination?: boolean;
}

const WAYPOINT_SPECS: Record<string, WaypointLayout> = {
  'exp-pilketos-school': {
    desktopSide: 'left',
    desktopX: 28,
    rotationDeg: -1.2,
    marginTopClass: 'mt-0',
    mobileAlign: 'left',
    badgePosition: 'right',
  },
  'exp-daus-gamedev': {
    // Belok ke kanan dan turun
    desktopSide: 'right',
    desktopX: 74,
    rotationDeg: 1.8,
    marginTopClass: 'mt-16 sm:mt-24',
    mobileAlign: 'right',
    badgePosition: 'left',
  },
  'exp-obathaus': {
    // Menukik kembali ke kiri
    desktopSide: 'left',
    desktopX: 24,
    rotationDeg: -0.8,
    marginTopClass: 'mt-20 sm:mt-28',
    mobileAlign: 'left',
    badgePosition: 'right',
  },
  'exp-coordina': {
    // Berbelok ke kanan tengah
    desktopSide: 'right',
    desktopX: 70,
    rotationDeg: 1.2,
    marginTopClass: 'mt-14 sm:mt-20',
    mobileAlign: 'right',
    badgePosition: 'left',
  },
  'exp-critiplay-collab': {
    // Melengkung lebar ke kiri
    desktopSide: 'left',
    desktopX: 26,
    rotationDeg: -1.5,
    marginTopClass: 'mt-20 sm:mt-28',
    mobileAlign: 'left',
    badgePosition: 'right',
  },
  'exp-dragonhold-independent': {
    // Menuju titik tujuan akhir (X Marks The Spot) di tengah bawah
    desktopSide: 'center',
    desktopX: 50,
    rotationDeg: 0,
    marginTopClass: 'mt-24 sm:mt-32',
    mobileAlign: 'center',
    badgePosition: 'bottom',
    isDestination: true,
  },
};

function renderWithPartnerLink(text: string) {
  if (!text || !text.includes('Khairul')) return text;
  const parts = text.split('Khairul');
  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {part}
      {i < parts.length - 1 && (
        <a
          href="https://github.com/Kyunn17"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 font-bold underline underline-offset-4 decoration-cyan-400/50 hover:decoration-cyan-300 transition-colors cursor-pointer"
          title="GitHub: Khairul (@Kyunn17)"
          onClick={(e) => e.stopPropagation()}
        >
          Khairul
        </a>
      )}
    </React.Fragment>
  ));
}

export function TrajectoryInteractiveTimeline({ experiences, locale }: TrajectoryInteractiveTimelineProps) {
  const isId = locale === 'id';
  const [selectedMilestone, setSelectedMilestone] = useState<ExperienceEntry | null>(null);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Expedition Header Telemetry */}
      <div className="p-5 sm:p-7 rounded-2xl theme-card border border-white/[0.08] shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
            <Compass className="h-5 w-5 animate-spin-slow" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase text-[var(--accent-primary)] font-bold tracking-wider block">
              EXPEDITION LOG // 2025 - 2026
            </span>
            <h3 className="font-display font-bold text-lg text-white">
              {isId ? 'Peta Ekspedisi & Perjalanan Rekayasa' : 'Engineering & Gamedev Expedition Map'}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Navigation className="h-3.5 w-3.5" />
            <span>{experiences.length} {isId ? 'Titik Singgah' : 'Waypoints'}</span>
          </div>
        </div>
      </div>

      {/* Treasure Map Container */}
      <div className="relative max-w-4xl mx-auto px-2 sm:px-6 py-8">
        {/* SVG Winding Path Overlay (Desktop & Tablet) */}
        <div aria-hidden="true" className="hidden md:block absolute inset-0 pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 1000 2100"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="treasurePathGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
                <stop offset="25%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="75%" stopColor="#ec4899" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="1" />
              </linearGradient>

              <filter id="neonBlur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Glowing Underlying Aura Line */}
            <path
              d="M 280,70 C 520,60 760,160 740,390 C 720,600 220,530 240,790 C 260,980 730,900 700,1180 C 670,1400 230,1320 260,1580 C 290,1780 480,1750 500,1950"
              stroke="url(#treasurePathGlow)"
              strokeWidth="6"
              strokeOpacity="0.35"
              filter="url(#neonBlur)"
              vectorEffect="non-scaling-stroke"
            />

            {/* Dashed Treasure Map Trail (Jalur Berkelok Harta Karun) */}
            <path
              d="M 280,70 C 520,60 760,160 740,390 C 720,600 220,530 240,790 C 260,980 730,900 700,1180 C 670,1400 230,1320 260,1580 C 290,1780 480,1750 500,1950"
              stroke="url(#treasurePathGlow)"
              strokeWidth="3.5"
              strokeDasharray="10 8"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* SVG Winding Path Overlay (Mobile) */}
        <div aria-hidden="true" className="block md:hidden absolute inset-0 pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 400 2300"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 120,70 C 220,80 320,180 300,420 C 280,620 90,560 110,840 C 130,1040 310,970 290,1280 C 270,1510 100,1440 120,1740 C 140,1950 190,1930 200,2140"
              stroke="#00f0ff"
              strokeWidth="2.5"
              strokeDasharray="8 6"
              strokeOpacity="0.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* Expedition Waypoints & Cards */}
        <div className="relative z-10 flex flex-col">
          {experiences.map((exp, idx) => {
            const spec = WAYPOINT_SPECS[exp.id] ?? {
              desktopSide: idx % 2 === 0 ? 'left' : 'right',
              desktopX: idx % 2 === 0 ? 25 : 75,
              rotationDeg: 0,
              marginTopClass: 'mt-16',
              mobileAlign: idx % 2 === 0 ? 'left' : 'right',
              badgePosition: 'bottom',
            };

            const coverImage = PROJECT_COVERS[exp.id];
            const action = PROJECT_ACTIONS[exp.id];
            const isDestination = spec.isDestination;

            return (
              <div
                key={exp.id}
                className={`relative w-full ${spec.marginTopClass} flex flex-col ${
                  spec.desktopSide === 'left'
                    ? 'md:items-start md:pl-6'
                    : spec.desktopSide === 'right'
                    ? 'md:items-end md:pr-6'
                    : 'md:items-center'
                } ${
                  spec.mobileAlign === 'left'
                    ? 'items-start pl-2'
                    : spec.mobileAlign === 'right'
                    ? 'items-end pr-2'
                    : 'items-center'
                }`}
              >
                {/* Waypoint Marker & Date Stamp Attached to the Path */}
                <div
                  className={`mb-3 flex items-center gap-2 z-20 ${
                    spec.desktopSide === 'right' ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Glowing Compass Node / Destination X Marker */}
                  <div
                    className={`relative flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-125 shadow-lg ${
                      isDestination
                        ? 'h-9 w-9 bg-amber-400 text-black shadow-[0_0_20px_#f59e0b] ring-4 ring-amber-400/30'
                        : 'h-7 w-7 bg-black border-2 border-cyan-400 shadow-[0_0_12px_#00f0ff]'
                    }`}
                  >
                    {isDestination ? (
                      <span className="font-display font-black text-xs tracking-tighter">X</span>
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                    )}
                  </div>

                  {/* Date Pill Stamped on Path */}
                  <div
                    className={`px-3 py-1 rounded-full bg-black/90 border font-mono text-[11px] font-bold whitespace-nowrap backdrop-blur-md shadow-xl flex items-center gap-1.5 ${
                      isDestination
                        ? 'border-amber-400/60 text-amber-300'
                        : 'border-cyan-400/40 text-cyan-300'
                    }`}
                  >
                    <Calendar className="h-3 w-3" />
                    <span>{tField(exp.period, locale)}</span>
                  </div>
                </div>

                {/* Compact Square Project Card */}
                <motion.div
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedMilestone(exp)}
                  style={{ transform: `rotate(${spec.rotationDeg}deg)` }}
                  className={`group relative w-[260px] sm:w-[290px] rounded-2xl theme-card border p-3.5 shadow-xl cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                    isDestination
                      ? 'border-amber-400/60 hover:border-amber-300 hover:shadow-amber-500/20 bg-gradient-to-b from-amber-950/20 via-black to-black'
                      : 'border-white/[0.1] hover:border-[var(--accent-primary)]/80 hover:shadow-[var(--accent-primary)]/15'
                  }`}
                >
                  {/* Square Cover Viewport */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-white/[0.08] bg-black/70 shadow-inner group-hover:border-[var(--accent-primary)]/50 transition-colors">
                    {coverImage ? (
                      <Image
                        src={coverImage}
                        alt={tField(exp.role, locale)}
                        fill
                        sizes="290px"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center font-mono text-xs text-neutral-500 p-4 text-center">
                        <Sparkles className="h-6 w-6 text-amber-400 mb-2 animate-pulse" />
                        <span>SECRET EXPEDITION</span>
                      </div>
                    )}

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/25 pointer-events-none" />

                    {/* Top Entry Number */}
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/80 border border-white/15 text-[10px] font-mono font-bold text-[var(--accent-primary)] backdrop-blur-md">
                      #{exp.index}
                    </span>

                    {/* Status Pill */}
                    <span
                      className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-mono backdrop-blur-md border ${
                        exp.isPlaceholder
                          ? 'bg-amber-500/20 border-amber-400/40 text-amber-300'
                          : 'bg-black/80 border-white/15 text-white/90'
                      }`}
                    >
                      {exp.isPlaceholder
                        ? isId
                          ? 'Dalam Riset'
                          : 'In Development'
                        : isId
                        ? 'Selesai'
                        : 'Released'}
                    </span>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-2.5 inset-x-2.5 text-left">
                      <h4 className="font-display font-bold text-sm sm:text-base text-white truncate drop-shadow-md">
                        {tField(exp.organization, locale).replace(
                          /Proyek Sekolah |Produksi Game Indie |Sistem POS & Inventaris Apotek |Platform Penyiaran Event Real-Time |Proyek Kolaborasi /g,
                          ''
                        )}
                      </h4>
                      <p className="font-mono text-[10px] text-cyan-300 truncate">
                        {tField(exp.role, locale)}
                      </p>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="mt-2.5 flex items-center justify-between gap-2 text-left">
                    <span className="font-mono text-[10px] text-[var(--text-muted)] group-hover:text-white transition-colors flex items-center gap-0.5">
                      <span>{isId ? 'Rincian' : 'Specs'}</span>
                      <ChevronRight className="h-3 w-3 text-[var(--accent-primary)]" />
                    </span>

                    {action && (
                      <a
                        href={action.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--accent-primary)] text-black font-mono text-[10px] font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-sm"
                      >
                        {action.icon === 'game' ? (
                          <Gamepad2 className="h-3 w-3 text-black" />
                        ) : (
                          <Globe className="h-3 w-3 text-black" />
                        )}
                        <span>{isId ? action.labelId : action.labelEn}</span>
                        <ExternalLink className="h-2.5 w-2.5 text-black" />
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Milestone Modal */}
      <AnimatePresence>
        {selectedMilestone && (
          <div
            role="dialog"
            aria-modal="true"
            onClick={() => setSelectedMilestone(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-[var(--bg-elevated)] border border-white/[0.1] rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/[0.08]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-[var(--accent-primary)]">
                      ENTRY // {selectedMilestone.index}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] text-[10px] font-mono text-[var(--text-muted)] border border-white/10">
                      {tField(selectedMilestone.period, locale)}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white">
                    {tField(selectedMilestone.role, locale)}
                  </h3>
                  <p className="font-mono text-xs text-[var(--text-secondary)] mt-1">
                    {renderWithPartnerLink(tField(selectedMilestone.organization, locale))}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedMilestone(null)}
                  className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white transition-colors cursor-pointer"
                  aria-label="Close Modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Summary */}
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {renderWithPartnerLink(tField(selectedMilestone.summary, locale))}
              </p>

              {/* Deliverables */}
              <div className="space-y-2.5">
                <span className="font-mono text-xs uppercase text-[var(--text-muted)] tracking-wider block font-semibold">
                  {isId ? 'Tanggung Jawab & Rekayasa Utama:' : 'Key Engineering Deliverables:'}
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                  {(selectedMilestone.deliverables[locale] ?? selectedMilestone.deliverables.en).map(
                    (item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Technologies */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-wrap gap-2">
                {selectedMilestone.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full theme-chip font-mono text-xs text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
