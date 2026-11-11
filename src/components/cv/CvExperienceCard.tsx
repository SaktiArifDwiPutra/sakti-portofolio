import React from 'react';
import type { CvExperienceItem } from '@/data/cv-content';
import type { Locale } from '@/i18n/routing';

interface CvExperienceCardProps {
  item: CvExperienceItem;
  locale: Locale;
}

export function CvExperienceCard({ item, locale }: CvExperienceCardProps) {
  const roleText = item.role[locale];
  const periodText = item.period[locale];
  const statusText = item.status[locale];
  const typeText = item.type[locale];
  const highlights = item.highlights[locale];

  return (
    <article className="border border-[#E8E6E1] bg-[#FFFFFF] rounded-lg p-5 sm:p-6 shadow-2xs break-inside-avoid">
      {/* Top Header: Role, Organization & Ongoing Status */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5 mb-2.5">
        <div>
          <h3 className="font-display text-base sm:text-lg font-bold text-[#202124]">
            {roleText}
          </h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-semibold text-sm text-[#007F95]">
              {item.organization}
            </span>
            <span className="text-xs text-[#777B80] font-mono">
              ({typeText})
            </span>
          </div>
        </div>

        {/* Date / Status Pill */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#777B80] self-start sm:self-auto">
          {item.isOngoing && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E6F3F4] text-[#007F95] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#007F95] animate-pulse" />
              {statusText}
            </span>
          )}
          <span>{periodText}</span>
        </div>
      </div>

      {/* Responsibility Bullets */}
      <ul className="mt-3.5 space-y-2 text-xs sm:text-sm text-[#374151] leading-relaxed">
        {highlights.map((bullet, idx) => (
          <li key={idx} className="flex items-start">
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-xs bg-[#007F95] mt-2 mr-2.5 shrink-0"
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Tech Stack Chips */}
      <div className="mt-4 pt-3 border-t border-[#E8E6E1]/70 flex flex-wrap items-center gap-1.5">
        <span className="font-mono text-[10px] uppercase text-[#777B80] mr-1">
          Stack:
        </span>
        {item.technologies.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#E8E6E1] text-[#202124]"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}
