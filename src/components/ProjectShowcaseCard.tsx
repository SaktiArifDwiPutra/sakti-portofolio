'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, type Locale } from '@/i18n/routing';
import type { ProjectEntry } from '@/data/portfolio';
import { tField } from '@/data/portfolio';
import { ProjectInteractiveStage } from '@/components/ProjectInteractiveStage';
import { ArrowUpRight, ExternalLink, Play, Layers, Sparkles, CheckCircle2, User } from 'lucide-react';
import { GithubIcon } from '@/components/SocialIcons';

interface ProjectShowcaseCardProps {
  project: ProjectEntry;
  orderNumber: string;
}

export function ProjectShowcaseCard({ project, orderNumber }: ProjectShowcaseCardProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations('projectDetail');
  const homeT = useTranslations('home');

  // Interactive mode tab: 'simulator' or 'blueprint'
  const [activeView, setActiveView] = useState<'simulator' | 'blueprint'>('simulator');

  return (
    <article className="group relative rounded-3xl bg-[var(--bg-surface)] border border-white/[0.08] hover:border-[var(--accent-primary)]/40 transition-all duration-300 p-6 sm:p-8 lg:p-10 shadow-xl hover:shadow-2xl hover:shadow-[var(--accent-primary)]/5">
      {/* Top Meta Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold text-[var(--accent-primary)] tracking-wider">
            {orderNumber}
          </span>
          <span className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-[var(--text-secondary)]">
            {tField(project.category, locale)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--accent-primary)]" />
          <span className="font-mono text-xs text-[var(--text-muted)]">
            {tField(project.status, locale)}
          </span>
        </div>
      </div>

      {/* Main Grid: Description + Interactive Visualizer */}
      <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Context, Narrative & Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white group-hover:text-[var(--accent-primary)] transition-colors tracking-tight">
              {project.name}
            </h3>
            <p className="font-mono text-xs text-[var(--accent-primary)] mt-1 tracking-wide">
              {tField(project.tagline, locale)}
            </p>
          </div>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            {tField(project.description, locale)}
          </p>

          {/* Key Architecture Highlights */}
          <div className="space-y-2 pt-2">
            <span className="font-mono text-xs uppercase text-[var(--text-muted)] tracking-wider block">
              {locale === 'id' ? 'Sorotan Rekayasa:' : 'Engineering Highlights:'}
            </span>
            <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
              {project.features.slice(0, 3).map((feat) => (
                <li key={feat.code} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white font-medium">{tField(feat.title, locale)}:</strong>{' '}
                    {tField(feat.description, locale)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Chips */}
          <div className="pt-2">
            <span className="font-mono text-xs uppercase text-[var(--text-muted)] tracking-wider block mb-2">
              Technology Stack
            </span>
            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[var(--text-primary)] hover:border-[var(--accent-primary)]/50 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent-primary)] text-[var(--accent-primary-ink)] font-mono text-xs font-bold uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-md"
            >
              <span>{homeT('readCaseStudy')}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>

            {project.links.repository && (
              <a
                href={project.links.repository}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-white font-mono text-xs font-medium hover:border-[var(--accent-primary)]/40 transition-all"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>Source Code</span>
              </a>
            )}

            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md ${
                  project.slug === 'critiplay'
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black hover:scale-[1.02] shadow-cyan-500/20'
                    : 'bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-[var(--accent-primary)] hover:border-[var(--accent-primary)]'
                }`}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>{project.slug === 'critiplay' ? 'Live Link Preview' : 'Live Demo'}</span>
              </a>
            )}

            {project.links.collaborator && (
              <div className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] font-mono text-xs">
                <span className="text-[var(--text-muted)]">
                  {locale === 'id' ? 'Mitra Kolaborasi:' : 'Collaborator:'}
                </span>
                <a
                  href={project.links.collaborator.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 font-bold underline underline-offset-4 decoration-cyan-400/50 hover:decoration-cyan-300 transition-colors cursor-pointer"
                  title="GitHub: Khairul (@Kyunn17)"
                >
                  Khairul
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Interactive Test-Bench & Blueprint Stage */}
        <div className="lg:col-span-7 space-y-4">
          {/* Mode Switcher Tab */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveView('simulator')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs transition-all ${
                  activeView === 'simulator'
                    ? 'bg-[var(--accent-primary)] text-[var(--accent-primary-ink)] font-bold shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <Play className="h-3 w-3" />
                <span>
                  {project.slug === 'critiplay'
                    ? (locale === 'id' ? 'Live Link Preview' : 'Live Link Preview')
                    : (locale === 'id' ? 'Simulator Interaktif' : 'Live Interactive Simulator')}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveView('blueprint')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs transition-all ${
                  activeView === 'blueprint'
                    ? 'bg-[var(--accent-primary)] text-[var(--accent-primary-ink)] font-bold shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <Layers className="h-3 w-3" />
                <span>{locale === 'id' ? 'Skematik Arsitektur' : 'System Blueprint'}</span>
              </button>
            </div>

            <span className="font-mono text-[11px] text-[var(--text-muted)] hidden sm:inline">
              {project.slug === 'critiplay' ? 'LIVE DEPLOYMENT' : 'LIVE TEST BENCH'}
            </span>
          </div>

          {/* Interactive Screen Container */}
          <div className="rounded-2xl border border-white/[0.08] bg-[var(--bg-canvas)] p-3 sm:p-5 shadow-inner min-h-[380px] flex flex-col justify-center">
            {activeView === 'simulator' ? (
              <ProjectInteractiveStage slug={project.slug} locale={locale} />
            ) : (
              <div className="space-y-4">
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/[0.08] bg-[var(--bg-elevated)] flex items-center justify-center">
                  <Image
                    src={project.coverImage}
                    alt={`${project.name} Architecture Blueprint`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                    <p className="font-mono text-xs text-white">
                      {project.name} — Technical Architecture Diagram
                    </p>
                  </div>
                </div>

                {/* Layer Anatomy Snapshot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  {project.anatomyLayers.slice(0, 2).map((layer) => (
                    <div
                      key={layer.id}
                      className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]"
                    >
                      <span className="text-[var(--accent-primary)] block font-semibold">
                        {layer.code} / {tField(layer.layerName, locale)}
                      </span>
                      <span className="text-[var(--text-muted)] block text-[11px] mt-0.5">
                        {layer.tech}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
