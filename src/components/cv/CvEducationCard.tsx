import React from 'react';
import type { CvEducationItem } from '@/data/cv-content';
import type { Locale } from '@/i18n/routing';

interface CvEducationCardProps {
  item: CvEducationItem;
  locale: Locale;
}

export function CvEducationCard({ item, locale }: CvEducationCardProps) {
  const program = item.program[locale];
  const status = item.status[locale];
  const focus = item.focusAreas[locale];

  return (
    <article className="border border-[#E4E2DC] bg-[#FFFFFF] rounded-md p-3.5 sm:p-4 shadow-2xs break-inside-avoid">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
        <h3 className="font-display text-sm sm:text-base font-bold text-[#1C1C1E]">
          {item.institution}
        </h3>
        <span className="font-mono text-xs text-[#71717A]">{item.period}</span>
      </div>

      <div className="font-medium text-xs sm:text-sm text-[#007799] mt-0.5">
        {program}
      </div>

      <p className="font-mono text-xs text-[#52525B] mt-1">{status}</p>

      <p className="text-xs text-[#374151] mt-2 leading-relaxed border-t border-[#E4E2DC]/60 pt-2">
        {focus}
      </p>
    </article>
  );
}

