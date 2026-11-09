import React from 'react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { CERTIFICATES, tField } from '@/data/portfolio';
import { ContactSection } from '@/components/ContactSection';
import { Award, ArrowUpRight, Info } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('certificatesTitle'),
  };
}

export default async function CertificatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'certificatesPage' });

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

          {/* Certificate Registry Rows */}
          <div className="divide-y divide-[var(--border-hairline)]">
            {CERTIFICATES.map((cert) => (
              <article
                key={cert.id}
                className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border-hairline)]"
              >
                <div className="lg:col-span-3 p-6 sm:p-8 bg-surface/50 flex flex-col justify-between gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-accent">
                      {cert.code}
                    </span>
                    <Award className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <span className="block font-mono text-[11px] text-muted-ink">
                      {t('dateLabel')}
                    </span>
                    <span className="font-mono text-sm font-semibold text-primary-ink">
                      {tField(cert.date, locale)}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-center">
                  <span className="font-mono text-xs text-muted-ink mb-1">
                    {tField(cert.category, locale)}
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-primary-ink mb-2">
                    {tField(cert.title, locale)}
                  </h2>
                  <p className="font-mono text-xs text-secondary-ink">
                    {t('issuerLabel')}: {tField(cert.issuer, locale)}
                  </p>
                </div>

                <div className="lg:col-span-3 p-6 sm:p-8 bg-surface/30 flex flex-col justify-between gap-4">
                  <div>
                    <span className="block font-mono text-[11px] text-muted-ink mb-1.5">
                      {t('credentialIdLabel')}
                    </span>
                    {cert.isPlaceholder ? (
                      <span className="inline-block font-mono text-xs px-2.5 py-1 border border-[var(--accent-secondary)] text-accent-ochre">
                        {t('placeholderBadge')}
                      </span>
                    ) : null}
                    <p className="mt-2 text-xs text-secondary-ink leading-relaxed">
                      {tField(cert.statusNote, locale)}
                    </p>
                  </div>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="interactive-btn interactive-btn-primary min-h-[40px] px-4 py-2 font-mono text-xs"
                    >
                      <span>{t('verifyLink')}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}

