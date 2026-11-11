import React from 'react';
import type { Locale } from '@/i18n/routing';

interface CvFooterProps {
  locale: Locale;
}

export function CvFooter({ locale }: CvFooterProps) {
  return (
    <footer className="mt-12 pt-6 border-t border-[#E4E2DC] text-center font-mono text-xs text-[#71717A] print:mt-6 print:pt-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>
          (c) {new Date().getFullYear()} Sakti Arif |{' '}
          {locale === 'id'
            ? 'Dokumen Kurikulum Vitae Resmi'
            : 'Official Curriculum Vitae'}
        </p>
        <p className="text-[11px] text-[#52525B]">
          cv.saktiarif.my.id | Next.js &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
}

