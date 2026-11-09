'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import type { Locale } from '@/i18n/routing';
import { TECH_STACK, tField } from '@/data/portfolio';
import { Code2, Server, Gamepad2, Wrench, CheckCircle } from 'lucide-react';

export function SkillsShowcase() {
  const locale = useLocale() as Locale;

  const categoryIcons = {
    'frontend-mobile': Code2,
    'backend-data': Server,
    'game-dev': Gamepad2,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {TECH_STACK.map((category) => {
        const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons] || Wrench;
        return (
          <div
            key={category.id}
            className="group relative rounded-3xl bg-[var(--bg-surface)] border border-white/[0.08] hover:border-[var(--accent-primary)]/40 p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-[var(--accent-primary)]/5 flex flex-col justify-between"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[var(--accent-primary)] group-hover:scale-110 transition-transform">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[var(--accent-primary)] tracking-wider block">
                      {category.code}
                    </span>
                    <h3 className="font-display font-bold text-lg text-white">
                      {tField(category.title, locale)}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Category Description */}
              <p className="text-xs text-[var(--text-secondary)] mt-4 leading-relaxed">
                {tField(category.description, locale)}
              </p>

              {/* Skill Items List */}
              <div className="mt-6 space-y-3.5">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-white">
                        {item.name}
                      </span>
                      <span className="font-mono text-[10px] text-[var(--accent-primary)] px-2 py-0.5 rounded-full bg-white/[0.04]">
                        {item.context}
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] mt-1">
                      {tField(item.role, locale)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Tag */}
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)]">
              <span>{locale === 'id' ? 'Status Keahlian' : 'Proficiency Status'}</span>
              <span className="text-[var(--accent-primary)] font-medium flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                {locale === 'id' ? 'Aktif Digunakan' : 'Production Active'}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
