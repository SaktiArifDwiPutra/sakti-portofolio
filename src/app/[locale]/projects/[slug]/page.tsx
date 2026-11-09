import React from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link, routing, type Locale } from '@/i18n/routing';
import {
  PROJECTS,
  getProjectBySlug,
  getAdjacentProjects,
  tField,
} from '@/data/portfolio';
import { ProjectAnatomyDiagram } from '@/components/ProjectAnatomyDiagram';
import { ProjectInteractiveStage } from '@/components/ProjectInteractiveStage';
import { ContactSection } from '@/components/ContactSection';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { GithubIcon } from '@/components/SocialIcons';

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const project of PROJECTS) {
      params.push({ locale, slug: project.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: 'Not Found' };
  }
  const loc = (routing.locales.includes(locale as Locale) ? locale : 'en') as Locale;
  return {
    title: `${project.name} — ${tField(project.category, loc)}`,
    description: tField(project.description, loc),
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'projectDetail' });
  const { prev, next } = getAdjacentProjects(project.slug);
  const overviewParagraphs =
    project.editorialOverview[locale] ?? project.editorialOverview.en;

  return (
    <div className="space-y-20 sm:space-y-28">
      <article className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 space-y-12 sm:space-y-16 pt-6 sm:pt-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/projects"
            prefetch={true}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full theme-chip font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{t('backToCatalog')}</span>
          </Link>

          <span className="font-mono text-xs text-[var(--accent-primary)] font-bold tracking-wider">
            CASE STUDY // {project.index}
          </span>
        </div>

        {/* Hero Banner Card */}
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl theme-card shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full theme-chip text-xs font-mono text-[var(--accent-primary)] font-medium">
                <span>{tField(project.category, locale)}</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight leading-[1.05]">
                {project.name}
              </h1>

              <p className="font-mono text-sm sm:text-base text-[var(--accent-primary)] font-medium">
                {tField(project.tagline, locale)}
              </p>

              <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed break-words">
                {tField(project.description, locale)}
              </p>

              {/* Action Links */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {project.links.repository && (
                  <a
                    href={project.links.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive-btn interactive-btn-secondary px-5 py-2.5 text-xs font-mono"
                  >
                    <GithubIcon className="h-4 w-4" />
                    <span>{t('repoLink')}</span>
                  </a>
                )}

                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive-btn interactive-btn-primary px-5 py-2.5 text-xs font-mono shadow-md"
                  >
                    <span>{t('demoLink')}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Spec Sheet Column */}
            <div className="lg:col-span-4 p-6 rounded-2xl theme-chip space-y-4 font-mono text-xs">
              <div className="pb-3 border-b border-[var(--border-hairline)]">
                <span className="text-[var(--text-muted)] block mb-1 font-medium">{t('roleLabel')}</span>
                <span className="text-[var(--text-primary)] font-semibold text-sm">{tField(project.role, locale)}</span>
              </div>

              <div className="pb-3 border-b border-[var(--border-hairline)]">
                <span className="text-[var(--text-muted)] block mb-1 font-medium">{t('statusLabel')}</span>
                <span className="text-[var(--accent-primary)] font-semibold">{tField(project.status, locale)}</span>
              </div>

              <div>
                <span className="text-[var(--text-muted)] block mb-2 font-medium">{t('stackLabel')}</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-full theme-chip text-[var(--text-primary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Interactive Test Bench Stage */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-hairline)]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
              <h2 className="font-display font-bold text-xl text-[var(--text-primary)]">
                Live Interactive Architecture Stage
              </h2>
            </div>
            <span className="font-mono text-xs text-[var(--text-muted)]">
              TEST BENCH
            </span>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl theme-card shadow-xl overflow-hidden">
            <ProjectInteractiveStage slug={project.slug} locale={locale} />
          </div>
        </div>

        {/* Executive Overview Narrative */}
        <section className="p-8 sm:p-12 rounded-3xl theme-card space-y-6 shadow-xl">
          <span className="font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider block">
            {t('overviewHeading')}
          </span>
          <div className="space-y-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-4xl">
            {overviewParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </section>

        {/* System Anatomy Diagram */}
        <section className="space-y-4">
          <div className="pb-3 border-b border-[var(--border-hairline)]">
            <span className="font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider block">
              {t('anatomyHeading')}
            </span>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              {t('anatomySub')}
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl theme-card shadow-xl">
            <ProjectAnatomyDiagram project={project} locale={locale} />
          </div>
        </section>

        {/* Key Features & Functional Capabilities */}
        <section className="space-y-6">
          <div className="pb-3 border-b border-[var(--border-hairline)]">
            <span className="font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider block">
              {t('featuresHeading')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.features.map((feat) => (
              <div
                key={feat.code}
                className="p-6 sm:p-8 rounded-3xl theme-card hover:border-[var(--accent-primary)]/40 transition-all shadow-lg flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--border-hairline)] mb-4">
                    <span className="font-mono text-xs font-bold text-[var(--accent-primary)]">
                      {feat.code}
                    </span>
                    <CheckCircle2 className="h-4 w-4 text-[var(--accent-primary)]" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                    {tField(feat.title, locale)}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {tField(feat.description, locale)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Engineering Challenges & Solutions */}
        <section className="space-y-6">
          <div className="pb-3 border-b border-[var(--border-hairline)]">
            <span className="font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider block">
              {t('challengesHeading')}
            </span>
          </div>

          <div className="space-y-6">
            {project.challenges.map((ch, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl theme-card shadow-xl space-y-4"
              >
                <h3 className="font-display font-bold text-xl text-[var(--text-primary)]">
                  {tField(ch.title, locale)}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl theme-chip">
                    <span className="font-mono text-xs text-[var(--accent-secondary)] font-bold block mb-2">
                      PROBLEM / BOTTLENECK
                    </span>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {tField(ch.problem, locale)}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl theme-chip">
                    <span className="font-mono text-xs text-[var(--accent-primary)] font-bold block mb-2">
                      ARCHITECTURAL RESOLUTION
                    </span>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {tField(ch.solution, locale)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Adjacent Navigation */}
        <nav
          aria-label="Monograph pagination"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6"
        >
          <Link
            href={`/projects/${prev.slug}`}
            prefetch={true}
            className="p-6 rounded-2xl theme-card hover:border-[var(--accent-primary)]/40 transition-all group flex items-center justify-between"
          >
            <div>
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase block">
                PREVIOUS PROJECT
              </span>
              <span className="font-display font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                ← {prev.name}
              </span>
            </div>
          </Link>

          <Link
            href={`/projects/${next.slug}`}
            prefetch={true}
            className="p-6 rounded-2xl theme-card hover:border-[var(--accent-primary)]/40 transition-all group flex items-center justify-between sm:text-right"
          >
            <div className="sm:ml-auto">
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase block">
                NEXT PROJECT
              </span>
              <span className="font-display font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                {next.name} →
              </span>
            </div>
          </Link>
        </nav>
      </article>

      {/* Contact Section */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <ContactSection />
      </section>
    </div>
  );
}
