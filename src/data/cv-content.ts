export interface LocalizedString {
  en: string;
  id: string;
}

export interface LocalizedList {
  en: string[];
  id: string[];
}

export interface CvContactInfo {
  email: string;
  github: {
    url: string;
    label: string;
  };
  linkedin: {
    url: string;
    label: string;
  };
  portfolio: {
    url: string;
    label: string;
  };
  cvDomain: {
    url: string;
    label: string;
  };
  location: LocalizedString;
}

export interface CvExperienceItem {
  id: string;
  role: LocalizedString;
  organization: string;
  period: LocalizedString;
  status: LocalizedString;
  isOngoing: boolean;
  type: LocalizedString;
  highlights: LocalizedList;
  technologies: string[];
}

export interface CvProjectItem {
  id: string;
  title: string;
  tier: 1 | 2;
  role: LocalizedString;
  statusBadge: LocalizedString;
  liveUrl?: string;
  githubUrl?: string;
  summary: LocalizedList;
  technologies: string[];
}

export interface CvSkillCategory {
  key: string;
  label: LocalizedString;
  skills: string[];
}

export interface CvEducationItem {
  id: string;
  institution: string;
  program: LocalizedString;
  period: string;
  status: LocalizedString;
  focusAreas: LocalizedString;
}

export interface CvOrganizationItem {
  id: string;
  role: LocalizedString;
  organization: string;
  period: string;
  status: LocalizedString;
  description: LocalizedString;
}

export interface CvCertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: LocalizedString;
  credentialId?: string;
  credentialUrl?: string;
  type: 'certification' | 'conference';
}

export interface CvData {
  name: string;
  title: LocalizedString;
  photoUrl: string;
  contact: CvContactInfo;
  summary: LocalizedString;
  experience: CvExperienceItem[];
  projects: CvProjectItem[];
  skills: CvSkillCategory[];
  education: CvEducationItem[];
  organization: CvOrganizationItem[];
  certifications: CvCertificationItem[];
  languages: LocalizedString[];
}

export const CV_DATA: CvData = {
  name: 'Sakti Arif',
  title: {
    en: 'Junior Web & Mobile Developer | Software Engineering Student',
    id: 'Junior Web & Mobile Developer | Siswa Rekayasa Perangkat Lunak',
  },
  photoUrl: '/images/profile/sakti-pilot.png',
  contact: {
    email: 'saktiarif830@gmail.com',
    github: {
      url: 'https://github.com/SaktiArifDwiPutra',
      label: 'github.com/SaktiArifDwiPutra',
    },
    linkedin: {
      url: 'https://www.linkedin.com/in/sakti-arif',
      label: 'linkedin.com/in/sakti-arif',
    },
    portfolio: {
      url: 'https://saktiarif.my.id',
      label: 'saktiarif.my.id',
    },
    cvDomain: {
      url: 'https://cv.saktiarif.my.id',
      label: 'cv.saktiarif.my.id',
    },
    location: {
      en: 'West Bandung, West Java, Indonesia',
      id: 'Bandung Barat, Jawa Barat, Indonesia',
    },
  },
  summary: {
    en: 'Software Engineering student at SMKN 4 Padalarang (class of 2027) building web, mobile, and 2D game projects. Currently interning as a Flutter Developer at PT Infinisy System Indonesia, connecting a cross-platform mobile client to an Odoo ERP backend via JSON-RPC. Seeking an internship or junior role in web or mobile development.',
    id: 'Siswa Rekayasa Perangkat Lunak di SMKN 4 Padalarang (angkatan 2027) yang aktif membangun proyek web, mobile, dan game 2D. Saat ini magang sebagai Flutter Developer di PT Infinisy System Indonesia, menghubungkan aplikasi mobile ke backend Odoo ERP melalui JSON-RPC. Terbuka untuk kesempatan magang atau posisi junior web/mobile developer.',
  },
  experience: [
    {
      id: 'infinisy-internship',
      role: {
        en: 'Flutter Developer Intern',
        id: 'Magang Flutter Developer',
      },
      organization: 'PT Infinisy System Indonesia',
      period: {
        en: 'October 2026 - Present',
        id: 'Oktober 2026 - Sekarang',
      },
      status: {
        en: 'Ongoing',
        id: 'Sedang Berjalan',
      },
      isOngoing: true,
      type: {
        en: 'Industrial Internship',
        id: 'Magang Industri',
      },
      highlights: {
        en: [
          'Building the Flutter mobile client for LaundryFlow in a two-developer team, covering order tracking and status screens from intake to delivery.',
          'Integrating the mobile client with an Odoo ERP backend via JSON-RPC, handling client state management and reusable UI components.',
        ],
        id: [
          'Mengembangkan klien mobile Flutter untuk LaundryFlow dalam tim dua developer, mencakup alur pelacakan pesanan dari penerimaan hingga pengantaran.',
          'Mengintegrasikan aplikasi mobile dengan backend Odoo ERP melalui JSON-RPC, mengelola state aplikasi dan komponen UI modular.',
        ],
      },
      technologies: ['Flutter', 'Dart', 'Odoo ERP', 'JSON-RPC', 'Git'],
    },
  ],
  projects: [
    {
      id: 'critiplay',
      title: 'CritiPlay',
      tier: 1,
      role: {
        en: 'Backend Developer & Co-Creator',
        id: 'Backend Developer & Co-Creator',
      },
      statusBadge: {
        en: 'Full-Stack Web App',
        id: 'Aplikasi Web Full-Stack',
      },
      githubUrl: 'https://github.com/SaktiArifDwiPutra/CritiPlay',
      summary: {
        en: [
          'Built the Laravel REST API backend (15+ endpoints) and designed the relational PostgreSQL schema deployed on Neon.',
          'Implemented JWT authentication, game catalog management, and community review submission workflows.',
          'Co-built the React and TypeScript frontend with Khairul Kholqi, handling API integration and state management.',
        ],
        id: [
          'Membangun backend REST API Laravel (15+ endpoint) dan merancang skema relasional PostgreSQL yang di-deploy di Neon.',
          'Mengimplementasikan autentikasi JWT, manajemen katalog game, dan alur pengiriman ulasan komunitas.',
          'Mengembangkan frontend React dan TypeScript bersama Khairul Kholqi, menangani integrasi API dan manajemen state.',
        ],
      },
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Laravel', 'PostgreSQL (Neon)'],
    },
    {
      id: 'laundryflow',
      title: 'LaundryFlow',
      tier: 1,
      role: {
        en: 'Mobile Frontend Developer',
        id: 'Pengembang Frontend Mobile',
      },
      statusBadge: {
        en: 'Internship Team Project',
        id: 'Proyek Magang Tim',
      },
      summary: {
        en: [
          'Cross-platform mobile application developed with Flutter for laundry operational workflows and multi-stage order tracking.',
          'Implemented order status workflows (washing, drying, packing, delivery) with responsive state updates and local caching.',
        ],
        id: [
          'Aplikasi mobile lintas platform berbasis Flutter untuk alur operasional laundry dan pelacakan pesanan bertahap.',
          'Mengimplementasikan alur status pesanan (cuci, kering, kemas, antar) dengan pembaruan state responsif dan penyimpanan lokal.',
        ],
      },
      technologies: ['Flutter', 'Dart', 'Odoo ERP', 'State Management'],
    },
    {
      id: 'website-pilketos',
      title: 'Website Pilketos',
      tier: 2,
      role: {
        en: 'Web Developer',
        id: 'Pengembang Web',
      },
      statusBadge: {
        en: 'School Election System',
        id: 'Sistem Pemilihan Sekolah',
      },
      summary: {
        en: [
          'Student council election voting website for SMKN 4 Padalarang built with Laravel, PHP, and MySQL.',
          'Handled authenticated voting workflows for students and teachers with real-time result tabulation.',
        ],
        id: [
          'Website pemilihan ketua OSIS SMKN 4 Padalarang yang dibangun menggunakan Laravel, PHP, dan MySQL.',
          'Menangani alur pemungutan suara terautentikasi untuk siswa dan guru dengan rekapitulasi suara real-time.',
        ],
      },
      technologies: ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
    },
    {
      id: 'daus-anak-soleh',
      title: 'Daus Anak Soleh',
      tier: 2,
      role: {
        en: 'Indie Game Developer',
        id: 'Pengembang Game Indie',
      },
      statusBadge: {
        en: 'Playable on itch.io',
        id: 'Dapat Dimainkan di itch.io',
      },
      liveUrl: 'https://archdragonstudio.itch.io/daus-anak-soleh',
      summary: {
        en: [
          '2D educational puzzle game built with Phaser 3 and HTML5 Canvas, featuring interactive image-based puzzles and responsive touch/desktop controls.',
          'Published and maintained the playable in-browser release on itch.io with optimized asset loading.',
        ],
        id: [
          'Game puzzle edukasi 2D yang dibangun menggunakan Phaser 3 dan HTML5 Canvas, dengan mekanik puzzle interaktif berbasis gambar serta kontrol responsif touch dan desktop.',
          'Mempublikasikan game ke platform itch.io dengan pemuatan aset yang teroptimasi.',
        ],
      },
      technologies: ['Phaser 3', 'HTML5 Canvas', 'JavaScript'],
    },
  ],
  skills: [
    {
      key: 'frontend',
      label: {
        en: 'Frontend',
        id: 'Frontend',
      },
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    },
    {
      key: 'mobile',
      label: {
        en: 'Mobile',
        id: 'Mobile',
      },
      skills: ['Flutter', 'Dart'],
    },
    {
      key: 'backend',
      label: {
        en: 'Backend & APIs',
        id: 'Backend & APIs',
      },
      skills: ['Laravel (PHP)', 'REST APIs', 'Odoo ERP (JSON-RPC)'],
    },
    {
      key: 'databases',
      label: {
        en: 'Databases & Cloud',
        id: 'Database & Cloud',
      },
      skills: ['PostgreSQL (Neon)', 'MySQL', 'Vercel'],
    },
    {
      key: 'gamedev',
      label: {
        en: 'Game Development',
        id: 'Pengembangan Game',
      },
      skills: ['Phaser 3', 'HTML5 Canvas'],
    },
    {
      key: 'tools',
      label: {
        en: 'Tools & Workflows',
        id: 'Alat & Alur Kerja',
      },
      skills: ['Git', 'GitHub', 'Postman'],
    },
  ],
  education: [
    {
      id: 'smkn4-padalarang',
      institution: 'SMKN 4 Padalarang',
      program: {
        en: 'Software Engineering (Rekayasa Perangkat Lunak)',
        id: 'Rekayasa Perangkat Lunak (RPL)',
      },
      period: '2024 - 2027',
      status: {
        en: 'In Progress (Class of 2027)',
        id: 'Sedang Menempuh Pendidikan (Angkatan 2027)',
      },
      focusAreas: {
        en: 'Active in Software Engineering practical coursework; built election web systems (Pilketos) and indie game prototypes.',
        id: 'Aktif dalam praktik kejuruan RPL; membangun sistem web pemilihan (Pilketos) dan prototipe game indie.',
      },
    },
  ],
  organization: [
    {
      id: 'mpk-padalarang',
      role: {
        en: 'General Secretary - Commission 3 (Formalistik)',
        id: 'Sekretaris Umum - Komisi 3 (Formalistik)',
      },
      organization: 'Majelis Perwakilan Kelas (MPK), SMKN 4 Padalarang',
      period: '2025/2026',
      status: {
        en: 'Term Completed',
        id: 'Masa Jabatan Selesai',
      },
      description: {
        en: 'Managed formal correspondence, meeting minutes, and inter-organizational coordination.',
        id: 'Mengelola persuratan resmi, notula rapat, dan koordinasi antarorganisasi perwakilan siswa.',
      },
    },
  ],
  certifications: [
    {
      id: 'dicoding-ai',
      name: 'Belajar Dasar AI',
      issuer: 'Dicoding Indonesia / Google Cloud',
      issueDate: {
        en: 'September 2024',
        id: 'September 2024',
      },
      credentialId: 'KEXL21330ZG2',
      credentialUrl: 'https://www.dicoding.com/certificates/KEXL21330ZG2',
      type: 'certification',
    },
    {
      id: 'ddc-2026',
      name: 'Dicoding Developer Conference 2026',
      issuer: 'Dicoding Indonesia',
      issueDate: {
        en: '2026',
        id: '2026',
      },
      type: 'conference',
    },
  ],
  languages: [
    {
      en: 'Indonesian',
      id: 'Bahasa Indonesia',
    },
    {
      en: 'English',
      id: 'Bahasa Inggris',
    },
  ],
};
