import React from 'react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { EXPERIENCES, tField } from '@/data/portfolio';
import { ContactSection } from '@/components/ContactSection';
import { Briefcase, Calendar, ChevronRight, Info } from 'lucide-react';

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
    <div className="space-y-20 sm:space-y-28">
      {/* Header Banner */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 pt-8 sm:pt-14">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl theme-card shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full theme-chip text-xs font-mono text-[var(--accent-primary)] mb-4">
            <Briefcase className="h-3.5 w-3.5" />
            <span>03 // {t('indexLabel')}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight leading-[1.08] max-w-3xl">
            {t('title')}
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mt-4 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Trajectory Timeline Cards */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 space-y-8">
        <div className="relative pl-6 sm:pl-8 space-y-8 sm:space-y-12 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-[var(--accent-primary)] before:via-[var(--border-hairline)] before:to-transparent">
          {EXPERIENCES.map((exp) => {
            const deliverables = exp.deliverables[locale] ?? exp.deliverables.en;

            return (
              <div key={exp.id} className="relative group">
                {/* Glowing Node */}
                <div className="absolute -left-[27px] sm:-left-[35px] top-2 flex items-center justify-center">
                  <span className="h-4 w-4 rounded-full bg-[var(--bg-canvas)] border-2 border-[var(--accent-primary)] group-hover:scale-125 transition-transform shadow-md shadow-[var(--accent-primary)]/20" />
                </div>

                <article className="rounded-3xl theme-card p-6 sm:p-10 transition-all duration-300 shadow-xl">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[var(--border-hairline)]">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-[var(--accent-primary)] uppercase">
                          ENTRY // {exp.index}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full theme-chip text-[10px] font-mono text-[var(--text-muted)]">
                          {exp.isPlaceholder ? t('typePlaceholder') : t('typePractice')}
                        </span>
                      </div>
                      <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--text-primary)]">
                        {tField(exp.role, locale)}
                      </h2>
                      <p className="font-mono text-xs text-[var(--text-secondary)] mt-1 font-medium">
                        {tField(exp.organization, locale)}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full theme-chip text-xs font-mono text-[var(--text-primary)]">
                      <Calendar className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                      <span>{tField(exp.period, locale)}</span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-5 leading-relaxed">
                    {tField(exp.summary, locale)}
                  </p>

                  <div className="mt-6 space-y-2.5">
                    <span className="font-mono text-xs uppercase text-[var(--text-muted)] tracking-wider block font-medium">
                      {locale === 'id' ? 'Tanggung Jawab & Kontribusi:' : 'Responsibilities & Contributions:'}
                    </span>
                    <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                      {deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2.5">
                          <ChevronRight className="h-4 w-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-5 border-t border-[var(--border-hairline)] flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full theme-chip font-mono text-xs text-[var(--text-primary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <ContactSection />
      </section>
    </div>
  );
}
