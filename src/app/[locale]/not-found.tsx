import React from 'react';
import { Link } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';

export default function LocaleNotFound() {
  return (
    <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 py-20">
      <div className="border border-hairline bg-surface p-8 sm:p-14 text-center">
        <span className="font-mono text-xs font-bold text-accent tracking-wider">
          404 // MONOGRAPH RECORD NOT FOUND
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-primary-ink">
          The requested page or case study does not exist.
        </h1>
        <div className="mt-8">
          <Link
            href="/"
            className="interactive-btn interactive-btn-primary min-h-[44px] px-6 py-3 font-mono text-xs"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Index</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

