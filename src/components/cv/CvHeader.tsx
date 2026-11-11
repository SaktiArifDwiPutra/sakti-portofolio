'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { Link, usePathname, useRouter, type Locale } from '@/i18n/routing';
import { Printer, ArrowLeft } from 'lucide-react';

export function CvHeader() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  const handleLocaleSwitch = (targetLocale: Locale) => {
    if (targetLocale === locale) return;
    // @ts-expect-error -- next-intl router accepts dynamic pathname + params
    router.replace({ pathname, params }, { locale: targetLocale });
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#E4E2DC] print:hidden">
      <div className="mx-auto flex max-w-[980px] items-center justify-between px-4 sm:px-6 py-3">
        {/* Domain Marker & Identity */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#007799] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#007799]"></span>
          </span>
          <span className="font-mono text-xs tracking-wider text-[#1C1C1E] font-medium">
            cv.saktiarif.my.id
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <div
            className="flex items-center rounded-md border border-[#E4E2DC] bg-[#FFFFFF] p-0.5 text-xs font-mono shadow-xs"
            role="group"
            aria-label="Language selector"
          >
            <button
              type="button"
              onClick={() => handleLocaleSwitch('id')}
              className={`px-2 py-1 rounded transition-colors ${
                locale === 'id'
                  ? 'bg-[#1C1C1E] text-white font-medium'
                  : 'text-[#71717A] hover:text-[#1C1C1E]'
              }`}
              aria-pressed={locale === 'id'}
            >
              ID
            </button>
            <span className="text-[#E4E2DC] px-0.5 select-none">|</span>
            <button
              type="button"
              onClick={() => handleLocaleSwitch('en')}
              className={`px-2 py-1 rounded transition-colors ${
                locale === 'en'
                  ? 'bg-[#1C1C1E] text-white font-medium'
                  : 'text-[#71717A] hover:text-[#1C1C1E]'
              }`}
              aria-pressed={locale === 'en'}
            >
              EN
            </button>
          </div>

          {/* Download / Print PDF Button */}
          <button
            type="button"
            onClick={handlePrint}
            title={locale === 'id' ? 'Cetak atau Simpan PDF' : 'Print or Save as PDF'}
            className="flex items-center gap-1.5 rounded-md border border-[#007799]/40 bg-[#FFFFFF] px-2.5 py-1 text-xs font-mono text-[#007799] hover:bg-[#007799]/10 transition-colors shadow-xs"
          >
            <Printer className="h-3.5 w-3.5" />
            <span className="hidden sm:inline font-medium">PDF</span>
          </button>

          {/* Return to Main Portfolio */}
          <Link
            href="/"
            className="flex items-center gap-1 rounded-md border border-[#E4E2DC] bg-[#FFFFFF] px-2.5 py-1 text-xs font-mono text-[#52525B] hover:text-[#1C1C1E] hover:border-[#1C1C1E] transition-colors shadow-xs"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Portfolio</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

