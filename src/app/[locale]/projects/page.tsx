import React from 'react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { ProjectCatalogClient } from '@/components/ProjectCatalogClient';
import { ContactSection } from '@/components/ContactSection';
import { FileCode2 } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('projectsTitle'),
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'projectsPage' });

  return (
    <div>
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 mb-16 sm:mb-24">
        <div className="border-x border-b border-hairline bg-canvas">
          {/* Page Header */}
          <div className="border-b border-hairline bg-surface p-6 sm:p-10 lg:p-14">
            <span className="block font-mono text-xs font-semibold tracking-wider text-accent mb-3">
              {t('indexLabel')}
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl text-primary-ink font-normal leading-[1.04] mb-4 tracking-tight">
              {t('title')}
            </h1>
            <p className="text-base sm:text-lg text-secondary-ink max-w-2xl leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          {/* Interactive Filter & Project Dossiers */}
          <ProjectCatalogClient locale={locale} />

          {/* Modularity & Extensibility Note */}
          <div className="border-t border-hairline bg-surface p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <FileCode2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-primary-ink">
                  {t('extensibleNoteTitle')}
                </h2>
                <p className="text-xs sm:text-sm text-secondary-ink mt-1">
                  {t('extensibleNoteBody')}
                </p>
              </div>
            </div>
            <span className="font-mono text-xs text-muted-ink shrink-0">
              src/data/portfolio.ts
            </span>
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}

