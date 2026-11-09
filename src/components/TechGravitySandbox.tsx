'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Layers, RefreshCw, Cpu, Activity } from 'lucide-react';

interface TechNode {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'game' | 'mobile' | 'tools';
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  iconText: string;
  projectNote: string;
  role: string;
}

const INITIAL_NODES: TechNode[] = [
  { id: 'react', name: 'React 19', category: 'frontend', color: '#61dafb', x: 22, y: 35, vx: 0.2, vy: 0.3, iconText: 'Re', projectNote: 'CritiPlay component architecture & state lifecycle', role: 'Component Architecture' },
  { id: 'nextjs', name: 'Next.js 15', category: 'frontend', color: '#ffffff', x: 48, y: 20, vx: -0.25, vy: 0.2, iconText: 'Nx', projectNote: 'App Router, SSG/SSR & bilingual internationalization', role: 'Full-Stack Framework' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', color: '#3178c6', x: 75, y: 30, vx: 0.15, vy: -0.25, iconText: 'TS', projectNote: 'Strict type contracts & end-to-end domain safety', role: 'Type Systems' },
  { id: 'laravel', name: 'Laravel', category: 'backend', color: '#ff2d20', x: 30, y: 70, vx: 0.2, vy: -0.15, iconText: 'Lv', projectNote: 'REST APIs, Eloquent ORM & token authentication', role: 'API & Backend' },
  { id: 'mysql', name: 'MySQL', category: 'backend', color: '#00758f', x: 62, y: 68, vx: -0.2, vy: -0.2, iconText: 'SQL', projectNote: 'Relational schema design, indexes & data persistence', role: 'Relational Database' },
  { id: 'godot', name: 'Godot Engine 4', category: 'game', color: '#478cbf', x: 80, y: 65, vx: 0.25, vy: 0.15, iconText: 'Gd', projectNote: 'Scene tree composition & signal bus in Negeri Kelabu', role: 'Game Engine' },
  { id: 'gdscript', name: 'GDScript', category: 'game', color: '#a78bfa', x: 88, y: 40, vx: -0.18, vy: 0.22, iconText: 'GS', projectNote: 'State machines, dialogue tree parsers & day rhythm loops', role: 'Game Scripting' },
  { id: 'flutter', name: 'Flutter & Dart', category: 'mobile', color: '#54c5f8', x: 15, y: 55, vx: 0.22, vy: -0.18, iconText: 'Fl', projectNote: 'Cross-platform mobile UI for LaundryFlow operations', role: 'Mobile Client' },
  { id: 'odoo', name: 'Odoo ERP', category: 'backend', color: '#714b67', x: 42, y: 50, vx: -0.15, vy: 0.25, iconText: 'Od', projectNote: 'Centralized business models & mobile dispatch bridging', role: 'Enterprise Integration' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', color: '#38bdf8', x: 58, y: 40, vx: 0.18, vy: -0.2, iconText: 'TW', projectNote: 'Fluid responsive design systems & token styling', role: 'Styling Engine' },
];

export function TechGravitySandbox() {
  const [nodes, setNodes] = useState<TechNode[]>(INITIAL_NODES);
  const [activeFilter, setActiveFilter] = useState<'all' | 'frontend' | 'backend' | 'game' | 'mobile'>('all');
  const [selectedNode, setSelectedNode] = useState<TechNode>(INITIAL_NODES[0]);
  const [impulseActive, setImpulseActive] = useState(false);
  const sandboxRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  // Floating physics animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((prevNodes) =>
        prevNodes.map((node) => {
          let nextX = node.x + node.vx;
          let nextY = node.y + node.vy;
          let nextVx = node.vx;
          let nextVy = node.vy;

          // Boundary bouncing (percentages 8% to 92%)
          if (nextX <= 8 || nextX >= 92) {
            nextVx = -nextVx;
            nextX = Math.max(8, Math.min(92, nextX));
          }
          if (nextY <= 12 || nextY >= 88) {
            nextVy = -nextVy;
            nextY = Math.max(12, Math.min(88, nextY));
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
  }, []);

  // Trigger Anti-Gravity Shockwave
  const triggerAntiGravityImpulse = () => {
    setImpulseActive(true);
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.2 + Math.random() * 1.5;
        return {
          ...node,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        };
      })
    );

    // Decay velocity back to smooth drift
    setTimeout(() => {
      setNodes((prevNodes) =>
        prevNodes.map((node) => ({
          ...node,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
        }))
      );
      setImpulseActive(false);
    }, 900);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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

  return (
    <div className="space-y-6">
      {/* Interactive Control Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl theme-card">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: 'all', label: 'All Systems' },
              { id: 'frontend', label: 'Frontend / Web' },
              { id: 'backend', label: 'Backend / Data' },
              { id: 'game', label: 'Godot / Game Systems' },
              { id: 'mobile', label: 'Mobile' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
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
          className="interactive-btn interactive-btn-secondary px-4 py-1.5 text-xs font-mono flex items-center gap-2"
        >
          <Zap className={`h-3.5 w-3.5 ${impulseActive ? 'text-amber-400 animate-spin' : 'text-[var(--accent-primary)]'}`} />
          <span>Anti-Gravity Impulse</span>
        </button>
      </div>

      {/* Main Physics Arena Container */}
      <div
        ref={sandboxRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: -1000, y: -1000 })}
        className="relative h-[420px] sm:h-[480px] w-full rounded-3xl theme-card overflow-hidden shadow-2xl select-none"
        style={{
          background: 'radial-gradient(ellipse 90% 80% at 50% 50%, rgba(20, 24, 33, 0.95), var(--bg-canvas))',
        }}
      >
        {/* Background Grid & Coordinate Lines */}
        <div 
          aria-hidden="true" 
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, var(--text-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--text-primary) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Dynamic Gravitational Cursor Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute w-64 h-64 rounded-full bg-[var(--accent-primary)] opacity-[0.06] blur-[70px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
          style={{ left: `${mousePos.x}%`, top: `${mousePos.y}%` }}
        />

        {/* Interactive Floating Nodes */}
        {filteredNodes.map((node) => {
          const isSelected = selectedNode.id === node.id;

          return (
            <motion.div
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transition: 'left 45ms linear, top 45ms linear',
              }}
            >
              {/* Outer Energy Halo */}
              <div
                className={`relative flex items-center justify-center rounded-2xl p-3 sm:p-3.5 backdrop-blur-md transition-all duration-200 ${
                  isSelected
                    ? 'scale-125 border-2 shadow-2xl'
                    : 'group-hover:scale-115 border hover:shadow-lg'
                }`}
                style={{
                  backgroundColor: isSelected ? 'rgba(255,255,255,0.12)' : 'rgba(255, 255, 255, 0.05)',
                  borderColor: isSelected ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.12)',
                  boxShadow: isSelected ? '0 0 25px rgba(194, 237, 48, 0.35)' : 'none',
                }}
              >
                {/* Tech Monogram / Icon */}
                <span
                  className="font-mono text-xs sm:text-sm font-extrabold tracking-tight"
                  style={{ color: node.color }}
                >
                  {node.iconText}
                </span>

                {/* Status Indicator Dot */}
                <span
                  className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full border border-black"
                  style={{ backgroundColor: node.color }}
                />
              </div>

              {/* Tooltip Tag */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-0.5 rounded-full bg-black/80 border border-white/10 text-[10px] font-mono text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                {node.name}
              </div>
            </motion.div>
          );
        })}

        {/* Arena Telemetry Bar */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)] pointer-events-none">
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-[var(--accent-primary)] animate-pulse" />
            <span>ZERO-G COMPUTATION ENGINE</span>
          </div>
          <span>CLICK ANY NODE TO INSPECT</span>
        </div>
      </div>

      {/* Selected Node Telemetry HUD Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedNode.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-5 sm:p-6 rounded-2xl theme-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span
                className="font-mono text-base font-bold"
                style={{ color: selectedNode.color }}
              >
                {selectedNode.name}
              </span>
              <span className="px-2.5 py-0.5 rounded-full theme-chip font-mono text-[10px] uppercase">
                {selectedNode.role}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {selectedNode.projectNote}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
            <Cpu className="h-4 w-4 text-[var(--accent-primary)]" />
            <span>Architecture Verified</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
