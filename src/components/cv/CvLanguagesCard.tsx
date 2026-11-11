import React from 'react';
import type { LocalizedString } from '@/data/cv-content';
import type { Locale } from '@/i18n/routing';
import { Languages } from 'lucide-react';

interface CvLanguagesCardProps {
  languages: LocalizedString[];
  locale: Locale;
}

export function CvLanguagesCard({ languages, locale }: CvLanguagesCardProps) {
  return (
    <div className="border border-[#E8E6E1] bg-[#FFFFFF] rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] break-inside-avoid">
      <div className="flex items-center gap-2 mb-3">
        <Languages className="w-4 h-4 text-[#007F95]" />
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E2022]">
          {locale === 'id' ? 'Bahasa Komunikasi' : 'Working Languages'}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {languages.map((lang, idx) => (
          <span
            key={idx}
            className="font-mono text-xs px-3 py-1.5 rounded-lg bg-[#FAF9F6] border border-[#E8E6E1] text-[#1E2022] font-semibold shadow-2xs"
          >
            {lang[locale]}
          </span>
        ))}
      </div>
    </div>
  );
}
