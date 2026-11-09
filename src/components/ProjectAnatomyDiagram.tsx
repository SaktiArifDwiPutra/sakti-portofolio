'use client';

import React, { useState } from 'react';
import { type ProjectEntry, tField } from '@/data/portfolio';
import type { Locale } from '@/i18n/routing';
import { Layers, CheckCircle2, Cpu } from 'lucide-react';

interface ProjectAnatomyDiagramProps {
  project: ProjectEntry;
  locale: Locale;
  compact?: boolean;
}

export function ProjectAnatomyDiagram({
  project,
  locale,
  compact = false,
}: ProjectAnatomyDiagramProps) {
  const [activeLayerId, setActiveLayerId] = useState<string>(
    project.anatomyLayers[0]?.id ?? ''
  );

  const activeLayer =
    project.anatomyLayers.find((layer) => layer.id === activeLayerId) ??
    project.anatomyLayers[0];

  const isGame = project.disciplineGroup === 'gamedev';

  return (
    <div className="border border-hairline bg-surface">
      {/* Diagram Header Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline px-4 py-3 bg-elevated">
        <div className="flex items-center gap-2">
          <Layers
            className={`h-4 w-4 ${
              isGame ? 'text-accent-ochre' : 'text-accent'
            }`}
          />
          <span className="font-mono text-xs font-semibold tracking-wider text-primary-ink">
            {project.name.toUpperCase()} //{' '}
            {locale === 'id' ? 'ANATOMI ARSITEKTUR' : 'ARCHITECTURAL ANATOMY'}
          </span>
        </div>
        <span className="font-mono text-[11px] text-muted-ink">
          {locale === 'id' ? 'KLIK LAPISAN UNTUK INSPEKSI' : 'SELECT LAYER TO INSPECT'}
        </span>
      </div>

      {/* Interactive Layer Selector + Specification Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border-hairline)]">
        {/* Layer Stack Buttons */}
        <div className="lg:col-span-5 flex flex-col divide-y divide-[var(--border-hairline)]">
          {project.anatomyLayers.map((layer) => {
            const isSelected = layer.id === activeLayer?.id;
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => setActiveLayerId(layer.id)}
                aria-pressed={isSelected}
                className={`group flex flex-col items-start text-left p-4 sm:p-5 transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)] -outline-offset-2 ${
                  isSelected
                    ? 'bg-elevated'
                    : 'bg-surface hover:bg-elevated/60'
                }`}
              >
                <div className="flex w-full items-center justify-between gap-2 mb-1.5">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isSelected
                        ? isGame
                          ? 'text-accent-ochre'
                          : 'text-accent'
                        : 'text-muted-ink'
                    }`}
                  >
                    {layer.code}
                  </span>
                  <span className="font-mono text-[11px] px-2 py-0.5 border border-hairline bg-canvas text-secondary-ink">
                    {layer.tech}
                  </span>
                </div>
                <p className="text-sm sm:text-base font-semibold text-primary-ink">
                  {tField(layer.layerName, locale)}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Layer Telemetry & Specs */}
        {activeLayer && (
          <div className="lg:col-span-7 p-5 sm:p-6 bg-canvas flex flex-col justify-between gap-5">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-xs text-muted-ink">
                  {activeLayer.code} SPECIFICATION
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-accent">
                  <Cpu className="h-3.5 w-3.5" />
                  {activeLayer.tech}
                </span>
              </div>

              <h4 className="text-lg font-bold text-primary-ink mb-2">
                {tField(activeLayer.layerName, locale)}
              </h4>
              <p className="text-sm text-secondary-ink leading-relaxed mb-5">
                {tField(activeLayer.summary, locale)}
              </p>

              {!compact && (
                <ul className="space-y-2 border-t border-hairline pt-4">
                  {(activeLayer.specs[locale] ?? activeLayer.specs.en).map(
                    (spec, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-primary-ink font-mono"
                      >
                        <CheckCircle2
                          className={`h-4 w-4 shrink-0 mt-0.5 ${
                            isGame ? 'text-accent-ochre' : 'text-accent'
                          }`}
                        />
                        <span>{spec}</span>
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>

            {/* Structural Pipeline Bar */}
            <div className="border-t border-hairline pt-3 flex items-center justify-between font-mono text-[11px] text-muted-ink">
              <span>
                {project.anatomyLayers.map((l) => l.code).join(' ──► ')}
              </span>
              <span>{project.index}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

