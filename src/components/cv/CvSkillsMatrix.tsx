import React from 'react';
import type { CvSkillCategory } from '@/data/cv-content';
import type { Locale } from '@/i18n/routing';

interface CvSkillsMatrixProps {
  categories: CvSkillCategory[];
  locale: Locale;
}

export function CvSkillsMatrix({ categories, locale }: CvSkillsMatrixProps) {
  return (
    <div className="space-y-3.5 break-inside-avoid">
      {categories.map((cat) => {
        const label = cat.label[locale];
        return (
          <div key={cat.key} className="space-y-1.5">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#52525B]">
              {label}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-[11px] px-2 py-0.5 rounded-sm bg-[#FFFFFF] border border-[#E4E2DC] text-[#1C1C1E] shadow-2xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

