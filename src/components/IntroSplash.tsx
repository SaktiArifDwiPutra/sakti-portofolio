'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from '@/i18n/routing';

const GREETINGS = [
  { text: 'أهلاً وسهلاً', lang: 'Arabic', font: 'font-sans' },
  { text: 'Καλώς ήρθατε', lang: 'Greek', font: 'font-sans' },
  { text: 'Maligayang Pagdating', lang: 'Filipino', font: 'font-sans' },
  { text: 'ようこそ', lang: 'Japanese', font: 'font-sans' },
  { text: 'Selamat Datang', lang: 'Indonesian', font: 'font-sans' },
  { text: 'Sakti Portfolio', lang: 'English', font: 'font-display font-bold' },
];

export function IntroSplash() {
  const pathname = usePathname();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (pathname.startsWith('/cv')) return;
    // Check if intro has already run this session
    const hasSeen = sessionStorage.getItem('sakti_intro_seen');
    if (!hasSeen) {
      setIsVisible(true);
      sessionStorage.setItem('sakti_intro_seen', 'true');
    }
  }, [pathname]);

  if (pathname.startsWith('/cv')) return null;

  useEffect(() => {
    if (!isVisible) return;

    if (currentIndex < GREETINGS.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 400); // 400ms per language
      return () => clearTimeout(timer);
    } else {
      // Hold on the final "Sakti Portfolio" for 700ms then slide out
      const exitTimer = setTimeout(() => {
        setIsFadingOut(true);
        const removeTimer = setTimeout(() => {
          setIsVisible(false);
        }, 650);
        return () => clearTimeout(removeTimer);
      }, 750);
      return () => clearTimeout(exitTimer);
    }
  }, [currentIndex, isVisible]);

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome Intro"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg-canvas)] transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isFadingOut ? '-translate-y-full opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Kinetic Glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute w-[400px] h-[400px] rounded-full bg-[var(--accent-primary)] opacity-[0.12] blur-[90px] animate-pulse"
      />

      <div className="relative flex flex-col items-center text-center px-4 space-y-6">
        {/* Centered Avatar with Orbital Aura */}
        <div className="relative group">
          <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[var(--accent-primary)] to-[var(--accent-secondary)] opacity-50 blur-md animate-[spin_8s_linear_infinite]" />
          
          <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full overflow-hidden border-2 border-[var(--accent-primary)] bg-[var(--bg-surface)] shadow-2xl flex items-center justify-center">
            {/* Dummy photo avatar (can be replaced by owner anytime) */}
            <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-neutral-800 to-neutral-900 text-white font-mono text-center p-2">
              <svg className="w-12 h-12 text-[var(--accent-primary)] opacity-80 mb-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
              <span className="text-[10px] tracking-widest text-[var(--text-muted)] uppercase">SAKTI</span>
            </div>
          </div>
        </div>

        {/* Dynamic Multilingual Greeting */}
        <div className="h-16 flex flex-col items-center justify-center">
          <span 
            key={currentIndex} 
            className={`text-2xl sm:text-4xl text-[var(--text-primary)] transition-all duration-200 transform animate-[fadeInUp_0.25s_ease-out] ${GREETINGS[currentIndex].font}`}
          >
            {GREETINGS[currentIndex].text}
          </span>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--accent-primary)] mt-1.5 opacity-80">
            {currentIndex === GREETINGS.length - 1 ? 'Full-Stack & Game Developer' : GREETINGS[currentIndex].lang}
          </span>
        </div>
      </div>

      {/* Skip Button */}
      <button
        type="button"
        onClick={() => {
          setIsFadingOut(true);
          setTimeout(() => setIsVisible(false), 300);
        }}
        className="absolute bottom-8 px-4 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] text-[11px] font-mono text-[var(--text-muted)] hover:text-white transition-colors"
      >
        Skip [ESC]
      </button>
    </div>
  );
}

