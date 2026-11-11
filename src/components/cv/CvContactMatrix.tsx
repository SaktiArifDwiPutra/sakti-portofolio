'use client';

import React, { useState } from 'react';
import type { CvContactInfo } from '@/data/cv-content';
import type { Locale } from '@/i18n/routing';
import { Mail, Globe, MapPin, Check, Copy } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/SocialIcons';

interface CvContactMatrixProps {
  contact: CvContactInfo;
  locale: Locale;
  className?: string;
}

export function CvContactMatrix({ contact, locale, className = '' }: CvContactMatrixProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Fallback
    }
  };

  const locationText = contact.location[locale];

  return (
    <div className={`space-y-2 text-xs font-mono text-[#52525B] ${className}`}>
      {/* Email Item */}
      <div className="flex items-center justify-between group rounded p-1 -mx-1 hover:bg-[#FFFFFF] transition-colors">
        <a
          href={`mailto:${contact.email}`}
          className="flex items-center gap-2 text-[#1C1C1E] hover:text-[#007799] transition-colors focus-visible:outline-hidden"
          title={locale === 'id' ? 'Kirim email' : 'Send an email'}
        >
          <Mail className="h-3.5 w-3.5 text-[#007799] shrink-0" />
          <span className="truncate">{contact.email}</span>
        </a>
        <button
          type="button"
          onClick={copyEmail}
          aria-label={copiedEmail ? 'Email copied' : 'Copy email address'}
          className="p-1 text-[#71717A] hover:text-[#007799] transition-colors print:hidden shrink-0"
        >
          {copiedEmail ? (
            <Check className="h-3.5 w-3.5 text-emerald-600" />
          ) : (
            <Copy className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100" />
          )}
        </button>
      </div>

      {/* GitHub Link */}
      <div className="flex items-center gap-2 p-1 -mx-1 rounded hover:bg-[#FFFFFF] transition-colors">
        <GithubIcon className="h-3.5 w-3.5 text-[#007799] shrink-0" />
        <a
          href={contact.github.url}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate text-[#1C1C1E] hover:text-[#007799] transition-colors hover:underline underline-offset-2"
        >
          {contact.github.label}
        </a>
      </div>

      {/* LinkedIn Link */}
      <div className="flex items-center gap-2 p-1 -mx-1 rounded hover:bg-[#FFFFFF] transition-colors">
        <LinkedinIcon className="h-3.5 w-3.5 text-[#007799] shrink-0" />
        <a
          href={contact.linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate text-[#1C1C1E] hover:text-[#007799] transition-colors hover:underline underline-offset-2"
        >
          {contact.linkedin.label}
        </a>
      </div>

      {/* Portfolio Link */}
      <div className="flex items-center gap-2 p-1 -mx-1 rounded hover:bg-[#FFFFFF] transition-colors">
        <Globe className="h-3.5 w-3.5 text-[#007799] shrink-0" />
        <a
          href={contact.portfolio.url}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate text-[#1C1C1E] hover:text-[#007799] transition-colors hover:underline underline-offset-2"
        >
          {contact.portfolio.label}
        </a>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 p-1 -mx-1 text-[#52525B]">
        <MapPin className="h-3.5 w-3.5 text-[#007799] shrink-0" />
        <span className="truncate">{locationText}</span>
      </div>
    </div>
  );
}

