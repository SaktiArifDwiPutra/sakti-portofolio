'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link, type Locale } from '@/i18n/routing';
import type { ProjectEntry } from '@/data/portfolio';
import { tField } from '@/data/portfolio';
import { ArrowUpRight, ExternalLink, Sparkles, FolderGit2, User } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

interface ProjectTiltCardProps {
  project: ProjectEntry;
  orderNumber: string;
}

export function ProjectTiltCard({ project, orderNumber }: ProjectTiltCardProps) {
  const locale = useLocale() as Locale;
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max 10 deg tilt
    const rotX = ((y - centerY) / centerY) * -8;
    const rotY = ((x - centerX) / centerX) * 8;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className="w-full transition-transform duration-200"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: isHovered
            ? 'transform 100ms ease-out'
            : 'transform 500ms cubic-bezier(0.23, 1, 0.32, 1)',
        }}
        className="group relative rounded-3xl theme-card p-6 sm:p-8 lg:p-10 overflow-hidden shadow-xl"
      >
        {/* Dynamic Specular Glare Effect */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 350px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.08), transparent 80%)`,
          }}
        />

        {/* Top Meta Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[var(--border-hairline)] mb-6">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold text-[var(--accent-primary)] tracking-wider">
              {orderNumber}
            </span>
            <span className="px-3 py-1 rounded-full theme-chip text-xs font-mono">
              {tField(project.category, locale)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
            <span className="font-mono text-xs text-[var(--text-muted)]">
              {tField(project.status, locale)}
            </span>
          </div>
        </div>

        {/* Main Content: 2-Column Responsive Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Title, Tagline, Brief Description & Action Pills */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors tracking-tight">
                <Link href={`/projects/${project.slug}`}>
                  {project.name}
                </Link>
              </h3>
              <p className="font-mono text-xs text-[var(--accent-primary)] mt-1.5 font-medium">
                {tField(project.tagline, locale)}
              </p>
            </div>

            {/* Clean Paragraph with strict bounding to avoid laundryflow overflow */}
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed break-words">
              {tField(project.description, locale)}
            </p>

            {/* Tech Stack Chips */}
            <div className="pt-1">
              <span className="font-mono text-[11px] uppercase text-[var(--text-muted)] tracking-wider block mb-2">
                Core Technologies
              </span>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-full theme-chip hover:border-[var(--accent-primary)] transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons: Repo, Live Demo & Case Study */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Link
                href={`/projects/${project.slug}`}
                className="interactive-btn interactive-btn-primary px-5 py-2.5 text-xs font-mono uppercase tracking-wider shadow-md"
              >
                <span>Read Case Study</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>

              {project.links.repositories && project.links.repositories.length > 0 ? (
                project.links.repositories.map((repo) => (
                  <a
                    key={repo.url}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive-btn interactive-btn-secondary px-4 py-2.5 text-xs font-mono"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    <span>{repo.name}</span>
                  </a>
                ))
              ) : project.links.repository ? (
                <a
                  href={project.links.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-btn interactive-btn-secondary px-4 py-2.5 text-xs font-mono"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>Source Code</span>
                </a>
              ) : null}

              {project.links.demo !== undefined && (
                project.links.demo ? (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`interactive-btn interactive-btn-secondary px-4 py-2.5 text-xs font-mono ${
                      project.slug === 'critiplay'
                        ? 'border-cyan-500/40 text-cyan-400 hover:border-cyan-400 font-bold'
                        : project.slug === 'daus-anak-soleh'
                        ? 'border-amber-500/40 text-amber-400 hover:border-amber-400 font-bold'
                        : 'text-[var(--accent-primary)] hover:border-[var(--accent-primary)]'
                    }`}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>
                      {project.slug === 'critiplay'
                        ? 'Live Link Preview'
                        : project.slug === 'daus-anak-soleh'
                        ? (locale === 'id' ? 'Mainkan di itch.io' : 'Play on itch.io')
                        : 'Live App'}
                    </span>
                  </a>
                ) : (
                  <span
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-dashed border-[var(--border-hairline)] bg-[var(--surface-hover)] text-xs font-mono text-[var(--text-muted)]"
                    title="Live URL slot prepared: fill link in src/data/portfolio.ts"
                  >
                    <ExternalLink className="h-3 w-3 opacity-50" />
                    <span>Live: [Pending Setup]</span>
                  </span>
                )
              )}

              {project.links.collaborator && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-xs font-mono">
                  <span className="text-[var(--text-muted)]">
                    {locale === 'id' ? 'Mitra:' : 'Partner:'}
                  </span>
                  <a
                    href={project.links.collaborator.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 font-bold underline underline-offset-2 decoration-cyan-400/50 hover:decoration-cyan-300 transition-colors cursor-pointer"
                    title="GitHub: Khairul (@Kyunn17)"
                  >
                    Khairul
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Project Visual Cover (Dummy, Zoom on Hover) */}
          <div className="lg:col-span-6">
            <Link
              href={`/projects/${project.slug}`}
              className="relative block aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[var(--border-hairline)] bg-[var(--bg-canvas)] shadow-inner group/cover"
            >
              <Image
                src={project.coverImage}
                alt={`${project.name} Cover`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 ease-out group-hover/cover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-4 sm:p-5">
                <span className="font-mono text-xs text-white drop-shadow">
                  {project.name}: Preview
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/20 font-mono text-[11px] text-[var(--accent-primary)] backdrop-blur-md">
                  <span>Explore</span>
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
