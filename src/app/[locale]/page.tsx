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
import { ArrowUpRight, ArrowRight } from 'lucide-react';

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
    <div className="space-y-24 sm:space-y-36">
      {/* ===================================================================
          01 / MASTHEAD & EDITORIAL OPENING SPREAD
      =================================================================== */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 pt-12 sm:pt-20">
        {/* Subtle Archival Meta Strip */}
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-hairline pb-4 font-mono text-xs text-muted-ink">
          <span>PORTFOLIO MONOGRAPH // 2026 EDITION</span>
          <div className="flex items-center gap-6">
            <span>{heroT('locationValue')}</span>
            <span className="text-accent">● AVAILABLE FOR WORK</span>
          </div>
        </div>

        {/* Monumental Editorial Headline */}
        <div className="pt-10 sm:pt-16 pb-12 sm:pb-20">
          <h1 className="text-4xl sm:text-6xl lg:text-[4.75rem] font-bold tracking-tight text-primary-ink leading-[1.04] max-w-5xl">
            Building dependable <span className="font-serif italic font-normal text-secondary-ink">software systems</span> and expressive <span className="font-serif italic font-normal text-accent">interactive worlds</span>.
          </h1>

          {/* Asymmetric Opening Narrative Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 pt-12 sm:pt-16 border-t border-hairline mt-12 sm:mt-16 items-start">
            <div className="lg:col-span-8 space-y-6">
              <p className="text-lg sm:text-2xl text-primary-ink font-light leading-relaxed max-w-[55ch]">
                {heroT('lead')}
              </p>
              <div className="flex flex-wrap items-center gap-5 pt-4">
                <a
                  href="#exhibition"
                  className="interactive-btn interactive-btn-primary min-h-[46px] px-6 py-2.5 font-mono text-xs uppercase tracking-wider"
                >
                  <span>{heroT('ctaPrimary')}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/about"
                  className="interactive-btn interactive-btn-secondary min-h-[46px] px-6 py-2.5 font-mono text-xs uppercase tracking-wider"
                >
                  <span>{heroT('ctaSecondary')}</span>
                </Link>
              </div>
            </div>

            {/* Quiet Architectural Coordinates Sidebar */}
            <div className="lg:col-span-4 border-l border-hairline pl-8 lg:pl-10 space-y-6 font-mono text-xs">
              <div>
                <span className="text-muted-ink block uppercase mb-1">
                  Primary Disciplines
                </span>
                <p className="text-primary-ink font-sans text-sm font-semibold">
                  Full-Stack Web &amp; Mobile Systems
                </p>
                <p className="text-accent-ochre font-sans text-sm font-semibold mt-0.5">
                  Game Development &amp; Simulation
                </p>
              </div>

              <div>
                <span className="text-muted-ink block uppercase mb-1">
                  Core Runtime Environments
                </span>
                <p className="text-secondary-ink leading-relaxed">
                  React · TypeScript · Laravel · MySQL · Flutter · Odoo · Godot Engine · GDScript
                </p>
              </div>

              <div className="pt-2">
                <span className="text-muted-ink block uppercase mb-1">
                  Working Philosophy
                </span>
                <p className="text-primary-ink italic font-serif text-base leading-snug">
                  &ldquo;Structure before decoration; cross-pollination between disciplines; honest craft.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          02 / LIVING EXHIBITION: THREE BESPOKE PROJECT SPREADS
      =================================================================== */}
      <section id="exhibition" className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 space-y-28 sm:space-y-36">
        {/* Exhibition Section Header */}
        <div className="border-b border-hairline pb-6 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <span className="font-mono text-xs text-accent uppercase tracking-wider">
              {homeT('selectedWorksIndex')}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-primary-ink mt-2">
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
            PROJECT I: CRITIPLAY — WIDE EDITORIAL PLATFORM SPREAD
        ----------------------------------------------------------------- */}
        <article className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="font-mono text-xs text-accent uppercase">
                EXHIBITION 01 // {tField(critiplay.category, locale)}
              </span>
              <h3 className="font-serif text-4xl sm:text-6xl text-primary-ink mt-2 tracking-tight">
                {critiplay.name}
              </h3>
              <p className="text-lg sm:text-xl text-secondary-ink mt-3 max-w-3xl leading-relaxed">
                {tField(critiplay.tagline, locale)}
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link
                href="/projects/critiplay"
                className="interactive-btn interactive-btn-secondary min-h-[44px] px-5 py-2 font-mono text-xs uppercase"
              >
                <span>{homeT('readCaseStudy')}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Living Interactive Critique Studio */}
          <ProjectInteractiveStage slug="critiplay" locale={locale} />

          {/* Architectural Narrative Footnote */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 font-mono text-xs text-secondary-ink">
            <div>
              <span className="text-muted-ink block mb-1">01 / FRONTEND STATE</span>
              <p>Typed React &amp; TypeScript interfaces preventing payload drift across viewports.</p>
            </div>
            <div>
              <span className="text-muted-ink block mb-1">02 / BACKEND API</span>
              <p>Laravel FormRequests and API Resource transformers with eager-loaded relational queries.</p>
            </div>
            <div>
              <span className="text-muted-ink block mb-1">03 / PERSISTENCE</span>
              <p>MySQL schema with indexed foreign keys and dynamic review score aggregation.</p>
            </div>
          </div>
        </article>

        {/* -----------------------------------------------------------------
            PROJECT II: LAUNDRYFLOW — OFFSET VERTICAL DIPTYCH
        ----------------------------------------------------------------- */}
        <article className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="font-mono text-xs text-accent uppercase">
                EXHIBITION 02 // {tField(laundryflow.category, locale)}
              </span>
              <h3 className="font-serif text-4xl sm:text-6xl text-primary-ink mt-2 tracking-tight">
                {laundryflow.name}
              </h3>
              <p className="text-lg sm:text-xl text-secondary-ink mt-3 max-w-3xl leading-relaxed">
                {tField(laundryflow.tagline, locale)}
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link
                href="/projects/laundryflow"
                className="interactive-btn interactive-btn-secondary min-h-[44px] px-5 py-2 font-mono text-xs uppercase"
              >
                <span>{homeT('readCaseStudy')}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Living Interactive Mobile-to-Odoo Dispatcher */}
          <ProjectInteractiveStage slug="laundryflow" locale={locale} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 font-mono text-xs text-secondary-ink">
            <div>
              <span className="text-muted-ink block mb-1">01 / MOBILE WORKSPACE</span>
              <p>Flutter mobile client optimized for rapid shop-floor intake and stage transitions.</p>
            </div>
            <div>
              <span className="text-muted-ink block mb-1">02 / INTEGRATION BRIDGE</span>
              <p>Dart repository layer mapping Odoo XML-RPC payloads into strongly typed domain models.</p>
            </div>
            <div>
              <span className="text-muted-ink block mb-1">03 / ENTERPRISE CORE</span>
              <p>Odoo ERP business models managing unified billing, customer records, and status logs.</p>
            </div>
          </div>
        </article>

        {/* -----------------------------------------------------------------
            PROJECT III: NEGERI KELABU — ATMOSPHERIC WIDESCREEN STAGE
        ----------------------------------------------------------------- */}
        <article className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="font-mono text-xs text-accent-ochre uppercase">
                EXHIBITION 03 // {tField(negeriKelabu.category, locale)}
              </span>
              <h3 className="font-serif text-4xl sm:text-6xl text-primary-ink mt-2 tracking-tight">
                {negeriKelabu.name}
              </h3>
              <p className="text-lg sm:text-xl text-secondary-ink mt-3 max-w-3xl leading-relaxed">
                {tField(negeriKelabu.tagline, locale)}
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link
                href="/projects/negeri-kelabu"
                className="interactive-btn interactive-btn-secondary min-h-[44px] px-5 py-2 font-mono text-xs uppercase"
              >
                <span>{homeT('readCaseStudy')}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Living Interactive World Clock & Dialogue Stage */}
          <ProjectInteractiveStage slug="negeri-kelabu" locale={locale} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 font-mono text-xs text-secondary-ink">
            <div>
              <span className="text-muted-ink block mb-1">01 / WORLD STATE</span>
              <p>Godot Autoload singleton managing day-phase transitions and persistent scene flags.</p>
            </div>
            <div>
              <span className="text-muted-ink block mb-1">02 / CHARACTER FSM</span>
              <p>Finite state machine handling movement, collision areas, and context-sensitive raycasts.</p>
            </div>
            <div>
              <span className="text-muted-ink block mb-1">03 / NARRATIVE BUS</span>
              <p>Decoupled signal-driven dialogue sequences adapting dynamically to player choices.</p>
            </div>
          </div>
        </article>
      </section>

      {/* ===================================================================
          03 / THE DUAL PRACTICE ESSAY
      =================================================================== */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <div className="border-t border-b border-hairline py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono text-xs text-accent uppercase tracking-wider">
                {homeT('focusIndex')}
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-primary-ink leading-tight">
                {homeT('focusTitle')}
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-secondary-ink leading-relaxed max-w-[62ch]">
              <p className="text-primary-ink font-medium">
                {homeT('focusIntro')}
              </p>
              <p>
                {locale === 'id'
                  ? 'Dalam rekayasa sistem enterprise, disiplin validasi data, kejelasan kontrak API, dan arsitektur database menjaga agar aplikasi tidak mudah rusak. Namun rekayasa perangkat lunak konvensional sering melupakan kepuasan fisik saat berinteraksi.'
                  : 'In enterprise systems engineering, disciplined data validation, explicit API contracts, and schema normalization keep applications resilient. Yet conventional software often forgets the visceral satisfaction of human interaction.'}
              </p>
              <p>
                {locale === 'id'
                  ? 'Pengembangan game menuntut umpan balik yang seketika, pemahaman state machine yang ketat, dan perhatian mendalam pada suasana antarmuka. Dengan menyatukan kedua sudut pandang ini, saya membangun produk yang kokoh di belakang layar sekaligus hidup saat disentuh.'
                  : 'Game development demands frame-level responsiveness, airtight state machine architectures, and a deep sensitivity to mood and pacing. By uniting both perspectives, I engineer software that is architecturally solid beneath the surface and unmistakably alive when interacted with.'}
              </p>
              <div className="pt-4">
                <Link
                  href="/about"
                  className="font-mono text-xs text-accent hover:underline flex items-center gap-1.5"
                >
                  <span>{homeT('aboutLink')}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          04 / TECHNICAL SPECIFICATION MATRIX
      =================================================================== */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <div className="pb-10 border-b border-hairline">
          <span className="font-mono text-xs text-accent uppercase tracking-wider">
            {homeT('stackIndex')}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-primary-ink mt-2">
            {homeT('stackTitle')}
          </h2>
          <p className="text-secondary-ink text-sm sm:text-base mt-2 max-w-2xl">
            {homeT('stackSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-14 pt-10 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border-hairline)]">
          {TECH_STACK.map((category) => (
            <div key={category.id} className="pt-6 lg:pt-0 lg:px-6 first:pl-0 space-y-6">
              <div>
                <span className="font-mono text-xs text-muted-ink">
                  {category.code}
                </span>
                <h3 className="font-serif text-2xl text-primary-ink mt-1">
                  {tField(category.title, locale)}
                </h3>
                <p className="text-xs text-secondary-ink mt-1.5 leading-relaxed">
                  {tField(category.description, locale)}
                </p>
              </div>

              <ul className="space-y-4 border-t border-hairline pt-4">
                {category.items.map((item) => (
                  <li key={item.name} className="space-y-1">
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
          05 / TRAJECTORY & CREDENTIALS
      =================================================================== */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 border-t border-hairline pt-16 sm:pt-24">
          {/* Experience Ledger (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-4">
              <div>
                <span className="font-mono text-xs text-accent uppercase tracking-wider">
                  {homeT('experienceIndex')}
                </span>
                <h3 className="font-serif text-3xl text-primary-ink mt-1">
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

            <div className="space-y-8 divide-y divide-[var(--border-hairline)]">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="pt-6 first:pt-0 space-y-3">
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
                  <h4 className="font-serif text-xl sm:text-2xl text-primary-ink">
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

          {/* Credentials Ledger (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-4">
              <div>
                <span className="font-mono text-xs text-accent uppercase tracking-wider">
                  {homeT('certificatesIndex')}
                </span>
                <h3 className="font-serif text-3xl text-primary-ink mt-1">
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

            <div className="space-y-6 divide-y divide-[var(--border-hairline)]">
              {CERTIFICATES.map((cert) => (
                <div key={cert.id} className="pt-6 first:pt-0 space-y-2">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-accent font-semibold">{cert.code}</span>
                    <span className="text-accent-ochre border border-[var(--accent-secondary)] px-2 py-0.5 text-[11px]">
                      {certT('placeholderBadge')}
                    </span>
                  </div>
                  <h4 className="font-serif text-lg text-primary-ink">
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
          06 / CONTACT SECTION
      =================================================================== */}
      <ContactSection />
    </div>
  );
}
