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
  const isTier1 = project.tier === 1;

  if (isTier1) {
    return (
      <article className="border border-[#E8E6E1] bg-[#FFFFFF] rounded-lg p-5 sm:p-6 shadow-2xs break-inside-avoid transition-colors hover:border-[#007F95]/40">
        {/* Tier 1 Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5 mb-2.5">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-lg font-bold text-[#202124]">
                {project.title}
              </h3>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Open ${project.title}`}
                  className="text-[#777B80] hover:text-[#007F95] transition-colors p-0.5 print:hidden"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${project.title} GitHub Repository`}
                  className="text-[#777B80] hover:text-[#007F95] transition-colors p-0.5 print:hidden"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
            <p className="font-mono text-xs sm:text-sm text-[#007F95] font-medium mt-0.5">
              {roleText}
            </p>
          </div>

          {/* Status Badge */}
          <div className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-[#E6F3F4] text-[#007F95] font-medium self-start sm:self-auto">
            {statusBadge}
          </div>
        </div>

        {/* Narrative Bullets */}
        <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-[#374151] leading-relaxed">
          {bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start">
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-xs bg-[#007F95] mt-2 mr-2.5 shrink-0"
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Tech Stack Chips & Portfolio Deep-Dive Bridge */}
        <div className="mt-4 pt-3 border-t border-[#E8E6E1]/70 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-[10px] uppercase text-[#777B80] mr-1">
              Stack:
            </span>
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#E8E6E1] text-[#202124]"
              >
                {tech}
              </span>
            ))}
          </div>

          {['critiplay', 'website-pilketos', 'daus-anak-soleh'].includes(project.id) && (
            <a
              href={`https://saktiarif.my.id/projects/${project.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[11px] text-[#007F95] hover:underline print:hidden shrink-0"
            >
              <span>{locale === 'id' ? 'Detail di Portfolio' : 'Case Study'}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </article>
    );
  }

  // Tier 2 Supporting Projects (Compact Presentation)
  return (
    <article className="border border-[#E8E6E1] bg-[#FFFFFF] rounded-md p-4 sm:p-4.5 shadow-2xs break-inside-avoid transition-colors hover:border-[#007F95]/40 flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1.5">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-base font-bold text-[#202124]">
              {project.title}
            </h3>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Play ${project.title}`}
                className="text-[#777B80] hover:text-[#007F95] transition-colors p-0.5 print:hidden"
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
                className="text-[#777B80] hover:text-[#007F95] transition-colors p-0.5 print:hidden"
              >
                <GithubIcon className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#E8E6E1] text-[#777B80]">
            {statusBadge}
          </span>
        </div>

        <p className="font-mono text-xs text-[#007F95] mb-2 font-medium">
          {roleText}
        </p>

        <ul className="space-y-1 text-xs text-[#374151] leading-relaxed">
          {bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start">
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-xs bg-[#007F95] mt-1.5 mr-2 shrink-0"
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 pt-2.5 border-t border-[#E8E6E1]/60 flex flex-wrap items-center justify-between gap-1.5">
        <div className="flex flex-wrap items-center gap-1">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#FAF9F6] border border-[#E8E6E1] text-[#202124]"
            >
              {tech}
            </span>
          ))}
        </div>

        {['critiplay', 'website-pilketos', 'daus-anak-soleh'].includes(project.id) && (
          <a
            href={`https://saktiarif.my.id/projects/${project.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-[10px] text-[#007F95] hover:underline print:hidden shrink-0"
          >
            <span>{locale === 'id' ? 'Detail' : 'Case Study'}</span>
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        )}
      </div>
    </article>
  );
}
