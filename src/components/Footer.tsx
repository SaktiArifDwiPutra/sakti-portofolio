'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowUp } from 'lucide-react';
import { OWNER_PROFILE } from '@/data/portfolio';
import { LiveClock } from './LiveClock';

export function Footer() {
  const t = useTranslations('footer');
  const navT = useTranslations('nav');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-hairline bg-surface">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 border-x border-hairline divide-y md:divide-y-0 md:divide-x divide-[var(--border-hairline)]">
          {/* Colophon Column */}
          <div className="md:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="inline-block h-2 w-2 bg-[var(--accent-primary)]" />
                <span className="font-mono text-xs font-bold tracking-wider text-primary-ink">
                  {OWNER_PROFILE.name.toUpperCase()} // PORTFOLIO MONOGRAPH
                </span>
              </div>
              <p className="text-sm text-secondary-ink max-w-md leading-relaxed">
                {t('colophon')}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-muted-ink">
              <span>© {new Date().getFullYear()} {OWNER_PROFILE.name}. {t('rights')}</span>
              <span>·</span>
              <LiveClock />
            </div>
          </div>

          {/* Directory Column */}
          <div className="md:col-span-3 p-6 sm:p-8 lg:p-10">
            <h2 className="font-mono text-xs text-muted-ink mb-4">
              {t('navigation')}
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-secondary-ink hover:text-accent transition-colors">
                  00 / {navT('home')}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-secondary-ink hover:text-accent transition-colors">
                  01 / {navT('projects')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-secondary-ink hover:text-accent transition-colors">
                  02 / {navT('about')}
                </Link>
              </li>
              <li>
                <Link href="/experience" className="text-secondary-ink hover:text-accent transition-colors">
                  03 / {navT('experience')}
                </Link>
              </li>
              <li>
                <Link href="/certificates" className="text-secondary-ink hover:text-accent transition-colors">
                  04 / {navT('certificates')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Return to Top & Coordinates */}
          <div className="md:col-span-3 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6">
            <div>
              <span className="block font-mono text-xs text-muted-ink mb-2">
                DISCIPLINES
              </span>
              <p className="font-mono text-xs text-primary-ink">
                FULL-STACK ENGINEERING
              </p>
              <p className="font-mono text-xs text-accent-ochre mt-1">
                GAME DEVELOPMENT
              </p>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="interactive-btn interactive-btn-secondary min-h-[44px] w-full justify-between px-4 py-2.5 font-mono text-xs"
            >
              <span>{t('backToTop')}</span>
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

