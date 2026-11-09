'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { OWNER_PROFILE } from '@/data/portfolio';
import { Mail, Copy, Check, ArrowUpRight, Terminal } from 'lucide-react';

export function ContactSection() {
  const t = useTranslations('contact');
  const homeT = useTranslations('home');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(OWNER_PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback if clipboard is restricted
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-hairline bg-canvas"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <div className="border-x border-hairline">
          {/* Top Section Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline px-6 py-4 bg-surface">
            <span className="font-mono text-xs font-semibold tracking-wider text-accent">
              {homeT('contactIndex')}
            </span>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent-primary)]" />
              <span className="font-mono text-xs text-secondary-ink">
                {t('statusAvailable')}
              </span>
            </div>
          </div>

          {/* Main Contact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border-hairline)]">
            {/* Left Statement */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between gap-6">
              <div>
                <h2
                  id="contact-heading"
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary-ink leading-tight mb-4"
                >
                  {homeT('contactTitle')}
                </h2>
                <p className="text-base text-secondary-ink leading-relaxed max-w-2xl">
                  {t('description')}
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-muted-ink pt-4 border-t border-hairline">
                <Terminal className="h-3.5 w-3.5 text-accent" />
                <span>{t('ownerNote')}</span>
              </div>
            </div>

            {/* Right Interactive Channels */}
            <div className="lg:col-span-5 divide-y divide-[var(--border-hairline)] bg-surface flex flex-col justify-between">
              {/* Email Channel */}
              <div className="p-6 sm:p-8">
                <span className="block font-mono text-xs text-muted-ink mb-2">
                  01 / {t('emailLabel')}
                </span>
                <p className="font-mono text-base sm:text-lg font-semibold text-primary-ink break-all mb-4">
                  {OWNER_PROFILE.email}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`mailto:${OWNER_PROFILE.email}`}
                    className="interactive-btn interactive-btn-primary min-h-[44px] px-4 py-2 text-xs font-mono"
                  >
                    <Mail className="h-4 w-4" />
                    <span>{t('emailLabel')}</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="interactive-btn interactive-btn-secondary min-h-[44px] px-4 py-2 text-xs font-mono"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-accent" />
                        <span>{t('copied')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>{t('copyEmail')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* External Profiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border-hairline)]">
                <a
                  href={OWNER_PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[72px] items-center justify-between p-6 hover:bg-elevated transition-colors"
                >
                  <div>
                    <span className="block font-mono text-[11px] text-muted-ink">
                      02 / GIT
                    </span>
                    <span className="font-semibold text-sm text-primary-ink group-hover:text-accent transition-colors">
                      {t('githubLabel')}
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-ink group-hover:text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href={OWNER_PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[72px] items-center justify-between p-6 hover:bg-elevated transition-colors"
                >
                  <div>
                    <span className="block font-mono text-[11px] text-muted-ink">
                      03 / NETWORK
                    </span>
                    <span className="font-semibold text-sm text-primary-ink group-hover:text-accent transition-colors">
                      {t('linkedinLabel')}
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-ink group-hover:text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

