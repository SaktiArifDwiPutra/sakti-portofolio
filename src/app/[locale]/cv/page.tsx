import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { CV_DATA } from '@/data/cv-content';
import { CvHeader } from '@/components/cv/CvHeader';
import { CvSectionHeader } from '@/components/cv/CvSectionHeader';
import { CvExperienceCard } from '@/components/cv/CvExperienceCard';
import { CvProjectCard } from '@/components/cv/CvProjectCard';
import { CvSkillsMatrix } from '@/components/cv/CvSkillsMatrix';
import { CvEducationCard } from '@/components/cv/CvEducationCard';
import { CvOrganizationCard } from '@/components/cv/CvOrganizationCard';
import { CvCredentialsCard } from '@/components/cv/CvCredentialsCard';
import { CvLanguagesCard } from '@/components/cv/CvLanguagesCard';
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
  setRequestLocale(locale);
  const isId = locale === 'id';

  const tier1Projects = CV_DATA.projects.filter((p) => p.tier === 1);
  const tier2Projects = CV_DATA.projects.filter((p) => p.tier === 2);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1E2022] font-sans antialiased selection:bg-[#007F95]/15 selection:text-[#007F95] print:bg-white print:text-black">
      {/* Master Container */}
      <main className="mx-auto max-w-[1040px] px-4 sm:px-6 lg:px-8 py-6 sm:py-10 print:py-0 print:px-0">
        {/* Master Hero Masthead with Portrait, Identity, Status & Contacts */}
        <CvHeader
          name={CV_DATA.name}
          title={CV_DATA.title[locale]}
          photoUrl={CV_DATA.photoUrl}
          contact={CV_DATA.contact}
          locale={locale}
        />

        {/* Responsive Layout Grid: Single-column below 1024px, 2fr/1fr at 1024px+ */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 lg:gap-12 items-start">
          {/* MAIN COLUMN (2fr) */}
          <section className="space-y-10 min-w-0">
            {/* 01 / Professional Profile */}
            <div id="profile" className="scroll-mt-24">
              <CvSectionHeader
                index="01"
                title={isId ? 'Profil Profesional' : 'Professional Profile'}
              />
              <div className="border border-[#E8E6E1] border-l-4 border-l-[#007F95] bg-[#FFFFFF] rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] break-inside-avoid">
                <p className="text-sm sm:text-[15px] text-neutral-700 leading-relaxed font-normal">
                  {CV_DATA.summary[locale]}
                </p>
              </div>
            </div>

            {/* 02 / Professional Experience */}
            <div id="experience" className="scroll-mt-24">
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

            {/* 03 / Selected Projects */}
            <div id="projects" className="scroll-mt-24">
              <CvSectionHeader
                index="03"
                title={isId ? 'Proyek Pilihan' : 'Selected Projects'}
              />
              <div className="space-y-4">
                {/* Tier 1 Featured Projects */}
                {tier1Projects.map((project) => (
                  <CvProjectCard
                    key={project.id}
                    project={project}
                    locale={locale}
                  />
                ))}

                {/* Tier 2 Supporting Projects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {tier2Projects.map((project) => (
                    <CvProjectCard
                      key={project.id}
                      project={project}
                      locale={locale}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SUPPORTING COLUMN (1fr) */}
          <aside className="space-y-10 min-w-0">
            {/* 04 / Technical Skills */}
            <div id="skills" className="scroll-mt-24">
              <CvSectionHeader
                index="04"
                title={isId ? 'Keahlian Teknis' : 'Technical Skills'}
              />
              <CvSkillsMatrix categories={CV_DATA.skills} locale={locale} />
            </div>

            {/* 05 / Education */}
            <div id="education" className="scroll-mt-24">
              <CvSectionHeader
                index="05"
                title={isId ? 'Pendidikan' : 'Education'}
              />
              {CV_DATA.education.map((item) => (
                <CvEducationCard key={item.id} item={item} locale={locale} />
              ))}
            </div>

            {/* 06 / Leadership & Organizational Experience */}
            <div id="leadership" className="scroll-mt-24">
              <CvSectionHeader
                index="06"
                title={
                  isId
                    ? 'Kepemimpinan & Organisasi'
                    : 'Leadership & Organization'
                }
              />
              <div className="space-y-3">
                {CV_DATA.organization.map((item) => (
                  <CvOrganizationCard
                    key={item.id}
                    item={item}
                    locale={locale}
                  />
                ))}
              </div>
            </div>

            {/* 07 / Certifications & Credentials */}
            <div id="credentials" className="scroll-mt-24">
              <CvSectionHeader
                index="07"
                title={
                  isId ? 'Kredensial & Sertifikasi' : 'Credentials & Certifications'
                }
              />
              <CvCredentialsCard
                certifications={CV_DATA.certifications}
                locale={locale}
              />
            </div>

            {/* 08 / Languages (Dedicated Standalone Section) */}
            <div id="languages" className="scroll-mt-24">
              <CvSectionHeader
                index="08"
                title={isId ? 'Bahasa' : 'Languages'}
              />
              <CvLanguagesCard
                languages={CV_DATA.languages}
                locale={locale}
              />
            </div>
          </aside>
        </div>

        {/* Official CV Colophon & Footer */}
        <CvFooter locale={locale} />
      </main>
    </div>
  );
}
