import React from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link, type Locale } from '@/i18n/routing';
import { getProjectBySlug } from '@/data/portfolio';
import { HeroInteractive } from '@/components/HeroInteractive';
import { ProjectTiltCard } from '@/components/ProjectTiltCard';
import { TechGravitySandbox } from '@/components/TechGravitySandbox';
import { ExperienceShowcase } from '@/components/ExperienceShowcase';
import { ContactSection } from '@/components/ContactSection';
import { ArrowUpRight, Code, Gamepad2, ArrowRight, Sparkles, Orbit } from 'lucide-react';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const homeT = await getTranslations({ locale, namespace: 'home' });

  const critiplay = getProjectBySlug('critiplay')!;
  const laundryflow = getProjectBySlug('laundryflow')!;
  const negeriKelabu = getProjectBySlug('negeri-kelabu')!;

  return (
    <div className="space-y-24 sm:space-y-36">
      {/* ===================================================================
          HERO: INTERACTIVE TYPEWRITER & DRAGGABLE RETRO-POCKET DECK
      =================================================================== */}
      <HeroInteractive />

      {/* ===================================================================
          01 // SELECTED WORKS: PLAYFUL 3D TILT SHOWCASE CARDS
      =================================================================== */}
      <section id="selected-works" className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 space-y-10 sm:space-y-14">
        <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 border-b border-[var(--border-hairline)]">
          <div>
            <span className="font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider block">
              01 // {homeT('selectedWorksIndex')}
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight mt-1">
              {homeT('selectedWorksTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 max-w-2xl">
              {homeT('selectedWorksSubtitle')}
            </p>
          </div>

          <Link
            href="/projects"
            prefetch={true}
            className="interactive-btn interactive-btn-secondary px-4 py-2 text-xs font-mono transition-all hover:scale-105"
          >
            <span>{homeT('viewAllWorks')}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* 3 Flagship Projects with 3D Tilt Interaction */}
        <div className="space-y-10 sm:space-y-14">
          <ProjectTiltCard project={critiplay} orderNumber="01 // WEB ARCHITECTURE & RATINGS" />
          <ProjectTiltCard project={laundryflow} orderNumber="02 // MOBILE CLIENT & ERP DISPATCH" />
          <ProjectTiltCard project={negeriKelabu} orderNumber="03 // INDIE GAME MECHANICS" />
        </div>
      </section>

      {/* ===================================================================
          02 // DUAL DISCIPLINES: TWO CORNERSTONES
      =================================================================== */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 space-y-10">
        <div className="pb-6 border-b border-[var(--border-hairline)]">
          <span className="font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider block">
            02 // {homeT('focusIndex')}
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight mt-1">
            {homeT('focusTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 max-w-2xl leading-relaxed">
            {homeT('focusIntro')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Discipline 1: Full-Stack Systems */}
          <div className="p-8 sm:p-10 rounded-3xl theme-card flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="p-3 w-fit rounded-2xl theme-chip text-[var(--accent-primary)] group-hover:scale-110 transition-transform">
                <Code className="h-6 w-6" />
              </div>
              <span className="font-mono text-xs text-[var(--accent-primary)] uppercase tracking-wider block font-semibold">
                Discipline Alpha
              </span>
              <h3 className="font-display font-bold text-2xl text-[var(--text-primary)]">
                {locale === 'id' ? 'Sistem Full-Stack & Solusi Mobile' : 'Full-Stack Systems & Mobile Ergonomics'}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {locale === 'id'
                  ? 'Membangun aplikasi web dan perangkat mobile yang tangguh dengan React, TypeScript, Laravel, dan Flutter. Berfokus pada integritas skema basis data relasional MySQL, sinkronisasi bisnis Odoo ERP, dan antarmuka pengguna yang bersih.'
                  : 'Architecting robust web and mobile platforms with React, TypeScript, Laravel, and Flutter. Focused on relational database schema integrity in MySQL, business synchronization in Odoo ERP, and intuitive UX.'}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[var(--border-hairline)] flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
              <span>React • Laravel • Flutter • Odoo</span>
              <Link href="/projects" prefetch={true} className="text-[var(--accent-primary)] flex items-center gap-1 group-hover:translate-x-1 transition-transform font-semibold">
                <span>Projects</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Discipline 2: Game Development */}
          <div className="p-8 sm:p-10 rounded-3xl theme-card flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="p-3 w-fit rounded-2xl theme-chip text-[var(--accent-primary)] group-hover:scale-110 transition-transform">
                <Gamepad2 className="h-6 w-6" />
              </div>
              <span className="font-mono text-xs text-[var(--accent-primary)] uppercase tracking-wider block font-semibold">
                Discipline Beta
              </span>
              <h3 className="font-display font-bold text-2xl text-[var(--text-primary)]">
                {locale === 'id' ? 'Pengembangan Game & Prototipe Interaktif' : 'Game Development & Interactive Mechanics'}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {locale === 'id'
                  ? 'Mengeksplorasi dunia simulasi atmosferik menggunakan Godot Engine 4 dan GDScript. Merancang sistem pohon scene modular, komunikasi berbasis sinyal, mesin state, dan narasi yang responsif terhadap tindakan pemain.'
                  : 'Prototyping atmospheric simulation loops using Godot Engine 4 and GDScript. Designing modular scene tree architectures, signal buses, finite state machines, and player-responsive narrative dialogues.'}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[var(--border-hairline)] flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
              <span>Godot 4 • GDScript • State Systems</span>
              <Link href="/projects/negeri-kelabu" prefetch={true} className="text-[var(--accent-primary)] flex items-center gap-1 group-hover:translate-x-1 transition-transform font-semibold">
                <span>Negeri Kelabu</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          03 // ZERO-G CAPABILITIES & PHYSICS ARENA (TechGravitySandbox)
      =================================================================== */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 space-y-10">
        <div className="pb-6 border-b border-[var(--border-hairline)]">
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2 w-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
            <span className="font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider block">
              03 // {homeT('stackIndex')}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
            {homeT('stackTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 max-w-2xl">
            {homeT('stackSubtitle')}
          </p>
        </div>

        {/* The Zero-G Floating Gravity Exhibition */}
        <TechGravitySandbox />
      </section>

      {/* ===================================================================
          04 // TRAJECTORY & EXPERIENCE (ExperienceShowcase)
      =================================================================== */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 space-y-10">
        <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 border-b border-[var(--border-hairline)]">
          <div>
            <span className="font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider block">
              04 // {homeT('experienceIndex')}
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight mt-1">
              {homeT('experienceTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 max-w-2xl">
              {homeT('experienceSubtitle')}
            </p>
          </div>

          <Link
            href="/experience"
            prefetch={true}
            className="interactive-btn interactive-btn-secondary px-4 py-2 text-xs font-mono transition-all hover:scale-105"
          >
            <span>{homeT('experienceLink')}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <ExperienceShowcase />
      </section>

      {/* ===================================================================
          05 // CONTACT & INITIATE DIALOGUE (ContactSection)
      =================================================================== */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <ContactSection />
      </section>
    </div>
  );
}
