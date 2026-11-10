'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { ExperienceEntry } from '@/data/portfolio';
import { tField } from '@/data/portfolio';
import type { Locale } from '@/i18n/routing';
import {
  Calendar,
  ChevronRight,
  ExternalLink,
  Gamepad2,
  Globe,
  Layers,
  Sparkles,
  CheckCircle2,
  Clock,
  Code2,
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
    labelId: 'Buka Live CritiPlay',
    labelEn: 'Open Live CritiPlay',
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
  const [activeNodeId, setActiveNodeId] = useState<string>(experiences[0]?.id || '');

  const scrollToNode = (id: string) => {
    setActiveNodeId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Top Telemetry & Timeline Navigation Bar */}
      <div className="p-4 sm:p-6 rounded-2xl theme-card border border-white/[0.08] shadow-lg space-y-4">
        {/* Telemetry Stat Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.06] text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[var(--accent-primary)] font-bold">TIMELINE TELEMETRY</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--text-muted)]">
            <span className="px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
              {experiences.length} {isId ? 'Milestone' : 'Milestones'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
              2 {isId ? 'Sistem Produksi' : 'Live Platforms'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
              1 {isId ? 'Game Edukasi' : 'Published Game'}
            </span>
          </div>
        </div>

        {/* Interactive Milestones Time Travel Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {experiences.map((exp) => {
            const isActive = activeNodeId === exp.id;
            const shortName = exp.id === 'exp-pilketos-school'
              ? 'Pilketos'
              : exp.id === 'exp-daus-gamedev'
              ? 'Daus Anak Soleh'
              : exp.id === 'exp-obathaus'
              ? 'Obat Haus'
              : exp.id === 'exp-coordina'
              ? 'Coordina'
              : exp.id === 'exp-critiplay-collab'
              ? 'CritiPlay'
              : 'Dragonhold';

            return (
              <button
                key={exp.id}
                type="button"
                onClick={() => scrollToNode(exp.id)}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs whitespace-nowrap transition-all border shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[var(--accent-primary)] text-black font-bold border-[var(--accent-primary)] shadow-md shadow-[var(--accent-primary)]/20 scale-105'
                    : 'bg-white/[0.02] text-[var(--text-secondary)] border-white/[0.08] hover:border-white/20 hover:text-white'
                }`}
              >
                <span>{exp.index} // {shortName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Trajectory Visual Feed */}
      <div className="relative pl-6 sm:pl-8 space-y-10 sm:space-y-14 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-[var(--accent-primary)] before:via-white/10 before:to-transparent">
        {experiences.map((exp) => {
          const deliverables = exp.deliverables[locale] ?? exp.deliverables.en;
          const coverImage = PROJECT_COVERS[exp.id];
          const action = PROJECT_ACTIONS[exp.id];
          const isActive = activeNodeId === exp.id;

          return (
            <div
              key={exp.id}
              id={exp.id}
              onClick={() => setActiveNodeId(exp.id)}
              className="relative group transition-all duration-300"
            >
              {/* Glowing Node on Rail */}
              <div className="absolute -left-[27px] sm:-left-[35px] top-4 flex items-center justify-center">
                <span
                  className={`h-4 w-4 rounded-full bg-[var(--bg-canvas)] border-2 transition-all shadow-md ${
                    isActive
                      ? 'border-[var(--accent-primary)] scale-125 shadow-[0_0_12px_var(--accent-primary)]'
                      : exp.isPlaceholder
                      ? 'border-dashed border-amber-500/70 shadow-amber-500/20'
                      : 'border-white/40 group-hover:border-[var(--accent-primary)] group-hover:scale-110'
                  }`}
                />
              </div>

              {/* Milestone Card */}
              <article
                className={`rounded-3xl theme-card p-6 sm:p-9 transition-all duration-300 shadow-xl border ${
                  isActive
                    ? 'border-[var(--accent-primary)]/60 bg-[var(--bg-elevated)] shadow-2xl shadow-[var(--accent-primary)]/10 ring-1 ring-[var(--accent-primary)]/20'
                    : exp.isPlaceholder
                    ? 'border-dashed border-amber-500/30 bg-[var(--bg-canvas)]/40 hover:border-amber-500/60'
                    : 'border-white/[0.08] hover:border-[var(--accent-primary)]/40 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/5'
                }`}
              >
                {/* Milestone Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/[0.08]">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-mono text-xs font-bold text-[var(--accent-primary)] uppercase">
                        ENTRY // {exp.index}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full theme-chip text-[10px] font-mono text-[var(--text-muted)]">
                        {exp.isPlaceholder ? (isId ? 'Dalam Pengerjaan' : 'In Progress') : (isId ? 'Rilis Rekayasa' : 'Engineering Release')}
                      </span>
                    </div>

                    <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--text-primary)]">
                      {tField(exp.role, locale)}
                    </h2>
                    <p className="font-mono text-xs sm:text-sm text-[var(--text-secondary)] mt-1 font-medium">
                      {renderWithPartnerLink(tField(exp.organization, locale))}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full theme-chip text-xs font-mono text-[var(--text-primary)]">
                    <Calendar className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                    <span>{tField(exp.period, locale)}</span>
                  </div>
                </div>

                {/* Card Content Grid: Narrative Left, Visual Mockup Right */}
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Narrative & Deliverables */}
                  <div className="lg:col-span-7 space-y-4">
                    <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                      {renderWithPartnerLink(tField(exp.summary, locale))}
                    </p>

                    {/* Deliverables Bullet List */}
                    <div className="space-y-2 pt-2">
                      <span className="font-mono text-[11px] uppercase text-[var(--text-muted)] tracking-wider block font-semibold">
                        {isId ? 'Pencapaian & Kontribusi Utama:' : 'Key Deliverables & Responsibilities:'}
                      </span>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--text-secondary)]">
                        {deliverables.map((item, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2">
                            <ChevronRight className="h-4 w-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Visual Screenshot Mockup & Direct Test Drive Action */}
                  <div className="lg:col-span-5 space-y-3">
                    {coverImage && (
                      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/[0.1] bg-black/60 shadow-lg group/img">
                        <Image
                          src={coverImage}
                          alt={tField(exp.role, locale)}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                        {/* Visual Badge overlay */}
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono text-white/90">
                          <span className="px-2 py-0.5 rounded bg-black/75 border border-white/20">
                            {tField(exp.domain, locale)}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Direct Action Link Button if Live Preview Exists */}
                    {action && (
                      <a
                        href={action.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-cyan-500/20 active:scale-[0.98] cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {action.icon === 'game' ? (
                          <Gamepad2 className="h-4 w-4 text-black" />
                        ) : (
                          <Globe className="h-4 w-4 text-black" />
                        )}
                        <span>{isId ? action.labelId : action.labelEn}</span>
                        <ExternalLink className="h-3.5 w-3.5 text-black" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Tech Pills Bar */}
                <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full theme-chip font-mono text-xs text-[var(--text-primary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
}
