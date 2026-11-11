import React from 'react';
import type { CvCertificationItem } from '@/data/cv-content';
import type { Locale } from '@/i18n/routing';
import { ExternalLink, Award, Users } from 'lucide-react';

interface CvCredentialsCardProps {
  certifications: CvCertificationItem[];
  locale: Locale;
}

export function CvCredentialsCard({ certifications, locale }: CvCredentialsCardProps) {
  return (
    <div className="space-y-2.5 break-inside-avoid">
      {certifications.map((cert) => {
        const date = cert.issueDate[locale];
        return (
          <div
            key={cert.id}
            className="border border-[#E8E6E1] bg-[#FFFFFF] rounded-md p-3.5 text-xs shadow-2xs"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2.5">
                {cert.type === 'certification' ? (
                  <Award className="h-4 w-4 text-[#007F95] mt-0.5 shrink-0" />
                ) : (
                  <Users className="h-4 w-4 text-[#007F95] mt-0.5 shrink-0" />
                )}
                <div>
                  <h4 className="font-semibold text-[#202124] text-xs sm:text-sm">
                    {cert.name}
                  </h4>
                  <p className="text-[#777B80] mt-0.5">{cert.issuer}</p>
                  {cert.credentialId && (
                    <p className="font-mono text-[11px] text-[#777B80] mt-1">
                      ID: {cert.credentialId}
                    </p>
                  )}
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="font-mono text-[11px] text-[#777B80]">{date}</span>
                {cert.credentialUrl && (
                  <div className="mt-1">
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-[#007F95] hover:underline print:hidden"
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
  );
}
