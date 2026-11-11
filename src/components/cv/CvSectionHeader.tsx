import React from 'react';

interface CvSectionHeaderProps {
  index: string;
  title: string;
  id?: string;
  className?: string;
}

export function CvSectionHeader({ index, title, id, className = '' }: CvSectionHeaderProps) {
  return (
    <div
      id={id}
      className={`flex items-center gap-3 mb-4 print:mb-2 scroll-mt-20 break-after-avoid ${className}`}
    >
      <span className="w-6 h-6 rounded-md bg-[#007F95]/10 text-[#007F95] font-mono text-xs font-bold flex items-center justify-center select-none shrink-0">
        {index}
      </span>
      <h2 className="font-display text-sm sm:text-base font-bold text-[#1E2022] tracking-wider uppercase shrink-0">
        {title}
      </h2>
      <div className="h-[1px] bg-[#E8E6E1] flex-1 min-w-[20px]" />
    </div>
  );
}
