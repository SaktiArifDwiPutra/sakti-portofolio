'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Globe, ShieldCheck, Activity, ArrowUpRight } from 'lucide-react';
import type { Locale } from '@/i18n/routing';

interface StageProps {
  slug: string;
  locale: Locale;
}

export function ProjectInteractiveStage({ slug, locale }: StageProps) {
  if (slug === 'critiplay') {
    return <CritiPlayStage locale={locale} />;
  }
  if (slug === 'daus-anak-soleh') {
    return <DausAnakSolehStage locale={locale} />;
  }
  if (slug === 'website-pilketos') {
    return <PilketosStage locale={locale} />;
  }
  if (slug === 'laundryflow') {
    return <LaundryFlowStage locale={locale} />;
  }
  if (slug === 'dragonhold') {
    return <DragonholdStage locale={locale} />;
  }
  if (slug === 'coordina') {
    return <CoordinaStage locale={locale} />;
  }
  if (slug === 'obathaus') {
    return <ObathausStage locale={locale} />;
  }
  return <DragonholdStage locale={locale} />;
}

/* ============================================================================
   STAGE I: CRITIPLAY — LIVE LINK PREVIEW
============================================================================ */
function CritiPlayStage({ locale }: { locale: Locale }) {
  const isId = locale === 'id';

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[var(--bg-elevated)] overflow-hidden shadow-2xl">
      {/* Browser Bar / Viewport Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-[var(--bg-surface)] border-b border-white/[0.08]">
        {/* Window Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
          </div>
          <span className="font-mono text-[11px] text-[var(--text-muted)] ml-2 hidden sm:inline">
            CRITIPLAY LIVE PRODUCTION
          </span>
        </div>

        {/* SSL & URL Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span className="text-white font-medium">critiplay.my.id</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
        </div>

        {/* Deployment Stack Tag */}
        <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-[var(--text-muted)]">
          <Activity className="h-3.5 w-3.5 text-cyan-400" />
          <span>Vercel + Neon DB (PostgreSQL)</span>
        </div>
      </div>

      {/* Main Preview Screen */}
      <div className="relative aspect-[16/9] sm:aspect-[16/8] w-full bg-[var(--bg-canvas)] overflow-hidden group/preview">
        <Image
          src="/images/projects/critiplay-cover.png"
          alt="CritiPlay Live Platform Preview"
          fill
          className="object-cover object-top transition-transform duration-700 group-hover/preview:scale-[1.03]"
          priority
        />
        {/* Subtle Cyberpunk Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-5 sm:p-8">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping inline-block" />
              <span>{isId ? 'Platform Live Aktif' : 'Active Live Platform'}</span>
            </div>

            <h4 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
              CritiPlay — Community Game Reviews
            </h4>

            <p className="text-xs sm:text-sm text-white/80 line-clamp-2 leading-relaxed">
              {isId
                ? 'Platform penelusuran, penilaian, dan ulasan game terstruktur dengan arsitektur decoupled: frontend React & TypeScript di Vercel dan backend API Laravel terhubung ke PostgreSQL Neon DB.'
                : 'Structured game discovery and critique platform with decoupled architecture: React & TypeScript client on Vercel and Laravel API server connected to Neon PostgreSQL.'}
            </p>

            {/* Direct Redirect Live Link Preview Button */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="https://www.critiplay.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-mono text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-200 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Globe className="h-4 w-4 text-black" />
                <span>{isId ? 'Buka Live Link Preview' : 'Open Live Link Preview'}</span>
                <ExternalLink className="h-4 w-4 text-black transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>

              <span className="font-mono text-[11px] text-white/60">
                {isId ? 'Direct redirect → www.critiplay.my.id' : 'Direct redirect → www.critiplay.my.id'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Health & Architecture Footer */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 sm:p-4 bg-[var(--bg-surface)] border-t border-white/[0.08] font-mono text-xs">
        <div className="p-2 rounded-lg bg-white/[0.02]">
          <span className="text-[var(--text-muted)] text-[10px] uppercase block">Status</span>
          <span className="text-emerald-400 font-bold">200 OK Live</span>
        </div>
        <div className="p-2 rounded-lg bg-white/[0.02]">
          <span className="text-[var(--text-muted)] text-[10px] uppercase block">Frontend</span>
          <span className="text-white font-semibold">Vercel Edge</span>
        </div>
        <div className="p-2 rounded-lg bg-white/[0.02]">
          <span className="text-[var(--text-muted)] text-[10px] uppercase block">Backend</span>
          <span className="text-white font-semibold">Dedicated API</span>
        </div>
        <div className="p-2 rounded-lg bg-white/[0.02]">
          <span className="text-[var(--text-muted)] text-[10px] uppercase block">Database</span>
          <span className="text-cyan-400 font-semibold">Neon PostgreSQL</span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   STAGE II: LAUNDRYFLOW — MOBILE ORDER DISPATCH & ODOO ERP SYNC
============================================================================ */
function LaundryFlowStage({ locale }: { locale: Locale }) {
  const isId = locale === 'id';

  const stages = [
    {
      code: 'received',
      label: isId ? 'Diterima & Ditimbang' : 'Received & Weighed',
      odooState: 'draft_intake',
      note: isId
        ? 'Pakaian dicatat di aplikasi Flutter dan membuat record laundry.order baru di Odoo.'
        : 'Garments logged in Flutter client, creating a new laundry.order record in Odoo.',
    },
    {
      code: 'washing',
      label: isId ? 'Proses Pencucian' : 'Washing Cycle',
      odooState: 'in_washing',
      note: isId
        ? 'Mesin aktif; status antrean diperbarui secara real-time untuk operator lapangan.'
        : 'Machine cycle active; queue status updated in real time for shop-floor operators.',
    },
    {
      code: 'pressing',
      label: isId ? 'Penyetrikaan & QC' : 'Pressing & Quality Check',
      odooState: 'in_ironing',
      note: isId
        ? 'Tahap penyelesaian akhir dan pengecekan kelengkapan item pakaian.'
        : 'Finishing stage and garment item count verification before packaging.',
    },
    {
      code: 'ready',
      label: isId ? 'Siap Diambil Pelanggan' : 'Ready for Customer Pickup',
      odooState: 'ready_pickup',
      note: isId
        ? 'Tagihan Odoo siap diselesaikan dan notifikasi pengambilan diaktifkan.'
        : 'Odoo invoice line finalized and customer pickup readiness flagged.',
    },
  ];

  const [stepIndex, setStepIndex] = useState(1);
  const currentStage = stages[stepIndex];

  return (
    <div className="bg-surface border-t border-b border-hairline p-6 sm:p-8 lg:p-10">
      <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 border-b border-hairline">
        <div>
          <span className="font-mono text-xs text-accent tracking-wider uppercase">
            {isId
              ? 'Eksibisi Interaktif 02 — Sinkronisasi Status Flutter & Odoo ERP'
              : 'Interactive Exhibition 02 — Flutter Mobile & Odoo ERP State Sync'}
          </span>
          <p className="text-sm text-secondary-ink mt-1">
            {isId
              ? 'Ubah tahapan operasional pesanan di bawah untuk melihat bagaimana aksi satu ketukan di perangkat mobile memperbarui model bisnis Odoo.'
              : 'Advance the operational stage below to see how one-tap mobile actions synchronize with centralized Odoo business models.'}
          </p>
        </div>
        <span className="font-mono text-xs text-muted-ink">
          Flutter · Dart · Odoo ERP
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-stretch">
        {/* Left: Tactile Mobile Operator Viewport (6 cols) */}
        <div className="lg:col-span-6 bg-canvas border border-hairline p-6 flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center justify-between border-b border-hairline pb-4 mb-5">
              <div>
                <span className="font-mono text-xs text-muted-ink">
                  FLUTTER MOBILE OPERATOR
                </span>
                <h4 className="font-serif text-2xl text-primary-ink mt-0.5">
                  Batch #LF-2048
                </h4>
              </div>
              <span className="font-mono text-xs px-2.5 py-1 bg-surface border border-hairline text-accent">
                6.5 kg · Express
              </span>
            </div>

            {/* Stage Progression Track */}
            <div className="space-y-2.5">
              {stages.map((st, idx) => {
                const isCurrent = idx === stepIndex;
                const isDone = idx < stepIndex;
                return (
                  <button
                    key={st.code}
                    type="button"
                    onClick={() => setStepIndex(idx)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left border transition-colors ${
                      isCurrent
                        ? 'border-[var(--accent-primary)] bg-elevated text-primary-ink'
                        : isDone
                        ? 'border-hairline bg-surface/60 text-secondary-ink'
                        : 'border-hairline bg-canvas text-muted-ink hover:text-secondary-ink'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs">0{idx + 1}</span>
                      <span className="text-sm font-medium">{st.label}</span>
                    </div>
                    <span className="font-mono text-xs">
                      {isCurrent ? 'ACTIVE' : isDone ? 'DONE' : 'QUEUE'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* One-Tap Advance Control */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-hairline">
            <button
              type="button"
              onClick={() => setStepIndex((prev) => (prev + 1) % stages.length)}
              className="interactive-btn interactive-btn-primary min-h-[44px] px-5 py-2.5 font-mono text-xs w-full"
            >
              {isId
                ? 'Majukan Tahap Operasional →'
                : 'Advance Operational Stage →'}
            </button>
          </div>
        </div>

        {/* Right: Synchronized Odoo ERP Model State (6 cols) */}
        <div className="lg:col-span-6 bg-canvas border border-hairline p-6 flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center justify-between border-b border-hairline pb-4 mb-5">
              <span className="font-mono text-xs text-muted-ink">
                ODOO ERP BACKEND RECORD
              </span>
              <span className="font-mono text-xs text-accent">
                MODEL: laundry.order
              </span>
            </div>

            <dl className="divide-y divide-[var(--border-hairline)] font-mono text-xs">
              <div className="py-3 flex justify-between gap-4">
                <dt className="text-muted-ink">order_reference</dt>
                <dd className="text-primary-ink font-semibold">
                  &quot;SO/2026/2048&quot;
                </dd>
              </div>
              <div className="py-3 flex justify-between gap-4">
                <dt className="text-muted-ink">partner_id</dt>
                <dd className="text-primary-ink truncate max-w-[200px]" title="res.partner(104, &quot;pelanggan_reguler&quot;)">
                  res.partner(104, &quot;pelanggan_reguler&quot;)
                </dd>
              </div>
              <div className="py-3 flex justify-between gap-4">
                <dt className="text-muted-ink">workflow_state</dt>
                <dd className="text-accent font-bold">
                  &quot;{currentStage.odooState}&quot;
                </dd>
              </div>
              <div className="py-3 flex justify-between gap-4">
                <dt className="text-muted-ink">invoice_status</dt>
                <dd className="text-primary-ink">
                  {stepIndex === 3 ? '"ready_to_invoice"' : '"in_service_queue"'}
                </dd>
              </div>
            </dl>
          </div>

          <div className="bg-surface p-4 border border-hairline">
            <span className="block font-mono text-xs text-muted-ink mb-1">
              {isId ? 'CATATAN SINKRONISASI' : 'SYNCHRONIZATION LOG'}
            </span>
            <p className="text-sm text-secondary-ink leading-relaxed">
              {currentStage.note}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   STAGE III: DRAGONHOLD — FULL-STACK MONOREPO & HONO API TEST-BENCH
============================================================================ */
function DragonholdStage({ locale }: { locale: Locale }) {
  const isId = locale === 'id';
  const [latency, setLatency] = useState<number | null>(null);
  const [requestCount, setRequestCount] = useState(1);
  const [activeTab, setActiveTab] = useState<'api' | 'drizzle'>('api');

  const handleTestPing = () => {
    const start = performance.now();
    // Simulate sub-millisecond Hono runtime dispatch
    setTimeout(() => {
      const duration = Math.max(0.8, Number((performance.now() - start).toFixed(1)));
      setLatency(duration);
      setRequestCount((c) => c + 1);
    }, 40);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[var(--text-primary)] font-bold">
            {isId ? 'TEST-BENCH MONOREPO DRAGONHOLD' : 'DRAGONHOLD MONOREPO TEST-BENCH'}
          </span>
          <span className="px-2 py-0.5 rounded-full theme-chip text-[10px]">pnpm / Next.js 16 / Hono</span>
        </div>
        <button
          onClick={handleTestPing}
          className="interactive-btn interactive-btn-primary px-3 py-1.5 rounded-full text-xs font-mono font-bold"
        >
          ⚡ {isId ? 'Uji Dispatch Hono API' : 'Benchmark Hono Dispatch'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 p-6 rounded-2xl theme-card border border-[var(--border-hairline)] space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
            <span className="text-[var(--accent-primary)] font-bold">WORKSPACE PACKAGES</span>
            <span className="text-[10px] text-emerald-400">TYPE-SAFE SYNC</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-[var(--surface-hover)] border border-[var(--border-hairline)] flex justify-between items-center">
              <div>
                <span className="font-bold text-[var(--text-primary)] block">@dragonhold/web</span>
                <span className="text-[11px] text-[var(--text-secondary)]">Next.js 16 App Router + Tailwind 4</span>
              </div>
              <span className="px-2 py-1 rounded theme-chip text-[10px] text-cyan-400">Client UI</span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--surface-hover)] border border-[var(--border-hairline)] flex justify-between items-center">
              <div>
                <span className="font-bold text-[var(--text-primary)] block">@dragonhold/api</span>
                <span className="text-[11px] text-[var(--text-secondary)]">Hono REST API + Zod Validator</span>
              </div>
              <span className="px-2 py-1 rounded theme-chip text-[10px] text-emerald-400">Port 4000</span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--surface-hover)] border border-[var(--border-hairline)] flex justify-between items-center">
              <div>
                <span className="font-bold text-[var(--text-primary)] block">@dragonhold/shared</span>
                <span className="text-[11px] text-[var(--text-secondary)]">Single-source Zod Schemas &amp; DTOs</span>
              </div>
              <span className="px-2 py-1 rounded theme-chip text-[10px] text-amber-400">Cross-Package</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 p-5 rounded-2xl theme-chip space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-hairline)]">
            <span className="font-bold text-[var(--text-primary)]">RUNTIME TELEMETRY</span>
            <span className="text-[10px] text-emerald-400">SUB-MS DISPATCH</span>
          </div>

          <div className="space-y-2 text-[var(--text-secondary)]">
            <div className="flex justify-between">
              <span>Hono Routing Latency:</span>
              <strong className="text-cyan-400 font-bold">{latency !== null ? `${latency} ms` : '1.2 ms'}</strong>
            </div>
            <div className="flex justify-between">
              <span>Request Counter:</span>
              <span className="text-[var(--text-primary)]">#{requestCount} completed</span>
            </div>
            <div className="flex justify-between">
              <span>Zod Validation:</span>
              <span className="text-emerald-400">PASSED (Zero Schema Drift)</span>
            </div>
            <div className="flex justify-between">
              <span>Drizzle ORM Query:</span>
              <span className="text-[var(--accent-primary)]">SELECT * FROM entities LIMIT 1</span>
            </div>
          </div>

          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed pt-2 border-t border-[var(--border-hairline)]">
            {isId
              ? 'Arsitektur monorepo pnpm mengisolasi layanan web dan API dengan performa tinggi tanpa overhead modul redundan.'
              : 'Pnpm monorepo architecture isolates Next.js presentation from lightweight Hono API microservices.'}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   STAGE V: COORDINA — REAL-TIME WEBSOCKET EVENT BROADCAST SIMULATOR
============================================================================ */
function CoordinaStage({ locale }: { locale: Locale }) {
  const isId = locale === 'id';
  const [eventLogs, setEventLogs] = useState<string[]>([
    'Socket connection established on private-channel.coordination.01',
    'Initial shift payload synchronized across 12 field coordinators',
  ]);

  const handleEmitBroadcast = () => {
    const time = new Date().toLocaleTimeString();
    const eventName = isId ? `Pembaruan Tugas Lapangan #${eventLogs.length + 1}` : `Field Dispatch Event #${eventLogs.length + 1}`;
    setEventLogs((prev) => [`[${time}] ${eventName} broadcasted via Pusher WebSocket`, ...prev.slice(0, 4)]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[var(--text-primary)] font-bold">
            {isId ? 'SIMULATOR SIARAN WEBSOCKET COORDINA' : 'COORDINA WEBSOCKET BROADCAST STAGE'}
          </span>
          <span className="px-2 py-0.5 rounded-full theme-chip text-[10px]">Laravel Echo / Pusher</span>
        </div>
        <button
          onClick={handleEmitBroadcast}
          className="interactive-btn interactive-btn-primary px-3 py-1.5 rounded-full text-xs font-mono font-bold"
        >
          📡 {isId ? 'Siarkan Event Baru' : 'Dispatch Live Broadcast'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 p-6 rounded-2xl theme-card border border-[var(--border-hairline)] space-y-3 font-mono text-xs">
          <span className="text-[var(--accent-primary)] font-bold block mb-2">LIVE BROADCAST CONSOLE</span>
          <div className="space-y-2">
            {eventLogs.map((log, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-[var(--surface-hover)] border border-[var(--border-hairline)] text-[var(--text-secondary)]">
                <span className="text-emerald-400 mr-2">●</span>
                {log}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 p-5 rounded-2xl theme-chip space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-hairline)]">
            <span className="font-bold text-[var(--text-primary)]">CHANNEL STATUS</span>
            <span className="text-[10px] text-emerald-400">PRESENCE ACTIVE</span>
          </div>

          <div className="space-y-2 text-[var(--text-secondary)]">
            <div className="flex justify-between">
              <span>Channel:</span>
              <span className="text-cyan-400 font-bold">presence-event.coordination</span>
            </div>
            <div className="flex justify-between">
              <span>Subscribers:</span>
              <span className="text-[var(--text-primary)]">12 active client nodes</span>
            </div>
            <div className="flex justify-between">
              <span>Auth Handshake:</span>
              <span className="text-emerald-400">PASSED (Session Bearer)</span>
            </div>
          </div>

          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed pt-2 border-t border-[var(--border-hairline)]">
            {isId
              ? 'Event ShouldBroadcast di Laravel menyebarkan perubahan status tugas ke seluruh klien dalam hitungan milidetik tanpa reload.'
              : 'Laravel event broadcasting pushes task mutations to all connected client screens instantaneously without page reload.'}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   STAGE VI: OBATHAUS — INERTIA.JS + VUE 3 PHARMACY POS TEST-BENCH
============================================================================ */
function ObathausStage({ locale }: { locale: Locale }) {
  const isId = locale === 'id';
  const [stock, setStock] = useState(48);
  const [totalSales, setTotalSales] = useState(12);
  const [lastReceipt, setLastReceipt] = useState<string | null>(null);

  const handleCheckout = () => {
    if (stock <= 0) return;
    setStock((s) => s - 1);
    setTotalSales((t) => t + 1);
    setLastReceipt(`TRX-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-[var(--text-primary)] font-bold">
            {isId ? 'TERMINAL KASIR FARMASI OBATHAUS' : 'OBATHAUS PHARMACY POS STAGE'}
          </span>
          <span className="px-2 py-0.5 rounded-full theme-chip text-[10px]">Inertia.js / Vue 3 / Laravel</span>
        </div>
        <button
          onClick={handleCheckout}
          disabled={stock <= 0}
          className="interactive-btn interactive-btn-primary px-3 py-1.5 rounded-full text-xs font-mono font-bold disabled:opacity-50"
        >
          💊 {isId ? 'Checkout & Potong Stok' : 'Instant POS Checkout'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 p-6 rounded-2xl theme-card border border-[var(--border-hairline)] space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
            <span className="text-[var(--accent-primary)] font-bold">REKONSILIASI STOK OBAT</span>
            <span className="text-[10px] text-teal-400">TRANSAKSI ATOMIK</span>
          </div>

          <div className="p-4 rounded-xl bg-[var(--surface-hover)] border border-[var(--border-hairline)] flex justify-between items-center">
            <div>
              <span className="font-bold text-sm text-[var(--text-primary)] block">Paracetamol 500mg (Batch #B92)</span>
              <span className="text-[11px] text-[var(--text-secondary)]">Kategori: Analgesik / Antipiretik</span>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold font-mono text-teal-400">{stock}</span>
              <span className="block text-[10px] text-[var(--text-muted)]">Sisa Stok</span>
            </div>
          </div>

          {lastReceipt && (
            <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-500/30 text-teal-300">
              ✓ {isId ? `Transaksi Berhasil! Struk Kasir: ${lastReceipt} (Stok terpotong otomatis via DB::transaction)` : `Transaction Complete! Receipt: ${lastReceipt} (Atomic deduction)`}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 p-5 rounded-2xl theme-chip space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-hairline)]">
            <span className="font-bold text-[var(--text-primary)]">POS ENGINE HUD</span>
            <span className="text-[10px] text-emerald-400">INERTIA PROTOCOL</span>
          </div>

          <div className="space-y-2 text-[var(--text-secondary)]">
            <div className="flex justify-between">
              <span>Frontend Stack:</span>
              <span className="text-cyan-400 font-bold">Inertia.js + Vue 3 SPA</span>
            </div>
            <div className="flex justify-between">
              <span>Concurrency Lock:</span>
              <span className="text-emerald-400">Pessimistic Row Lock</span>
            </div>
            <div className="flex justify-between">
              <span>Sales Volume:</span>
              <span className="text-[var(--text-primary)]">{totalSales} item terjual</span>
            </div>
          </div>

          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed pt-2 border-t border-[var(--border-hairline)]">
            {isId
              ? 'Arsitektur monolitik modern Inertia.js menghadirkan kecepatan Single Page App tanpa kerumitan REST API redundan.'
              : 'Inertia.js hybrid architecture provides SPA fluidity while maintaining complete Laravel backend routing security.'}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   STAGE IV: DAUS ANAK SOLEH — 2D PRAYER PUZZLE & RECITATION ENGINE
============================================================================ */
function DausAnakSolehStage({ locale }: { locale: Locale }) {
  const isId = locale === 'id';
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [score, setScore] = useState(150);
  const [streak, setStreak] = useState(3);
  const [answeredState, setAnsweredState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const questions = [
    {
      q: isId ? 'Gerakan pertama untuk memulai sholat setelah berniat adalah...?' : 'The first posture to begin prayer after intention is...?',
      options: isId ? ['Takbiratul Ihram', 'Rukuk', 'Sujud', 'Tahiyat Awal'] : ['Takbiratul Ihram', 'Rukuk (Bowing)', 'Sujud (Prostration)', 'Tahiyat Awal'],
      correct: 0,
      recitation: 'Allahu Akbar (الله أكبر)',
      context: isId ? 'Rukun Sholat 01 // Posisi Berdiri Menghadap Kiblat' : 'Prayer Pillar 01 // Standing Posture Facing Qibla',
    },
    {
      q: isId ? 'Doa apakah yang dibaca saat posisi Rukuk (membungkuk rata)?' : 'What prayer is recited during the Rukuk (bowing) posture?',
      options: [
        'Subhana Rabbiyal Azimi wa Bihamdih',
        'Subhana Rabbiyal A\'la wa Bihamdih',
        'Rabbighfirli warhamni',
        'Attahiyyaatu lillaahi',
      ],
      correct: 0,
      recitation: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ وَبِحَمْدِهِ',
      context: isId ? 'Rukun Sholat 05 // Membungkuk meletakkan tangan di lutut' : 'Prayer Pillar 05 // Bowing hands on knees',
    },
    {
      q: isId ? 'Setelah bangkit dari rukuk (I\'tidal), gerakan rukun berikutnya adalah...?' : 'After rising from Rukuk (I\'tidal), the next sequential movement is...?',
      options: isId ? ['Sujud Pertama', 'Salam ke Kanan', 'Duduk Antara Dua Sujud', 'Tahiyat Akhir'] : ['First Sujud', 'Salam to Right', 'Sitting Between Sujud', 'Tahiyat Akhir'],
      correct: 0,
      recitation: 'Subhana Rabbiyal A\'la wa Bihamdih (سُبْحَانَ رَبِّيَ الْأَعْلَى)',
      context: isId ? 'Rukun Sholat 08 // Dahi dan kedua telapak tangan di sajadah' : 'Prayer Pillar 08 // Forehead and palms on prayer mat',
    },
  ];

  const currentQ = questions[activeQuestionIndex];

  const handleAnswer = (choiceIndex: number) => {
    if (answeredState !== 'idle') return;

    if (choiceIndex === currentQ.correct) {
      setAnsweredState('correct');
      setScore((s) => s + 50 * level);
      setStreak((st) => st + 1);
      setTimeout(() => {
        setActiveQuestionIndex((prev) => (prev + 1) % questions.length);
        setAnsweredState('idle');
      }, 1200);
    } else {
      setAnsweredState('wrong');
      setStreak(0);
      setTimeout(() => {
        setAnsweredState('idle');
      }, 800);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
          <span className="text-[var(--text-primary)] font-bold">
            {isId ? 'SIMULATOR TEKA-TEKI GERAKAN & BACAAN SHOLAT' : 'PRAYER MOVEMENT & RECITATION PUZZLE STAGE'}
          </span>
          <span className="px-2 py-0.5 rounded-full theme-chip text-[10px]">Phaser / HTML 5 Canvas</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[var(--text-muted)]">
            {isId ? 'Skor' : 'Score'}: <strong className="text-[var(--accent-primary)] font-mono">{score}</strong>
          </span>
          <span className="text-[var(--text-muted)]">
            Streak: <strong className="text-amber-400 font-mono">🔥 {streak}x</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[var(--accent-primary)]">
              LEVEL 0{level} // {level === 1 ? (isId ? 'Rukun Gerakan Sholat' : 'Prayer Postures') : level === 2 ? (isId ? 'Pencocokan Doa Sholat' : 'Recitation Match') : (isId ? 'Rangkaian Tertib Sholat' : 'Full Prayer Sequence')}
            </span>
            <div className="flex gap-1.5 font-mono text-xs">
              {([1, 2, 3] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    level === lvl
                      ? 'bg-[var(--accent-primary)] text-black font-bold'
                      : 'theme-chip hover:border-[var(--accent-primary)]/40 text-[var(--text-muted)]'
                  }`}
                >
                  L{lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[var(--surface-hover)] border border-[var(--border-hairline)] text-center space-y-3">
            <p className="text-xs font-mono text-[var(--accent-primary)] font-semibold">
              {currentQ.context}
            </p>
            <div className="text-lg sm:text-2xl font-display font-bold text-[var(--text-primary)]">
              {currentQ.q}
            </div>
            <div className="text-xs font-mono text-cyan-400/80">
              {isId ? 'Lafaz / Bacaan: ' : 'Recitation: '}
              <span className="font-semibold text-white">{currentQ.recitation}</span>
            </div>

            {answeredState === 'correct' && (
              <p className="text-xs font-mono text-emerald-400 font-bold animate-bounce pt-2">
                ✨ {isId ? 'Masha Allah! Gerakan & Bacaan Tepat (+50 Poin)' : 'Masha Allah! Correct Movement & Recitation (+50 Points)'}
              </p>
            )}
            {answeredState === 'wrong' && (
              <p className="text-xs font-mono text-rose-400 font-bold pt-2">
                ❌ {isId ? 'Kurang tepat, coba ingat kembali rukunnya ya!' : 'Not quite right, check the prayer order!'}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt, optIdx) => (
              <button
                key={opt}
                onClick={() => handleAnswer(optIdx)}
                disabled={answeredState !== 'idle'}
                className="p-4 rounded-xl theme-card hover:border-[var(--accent-primary)] font-mono text-sm sm:text-base font-semibold text-[var(--text-primary)] hover:scale-[1.02] active:scale-[0.98] transition-all text-center shadow-md disabled:opacity-50"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 p-5 rounded-2xl theme-chip space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-hairline)]">
            <span className="font-bold text-[var(--text-primary)]">GAMEPLAY ENGINE HUD</span>
            <span className="text-[10px] text-emerald-400">PHASER 2D</span>
          </div>

          <div className="space-y-2.5 text-[var(--text-secondary)]">
            <div className="flex justify-between">
              <span>Framework:</span>
              <span className="text-[var(--text-primary)]">Phaser + HTML 5 Canvas</span>
            </div>
            <div className="flex justify-between">
              <span>Prayer State:</span>
              <span className="text-[var(--accent-primary)]">RUKUN_MATCHING</span>
            </div>
            <div className="flex justify-between">
              <span>Audio Synthesis:</span>
              <span className="text-emerald-400">RECITATION_AUDIO_READY</span>
            </div>
            <div className="flex justify-between">
              <span>Pedagogy:</span>
              <span className="text-[var(--text-primary)]">Children Islamic Education</span>
            </div>
          </div>

          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed pt-2 border-t border-[var(--border-hairline)]">
            {isId
              ? 'Game teka-teki edukasi interaktif anak untuk mempelajari urutan gerakan dan bacaan doa sholat bagi umat muslim dengan Phaser.'
              : 'Interactive educational children\'s puzzle game teaching Muslim prayer postures and recitations using Phaser Framework.'}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   STAGE V: WEBSITE PILKETOS — REAL-TIME E-VOTING & TELEMETRY DASHBOARD
============================================================================ */
function PilketosStage({ locale }: { locale: Locale }) {
  const isId = locale === 'id';
  const [candidates, setCandidates] = useState([
    { id: 1, name: 'Rayhan & Nadia', vision: 'Inovasi Digital & Lingkungan Bersih', votes: 142, color: '#38bdf8' },
    { id: 2, name: 'Sakti & Fadhil', vision: 'Kreativitas Teknologi & Kolaborasi', votes: 198, color: '#00f0ff' },
    { id: 3, name: 'Zahra & Kevin', vision: 'Pengembangan Bakat Seni & Olahraga', votes: 85, color: '#f43f5e' },
  ]);
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);

  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

  const handleVote = (id: number) => {
    if (hasVoted) return;
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, votes: c.votes + 1 } : c))
    );
    setSelectedCandidate(id);
    setHasVoted(true);
  };

  const handleReset = () => {
    setHasVoted(false);
    setSelectedCandidate(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[var(--text-primary)] font-bold">
            {isId ? 'SIMULATOR E-VOTING REAL-TIME PILKETOS' : 'PILKETOS REAL-TIME E-VOTING STAGE'}
          </span>
          <span className="px-2 py-0.5 rounded-full theme-chip text-[10px]">PHP Native / MySQL / Chart.js</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[var(--text-muted)]">
            {isId ? 'Total Suara Masuk' : 'Total Ballots'}: <strong className="text-[var(--accent-primary)] font-mono">{totalVotes}</strong>
          </span>
          {hasVoted && (
            <button
              onClick={handleReset}
              className="text-[10px] font-mono text-[var(--accent-primary)] underline hover:opacity-80"
            >
              [Reset Sesi]
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          <span className="font-mono text-xs uppercase text-[var(--text-muted)] tracking-wider block font-semibold">
            {isId ? 'Surat Suara Digital (Pilih Satu Kandidat)' : 'Digital Ballot (Select Candidate)'}
          </span>

          <div className="space-y-3">
            {candidates.map((c) => {
              const isSelected = selectedCandidate === c.id;
              const percentage = ((c.votes / totalVotes) * 100).toFixed(1);

              return (
                <div
                  key={c.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    isSelected
                      ? 'border-[var(--accent-primary)] bg-[var(--surface-hover)] shadow-lg'
                      : 'border-[var(--border-hairline)] theme-card hover:border-[var(--border-hairline)]/80'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-7 w-7 rounded-xl flex items-center justify-center font-mono font-bold text-xs"
                        style={{ backgroundColor: `${c.color}20`, color: c.color }}
                      >
                        0{c.id}
                      </span>
                      <div>
                        <h4 className="font-display font-bold text-sm sm:text-base text-[var(--text-primary)]">
                          {c.name}
                        </h4>
                        <p className="text-xs text-[var(--text-secondary)] font-mono">
                          {c.vision}
                        </p>
                      </div>
                    </div>

                    {!hasVoted ? (
                      <button
                        onClick={() => handleVote(c.id)}
                        className="px-3 py-1.5 rounded-full interactive-btn interactive-btn-primary font-mono text-xs"
                      >
                        {isId ? 'Pilih Paslon' : 'Vote'}
                      </button>
                    ) : (
                      <span className="font-mono text-xs font-bold" style={{ color: c.color }}>
                        {percentage}% ({c.votes} {isId ? 'suara' : 'votes'})
                      </span>
                    )}
                  </div>

                  {/* Real-time bar */}
                  <div className="h-2 w-full rounded-full bg-[var(--bg-canvas)] overflow-hidden mt-3">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: c.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5 p-5 rounded-2xl theme-chip space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-hairline)]">
            <span className="font-bold text-[var(--text-primary)]">ADMIN AUDIT CONSOLE</span>
            <span className="text-[10px] text-emerald-400">SESSION: SECURED</span>
          </div>

          <div className="space-y-2 text-[var(--text-secondary)]">
            <div className="flex justify-between">
              <span>Auth Guard:</span>
              <span className="text-emerald-400">PASSED (Siswa Token)</span>
            </div>
            <div className="flex justify-between">
              <span>Double-Vote Lock:</span>
              <span className="text-[var(--accent-primary)]">
                {hasVoted ? 'LOCKED (1 Vote Used)' : 'READY (1 Vote Available)'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Database Query:</span>
              <span className="text-[var(--text-primary)]">UPDATE votes SET total = total + 1</span>
            </div>
            <div className="flex justify-between">
              <span>Telemetry Feed:</span>
              <span className="text-sky-400">Chart.js Auto-Recalculate</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-hairline)] text-[11px] text-[var(--text-muted)] space-y-1">
            <span className="text-[var(--accent-primary)] font-bold block">
              {isId ? 'Integritas Suara Terjamin' : 'Election Integrity Guaranteed'}
            </span>
            <p>
              {isId
                ? 'Setelah siswa mengonfirmasi pilihan, token pemilih dinonaktifkan di MySQL sehingga tidak dapat memberikan suara ulang.'
                : 'Upon ballot confirmation, the voter token is instantly invalidated in MySQL to prevent double voting.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
