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
    <header className="sticky top-0 z-50 w-full border-b border-hairline bg-[var(--bg-glass)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1360px] items-stretch justify-between px-4 sm:px-6 lg:px-10">
        {/* Brand Identity Cell */}
        <div className="flex items-center py-4 pr-6">
          <Link
            href="/"
            className="group flex items-baseline gap-2.5 focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)] focus-visible:outline-offset-4"
          >
            <span className="font-serif text-xl sm:text-2xl font-normal tracking-tight text-primary-ink group-hover:text-accent transition-colors">
              Sakti
            </span>
            <span className="font-mono text-[10px] text-muted-ink uppercase tracking-wider hidden sm:inline">
              / {t('edition')}
            </span>
          </Link>
        </div>

        {/* Desktop Architectural Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-stretch flex-1 justify-center"
        >
          <ul className="flex items-stretch">
            {navItems.map((item) => {
              const active = isRouteActive(item.href);
              return (
                <li key={item.href} className="flex items-stretch">
                  <Link
                    href={item.href}
                    className={`relative flex items-center gap-2 px-4 lg:px-5 text-sm font-medium transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)] -outline-offset-2 ${
                      active
                        ? 'text-primary-ink bg-surface'
                        : 'text-secondary-ink hover:text-primary-ink'
                    }`}
                  >
                    <span className="font-mono text-[11px] text-muted-ink">
                      {item.code}
                    </span>
                    <span>{item.label}</span>
                    {active && (
                      <span
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent-primary)]"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Controls Cell: Language Switcher + Theme Toggle + Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-3 pl-4 border-l border-hairline py-2">
          {/* Language Switcher (EN / ID) */}
          <div
            role="group"
            aria-label={t('switchLanguage')}
            className="inline-flex items-center border border-hairline bg-surface p-0.5"
          >
            {(['en', 'id'] as const).map((lang) => {
              const isCurrent = locale === lang;
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => handleLocaleSwitch(lang)}
                  aria-pressed={isCurrent}
                  className={`min-h-[34px] min-w-[36px] px-2.5 font-mono text-xs font-semibold uppercase transition-all duration-150 ease-out active:scale-95 focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)] ${
                    isCurrent
                      ? 'bg-[var(--accent-primary)] text-[var(--accent-primary-ink)]'
                      : 'text-secondary-ink hover:text-primary-ink'
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
            className="inline-flex min-h-[38px] min-w-[38px] items-center justify-center border border-hairline bg-surface px-2.5 text-secondary-ink transition-colors duration-150 ease-out hover:border-strong hover:text-primary-ink active:scale-95 focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)]"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-[var(--accent-primary)]" />
            ) : (
              <Moon className="h-4 w-4 text-[var(--accent-primary)]" />
            )}
            <span className="ml-1.5 hidden lg:inline font-mono text-xs">
              {theme === 'dark' ? t('themeDark') : t('themeLight')}
            </span>
          </button>

          {/* Mobile Drawer Trigger (44x44px touch target) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? t('closeMenu') : t('openMenu')}
            className="inline-flex md:hidden min-h-[44px] min-w-[44px] items-center justify-center border border-hairline bg-surface text-primary-ink transition-colors duration-150 ease-out active:scale-95 focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden border-t border-hairline bg-canvas"
        >
          <ul className="divide-y divide-[var(--border-hairline)]">
            {navItems.map((item) => {
              const active = isRouteActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex min-h-[52px] items-center justify-between px-6 py-3 text-base font-medium transition-colors duration-150 ${
                      active
                        ? 'bg-surface text-accent font-semibold'
                        : 'text-primary-ink hover:bg-surface'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-muted-ink">
                        {item.code}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-ink" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}

