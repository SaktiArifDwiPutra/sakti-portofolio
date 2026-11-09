import React from 'react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link, type Locale } from '@/i18n/routing';
import { OWNER_PROFILE } from '@/data/portfolio';
import { ContactSection } from '@/components/ContactSection';
import { ArrowUpRight, Compass, Sparkles, User, Lightbulb } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('aboutTitle'),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'aboutPage' });
  const principles = t.raw('principles') as {
    code: string;
    title: string;
    body: string;
  }[];

  return (
    <div className="space-y-20 sm:space-y-28">
      {/* Header Banner */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 pt-8 sm:pt-14">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl theme-card shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full theme-chip text-xs font-mono text-[var(--accent-primary)] mb-4">
            <User className="h-3.5 w-3.5" />
            <span>02 // {t('indexLabel')}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight leading-[1.08] max-w-4xl">
            {t('title')}
          </h1>
          <p className="text-base sm:text-xl text-[var(--text-secondary)] max-w-3xl mt-4 leading-relaxed font-light">
            {t('lead')}
          </p>
        </div>
      </section>

      {/* Main Narrative & Spec Sheet */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Biography Narrative */}
          <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl theme-card space-y-6 shadow-xl">
            <span className="font-mono text-xs font-bold tracking-wider text-[var(--accent-primary)] uppercase block">
              {t('storyHeading')}
            </span>
            <div className="space-y-5 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              <p className="text-[var(--text-primary)] font-medium">{t('storyP1')}</p>
              <p>{t('storyP2')}</p>
              <p>{t('storyP3')}</p>
            </div>
          </div>

          {/* Right: Spec Sheet */}
          <aside className="lg:col-span-5 p-8 sm:p-10 rounded-3xl theme-card flex flex-col justify-between gap-6 shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-hairline)]">
                <span className="font-mono text-xs font-bold tracking-wider text-[var(--accent-primary)] uppercase">
                  {t('profileSheetHeading')}
                </span>
                <Compass className="h-4 w-4 text-[var(--accent-primary)]" />
              </div>

              <div className="divide-y divide-[var(--border-hairline)] font-mono text-xs pt-2">
                <div className="py-3.5 flex justify-between gap-2">
                  <span className="text-[var(--text-muted)]">{t('specName')}</span>
                  <span className="font-bold text-[var(--text-primary)]">{OWNER_PROFILE.name}</span>
                </div>
                <div className="py-3.5 flex justify-between gap-2">
                  <span className="text-[var(--text-muted)]">{t('specFocus')}</span>
                  <span className="text-[var(--text-primary)] text-right">{t('specFocusVal')}</span>
                </div>
                <div className="py-3.5 flex justify-between gap-2">
                  <span className="text-[var(--text-muted)]">{t('specLanguages')}</span>
                  <span className="text-[var(--text-primary)] text-right">{t('specLanguagesVal')}</span>
                </div>
                <div className="py-3.5 flex flex-col gap-1.5">
                  <span className="text-[var(--text-muted)]">{t('specInterests')}</span>
                  <span className="text-[var(--text-primary)] leading-relaxed">{t('specInterestsVal')}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
              <span>Jakarta, Indonesia</span>
              <span className="text-[var(--accent-primary)] font-semibold">UTC+7</span>
            </div>
          </aside>
        </div>
      </section>

      {/* Engineering Principles */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 space-y-8">
        <div className="pb-4 border-b border-[var(--border-hairline)]">
          <span className="font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider block">
            03 // {t('principlesHeading')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight mt-1">
            Engineering &amp; Creative Philosophy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((p) => (
            <div
              key={p.code}
              className="p-6 sm:p-8 rounded-3xl theme-card hover:border-[var(--accent-primary)]/40 transition-all flex flex-col justify-between shadow-lg group"
            >
              <div>
                <span className="font-mono text-xs text-[var(--accent-primary)] font-bold block mb-2">
                  {p.code}
                </span>
                <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent-primary)] transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <ContactSection />
      </section>
    </div>
  );
}
