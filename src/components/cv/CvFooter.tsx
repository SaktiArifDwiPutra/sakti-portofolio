import React from 'react';
import type { Locale } from '@/i18n/routing';

interface CvFooterProps {
  locale: Locale;
}

export function CvFooter({ locale }: CvFooterProps) {
  return (
    <footer className="mt-12 pt-6 border-t border-[#E8E6E1] text-center font-mono text-xs text-[#777B80] print:mt-6 print:pt-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>
          (c) {new Date().getFullYear()} Sakti Arif |{' '}
          {locale === 'id'
            ? 'Dokumen Kurikulum Vitae Resmi'
            : 'Official Curriculum Vitae'}
        </p>
        <p className="text-[11px] text-[#777B80]">
          cv.saktiarif.my.id | Next.js &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
