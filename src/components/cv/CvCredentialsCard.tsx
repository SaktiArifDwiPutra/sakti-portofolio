import React from 'react';
import type { CvCertificationItem } from '@/data/cv-content';
import type { Locale } from '@/i18n/routing';
import { ArrowUpRight, Award, Sparkles } from 'lucide-react';

interface CvCredentialsCardProps {
  certifications: CvCertificationItem[];
  locale: Locale;
}

export function CvCredentialsCard({ certifications, locale }: CvCredentialsCardProps) {
  const isId = locale === 'id';

  return (
    <div className="space-y-3 break-inside-avoid">
      {certifications.map((cert) => {
        const date = cert.issueDate[locale];
        return (
          <div
            key={cert.id}
            className="border border-[#E8E6E1] bg-[#FFFFFF] rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)] hover:border-[#007F95]/30 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#E6F3F4] border border-[#007F95]/20 flex items-center justify-center text-[#007F95] shrink-0 shadow-2xs">
                  {cert.type === 'certification' ? (
                    <Award className="h-5 w-5" />
                  ) : (
                    <Sparkles className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <h4 className="font-display font-bold text-[#1E2022] text-sm sm:text-base leading-snug">
                    {cert.name}
                  </h4>
                  <p className="font-sans font-semibold text-xs text-[#007F95] mt-0.5">
                    {cert.issuer}
                  </p>
                  <p className="font-mono text-[11px] text-[#777B80] mt-1">
                    {date} {cert.credentialId && `| ID: ${cert.credentialId}`}
                  </p>
                </div>
              </div>

              {cert.credentialUrl && (
                <div className="shrink-0 pt-0.5 print:hidden">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#007F95] hover:text-[#005f70] bg-[#E6F3F4] hover:bg-[#d6eef0] px-3 py-1 rounded-lg border border-[#007F95]/20 transition-all shadow-2xs group"
                  >
                    <span>{isId ? 'Verifikasi' : 'Verify'}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
