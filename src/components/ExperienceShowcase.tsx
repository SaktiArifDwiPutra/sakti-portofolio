'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import type { Locale } from '@/i18n/routing';
import { EXPERIENCES, tField } from '@/data/portfolio';
import { Calendar, Briefcase, ChevronRight, Sparkles } from 'lucide-react';

export function ExperienceShowcase() {
  const locale = useLocale() as Locale;

  // Filter out placeholder slot for primary homepage view or show as structured open slot
  const displayExperiences = EXPERIENCES.filter((e) => !e.isPlaceholder);

  return (
    <div className="relative pl-6 sm:pl-8 space-y-10 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-[var(--accent-primary)] before:via-white/[0.1] before:to-transparent">
      {displayExperiences.map((exp, idx) => (
        <div key={exp.id} className="relative group">
          {/* Glowing Timeline Node */}
          <div className="absolute -left-[27px] sm:-left-[35px] top-1.5 flex items-center justify-center">
            <span className="h-4 w-4 rounded-full bg-[var(--bg-canvas)] border-2 border-[var(--accent-primary)] group-hover:scale-125 transition-transform shadow-md shadow-[var(--accent-primary)]/20" />
          </div>

          <div className="rounded-3xl bg-[var(--bg-surface)] border border-white/[0.08] hover:border-[var(--accent-primary)]/40 p-6 sm:p-8 transition-all duration-300 shadow-lg">
            {/* Header: Period & Role */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
              <div>
                <span className="font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider block">
                  {tField(exp.organization, locale)}
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white mt-0.5">
                  {tField(exp.role, locale)}
                </h3>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[var(--text-secondary)]">
                <Calendar className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                <span>{tField(exp.period, locale)}</span>
              </div>
            </div>

            {/* Narrative Summary */}
            <p className="text-sm text-[var(--text-secondary)] mt-4 leading-relaxed">
              {tField(exp.summary, locale)}
            </p>

            {/* Deliverables Bullet List */}
            <div className="mt-5 space-y-2">
              <span className="font-mono text-xs uppercase text-[var(--text-muted)] tracking-wider block">
                {locale === 'id' ? 'Kontribusi Utama:' : 'Key Technical Accomplishments:'}
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                {exp.deliverables[locale].map((item, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-2.5">
                    <ChevronRight className="h-4 w-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Tags */}
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-wrap gap-2">
              {exp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] font-mono text-xs text-[var(--text-primary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
