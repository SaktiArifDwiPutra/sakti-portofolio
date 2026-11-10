'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Cpu, Activity, Move } from 'lucide-react';
import { getTechLogo } from './TechLogos';

interface TechNode {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'game' | 'mobile' | 'database' | 'tools';
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  projectNote: string;
  role: string;
}

const ALL_GITHUB_TECH_NODES: TechNode[] = [
  // Frontend
  { id: 'react', name: 'React', category: 'frontend', color: '#61dafb', x: 16, y: 22, vx: 0.16, vy: 0.18, projectNote: 'Component hierarchy, custom hooks & reactive UI feeds in CritiPlay', role: 'Frontend UI Library' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', color: '#00f0ff', x: 36, y: 16, vx: -0.18, vy: 0.14, projectNote: 'App Router, SSG/SSR bilingual internationalization & fast web apps', role: 'Full-Stack Framework' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', color: '#3178c6', x: 58, y: 20, vx: 0.14, vy: -0.19, projectNote: 'Strict type contracts & end-to-end domain safety across projects', role: 'Type Systems' },
  { id: 'javascript', name: 'JavaScript', category: 'frontend', color: '#f7df1e', x: 80, y: 18, vx: -0.15, vy: 0.2, projectNote: 'Core client scripting, asynchronous fetch pipelines & game state', role: 'Core Scripting' },
  { id: 'html5', name: 'HTML 5', category: 'frontend', color: '#e34f26', x: 14, y: 40, vx: 0.19, vy: -0.15, projectNote: 'Semantic markup, accessible structure & HTML 5 2D Canvas engine', role: 'Semantic & Canvas' },
  { id: 'css', name: 'CSS', category: 'frontend', color: '#1572b6', x: 32, y: 38, vx: -0.17, vy: -0.18, projectNote: 'Modern responsive styling, flexbox/grid choreography & animations', role: 'Layout & Styling' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', color: '#38bdf8', x: 50, y: 35, vx: 0.15, vy: 0.18, projectNote: 'Fluid responsive layout tokens, cyberpunk aesthetics & design systems', role: 'Utility Styling' },

  // Backend
  { id: 'laravel', name: 'Laravel', category: 'backend', color: '#ff2d20', x: 70, y: 38, vx: -0.18, vy: 0.15, projectNote: 'REST API architecture, Eloquent ORM & token authentication in CritiPlay', role: 'Backend Framework' },
  { id: 'php', name: 'PHP', category: 'backend', color: '#777bb4', x: 88, y: 36, vx: 0.14, vy: -0.16, projectNote: 'Pilketos web voting system, multi-role auth & session security', role: 'Server-Side Web' },
  { id: 'nodejs', name: 'Node.js', category: 'backend', color: '#68a063', x: 20, y: 56, vx: 0.17, vy: 0.14, projectNote: 'Server-side runtime, build pipelines, asynchronous APIs & tooling', role: 'JavaScript Runtime' },
  { id: 'hono', name: 'Hono.js', category: 'backend', color: '#e36002', x: 40, y: 54, vx: -0.16, vy: -0.17, projectNote: 'Lightweight web standards routing, cloud functions & edge APIs', role: 'Edge Web Standards' },
  { id: 'python', name: 'Python', category: 'backend', color: '#3776ab', x: 60, y: 55, vx: 0.18, vy: -0.15, projectNote: 'Custom ERP business logic & module development in eventflow_management', role: 'ERP & Scripting' },
  { id: 'odoo', name: 'Odoo ERP', category: 'backend', color: '#714b67', x: 80, y: 56, vx: -0.15, vy: 0.18, projectNote: 'Enterprise model synchronization & mobile dispatch bridging in LaundryFlow', role: 'Enterprise Systems' },

  // Mobile
  { id: 'flutter', name: 'Flutter', category: 'mobile', color: '#54c5f8', x: 16, y: 72, vx: 0.15, vy: -0.16, projectNote: 'Cross-platform mobile client & ergonomic status boards in LaundryFlow', role: 'Mobile Framework' },
  { id: 'dart', name: 'Dart', category: 'mobile', color: '#0175c2', x: 34, y: 70, vx: -0.18, vy: 0.14, projectNote: 'Strongly typed client domain models & Odoo RPC adapters in LaundryFlow', role: 'Client Language' },

  // Game Dev
  { id: 'phaser', name: 'Phaser', category: 'game', color: '#f39c12', x: 52, y: 72, vx: 0.16, vy: 0.17, projectNote: 'Core HTML5 game engine powering Daus Anak Soleh prayer puzzle', role: 'HTML5 Game Engine' },
  { id: 'godot', name: 'Godot', category: 'game', color: '#478cbf', x: 70, y: 70, vx: -0.17, vy: -0.15, projectNote: 'Scene tree composition & signal architecture in Negeri Kelabu', role: 'Indie Game Engine' },
  { id: 'gdscript', name: 'GDScript', category: 'game', color: '#659ad2', x: 88, y: 72, vx: 0.15, vy: 0.16, projectNote: 'State machines, dialogue branch parsers & day rhythm simulation loops', role: 'Game Scripting' },

  // Database
  { id: 'mysql', name: 'MySQL', category: 'database', color: '#00758f', x: 26, y: 30, vx: -0.15, vy: 0.17, projectNote: 'Relational schemas, foreign key integrity & transactions in CritiPlay & Pilketos', role: 'Relational Database' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'database', color: '#336791', x: 46, y: 32, vx: 0.18, vy: -0.14, projectNote: 'Enterprise relational persistence, advanced indexing & ACID query guarantees', role: 'Relational Database' },
  { id: 'sqlite', name: 'SQLite', category: 'database', color: '#003b57', x: 66, y: 30, vx: -0.16, vy: -0.16, projectNote: 'Zero-configuration embedded local database for mobile caching & desktop apps', role: 'Embedded Database' },
  { id: 'supabase', name: 'Supabase', category: 'database', color: '#3ecf8e', x: 76, y: 48, vx: 0.17, vy: 0.15, projectNote: 'Cloud Postgres backend, Row Level Security, instant REST APIs & auth', role: 'Backend-as-a-Service' },

  // Tools
  { id: 'docker', name: 'Docker', category: 'tools', color: '#2496ed', x: 36, y: 46, vx: -0.14, vy: 0.17, projectNote: 'Containerization, reproducible runtimes & docker-compose in Dragonhold', role: 'DevOps & Containers' },
];

export function TechGravitySandbox() {
  const [nodes, setNodes] = useState<TechNode[]>(ALL_GITHUB_TECH_NODES);
  const [activeFilter, setActiveFilter] = useState<'all' | 'frontend' | 'backend' | 'game' | 'mobile' | 'database' | 'tools'>('all');
  const [selectedNode, setSelectedNode] = useState<TechNode>(ALL_GITHUB_TECH_NODES[0]);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [impulseActive, setImpulseActive] = useState(false);
  const sandboxRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  // Pointer drag & throw velocity tracking refs
  const dragStartRef = useRef<{ pointerX: number; pointerY: number; nodeX: number; nodeY: number } | null>(null);
  const velocityHistoryRef = useRef<Array<{ x: number; y: number; time: number }>>([]);

  // Rigid boundaries ensuring capsules never cross the container edges
  const MIN_X = 6;
  const MAX_X = 94;
  const MIN_Y = 8;
  const MAX_Y = 82;

  // Floating physics animation loop with rigid boundary reflection & throw damping
  useEffect(() => {
    const TARGET_AMBIENT_SPEED = 0.17;

    const interval = setInterval(() => {
      setNodes((prevNodes) =>
        prevNodes.map((node) => {
          if (node.id === draggingNodeId) return node;

          let nextX = node.x + node.vx;
          let nextY = node.y + node.vy;
          let nextVx = node.vx;
          let nextVy = node.vy;

          // Rigid bounce: guaranteed direction inversion (cannot penetrate or disappear)
          // With slight bounce restitution (0.92) for high-speed impacts
          if (nextX <= MIN_X) {
            nextVx = Math.abs(nextVx) * 0.92; // strictly bounce rightward
            nextX = MIN_X;
          } else if (nextX >= MAX_X) {
            nextVx = -Math.abs(nextVx) * 0.92; // strictly bounce leftward
            nextX = MAX_X;
          }

          if (nextY <= MIN_Y) {
            nextVy = Math.abs(nextVy) * 0.92; // strictly bounce downward
            nextY = MIN_Y;
          } else if (nextY >= MAX_Y) {
            nextVy = -Math.abs(nextVy) * 0.92; // strictly bounce upward
            nextY = MAX_Y;
          }

          // Air resistance / friction damping:
          // If thrown quickly, smoothly decelerate down to ambient floating drift
          const currentSpeed = Math.hypot(nextVx, nextVy);
          if (currentSpeed > TARGET_AMBIENT_SPEED) {
            const dampedSpeed = Math.max(TARGET_AMBIENT_SPEED, currentSpeed * 0.955);
            const dampingFactor = dampedSpeed / currentSpeed;
            nextVx *= dampingFactor;
            nextVy *= dampingFactor;
          } else if (currentSpeed < 0.08 && currentSpeed > 0) {
            // Keep ambient float active so it doesn't freeze
            const boost = TARGET_AMBIENT_SPEED / currentSpeed;
            nextVx *= boost;
            nextVy *= boost;
          }

          return {
            ...node,
            x: nextX,
            y: nextY,
            vx: nextVx,
            vy: nextVy,
          };
        })
      );
    }, 45);

    return () => clearInterval(interval);
  }, [draggingNodeId]);

  // Smooth pointer drag handlers with throw/fling physics
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, node: TechNode) => {
    e.stopPropagation();
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    setSelectedNode(node);
    setDraggingNodeId(node.id);
    dragStartRef.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      nodeX: node.x,
      nodeY: node.y,
    };
    velocityHistoryRef.current = [{ x: e.clientX, y: e.clientY, time: performance.now() }];
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingNodeId || !dragStartRef.current || !sandboxRef.current) return;

    const rect = sandboxRef.current.getBoundingClientRect();
    const deltaXPercent = ((e.clientX - dragStartRef.current.pointerX) / rect.width) * 100;
    const deltaYPercent = ((e.clientY - dragStartRef.current.pointerY) / rect.height) * 100;

    const clampedX = Math.max(MIN_X, Math.min(MAX_X, dragStartRef.current.nodeX + deltaXPercent));
    const clampedY = Math.max(MIN_Y, Math.min(MAX_Y, dragStartRef.current.nodeY + deltaYPercent));

    setNodes((prev) =>
      prev.map((n) =>
        n.id === draggingNodeId ? { ...n, x: clampedX, y: clampedY } : n
      )
    );

    // Track recent motion history for instantaneous throw velocity
    const now = performance.now();
    const history = velocityHistoryRef.current;
    history.push({ x: e.clientX, y: e.clientY, time: now });
    // Keep sliding window of recent 90ms
    while (history.length > 2 && now - history[0].time > 90) {
      history.shift();
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (draggingNodeId) {
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Safe fallback
      }

      const now = performance.now();
      const history = velocityHistoryRef.current;
      let throwVx = 0;
      let throwVy = 0;

      if (history.length >= 2 && sandboxRef.current) {
        const oldest = history[0];
        const newest = history[history.length - 1];
        const dt = newest.time - oldest.time;
        const timeSinceLastMove = now - newest.time;

        // Only fling if released while still moving (within 70ms of last move event)
        if (dt > 10 && timeSinceLastMove < 70) {
          const rect = sandboxRef.current.getBoundingClientRect();
          const dxPercent = ((newest.x - oldest.x) / rect.width) * 100;
          const dyPercent = ((newest.y - oldest.y) / rect.height) * 100;

          // Velocity in percent per 45ms physics tick
          throwVx = (dxPercent / dt) * 45;
          throwVy = (dyPercent / dt) * 45;

          // Clamp maximum throw speed so it stays within visible, enjoyable physics
          const MAX_THROW_SPEED = 2.6;
          const throwSpeed = Math.hypot(throwVx, throwVy);
          if (throwSpeed > MAX_THROW_SPEED) {
            const scale = MAX_THROW_SPEED / throwSpeed;
            throwVx *= scale;
            throwVy *= scale;
          }
        }
      }

      const hasThrow = Math.hypot(throwVx, throwVy) > 0.22;

      setNodes((prev) =>
        prev.map((n) => {
          if (n.id === draggingNodeId) {
            return {
              ...n,
              vx: hasThrow ? throwVx : (Math.random() > 0.5 ? 0.16 : -0.16),
              vy: hasThrow ? throwVy : (Math.random() > 0.5 ? 0.16 : -0.16),
            };
          }
          return n;
        })
      );

      setDraggingNodeId(null);
      dragStartRef.current = null;
      velocityHistoryRef.current = [];
    }
  };

  // Trigger Anti-Gravity Shockwave
  const triggerAntiGravityImpulse = () => {
    setImpulseActive(true);
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.3 + Math.random() * 1.2;
        return {
          ...node,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        };
      })
    );

    setTimeout(() => {
      setImpulseActive(false);
    }, 700);
  };

  const handleMouseMoveSandbox = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sandboxRef.current) return;
    const rect = sandboxRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const filteredNodes =
    activeFilter === 'all'
      ? nodes
      : nodes.filter((n) => n.category === activeFilter);

  // Active theme color matching current selected language
  const activeContainerColor = selectedNode.color || 'var(--accent-primary)';

  return (
    <div className="space-y-6">
      {/* Interactive Control Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl theme-card shadow-md">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {(
            [
              { id: 'all', label: 'All Tech (23)' },
              { id: 'frontend', label: 'Frontend' },
              { id: 'backend', label: 'Backend' },
              { id: 'database', label: 'Database' },
              { id: 'game', label: 'Game Engines' },
              { id: 'mobile', label: 'Mobile' },
              { id: 'tools', label: 'DevOps' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                activeFilter === tab.id
                  ? 'bg-[var(--accent-primary)] text-[var(--accent-primary-ink)] font-bold shadow-md'
                  : 'theme-chip hover:border-[var(--accent-primary)]/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Anti-Gravity Pulse Button */}
        <button
          type="button"
          onClick={triggerAntiGravityImpulse}
          className="interactive-btn interactive-btn-secondary px-4 py-2 text-xs font-mono flex items-center gap-2"
        >
          <Zap className={`h-3.5 w-3.5 ${impulseActive ? 'text-amber-400 animate-spin' : 'text-[var(--accent-primary)]'}`} />
          <span>Anti-Gravity Impulse</span>
        </button>
      </div>

      {/* Main Physics Arena Container with Dynamic Language Color Border & Interior Glow */}
      <div
        ref={sandboxRef}
        onMouseMove={handleMouseMoveSandbox}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onMouseLeave={() => setMousePos({ x: -1000, y: -1000 })}
        className="relative h-[480px] sm:h-[540px] w-full rounded-3xl overflow-hidden select-none touch-none transition-all duration-500 border-2"
        style={{
          borderColor: activeContainerColor,
          boxShadow: `0 0 45px ${activeContainerColor}30, inset 0 0 50px ${activeContainerColor}12`,
          background: 'radial-gradient(ellipse 90% 80% at 50% 50%, rgba(10, 14, 22, 0.96), var(--bg-canvas))',
        }}
      >
        {/* Background Coordinate Grid with language color tint */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.08] pointer-events-none transition-colors duration-500"
          style={{
            backgroundImage: `linear-gradient(to right, ${activeContainerColor} 1px, transparent 1px), linear-gradient(to bottom, ${activeContainerColor} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Dynamic Gravitational Cursor Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute w-64 h-64 rounded-full opacity-[0.12] blur-[75px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
          style={{
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            backgroundColor: activeContainerColor,
          }}
        />

        {/* Interactive Floating Tech Nodes with Official Logos */}
        {filteredNodes.map((node) => {
          const isSelected = selectedNode.id === node.id;
          const isBeingDragged = draggingNodeId === node.id;

          return (
            <div
              key={node.id}
              onPointerDown={(e) => handlePointerDown(e, node)}
              onPointerCancel={handlePointerUp}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing z-20 group"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                touchAction: 'none',
                transition: isBeingDragged ? 'none' : 'left 45ms linear, top 45ms linear',
              }}
            >
              {/* Outer Glowing Tactile Capsule */}
              <div
                className={`relative flex items-center justify-center rounded-2xl p-2.5 sm:p-3 backdrop-blur-md transition-all duration-200 ${
                  isSelected
                    ? 'border-2 shadow-2xl scale-115'
                    : 'border hover:shadow-lg hover:scale-110'
                }`}
                style={{
                  backgroundColor: isSelected ? 'rgba(255,255,255,0.18)' : 'rgba(255, 255, 255, 0.05)',
                  borderColor: isSelected ? node.color : 'rgba(255, 255, 255, 0.14)',
                  boxShadow: isSelected ? `0 0 25px ${node.color}75` : 'none',
                }}
              >
                {/* Official Vector Logo */}
                <div className="flex items-center justify-center pointer-events-none">
                  {getTechLogo(node.id, 'h-6 w-6 sm:h-7 sm:w-7')}
                </div>

                {/* Status Dot */}
                <span
                  className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full border border-black"
                  style={{ backgroundColor: node.color }}
                />
              </div>

              {/* Tooltip Tag */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-0.5 rounded-full bg-black/90 border border-white/10 text-[10px] font-mono text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md z-30">
                {node.name}
              </div>
            </div>
          );
        })}

        {/* Arena Telemetry Bar */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)] pointer-events-none">
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 animate-pulse" style={{ color: activeContainerColor }} />
            <span>RIGID WALL REFLECTION // ZERO-G ENGINE</span>
          </div>
          <span className="flex items-center gap-1.5">
            <Move className="h-3 w-3" style={{ color: activeContainerColor }} />
            <span>DRAG BOX WITH CURSOR OR THUMB 🕹️</span>
          </span>
        </div>
      </div>

      {/* Selected Node Telemetry HUD Card with Official Logo */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedNode.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-5 sm:p-6 rounded-2xl theme-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border"
          style={{
            borderColor: `${activeContainerColor}50`,
            boxShadow: `0 10px 30px -10px ${activeContainerColor}25`,
          }}
        >
          <div className="flex items-center gap-4">
            {/* Large Official Logo Icon */}
            <div
              className="p-3 rounded-2xl border flex items-center justify-center shrink-0 shadow-md"
              style={{
                backgroundColor: `${activeContainerColor}15`,
                borderColor: `${activeContainerColor}40`,
              }}
            >
              {getTechLogo(selectedNode.id, 'h-8 w-8 sm:h-9 sm:w-9')}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span
                  className="font-mono text-base sm:text-lg font-bold"
                  style={{ color: selectedNode.color }}
                >
                  {selectedNode.name}
                </span>
                <span className="px-2.5 py-0.5 rounded-full theme-chip font-mono text-[10px] uppercase font-semibold">
                  {selectedNode.role}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                {selectedNode.projectNote}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
            <Cpu className="h-4 w-4" style={{ color: selectedNode.color }} />
            <span>Verified in GitHub Repos</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
