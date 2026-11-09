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
import { ProjectGalleryViewer } from '@/components/ProjectGalleryViewer';
import { ContactSection } from '@/components/ContactSection';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldAlert,
  Wrench,
} from 'lucide-react';

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
  const isGame = project.disciplineGroup === 'gamedev';
  const overviewParagraphs =
    project.editorialOverview[locale] ?? project.editorialOverview.en;

  return (
    <div>
      <article className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 mb-16 sm:mb-24">
        <div className="border-x border-b border-hairline bg-canvas">
          {/* Top Breadcrumb & Index Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline bg-surface px-6 py-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-mono text-xs text-secondary-ink hover:text-accent transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{t('backToCatalog')}</span>
            </Link>
            <span
              className={`font-mono text-xs font-bold tracking-wider ${
                isGame ? 'text-accent-ochre' : 'text-accent'
              }`}
            >
              CASE STUDY // MONOGRAPH {project.index}
            </span>
          </div>

          {/* Editorial Title & Metadata Dossier Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-hairline divide-y lg:divide-y-0 lg:divide-x divide-[var(--border-hairline)]">
            <div className="lg:col-span-8 p-6 sm:p-10 lg:p-14 flex flex-col justify-between gap-6">
              <div>
                <span className="inline-block font-mono text-xs px-3 py-1 border border-hairline bg-surface text-secondary-ink mb-4">
                  {tField(project.category, locale)}
                </span>
                <h1 className="font-display text-4xl sm:text-6xl font-bold text-primary-ink leading-[1.05] mb-5 tracking-tight">
                  {project.name}
                </h1>
                <p className="text-lg sm:text-xl text-secondary-ink leading-relaxed max-w-2xl">
                  {tField(project.tagline, locale)}
                </p>
              </div>

              {/* Cover Plate Frame */}
              <div className="relative aspect-video w-full overflow-hidden border border-hairline bg-[#111315] mt-4">
                <Image
                  src={project.coverImage}
                  alt={`${project.name} — ${tField(project.tagline, locale)}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Specification Sidebar */}
            <aside className="lg:col-span-4 bg-surface divide-y divide-[var(--border-hairline)] flex flex-col justify-between">
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <span className="block font-mono text-xs text-muted-ink mb-1">
                    {t('roleLabel')}
                  </span>
                  <p className="text-sm font-semibold text-primary-ink">
                    {tField(project.role, locale)}
                  </p>
                </div>

                <div>
                  <span className="block font-mono text-xs text-muted-ink mb-1">
                    {t('statusLabel')}
                  </span>
                  <p className="font-mono text-xs text-accent">
                    {tField(project.status, locale)}
                  </p>
                </div>

                <div>
                  <span className="block font-mono text-xs text-muted-ink mb-2.5">
                    {t('stackLabel')}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs px-2.5 py-1 border border-hairline bg-canvas text-primary-ink"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* External Repository / Demo Links */}
              <div className="p-6 sm:p-8 bg-elevated">
                <span className="block font-mono text-xs text-muted-ink mb-3">
                  {t('linksLabel')}
                </span>

                {project.links.repository || project.links.demo ? (
                  <div className="flex flex-col gap-2.5">
                    {project.links.repository && (
                      <a
                        href={project.links.repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="interactive-btn interactive-btn-primary min-h-[44px] w-full justify-between px-4 py-2 font-mono text-xs"
                      >
                        <span>{t('repoLink')}</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="interactive-btn interactive-btn-secondary min-h-[44px] w-full justify-between px-4 py-2 font-mono text-xs"
                      >
                        <span>{t('demoLink')}</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="border border-hairline bg-canvas p-4">
                    <span className="block font-mono text-xs font-semibold text-primary-ink mb-1">
                      {t('linksPending')}
                    </span>
                    {project.links.note && (
                      <p className="font-mono text-[11px] text-muted-ink leading-relaxed">
                        {tField(project.links.note, locale)}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </aside>
          </div>

          {/* 01 / Executive Editorial Overview + 03 / Features */}
          <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-hairline divide-y lg:divide-y-0 lg:divide-x divide-[var(--border-hairline)]">
            <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12">
              <h2 className="font-mono text-xs font-bold tracking-wider text-accent uppercase mb-4">
                {t('overviewHeading')}
              </h2>
              <div className="space-y-4 text-base text-secondary-ink leading-relaxed">
                {overviewParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 bg-surface/40">
              <h2 className="font-mono text-xs font-bold tracking-wider text-accent uppercase mb-6">
                {t('featuresHeading')}
              </h2>
              <div className="space-y-5">
                {project.features.map((feature) => (
                  <div
                    key={feature.code}
                    className="border border-hairline bg-canvas p-5"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs font-bold text-accent">
                        {feature.code}
                      </span>
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                    </div>
                    <h3 className="text-base font-bold text-primary-ink mb-1.5">
                      {tField(feature.title, locale)}
                    </h3>
                    <p className="text-sm text-secondary-ink leading-relaxed">
                      {tField(feature.description, locale)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 02 / Interactive System & Interface Anatomy */}
          <div className="border-b border-hairline p-6 sm:p-10 lg:p-12 space-y-8">
            <div>
              <h2 className="font-mono text-xs font-bold tracking-wider text-accent uppercase mb-2">
                {t('anatomyHeading')}
              </h2>
              <p className="text-sm sm:text-base text-secondary-ink">
                {t('anatomySub')}
              </p>
            </div>
            <ProjectInteractiveStage slug={project.slug} locale={locale} />
            <div className="pt-6">
              <ProjectAnatomyDiagram project={project} locale={locale} />
            </div>
          </div>

          {/* 04 / Technical Challenges & Architectural Decisions */}
          <div className="border-b border-hairline p-6 sm:p-10 lg:p-12 bg-surface/30">
            <h2 className="font-mono text-xs font-bold tracking-wider text-accent uppercase mb-6">
              {t('challengesHeading')}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {project.challenges.map((challenge, idx) => (
                <div
                  key={idx}
                  className="border border-hairline bg-canvas p-6 sm:p-8 flex flex-col justify-between gap-5"
                >
                  <div>
                    <span className="font-mono text-xs text-muted-ink">
                      DECISION LOG // 0{idx + 1}
                    </span>
                    <h3 className="mt-1 text-lg sm:text-xl font-bold text-primary-ink">
                      {tField(challenge.title, locale)}
                    </h3>
                  </div>

                  <div className="space-y-4 border-t border-hairline pt-4 text-sm">
                    <div className="flex items-start gap-3">
                      <ShieldAlert className="h-4 w-4 text-accent-ochre shrink-0 mt-1" />
                      <div>
                        <span className="block font-mono text-xs text-accent-ochre mb-1">
                          {locale === 'id' ? 'KONTEKS MASALAH' : 'PROBLEM CONTEXT'}
                        </span>
                        <p className="text-secondary-ink leading-relaxed">
                          {tField(challenge.problem, locale)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Wrench className="h-4 w-4 text-accent shrink-0 mt-1" />
                      <div>
                        <span className="block font-mono text-xs text-accent mb-1">
                          {locale === 'id'
                            ? 'SOLUSI ARSITEKTURAL'
                            : 'ARCHITECTURAL SOLUTION'}
                        </span>
                        <p className="text-primary-ink leading-relaxed">
                          {tField(challenge.solution, locale)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 05 / Interactive Visual Plates & Blueprints Gallery */}
          <div className="border-b border-hairline p-6 sm:p-10 lg:p-12">
            <h2 className="font-mono text-xs font-bold tracking-wider text-accent uppercase mb-6">
              {t('galleryHeading')}
            </h2>
            <ProjectGalleryViewer
              plates={project.gallery}
              projectName={project.name}
              locale={locale}
            />
          </div>

          {/* Adjacent Case Studies Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border-hairline)] bg-surface">
            <Link
              href={`/projects/${prev.slug}`}
              className="group p-6 sm:p-8 flex items-center justify-between hover:bg-elevated transition-colors"
            >
              <div>
                <span className="block font-mono text-xs text-muted-ink mb-1">
                  ← {t('prevProject')}
                </span>
                <span className="text-lg font-bold text-primary-ink group-hover:text-accent transition-colors">
                  {prev.index} — {prev.name}
                </span>
              </div>
              <ArrowLeft className="h-5 w-5 text-muted-ink group-hover:text-accent transition-transform group-hover:-translate-x-1" />
            </Link>

            <Link
              href={`/projects/${next.slug}`}
              className="group p-6 sm:p-8 flex items-center justify-between text-right hover:bg-elevated transition-colors"
            >
              <ArrowRight className="h-5 w-5 text-muted-ink group-hover:text-accent transition-transform group-hover:translate-x-1 order-2" />
              <div className="order-1 ml-auto">
                <span className="block font-mono text-xs text-muted-ink mb-1">
                  {t('nextProject')} →
                </span>
                <span className="text-lg font-bold text-primary-ink group-hover:text-accent transition-colors">
                  {next.index} — {next.name}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </article>

      <ContactSection />
    </div>
  );
}

