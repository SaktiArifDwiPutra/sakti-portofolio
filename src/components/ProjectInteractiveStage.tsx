'use client';

import React, { useState } from 'react';
import type { Locale } from '@/i18n/routing';

interface StageProps {
  slug: string;
  locale: Locale;
}

export function ProjectInteractiveStage({ slug, locale }: StageProps) {
  if (slug === 'critiplay') {
    return <CritiPlayStage locale={locale} />;
  }
  if (slug === 'laundryflow') {
    return <LaundryFlowStage locale={locale} />;
  }
  return <NegeriKelabuStage locale={locale} />;
}

/* ============================================================================
   STAGE I: CRITIPLAY — EDITORIAL RATING & AGGREGATION STUDIO
============================================================================ */
function CritiPlayStage({ locale }: { locale: Locale }) {
  const isId = locale === 'id';

  const catalog = [
    {
      id: 'entry-01',
      title: 'Chronicle of Ash',
      genre: isId ? 'RPG Naratif' : 'Narrative RPG',
      year: '2025',
      baseReviews: 142,
      defaultScores: { narrative: 9.5, systems: 8.8, atmosphere: 9.6 },
    },
    {
      id: 'entry-02',
      title: 'Vektor Zero',
      genre: isId ? 'Strategi Taktis' : 'Tactical Strategy',
      year: '2024',
      baseReviews: 98,
      defaultScores: { narrative: 8.1, systems: 9.7, atmosphere: 8.9 },
    },
    {
      id: 'entry-03',
      title: 'Lembah Sunyi',
      genre: isId ? 'Simulasi Eksplorasi' : 'Exploration Sim',
      year: '2026',
      baseReviews: 64,
      defaultScores: { narrative: 9.2, systems: 8.4, atmosphere: 9.8 },
    },
  ];

  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeGame = catalog[selectedIdx];

  const [scores, setScores] = useState(activeGame.defaultScores);

  const handleSelectGame = (idx: number) => {
    setSelectedIdx(idx);
    setScores(catalog[idx].defaultScores);
  };

  const composite = (
    (scores.narrative + scores.systems + scores.atmosphere) /
    3
  ).toFixed(1);

  return (
    <div className="bg-surface border-t border-b border-hairline p-6 sm:p-8 lg:p-10">
      {/* Top Editorial Caption */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 border-b border-hairline">
        <div>
          <span className="font-mono text-xs text-accent tracking-wider uppercase">
            {isId
              ? 'Eksibisi Interaktif 01 — Mesin Penilaian & Ulasan CritiPlay'
              : 'Interactive Exhibition 01 — CritiPlay Rating & Critique Engine'}
          </span>
          <p className="text-sm text-secondary-ink mt-1">
            {isId
              ? 'Pilih judul katalog dan sesuaikan parameter ulasan untuk melihat agregasi skor relasional secara langsung.'
              : 'Select a catalog title and adjust critique parameters to observe live relational score aggregation.'}
          </p>
        </div>
        <span className="font-mono text-xs text-muted-ink">
          React · TypeScript · Laravel · MySQL
        </span>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-start">
        {/* Left: Game Selector & Multi-Axis Sliders (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Title Switcher */}
          <div className="flex flex-wrap gap-2">
            {catalog.map((item, idx) => {
              const active = idx === selectedIdx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectGame(idx)}
                  aria-pressed={active}
                  className={`px-4 py-2.5 text-left transition-colors border ${
                    active
                      ? 'border-[var(--accent-primary)] bg-elevated text-primary-ink'
                      : 'border-hairline bg-canvas text-secondary-ink hover:text-primary-ink'
                  }`}
                >
                  <span className="block font-mono text-[11px] text-muted-ink">
                    {item.genre} · {item.year}
                  </span>
                  <span className="font-serif text-base font-medium">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 3-Axis Critique Controls */}
          <div className="space-y-5 bg-canvas p-5 sm:p-6 border border-hairline">
            {(
              [
                {
                  key: 'narrative',
                  label: isId
                    ? 'Kedalaman Narasi & Penulisan'
                    : 'Narrative & Writing Depth',
                },
                {
                  key: 'systems',
                  label: isId
                    ? 'Desain Sistem & Mekanika'
                    : 'Systems & Mechanical Design',
                },
                {
                  key: 'atmosphere',
                  label: isId
                    ? 'Arahan Seni & Atmosfer'
                    : 'Art Direction & Atmosphere',
                },
              ] as const
            ).map((criterion) => {
              const val = scores[criterion.key];
              return (
                <div key={criterion.key}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <label
                      htmlFor={`slider-${criterion.key}`}
                      className="font-medium text-primary-ink"
                    >
                      {criterion.label}
                    </label>
                    <span className="font-mono text-sm font-semibold text-accent">
                      {val.toFixed(1)} / 10
                    </span>
                  </div>
                  <input
                    id={`slider-${criterion.key}`}
                    type="range"
                    min="5.0"
                    max="10.0"
                    step="0.1"
                    value={val}
                    onChange={(e) =>
                      setScores((prev) => ({
                        ...prev,
                        [criterion.key]: parseFloat(e.target.value),
                      }))
                    }
                    className="w-full accent-[var(--accent-primary)] cursor-pointer h-1.5 bg-elevated"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Live Composite Output & Relational State Readout (5 cols) */}
        <div className="lg:col-span-5 bg-canvas border border-hairline p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-muted-ink uppercase">
              {isId ? 'Indeks Konsensus Kritikus' : 'Composite Critique Index'}
            </span>
            <div className="mt-3 flex items-baseline gap-4">
              <span className="font-serif text-6xl sm:text-7xl font-normal tracking-tight text-accent">
                {composite}
              </span>
              <div className="text-xs font-mono text-secondary-ink">
                <div>/ 10.0 SCALE</div>
                <div className="text-muted-ink mt-0.5">
                  {activeGame.baseReviews + 1}{' '}
                  {isId ? 'ulasan terindeks' : 'indexed critiques'}
                </div>
              </div>
            </div>
          </div>

          {/* Distribution Bars */}
          <div className="space-y-2.5 border-t border-hairline pt-5">
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="w-20 text-secondary-ink">
                {isId ? 'Narasi' : 'Narrative'}
              </span>
              <div className="flex-1 h-1.5 bg-surface overflow-hidden">
                <div
                  className="h-full bg-[var(--accent-primary)] transition-all duration-150"
                  style={{ width: `${scores.narrative * 10}%` }}
                />
              </div>
              <span className="w-8 text-right text-primary-ink">
                {scores.narrative.toFixed(1)}
              </span>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="w-20 text-secondary-ink">
                {isId ? 'Mekanika' : 'Systems'}
              </span>
              <div className="flex-1 h-1.5 bg-surface overflow-hidden">
                <div
                  className="h-full bg-[var(--accent-primary)] transition-all duration-150"
                  style={{ width: `${scores.systems * 10}%` }}
                />
              </div>
              <span className="w-8 text-right text-primary-ink">
                {scores.systems.toFixed(1)}
              </span>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="w-20 text-secondary-ink">
                {isId ? 'Atmosfer' : 'Atmosphere'}
              </span>
              <div className="flex-1 h-1.5 bg-surface overflow-hidden">
                <div
                  className="h-full bg-[var(--accent-primary)] transition-all duration-150"
                  style={{ width: `${scores.atmosphere * 10}%` }}
                />
              </div>
              <span className="w-8 text-right text-primary-ink">
                {scores.atmosphere.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Relational Sync Footnote */}
          <div className="border-t border-hairline pt-4 flex items-center justify-between font-mono text-xs text-muted-ink">
            <span>Laravel API Resource → MySQL</span>
            <span className="text-accent">score_avg: {composite}</span>
          </div>
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
   STAGE III: NEGERI KELABU — LIFE-SIM RPG WORLD CLOCK & DIALOGUE STAGE
============================================================================ */
function NegeriKelabuStage({ locale }: { locale: Locale }) {
  const isId = locale === 'id';

  const phases = [
    {
      id: 'dawn',
      clock: '06:30',
      name: isId ? 'Kabut Pagi' : 'Morning Mist',
      ambient: 'dawn_fog_shader',
      bgTint: 'rgba(184, 210, 195, 0.06)',
      npcLine: isId
        ? '"Udara pagi di distrik lama selalu dingin. Kopi hitamnya baru saja diseduh kalau kau ingin singgah sebelum berangkat."'
        : '"Morning air in the old district always carries a chill. Fresh black coffee is ready if you want to sit before heading out."',
    },
    {
      id: 'dusk',
      clock: '17:40',
      name: isId ? 'Hujan Senja' : 'Dusk Rain',
      ambient: 'overcast_rain_particles',
      bgTint: 'rgba(224, 122, 71, 0.08)',
      npcLine: isId
        ? '"Hujan selalu turun tepat sebelum kereta sore lewat. Kau mau berteduh sebentar di warung atau langsung pulang?"'
        : '"The rain always arrives right before the evening train passes. Will you take shelter at the stall or walk home?"',
    },
    {
      id: 'night',
      clock: '22:15',
      name: isId ? 'Lentera Malam' : 'Night Quiet',
      ambient: 'lantern_point_lights',
      bgTint: 'rgba(120, 140, 190, 0.07)',
      bgBorder: 'rgba(224, 122, 71, 0.3)',
      npcLine: isId
        ? '"Jalanan sudah lengang. Hanya suara jangkrik dan lampu warung yang masih menyala di ujung gang."'
        : '"The streets have gone quiet now. Only crickets and the stall lantern left glowing at the end of the alley."',
    },
  ];

  const [phaseIdx, setPhaseIdx] = useState(1);
  const [choiceTaken, setChoiceTaken] = useState<'stay' | 'walk'>('stay');

  const currentPhase = phases[phaseIdx];

  return (
    <div
      className="border-t border-b border-hairline p-6 sm:p-8 lg:p-10 transition-colors duration-300"
      style={{ backgroundColor: currentPhase.bgTint }}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 border-b border-hairline">
        <div>
          <span className="font-mono text-xs text-accent-ochre tracking-wider uppercase">
            {isId
              ? 'Eksibisi Interaktif 03 — Siklus Waktu & State Narasi Negeri Kelabu'
              : 'Interactive Exhibition 03 — Negeri Kelabu World Clock & Narrative State'}
          </span>
          <p className="text-sm text-secondary-ink mt-1">
            {isId
              ? 'Ganti fase waktu dunia dan pilih respons percakapan untuk melihat perubahan sinyal Godot dan variabel memori dunia.'
              : 'Switch the world time phase and choose a dialogue response to observe Godot signal emissions and world memory flags.'}
          </p>
        </div>
        <span className="font-mono text-xs text-muted-ink">
          Godot Engine · GDScript · Finite State Machine
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-start">
        {/* Left: Atmospheric Narrative Viewport (7 cols) */}
        <div className="lg:col-span-7 bg-canvas border border-hairline p-6 sm:p-8 space-y-6">
          {/* Time of Day Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-5">
            <div>
              <span className="font-mono text-xs text-muted-ink block">
                {isId ? 'SIKLUS WAKTU DUNIA' : 'WORLD TIME CYCLE'}
              </span>
              <span className="font-serif text-2xl sm:text-3xl text-primary-ink">
                {currentPhase.clock} — {currentPhase.name}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {phases.map((p, idx) => {
                const active = idx === phaseIdx;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPhaseIdx(idx)}
                    aria-pressed={active}
                    className={`px-3 py-1.5 font-mono text-xs border transition-colors ${
                      active
                        ? 'border-[var(--accent-secondary)] bg-elevated text-accent-ochre font-semibold'
                        : 'border-hairline bg-surface text-secondary-ink hover:text-primary-ink'
                    }`}
                  >
                    {p.clock}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dialogue Vignette */}
          <div className="py-2">
            <span className="font-mono text-xs text-accent-ochre uppercase tracking-wider">
              {isId ? 'Penjaga Warung // Dialog NPC' : 'Stall Keeper // NPC Dialogue'}
            </span>
            <blockquote className="mt-3 font-serif text-xl sm:text-2xl text-primary-ink leading-relaxed italic">
              {currentPhase.npcLine}
            </blockquote>
          </div>

          {/* Player Dialogue Choices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => setChoiceTaken('stay')}
              className={`p-3.5 text-left border font-mono text-xs transition-colors ${
                choiceTaken === 'stay'
                  ? 'border-[var(--accent-primary)] bg-elevated text-accent'
                  : 'border-hairline bg-surface text-secondary-ink hover:text-primary-ink'
              }`}
            >
              ▸ [1]{' '}
              {isId
                ? 'Singgah dan dengarkan cerita (+Tenang)'
                : 'Stay and listen to the story (+Rest)'}
            </button>
            <button
              type="button"
              onClick={() => setChoiceTaken('walk')}
              className={`p-3.5 text-left border font-mono text-xs transition-colors ${
                choiceTaken === 'walk'
                  ? 'border-[var(--accent-primary)] bg-elevated text-accent'
                  : 'border-hairline bg-surface text-secondary-ink hover:text-primary-ink'
              }`}
            >
              ▸ [2]{' '}
              {isId
                ? 'Lanjutkan perjalanan menyusuri jalan (+Eksplorasi)'
                : 'Continue walking down the road (+Explore)'}
            </button>
          </div>
        </div>

        {/* Right: Godot Autoload & Signal Bus Telemetry (5 cols) */}
        <div className="lg:col-span-5 bg-canvas border border-hairline p-6 sm:p-8 space-y-5">
          <div className="border-b border-hairline pb-3 flex items-center justify-between">
            <span className="font-mono text-xs text-muted-ink">
              GODOT AUTOLOAD STATE
            </span>
            <span className="font-mono text-xs text-accent-ochre">
              WorldState.gd
            </span>
          </div>

          <dl className="divide-y divide-[var(--border-hairline)] font-mono text-xs">
            <div className="py-2.5 flex justify-between">
              <dt className="text-muted-ink">time_phase</dt>
              <dd className="text-primary-ink">&quot;{currentPhase.id}&quot;</dd>
            </div>
            <div className="py-2.5 flex justify-between">
              <dt className="text-muted-ink">environment_preset</dt>
              <dd className="text-accent-ochre">
                &quot;{currentPhase.ambient}&quot;
              </dd>
            </div>
            <div className="py-2.5 flex justify-between">
              <dt className="text-muted-ink">last_dialogue_branch</dt>
              <dd className="text-accent">
                &quot;branch_{choiceTaken}&quot;
              </dd>
            </div>
            <div className="py-2.5 flex justify-between">
              <dt className="text-muted-ink">player_morale_delta</dt>
              <dd className="text-primary-ink">
                {choiceTaken === 'stay' ? '+15 (Rested)' : '+10 (Observant)'}
              </dd>
            </div>
          </dl>

          <p className="text-xs text-muted-ink font-mono pt-2">
            signal emitted: EventBus.on_dialogue_choice_selected(&quot;
            {choiceTaken}&quot;)
          </p>
        </div>
      </div>
    </div>
  );
}
