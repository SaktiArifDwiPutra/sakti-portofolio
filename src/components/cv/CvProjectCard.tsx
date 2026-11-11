import React from 'react';
import type { CvProjectItem } from '@/data/cv-content';
import type { Locale } from '@/i18n/routing';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/SocialIcons';

interface CvProjectCardProps {
  project: CvProjectItem;
  locale: Locale;
}

export function CvProjectCard({ project, locale }: CvProjectCardProps) {
  const roleText = project.role[locale];
  const statusBadge = project.statusBadge[locale];
  const bullets = project.summary[locale];

  return (
    <article className="border border-[#E4E2DC] bg-[#FFFFFF] rounded-md p-4 sm:p-5 shadow-2xs break-inside-avoid group hover:border-[#007799]/40 transition-colors">
      {/* Header: Title, Links & Status Badge */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display text-base font-bold text-[#1C1C1E]">
              {project.title}
            </h3>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visit ${project.title}`}
                className="text-[#71717A] hover:text-[#007799] transition-colors p-0.5 print:hidden"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`${project.title} Repository`}
                className="text-[#71717A] hover:text-[#007799] transition-colors p-0.5 print:hidden"
              >
                <GithubIcon className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
          <p className="font-medium text-xs sm:text-sm text-[#007799] mt-0.5">
            {roleText}
          </p>
        </div>

        {/* Status / Deployment Tag */}
        <div className="mt-1 sm:mt-0 font-mono text-[11px] px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#E4E2DC] text-[#52525B] self-start sm:self-auto">
          {statusBadge}
        </div>
      </div>

      {/* Bullets */}
      <ul className="mt-2.5 space-y-1.5 text-xs sm:text-sm text-[#374151] leading-relaxed">
        {bullets.map((bullet, idx) => (
          <li key={idx} className="flex items-start">
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-xs bg-[#007799] mt-2 mr-2.5 shrink-0"
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Technologies */}
      <div className="mt-3.5 pt-2.5 border-t border-[#E4E2DC]/60 flex flex-wrap items-center gap-1.5">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#E4E2DC] text-[#1C1C1E]"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}

