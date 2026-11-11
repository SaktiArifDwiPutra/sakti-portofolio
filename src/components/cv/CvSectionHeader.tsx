import React from 'react';

interface CvSectionHeaderProps {
  index: string;
  title: string;
  className?: string;
}

export function CvSectionHeader({ index, title, className = '' }: CvSectionHeaderProps) {
  return (
    <div className={`flex items-center gap-2.5 mb-4 print:mb-2 break-after-avoid ${className}`}>
      <span className="font-mono text-xs font-semibold text-[#007F95] tracking-wider select-none shrink-0">
        {index} /
      </span>
      <h2 className="font-display text-sm sm:text-base font-bold text-[#202124] tracking-wide uppercase shrink-0">
        {title}
      </h2>
      <div className="h-[1px] bg-[#E8E6E1] flex-1 min-w-[20px]" />
    </div>
  );
}
