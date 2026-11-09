import React from 'react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link, type Locale } from '@/i18n/routing';
import { TECH_STACK, tField, OWNER_PROFILE } from '@/data/portfolio';
import { ContactSection } from '@/components/ContactSection';
import { ArrowUpRight, Compass } from 'lucide-react';

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
    <div>
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 mb-16 sm:mb-24">
        <div className="border-x border-b border-hairline bg-canvas">
          {/* Page Header */}
          <div className="border-b border-hairline bg-surface p-6 sm:p-10 lg:p-14">
            <span className="block font-mono text-xs font-semibold tracking-wider text-accent mb-3">
              {t('indexLabel')}
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-primary-ink leading-[1.05] mb-5 max-w-4xl tracking-tight">
              {t('title')}
            </h1>
            <p className="text-lg sm:text-2xl text-secondary-ink max-w-3xl leading-relaxed font-light">
              {t('lead')}
            </p>
          </div>

          {/* 01 / Narrative Biography & 03 / Developer Specification Sheet */}
          <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-hairline divide-y lg:divide-y-0 lg:divide-x divide-[var(--border-hairline)]">
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14">
              <h2 className="font-mono text-xs font-bold tracking-wider text-accent uppercase mb-6">
                {t('storyHeading')}
              </h2>
              <div className="space-y-5 text-base sm:text-lg text-secondary-ink leading-relaxed max-w-[65ch]">
                <p className="text-primary-ink font-medium">{t('storyP1')}</p>
                <p>{t('storyP2')}</p>
                <p>{t('storyP3')}</p>
              </div>
            </div>

            <aside className="lg:col-span-5 bg-surface p-6 sm:p-10 lg:p-12 flex flex-col justify-between gap-8">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-mono text-xs font-bold tracking-wider text-accent uppercase">
                    {t('profileSheetHeading')}
                  </h2>
                  <Compass className="h-4 w-4 text-accent" />
                </div>

                <dl className="divide-y divide-[var(--border-hairline)] border-y border-hairline font-mono text-xs">
                  <div className="py-4 flex flex-col sm:flex-row sm:justify-between gap-1">
                    <dt className="text-muted-ink">{t('specName')}</dt>
                    <dd className="font-bold text-primary-ink">
                      {OWNER_PROFILE.name}
                    </dd>
                  </div>
                  <div className="py-4 flex flex-col sm:flex-row sm:justify-between gap-1">
                    <dt className="text-muted-ink">{t('specFocus')}</dt>
                    <dd className="text-primary-ink sm:text-right">
                      {t('specFocusVal')}
                    </dd>
                  </div>
                  <div className="py-4 flex flex-col sm:flex-row sm:justify-between gap-1">
                    <dt className="text-muted-ink">{t('specLanguages')}</dt>
                    <dd className="text-primary-ink sm:text-right">
                      {t('specLanguagesVal')}
                    </dd>
                  </div>
                  <div className="py-4 flex flex-col gap-1.5">
                    <dt className="text-muted-ink">{t('specInterests')}</dt>
                    <dd className="text-primary-ink leading-relaxed">
                      {t('specInterestsVal')}
                    </dd>
                  </div>
                </dl>
              </div>

              <Link
                href="/projects"
                className="interactive-btn interactive-btn-primary min-h-[48px] w-full justify-between px-5 py-3 font-mono text-xs"
              >
                <span>
                  {locale === 'id'
                    ? 'Jelajahi Katalog Proyek'
                    : 'Explore Project Catalog'}
                </span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </aside>
          </div>

          {/* 02 / Working Principles Matrix */}
          <div className="border-b border-hairline p-6 sm:p-10 lg:p-14">
            <h2 className="font-mono text-xs font-bold tracking-wider text-accent uppercase mb-8">
              {t('philosophyHeading')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-hairline divide-y md:divide-y-0 md:divide-x divide-[var(--border-hairline)] bg-surface">
              {principles.map((item) => (
                <div
                  key={item.code}
                  className="p-6 sm:p-8 flex flex-col justify-between gap-4"
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-accent">
                      {item.code}
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-primary-ink mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-secondary-ink leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full Technology Specification Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border-hairline)]">
            {TECH_STACK.map((cat) => (
              <div key={cat.id} className="p-6 sm:p-8 lg:p-10">
                <span className="font-mono text-xs text-accent font-bold">
                  {cat.code}
                </span>
                <h3 className="mt-1 text-lg font-bold text-primary-ink mb-4">
                  {tField(cat.title, locale)}
                </h3>
                <ul className="space-y-3 border-t border-hairline pt-4">
                  {cat.items.map((tech) => (
                    <li key={tech.name}>
                      <div className="flex items-center justify-between font-mono text-xs font-semibold text-primary-ink">
                        <span>{tech.name}</span>
                        <span className="text-muted-ink">{tech.context}</span>
                      </div>
                      <p className="text-xs text-secondary-ink mt-0.5">
                        {tField(tech.role, locale)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}

