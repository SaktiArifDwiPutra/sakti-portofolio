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
    <article className="border border-[#E4E2DC] bg-[#FFFFFF] rounded-md p-4 sm:p-5 shadow-2xs break-inside-avoid">
      {/* Top Header: Role & Organization */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
        <div>
          <h3 className="font-display text-base font-bold text-[#1C1C1E]">
            {roleText}
          </h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-medium text-sm text-[#007799]">
              {item.organization}
            </span>
            <span className="text-xs text-[#71717A] font-mono">
              ({typeText})
            </span>
          </div>
        </div>

        {/* Date / Status Pill */}
        <div className="flex items-center gap-2 mt-1 sm:mt-0 font-mono text-xs text-[#52525B]">
          {item.isOngoing && (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#007799]/10 text-[#007799] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#007799] animate-pulse" />
              {statusText}
            </span>
          )}
          <span>{periodText}</span>
        </div>
      </div>

      {/* Bullets */}
      <ul className="mt-3 space-y-2 text-xs sm:text-sm text-[#374151] leading-relaxed">
        {highlights.map((bullet, idx) => (
          <li key={idx} className="flex items-start">
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-xs bg-[#007799] mt-2 mr-2.5 shrink-0"
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Tech Stack Pills */}
      <div className="mt-4 pt-3 border-t border-[#E4E2DC]/60 flex flex-wrap items-center gap-1.5">
        <span className="font-mono text-[10px] uppercase text-[#71717A] mr-1">
          Stack:
        </span>
        {item.technologies.map((tech) => (
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

