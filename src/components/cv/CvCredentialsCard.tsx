import React from 'react';
import type { CvCertificationItem } from '@/data/cv-content';
import type { Locale } from '@/i18n/routing';
import { ExternalLink, Award, Users } from 'lucide-react';

interface CvCredentialsCardProps {
  certifications: CvCertificationItem[];
  languages: {
    name: { en: string; id: string };
    proficiency: { en: string; id: string };
  }[];
  locale: Locale;
}

export function CvCredentialsCard({ certifications, languages, locale }: CvCredentialsCardProps) {
  return (
    <div className="space-y-4 break-inside-avoid">
      {/* Certifications List */}
      <div className="space-y-2">
        {certifications.map((cert) => {
          const date = cert.issueDate[locale];
          return (
            <div
              key={cert.id}
              className="border border-[#E4E2DC] bg-[#FFFFFF] rounded-md p-3 text-xs shadow-2xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  {cert.type === 'certification' ? (
                    <Award className="h-4 w-4 text-[#007799] mt-0.5 shrink-0" />
                  ) : (
                    <Users className="h-4 w-4 text-[#007799] mt-0.5 shrink-0" />
                  )}
                  <div>
                    <h4 className="font-semibold text-[#1C1C1E]">{cert.name}</h4>
                    <p className="text-[#52525B] mt-0.5">{cert.issuer}</p>
                    {cert.credentialId && (
                      <p className="font-mono text-[11px] text-[#71717A] mt-1">
                        ID: {cert.credentialId}
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono text-[11px] text-[#71717A]">{date}</span>
                  {cert.credentialUrl && (
                    <div className="mt-1">
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[11px] text-[#007799] hover:underline print:hidden"
                      >
                        <span>{locale === 'id' ? 'Verifikasi' : 'Verify'}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Languages Box */}
      <div className="border border-[#E4E2DC] bg-[#FFFFFF] rounded-md p-3 text-xs shadow-2xs">
        <h4 className="font-mono text-xs uppercase tracking-wider text-[#52525B] font-semibold mb-2">
          {locale === 'id' ? 'Bahasa' : 'Languages'}
        </h4>
        <div className="space-y-1 font-mono text-xs">
          {languages.map((lang, idx) => (
            <div key={idx} className="flex justify-between items-center text-[#1C1C1E]">
              <span>{lang.name[locale]}</span>
              <span className="text-[#52525B]">({lang.proficiency[locale]})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

