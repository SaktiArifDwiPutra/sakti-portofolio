import React from 'react';

interface LogoProps {
  className?: string;
}

export function ReactLogo({ className = 'h-6 w-6' }: LogoProps) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="none">
      <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
      <g stroke="#61dafb" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function NextjsLogo({ className = 'h-6 w-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 180 180" className={className} fill="none">
      <circle cx="90" cy="90" r="85" fill="#000" stroke="#fff" strokeWidth="6" />
      <path
        d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
        fill="url(#nextjs-grad)"
      />
      <rect x="115" y="54" width="12" height="72" fill="#fff" />
      <defs>
        <linearGradient id="nextjs-grad" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function TypeScriptLogo({ className = 'h-6 w-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <rect width="128" height="128" rx="16" fill="#3178c6" />
      <path
        d="M72.5 73.7c1.3 2.1 3 3.8 5.2 5.1 2.2 1.3 4.8 1.9 7.8 1.9 2.5 0 4.6-.4 6.3-1.3 1.7-.9 3-2.1 3.9-3.7.9-1.6 1.4-3.4 1.4-5.5 0-2.2-.5-4-1.5-5.5-1-1.5-2.5-2.8-4.4-3.8-1.9-1.1-4.3-2-7.2-2.9-3.9-1.2-7.3-2.6-10.1-4.2-2.8-1.6-4.9-3.6-6.4-6-1.5-2.4-2.2-5.4-2.2-8.9 0-3.9 1-7.3 3.1-10.1 2.1-2.8 5-5 8.7-6.5 3.7-1.5 8-2.3 13-2.3 5 0 9.4.9 13.1 2.8 3.7 1.9 6.6 4.6 8.7 8.2l-10.5 6.5c-1.3-2.1-3-3.7-5.1-4.8-2.1-1.1-4.5-1.7-7.2-1.7-2.4 0-4.4.4-6 1.3-1.6.8-2.8 2-3.6 3.5-.8 1.5-1.2 3.1-1.2 4.9 0 2 .5 3.6 1.4 5 1 1.4 2.3 2.5 4.1 3.4 1.8.9 4 1.8 6.7 2.6 4.3 1.3 8 2.8 11.1 4.5 3.1 1.7 5.5 3.9 7.2 6.5 1.7 2.6 2.5 5.8 2.5 9.7 0 4.3-1.1 8-3.3 11.1-2.2 3.1-5.3 5.5-9.3 7.1-4 1.6-8.7 2.4-14.1 2.4-6.3 0-11.8-1.3-16.3-3.8-4.5-2.5-7.9-6.2-10.2-11l11.6-6.5zm-57.5-35.3h38.2v11.8h-12.8v56.6h-12.6v-56.6h-12.8v-11.8z"
        fill="#ffffff"
      />
    </svg>
  );
}

export function JavaScriptLogo({ className = 'h-6 w-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <rect width="128" height="128" rx="16" fill="#f7df1e" />
      <path
        d="M72.2 103.5c3.2 5.5 7.6 9.4 14.7 9.4 6.2 0 10.2-3.1 10.2-7.4 0-5.1-4.1-6.9-11-9.9l-3.8-1.6c-10.9-4.7-18.1-10.5-18.1-23.2 0-11.5 8.9-20.2 22.8-20.2 9.9 0 17 4.2 21.6 12.3l-10.5 6.7c-2.3-4.1-5-5.9-10.8-5.9-4.8 0-8.1 3.1-8.1 6.8 0 4.2 3.3 6 9.8 8.7l3.8 1.6c12.7 5.4 19.6 11.1 19.6 24.3 0 13.9-11 21.5-25.7 21.5-14.7 0-23.8-7.1-28.5-16.2l14-8.7zm-47.5-1.2c2.4 4.2 4.5 7.7 9.6 7.7 5 0 8.1-2 8.1-9.9v-47.9h14.8v48.2c0 15.8-9.2 22.9-22.6 22.9-12.3 0-19.4-6.4-23.1-14.5l13.2-6.5z"
        fill="#000000"
      />
    </svg>
  );
}

export function HTML5Logo({ className = 'h-6 w-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path d="M19 116.8l-9.8-110h109.6l-9.8 110-45 12.5z" fill="#e44d26" />
      <path d="M64 117.8l37.2-10.3 8.3-93.5h-45.5z" fill="#f16529" />
      <path d="M64 53.6h19.8l-1.4 15.6h-18.4v14.4h17.1l-1.6 18.2-15.5 4.2v15l28.8-8 3.3-37h-33.7zm0-25.6h38l1.3-14.4h-39.3z" fill="#ffffff" />
      <path d="M64 53.6h-19.8l-1.3-14.4h40.9l1.3-14.4h-44.8l3.9 43.2h19.9zm0 43.8l-15.5-4.2-.9-11.2h-14.4l1.9 20.6 28.9 8z" fill="#ebebeb" />
    </svg>
  );
}

export function CSSLogo({ className = 'h-6 w-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path d="M19 116.8l-9.8-110h109.6l-9.8 110-45 12.5z" fill="#1572b6" />
      <path d="M64 117.8l37.2-10.3 8.3-93.5h-45.5z" fill="#33a9dc" />
      <path d="M64 53.6h19.8l-1.4 15.6h-18.4v14.4h17.1l-1.6 18.2-15.5 4.2v15l28.8-8 3.3-37.4 1.3-14h-34.9zm0-25.6h38l1.3-14.4h-39.3z" fill="#ffffff" />
      <path d="M64 53.6h-34.2l-1.3-14.4h35.5l1.3-14.4h-48.4l3.9 43.2h23.2zm0 43.8l-15.5-4.2-.9-11.2h-14.4l1.9 20.6 28.9 8z" fill="#ebebeb" />
    </svg>
  );
}

export function TailwindLogo({ className = 'h-6 w-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none">
      <path
        d="M32 16c-8.8 0-14.4 4.4-16.8 13.2 3.2-4 7.2-5.6 12-4.8 2.7.5 4.7 2.5 6.9 4.7C37.6 32.7 42.2 37.3 52 37.3c8.8 0 14.4-4.4 16.8-13.2-3.2 4-7.2 5.6-12 4.8-2.7-.5-4.7-2.5-6.9-4.7C46.4 20.6 41.8 16 32 16zM15.2 37.3c-8.8 0-14.4 4.4-16.8 13.2 3.2-4 7.2-5.6 12-4.8 2.7.5 4.7 2.5 6.9 4.7 3.5 3.6 8.1 8.2 17.9 8.2 8.8 0 14.4-4.4 16.8-13.2-3.2 4-7.2 5.6-12 4.8-2.7-.5-4.7-2.5-6.9-4.7C30.6 42 26 37.3 15.2 37.3z"
        fill="#38bdf8"
      />
    </svg>
  );
}

export function LaravelLogo({ className = 'h-6 w-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        d="M109.8 33.2L68.5 9.4c-2.8-1.6-6.2-1.6-9 0L18.2 33.2c-2.8 1.6-4.5 4.6-4.5 7.8v46c0 3.2 1.7 6.2 4.5 7.8l41.3 23.8c2.8 1.6 6.2 1.6 9 0l41.3-23.8c2.8-1.6 4.5-4.6 4.5-7.8V41c0-3.2-1.7-6.2-4.5-7.8z"
        fill="#ff2d20"
      />
      <path
        d="M64 36l26 15v30L64 96 38 81V51l26-15zm0 10.4L47 56.2v20.6L64 86.6l17-9.8V56.2L64 46.4z"
        fill="#ffffff"
      />
    </svg>
  );
}

export function PHPLogo({ className = 'h-6 w-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <ellipse cx="64" cy="64" rx="60" ry="36" fill="#777bb4" />
      <ellipse cx="64" cy="64" rx="55" ry="32" fill="#8892be" />
      <text
        x="64"
        y="75"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontWeight="900"
        fontSize="34"
        fill="#ffffff"
        fontStyle="italic"
      >
        php
      </text>
    </svg>
  );
}

export function NodejsLogo({ className = 'h-6 w-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        d="M64 8l48.5 28v56L64 120 15.5 92V36L64 8z"
        fill="#333333"
      />
      <path
        d="M64 16l41.6 24v48L64 112 22.4 88V40L64 16z"
        fill="#68a063"
      />
      <path
        d="M64 38c-14.4 0-26 11.6-26 26s11.6 26 26 26c9.6 0 18-5.2 22.5-13h-12c-3.1 3.7-7.8 6-13 6-9.4 0-17-7.6-17-17s7.6-17 17-17c6.1 0 11.5 3.2 14.5 8h10.9C78.4 43.8 71.7 38 64 38z"
        fill="#ffffff"
      />
    </svg>
  );
}

export function HonoLogo({ className = 'h-6 w-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <circle cx="64" cy="64" r="60" fill="#e36002" />
      {/* Flame Icon */}
      <path
        d="M64 20c0 24-20 34-20 54 0 18 12 32 30 32 18 0 30-14 30-32 0-26-24-34-24-54 0 0-4 12-16 12 0-8 0-12 0-12z"
        fill="#ffffff"
      />
      <path
        d="M64 56c0 14-10 20-10 30 0 9 6 16 16 16 9 0 16-7 16-16 0-14-14-18-14-30 0 0-2 6-8 6 0-4 0-6 0-6z"
        fill="#fcee0a"
      />
    </svg>
  );
}

export function FlutterLogo({ className = 'h-6 w-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path d="M78.6 14L22 70.6l17.7 17.7L96.3 31.7H78.6z" fill="#54c5f8" />
      <path d="M78.6 62.4L50.4 90.6l17.7 17.7 28.2-28.2H78.6z" fill="#29b6f6" />
      <path d="M68.1 108.3l17.7 17.7h17.7l-17.7-17.7H68.1z" fill="#01579b" />
      <path d="M96.3 31.7L68.1 59.9h17.7l17.7-17.7-7.2-10.5z" fill="#02569b" />
    </svg>
  );
}

export function DartLogo({ className = 'h-6 w-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path d="M22 22h44l40 40-40 40H22V22z" fill="#0175c2" />
      <path d="M44 22L84 62l-40 40H22V22h22z" fill="#54c5f8" />
      <path d="M64 42l20 20-40 40H22l42-60z" fill="#00b4ab" />
      <path d="M44 22l62 62-22 22L22 44V22h22z" fill="#02569b" opacity="0.4" />
    </svg>
  );
}

export function PhaserLogo({ className = 'h-6 w-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <circle cx="64" cy="64" r="60" fill="#222" stroke="#f39c12" strokeWidth="6" />
      <path
        d="M64 26l32 18v36L64 98 32 80V44L64 26z"
        fill="#f39c12"
      />
      <circle cx="64" cy="62" r="14" fill="#ffffff" />
      <circle cx="64" cy="62" r="8" fill="#e74c3c" />
    </svg>
  );
}

export function GodotLogo({ className = 'h-6 w-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <rect width="128" height="128" rx="28" fill="#478cbf" />
      {/* Robot Antennae */}
      <circle cx="64" cy="30" r="6" fill="#fff" />
      <rect x="61" y="34" width="6" height="12" fill="#fff" />
      <circle cx="38" cy="36" r="5" fill="#fff" />
      <rect x="36" y="40" width="5" height="10" transform="rotate(-20 38 45)" fill="#fff" />
      <circle cx="90" cy="36" r="5" fill="#fff" />
      <rect x="87" y="40" width="5" height="10" transform="rotate(20 90 45)" fill="#fff" />
      {/* Head */}
      <path
        d="M32 50h64c8 0 14 6 14 14v24c0 14-11 26-25 26h-4l-3-6-4 6H54l-4-6-3 6h-4C29 114 18 102 18 88V64c0-8 6-14 14-14z"
        fill="#ffffff"
      />
      {/* Eyes */}
      <circle cx="45" cy="74" r="9" fill="#478cbf" />
      <circle cx="45" cy="74" r="5" fill="#222" />
      <circle cx="83" cy="74" r="9" fill="#478cbf" />
      <circle cx="83" cy="74" r="5" fill="#222" />
      {/* Mouth */}
      <rect x="42" y="94" width="44" height="6" rx="3" fill="#478cbf" />
    </svg>
  );
}

export function GDScriptLogo({ className = 'h-6 w-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <rect width="128" height="128" rx="24" fill="#659ad2" />
      <text
        x="64"
        y="78"
        textAnchor="middle"
        fontFamily="monospace"
        fontWeight="900"
        fontSize="34"
        fill="#ffffff"
      >
        GD
      </text>
      <circle cx="98" cy="30" r="10" fill="#fcee0a" />
    </svg>
  );
}

export function MySQLLogo({ className = 'h-6 w-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <rect width="128" height="128" rx="20" fill="#00758f" />
      {/* Dolphin Shape */}
      <path
        d="M92 42c-8-12-22-18-36-16-16 2-26 14-30 28-3 10-1 22 6 30 4 5 10 9 16 10-2-6-1-14 2-20 4-8 12-14 20-16 8-2 16-1 22 4z"
        fill="#f29111"
      />
      <circle cx="70" cy="48" r="3" fill="#000" />
      <text
        x="64"
        y="112"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontWeight="800"
        fontSize="22"
        fill="#ffffff"
      >
        MySQL
      </text>
    </svg>
  );
}

export function PostgreSQLLogo({ className = 'h-6 w-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <rect width="128" height="128" rx="20" fill="#336791" />
      {/* Elephant Slonik Silhouette */}
      <path
        d="M64 26c-18 0-30 12-32 28-1 9 1 18 6 25 3 4 5 10 3 17l10-4c2-4 3-9 3-14 0-2 0-4-1-6 8 4 18 5 27 2 6-2 12-7 15-13 4-8 5-18 2-26-5-6-14-9-23-9z"
        fill="#ffffff"
      />
      <circle cx="56" cy="44" r="3" fill="#336791" />
      <text
        x="64"
        y="114"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontWeight="800"
        fontSize="18"
        fill="#ffffff"
      >
        Postgres
      </text>
    </svg>
  );
}

export function SQLiteLogo({ className = 'h-6 w-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <rect width="128" height="128" rx="20" fill="#003b57" />
      <path
        d="M32 40c0-10 14-18 32-18s32 8 32 18-14 18-32 18-32-8-32-18z"
        fill="#005b87"
      />
      <path
        d="M32 40v24c0 10 14 18 32 18s32-8 32-18V40"
        stroke="#38bdf8"
        strokeWidth="6"
        fill="none"
      />
      <path
        d="M32 64v24c0 10 14 18 32 18s32-8 32-18V64"
        stroke="#38bdf8"
        strokeWidth="6"
        fill="none"
      />
      <text
        x="64"
        y="114"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontWeight="800"
        fontSize="18"
        fill="#ffffff"
      >
        SQLite
      </text>
    </svg>
  );
}

export function SupabaseLogo({ className = 'h-6 w-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <rect width="128" height="128" rx="20" fill="#1c1c1c" />
      <path
        d="M74.3 18.2L29.5 73.1c-1.8 2.2-.2 5.5 2.6 5.5H62v31.2c0 2.2 2.6 3.4 4.2 1.9l44.8-54.9c1.8-2.2.2-5.5-2.6-5.5H80V20.1c0-2.2-2.6-3.4-4.2-1.9z"
        fill="#3ecf8e"
      />
    </svg>
  );
}

export function DockerLogo({ className = 'h-6 w-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <rect width="128" height="128" rx="20" fill="#2496ed" />
      {/* Containers */}
      <rect x="28" y="52" width="12" height="10" rx="1.5" fill="#ffffff" />
      <rect x="44" y="52" width="12" height="10" rx="1.5" fill="#ffffff" />
      <rect x="60" y="52" width="12" height="10" rx="1.5" fill="#ffffff" />
      <rect x="44" y="40" width="12" height="10" rx="1.5" fill="#ffffff" />
      <rect x="60" y="40" width="12" height="10" rx="1.5" fill="#ffffff" />
      <rect x="60" y="28" width="12" height="10" rx="1.5" fill="#ffffff" />
      {/* Whale Body */}
      <path
        d="M106 60c-2.4 0-5.8 1.4-8 4-4.5-2.6-11-3-17-1.5-3.5.9-6.7 2.7-9.5 5.2H20c-1.5 5.5.2 14.5 4.5 19 8.2 8.5 22.5 10.3 35.5 10.3 22 0 41-7.8 48-24.5 5-.5 10.5-4 10.5-8.5-4.5-.5-9.5 0-12.5-4z"
        fill="#ffffff"
      />
      <circle cx="36" cy="74" r="2.5" fill="#2496ed" />
    </svg>
  );
}

export function PythonLogo({ className = 'h-6 w-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        d="M63.5 12C41.3 12 42.7 21.6 42.7 21.6l.1 10h21.4v3H33.8S20 33 20 55.4s12.1 22 12.1 22h7.2v-10.2s-.4-12.2 12-12.2h20.7s11.5-.2 11.5-11.3V23.3S85.7 12 63.5 12zm-11.8 6.7a3.4 3.4 0 1 1 0 6.7 3.4 3.4 0 0 1 0-6.7z"
        fill="#3776ab"
      />
      <path
        d="M64.5 116c22.2 0 20.8-9.6 20.8-9.6l-.1-10H63.8v-3h30.4s13.8 1.6 13.8-20.8-12.1-22-12.1-22h-7.2v10.2s.4 12.2-12 12.2H46s-11.5.2-11.5 11.3v20.4s-2.2 11.3 20 11.3zm11.8-6.7a3.4 3.4 0 1 1 0-6.7 3.4 3.4 0 0 1 0 6.7z"
        fill="#ffd343"
      />
    </svg>
  );
}

export function OdooLogo({ className = 'h-6 w-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <rect width="128" height="128" rx="20" fill="#714b67" />
      <circle cx="36" cy="64" r="16" fill="#a24689" />
      <circle cx="64" cy="64" r="16" fill="#ffffff" />
      <circle cx="92" cy="64" r="16" fill="#e86382" />
    </svg>
  );
}

export function getTechLogo(id: string, className = 'h-6 w-6'): React.ReactNode {
  switch (id) {
    case 'react':
      return <ReactLogo className={className} />;
    case 'nextjs':
      return <NextjsLogo className={className} />;
    case 'typescript':
      return <TypeScriptLogo className={className} />;
    case 'javascript':
      return <JavaScriptLogo className={className} />;
    case 'html5':
      return <HTML5Logo className={className} />;
    case 'css':
      return <CSSLogo className={className} />;
    case 'tailwind':
      return <TailwindLogo className={className} />;
    case 'laravel':
      return <LaravelLogo className={className} />;
    case 'php':
      return <PHPLogo className={className} />;
    case 'nodejs':
      return <NodejsLogo className={className} />;
    case 'hono':
      return <HonoLogo className={className} />;
    case 'flutter':
      return <FlutterLogo className={className} />;
    case 'dart':
      return <DartLogo className={className} />;
    case 'phaser':
      return <PhaserLogo className={className} />;
    case 'godot':
      return <GodotLogo className={className} />;
    case 'gdscript':
      return <GDScriptLogo className={className} />;
    case 'mysql':
      return <MySQLLogo className={className} />;
    case 'postgresql':
      return <PostgreSQLLogo className={className} />;
    case 'sqlite':
      return <SQLiteLogo className={className} />;
    case 'supabase':
      return <SupabaseLogo className={className} />;
    case 'docker':
      return <DockerLogo className={className} />;
    case 'python':
      return <PythonLogo className={className} />;
    case 'odoo':
      return <OdooLogo className={className} />;
    default:
      return null;
  }
}
