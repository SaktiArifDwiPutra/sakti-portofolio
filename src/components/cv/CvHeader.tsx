'use client';

import React, { useState } from 'react';
import type { CvContactInfo } from '@/data/cv-content';
import type { Locale } from '@/i18n/routing';
import { usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { Printer, ArrowLeft, Mail, Globe, MapPin, Check, Copy } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/SocialIcons';

interface CvHeaderProps {
  name: string;
  title: string;
  contact: CvContactInfo;
  locale: Locale;
}

export function CvHeader({ name, title, contact, locale }: CvHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleLocaleSwitch = (targetLocale: Locale) => {
    if (targetLocale === locale) return;
    if (typeof window !== 'undefined' && window.location.hostname.startsWith('cv.')) {
      window.location.href = targetLocale === 'id' ? '/id' : '/';
      return;
    }
    const currentPath = pathname || '/cv';
    // @ts-expect-error -- next-intl router accepts dynamic pathname + params
    router.replace({ pathname: currentPath, params }, { locale: targetLocale });
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <header className="border-b border-[#E8E6E1] pb-6 mb-8 print:mb-4 print:pb-3">
      {/* Top Utility Bar (Hidden in Print) */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E8E6E1]/60 print:hidden">
        {/* Domain Badge */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#007F95] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#007F95]"></span>
          </span>
          <span className="font-mono text-xs tracking-wider text-[#202124] font-medium">
            cv.saktiarif.my.id
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <div
            className="flex items-center rounded-md border border-[#E8E6E1] bg-[#FFFFFF] p-0.5 text-xs font-mono shadow-2xs"
            role="group"
            aria-label="Language selector"
          >
            <button
              type="button"
              onClick={() => handleLocaleSwitch('id')}
              className={`px-2 py-1 rounded transition-colors ${
                locale === 'id'
                  ? 'bg-[#202124] text-white font-medium'
                  : 'text-[#777B80] hover:text-[#202124]'
              }`}
              aria-pressed={locale === 'id'}
            >
              ID
            </button>
            <span className="text-[#E8E6E1] px-0.5 select-none">|</span>
            <button
              type="button"
              onClick={() => handleLocaleSwitch('en')}
              className={`px-2 py-1 rounded transition-colors ${
                locale === 'en'
                  ? 'bg-[#202124] text-white font-medium'
                  : 'text-[#777B80] hover:text-[#202124]'
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
            className="flex items-center gap-1.5 rounded-md border border-[#007F95]/30 bg-[#FFFFFF] px-2.5 py-1 text-xs font-mono text-[#007F95] hover:bg-[#E6F3F4] transition-colors shadow-2xs"
          >
            <Printer className="h-3.5 w-3.5" />
            <span className="hidden sm:inline font-medium">PDF</span>
          </button>

          {/* Return to Main Portfolio */}
          <a
            href="https://saktiarif.my.id"
            className="flex items-center gap-1 rounded-md border border-[#E8E6E1] bg-[#FFFFFF] px-2.5 py-1 text-xs font-mono text-[#777B80] hover:text-[#202124] hover:border-[#202124] transition-colors shadow-2xs"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Portfolio</span>
          </a>
        </div>
      </div>

      {/* Candidate Masthead */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#202124]">
            {name}
          </h1>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="w-2 h-2 rounded-full bg-[#007F95]" />
            <p className="font-mono text-sm sm:text-base font-semibold text-[#007F95] tracking-wide">
              {title}
            </p>
          </div>
        </div>

        {/* Location Badge */}
        <div className="flex items-center gap-1.5 text-xs font-mono text-[#777B80] sm:self-start mt-1 sm:mt-0">
          <MapPin className="h-3.5 w-3.5 text-[#007F95] shrink-0" />
          <span>{contact.location[locale]}</span>
        </div>
      </div>

      {/* Direct Contact Links Matrix */}
      <div className="mt-4 pt-3.5 border-t border-[#E8E6E1]/60 flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-6 text-xs font-mono text-[#777B80]">
        {/* Email */}
        <div className="flex items-center gap-1.5 group">
          <Mail className="h-3.5 w-3.5 text-[#007F95] shrink-0" />
          <a
            href={`mailto:${contact.email}`}
            className="text-[#202124] hover:text-[#007F95] transition-colors"
          >
            {contact.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            aria-label={copiedEmail ? 'Email copied' : 'Copy email address'}
            className="p-0.5 text-[#777B80] hover:text-[#007F95] transition-colors print:hidden"
          >
            {copiedEmail ? (
              <Check className="h-3 w-3 text-emerald-600" />
            ) : (
              <Copy className="h-3 w-3 opacity-60 group-hover:opacity-100" />
            )}
          </button>
        </div>

        {/* GitHub */}
        <div className="flex items-center gap-1.5">
          <GithubIcon className="h-3.5 w-3.5 text-[#007F95] shrink-0" />
          <a
            href={contact.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#202124] hover:text-[#007F95] transition-colors hover:underline underline-offset-2"
          >
            {contact.github.label}
          </a>
        </div>

        {/* LinkedIn */}
        <div className="flex items-center gap-1.5">
          <LinkedinIcon className="h-3.5 w-3.5 text-[#007F95] shrink-0" />
          <a
            href={contact.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#202124] hover:text-[#007F95] transition-colors hover:underline underline-offset-2"
          >
            {contact.linkedin.label}
          </a>
        </div>

        {/* Portfolio */}
        <div className="flex items-center gap-1.5">
          <Globe className="h-3.5 w-3.5 text-[#007F95] shrink-0" />
          <a
            href={contact.portfolio.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#202124] hover:text-[#007F95] transition-colors hover:underline underline-offset-2"
          >
            {contact.portfolio.label}
          </a>
        </div>
      </div>
    </header>
  );
}
