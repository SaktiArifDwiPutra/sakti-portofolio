'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Sparkles, Coffee, Code2, RotateCw } from 'lucide-react';

interface DeveloperWorldMiniatureProps {
  locale: string;
  isFlipped: boolean;
  onFlipBack: () => void;
}

// ---------------------------------------------------------------------------
// 16-COLOR HANDCRAFTED INDIE PALETTE (Warm, Earthy & Deep)
// ---------------------------------------------------------------------------
const P = {
  // Transparent
  _: 'transparent',

  // Walls & Room Structure
  wallDay: '#3d3640',
  wallDayShadow: '#322c36',
  wallNight: '#171722',
  wallNightShadow: '#101018',
  trimWood: '#2b1a13',
  trimWoodLight: '#4a2c1f',

  // Floorboards
  floor1: '#4a2c1f',
  floor2: '#5e3827',
  floor3: '#3b2217',
  floorGrout: '#22130c',
  floorNail: '#180d08',

  // Furniture (Honey Oak)
  deskTop: '#8c522f',
  deskHighlight: '#b36d40',
  deskShadow: '#4d2a16',
  deskLeg: '#381e0f',
  chairFabric: '#232530',
  chairHighlight: '#36394a',
  chairFrame: '#181920',

  // Character (Sakti)
  hair: '#111217',
  hairHighlight: '#222530',
  skin: '#d99979',
  skinShadow: '#b06f51',
  skinHighlight: '#ebb094',
  sweater: '#21232d',
  sweaterShadow: '#16171e',
  sweaterHighlight: '#343747',
  pants: '#181a22',

  // Props
  potTerracotta: '#a34828',
  potShadow: '#6e2b14',
  potHighlight: '#c75f36',
  leafDark: '#1a4726',
  leafMid: '#286e3b',
  leafLight: '#43a05b',
  leafSun: '#72c286',

  mugCeramic: '#e2dad2',
  mugShadow: '#a89d94',
  coffeeLiquid: '#2a160d',
  steam: 'rgba(235, 230, 225, 0.45)',

  lampBrass: '#c28e3a',
  lampBrassDark: '#78531c',
  lampShade: '#224a32',
  lampBulbOn: '#fff3a8',

  // Computer
  monitorBezel: '#242733',
  monitorScreen: '#0d1117',
  codeCyan: '#38bdf8',
  codeYellow: '#facc15',
  codeGreen: '#4ade80',
  codePink: '#f472b6',
  codeWhite: '#e2e8f0',
  cursor: '#00f0ff',

  // Window Day
  skyDayTop: '#7ba7cc',
  skyDayMid: '#fbcfe8',
  skyDayHorizon: '#fed7aa',
  cloudWhite: '#ffffff',
  cloudShadow: '#cbd5e1',

  // Window Night
  skyNightTop: '#0b0c16',
  skyNightMid: '#121424',
  skyNightHorizon: '#1b1b33',
  moonYellow: '#fef08a',
  moonShadow: '#ca8a04',
  starWhite: '#ffffff',
  starDim: '#64748b',
};

// Internal virtual resolution (3:2 classic pixel-art ratio)
const VW = 192;
const VH = 128;

export function DeveloperWorldMiniature({ locale, isFlipped, onFlipBack }: DeveloperWorldMiniatureProps) {
  const isId = locale === 'id';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // World states
  const [timeOfDay, setTimeOfDay] = useState<'night' | 'day'>('night');
  const [characterAction, setCharacterAction] = useState<'idle' | 'typing' | 'waving'>('typing');
  const [activeDialogue, setActiveDialogue] = useState<string | null>(null);
  const [computerToast, setComputerToast] = useState<string | null>(null);
  const [cursorBlink, setCursorBlink] = useState(true);

  const dialogueTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const actionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Time / Cloud animation counters
  const frameRef = useRef(0);
  const cloudOffsetRef = useRef(0);
  const leafSwayRef = useRef(0);
  const steamOffsetRef = useRef(0);

  // Dialogue pool
  const DIALOGUES_ID = [
    'Sudut tenang untuk menyempurnakan kode dan logika game.',
    'Secangkir kopi, musik lo-fi, dan kompilasi bersih.',
    'Ide terbaik sering lahir dari rasa ingin tahu di jam-jam hening.',
    'Mengejar detail kecil yang membuat pengalaman terasa hidup.',
  ];

  const DIALOGUES_EN = [
    'A quiet corner where code, logic, and game design meet.',
    'Warm coffee, lo-fi beats, and a clean compile.',
    'The best ideas often emerge in the quiet hours after midnight.',
    'Chasing the subtle micro-details that make software feel alive.',
  ];

  const TOASTS_ID = [
    'Build Status: 28/28 Static Pages Berhasil!',
    'git commit -m "feat: a tiny world, after hours"',
    'Unit Tests: 100% Lolos · Zero Regressions',
    'Phaser Engine: 60 FPS Fixed Delta Loop Siap!',
  ];

  const TOASTS_EN = [
    'Build Status: 28/28 Static Pages Compiled OK!',
    'git commit -m "feat: a tiny world, after hours"',
    'Unit Tests: 100% Passing · Zero Regressions',
    'Phaser Engine: 60 FPS Fixed Delta Loop Ready!',
  ];

  // Trigger dialogue when character is clicked
  const handleCharacterClick = useCallback(() => {
    setCharacterAction('waving');
    const pool = isId ? DIALOGUES_ID : DIALOGUES_EN;
    const nextDialogue = pool[Math.floor(Math.random() * pool.length)];
    setActiveDialogue(nextDialogue);

    if (dialogueTimeoutRef.current) clearTimeout(dialogueTimeoutRef.current);
    dialogueTimeoutRef.current = setTimeout(() => {
      setActiveDialogue(null);
      setCharacterAction('typing');
    }, 4500);

    if (actionTimeoutRef.current) clearTimeout(actionTimeoutRef.current);
    actionTimeoutRef.current = setTimeout(() => {
      setCharacterAction('typing');
    }, 2800);
  }, [isId]);

  // Trigger computer interaction
  const handleComputerClick = useCallback(() => {
    const pool = isId ? TOASTS_ID : TOASTS_EN;
    const nextToast = pool[Math.floor(Math.random() * pool.length)];
    setComputerToast(nextToast);

    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setComputerToast(null);
    }, 3500);
  }, [isId]);

  // Toggle Day / Night
  const toggleTimeOfDay = useCallback(() => {
    setTimeOfDay((prev) => (prev === 'night' ? 'day' : 'night'));
  }, []);

  // ---------------------------------------------------------------------------
  // PIXEL RENDERING ENGINE (Strict 192 × 128 integer rasterization)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!isFlipped) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;

    let animationId: number;

    const render = () => {
      frameRef.current += 1;
      const frame = frameRef.current;

      // Update ambient sub-cycles
      if (frame % 4 === 0) {
        cloudOffsetRef.current = (cloudOffsetRef.current + 0.25) % 80;
        steamOffsetRef.current = (steamOffsetRef.current + 0.15) % 12;
      }
      leafSwayRef.current = Math.sin(frame * 0.04);

      const isNight = timeOfDay === 'night';

      // 1. CLEAR & WALL BACKGROUND
      ctx.fillStyle = isNight ? P.wallNight : P.wallDay;
      ctx.fillRect(0, 0, VW, 88);

      // Wall shading (subtle top vignette and side shadow)
      ctx.fillStyle = isNight ? P.wallNightShadow : P.wallDayShadow;
      ctx.fillRect(0, 0, VW, 12);
      ctx.fillRect(0, 0, 10, 88);

      // Wooden Trim / Skirting Board
      ctx.fillStyle = P.trimWood;
      ctx.fillRect(0, 88, VW, 4);
      ctx.fillStyle = P.trimWoodLight;
      ctx.fillRect(0, 88, VW, 1);

      // 2. HARDWOOD FLOORBOARDS (Warm honey oak planks with nail dots)
      const plankHeights = [
        { y: 92, h: 9, c1: P.floor2, c2: P.floor1 },
        { y: 101, h: 9, c1: P.floor1, c2: P.floor3 },
        { y: 110, h: 9, c1: P.floor2, c2: P.floor1 },
        { y: 119, h: 10, c1: P.floor3, c2: P.floor2 },
      ];

      plankHeights.forEach((plank, pIdx) => {
        ctx.fillStyle = plank.c1;
        ctx.fillRect(0, plank.y, VW, plank.h);

        // Subtle plank grain lines
        ctx.fillStyle = plank.c2;
        ctx.fillRect(0, plank.y + 1, VW, 1);

        // Grout line between planks
        ctx.fillStyle = P.floorGrout;
        ctx.fillRect(0, plank.y + plank.h - 1, VW, 1);

        // Staggered vertical plank joints and nail dots
        const jointOffset = (pIdx * 54 + 28) % VW;
        ctx.fillStyle = P.floorGrout;
        ctx.fillRect(jointOffset, plank.y, 1, plank.h);
        ctx.fillRect((jointOffset + 96) % VW, plank.y, 1, plank.h);

        ctx.fillStyle = P.floorNail;
        ctx.fillRect(jointOffset + 2, plank.y + 3, 1, 1);
        ctx.fillRect(jointOffset - 3 >= 0 ? jointOffset - 3 : VW - 3, plank.y + 3, 1, 1);
      });

      // 3. WINDOW (x: 18 to 60, y: 16 to 64) -> 42 × 48 px
      const winX = 18;
      const winY = 16;
      const winW = 42;
      const winH = 48;

      // Outer wooden window frame
      ctx.fillStyle = P.trimWood;
      ctx.fillRect(winX - 2, winY - 2, winW + 4, winH + 4);
      ctx.fillStyle = P.trimWoodLight;
      ctx.fillRect(winX - 3, winY + winH, winW + 6, 3); // Window sill ledge

      // Inner Glass Viewport
      if (isNight) {
        // Night sky gradient
        ctx.fillStyle = P.skyNightTop;
        ctx.fillRect(winX, winY, winW, 16);
        ctx.fillStyle = P.skyNightMid;
        ctx.fillRect(winX, winY + 16, winW, 16);
        ctx.fillStyle = P.skyNightHorizon;
        ctx.fillRect(winX, winY + 32, winW, 16);

        // Crescent Moon (x: 44, y: 22)
        ctx.fillStyle = P.moonYellow;
        ctx.fillRect(winX + 28, winY + 6, 6, 6);
        ctx.fillStyle = P.skyNightTop;
        ctx.fillRect(winX + 26, winY + 5, 5, 5); // Moon cutout for crescent

        // Twinkling Pixel Stars
        const stars = [
          { x: 6, y: 8, phase: 0 },
          { x: 14, y: 18, phase: 20 },
          { x: 22, y: 10, phase: 40 },
          { x: 34, y: 28, phase: 15 },
          { x: 10, y: 34, phase: 35 },
          { x: 26, y: 38, phase: 50 },
        ];
        stars.forEach((s) => {
          const isBlinking = ((frame + s.phase) % 60) < 15;
          ctx.fillStyle = isBlinking ? P.starWhite : P.starDim;
          ctx.fillRect(winX + s.x, winY + s.y, 1, 1);
        });
      } else {
        // Daytime Golden Hour Sky
        ctx.fillStyle = P.skyDayTop;
        ctx.fillRect(winX, winY, winW, 16);
        ctx.fillStyle = P.skyDayMid;
        ctx.fillRect(winX, winY + 16, winW, 16);
        ctx.fillStyle = P.skyDayHorizon;
        ctx.fillRect(winX, winY + 32, winW, 16);

        // Drifting Pixel Clouds
        const cloudX = (winX + 4 - cloudOffsetRef.current + 80) % (winW + 20) - 10;
        ctx.fillStyle = P.cloudWhite;
        ctx.fillRect(winX + cloudX, winY + 18, 14, 4);
        ctx.fillRect(winX + cloudX + 3, winY + 15, 8, 3);
        ctx.fillStyle = P.cloudShadow;
        ctx.fillRect(winX + cloudX, winY + 22, 14, 1);

        const cloud2X = (winX + 22 - cloudOffsetRef.current * 0.7 + 80) % (winW + 20) - 10;
        ctx.fillStyle = P.cloudWhite;
        ctx.fillRect(winX + cloud2X, winY + 32, 12, 3);
        ctx.fillRect(winX + cloud2X + 2, winY + 30, 7, 2);
      }

      // Window Frame Mullions (Window cross bars)
      ctx.fillStyle = P.trimWood;
      ctx.fillRect(winX + Math.floor(winW / 2) - 1, winY, 2, winH); // Vertical bar
      ctx.fillRect(winX, winY + Math.floor(winH / 2) - 1, winW, 2); // Horizontal bar

      // 4. FLOATING SHELF & BOOKS (x: 74 to 108, y: 24 to 42)
      const shelfX = 74;
      const shelfY = 38;
      ctx.fillStyle = P.deskShadow;
      ctx.fillRect(shelfX, shelfY + 2, 34, 2); // Shelf shadow
      ctx.fillStyle = P.deskHighlight;
      ctx.fillRect(shelfX, shelfY, 34, 2); // Shelf board

      // Stacked Books
      ctx.fillStyle = '#dc2626'; // Red book
      ctx.fillRect(shelfX + 4, shelfY - 9, 3, 9);
      ctx.fillStyle = '#2563eb'; // Blue book
      ctx.fillRect(shelfX + 8, shelfY - 11, 4, 11);
      ctx.fillStyle = '#16a34a'; // Green book
      ctx.fillRect(shelfX + 13, shelfY - 8, 3, 8);
      ctx.fillStyle = '#ca8a04'; // Yellow leaning book
      ctx.fillRect(shelfX + 17, shelfY - 7, 4, 7);

      // Hanging Plant on Shelf
      ctx.fillStyle = P.potTerracotta;
      ctx.fillRect(shelfX + 25, shelfY - 5, 5, 5);
      ctx.fillStyle = P.leafMid;
      ctx.fillRect(shelfX + 24, shelfY - 7, 7, 2);
      ctx.fillRect(shelfX + 26, shelfY + 2, 2, 4); // Trailing vine
      ctx.fillRect(shelfX + 27, shelfY + 6, 2, 3);
      ctx.fillStyle = P.leafLight;
      ctx.fillRect(shelfX + 25, shelfY + 3, 1, 1);
      ctx.fillRect(shelfX + 28, shelfY + 5, 1, 1);

      // Framed Mini 8-Bit Pixel Art on Wall (x: 76, y: 16)
      ctx.fillStyle = P.trimWood;
      ctx.fillRect(76, 16, 16, 14);
      ctx.fillStyle = '#1e1b4b'; // Mini frame canvas
      ctx.fillRect(78, 18, 12, 10);
      ctx.fillStyle = '#38bdf8'; // Mini mountain sky
      ctx.fillRect(78, 18, 12, 6);
      ctx.fillStyle = '#4ade80'; // Mini mountain base
      ctx.fillRect(79, 24, 10, 4);
      ctx.fillStyle = '#f8fafc'; // Mountain snow peak
      ctx.fillRect(83, 22, 2, 2);

      // 5. POTTED MONSTERA PLANT (x: 164 to 186, y: 64 to 118)
      const plantX = 166;
      const plantY = 96;

      // Clay Pot
      ctx.fillStyle = P.potShadow;
      ctx.fillRect(plantX, plantY, 14, 18);
      ctx.fillStyle = P.potTerracotta;
      ctx.fillRect(plantX + 1, plantY, 12, 17);
      ctx.fillStyle = P.potHighlight;
      ctx.fillRect(plantX - 1, plantY - 2, 16, 3); // Pot rim

      // Soil
      ctx.fillStyle = '#1c130c';
      ctx.fillRect(plantX + 1, plantY - 1, 12, 2);

      // Broad Monstera Leaves (with organic stepping and subtle idle sway)
      const sway = Math.round(leafSwayRef.current);

      // Leaf 1 (Left low)
      ctx.fillStyle = P.leafDark;
      ctx.fillRect(plantX - 6, plantY - 14, 8, 8);
      ctx.fillStyle = P.leafMid;
      ctx.fillRect(plantX - 5, plantY - 13, 6, 6);

      // Leaf 2 (Right mid)
      ctx.fillStyle = P.leafDark;
      ctx.fillRect(plantX + 10, plantY - 18, 9, 10);
      ctx.fillStyle = P.leafMid;
      ctx.fillRect(plantX + 11, plantY - 17, 7, 8);
      ctx.fillStyle = P.leafLight;
      ctx.fillRect(plantX + 13, plantY - 15, 3, 4);

      // Leaf 3 (Top arching leaf with gentle sway)
      ctx.fillStyle = P.leafDark;
      ctx.fillRect(plantX + sway, plantY - 28, 12, 12);
      ctx.fillStyle = P.leafMid;
      ctx.fillRect(plantX + 1 + sway, plantY - 27, 10, 10);
      ctx.fillStyle = P.leafLight;
      ctx.fillRect(plantX + 3 + sway, plantY - 25, 6, 6);
      ctx.fillStyle = P.leafSun;
      ctx.fillRect(plantX + 5 + sway, plantY - 23, 2, 2);

      // Plant stems
      ctx.fillStyle = P.leafDark;
      ctx.fillRect(plantX + 5, plantY - 16, 2, 16);
      ctx.fillRect(plantX + 8, plantY - 20, 2, 20);

      // 6. WORK DESK & CHAIR (x: 68 to 154, y: 64 to 116)
      const deskX = 68;
      const deskY = 76;
      const deskW = 86;

      // Chair backrest behind character
      ctx.fillStyle = P.chairFrame;
      ctx.fillRect(132, 68, 6, 26);
      ctx.fillStyle = P.chairFabric;
      ctx.fillRect(133, 70, 4, 22);

      // Desk Surface Board
      ctx.fillStyle = P.deskHighlight;
      ctx.fillRect(deskX, deskY, deskW, 2);
      ctx.fillStyle = P.deskTop;
      ctx.fillRect(deskX, deskY + 2, deskW, 4);
      ctx.fillStyle = P.deskShadow;
      ctx.fillRect(deskX, deskY + 6, deskW, 2);

      // Desk Legs
      ctx.fillStyle = P.deskLeg;
      ctx.fillRect(deskX + 3, deskY + 8, 4, 34); // Left leg
      ctx.fillRect(deskX + deskW - 7, deskY + 8, 4, 34); // Right leg
      ctx.fillRect(deskX + 7, deskY + 28, deskW - 14, 2); // Cross-brace

      // 7. COZY COFFEE MUG WITH ANIMATED STEAM (x: 74, y: 70)
      const mugX = 74;
      const mugY = 70;
      ctx.fillStyle = P.mugShadow;
      ctx.fillRect(mugX, mugY, 6, 6);
      ctx.fillStyle = P.mugCeramic;
      ctx.fillRect(mugX + 1, mugY, 4, 5);
      ctx.fillRect(mugX - 2, mugY + 1, 2, 3); // Mug handle
      ctx.fillStyle = P.coffeeLiquid;
      ctx.fillRect(mugX + 1, mugY + 1, 4, 1);

      // Steam Particle Dots (cyclical rising pixels)
      const steamY1 = mugY - 2 - Math.floor(steamOffsetRef.current);
      const steamY2 = mugY - 6 - Math.floor(steamOffsetRef.current);
      if (steamY1 > 58) {
        ctx.fillStyle = P.steam;
        ctx.fillRect(mugX + 2 + Math.floor(Math.sin(frame * 0.1) * 1.5), steamY1, 1, 1);
        ctx.fillRect(mugX + 3 - Math.floor(Math.cos(frame * 0.1) * 1.2), steamY2, 1, 1);
      }

      // 8. COMPUTER MONITOR (x: 88 to 114, y: 54 to 76)
      const monX = 88;
      const monY = 54;
      const monW = 26;
      const monH = 18;

      // Stand
      ctx.fillStyle = '#64748b';
      ctx.fillRect(monX + 11, monY + monH, 4, 4); // Stem
      ctx.fillStyle = '#475569';
      ctx.fillRect(monX + 8, monY + monH + 3, 10, 2); // Base

      // Bezel
      ctx.fillStyle = P.monitorBezel;
      ctx.fillRect(monX, monY, monW, monH);

      // Screen Glass
      ctx.fillStyle = P.monitorScreen;
      ctx.fillRect(monX + 2, monY + 2, monW - 4, monH - 4);

      // Mini Code Lines on Screen
      ctx.fillStyle = P.codeCyan;
      ctx.fillRect(monX + 4, monY + 4, 5, 1);
      ctx.fillStyle = P.codePink;
      ctx.fillRect(monX + 10, monY + 4, 6, 1);

      ctx.fillStyle = P.codeYellow;
      ctx.fillRect(monX + 6, monY + 7, 8, 1);

      ctx.fillStyle = P.codeGreen;
      ctx.fillRect(monX + 6, monY + 10, 10, 1);

      // Blinking Cursor on Monitor
      if (Math.floor(frame / 20) % 2 === 0) {
        ctx.fillStyle = P.cursor;
        ctx.fillRect(monX + 17, monY + 10, 2, 1);
      }

      // 9. COZY DESK LAMP (x: 142 to 150, y: 54 to 76)
      const lampX = 142;
      const lampY = 56;

      // Brass base & stem
      ctx.fillStyle = P.lampBrassDark;
      ctx.fillRect(lampX + 5, lampY + 18, 4, 2);
      ctx.fillStyle = P.lampBrass;
      ctx.fillRect(lampX + 6, lampY + 6, 2, 12);
      ctx.fillRect(lampX + 3, lampY + 5, 4, 2);

      // Lamp Shade (Green glass / cream)
      ctx.fillStyle = P.lampShade;
      ctx.fillRect(lampX, lampY, 8, 5);
      ctx.fillStyle = '#143322';
      ctx.fillRect(lampX, lampY + 4, 8, 1);

      // 10. DEVELOPER CHARACTER (SAKTI) (x: 114 to 138, y: 58 to 108)
      // Natural, relaxed developer posture with black hair & dark cozy sweater
      const charX = 116;
      const charY = 60;
      const isWaving = characterAction === 'waving';
      const isTyping = characterAction === 'typing';

      // Chair Seat & Wheels
      ctx.fillStyle = P.chairFabric;
      ctx.fillRect(charX + 6, charY + 24, 14, 4);
      ctx.fillStyle = P.chairFrame;
      ctx.fillRect(charX + 12, charY + 28, 2, 14); // Stem
      ctx.fillRect(charX + 8, charY + 41, 10, 2); // Wheel base

      // Legs / Pants
      ctx.fillStyle = P.pants;
      ctx.fillRect(charX + 5, charY + 24, 7, 16); // Thigh
      ctx.fillRect(charX + 2, charY + 36, 6, 8); // Shin
      ctx.fillStyle = '#0f172a'; // Shoes
      ctx.fillRect(charX - 1, charY + 42, 6, 3);

      // Torso / Dark Cozy Sweater
      ctx.fillStyle = P.sweater;
      ctx.fillRect(charX + 6, charY + 11, 11, 14);
      ctx.fillStyle = P.sweaterHighlight;
      ctx.fillRect(charX + 7, charY + 11, 8, 2); // Collar highlight
      ctx.fillStyle = P.sweaterShadow;
      ctx.fillRect(charX + 15, charY + 14, 2, 10); // Back shadow

      // Head & Neck
      ctx.fillStyle = P.skinShadow;
      ctx.fillRect(charX + 6, charY + 9, 4, 3); // Neck

      if (isWaving) {
        // Face turned 3/4 front, warm gentle smile
        ctx.fillStyle = P.skin;
        ctx.fillRect(charX + 4, charY, 9, 10);
        ctx.fillStyle = P.skinHighlight;
        ctx.fillRect(charX + 5, charY + 1, 6, 2);

        // Eyes (warm closed curve or friendly pixel dots)
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(charX + 6, charY + 4, 2, 1);
        ctx.fillRect(charX + 10, charY + 4, 2, 1);

        // Smile
        ctx.fillStyle = P.skinShadow;
        ctx.fillRect(charX + 7, charY + 7, 3, 1);

        // Black Hair (textured volume)
        ctx.fillStyle = P.hair;
        ctx.fillRect(charX + 3, charY - 3, 11, 4);
        ctx.fillRect(charX + 2, charY - 1, 3, 5);
        ctx.fillRect(charX + 12, charY - 1, 3, 5);
        ctx.fillStyle = P.hairHighlight;
        ctx.fillRect(charX + 5, charY - 3, 6, 1);

        // Waving Arm (hand raised in friendly pixel salute)
        const waveAngle = Math.floor(frame / 12) % 2 === 0;
        ctx.fillStyle = P.sweater;
        ctx.fillRect(charX + 13, charY + 8, 4, 4);
        ctx.fillRect(charX + 15, charY + 3, 3, 5);
        ctx.fillStyle = P.skin;
        ctx.fillRect(charX + 15 + (waveAngle ? 1 : -1), charY, 4, 4); // Waving hand
      } else {
        // Profile Facing Monitor (Focused & relaxed)
        ctx.fillStyle = P.skin;
        ctx.fillRect(charX + 3, charY, 9, 10);
        ctx.fillStyle = P.skinHighlight;
        ctx.fillRect(charX + 4, charY + 1, 6, 2);

        // Profile Eye looking at monitor
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(charX + 4, charY + 4, 2, 1);

        // Black Hair
        ctx.fillStyle = P.hair;
        ctx.fillRect(charX + 2, charY - 3, 11, 4);
        ctx.fillRect(charX + 8, charY - 2, 5, 8); // Back hair
        ctx.fillRect(charX + 1, charY - 1, 4, 3); // Forehead hair
        ctx.fillStyle = P.hairHighlight;
        ctx.fillRect(charX + 4, charY - 3, 5, 1);

        // Left Arm resting on desk / typing on keyboard
        const keyTap = isTyping && Math.floor(frame / 15) % 2 === 0 ? 1 : 0;
        ctx.fillStyle = P.sweater;
        ctx.fillRect(charX + 2, charY + 14, 5, 4); // Shoulder
        ctx.fillRect(charX - 3, charY + 15 + keyTap, 7, 3); // Forearm
        ctx.fillStyle = P.skin;
        ctx.fillRect(charX - 6, charY + 15 + keyTap, 3, 3); // Hand on keyboard
      }

      // 11. STEPPED PIXEL LIGHTING PASS (No smooth modern blur, strict pixel art!)
      if (isNight) {
        // Bulb glow point
        ctx.fillStyle = P.lampBulbOn;
        ctx.fillRect(lampX + 2, lampY + 4, 4, 2);

        // 2x2 Checkerboard Dither for Warm Lamp Light Cone
        // Shines down across the desk, keyboard, and hands
        const coneTop = lampY + 6;
        for (let y = coneTop; y < 94; y += 1) {
          const spread = Math.floor((y - coneTop) * 0.9);
          const leftEdge = Math.max(86, lampX - spread);
          const rightEdge = Math.min(154, lampX + 8 + Math.floor(spread * 0.5));

          for (let x = leftEdge; x < rightEdge; x += 1) {
            // Dither pattern (checkerboard 2x2)
            const isDither = (x + y) % 2 === 0;
            if (isDither) {
              const distanceFade = (y - coneTop) / (94 - coneTop);
              ctx.fillStyle = distanceFade > 0.6 ? 'rgba(254, 240, 138, 0.12)' : 'rgba(254, 240, 138, 0.22)';
              ctx.fillRect(x, y, 1, 1);
            }
          }
        }

        // Monitor Cool Screen Glow onto Keyboard & Hands
        ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
        ctx.fillRect(104, 73, 14, 4);
      } else {
        // Daytime Window Sunbeam (Stepped angle light beam onto floor)
        for (let y = 56; y < 108; y += 1) {
          const shiftX = Math.floor((y - 56) * 0.85);
          const beamLeft = 36 + shiftX;
          const beamWidth = 24;
          for (let x = beamLeft; x < beamLeft + beamWidth; x += 1) {
            if ((x + y) % 3 === 0) {
              ctx.fillStyle = 'rgba(254, 240, 138, 0.10)';
              ctx.fillRect(x, y, 1, 1);
            }
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isFlipped, timeOfDay, characterAction]);

  return (
    <div className="relative w-full flex flex-col justify-between h-full select-none">
      {/* 1. Header Bar: Quiet, Cozy Retro Indie Title */}
      <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-mono text-xs font-bold text-amber-300 tracking-wider">
            A DEVELOPER&apos;S LITTLE WORLD
          </span>
        </div>

        {/* Day / Night Toggle Pill */}
        <button
          type="button"
          onClick={toggleTimeOfDay}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-[11px] font-mono text-white transition-all cursor-pointer shadow-sm active:scale-95"
          title={isId ? 'Klik untuk mengganti waktu siang / malam' : 'Click to toggle day / night'}
        >
          {timeOfDay === 'night' ? (
            <>
              <Moon className="h-3 w-3 text-indigo-300" />
              <span className="text-indigo-200">AFTER HOURS</span>
            </>
          ) : (
            <>
              <Sun className="h-3 w-3 text-amber-400" />
              <span className="text-amber-200">GOLDEN HOUR</span>
            </>
          )}
        </button>
      </div>

      {/* 2. Main Pixel Art Canvas Stage with Interactive Click Zones */}
      <div className="relative w-full max-w-[380px] mx-auto my-auto aspect-[3/2] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#12131a] group">
        {/* Crisp HTML5 Canvas */}
        <canvas
          ref={canvasRef}
          width={VW}
          height={VH}
          className="w-full h-full block pixelated pointer-events-none"
          style={{
            imageRendering: 'pixelated',
          }}
        />

        {/* Interactive Hotspot 1: Window (Click to Toggle Day/Night) */}
        <button
          type="button"
          onClick={toggleTimeOfDay}
          className="absolute left-[9%] top-[12%] w-[23%] h-[40%] rounded-lg cursor-pointer transition-colors hover:bg-white/10 focus:outline-none"
          aria-label={isId ? 'Ubah Waktu Siang / Malam' : 'Toggle Day / Night'}
          title={isId ? 'Klik jendela untuk beralih waktu siang/malam' : 'Click window to toggle day/night'}
        />

        {/* Interactive Hotspot 2: Computer Monitor (Click to Trigger Build Toast) */}
        <button
          type="button"
          onClick={handleComputerClick}
          className="absolute left-[45%] top-[40%] w-[16%] h-[24%] rounded cursor-pointer transition-colors hover:bg-cyan-400/15 focus:outline-none"
          aria-label={isId ? 'Interaksi Komputer Developer' : 'Interact with Dev Computer'}
          title={isId ? 'Klik monitor untuk menjalankan kompilasi' : 'Click monitor to run compile check'}
        />

        {/* Interactive Hotspot 3: Developer Character (Click to Wave & Chat) */}
        <button
          type="button"
          onClick={handleCharacterClick}
          className="absolute left-[58%] top-[44%] w-[18%] h-[42%] rounded-lg cursor-pointer transition-colors hover:bg-amber-400/15 focus:outline-none"
          aria-label={isId ? 'Sapa Sakti' : 'Greet Sakti'}
          title={isId ? 'Klik karakter untuk menyapa Sakti' : 'Click character to greet Sakti'}
        />

        {/* Floating Dialogue Speech Bubble (When Sakti is clicked) */}
        <AnimatePresence>
          {activeDialogue && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute left-3 right-3 top-3 p-2.5 rounded-xl bg-black/90 border border-amber-400/40 text-amber-200 font-mono text-[11px] leading-snug backdrop-blur-md shadow-2xl z-30 pointer-events-none"
            >
              <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-0.5 text-[10px]">
                <Coffee className="h-3 w-3" />
                <span>SAKTI // DEV LOG:</span>
              </div>
              <p className="text-white/95">{activeDialogue}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Computer Toast (When Monitor is clicked) */}
        <AnimatePresence>
          {computerToast && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-4 bottom-3 p-2 rounded-lg bg-black/90 border border-cyan-400/50 text-cyan-300 font-mono text-[10px] flex items-center gap-2 backdrop-blur-md shadow-xl z-30 pointer-events-none"
            >
              <Code2 className="h-3.5 w-3.5 text-cyan-400 shrink-0 animate-pulse" />
              <span className="truncate">{computerToast}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Footer Bar: Minimal & Peaceful Navigation */}
      <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between font-mono text-[11px]">
        <div className="flex items-center gap-1.5 text-[var(--text-muted)] text-[10px]">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80 animate-pulse" />
          <span>MINI_WORLD // COZY_STUDIO</span>
        </div>
        <button
          type="button"
          onClick={onFlipBack}
          className="ml-auto inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
        >
          <RotateCw className="h-3 w-3" />
          <span>{isId ? 'Spesifikasi' : 'Specifications'}</span>
        </button>
      </div>
    </div>
  );
}

