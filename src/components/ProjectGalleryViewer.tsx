'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { type ProjectGalleryPlate, tField } from '@/data/portfolio';
import type { Locale } from '@/i18n/routing';
import { Maximize2 } from 'lucide-react';

interface ProjectGalleryViewerProps {
  plates: ProjectGalleryPlate[];
  projectName: string;
  locale: Locale;
}

export function ProjectGalleryViewer({
  plates,
  projectName,
  locale,
}: ProjectGalleryViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePlate = plates[activeIndex] ?? plates[0];

  if (!activePlate) return null;

  return (
    <div className="border border-hairline bg-surface">
      {/* Plate Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-4 sm:px-6 py-3 bg-elevated">
        <div className="flex flex-wrap gap-2" role="tablist">
          {plates.map((plate, index) => {
            const isSelected = index === activeIndex;
            return (
              <button
                key={plate.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveIndex(index)}
                className={`interactive-btn min-h-[38px] px-3.5 py-1.5 font-mono text-xs ${
                  isSelected
                    ? 'interactive-btn-primary'
                    : 'interactive-btn-secondary'
                }`}
              >
                <span>{plate.plateNumber}</span>
                <span className="hidden sm:inline">
                  — {tField(plate.title, locale)}
                </span>
              </button>
            );
          })}
        </div>

        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-ink">
          <Maximize2 className="h-3.5 w-3.5" />
          <span>{activePlate.aspectRatio} BLUEPRINT</span>
        </span>
      </div>

      {/* Main Plate Viewport */}
      <div className="p-4 sm:p-6 lg:p-8 bg-canvas">
        <div className="relative w-full aspect-video border border-hairline overflow-hidden bg-[#111315]">
          <Image
            src={activePlate.imageSrc}
            alt={`${projectName} — ${tField(activePlate.title, locale)}`}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-contain"
          />
        </div>

        {/* Plate Caption Bar */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-hairline pt-4">
          <div>
            <span className="font-mono text-xs font-bold text-accent mr-2">
              {activePlate.plateNumber}:
            </span>
            <span className="font-semibold text-sm text-primary-ink">
              {tField(activePlate.title, locale)}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-secondary-ink max-w-2xl">
            {tField(activePlate.caption, locale)}
          </p>
        </div>
      </div>
    </div>
  );
}

