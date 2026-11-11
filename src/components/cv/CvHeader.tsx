'use client';

import React, { useState } from 'react';
import type { CvContactInfo } from '@/data/cv-content';
import type { Locale } from '@/i18n/routing';
import { usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { Printer, ArrowUpRight, Mail, Globe, MapPin, Check, Copy } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/SocialIcons';
import { CvPhotoFrame } from './CvPhotoFrame';

interface CvHeaderProps {
  name: string;
  title: string;
  photoUrl: string;
  contact: CvContactInfo;
  locale: Locale;
}

export function CvHeader({ name, title, photoUrl, contact, locale }: CvHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const isId = locale === 'id';

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

  const navLinks = [
    { href: '#profile', label: isId ? 'Profil' : 'Profile' },
    { href: '#experience', label: isId ? 'Pengalaman' : 'Experience' },
    { href: '#projects', label: isId ? 'Proyek' : 'Projects' },
    { href: '#skills', label: isId ? 'Keahlian' : 'Skills' },
    { href: '#education', label: isId ? 'Pendidikan' : 'Education' },
    { href: '#credentials', label: isId ? 'Kredensial' : 'Credentials' },
  ];

  return (
    <header className="mb-10 print:mb-4">
      {/* Top Sticky Utility Navigation (Hidden in Print) */}
      <nav
        aria-label="CV navigation and quick controls"
        className="sticky top-0 z-40 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 mb-6 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E8E6E1] transition-all print:hidden"
      >
        <div className="mx-auto max-w-[1040px] flex items-center justify-between gap-3">
          {/* Identity Domain Badge */}
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-[#007F95] text-white font-mono font-bold text-xs flex items-center justify-center shadow-2xs">
              SA
            </span>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span className="font-mono text-xs tracking-wider text-[#1E2022] font-semibold hidden sm:inline">
                cv.saktiarif.my.id
              </span>
            </div>
          </div>

          {/* Quick Anchor Jump Links */}
          <div className="hidden md:flex items-center gap-4 text-xs font-mono text-[#777B80]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#007F95] font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Language Switcher */}
            <div
              className="flex items-center rounded-lg border border-[#E8E6E1] bg-[#FFFFFF] p-0.5 text-xs font-mono shadow-2xs"
              role="group"
              aria-label="Language selector"
            >
              <button
                type="button"
                onClick={() => handleLocaleSwitch('id')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  locale === 'id'
                    ? 'bg-[#1E2022] text-white font-medium shadow-2xs'
                    : 'text-[#777B80] hover:text-[#1E2022]'
                }`}
                aria-pressed={locale === 'id'}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => handleLocaleSwitch('en')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  locale === 'en'
                    ? 'bg-[#1E2022] text-white font-medium shadow-2xs'
                    : 'text-[#777B80] hover:text-[#1E2022]'
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
              title={isId ? 'Cetak atau Simpan PDF' : 'Print or Save as PDF'}
              className="flex items-center gap-1.5 rounded-lg border border-[#007F95]/30 bg-[#FFFFFF] px-3 py-1.5 text-xs font-mono text-[#007F95] hover:bg-[#E6F3F4] transition-all shadow-2xs hover:shadow-xs active:scale-95"
            >
              <Printer className="h-3.5 w-3.5" />
              <span className="font-semibold">PDF</span>
            </button>

            {/* Return to Main Portfolio */}
            <a
              href="https://saktiarif.my.id"
              title={isId ? 'Kunjungi Portfolio Utama' : 'Visit Main Portfolio'}
              className="flex items-center gap-1 rounded-lg border border-[#E8E6E1] bg-[#FFFFFF] px-3 py-1.5 text-xs font-mono text-[#777B80] hover:text-[#1E2022] hover:border-[#1E2022]/40 transition-all shadow-2xs hover:shadow-xs"
            >
              <span className="hidden sm:inline">Portfolio</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </nav>

      {/* Main Candidate Hero Card */}
      <div className="relative border border-[#E8E6E1] border-t-4 border-t-[#007F95] bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-7">
          {/* Portrait Photo */}
          <CvPhotoFrame photoUrl={photoUrl} name={name} />

          {/* Identity & Status */}
          <div className="flex-1 text-center sm:text-left min-w-0">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 mb-2.5 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-xs font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>
                {isId
                  ? 'Terbuka untuk Peluang Kerja & Kolaborasi'
                  : 'Open to Software Engineering Roles'}
              </span>
            </div>

            {/* Name & Title */}
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1E2022]">
              {name}
            </h1>
            <p className="font-sans text-base sm:text-lg font-semibold text-[#007F95] mt-1">
              {title}
            </p>

            {/* Location */}
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-mono text-[#777B80] mt-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#007F95] shrink-0" />
              <span>{contact.location[locale]}</span>
            </div>

            {/* Direct Contact Pills Row */}
            <div className="mt-5 pt-4 border-t border-[#E8E6E1]/70 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-mono">
              {/* Email with 1-Click Copy */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF9F6] border border-[#E8E6E1] px-3.5 py-1 text-[#1E2022] hover:border-[#007F95]/50 transition-colors shadow-2xs group">
                <Mail className="h-3.5 w-3.5 text-[#007F95] shrink-0" />
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-[#007F95] transition-colors"
                >
                  {contact.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={copiedEmail ? 'Email copied' : 'Copy email address'}
                  title={copiedEmail ? 'Copied!' : 'Copy to clipboard'}
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
              <a
                href={contact.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF9F6] border border-[#E8E6E1] px-3.5 py-1 text-[#1E2022] hover:border-[#007F95]/50 hover:text-[#007F95] transition-colors shadow-2xs"
              >
                <GithubIcon className="h-3.5 w-3.5 text-[#007F95] shrink-0" />
                <span>GitHub</span>
                <ArrowUpRight className="h-3 w-3 opacity-60" />
              </a>

              {/* LinkedIn */}
              <a
                href={contact.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF9F6] border border-[#E8E6E1] px-3.5 py-1 text-[#1E2022] hover:border-[#007F95]/50 hover:text-[#007F95] transition-colors shadow-2xs"
              >
                <LinkedinIcon className="h-3.5 w-3.5 text-[#007F95] shrink-0" />
                <span>LinkedIn</span>
                <ArrowUpRight className="h-3 w-3 opacity-60" />
              </a>

              {/* Portfolio */}
              <a
                href={contact.portfolio.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF9F6] border border-[#E8E6E1] px-3.5 py-1 text-[#1E2022] hover:border-[#007F95]/50 hover:text-[#007F95] transition-colors shadow-2xs"
              >
                <Globe className="h-3.5 w-3.5 text-[#007F95] shrink-0" />
                <span>saktiarif.my.id</span>
                <ArrowUpRight className="h-3 w-3 opacity-60" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
