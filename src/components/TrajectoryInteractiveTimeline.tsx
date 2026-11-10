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
  Layers,
  MapPin,
  CheckCircle2,
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
    url: 'https://kyunn.itch.io/daus-anak-sholeh',
    labelId: 'Mainkan di itch.io',
    labelEn: 'Play on itch.io',
    icon: 'game',
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
      {/* Journey Map Header Telemetry */}
      <div className="p-5 sm:p-7 rounded-2xl theme-card border border-white/[0.08] shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
            <Compass className="h-5 w-5 animate-spin-slow" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase text-[var(--accent-primary)] font-bold tracking-wider block">
              EXPEDITION PATH // 2025 - 2026
            </span>
            <h3 className="font-display font-bold text-lg text-white">
              {isId ? 'Peta Perjalanan Rekayasa & Game' : 'Engineering & Game Dev Journey'}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
          <MapPin className="h-4 w-4 text-emerald-400" />
          <span>{experiences.length} {isId ? 'Titik Singgah Perjalanan' : 'Waypoints Tracked'}</span>
        </div>
      </div>

      {/* Winding Downward Journey Path */}
      <div className="relative max-w-4xl mx-auto py-6">
        {/* Central Glowing Journey Path Line */}
        <div
          aria-hidden="true"
          className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-cyan-400 via-purple-500 to-amber-400 shadow-[0_0_15px_rgba(0,240,255,0.4)] rounded-full"
        />

        {/* Milestone Steps Along the Path */}
        <div className="space-y-16 sm:space-y-24">
          {experiences.map((exp, idx) => {
            const isEven = idx % 2 === 0;
            const coverImage = PROJECT_COVERS[exp.id];
            const action = PROJECT_ACTIONS[exp.id];

            return (
              <div key={exp.id} className="relative flex flex-col md:flex-row items-center">
                {/* 1. Date Stamped Directly On The Journey Path */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                  {/* Glowing Node Dot */}
                  <span
                    className={`h-5 w-5 rounded-full border-2 bg-black shadow-lg transition-transform hover:scale-125 ${
                      exp.isPlaceholder
                        ? 'border-amber-400 shadow-amber-500/40'
                        : 'border-cyan-400 shadow-[0_0_12px_#00f0ff]'
                    }`}
                  />

                  {/* Date Pill Stamped Right On Path */}
                  <div className="mt-2 px-3 py-1 rounded-full bg-black/90 border border-white/20 text-[11px] font-mono text-cyan-300 font-bold whitespace-nowrap backdrop-blur-md shadow-xl flex items-center gap-1.5">
                    <Calendar className="h-3 w-3 text-[var(--accent-primary)]" />
                    <span>{tField(exp.period, locale)}</span>
                  </div>
                </div>

                {/* 2. Compact Square Card Layout (Alternating Left & Right on Desktop) */}
                <div
                  className={`w-full pl-14 md:pl-0 md:w-1/2 mt-12 md:mt-0 ${
                    isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto md:text-left'
                  }`}
                >
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setSelectedMilestone(exp)}
                    className="group relative max-w-[320px] mx-auto md:mx-0 rounded-2xl theme-card border border-white/[0.08] hover:border-[var(--accent-primary)]/60 p-4 shadow-xl cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/10"
                  >
                    {/* Square Cover Photo Frame */}
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-white/[0.08] bg-black/60 shadow-inner group-hover:border-[var(--accent-primary)]/40 transition-colors">
                      {coverImage ? (
                        <Image
                          src={coverImage}
                          alt={tField(exp.role, locale)}
                          fill
                          sizes="320px"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-mono text-xs text-neutral-500">
                          PROTOTYPE
                        </div>
                      )}

                      {/* Vignette Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

                      {/* Top Corner Entry Number */}
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/80 border border-white/15 text-[10px] font-mono font-bold text-[var(--accent-primary)] backdrop-blur-md">
                        NO. {exp.index}
                      </span>

                      {/* Status Tag */}
                      <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/80 border border-white/15 text-[9px] font-mono text-white/80 backdrop-blur-md">
                        {exp.isPlaceholder ? (isId ? 'Pengerjaan' : 'In-Progress') : (isId ? 'Rilis' : 'Released')}
                      </span>

                      {/* Bottom Title on Image */}
                      <div className="absolute bottom-2.5 inset-x-2.5 text-left">
                        <h4 className="font-display font-bold text-sm sm:text-base text-white truncate drop-shadow-md">
                          {tField(exp.organization, locale).replace(/Proyek Sekolah |Produksi Game Indie |Sistem POS & Inventaris Apotek |Platform Penyiaran Event Real-Time |Proyek Kolaborasi /g, '')}
                        </h4>
                        <p className="font-mono text-[10px] text-cyan-300 truncate">
                          {tField(exp.role, locale)}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="mt-3 flex items-center justify-between gap-2 text-left">
                      <span className="font-mono text-[10px] text-[var(--text-muted)] group-hover:text-white transition-colors flex items-center gap-1">
                        <span>{isId ? 'Buka Rincian' : 'View Specs'}</span>
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
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Milestone Modal (Opens on clicking any square card) */}
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
                  {(selectedMilestone.deliverables[locale] ?? selectedMilestone.deliverables.en).map((item, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
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
