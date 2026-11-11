import React from 'react';
import Image from 'next/image';

interface CvPhotoFrameProps {
  photoUrl: string;
  name: string;
  className?: string;
}

export function CvPhotoFrame({ photoUrl, name, className = '' }: CvPhotoFrameProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Corner Bracket: Top-Left */}
      <span
        aria-hidden="true"
        className="absolute -top-[2px] -left-[2px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#007799] z-10 pointer-events-none"
      />
      {/* Corner Bracket: Top-Right */}
      <span
        aria-hidden="true"
        className="absolute -top-[2px] -right-[2px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#007799] z-10 pointer-events-none"
      />
      {/* Corner Bracket: Bottom-Left */}
      <span
        aria-hidden="true"
        className="absolute -bottom-[2px] -left-[2px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#007799] z-10 pointer-events-none"
      />
      {/* Corner Bracket: Bottom-Right */}
      <span
        aria-hidden="true"
        className="absolute -bottom-[2px] -right-[2px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#007799] z-10 pointer-events-none"
      />

      {/* Main Image Container */}
      <div className="relative w-[84px] h-[104px] sm:w-[108px] sm:h-[132px] overflow-hidden rounded-xs border border-[#E4E2DC] bg-[#FFFFFF] shadow-xs">
        <Image
          src={photoUrl}
          alt={name}
          width={108}
          height={132}
          priority
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
  );
}

