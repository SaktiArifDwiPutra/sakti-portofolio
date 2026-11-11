import React from 'react';
import type { CvExperienceItem } from '@/data/cv-content';
import type { Locale } from '@/i18n/routing';
import { Briefcase } from 'lucide-react';

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
    <article className="border border-[#E8E6E1] bg-[#FFFFFF] rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:border-[#007F95]/30 transition-all duration-300 break-inside-avoid">
      {/* Top Header: Company Monogram, Role, Organization, Status Pill */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div className="flex items-start gap-3.5">
          {/* Monogram Box */}
          <div className="w-11 h-11 rounded-xl bg-[#E6F3F4] border border-[#007F95]/20 flex items-center justify-center text-[#007F95] shrink-0 shadow-2xs">
            <Briefcase className="w-5 h-5" />
          </div>

          <div>
            <h3 className="font-display text-base sm:text-lg font-bold text-[#1E2022] leading-snug">
              {roleText}
            </h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
              <span className="font-semibold text-sm text-[#007F95]">
                {item.organization}
              </span>
              <span className="text-xs text-[#777B80] font-mono">
                | {typeText}
              </span>
            </div>
          </div>
        </div>

        {/* Date / Status Pill */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#777B80] self-start sm:self-auto shrink-0">
          {item.isOngoing && (
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              {statusText}
            </span>
          )}
          <span className="px-2.5 py-0.5 rounded-full bg-[#FAF9F6] border border-[#E8E6E1] text-[#777B80]">
            {periodText}
          </span>
        </div>
      </div>

      {/* Responsibility Bullets */}
      <ul className="mt-3.5 space-y-2.5 text-xs sm:text-sm text-neutral-700 leading-relaxed">
        {highlights.map((bullet, idx) => (
          <li key={idx} className="flex items-start">
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full bg-[#007F95] ring-4 ring-[#E6F3F4] mt-2 mr-3 shrink-0"
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Tech Stack Chips */}
      <div className="mt-5 pt-3.5 border-t border-[#E8E6E1]/70 flex flex-wrap items-center gap-1.5">
        <span className="font-mono text-[10px] uppercase font-semibold text-[#777B80] mr-1">
          Stack:
        </span>
        {item.technologies.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-[#FAF9F6] border border-[#E8E6E1] text-[#1E2022] font-medium hover:border-[#007F95]/30 transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}
