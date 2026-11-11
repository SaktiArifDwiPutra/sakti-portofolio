import React from 'react';
import type { CvProjectItem } from '@/data/cv-content';
import type { Locale } from '@/i18n/routing';
import { ArrowUpRight, Code, Gamepad2, Layers } from 'lucide-react';
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
  const isId = locale === 'id';

  const getProjectIcon = () => {
    if (project.id === 'critiplay') return <Code className="w-5 h-5" />;
    if (project.id === 'laundryflow') return <Layers className="w-5 h-5" />;
    if (project.id === 'daus-anak-soleh') return <Gamepad2 className="w-4 h-4" />;
    return <Code className="w-4 h-4" />;
  };

  if (isTier1) {
    return (
      <article className="border border-[#E8E6E1] bg-[#FFFFFF] rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:border-[#007F95]/30 transition-all duration-300 break-inside-avoid">
        {/* Tier 1 Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="flex items-start gap-3.5">
            {/* Monogram Box */}
            <div className="w-11 h-11 rounded-xl bg-[#E6F3F4] border border-[#007F95]/20 flex items-center justify-center text-[#007F95] shrink-0 shadow-2xs">
              {getProjectIcon()}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-base sm:text-lg font-bold text-[#1E2022]">
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
                    <ArrowUpRight className="h-4 w-4" />
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
              <p className="font-mono text-xs text-[#007F95] font-semibold mt-0.5">
                {roleText}
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="font-mono text-[11px] px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#E8E6E1] text-[#777B80] font-medium self-start sm:self-auto shrink-0">
            {statusBadge}
          </div>
        </div>

        {/* Narrative Bullets */}
        <ul className="mt-3.5 space-y-2.5 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          {bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start">
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-full bg-[#007F95] ring-4 ring-[#E6F3F4] mt-2 mr-3 shrink-0"
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Tech Stack Chips & Portfolio Deep-Dive Bridge */}
        <div className="mt-5 pt-3.5 border-t border-[#E8E6E1]/70 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-[10px] uppercase font-semibold text-[#777B80] mr-1">
              Stack:
            </span>
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-[#FAF9F6] border border-[#E8E6E1] text-[#1E2022] font-medium hover:border-[#007F95]/30 transition-colors"
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
              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#007F95] hover:text-[#005f70] transition-colors print:hidden shrink-0 group"
            >
              <span>{isId ? 'Detail di Portfolio' : 'Case Study'}</span>
              <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </div>
      </article>
    );
  }

  // Tier 2 Supporting Projects (Compact Presentation)
  return (
    <article className="border border-[#E8E6E1] bg-[#FFFFFF] rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:border-[#007F95]/30 transition-all duration-300 break-inside-avoid flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E6F3F4] border border-[#007F95]/20 flex items-center justify-center text-[#007F95] shrink-0 shadow-2xs">
              {getProjectIcon()}
            </div>
            <div>
              <h3 className="font-display text-sm sm:text-base font-bold text-[#1E2022]">
                {project.title}
              </h3>
              <p className="font-mono text-[11px] text-[#007F95] font-semibold">
                {roleText}
              </p>
            </div>
          </div>

          <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-[#FAF9F6] border border-[#E8E6E1] text-[#777B80] font-medium shrink-0">
            {statusBadge}
          </span>
        </div>

        {/* Narrative Description */}
        <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed mt-2.5">
          {bullets[0]}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-[#E8E6E1]/70 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#E8E6E1] text-[#777B80]"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="font-mono text-[10px] text-[#777B80]">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 print:hidden shrink-0">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-[#007F95] hover:underline"
            >
              <span>{isId ? 'Buka' : 'Play'}</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          )}
          {['website-pilketos', 'daus-anak-soleh'].includes(project.id) && (
            <a
              href={`https://saktiarif.my.id/projects/${project.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-[#007F95] hover:underline"
            >
              <span>{isId ? 'Detail' : 'Case Study'}</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
