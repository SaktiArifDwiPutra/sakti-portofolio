import React from 'react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { EXPERIENCES } from '@/data/portfolio';
import { ContactSection } from '@/components/ContactSection';
import { TrajectoryInteractiveTimeline } from '@/components/TrajectoryInteractiveTimeline';
import { Briefcase } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('experienceTitle'),
  };
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'experiencePage' });

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Header Banner */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 pt-8 sm:pt-14">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl theme-card shadow-xl border border-white/[0.08]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full theme-chip text-xs font-mono text-[var(--accent-primary)] mb-4">
            <Briefcase className="h-3.5 w-3.5" />
            <span>03 // {t('indexLabel')}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight leading-[1.08] max-w-3xl">
            {t('title')}
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mt-4 leading-relaxed font-light">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Interactive Visual Timeline & Milestone Feed */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <TrajectoryInteractiveTimeline
          experiences={EXPERIENCES}
          locale={locale}
        />
      </section>

      {/* Contact Section */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <ContactSection />
      </section>
    </div>
  );
}
