import React from 'react';
import type { CvSkillCategory } from '@/data/cv-content';
import type { Locale } from '@/i18n/routing';
import { Code2, Server, Gamepad2, Wrench, Sparkles } from 'lucide-react';

interface CvSkillsMatrixProps {
  categories: CvSkillCategory[];
  locale: Locale;
}

export function CvSkillsMatrix({ categories, locale }: CvSkillsMatrixProps) {
  const getCategoryIcon = (key: string) => {
    switch (key) {
      case 'frontend':
        return <Code2 className="w-3.5 h-3.5 text-[#007F95]" />;
      case 'backend':
        return <Server className="w-3.5 h-3.5 text-[#007F95]" />;
      case 'gamedev':
        return <Gamepad2 className="w-3.5 h-3.5 text-[#007F95]" />;
      case 'tools':
        return <Wrench className="w-3.5 h-3.5 text-[#007F95]" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-[#007F95]" />;
    }
  };

  return (
    <div className="border border-[#E8E6E1] bg-[#FFFFFF] rounded-2xl p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4 break-inside-avoid">
      {categories.map((cat) => {
        const label = cat.label[locale];
        return (
          <div key={cat.key} className="space-y-2">
            <div className="flex items-center gap-2">
              {getCategoryIcon(cat.key)}
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E2022]">
                {label}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-[#FAF9F6] hover:bg-neutral-100 border border-[#E8E6E1] text-[#1E2022] font-medium transition-colors shadow-2xs"
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
