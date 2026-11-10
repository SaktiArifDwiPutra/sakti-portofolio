import React from 'react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link, type Locale } from '@/i18n/routing';
import { OWNER_PROFILE } from '@/data/portfolio';
import { ContactSection } from '@/components/ContactSection';
import { ProfileHoloCard } from '@/components/ProfileHoloCard';
import { InteractivePhilosophyCard } from '@/components/InteractivePhilosophyCard';
import { Compass, Sparkles, User, Layers, Cpu, Gamepad2, Shield } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('aboutTitle'),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'aboutPage' });
  const isId = locale === 'id';
  const principles = t.raw('principles') as {
    code: string;
    title: string;
    body: string;
  }[];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Header Banner */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 pt-8 sm:pt-14">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl theme-card shadow-xl border border-white/[0.08]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full theme-chip text-xs font-mono text-[var(--accent-primary)] mb-4">
            <User className="h-3.5 w-3.5" />
            <span>01 // {t('indexLabel')}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight leading-[1.08] max-w-4xl">
            {t('title')}
          </h1>
          <p className="text-base sm:text-xl text-[var(--text-secondary)] max-w-3xl mt-4 leading-relaxed font-light">
            {t('lead')}
          </p>
        </div>
      </section>

      {/* Main Identity & Interactive Bio Section */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Bespoke Cyberpunk Pilot Photo & Setup Card */}
          <div className="lg:col-span-5">
            <ProfileHoloCard
              name={OWNER_PROFILE.name}
              focus={t('specFocusVal')}
              locale={locale}
            />
          </div>

          {/* Right: Narrative Biography & Spec Telemetry */}
          <div className="lg:col-span-7 space-y-8">
            {/* Biography Narrative */}
            <div className="p-8 sm:p-10 rounded-3xl theme-card border border-white/[0.08] space-y-6 shadow-xl">
              <span className="font-mono text-xs font-bold tracking-wider text-[var(--accent-primary)] uppercase block">
                02 // {t('storyHeading')}
              </span>
              <div className="space-y-5 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                <p className="text-[var(--text-primary)] font-medium">{t('storyP1')}</p>
                <p>{t('storyP2')}</p>
                <p>{t('storyP3')}</p>
              </div>
            </div>

            {/* Spec Sheet Table */}
            <div className="p-8 sm:p-10 rounded-3xl theme-card border border-white/[0.08] shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-hairline)]">
                <span className="font-mono text-xs font-bold tracking-wider text-[var(--accent-primary)] uppercase">
                  03 // {t('profileSheetHeading')}
                </span>
                <Compass className="h-4 w-4 text-[var(--accent-primary)]" />
              </div>

              <div className="divide-y divide-[var(--border-hairline)] font-mono text-xs pt-2">
                <div className="py-3.5 flex justify-between gap-2">
                  <span className="text-[var(--text-muted)]">{t('specName')}</span>
                  <span className="font-bold text-[var(--text-primary)]">{OWNER_PROFILE.name}</span>
                </div>
                <div className="py-3.5 flex justify-between gap-2">
                  <span className="text-[var(--text-muted)]">{t('specFocus')}</span>
                  <span className="text-[var(--text-primary)] text-right font-medium">{t('specFocusVal')}</span>
                </div>
                <div className="py-3.5 flex justify-between gap-2">
                  <span className="text-[var(--text-muted)]">{t('specLanguages')}</span>
                  <span className="text-[var(--text-primary)] text-right">{t('specLanguagesVal')}</span>
                </div>
                <div className="py-3.5 flex flex-col gap-1.5">
                  <span className="text-[var(--text-muted)]">{t('specInterests')}</span>
                  <span className="text-[var(--text-primary)] leading-relaxed">{t('specInterestsVal')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Domain Capabilities Grid (Showcase 4 Core Pillars) */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 space-y-6">
        <div className="pb-3 border-b border-white/[0.08] flex items-center justify-between">
          <div>
            <span className="font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider block">
              CORE DOMAINS
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] mt-1">
              {isId ? '4 Pilar Spesialisasi Rekayasa' : '4 Core Engineering Pillars'}
            </h2>
          </div>
          <span className="hidden sm:inline-flex px-3 py-1 rounded-full theme-chip font-mono text-xs text-[var(--text-muted)]">
            Verified in Production
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Pillar 1 */}
          <div className="p-6 rounded-2xl theme-card border border-white/[0.08] hover:border-cyan-400/40 transition-all space-y-3">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">Fullstack React &amp; Next.js</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              App Router, Server-Side Rendering, SSG bilingual, custom hooks, dan animasi mikro responsif di CritiPlay.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-2xl theme-card border border-white/[0.08] hover:border-red-400/40 transition-all space-y-3">
            <div className="p-3 rounded-xl bg-red-500/10 text-red-400 w-fit">
              <Cpu className="h-6 w-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">Laravel REST APIs</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Arsitektur backend MVC, Eloquent ORM, migrasi skema database terstruktur, dan autentikasi token JWT aman.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-2xl theme-card border border-white/[0.08] hover:border-emerald-400/40 transition-all space-y-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">PostgreSQL &amp; Cloud DB</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Neon DB cloud branching, integritas foreign key, query ACID optimal, dan embedded database lokal SQLite.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 rounded-2xl theme-card border border-white/[0.08] hover:border-amber-400/40 transition-all space-y-3">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 w-fit">
              <Gamepad2 className="h-6 w-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">Phaser &amp; Godot 4</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Engine game Canvas 2D HTML5 untuk puzzle interaktif anak (Daus Anak Soleh) serta game loop 60 FPS.
            </p>
          </div>
        </div>
      </section>

      {/* Engineering Philosophy with Interactive Micro-Demos */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 space-y-8">
        <div className="pb-4 border-b border-[var(--border-hairline)]">
          <span className="font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider block">
            04 // {t('principlesHeading')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight mt-1">
            Engineering &amp; Creative Philosophy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((p) => (
            <InteractivePhilosophyCard
              key={p.code}
              principle={p}
              locale={locale}
            />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <ContactSection />
      </section>
    </div>
  );
}
