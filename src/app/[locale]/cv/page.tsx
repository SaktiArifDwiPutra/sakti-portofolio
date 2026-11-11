import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { CV_DATA } from '@/data/cv-content';
import { CvHeader } from '@/components/cv/CvHeader';
import { CvPhotoFrame } from '@/components/cv/CvPhotoFrame';
import { CvContactMatrix } from '@/components/cv/CvContactMatrix';
import { CvSectionHeader } from '@/components/cv/CvSectionHeader';
import { CvExperienceCard } from '@/components/cv/CvExperienceCard';
import { CvProjectCard } from '@/components/cv/CvProjectCard';
import { CvSkillsMatrix } from '@/components/cv/CvSkillsMatrix';
import { CvEducationCard } from '@/components/cv/CvEducationCard';
import { CvOrganizationCard } from '@/components/cv/CvOrganizationCard';
import { CvCredentialsCard } from '@/components/cv/CvCredentialsCard';
import { CvFooter } from '@/components/cv/CvFooter';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : routing.defaultLocale;

  const isId = validLocale === 'id';
  const title = isId
    ? 'Curriculum Vitae | Sakti Arif - Full-Stack & Game Developer'
    : 'Curriculum Vitae | Sakti Arif - Full-Stack & Game Developer';
  const description = isId
    ? 'Dokumen Curriculum Vitae resmi Sakti Arif, Full-Stack Developer & Game Developer. Berpengalaman di Laravel, React, TypeScript, Flutter, dan Phaser.'
    : 'Official Curriculum Vitae of Sakti Arif, Full-Stack Developer & Game Developer. Experienced in Laravel, React, TypeScript, Flutter, and Phaser.';

  return {
    title,
    description,
    alternates: {
      canonical: `https://cv.saktiarif.my.id/${validLocale}`,
      languages: {
        en: 'https://cv.saktiarif.my.id/en',
        id: 'https://cv.saktiarif.my.id/id',
      },
    },
    openGraph: {
      title,
      description,
      type: 'profile',
      locale: isId ? 'id_ID' : 'en_US',
      url: `https://cv.saktiarif.my.id/${validLocale}`,
    },
  };
}

export default async function CvPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;

  if (!routing.locales.includes(rawLocale as Locale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const isId = locale === 'id';

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1C1C1E] font-sans antialiased selection:bg-[#007799]/15 selection:text-[#007799]">
      {/* Sticky Digital Header / Action Bar */}
      <CvHeader />

      {/* Main CV Document Container */}
      <main className="mx-auto max-w-[980px] px-4 sm:px-6 py-6 sm:py-10 print:py-0 print:px-0">
        {/* Mobile Header (Shown only on small screens < md) */}
        <div className="md:hidden mb-8 border-b border-[#E4E2DC] pb-6">
          <div className="flex items-center gap-4">
            <CvPhotoFrame photoUrl={CV_DATA.photoUrl} name={CV_DATA.name} />
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight text-[#1C1C1E]">
                {CV_DATA.name}
              </h1>
              <p className="font-mono text-xs text-[#007799] font-medium mt-1">
                {CV_DATA.title[locale]}
              </p>
              <p className="font-mono text-[11px] text-[#71717A] mt-0.5">
                {CV_DATA.contact.location[locale]}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[#E4E2DC]">
            <CvContactMatrix contact={CV_DATA.contact} locale={locale} />
          </div>
        </div>

        {/* Master Asymmetric 2-Column Grid */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-10 items-start">
          {/* LEFT RAIL (Sidebar: ~34%) */}
          <aside className="w-full md:w-[34%] shrink-0 space-y-7 md:pr-4 md:border-r md:border-[#E4E2DC]">
            {/* Desktop Photo Frame */}
            <div className="hidden md:block">
              <CvPhotoFrame photoUrl={CV_DATA.photoUrl} name={CV_DATA.name} />
            </div>

            {/* Desktop Contact Matrix */}
            <div className="hidden md:block">
              <CvSectionHeader
                index="00"
                title={isId ? 'Kontak & Profil' : 'Contact & Profiles'}
              />
              <CvContactMatrix contact={CV_DATA.contact} locale={locale} />
            </div>

            {/* Technical Skills Matrix */}
            <div>
              <CvSectionHeader
                index="04"
                title={isId ? 'Keahlian Teknis' : 'Technical Skills'}
              />
              <CvSkillsMatrix categories={CV_DATA.skills} locale={locale} />
            </div>

            {/* Education */}
            <div>
              <CvSectionHeader
                index="05"
                title={isId ? 'Pendidikan' : 'Education'}
              />
              {CV_DATA.education.map((item) => (
                <CvEducationCard key={item.id} item={item} locale={locale} />
              ))}
            </div>

            {/* Certifications & Languages */}
            <div>
              <CvSectionHeader
                index="06"
                title={isId ? 'Kredensial & Bahasa' : 'Credentials & Languages'}
              />
              <CvCredentialsCard
                certifications={CV_DATA.certifications}
                languages={CV_DATA.languages}
                locale={locale}
              />
            </div>
          </aside>

          {/* RIGHT RAIL (Content Canvas: ~66%) */}
          <section className="w-full md:w-[66%] space-y-8">
            {/* Desktop Identity Header */}
            <header className="hidden md:block border-b border-[#E4E2DC] pb-6">
              <h1 className="font-display text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1C1C1E]">
                {CV_DATA.name}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-[#007799]" />
                <p className="font-mono text-sm font-semibold text-[#007799] tracking-wide">
                  {CV_DATA.title[locale]}
                </p>
              </div>
              <p className="font-mono text-xs text-[#71717A] mt-1">
                {CV_DATA.contact.location[locale]}
              </p>
            </header>

            {/* 01 // Professional Profile (Executive Summary) */}
            <div>
              <CvSectionHeader
                index="01"
                title={isId ? 'Profil Profesional' : 'Professional Profile'}
              />
              <div className="border border-[#E4E2DC] bg-[#FFFFFF] rounded-md p-4 sm:p-5 shadow-2xs">
                <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
                  {CV_DATA.summary[locale]}
                </p>
              </div>
            </div>

            {/* 02 // Professional Experience */}
            <div>
              <CvSectionHeader
                index="02"
                title={isId ? 'Pengalaman Kerja' : 'Professional Experience'}
              />
              <div className="space-y-4">
                {CV_DATA.experience.map((item) => (
                  <CvExperienceCard key={item.id} item={item} locale={locale} />
                ))}
              </div>
            </div>

            {/* 03 // Selected Projects */}
            <div>
              <CvSectionHeader
                index="03"
                title={isId ? 'Proyek Pilihan' : 'Selected Projects'}
              />
              <div className="space-y-4">
                {CV_DATA.projects.map((project) => (
                  <CvProjectCard
                    key={project.id}
                    project={project}
                    locale={locale}
                  />
                ))}
              </div>
            </div>

            {/* 07 // Organizational Leadership */}
            <div>
              <CvSectionHeader
                index="07"
                title={isId ? 'Kepemimpinan Organisasi' : 'Organizational Leadership'}
              />
              <div className="space-y-4">
                {CV_DATA.organization.map((item) => (
                  <CvOrganizationCard
                    key={item.id}
                    item={item}
                    locale={locale}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Official CV Colophon & Footer */}
        <CvFooter locale={locale} />
      </main>
    </div>
  );
}

