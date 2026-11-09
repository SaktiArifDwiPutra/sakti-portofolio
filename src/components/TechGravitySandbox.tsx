'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Cpu, Activity, Move } from 'lucide-react';

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

const ALL_GITHUB_TECH_NODES: TechNode[] = [
  { id: 'react', name: 'React 19', category: 'frontend', color: '#61dafb', x: 20, y: 30, vx: 0.18, vy: 0.22, iconText: 'Re', projectNote: 'CritiPlay component hierarchy & reactive review feeds', role: 'Frontend UI' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', color: '#3178c6', x: 45, y: 22, vx: -0.2, vy: 0.15, iconText: 'TS', projectNote: 'End-to-end type safety in CritiPlay, Dragonhold & Coordina', role: 'Type Systems' },
  { id: 'nextjs', name: 'Next.js 15', category: 'frontend', color: '#ffffff', x: 72, y: 28, vx: 0.15, vy: -0.22, iconText: 'Nx', projectNote: 'App router, SSG/SSR bilingual architectures', role: 'Full-Stack Framework' },
  { id: 'php', name: 'PHP Native', category: 'backend', color: '#8892be', x: 15, y: 68, vx: 0.22, vy: -0.16, iconText: 'PHP', projectNote: 'Pilketos Web App multi-role authentication & voting engine', role: 'Server-Side Web' },
  { id: 'laravel', name: 'Laravel', category: 'backend', color: '#ff2d20', x: 38, y: 72, vx: -0.18, vy: 0.18, iconText: 'Lv', projectNote: 'RESTful API architecture & Eloquent ORM in CritiPlay', role: 'Backend Framework' },
  { id: 'mysql', name: 'MySQL', category: 'backend', color: '#00758f', x: 60, y: 65, vx: 0.2, vy: -0.19, iconText: 'SQL', projectNote: 'Relational data schemas for Pilketos, CritiPlay & School databases', role: 'Relational Database' },
  { id: 'python', name: 'Python', category: 'backend', color: '#3776ab', x: 82, y: 68, vx: -0.22, vy: -0.14, iconText: 'Py', projectNote: 'Custom Odoo ERP module development in eventflow_management', role: 'ERP Scripting' },
  { id: 'odoo', name: 'Odoo ERP', category: 'backend', color: '#714b67', x: 50, y: 48, vx: 0.14, vy: 0.22, iconText: 'Od', projectNote: 'Resource modeling in LaundryFlow & eventflow_management module', role: 'Enterprise Systems' },
  { id: 'flutter', name: 'Flutter & Dart', category: 'mobile', color: '#54c5f8', x: 12, y: 48, vx: 0.2, vy: -0.22, iconText: 'Fl', projectNote: 'Operational mobile workflow app in LaundryFlow', role: 'Cross-Platform Mobile' },
  { id: 'canvas', name: 'HTML5 & Canvas Game', category: 'game', color: '#f59e0b', x: 86, y: 25, vx: -0.16, vy: 0.2, iconText: 'JS', projectNote: 'Interactive educational game mechanics in Daus Anak Soleh', role: 'Game Programming' },
  { id: 'godot', name: 'Godot Engine 4', category: 'game', color: '#478cbf', x: 84, y: 46, vx: 0.22, vy: -0.18, iconText: 'Gd', projectNote: 'Node-based scene composition & signal architecture in Negeri Kelabu', role: 'Indie Game Engine' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', color: '#38bdf8', x: 32, y: 42, vx: -0.19, vy: -0.15, iconText: 'TW', projectNote: 'Fluid responsive layout tokens & design systems', role: 'Utility Styling' },
  { id: 'docker', name: 'Docker', category: 'tools', color: '#2496ed', x: 68, y: 45, vx: 0.16, vy: 0.2, iconText: 'Dk', projectNote: 'Containerization & compose orchestrations in Dragonhold', role: 'DevOps & Containers' },
];

export function TechGravitySandbox() {
  const [nodes, setNodes] = useState<TechNode[]>(ALL_GITHUB_TECH_NODES);
  const [activeFilter, setActiveFilter] = useState<'all' | 'frontend' | 'backend' | 'game' | 'mobile' | 'tools'>('all');
  const [selectedNode, setSelectedNode] = useState<TechNode>(ALL_GITHUB_TECH_NODES[0]);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [impulseActive, setImpulseActive] = useState(false);
  const sandboxRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  // Floating physics animation loop (only animates nodes that are NOT currently being dragged by user)
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((prevNodes) =>
        prevNodes.map((node) => {
          if (node.id === draggingNodeId) return node;

          let nextX = node.x + node.vx;
          let nextY = node.y + node.vy;
          let nextVx = node.vx;
          let nextVy = node.vy;

          // Stay inside container bounds (7% to 93%)
          if (nextX <= 7 || nextX >= 93) {
            nextVx = -nextVx;
            nextX = Math.max(7, Math.min(93, nextX));
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
  }, [draggingNodeId]);

  // Trigger Anti-Gravity Shockwave
  const triggerAntiGravityImpulse = () => {
    setImpulseActive(true);
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.3 + Math.random() * 1.6;
        return {
          ...node,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        };
      })
    );

    setTimeout(() => {
      setNodes((prevNodes) =>
        prevNodes.map((node) => ({
          ...node,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
        }))
      );
      setImpulseActive(false);
    }, 850);
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
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl theme-card shadow-md">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: 'all', label: 'All Tech' },
              { id: 'frontend', label: 'Frontend / Web' },
              { id: 'backend', label: 'Backend / APIs' },
              { id: 'game', label: 'Game Engines' },
              { id: 'mobile', label: 'Mobile' },
              { id: 'tools', label: 'DevOps / Tools' },
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
          className="interactive-btn interactive-btn-secondary px-4 py-2 text-xs font-mono flex items-center gap-2"
        >
          <Zap className={`h-3.5 w-3.5 ${impulseActive ? 'text-amber-400 animate-spin' : 'text-[var(--accent-primary)]'}`} />
          <span>Anti-Gravity Impulse</span>
        </button>
      </div>

      {/* Main Physics Arena Container with Touch / Mouse Drag Support */}
      <div
        ref={sandboxRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: -1000, y: -1000 })}
        className="relative h-[440px] sm:h-[500px] w-full rounded-3xl theme-card overflow-hidden shadow-2xl select-none touch-none"
        style={{
          background: 'radial-gradient(ellipse 90% 80% at 50% 50%, rgba(20, 24, 33, 0.95), var(--bg-canvas))',
        }}
      >
        {/* Background Coordinate Grid */}
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

        {/* Interactive Draggable Floating Tech Nodes */}
        {filteredNodes.map((node) => {
          const isSelected = selectedNode.id === node.id;
          const isBeingDragged = draggingNodeId === node.id;

          return (
            <motion.div
              key={node.id}
              drag
              dragConstraints={sandboxRef}
              dragElastic={0.06}
              onDragStart={() => setDraggingNodeId(node.id)}
              onDragEnd={(e, info) => {
                setDraggingNodeId(null);
                // Update node position relative to sandbox container
                if (sandboxRef.current) {
                  const rect = sandboxRef.current.getBoundingClientRect();
                  const newX = Math.max(7, Math.min(93, ((info.point.x - rect.left) / rect.width) * 100));
                  const newY = Math.max(12, Math.min(88, ((info.point.y - rect.top) / rect.height) * 100));
                  setNodes((prev) =>
                    prev.map((n) => (n.id === node.id ? { ...n, x: newX, y: newY } : n))
                  );
                }
              }}
              whileHover={{ scale: 1.15 }}
              whileDrag={{ scale: 1.3, zIndex: 60, cursor: 'grabbing' }}
              onClick={() => setSelectedNode(node)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing z-20 group"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transition: isBeingDragged ? 'none' : 'left 45ms linear, top 45ms linear',
              }}
            >
              {/* Outer Glowing Tactile Capsule */}
              <div
                className={`relative flex items-center justify-center rounded-2xl p-3 sm:p-3.5 backdrop-blur-md transition-all duration-200 ${
                  isSelected
                    ? 'border-2 shadow-2xl'
                    : 'border hover:shadow-lg'
                }`}
                style={{
                  backgroundColor: isSelected ? 'rgba(255,255,255,0.14)' : 'rgba(255, 255, 255, 0.05)',
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

                {/* Status Dot */}
                <span
                  className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full border border-black"
                  style={{ backgroundColor: node.color }}
                />
              </div>

              {/* Tooltip Tag */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-0.5 rounded-full bg-black/85 border border-white/10 text-[10px] font-mono text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                {node.name}
              </div>
            </motion.div>
          );
        })}

        {/* Arena Telemetry Bar */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)] pointer-events-none">
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-[var(--accent-primary)] animate-pulse" />
            <span>ZERO-G COMPUTATION CHAMBER</span>
          </div>
          <span className="flex items-center gap-1.5">
            <Move className="h-3 w-3 text-[var(--accent-primary)]" />
            <span>DRAG ANY BOX WITH CURSOR OR THUMB 🕹️</span>
          </span>
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
              <span className="px-2.5 py-0.5 rounded-full theme-chip font-mono text-[10px] uppercase font-semibold">
                {selectedNode.role}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {selectedNode.projectNote}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
            <Cpu className="h-4 w-4 text-[var(--accent-primary)]" />
            <span>Verified in GitHub Repos</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
