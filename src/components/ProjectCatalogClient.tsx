'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, type Locale } from '@/i18n/routing';
import {
  PROJECTS,
  tField,
  type DisciplineGroup,
} from '@/data/portfolio';
import { ProjectAnatomyDiagram } from './ProjectAnatomyDiagram';
import { ProjectInteractiveStage } from './ProjectInteractiveStage';
import { ArrowUpRight, Layers, Play, Eye, CheckCircle2 } from 'lucide-react';

interface ProjectCatalogClientProps {
  locale: Locale;
}

export function ProjectCatalogClient({ locale }: ProjectCatalogClientProps) {
  const t = useTranslations('projectsPage');
  const [filter, setFilter] = useState<'all' | DisciplineGroup>('all');
  const [activeStageSlug, setActiveStageSlug] = useState<string | null>(null);

  const filteredProjects =
    filter === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.disciplineGroup === filter);

  return (
    <div className="space-y-8">
      {/* Page-Level Filter Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[var(--bg-surface)] border border-white/[0.08] shadow-md">
        <div
          role="group"
          aria-label="Filter projects by discipline"
          className="flex flex-wrap gap-2"
        >
          {(
            [
              { id: 'all', label: t('filterAll'), count: PROJECTS.length },
              {
                id: 'fullstack',
                label: t('filterFullStack'),
                count: PROJECTS.filter((p) => p.disciplineGroup === 'fullstack')
                  .length,
              },
              {
                id: 'gamedev',
                label: t('filterGame'),
                count: PROJECTS.filter((p) => p.disciplineGroup === 'gamedev')
                  .length,
              },
            ] as const
          ).map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                aria-pressed={active}
                className={`px-4 py-2 rounded-full font-mono text-xs transition-all ${
                  active
                    ? 'bg-[var(--accent-primary)] text-[var(--accent-primary-ink)] font-bold shadow-md'
                    : 'bg-white/[0.04] text-[var(--text-secondary)] hover:text-white hover:bg-white/[0.08] border border-white/[0.08]'
                }`}
              >
                <span>{tab.label}</span>
                <span className="opacity-70 ml-1.5 font-semibold">[{tab.count}]</span>
              </button>
            );
          })}
        </div>

        <span className="font-mono text-xs text-[var(--text-muted)]">
          SHOWING 0{filteredProjects.length} / 0{PROJECTS.length} WORKS
        </span>
      </div>

      {/* Modern Showcase Cards Grid */}
      <div className="space-y-8 sm:space-y-12">
        {filteredProjects.map((project) => {
          const isStageOpen = activeStageSlug === project.slug;

          return (
            <article
              key={project.slug}
              className="group rounded-3xl bg-[var(--bg-surface)] border border-white/[0.08] hover:border-[var(--accent-primary)]/40 p-6 sm:p-8 lg:p-10 transition-all duration-300 shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Column: Metadata & Narrative */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
                    <span className="font-mono text-xs font-bold text-[var(--accent-primary)] tracking-wider">
                      {project.index} // {tField(project.category, locale).toUpperCase()}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-[var(--text-secondary)]">
                      {tField(project.status, locale)}
                    </span>
                  </div>

                  <div>
                    <h2 className="font-display text-2xl sm:text-4xl text-white font-bold tracking-tight mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                      <Link href={`/projects/${project.slug}`}>
                        {project.name}
                      </Link>
                    </h2>
                    <p className="font-mono text-xs text-[var(--accent-primary)] mb-4">
                      {tField(project.tagline, locale)}
                    </p>
                    <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                      {tField(project.description, locale)}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <span className="font-mono text-xs uppercase text-[var(--text-muted)] tracking-wider block">
                      {t('stackLabel')}
                    </span>
                    <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[var(--text-primary)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent-primary)] text-[var(--accent-primary-ink)] font-mono text-xs font-bold uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-md"
                    >
                      <span>{t('inspectProject')}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        setActiveStageSlug(isStageOpen ? null : project.slug)
                      }
                      aria-expanded={isStageOpen}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-mono text-white transition-colors"
                    >
                      <Play className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                      <span>{isStageOpen ? 'Close Stage' : 'Test Drive Stage'}</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Visual Blueprint or Interactive Stage */}
                <div className="lg:col-span-7 space-y-4">
                  {isStageOpen ? (
                    <div className="rounded-2xl border border-white/[0.08] bg-[var(--bg-canvas)] p-4 sm:p-6 shadow-inner">
                      <ProjectInteractiveStage slug={project.slug} locale={locale} />
                    </div>
                  ) : (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group/media relative block overflow-hidden rounded-2xl border border-white/[0.08] bg-[var(--bg-canvas)] aspect-video shadow-md"
                    >
                      <Image
                        src={project.coverImage}
                        alt={`${project.name} — ${tField(project.tagline, locale)}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover/media:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-4 sm:p-6">
                        <span className="font-mono text-xs text-white">
                          {project.name} — System Architecture &amp; UI
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/20 font-mono text-[11px] text-[var(--accent-primary)] backdrop-blur-md">
                          <Eye className="h-3.5 w-3.5" />
                          <span>Case Study</span>
                        </span>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
