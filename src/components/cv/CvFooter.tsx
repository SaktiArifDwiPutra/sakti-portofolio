import React from 'react';
import type { Locale } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';

interface CvFooterProps {
  locale: Locale;
}

export function CvFooter({ locale }: CvFooterProps) {
  const isId = locale === 'id';

  return (
    <footer className="mt-14 pt-8 border-t border-[#E8E6E1] text-center font-mono text-xs text-[#777B80] print:mt-6 print:pt-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[#1E2022] font-medium">
          (c) {new Date().getFullYear()} Sakti Arif Dwi Putra |{' '}
          <span className="text-[#777B80]">
            {isId ? 'Dokumen Kurikulum Vitae Resmi' : 'Official Curriculum Vitae'}
          </span>
        </p>
        <div className="flex items-center gap-4 text-[11px]">
          <a
            href="https://saktiarif.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#007F95] hover:underline"
          >
            <span>saktiarif.my.id</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <span>|</span>
          <span>Next.js 15 &amp; Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
