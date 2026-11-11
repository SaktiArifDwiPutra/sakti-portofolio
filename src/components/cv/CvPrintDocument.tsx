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
    <div className="cv-print-document font-sans text-black bg-white max-w-[210mm] mx-auto p-0 leading-normal text-[10pt]">
      {/* ==================== PAGE HEADER / MASTHEAD ==================== */}
      <header className="border-b-2 border-black pb-3 mb-4">
        <div className="flex justify-between items-baseline">
          <div>
            <h1 className="font-display text-2xl font-extrabold uppercase tracking-tight text-black">
              {data.name}
            </h1>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#007F95] mt-0.5 font-mono">
              {data.title[locale]}
            </p>
          </div>
          <div className="text-right text-[9pt] font-mono text-neutral-600">
            <span>{data.contact.location[locale]}</span>
          </div>
        </div>

        {/* Contact Links Row */}
        <div className="mt-2 pt-2 border-t border-neutral-300 flex flex-wrap items-center gap-x-3 gap-y-1 text-[9pt] font-mono text-neutral-800">
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
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-[10pt] font-mono font-bold uppercase tracking-wider text-[#007F95] border-b border-neutral-300 pb-0.5 mb-2">
          {isId ? 'Profil Profesional' : 'Professional Profile'}
        </h2>
        <p className="text-[9.5pt] leading-relaxed text-neutral-800 text-justify">
          {data.summary[locale]}
        </p>
      </section>

      {/* ==================== 02. TECHNICAL SKILLS ==================== */}
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-[10pt] font-mono font-bold uppercase tracking-wider text-[#007F95] border-b border-neutral-300 pb-0.5 mb-2">
          {isId ? 'Keahlian Teknis' : 'Technical Skills'}
        </h2>
        <div className="space-y-1.5 text-[9pt]">
          {data.skills.map((cat) => (
            <div key={cat.key} className="flex items-baseline">
              <span className="w-36 shrink-0 font-mono font-bold text-neutral-900 text-[8.5pt] uppercase tracking-wide">
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
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-[10pt] font-mono font-bold uppercase tracking-wider text-[#007F95] border-b border-neutral-300 pb-0.5 mb-2">
          {isId ? 'Pengalaman Kerja' : 'Professional Experience'}
        </h2>
        <div className="space-y-3">
          {data.experience.map((item) => (
            <div key={item.id} className="break-inside-avoid">
              <div className="flex justify-between items-baseline mb-0.5">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-[10.5pt] font-bold text-black font-display">
                    {item.role[locale]}
                  </h3>
                  <span className="text-[9pt] font-semibold text-[#007F95]">
                    @ {item.organization}
                  </span>
                  <span className="text-[8.5pt] text-neutral-500 font-mono">
                    ({item.type[locale]})
                  </span>
                </div>
                <span className="text-[8.5pt] font-mono font-semibold text-neutral-700">
                  {item.period[locale]}
                </span>
              </div>

              <ul className="list-disc list-outside ml-4 space-y-1 text-[9pt] text-neutral-800 leading-snug">
                {item.highlights[locale].map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>

              <div className="mt-1 text-[8.5pt] font-mono text-neutral-600">
                <span className="font-semibold text-neutral-800">Stack:</span>{' '}
                {item.technologies.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 04. KEY PROJECTS ==================== */}
      <section className="mb-4">
        <h2 className="text-[10pt] font-mono font-bold uppercase tracking-wider text-[#007F95] border-b border-neutral-300 pb-0.5 mb-2 break-after-avoid">
          {isId ? 'Proyek Pilihan' : 'Selected Projects'}
        </h2>

        {/* Tier 1 Projects */}
        <div className="space-y-3 mb-3">
          {tier1Projects.map((project) => (
            <div key={project.id} className="break-inside-avoid">
              <div className="flex justify-between items-baseline mb-0.5">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-[10.5pt] font-bold text-black font-display">
                    {project.title}
                  </h3>
                  <span className="text-[9pt] font-semibold text-[#007F95]">
                    | {project.role[locale]}
                  </span>
                </div>
                <span className="text-[8.5pt] font-mono text-neutral-600">
                  {project.statusBadge[locale]}
                </span>
              </div>

              <ul className="list-disc list-outside ml-4 space-y-0.5 text-[9pt] text-neutral-800 leading-snug">
                {project.summary[locale].map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>

              <div className="mt-1 flex flex-wrap justify-between items-center text-[8.5pt] font-mono text-neutral-600">
                <div>
                  <span className="font-semibold text-neutral-800">Stack:</span>{' '}
                  {project.technologies.join(', ')}
                </div>
                <div className="text-[8pt] text-[#007F95]">
                  <span>saktiarif.my.id/{locale}/projects/{project.id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tier 2 Projects */}
        <div className="space-y-3">
          {tier2Projects.map((project) => (
            <div key={project.id} className="break-inside-avoid">
              <div className="flex justify-between items-baseline mb-0.5">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-[10.5pt] font-bold text-black font-display">
                    {project.title}
                  </h3>
                  <span className="text-[9pt] font-semibold text-[#007F95]">
                    | {project.role[locale]}
                  </span>
                </div>
                <span className="text-[8.5pt] font-mono text-neutral-600">
                  {project.statusBadge[locale]}
                </span>
              </div>

              <p className="text-[9pt] text-neutral-800 leading-snug ml-4">
                {project.summary[locale][0]}
              </p>

              <div className="mt-1 flex flex-wrap justify-between items-center text-[8.5pt] font-mono text-neutral-600">
                <div>
                  <span className="font-semibold text-neutral-800">Stack:</span>{' '}
                  {project.technologies.join(', ')}
                </div>
                {project.liveUrl && (
                  <div className="text-[8pt] text-[#007F95]">
                    <span>{project.liveUrl.replace(/^https?:\/\//, '')}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 05. EDUCATION & LEADERSHIP ==================== */}
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-[10pt] font-mono font-bold uppercase tracking-wider text-[#007F95] border-b border-neutral-300 pb-0.5 mb-2">
          {isId ? 'Pendidikan & Organisasi' : 'Education & Organization'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[9pt]">
          {/* Education */}
          <div>
            <h3 className="font-mono font-bold text-[8.5pt] uppercase text-neutral-500 mb-1">
              {isId ? 'Pendidikan Formal' : 'Formal Education'}
            </h3>
            {data.education.map((item) => (
              <div key={item.id}>
                <div className="font-bold text-black font-display text-[9.5pt]">
                  {item.institution}
                </div>
                <div className="text-[#007F95] font-semibold text-[8.5pt]">
                  {item.program[locale]}
                </div>
                <div className="text-neutral-600 font-mono text-[8pt]">
                  {item.period} | {item.status[locale]}
                </div>
                <p className="text-neutral-700 text-[8.5pt] mt-1 leading-snug">
                  {item.focusAreas[locale]}
                </p>
              </div>
            ))}
          </div>

          {/* Leadership */}
          <div>
            <h3 className="font-mono font-bold text-[8.5pt] uppercase text-neutral-500 mb-1">
              {isId ? 'Pengalaman Kepemimpinan' : 'Leadership Experience'}
            </h3>
            {data.organization.map((item) => (
              <div key={item.id}>
                <div className="font-bold text-black font-display text-[9.5pt]">
                  {item.organization}
                </div>
                <div className="text-[#007F95] font-semibold text-[8.5pt]">
                  {item.role[locale]}
                </div>
                <div className="text-neutral-600 font-mono text-[8pt]">
                  {item.period} | {item.status[locale]}
                </div>
                <p className="text-neutral-700 text-[8.5pt] mt-1 leading-snug">
                  {item.description[locale]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 06. CREDENTIALS & LANGUAGES ==================== */}
      <section className="break-inside-avoid">
        <h2 className="text-[10pt] font-mono font-bold uppercase tracking-wider text-[#007F95] border-b border-neutral-300 pb-0.5 mb-2">
          {isId ? 'Kredensial & Bahasa' : 'Credentials & Languages'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[9pt]">
          {/* Credentials */}
          <div>
            <h3 className="font-mono font-bold text-[8.5pt] uppercase text-neutral-500 mb-1">
              {isId ? 'Sertifikasi' : 'Certifications'}
            </h3>
            <div className="space-y-1.5">
              {data.certifications.map((cert) => (
                <div key={cert.id}>
                  <div className="font-bold text-black text-[9pt]">
                    {cert.name}
                  </div>
                  <div className="text-neutral-600 font-mono text-[8pt]">
                    {cert.issuer} ({cert.issueDate[locale]})
                    {cert.credentialId && ` | ID: ${cert.credentialId}`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="font-mono font-bold text-[8.5pt] uppercase text-neutral-500 mb-1">
              {isId ? 'Bahasa Komunikasi' : 'Working Languages'}
            </h3>
            <div className="flex gap-4 text-neutral-800 font-mono text-[9pt]">
              {data.languages.map((lang, idx) => (
                <span key={idx} className="font-semibold">
                  • {lang[locale]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PRINT FOOTER ==================== */}
      <footer className="mt-6 pt-2 border-t border-neutral-300 text-center text-[7.5pt] font-mono text-neutral-500">
        <p>
          (c) {new Date().getFullYear()} Sakti Arif Dwi Putra | {isId ? 'Dokumen Resmi' : 'Official Curriculum Vitae'} | cv.saktiarif.my.id
        </p>
      </footer>
    </div>
  );
}

