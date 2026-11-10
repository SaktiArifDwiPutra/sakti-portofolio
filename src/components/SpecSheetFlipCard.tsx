'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Compass, RotateCw, Trophy, Sparkles } from 'lucide-react';

interface SpecSheetFlipCardProps {
  name: string;
  specHeading: string;
  specNameLabel: string;
  specFocusLabel: string;
  specFocusVal: string;
  specLanguagesLabel: string;
  specLanguagesVal: string;
  specInterestsLabel: string;
  specInterestsVal: string;
  locale: string;
}

interface Point {
  x: number;
  y: number;
}

export function SpecSheetFlipCard({
  name,
  specHeading,
  specNameLabel,
  specFocusLabel,
  specFocusVal,
  specLanguagesLabel,
  specLanguagesVal,
  specInterestsLabel,
  specInterestsVal,
  locale,
}: SpecSheetFlipCardProps) {
  const isId = locale === 'id';
  const [isFlipped, setIsFlipped] = useState(false);

  // Snake simulation state
  const GRID_SIZE = 12;
  const [snake, setSnake] = useState<Point[]>([
    { x: 3, y: 5 },
    { x: 2, y: 5 },
    { x: 1, y: 5 },
  ]);
  const [apple, setApple] = useState<Point>({ x: 8, y: 5 });
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [isStageClear, setIsStageClear] = useState(false);

  // Autonomous Snake pathfinding towards apple
  useEffect(() => {
    if (!isFlipped) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        let nextX = head.x;
        let nextY = head.y;

        // Pathfind towards apple (horizontal then vertical)
        if (head.x < apple.x) {
          nextX = head.x + 1;
        } else if (head.x > apple.x) {
          nextX = head.x - 1;
        } else if (head.y < apple.y) {
          nextY = head.y + 1;
        } else if (head.y > apple.y) {
          nextY = head.y - 1;
        }

        // Boundary wrap
        nextX = (nextX + GRID_SIZE) % GRID_SIZE;
        nextY = (nextY + GRID_SIZE) % GRID_SIZE;

        const newHead = { x: nextX, y: nextY };
        const hasEatenApple = newHead.x === apple.x && newHead.y === apple.y;

        if (hasEatenApple) {
          setScore((s) => s + 100);

          // Reset condition: When snake reaches length 7, clear level and reset to length 3!
          if (prevSnake.length >= 7) {
            setIsStageClear(true);
            setTimeout(() => {
              setLevel((lvl) => lvl + 1);
              setIsStageClear(false);
            }, 900);

            // Spawn random apple
            setApple({
              x: Math.floor(Math.random() * (GRID_SIZE - 2)) + 1,
              y: Math.floor(Math.random() * (GRID_SIZE - 2)) + 1,
            });

            return [
              { x: 3, y: 5 },
              { x: 2, y: 5 },
              { x: 1, y: 5 },
            ];
          }

          // Spawn new apple
          setApple({
            x: Math.floor(Math.random() * (GRID_SIZE - 2)) + 1,
            y: Math.floor(Math.random() * (GRID_SIZE - 2)) + 1,
          });

          // Grow snake
          return [newHead, ...prevSnake];
        }

        // Move snake without growing
        return [newHead, ...prevSnake.slice(0, -1)];
      });
    }, 180);

    return () => clearInterval(interval);
  }, [isFlipped, apple]);

  return (
    <div
      className="relative [perspective:1200px] w-full min-h-[380px] cursor-pointer select-none"
      onClick={() => setIsFlipped((prev) => !prev)}
      title={isId ? 'Klik kartu untuk membalik (3D Flip)' : 'Click card to flip (3D Flip)'}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="relative w-full h-full [transform-style:preserve-3d]"
      >
        {/* FRONT FACE: Developer Specification Sheet */}
        <div
          className={`p-7 sm:p-9 rounded-3xl theme-card border border-white/[0.08] hover:border-[var(--accent-primary)]/50 shadow-xl transition-colors [backface-visibility:hidden] ${
            isFlipped ? 'pointer-events-none' : 'pointer-events-auto'
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border-hairline)]">
            <span className="font-mono text-xs font-bold tracking-wider text-[var(--accent-primary)] uppercase">
              03 // {specHeading}
            </span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.04] text-[10px] font-mono text-[var(--accent-primary)] border border-white/10">
              <RotateCw className="h-3 w-3" />
              <span>{isId ? 'FLIP' : 'FLIP'}</span>
            </div>
          </div>

          <div className="divide-y divide-[var(--border-hairline)] font-mono text-xs pt-2">
            <div className="py-3.5 flex justify-between gap-2">
              <span className="text-[var(--text-muted)]">{specNameLabel}</span>
              <span className="font-bold text-[var(--text-primary)]">{name}</span>
            </div>
            <div className="py-3.5 flex justify-between gap-2">
              <span className="text-[var(--text-muted)]">{specFocusLabel}</span>
              <span className="text-[var(--text-primary)] text-right font-medium">{specFocusVal}</span>
            </div>
            <div className="py-3.5 flex justify-between gap-2">
              <span className="text-[var(--text-muted)]">{specLanguagesLabel}</span>
              <span className="text-[var(--text-primary)] text-right">{specLanguagesVal}</span>
            </div>
            <div className="py-3.5 flex flex-col gap-1.5">
              <span className="text-[var(--text-muted)]">{specInterestsLabel}</span>
              <span className="text-[var(--text-primary)] leading-relaxed">{specInterestsVal}</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)]">
            <span>SPEC_SHEET // VALID</span>
            <span className="text-[var(--accent-primary)]">{isId ? 'Klik untuk balik kartu 🕹️' : 'Click to flip card 🕹️'}</span>
          </div>
        </div>

        {/* BACK FACE: Retro Snake Arcade Simulation */}
        <div
          className={`absolute inset-0 p-6 sm:p-8 rounded-3xl theme-card border border-emerald-500/40 bg-black/90 shadow-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between ${
            !isFlipped ? 'pointer-events-none' : 'pointer-events-auto'
          }`}
        >
          {/* Arcade Telemetry Header */}
          <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20 font-mono text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Trophy className="h-4 w-4" />
              <span>RETRO ARCADE // SNAKE</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-white">LVL {level}</span>
              <span className="text-amber-400 font-bold">SCORE: {score}</span>
            </div>
          </div>

          {/* Snake Canvas Grid Viewport */}
          <div className="relative aspect-square max-h-[220px] w-full mx-auto my-auto rounded-xl bg-black border border-emerald-500/20 p-2 shadow-inner flex items-center justify-center overflow-hidden">
            {/* Grid Lines */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)',
                backgroundSize: `${100 / GRID_SIZE}% ${100 / GRID_SIZE}%`,
              }}
            />

            {/* Apple Element */}
            <div
              className="absolute w-3.5 h-3.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] transition-all duration-150 animate-pulse"
              style={{
                left: `${(apple.x / GRID_SIZE) * 100 + 1}%`,
                top: `${(apple.y / GRID_SIZE) * 100 + 1}%`,
              }}
            />

            {/* Snake Segments */}
            {snake.map((segment, idx) => (
              <div
                key={idx}
                className={`absolute w-3.5 h-3.5 rounded-sm transition-all duration-150 ${
                  idx === 0
                    ? 'bg-cyan-400 shadow-[0_0_10px_#00f0ff] z-20'
                    : 'bg-emerald-400 shadow-[0_0_6px_#10b981] z-10 opacity-90'
                }`}
                style={{
                  left: `${(segment.x / GRID_SIZE) * 100 + 1}%`,
                  top: `${(segment.y / GRID_SIZE) * 100 + 1}%`,
                }}
              />
            ))}

            {/* Stage Clear Banner (Reset Trigger Feedback) */}
            {isStageClear && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center text-center p-2 z-30 font-mono"
              >
                <Sparkles className="h-6 w-6 text-amber-400 animate-spin mb-1" />
                <span className="text-amber-300 font-bold text-sm tracking-wider">LEVEL CLEAR!</span>
                <span className="text-xs text-white/80">+500 XP BONUS</span>
              </motion.div>
            )}
          </div>

          {/* Footer Back Flip Hint */}
          <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between font-mono text-[10px] text-emerald-400/80">
            <span>SNAKE LEN: {snake.length} SEGMENTS</span>
            <span className="text-white hover:underline">{isId ? 'Klik untuk kembali ↩' : 'Click to flip back ↩'}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

