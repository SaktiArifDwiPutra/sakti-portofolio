import React from 'react';
import type { CvData } from '@/data/cv-content';
import type { Locale } from '@/i18n/routing';

interface CvPrintDocumentProps {
  data: CvData;
  locale: Locale;
}

export function CvPrintDocument({ data, locale }: CvPrintDocumentProps) {
  const isId = locale === 'id';
  const tier1Projects = data.projects.filter((p) => p.tier === 1);
  const tier2Projects = data.projects.filter((p) => p.tier === 2);

  return (
    <div className="cv-print-document font-sans text-black bg-white max-w-[210mm] mx-auto p-0 leading-normal text-[9.5pt]">
      {/* ==================== PAGE HEADER / MASTHEAD ==================== */}
      <header className="border-b-2 border-black pb-2.5 mb-3">
        <div className="flex justify-between items-baseline">
          <div>
            <h1 className="font-display text-2xl font-extrabold uppercase tracking-tight text-black">
              {data.name}
            </h1>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#007F95] mt-0.5 font-mono">
              {data.title[locale]}
            </p>
          </div>
          <div className="text-right text-[8.5pt] font-mono text-neutral-600">
            <span>{data.contact.location[locale]}</span>
          </div>
        </div>

        {/* Contact Links Row (Fully clickable in PDF) */}
        <div className="mt-2 pt-1.5 border-t border-neutral-300 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[8.5pt] font-mono text-neutral-800">
          <a href={`mailto:${data.contact.email}`} className="hover:underline">
            {data.contact.email}
          </a>
          <span>|</span>
          <a
            href={data.contact.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {data.contact.github.label}
          </a>
          <span>|</span>
          <a
            href={data.contact.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {data.contact.linkedin.label}
          </a>
          <span>|</span>
          <a
            href={data.contact.portfolio.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline font-semibold text-[#007F95]"
          >
            {data.contact.portfolio.label}
          </a>
        </div>
      </header>

      {/* ==================== 01. PROFESSIONAL PROFILE ==================== */}
      <section className="mb-3 break-inside-avoid">
        <h2 className="text-[9.5pt] font-mono font-bold uppercase tracking-wider text-[#007F95] border-b border-neutral-300 pb-0.5 mb-1.5">
          {isId ? 'Profil Profesional' : 'Professional Profile'}
        </h2>
        <p className="text-[9pt] leading-relaxed text-neutral-800 text-justify">
          {data.summary[locale]}
        </p>
      </section>

      {/* ==================== 02. TECHNICAL SKILLS ==================== */}
      <section className="mb-3 break-inside-avoid">
        <h2 className="text-[9.5pt] font-mono font-bold uppercase tracking-wider text-[#007F95] border-b border-neutral-300 pb-0.5 mb-1.5">
          {isId ? 'Keahlian Teknis' : 'Technical Skills'}
        </h2>
        <div className="space-y-1 text-[8.5pt]">
          {data.skills.map((cat) => (
            <div key={cat.key} className="flex items-baseline">
              <span className="w-32 shrink-0 font-mono font-bold text-neutral-900 text-[8pt] uppercase tracking-wide">
                {cat.label[locale]}:
              </span>
              <span className="text-neutral-800 font-mono">
                {cat.skills.join(' · ')}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 03. PROFESSIONAL EXPERIENCE ==================== */}
      <section className="mb-3 break-inside-avoid">
        <h2 className="text-[9.5pt] font-mono font-bold uppercase tracking-wider text-[#007F95] border-b border-neutral-300 pb-0.5 mb-1.5">
          {isId ? 'Pengalaman Kerja' : 'Professional Experience'}
        </h2>
        <div className="space-y-2.5">
          {data.experience.map((item) => (
            <div key={item.id} className="break-inside-avoid">
              <div className="flex justify-between items-baseline mb-0.5">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-[10pt] font-bold text-black font-display">
                    {item.role[locale]}
                  </h3>
                  <span className="text-[8.5pt] font-semibold text-[#007F95]">
                    @ {item.organization}
                  </span>
                  <span className="text-[8pt] text-neutral-500 font-mono">
                    ({item.type[locale]})
                  </span>
                </div>
                <span className="text-[8pt] font-mono font-semibold text-neutral-700">
                  {item.period[locale]}
                </span>
              </div>

              <ul className="list-disc list-outside ml-4 space-y-0.5 text-[8.5pt] text-neutral-800 leading-snug">
                {item.highlights[locale].map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>

              <div className="mt-1 text-[8pt] font-mono text-neutral-600">
                <span className="font-semibold text-neutral-800">Stack:</span>{' '}
                {item.technologies.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 04. KEY PROJECTS ==================== */}
      <section className="mb-3">
        <h2 className="text-[9.5pt] font-mono font-bold uppercase tracking-wider text-[#007F95] border-b border-neutral-300 pb-0.5 mb-1.5 break-after-avoid">
          {isId ? 'Proyek Pilihan' : 'Selected Projects'}
        </h2>

        {/* Tier 1 Projects */}
        <div className="space-y-2.5 mb-2.5">
          {tier1Projects.map((project) => (
            <div key={project.id} className="break-inside-avoid">
              <div className="flex justify-between items-baseline mb-0.5">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-[10pt] font-bold text-black font-display">
                    {project.title}
                  </h3>
                  <span className="text-[8.5pt] font-semibold text-[#007F95]">
                    | {project.role[locale]}
                  </span>
                </div>
                <span className="text-[8pt] font-mono text-neutral-600">
                  {project.statusBadge[locale]}
                </span>
              </div>

              <ul className="list-disc list-outside ml-4 space-y-0.5 text-[8.5pt] text-neutral-800 leading-snug">
                {project.summary[locale].map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>

              <div className="mt-1 flex flex-wrap justify-between items-center text-[8pt] font-mono text-neutral-600">
                <div>
                  <span className="font-semibold text-neutral-800">Stack:</span>{' '}
                  {project.technologies.join(', ')}
                </div>
                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#007F95] hover:underline"
                    >
                      github.com/SaktiArifDwiPutra/{project.id === 'critiplay' ? 'CritiPlay' : 'LaundryFlow'}
                    </a>
                  )}
                  <a
                    href={`https://saktiarif.my.id/${locale}/projects/${project.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#007F95] hover:underline font-semibold"
                  >
                    Case Study ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tier 2 Projects */}
        <div className="space-y-2.5">
          {tier2Projects.map((project) => (
            <div key={project.id} className="break-inside-avoid">
              <div className="flex justify-between items-baseline mb-0.5">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-[10pt] font-bold text-black font-display">
                    {project.title}
                  </h3>
                  <span className="text-[8.5pt] font-semibold text-[#007F95]">
                    | {project.role[locale]}
                  </span>
                </div>
                <span className="text-[8pt] font-mono text-neutral-600">
                  {project.statusBadge[locale]}
                </span>
              </div>

              <p className="text-[8.5pt] text-neutral-800 leading-snug ml-4">
                {project.summary[locale][0]}
              </p>

              <div className="mt-1 flex flex-wrap justify-between items-center text-[8pt] font-mono text-neutral-600">
                <div>
                  <span className="font-semibold text-neutral-800">Stack:</span>{' '}
                  {project.technologies.join(', ')}
                </div>
                <div className="flex items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#007F95] hover:underline"
                    >
                      {project.id === 'daus-anak-soleh' ? 'Play: itch.io' : 'Demo'}
                    </a>
                  )}
                  <a
                    href={`https://saktiarif.my.id/${locale}/projects/${project.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#007F95] hover:underline font-semibold"
                  >
                    Case Study ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 05. EDUCATION & LEADERSHIP ==================== */}
      <section className="mb-3 break-inside-avoid">
        <h2 className="text-[9.5pt] font-mono font-bold uppercase tracking-wider text-[#007F95] border-b border-neutral-300 pb-0.5 mb-1.5">
          {isId ? 'Pendidikan & Organisasi' : 'Education & Organization'}
        </h2>
        <div className="space-y-1.5 text-[8.5pt]">
          {/* Education */}
          {data.education.map((item) => (
            <div key={item.id} className="flex justify-between items-baseline">
              <div>
                <span className="font-bold text-black font-display text-[9pt]">
                  {item.institution}
                </span>
                <span className="text-[#007F95] font-semibold ml-2">
                  {item.program[locale]}
                </span>
                <span className="text-neutral-600 font-mono text-[8pt] ml-2">
                  ({item.status[locale]})
                </span>
              </div>
              <span className="font-mono text-[8pt] text-neutral-700 font-semibold shrink-0">
                {item.period}
              </span>
            </div>
          ))}

          {/* Leadership (Compact 1-line presentation) */}
          {data.organization.map((item) => (
            <div key={item.id} className="flex justify-between items-baseline text-neutral-800">
              <div>
                <span className="font-bold text-black font-display text-[9pt]">
                  {item.organization}
                </span>
                <span className="text-[#007F95] font-semibold ml-2">
                  {item.role[locale]}
                </span>
                <span className="text-neutral-600 text-[8pt] ml-2">
                  | {item.description[locale]}
                </span>
              </div>
              <span className="font-mono text-[8pt] text-neutral-700 font-semibold shrink-0">
                {item.period}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 06. CREDENTIALS & LANGUAGES ==================== */}
      <section className="break-inside-avoid">
        <h2 className="text-[9.5pt] font-mono font-bold uppercase tracking-wider text-[#007F95] border-b border-neutral-300 pb-0.5 mb-1.5">
          {isId ? 'Kredensial & Bahasa' : 'Credentials & Languages'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[8.5pt]">
          {/* Credentials */}
          <div>
            <div className="space-y-1">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="text-[8pt] font-mono text-neutral-800">
                  <span className="font-bold text-black">{cert.name}</span>
                  <span className="text-neutral-600 ml-1">
                    ({cert.issuer}, {cert.issueDate[locale]})
                  </span>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#007F95] hover:underline ml-1 font-semibold"
                    >
                      [Verify ↗]
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="flex items-center gap-3 text-neutral-800 font-mono text-[8.5pt] sm:justify-end">
            <span className="font-bold text-neutral-900 text-[8pt] uppercase">
              {isId ? 'Bahasa:' : 'Languages:'}
            </span>
            {data.languages.map((lang, idx) => (
              <span key={idx} className="font-semibold">
                • {lang[locale]}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PRINT FOOTER ==================== */}
      <footer className="mt-4 pt-1.5 border-t border-neutral-300 text-center text-[7pt] font-mono text-neutral-500">
        <p>
          (c) {new Date().getFullYear()} Sakti Arif | {isId ? 'Dokumen Resmi' : 'Official Curriculum Vitae'} | cv.saktiarif.my.id
        </p>
      </footer>
    </div>
  );
}
