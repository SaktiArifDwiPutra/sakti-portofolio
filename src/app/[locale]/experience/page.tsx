import React from 'react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { EXPERIENCES, tField } from '@/data/portfolio';
import { ContactSection } from '@/components/ContactSection';
import { CheckCircle2, Info } from 'lucide-react';

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
    <div>
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 mb-16 sm:mb-24">
        <div className="border-x border-b border-hairline bg-canvas">
          {/* Page Header */}
          <div className="border-b border-hairline bg-surface p-6 sm:p-10 lg:p-14">
            <span className="block font-mono text-xs font-semibold tracking-wider text-accent mb-3">
              {t('indexLabel')}
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-primary-ink leading-[1.05] mb-4 tracking-tight">
              {t('title')}
            </h1>
            <p className="text-base sm:text-lg text-secondary-ink max-w-2xl leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          {/* Content Integrity Banner */}
          <div className="border-b border-hairline bg-elevated px-6 py-4 flex items-start gap-3">
            <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <div>
              <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-primary-ink">
                {t('integrityNoticeTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-secondary-ink mt-1 max-w-4xl leading-relaxed">
                {t('integrityNoticeBody')}
              </p>
            </div>
          </div>

          {/* Trajectory Entries */}
          <div className="divide-y divide-[var(--border-hairline)]">
            {EXPERIENCES.map((exp) => {
              const deliverables =
                exp.deliverables[locale] ?? exp.deliverables.en;

              return (
                <article
                  key={exp.id}
                  className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border-hairline)]"
                >
                  {/* Left Meta Column */}
                  <div className="lg:col-span-4 p-6 sm:p-8 lg:p-10 bg-surface/50 flex flex-col justify-between gap-6">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-xs font-bold text-accent">
                          ENTRY // {exp.index}
                        </span>
                        <span
                          className={`font-mono text-[11px] px-2.5 py-0.5 border ${
                            exp.isPlaceholder
                              ? 'border-[var(--accent-secondary)] text-accent-ochre'
                              : 'border-hairline bg-canvas text-accent'
                          }`}
                        >
                          {exp.isPlaceholder
                            ? t('typePlaceholder')
                            : t('typePractice')}
                        </span>
                      </div>

                      <p className="font-mono text-sm font-semibold text-primary-ink mb-1">
                        {tField(exp.period, locale)}
                      </p>
                      <p className="font-mono text-xs text-secondary-ink">
                        {tField(exp.organization, locale)}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-hairline">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-xs px-2 py-0.5 border border-hairline bg-canvas text-primary-ink"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Details Column */}
                  <div className="lg:col-span-8 p-6 sm:p-8 lg:p-10">
                    <span className="block font-mono text-xs text-muted-ink mb-1">
                      {tField(exp.domain, locale)}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-primary-ink mb-3">
                      {tField(exp.role, locale)}
                    </h2>
                    <p className="text-base text-secondary-ink leading-relaxed mb-6">
                      {tField(exp.summary, locale)}
                    </p>

                    <div className="border-t border-hairline pt-5">
                      <h3 className="font-mono text-xs text-muted-ink uppercase mb-3">
                        {t('deliverablesLabel')}
                      </h3>
                      <ul className="space-y-2.5">
                        {deliverables.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-sm text-primary-ink"
                          >
                            <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}

