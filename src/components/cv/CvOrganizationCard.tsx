import React from 'react';
import type { CvOrganizationItem } from '@/data/cv-content';
import type { Locale } from '@/i18n/routing';
import { Users2 } from 'lucide-react';

interface CvOrganizationCardProps {
  item: CvOrganizationItem;
  locale: Locale;
}

export function CvOrganizationCard({ item, locale }: CvOrganizationCardProps) {
  const role = item.role[locale];
  const status = item.status[locale];
  const description = item.description[locale];

  return (
    <article className="border border-[#E8E6E1] bg-[#FFFFFF] rounded-2xl p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)] hover:border-[#007F95]/30 transition-all duration-300 break-inside-avoid">
      <div className="flex items-start gap-3.5 mb-3">
        <div className="w-10 h-10 rounded-xl bg-[#E6F3F4] border border-[#007F95]/20 flex items-center justify-center text-[#007F95] shrink-0 shadow-2xs">
          <Users2 className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <h3 className="font-display text-sm sm:text-base font-bold text-[#1E2022]">
              {role}
            </h3>
            <span className="font-mono text-xs text-[#777B80] shrink-0">
              {item.period}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-sans font-semibold text-xs sm:text-sm text-[#007F95]">
              {item.organization}
            </span>
            <span className="font-mono text-[11px] text-[#777B80]">
              | {status}
            </span>
          </div>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-neutral-700 mt-3 pt-3 border-t border-[#E8E6E1]/70 leading-relaxed">
        {description}
      </p>
    </article>
  );
}
