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
    <article className="border border-[#E8E6E1] bg-[#FFFFFF] rounded-md p-4 shadow-2xs break-inside-avoid">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
        <h3 className="font-display text-sm sm:text-base font-bold text-[#202124]">
          {role}
        </h3>
        <span className="font-mono text-xs text-[#777B80]">{item.period}</span>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className="font-semibold text-xs sm:text-sm text-[#007F95]">
          {item.organization}
        </span>
        <span className="font-mono text-[11px] text-[#777B80]">
          ({status})
        </span>
      </div>

      <p className="text-xs sm:text-sm text-[#374151] leading-relaxed border-t border-[#E8E6E1]/60 pt-2">
        {description}
      </p>
    </article>
  );
}
