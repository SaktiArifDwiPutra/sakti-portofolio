import React from 'react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { CERTIFICATES, tField } from '@/data/portfolio';
import { ContactSection } from '@/components/ContactSection';
import { Award, ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react';

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
    <div className="space-y-20 sm:space-y-28">
      {/* Header Banner */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 pt-8 sm:pt-14">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl theme-card shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full theme-chip text-xs font-mono text-[var(--accent-primary)] mb-4">
            <Award className="h-3.5 w-3.5" />
            <span>04 // {t('indexLabel')}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight leading-[1.08] max-w-3xl">
            {t('title')}
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mt-4 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Modern Certificate Cards Grid */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATES.map((cert) => (
            <article
              key={cert.id}
              className="group rounded-3xl theme-card p-6 sm:p-8 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border-hairline)]">
                  <span className="font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider">
                    {cert.code}
                  </span>
                  <div className="p-2 rounded-xl theme-chip text-[var(--accent-primary)] group-hover:scale-110 transition-transform">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                </div>

                <div className="mt-4">
                  <span className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider block">
                    {tField(cert.category, locale)}
                  </span>
                  <h2 className="font-display font-bold text-lg text-[var(--text-primary)] mt-1 group-hover:text-[var(--accent-primary)] transition-colors">
                    {tField(cert.title, locale)}
                  </h2>
                  <p className="font-mono text-xs text-[var(--text-secondary)] mt-2">
                    {t('issuerLabel')}: <strong className="text-[var(--text-primary)]">{tField(cert.issuer, locale)}</strong>
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between font-mono text-xs">
                <span className="text-[var(--text-muted)]">
                  {tField(cert.date, locale)}
                </span>
                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--accent-primary)] hover:underline font-semibold"
                  >
                    <span>{t('verifyLink')}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="text-[11px] text-[var(--text-muted)]">
                    {cert.isPlaceholder ? t('pendingVerification') : 'Verified'}
                  </span>
                )}
              </div>
            </article>
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
