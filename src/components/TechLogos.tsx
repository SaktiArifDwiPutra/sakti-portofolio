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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className={className}>
      <path fill="#E44D26" d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z" />
      <path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z" />
      <path fill="#EBEBEB" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z" />
      <path fill="#fff" d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z" />
    </svg>
  );
}

export function CSSLogo({ className = 'h-6 w-6' }: LogoProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className={className}>
      <path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z" />
      <path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354h-45.16v106.49z" />
      <path fill="#fff" d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95V51.429z" />
      <path fill="#EBEBEB" d="M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018v-14.39z" />
      <path fill="#fff" d="M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881H81.127z" />
      <path fill="#EBEBEB" d="M64.048 23.435v13.831H30.64l-.277-3.108-.63-7.012-.331-3.711h34.646zm-.047 27.996v13.831H48.792l-.277-3.108-.631-7.012-.33-3.711h16.447z" />
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
    <svg viewBox="0 0 24 24" className={className} fill="#FF2D20">
      <path d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.027c-.008.002-.016.008-.024.01a.348.348 0 01-.192 0c-.011-.002-.02-.008-.03-.012-.02-.008-.042-.014-.062-.025L.533 18.755a.376.376 0 01-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 01.023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.037-.027.014-.012.027-.024.041-.034H.53L5.043.05a.375.375 0 01.375 0L9.93 2.647h.002c.015.01.027.021.04.033l.038.027c.013.014.02.03.033.045.008.011.02.021.025.033.01.02.017.038.024.058.003.011.01.021.013.032.01.031.014.064.014.098v9.652l3.76-2.164V5.527c0-.033.004-.066.013-.098.003-.01.01-.02.013-.032a.487.487 0 01.024-.059c.007-.012.018-.02.025-.033.012-.015.021-.03.033-.043.012-.012.025-.02.037-.028.014-.01.026-.023.041-.032h.001l4.513-2.598a.375.375 0 01.375 0l4.513 2.598c.016.01.027.021.042.031.012.01.025.018.036.028.013.014.022.03.034.044.008.012.019.021.024.033.011.02.018.04.024.06.006.01.012.021.015.032zm-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283zm-4.51 7.75v-4.287l-2.147 1.225-6.126 3.498v4.325zM1.093 3.624v14.588l8.273 4.761v-4.325l-4.322-2.445-.002-.003H5.04c-.014-.01-.025-.021-.04-.031-.011-.01-.024-.018-.035-.027l-.001-.002c-.013-.012-.021-.025-.031-.04-.01-.011-.021-.022-.028-.036h-.002c-.008-.014-.013-.031-.02-.047-.006-.016-.014-.027-.018-.043a.49.49 0 01-.008-.057c-.002-.014-.006-.027-.006-.041V5.789l-2.18-1.257zM5.23.81L1.47 2.974l3.76 2.164 3.758-2.164zm1.956 13.505l2.182-1.256V3.624l-1.58.91-2.182 1.255v9.435zm11.581-10.95l-3.76 2.163 3.76 2.163 3.759-2.164zm-.376 4.978L16.21 7.087 14.63 6.18v4.283l2.182 1.256 1.58.908zm-8.65 9.654l5.514-3.148 2.756-1.572-3.757-2.163-4.323 2.489-3.941 2.27z" />
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
    <svg viewBox="0 0 24 24" className={className} fill="#5FA04E">
      <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339c.082.045.197.045.272 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.053-.192-.137-.242l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.085.049-.139.145-.139.241v10.15c0 .097.054.189.139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675c-.57-.329-.922-.945-.922-1.604V6.921c0-.659.353-1.275.922-1.603l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.329.924.944.924 1.603v10.15c0 .659-.354 1.273-.924 1.604l-8.794 5.078c-.328.188-.647.272-.973.272zM19.099 13.993c0-1.9-1.284-2.406-3.987-2.763-2.731-.361-3.009-.548-3.009-1.187 0-.528.235-1.233 2.258-1.233 1.807 0 2.473.389 2.747 1.607.024.115.129.199.247.199h1.141c.071 0 .138-.031.186-.081.048-.054.074-.123.067-.196-.177-2.098-1.571-3.076-4.388-3.076-2.508 0-4.004 1.058-4.004 2.833 0 1.925 1.488 2.457 3.895 2.695 2.88.282 3.103.703 3.103 1.269 0 .983-.789 1.402-2.642 1.402-2.327 0-2.839-.584-3.011-1.742-.02-.124-.126-.215-.253-.215h-1.137c-.141 0-.254.112-.254.253 0 1.482.806 3.248 4.655 3.248 3.012 0 4.61-1.097 4.61-3.014z" />
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
    <img
      src="/images/tech/phaser.svg"
      alt="Phaser"
      className={`${className} object-contain`}
    />
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
