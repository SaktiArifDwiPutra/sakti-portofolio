import React from 'react';
import type { CvOrganizationItem } from '@/data/cv-content';
import type { Locale } from '@/i18n/routing';

interface CvOrganizationCardProps {
  item: CvOrganizationItem;
  locale: Locale;
}

export function CvOrganizationCard({ item, locale }: CvOrganizationCardProps) {
  const role = item.role[locale];
  const status = item.status[locale];
  const description = item.description[locale];

  return (
    <article className="border border-[#E4E2DC] bg-[#FFFFFF] rounded-md p-3.5 sm:p-4 shadow-2xs break-inside-avoid">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
        <h3 className="font-display text-sm sm:text-base font-bold text-[#1C1C1E]">
          {role}
        </h3>
        <span className="font-mono text-xs text-[#71717A]">{item.period}</span>
      </div>

      <div className="flex items-center gap-2 mt-0.5">
        <span className="font-medium text-xs sm:text-sm text-[#007799]">
          {item.organization}
        </span>
        <span className="font-mono text-[11px] text-[#71717A]">
          ({status})
        </span>
      </div>

      <p className="text-xs sm:text-sm text-[#374151] mt-2 leading-relaxed">
        {description}
      </p>
    </article>
  );
}

