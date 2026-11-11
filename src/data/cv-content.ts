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
    en: 'Full-Stack Developer | Game Developer',
    id: 'Full-Stack Developer | Game Developer',
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
    en: 'Full-Stack Developer and Game Developer specializing in scalable web architectures, Flutter mobile applications, and 2D game systems. Experienced in developing full-stack platforms with Laravel and React, integrating enterprise mobile frontends with Odoo ERP, and building interactive game loops in Phaser and Godot. Focused on software craftsmanship, clean decoupled system design, and responsive user experiences.',
    id: 'Full-Stack Developer dan Game Developer dengan fokus pada arsitektur web terukur, aplikasi mobile Flutter, dan sistem game 2D. Berpengalaman mengembangkan platform full-stack menggunakan Laravel dan React, mengintegrasikan frontend mobile dengan backend Odoo ERP, serta membangun sistem gameplay interaktif di Phaser dan Godot. Berorientasi pada rekayasa perangkat lunak yang bersih, arsitektur terpisah (decoupled), dan kenyamanan interaksi pengguna.',
  },
  experience: [
    {
      id: 'infinisy-internship',
      role: {
        en: 'Software Developer Intern',
        id: 'Magang Pengembang Perangkat Lunak',
      },
      organization: 'PT Infinisy Indonesia',
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
        en: 'Professional Internship',
        id: 'Magang Industri',
      },
      highlights: {
        en: [
          'Developed the Flutter mobile frontend for the LaundryFlow enterprise application, implementing customer order tracking, operational status monitoring, and customer workflows.',
          'Integrated mobile client views with an Odoo ERP backend via JSON-RPC for laundry order status tracking.',
          'Collaborated within an engineering team, adhering to decoupled architecture principles between mobile presentation layers and backend enterprise business logic.',
        ],
        id: [
          'Mengembangkan frontend mobile Flutter untuk aplikasi enterprise LaundryFlow, mengimplementasikan pelacakan status pesanan pelanggan dan alur operasional laundry.',
          'Mengintegrasikan antarmuka aplikasi mobile dengan backend Odoo ERP melalui JSON-RPC untuk pelacakan status pesanan laundry.',
          'Berkolaborasi dalam tim pengembang perangkat lunak, menerapkan pemisahan arsitektur antara modul frontend mobile dan logika bisnis backend ERP.',
        ],
      },
      technologies: ['Flutter', 'Dart', 'Odoo ERP', 'JSON-RPC', 'Git', 'Agile / Scrum'],
    },
  ],
  projects: [
    {
      id: 'critiplay',
      title: 'CritiPlay',
      tier: 1,
      role: {
        en: 'Lead Full-Stack Architect & Product Designer',
        id: 'Lead Full-Stack Architect & Product Designer',
      },
      statusBadge: {
        en: 'Decoupled Web Platform',
        id: 'Platform Web Decoupled',
      },
      githubUrl: 'https://github.com/SaktiArifDwiPutra/CritiPlay',
      summary: {
        en: [
          'Conceived and co-created a decoupled web platform for cataloging, reviewing, and community curation of indie video games.',
          'Independently architected and developed the Laravel REST API backend, managing database architecture and PostgreSQL deployment on Neon DB.',
          'Co-developed the React and TypeScript frontend, handling final implementation and post-deployment refinements; acknowledged collaborator contributions to frontend production.',
        ],
        id: [
          'Menginisiasi dan membangun platform web decoupled untuk kurasi, ulasan, dan diskusi komunitas game indie.',
          'Merancang dan mengembangkan backend REST API Laravel secara mandiri, mengelola arsitektur basis data dan deployment PostgreSQL di Neon DB.',
          'Turut mengembangkan antarmuka frontend berbasis React dan TypeScript, menangani implementasi akhir serta penyempurnaan setelah rilis publik bersama kolaborator frontend.',
        ],
      },
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Laravel', 'PostgreSQL', 'Neon DB'],
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
        en: 'Team Internship Project',
        id: 'Proyek Magang Tim',
      },
      summary: {
        en: [
          'Engineered the cross-platform mobile frontend application using Flutter for laundry operational management and order status tracking through Odoo JSON-RPC.',
          'Integrated client interfaces with backend Odoo services through JSON-RPC to handle status transitions from order intake to washing, drying, and delivery completion.',
          'Implemented structured state management and reusable modular UI components aligned with team design standards.',
        ],
        id: [
          'Mengembangkan aplikasi mobile lintas platform menggunakan Flutter untuk manajemen operasional dan pelacakan status pesanan melalui Odoo JSON-RPC.',
          'Mengintegrasikan antarmuka mobile dengan layanan backend Odoo melalui protokol JSON-RPC untuk memantau status pesanan dari penerimaan hingga selesai.',
          'Menerapkan manajemen state terstruktur dan komponen antarmuka modular yang mudah dipelihara sesuai standar tim.',
        ],
      },
      technologies: ['Flutter', 'Dart', 'Odoo ERP', 'JSON-RPC', 'State Management'],
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
        en: 'Playable: itch.io',
        id: 'Dapat Dimainkan: itch.io',
      },
      liveUrl: 'https://archdragonstudio.itch.io/daus-anak-soleh',
      summary: {
        en: [
          '2D educational puzzle game built with Phaser 3 and HTML5 Canvas, featuring interactive image-based puzzles and responsive controls for mobile and desktop.',
          'Published and maintained the playable build on itch.io with optimized asset loading.',
        ],
        id: [
          'Game puzzle edukasi 2D yang dibangun menggunakan Phaser 3 dan HTML5 Canvas, dengan mekanik puzzle interaktif berbasis gambar serta kontrol responsif untuk perangkat mobile dan desktop.',
          'Mempublikasikan game ke platform itch.io dengan pemuatan aset yang teroptimasi.',
        ],
      },
      technologies: ['Phaser 3', 'HTML5 Canvas', 'JavaScript', 'Responsive Controls'],
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
        en: 'School Deployment',
        id: 'Implementasi Sekolah',
      },
      summary: {
        en: [
          'Student council election voting website built with Laravel, PHP, and MySQL.',
          'Developed voting interfaces and administrative result dashboards for school elections.',
        ],
        id: [
          'Website pemilihan ketua OSIS yang dibangun menggunakan Laravel, PHP, dan MySQL.',
          'Mengembangkan antarmuka pemungutan suara dan dashboard hasil pemilihan untuk kebutuhan sekolah.',
        ],
      },
      technologies: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS'],
    },
  ],
  skills: [
    {
      key: 'frontend',
      label: {
        en: 'Frontend',
        id: 'Frontend',
      },
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5 Canvas'],
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
      skills: ['Laravel (PHP)', 'REST APIs', 'Odoo Integration (RPC)'],
    },
    {
      key: 'databases',
      label: {
        en: 'Databases & Persistence',
        id: 'Database & Persistensi',
      },
      skills: ['MySQL', 'PostgreSQL', 'Neon DB'],
    },
    {
      key: 'gamedev',
      label: {
        en: 'Game Development',
        id: 'Pengembangan Game',
      },
      skills: ['Phaser', 'HTML5 Canvas', 'Game Loop Architecture'],
    },
    {
      key: 'tools',
      label: {
        en: 'Tools & Workflows',
        id: 'Alat & Alur Kerja',
      },
      skills: ['Git', 'GitHub', 'Postman', 'Vercel', 'VS Code'],
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
        en: 'In Progress (Expected 2027)',
        id: 'Sedang Menempuh Pendidikan (Target 2027)',
      },
      focusAreas: {
        en: 'Core coursework: Object-Oriented Programming (PBO), Relational Databases (MySQL), Web Fundamentals.',
        id: 'Fokus keilmuan: Pemrograman Berorientasi Objek (PBO), Database Relasional (MySQL), Fondasi Web.',
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
        en: 'Managed formal correspondence, meeting minutes, and inter-organizational coordination across student representatives.',
        id: 'Mengelola persuratan formal, risalah rapat, dan koordinasi antarperwakilan kelas dalam struktur perwakilan siswa.',
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
