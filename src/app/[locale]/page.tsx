import React from 'react';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link, type Locale } from '@/i18n/routing';
import {
  PROJECTS,
  TECH_STACK,
  EXPERIENCES,
  CERTIFICATES,
  tField,
  getProjectBySlug,
} from '@/data/portfolio';
import { ProjectInteractiveStage } from '@/components/ProjectInteractiveStage';
import { ContactSection } from '@/components/ContactSection';
import { LiveClock } from '@/components/LiveClock';
import { ArrowUpRight, ArrowDown } from 'lucide-react';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const heroT = await getTranslations({ locale, namespace: 'hero' });
  const homeT = await getTranslations({ locale, namespace: 'home' });
  const expT = await getTranslations({ locale, namespace: 'experiencePage' });
  const certT = await getTranslations({ locale, namespace: 'certificatesPage' });

  const critiplay = getProjectBySlug('critiplay')!;
  const laundryflow = getProjectBySlug('laundryflow')!;
  const negeriKelabu = getProjectBySlug('negeri-kelabu')!;

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* ===================================================================
          HERO: BOLD EDITORIAL OPENING
      =================================================================== */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 pt-10 sm:pt-16">
        {/* Top Status & Context Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-4 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
            <span className="text-secondary-ink">
              {locale === 'id' ? 'Terbuka untuk proyek & kolaborasi' : 'Available for select roles & projects'}
            </span>
          </div>
          <div className="flex items-center gap-6 text-muted-ink">
            <LiveClock />
            <span className="hidden sm:inline">FULL-STACK &amp; GAME DEV</span>
          </div>
        </div>

        {/* Hero Narrative Grid */}
        <div className="pt-10 sm:pt-16 pb-12 sm:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-8 space-y-6">
            <span className="font-mono text-xs text-accent uppercase tracking-widest block">
              {locale === 'id' ? 'Halo, saya Sakti' : 'Hi, I am Sakti'} — {heroT('rolePrimary')} &amp; {heroT('roleSecondary')}
            </span>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.5rem] font-bold text-primary-ink leading-[1.05] tracking-tight">
              Building resilient software systems. Crafting atmospheric digital worlds.
            </h1>

            <p className="text-base sm:text-xl text-secondary-ink font-light leading-relaxed max-w-[58ch]">
              {heroT('lead')}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#work"
                className="interactive-btn interactive-btn-primary min-h-[46px] px-6 py-2.5 font-mono text-xs uppercase tracking-wider"
              >
                <span>{heroT('ctaPrimary')}</span>
                <ArrowDown className="h-4 w-4" />
              </a>
              <Link
                href="/about"
                className="interactive-btn interactive-btn-secondary min-h-[46px] px-6 py-2.5 font-mono text-xs uppercase tracking-wider"
              >
                <span>{heroT('ctaSecondary')}</span>
              </Link>
            </div>
          </div>

          {/* Right Highlights Dossier (inspired by Bryan Jericho & Harithya) */}
          <div className="lg:col-span-4 border border-hairline bg-surface p-6 sm:p-8 space-y-6">
            <div>
              <span className="font-mono text-xs text-muted-ink uppercase block mb-1">
                Discipline Focus
              </span>
              <p className="font-display text-lg font-semibold text-primary-ink">
                Web Platforms, Mobile &amp; Indie Games
              </p>
              <p className="text-xs text-secondary-ink mt-1">
                Relational APIs, offline-first mobile workflows, and Godot RPG systems.
              </p>
            </div>

            <div className="border-t border-hairline pt-4 space-y-2">
              <span className="font-mono text-xs text-muted-ink uppercase block">
                Primary Architecture
              </span>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {['React', 'TypeScript', 'Laravel', 'MySQL', 'Flutter', 'Odoo', 'Godot 4', 'GDScript'].map(t => (
                  <span key={t} className="px-2 py-0.5 border border-hairline bg-canvas text-primary-ink">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-hairline pt-4 flex items-center justify-between font-mono text-xs text-secondary-ink">
              <span>{heroT('locationValue')}</span>
              <span className="text-accent font-semibold">UTC+7</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          01 — SELECTED WORK (EXHIBITION OF 3 DISTINCT PROJECTS)
      =================================================================== */}
      <section id="work" className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 space-y-24 sm:space-y-32">
        <div className="border-b border-hairline pb-6 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <span className="font-mono text-xs text-accent uppercase tracking-wider">
              01 — {homeT('selectedWorksIndex')}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-ink mt-1">
              {homeT('selectedWorksTitle')}
            </h2>
          </div>
          <Link
            href="/projects"
            className="font-mono text-xs text-secondary-ink hover:text-accent transition-colors flex items-center gap-1.5"
          >
            <span>{homeT('viewAllWorks')}</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* -----------------------------------------------------------------
            PROJECT 1: CRITIPLAY
        ----------------------------------------------------------------- */}
        <article className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 font-mono text-xs text-secondary-ink mb-2">
                <span>01</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>{tField(critiplay.category, locale)}</span>
              </div>
              <h3 className="font-display text-3xl sm:text-5xl font-bold text-primary-ink tracking-tight">
                {critiplay.name}
              </h3>
              <p className="text-base sm:text-lg text-secondary-ink mt-2 max-w-2xl leading-relaxed">
                {tField(critiplay.tagline, locale)}
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link
                href="/projects/critiplay"
                className="interactive-btn interactive-btn-secondary min-h-[42px] px-4 py-2 font-mono text-xs uppercase"
              >
                <span>{homeT('readCaseStudy')}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Interactive Rating Studio */}
          <ProjectInteractiveStage slug="critiplay" locale={locale} />
        </article>

        {/* -----------------------------------------------------------------
            PROJECT 2: LAUNDRYFLOW
        ----------------------------------------------------------------- */}
        <article className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 font-mono text-xs text-secondary-ink mb-2">
                <span>02</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>{tField(laundryflow.category, locale)}</span>
              </div>
              <h3 className="font-display text-3xl sm:text-5xl font-bold text-primary-ink tracking-tight">
                {laundryflow.name}
              </h3>
              <p className="text-base sm:text-lg text-secondary-ink mt-2 max-w-2xl leading-relaxed">
                {tField(laundryflow.tagline, locale)}
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link
                href="/projects/laundryflow"
                className="interactive-btn interactive-btn-secondary min-h-[42px] px-4 py-2 font-mono text-xs uppercase"
              >
                <span>{homeT('readCaseStudy')}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Interactive Mobile-to-Odoo Stage Stepper */}
          <ProjectInteractiveStage slug="laundryflow" locale={locale} />
        </article>

        {/* -----------------------------------------------------------------
            PROJECT 3: NEGERI KELABU
        ----------------------------------------------------------------- */}
        <article className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 font-mono text-xs text-secondary-ink mb-2">
                <span>03</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-ochre" />
                <span>{tField(negeriKelabu.category, locale)}</span>
              </div>
              <h3 className="font-display text-3xl sm:text-5xl font-bold text-primary-ink tracking-tight">
                {negeriKelabu.name}
              </h3>
              <p className="text-base sm:text-lg text-secondary-ink mt-2 max-w-2xl leading-relaxed">
                {tField(negeriKelabu.tagline, locale)}
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link
                href="/projects/negeri-kelabu"
                className="interactive-btn interactive-btn-secondary min-h-[42px] px-4 py-2 font-mono text-xs uppercase"
              >
                <span>{homeT('readCaseStudy')}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Interactive World Clock & Dialogue Simulator */}
          <ProjectInteractiveStage slug="negeri-kelabu" locale={locale} />
        </article>
      </section>

      {/* ===================================================================
          02 — DUAL PRACTICE PERSPECTIVE
      =================================================================== */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <div className="border-t border-b border-hairline py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-3">
              <span className="font-mono text-xs text-accent uppercase tracking-wider">
                02 — {homeT('focusIndex')}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-ink leading-tight">
                {homeT('focusTitle')}
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-5 text-base sm:text-lg text-secondary-ink leading-relaxed">
              <p className="text-primary-ink font-medium">
                {homeT('focusIntro')}
              </p>
              <p>
                {locale === 'id'
                  ? 'Dalam rekayasa sistem web & enterprise, disiplin validasi data, kejelasan kontrak API, dan normalisasi skema menjaga agar aplikasi tidak mudah rusak. Namun rekayasa konvensional sering melupakan kepuasan fisik saat berinteraksi.'
                  : 'In web and enterprise systems engineering, disciplined data validation, explicit API contracts, and schema normalization keep applications resilient. Yet conventional software often forgets the visceral satisfaction of human interaction.'}
              </p>
              <p>
                {locale === 'id'
                  ? 'Pengembangan game menuntut ketanggapan frame-level, arsitektur state machine yang ketat, dan perhatian mendalam pada suasana antarmuka. Dengan menyatukan kedua sudut pandang ini, saya membangun produk yang kokoh di belakang layar sekaligus hidup saat disentuh.'
                  : 'Game development demands frame-level responsiveness, airtight state machine architectures, and a deep sensitivity to mood and pacing. By uniting both perspectives, I engineer software that is architecturally solid beneath the surface and unmistakably alive when interacted with.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          03 — TECHNICAL CAPABILITIES & TOOLING
      =================================================================== */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <div className="pb-8 border-b border-hairline">
          <span className="font-mono text-xs text-accent uppercase tracking-wider">
            03 — {homeT('stackIndex')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-ink mt-1">
            {homeT('stackTitle')}
          </h2>
          <p className="text-secondary-ink text-sm sm:text-base mt-2 max-w-2xl">
            {homeT('stackSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border-hairline)]">
          {TECH_STACK.map((category) => (
            <div key={category.id} className="pt-6 lg:pt-0 lg:px-6 first:pl-0 space-y-4">
              <div>
                <span className="font-mono text-xs text-muted-ink">
                  {category.code}
                </span>
                <h3 className="font-display text-xl font-bold text-primary-ink mt-1">
                  {tField(category.title, locale)}
                </h3>
                <p className="text-xs text-secondary-ink mt-1">
                  {tField(category.description, locale)}
                </p>
              </div>

              <ul className="space-y-3 border-t border-hairline pt-4">
                {category.items.map((item) => (
                  <li key={item.name} className="space-y-0.5">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="font-semibold text-primary-ink">
                        {item.name}
                      </span>
                      <span className="text-muted-ink">[{item.context}]</span>
                    </div>
                    <p className="text-xs text-secondary-ink">
                      {tField(item.role, locale)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================
          04 — EXPERIENCE & CREDENTIALS
      =================================================================== */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 border-t border-hairline pt-16 sm:pt-20">
          {/* Experience Ledger */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-4">
              <div>
                <span className="font-mono text-xs text-accent uppercase tracking-wider">
                  04 — {homeT('experienceIndex')}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-primary-ink mt-1">
                  {homeT('experienceTitle')}
                </h3>
              </div>
              <Link
                href="/experience"
                className="font-mono text-xs text-secondary-ink hover:text-accent transition-colors flex items-center gap-1"
              >
                <span>{homeT('experienceLink')}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-6 divide-y divide-[var(--border-hairline)]">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="pt-6 first:pt-0 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                    <span className="text-muted-ink">
                      {exp.index} // {tField(exp.period, locale)}
                    </span>
                    <span
                      className={`px-2 py-0.5 border ${
                        exp.isPlaceholder
                          ? 'border-[var(--accent-secondary)] text-accent-ochre'
                          : 'border-hairline bg-surface text-accent'
                      }`}
                    >
                      {exp.isPlaceholder
                        ? expT('typePlaceholder')
                        : expT('typePractice')}
                    </span>
                  </div>
                  <h4 className="font-display text-xl font-bold text-primary-ink">
                    {tField(exp.role, locale)}
                  </h4>
                  <p className="font-mono text-xs text-secondary-ink">
                    {tField(exp.organization, locale)} — {tField(exp.domain, locale)}
                  </p>
                  <p className="text-sm text-secondary-ink leading-relaxed">
                    {tField(exp.summary, locale)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Credentials Ledger */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-4">
              <div>
                <span className="font-mono text-xs text-accent uppercase tracking-wider">
                  05 — {homeT('certificatesIndex')}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-primary-ink mt-1">
                  {homeT('certificatesTitle')}
                </h3>
              </div>
              <Link
                href="/certificates"
                className="font-mono text-xs text-secondary-ink hover:text-accent transition-colors flex items-center gap-1"
              >
                <span>{homeT('certificatesLink')}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-5 divide-y divide-[var(--border-hairline)]">
              {CERTIFICATES.map((cert) => (
                <div key={cert.id} className="pt-5 first:pt-0 space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-accent font-semibold">{cert.code}</span>
                    <span className="text-accent-ochre border border-[var(--accent-secondary)] px-2 py-0.5 text-[11px]">
                      {certT('placeholderBadge')}
                    </span>
                  </div>
                  <h4 className="font-display text-lg font-bold text-primary-ink">
                    {tField(cert.title, locale)}
                  </h4>
                  <p className="font-mono text-xs text-secondary-ink">
                    {tField(cert.issuer, locale)} · {tField(cert.date, locale)}
                  </p>
                  <p className="text-xs text-muted-ink leading-relaxed">
                    {tField(cert.statusNote, locale)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          05 — CONTACT SECTION
      =================================================================== */}
      <ContactSection />
    </div>
  );
}
