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
  languages: {
    name: LocalizedString;
    proficiency: LocalizedString;
  }[];
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
          'Developed the Flutter mobile frontend for the LaundryFlow enterprise application, implementing dynamic customer order tracking, operational status monitoring, and customer workflows.',
          'Integrated mobile client views with an Odoo ERP backend via JSON-RPC, consuming custom module endpoints for real-time laundry order updates.',
          'Collaborated within an engineering team, adhering to decoupled architecture principles between mobile presentation layers and backend enterprise business logic.',
        ],
        id: [
          'Mengembangkan frontend mobile Flutter untuk aplikasi enterprise LaundryFlow, mengimplementasikan pelacakan status pesanan pelanggan dan alur operasional laundry.',
          'Mengintegrasikan antarmuka aplikasi mobile dengan backend Odoo ERP melalui JSON-RPC untuk pembaruan status pesanan secara real-time.',
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
      role: {
        en: 'Lead Full-Stack Architect & Product Designer',
        id: 'Lead Full-Stack Architect & Product Designer',
      },
      statusBadge: {
        en: 'Live: critiplay.my.id',
        id: 'Live: critiplay.my.id',
      },
      liveUrl: 'https://critiplay.my.id',
      githubUrl: 'https://github.com/SaktiArifDwiPutra/CritiPlay',
      summary: {
        en: [
          'Conceived and co-created a decoupled web platform for cataloging, reviewing, and community curation of indie video games.',
          'Architected and independently built the complete REST API backend in Laravel, managing relational schemas and cloud PostgreSQL deployment on Neon DB.',
          'Co-developed the React and TypeScript frontend, handling final implementation and post-deployment refinements; acknowledged collaborator contributions to frontend production.',
        ],
        id: [
          'Menginisiasi dan membangun platform web decoupled untuk kurasi, ulasan, dan diskusi komunitas game indie.',
          'Merancang dan membangun 100% backend REST API menggunakan Laravel secara mandiri, mengelola skema database relasional dan deployment PostgreSQL di Neon DB.',
          'Turut mengembangkan antarmuka frontend berbasis React dan TypeScript, menangani implementasi akhir serta penyempurnaan setelah rilis publik bersama kolaborator frontend.',
        ],
      },
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Laravel', 'PostgreSQL', 'Neon DB', 'Vercel'],
    },
    {
      id: 'laundryflow',
      title: 'LaundryFlow',
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
          'Engineered the cross-platform mobile frontend application using Flutter for laundry operational management and end-user order tracking.',
          'Integrated client interfaces with backend Odoo services through JSON-RPC to handle real-time status transitions from order intake to washing, drying, and delivery completion.',
          'Implemented structured state management and reusable modular UI components aligned with team design standards.',
        ],
        id: [
          'Mengembangkan aplikasi mobile lintas platform menggunakan Flutter untuk manajemen operasional dan pelacakan pesanan laundry pelanggan.',
          'Mengintegrasikan antarmuka mobile dengan layanan backend Odoo melalui protokol JSON-RPC untuk memantau siklus pesanan dari penerimaan hingga selesai.',
          'Menerapkan manajemen state terstruktur dan komponen antarmuka modular yang mudah dipelihara sesuai standar tim.',
        ],
      },
      technologies: ['Flutter', 'Dart', 'Odoo ERP', 'JSON-RPC', 'State Management'],
    },
    {
      id: 'daus-anak-soleh',
      title: 'Daus Anak Soleh',
      role: {
        en: 'Indie Game Developer & Systems Engineer',
        id: 'Pengembang Game Indie & Rekayasa Sistem',
      },
      statusBadge: {
        en: 'Playable: itch.io',
        id: 'Dapat Dimainkan: itch.io',
      },
      liveUrl: 'https://saktiarif.itch.io/daus-anak-soleh',
      summary: {
        en: [
          'Designed and built a retro-inspired educational 2D platformer running directly in modern web browsers via HTML5 Canvas.',
          'Implemented custom sprite animations, arcade collision physics, collectible item loops, and multi-state player controllers using Phaser.',
          'Published and maintained the public build on itch.io, optimizing asset loading and responsive touch and keyboard controls.',
        ],
        id: [
          'Merancang dan membangun game platformer 2D edukatif bertema retro yang berjalan langsung di browser melalui HTML5 Canvas.',
          'Mengimplementasikan animasi sprite, deteksi tabrakan (collision physics), mekanik pengumpulan item, dan state machine karakter menggunakan Phaser.',
          'Mempublikasikan game ke platform itch.io, mengoptimalkan pemuatan aset visual serta responsivitas input keyboard dan sentuhan.',
        ],
      },
      technologies: ['Phaser 3', 'HTML5 Canvas', 'JavaScript', 'Arcade Physics', 'Web Audio API'],
    },
    {
      id: 'website-pilketos',
      title: 'Website Pilketos',
      role: {
        en: 'Lead Web Engineer & Systems Architect',
        id: 'Pemimpin Rekayasa Web & Arsitek Sistem',
      },
      statusBadge: {
        en: 'School Deployment',
        id: 'Implementasi Sekolah',
      },
      summary: {
        en: [
          'Engineered an institutional e-voting web platform to facilitate student council elections with verifiable ballot integrity.',
          'Implemented single-use cryptographically generated token authentication to prevent duplicate voting and enforce strict ballot confidentiality.',
          'Built a real-time administrative tally dashboard with instantaneous results reporting and audit logging.',
        ],
        id: [
          'Membangun sistem web pemilihan ketua OSIS berbasis digital untuk memfasilitasi pemungutan suara sekolah dengan integritas terverifikasi.',
          'Menerapkan autentikasi berbasis token acak sekali pakai untuk mencegah pemilihan ganda dan menjaga kerahasiaan suara pemilih.',
          'Mengembangkan dashboard administratif dengan visualisasi hasil pemungutan suara secara real-time dan pencatatan log audit.',
        ],
      },
      technologies: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'Authentication'],
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
      skills: ['Phaser', 'HTML5 Canvas', 'Arcade Physics', 'Game Loop Architecture'],
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
      name: {
        en: 'Indonesian',
        id: 'Bahasa Indonesia',
      },
      proficiency: {
        en: 'Native',
        id: 'Penutur Asli',
      },
    },
    {
      name: {
        en: 'English',
        id: 'Bahasa Inggris',
      },
      proficiency: {
        en: 'Working Proficiency',
        id: 'Kemampuan Kerja',
      },
    },
  ],
};

