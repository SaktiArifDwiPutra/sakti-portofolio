'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { Link, usePathname, useRouter, type Locale } from '@/i18n/routing';
import { useTheme } from './ThemeProvider';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, locale]);

  const navItems = [
    { href: '/', label: t('home'), code: '00' },
    { href: '/projects', label: t('projects'), code: '01' },
    { href: '/about', label: t('about'), code: '02' },
    { href: '/experience', label: t('experience'), code: '03' },
    { href: '/certificates', label: t('certificates'), code: '04' },
  ];

  const isRouteActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleLocaleSwitch = (targetLocale: Locale) => {
    if (targetLocale === locale) return;
    // Preserve dynamic [slug] parameter if present
    // @ts-expect-error -- next-intl router accepts dynamic pathname + params
    router.replace({ pathname, params }, { locale: targetLocale });
  };

  return (
    <header className="sticky top-0 z-50 w-full px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4">
      <div className="mx-auto flex max-w-[1360px] items-center justify-between rounded-full border border-[var(--border-hairline)] bg-[var(--bg-glass)] px-4 sm:px-6 py-2.5 backdrop-blur-xl shadow-lg transition-colors">
        {/* Brand Identity */}
        <div className="flex items-center">
          <Link
            href="/"
            prefetch={true}
            className="group flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)] focus-visible:outline-offset-4"
          >
            <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
              SAKTI<span className="text-[var(--accent-primary)]">.</span>
            </span>
            <span className="hidden md:inline-flex items-center text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider pl-2 border-l border-[var(--border-hairline)]">
              Full-Stack &amp; Games
            </span>
          </Link>
        </div>

        {/* Desktop Navigation with prefetch */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center justify-center gap-1"
        >
          {navItems.map((item) => {
            const active = isRouteActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)] ${
                  active
                    ? 'bg-[var(--chip-bg)] text-[var(--text-primary)] font-bold border border-[var(--border-strong)] shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--chip-bg)]'
                }`}
              >
                <span className={`text-[10px] ${active ? 'text-[var(--accent-primary)] font-bold' : 'text-[var(--text-muted)]'}`}>
                  {item.code}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Telemetry Strip & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher (EN / ID) */}
          <div
            role="group"
            aria-label={t('switchLanguage')}
            className="inline-flex items-center rounded-full border border-[var(--border-hairline)] bg-[var(--chip-bg)] p-0.5"
          >
            {(['en', 'id'] as const).map((lang) => {
              const isCurrent = locale === lang;
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => handleLocaleSwitch(lang)}
                  aria-pressed={isCurrent}
                  className={`h-7 px-2.5 rounded-full font-mono text-xs font-semibold uppercase transition-all duration-150 ease-out active:scale-95 focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)] ${
                    isCurrent
                      ? 'bg-[var(--accent-primary)] text-[var(--accent-primary-ink)] font-bold shadow-sm'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {lang}
                </button>
              );
            })}
          </div>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t('toggleTheme')}
            title={theme === 'dark' ? t('themeLight') : t('themeDark')}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--chip-bg)] text-[var(--text-secondary)] transition-all duration-150 ease-out hover:border-[var(--accent-primary)]/40 hover:text-[var(--text-primary)] active:scale-95 focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)]"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-[var(--accent-primary)]" />
            ) : (
              <Moon className="h-4 w-4 text-[var(--accent-primary)]" />
            )}
          </button>

          {/* Mobile Drawer Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? t('closeMenu') : t('openMenu')}
            className="inline-flex md:hidden h-8 w-8 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--chip-bg)] text-[var(--text-primary)] transition-all duration-150 ease-out active:scale-95 focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)]"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-glass)] p-4 backdrop-blur-2xl shadow-2xl">
          <div className="pb-3 border-b border-[var(--border-hairline)] flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
            <span className="text-[var(--text-muted)] font-mono text-[11px] uppercase tracking-wider">PORTFOLIO // SAKTI</span>
            <span className="text-[var(--accent-primary)] font-medium">● AVAILABLE</span>
          </div>
          <ul className="pt-2 space-y-1">
            {navItems.map((item) => {
              const active = isRouteActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    prefetch={true}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? 'bg-[var(--chip-bg)] text-[var(--accent-primary)] font-bold'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--chip-bg)]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-xs opacity-60">{item.code}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
