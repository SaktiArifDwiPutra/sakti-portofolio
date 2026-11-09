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
import { ArrowUpRight, Layers, Eye } from 'lucide-react';

interface ProjectCatalogClientProps {
  locale: Locale;
}

export function ProjectCatalogClient({ locale }: ProjectCatalogClientProps) {
  const t = useTranslations('projectsPage');
  const [filter, setFilter] = useState<'all' | DisciplineGroup>('all');
  const [expandedAnatomySlug, setExpandedAnatomySlug] = useState<string | null>(
    'critiplay'
  );

  const filteredProjects =
    filter === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.disciplineGroup === filter);

  return (
    <div>
      {/* Page-Level Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline bg-surface px-6 py-4">
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
                className={`interactive-btn min-h-[40px] px-4 py-2 font-mono text-xs ${
                  active
                    ? 'interactive-btn-primary'
                    : 'interactive-btn-secondary'
                }`}
              >
                <span>{tab.label}</span>
                <span className="opacity-75">[{tab.count}]</span>
              </button>
            );
          })}
        </div>

        <span className="font-mono text-xs text-muted-ink">
          SHOWING 0{filteredProjects.length} / 0{PROJECTS.length} MONOGRAPHS
        </span>
      </div>

      {/* Sequential Editorial Dossier Rows */}
      <div className="divide-y divide-[var(--border-hairline)]">
        {filteredProjects.map((project) => {
          const isGame = project.disciplineGroup === 'gamedev';
          const isAnatomyOpen = expandedAnatomySlug === project.slug;

          return (
            <article
              key={project.slug}
              className="group bg-canvas transition-colors"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border-hairline)]">
                {/* Left Column: Index, Role & Metadata */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-8">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span
                        className={`font-mono text-xs font-bold tracking-wider ${
                          isGame ? 'text-accent-ochre' : 'text-accent'
                        }`}
                      >
                        {project.index} //{' '}
                        {tField(project.category, locale).toUpperCase()}
                      </span>
                      <span className="font-mono text-[11px] px-2.5 py-0.5 border border-hairline bg-surface text-secondary-ink">
                        {tField(project.status, locale)}
                      </span>
                    </div>

                    <h2 className="font-display text-3xl sm:text-4xl text-primary-ink font-bold tracking-tight mb-3">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="hover:text-accent transition-colors"
                      >
                        {project.name}
                      </Link>
                    </h2>

                    <p className="text-base text-secondary-ink leading-relaxed mb-6">
                      {tField(project.description, locale)}
                    </p>

                    {/* Role & Stack Specification Table */}
                    <dl className="border-t border-hairline divide-y divide-[var(--border-hairline)] text-xs font-mono">
                      <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
                        <dt className="text-muted-ink">{t('roleLabel')}</dt>
                        <dd className="text-primary-ink sm:text-right">
                          {tField(project.role, locale)}
                        </dd>
                      </div>
                      <div className="py-3 flex flex-col gap-2">
                        <dt className="text-muted-ink">{t('stackLabel')}</dt>
                        <dd className="flex flex-wrap gap-1.5">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 border border-hairline bg-surface text-primary-ink"
                            >
                              {tech}
                            </span>
                          ))}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {/* Primary & Secondary Actions (1-to-3 Rule) */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="interactive-btn interactive-btn-primary min-h-[44px] px-5 py-2.5 text-xs font-mono"
                    >
                      <span>{t('inspectProject')}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        setExpandedAnatomySlug(
                          isAnatomyOpen ? null : project.slug
                        )
                      }
                      aria-expanded={isAnatomyOpen}
                      className="interactive-btn interactive-btn-secondary min-h-[44px] px-4 py-2.5 text-xs font-mono"
                    >
                      <Layers className="h-4 w-4" />
                      <span>{t('architecturePreview')}</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Visual Blueprint Frame & Interactive Anatomy */}
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 bg-surface flex flex-col justify-between gap-6">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group/media relative block overflow-hidden border border-hairline bg-canvas aspect-video focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)]"
                  >
                    <Image
                      src={project.coverImage}
                      alt={`${project.name} — ${tField(project.tagline, locale)}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover transition-transform duration-300 ease-out group-hover/media:scale-[1.02]"
                    />
                    <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 border border-hairline bg-[var(--bg-glass)] px-3 py-1.5 font-mono text-[11px] text-primary-ink backdrop-blur-sm">
                      <Eye className="h-3.5 w-3.5 text-accent" />
                      <span>{t('inspectProject')}</span>
                    </div>
                  </Link>

                  {isAnatomyOpen && (
                    <ProjectAnatomyDiagram
                      project={project}
                      locale={locale}
                      compact
                    />
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

