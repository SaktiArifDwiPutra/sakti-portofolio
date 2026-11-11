import React from 'react';

interface CvSectionHeaderProps {
  index: string;
  title: string;
  className?: string;
}

export function CvSectionHeader({ index, title, className = '' }: CvSectionHeaderProps) {
  return (
    <div className={`flex items-center gap-2 mb-4 print:mb-2 break-after-avoid ${className}`}>
      <span className="font-mono text-xs font-semibold text-[#007799] tracking-wider select-none shrink-0">
        {index} //
      </span>
      <h2 className="font-display text-base sm:text-lg font-bold text-[#1C1C1E] tracking-wide uppercase shrink-0">
        {title}
      </h2>
      <div className="h-[1px] bg-[#E4E2DC] flex-1 min-w-[20px]" />
    </div>
  );
}

