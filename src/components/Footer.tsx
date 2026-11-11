'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { ArrowUp } from 'lucide-react';
import { OWNER_PROFILE } from '@/data/portfolio';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export function Footer() {
  const t = useTranslations('footer');
  const navT = useTranslations('nav');
  const pathname = usePathname();

  if (pathname?.startsWith('/cv')) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)] py-12 sm:py-16">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <div className="p-8 sm:p-12 rounded-3xl theme-card shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Colophon Column */}
            <div className="md:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--accent-primary)]" />
                <span className="font-display font-extrabold text-lg text-[var(--text-primary)]">
                  SAKTI<span className="text-[var(--accent-primary)]">.</span>
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)] uppercase pl-2 border-l border-[var(--border-hairline)]">
                  Full-Stack &amp; Games
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md leading-relaxed">
                {t('colophon')}
              </p>

              <div className="flex items-center gap-3 pt-2 text-[var(--text-muted)]">
                <a
                  href={OWNER_PROFILE.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-2 rounded-full theme-chip hover:text-[var(--accent-primary)] transition-colors"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href={OWNER_PROFILE.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2 rounded-full theme-chip hover:text-[var(--accent-primary)] transition-colors"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Navigation Directory */}
            <div className="md:col-span-3 space-y-3 font-mono text-xs">
              <span className="text-[var(--text-muted)] uppercase block tracking-wider font-semibold">
                {t('navigation')}
              </span>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li>
                  <Link href="/" prefetch={true} className="hover:text-[var(--accent-primary)] transition-colors">
                    00 // {navT('home')}
                  </Link>
                </li>
                <li>
                  <Link href="/projects" prefetch={true} className="hover:text-[var(--accent-primary)] transition-colors">
                    01 // {navT('projects')}
                  </Link>
                </li>
                <li>
                  <Link href="/about" prefetch={true} className="hover:text-[var(--accent-primary)] transition-colors">
                    02 // {navT('about')}
                  </Link>
                </li>
                <li>
                  <Link href="/experience" prefetch={true} className="hover:text-[var(--accent-primary)] transition-colors">
                    03 // {navT('experience')}
                  </Link>
                </li>
                <li>
                  <Link href="/certificates" prefetch={true} className="hover:text-[var(--accent-primary)] transition-colors">
                    04 // {navT('certificates')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Back to top button */}
            <div className="md:col-span-3 flex flex-col justify-end items-start md:items-end gap-6">
              <button
                type="button"
                onClick={scrollToTop}
                className="interactive-btn interactive-btn-secondary px-5 py-2.5 text-xs font-mono shadow-sm"
              >
                <span>{t('backToTop')}</span>
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[var(--text-muted)]">
            <span>© {new Date().getFullYear()} {OWNER_PROFILE.name}. {t('rights')}</span>
            <span>Crafted with Next.js 15, Tailwind CSS &amp; Godot Inspiration</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
