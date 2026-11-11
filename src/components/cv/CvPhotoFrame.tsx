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
      <div className="relative w-[88px] h-[110px] sm:w-[104px] sm:h-[130px] overflow-hidden rounded-md border border-[#E8E6E1] bg-[#FFFFFF] shadow-xs">
        <Image
          src={photoUrl}
          alt={name}
          width={104}
          height={130}
          priority
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
  );
}
