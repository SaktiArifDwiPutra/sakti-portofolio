import React from 'react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { CERTIFICATES } from '@/data/portfolio';
import { CertificateGalleryCard } from '@/components/CertificateGalleryCard';
import { ContactSection } from '@/components/ContactSection';
import { Award } from 'lucide-react';

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

      {/* Modern Certificate Cards Grid with Interactive Slide-Out Viewers */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {CERTIFICATES.map((cert) => (
            <CertificateGalleryCard key={cert.id} cert={cert} locale={locale} />
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
