'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, type Locale } from '@/i18n/routing';
import { OWNER_PROFILE } from '@/data/portfolio';
import { ArrowDown, ArrowUpRight, Mail, FileText, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/SocialIcons';
import { InteractiveDevDeck } from '@/components/InteractiveDevDeck';

export function HeroInteractive() {
  const t = useTranslations('hero');
  const locale = useLocale() as Locale;

  const roles = locale === 'id' ? [
    'Full-Stack Developer & Game Creator',
    'Arsitektur React, Next.js & Laravel',
    'Pengembangan Game Interaktif di Godot 4',
    'Integrasi Mobile Flutter & Odoo ERP',
    'Desain Basis Data Relasional & REST APIs'
  ] : [
    'Full-Stack Developer & Game Creator',
    'Architecting React, Next.js & Laravel Systems',
    'Crafting Atmospheric Games in Godot 4',
    'Integrating Flutter Mobile with Odoo ERP',
    'Designing Relational MySQL & Clean APIs'
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(75);

  useEffect(() => {
    const fullText = roles[currentRoleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        if (displayText.length + 1 === fullText.length) {
          // Pause at full text
          setTypingSpeed(2200);
          setIsDeleting(true);
        } else {
          setTypingSpeed(55);
        }
      } else {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(250);
        } else {
          setTypingSpeed(30);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, roles, typingSpeed]);

  return (
    <section className="relative overflow-hidden pt-6 pb-20 sm:pt-12 sm:pb-28">
      {/* Background Kinetic Accents */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-24 right-[-10%] sm:right-[-5%] w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] opacity-[0.14] dark:opacity-[0.22] select-none"
      >
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full animate-[spin_60s_linear_infinite]"
        >
          <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" fill="none" className="text-[var(--accent-primary)]" />
          <circle cx="200" cy="200" r="140" stroke="currentColor" strokeWidth="1" fill="none" className="text-[var(--text-muted)]" />
          <polygon points="200,30 350,320 50,320" stroke="currentColor" strokeWidth="1" fill="none" className="text-[var(--accent-primary)]" />
          <circle cx="200" cy="200" r="6" fill="currentColor" className="text-[var(--accent-primary)]" />
        </svg>
      </div>

      {/* Subtle radial glow mesh */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[var(--accent-primary)] opacity-[0.06] blur-[120px] rounded-full"
      />

      <div className="relative mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        {/* Top Badges Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-8 sm:pb-12 border-b border-[var(--border-hairline)]">
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full theme-chip backdrop-blur-md text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-primary)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-primary)]" />
            </span>
            <span className="text-[var(--text-secondary)] font-medium">
              {locale === 'id' ? 'Terbuka untuk pekerjaan & proyek kolaborasi' : 'Available for select roles & collaborations'}
            </span>
          </div>
        </div>

        {/* Hero Main Content Grid: Narrative Left, Interactive Dev Deck Right */}
        <div className="pt-8 sm:pt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Typewriter Code Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl theme-card font-mono text-xs sm:text-sm text-[var(--accent-primary)] shadow-sm">
              <span className="text-[var(--text-muted)] font-bold select-none">&gt;</span>
              <span className="text-[var(--text-primary)] font-semibold">{displayText}</span>
              <span className="inline-block w-2 h-4 bg-[var(--accent-primary)] animate-pulse" />
            </div>

            {/* Main Display Headline */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.08]">
              {locale === 'id' ? (
                <>
                  Halo, saya <span className="text-[var(--accent-primary)]">Sakti Arif</span>.{' '}
                  <span className="block mt-2 text-3xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-secondary)]">
                    Membangun sistem web terpercaya &amp; dunia game interaktif.
                  </span>
                </>
              ) : (
                <>
                  Hi, I&apos;m <span className="text-[var(--accent-primary)]">Sakti Arif</span>.{' '}
                  <span className="block mt-2 text-3xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-secondary)]">
                    Building dependable software systems &amp; interactive game worlds.
                  </span>
                </>
              )}
            </h1>

            {/* Editorial Lead Paragraph */}
            <p className="text-base sm:text-xl text-[var(--text-secondary)] font-light leading-relaxed max-w-2xl">
              {locale === 'id' ? (
                <>
                  Pengembang perangkat lunak independen yang menggabungkan ketelitian rekayasa <strong className="text-[var(--text-primary)] font-semibold">Full-Stack (React, Laravel, Flutter, Odoo)</strong> dengan eksplorasi kreatif mekanik game di <strong className="text-[var(--text-primary)] font-semibold">Godot Engine 4</strong>. Menghadirkan solusi digital yang bersih, terukur, dan bermakna.
                </>
              ) : (
                <>
                  An independent developer bridging structured <strong className="text-[var(--text-primary)] font-semibold">Full-Stack engineering (React, Laravel, Flutter, Odoo)</strong> with experimental gameplay systems in <strong className="text-[var(--text-primary)] font-semibold">Godot Engine 4</strong>. Focused on architecture, tactile responsiveness, and purposeful digital craft.
                </>
              )}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#selected-works"
                className="interactive-btn interactive-btn-primary px-6 py-3.5 text-xs font-mono uppercase tracking-wider shadow-lg"
              >
                <span>{locale === 'id' ? 'Lihat Karya Terpilih' : 'Explore Selected Works'}</span>
                <ArrowDown className="h-4 w-4" />
              </a>

              <a
                href="#contact"
                className="interactive-btn interactive-btn-secondary px-6 py-3.5 text-xs font-mono uppercase tracking-wider"
              >
                <Mail className="h-4 w-4 text-[var(--accent-primary)]" />
                <span>{locale === 'id' ? 'Hubungi Saya' : 'Get in Touch'}</span>
              </a>

              <a
                href="https://cv.saktiarif.my.id"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-mono text-xs font-medium transition-colors"
              >
                <FileText className="h-4 w-4" />
                <span>Resume / CV</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Social Quick-Access Icons Bar */}
            <div className="flex items-center gap-3 pt-2 text-[var(--text-muted)]">
              <span className="text-xs font-mono mr-1">Find me on:</span>
              <a
                href={OWNER_PROFILE.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-full theme-chip hover:text-[var(--accent-primary)] transition-all hover:scale-105"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href={OWNER_PROFILE.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-full theme-chip hover:text-[var(--accent-primary)] transition-all hover:scale-105"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${OWNER_PROFILE.email}`}
                aria-label="Email Sakti"
                className="p-2.5 rounded-full theme-chip hover:text-[var(--accent-primary)] transition-all hover:scale-105"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Interactive Object Column: Draggable Micro-Deck */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <InteractiveDevDeck />
          </div>
        </div>

        {/* Metric Cards Row */}
        <div className="mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-[var(--border-hairline)]">
          <div className="p-5 sm:p-6 rounded-2xl theme-card">
            <span className="block font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
              3+
            </span>
            <span className="block font-mono text-xs text-[var(--accent-primary)] uppercase mt-1 font-semibold">
              Years Experience
            </span>
            <p className="text-xs text-[var(--text-muted)] mt-1.5">
              Full-stack platforms &amp; game development loops.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl theme-card">
            <span className="block font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
              3
            </span>
            <span className="block font-mono text-xs text-[var(--accent-primary)] uppercase mt-1 font-semibold">
              Flagship Projects
            </span>
            <p className="text-xs text-[var(--text-muted)] mt-1.5">
              CritiPlay, Daus Anak Soleh &amp; Website Pilketos.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl theme-card">
            <span className="block font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
              2
            </span>
            <span className="block font-mono text-xs text-[var(--accent-primary)] uppercase mt-1 font-semibold">
              Dual Disciplines
            </span>
            <p className="text-xs text-[var(--text-muted)] mt-1.5">
              Enterprise Web/Mobile + Godot Game Mechanics.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl theme-card">
            <span className="block font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
              100%
            </span>
            <span className="block font-mono text-xs text-[var(--accent-primary)] uppercase mt-1 font-semibold">
              Architecture Craft
            </span>
            <p className="text-xs text-[var(--text-muted)] mt-1.5">
              Clean relational schemas, responsive ergonomics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
