import React from 'react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { ProjectCatalogClient } from '@/components/ProjectCatalogClient';
import { ContactSection } from '@/components/ContactSection';
import { Sparkles, Layers } from 'lucide-react';

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
    <div className="space-y-20 sm:space-y-28">
      {/* Top Header */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 pt-8 sm:pt-14">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-[var(--bg-surface)] border border-white/[0.08] shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[var(--accent-primary)] mb-4">
            <Layers className="h-3.5 w-3.5" />
            <span>01 // {t('indexLabel')}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.08] max-w-3xl">
            {t('title')}
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mt-4 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Catalog & Filter */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <ProjectCatalogClient locale={locale} />
      </section>

      {/* Contact Section */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <ContactSection />
      </section>
    </div>
  );
}
