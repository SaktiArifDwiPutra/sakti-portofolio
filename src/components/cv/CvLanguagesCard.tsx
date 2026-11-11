import React from 'react';
import type { LocalizedString } from '@/data/cv-content';
import type { Locale } from '@/i18n/routing';

interface CvLanguagesCardProps {
  languages: LocalizedString[];
  locale: Locale;
}

export function CvLanguagesCard({ languages, locale }: CvLanguagesCardProps) {
  return (
    <div className="border border-[#E8E6E1] bg-[#FFFFFF] rounded-md p-3.5 text-xs shadow-2xs break-inside-avoid">
      <div className="flex flex-wrap gap-2">
        {languages.map((lang, idx) => (
          <span
            key={idx}
            className="font-mono text-xs px-2.5 py-1 rounded bg-[#FAF9F6] border border-[#E8E6E1] text-[#202124] font-medium"
          >
            {lang[locale]}
          </span>
        ))}
      </div>
    </div>
  );
}

