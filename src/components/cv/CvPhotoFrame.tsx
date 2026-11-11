import React from 'react';
import Image from 'next/image';

interface CvPhotoFrameProps {
  photoUrl: string;
  name: string;
  className?: string;
}

export function CvPhotoFrame({ photoUrl, name, className = '' }: CvPhotoFrameProps) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <div className="relative w-24 h-28 sm:w-28 sm:h-32 md:w-32 md:h-36 overflow-hidden rounded-2xl border border-[#E8E6E1] bg-[#FFFFFF] shadow-[0_4px_16px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
        <Image
          src={photoUrl}
          alt={name}
          width={128}
          height={144}
          priority
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
  );
}
