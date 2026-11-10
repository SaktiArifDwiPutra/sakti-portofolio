import type { Locale } from '@/i18n/routing';

export type LocalizedText = {
  en: string;
  id: string;
};

export type DisciplineGroup = 'fullstack' | 'gamedev';

export interface ProjectFeature {
  code: string;
  title: LocalizedText;
  description: LocalizedText;
}

export interface ProjectChallenge {
  title: LocalizedText;
  problem: LocalizedText;
  solution: LocalizedText;
}

export interface ProjectGalleryPlate {
  id: string;
  plateNumber: string;
  title: LocalizedText;
  caption: LocalizedText;
  aspectRatio: '16/9' | '4/3' | '21/9';
  imageSrc: string;
  diagramType: 'architecture' | 'interface' | 'dataflow';
}

export interface ProjectAnatomyLayer {
  id: string;
  code: string;
  layerName: LocalizedText;
  tech: string;
  summary: LocalizedText;
  specs: {
    en: string[];
    id: string[];
  };
}

export interface ProjectEntry {
  slug: string;
  index: string;
  name: string;
  disciplineGroup: DisciplineGroup;
  category: LocalizedText;
  tagline: LocalizedText;
  description: LocalizedText;
  editorialOverview: {
    en: string[];
    id: string[];
  };
  coverImage: string;
  techStack: string[];
  role: LocalizedText;
  status: LocalizedText;
  features: ProjectFeature[];
  challenges: ProjectChallenge[];
  anatomyLayers: ProjectAnatomyLayer[];
  gallery: ProjectGalleryPlate[];
  links: {
    repository?: string;
    repositories?: { name: string; url: string }[];
    demo?: string;
    collaborator?: {
      name: string;
      url: string;
    };
    note?: LocalizedText;
  };
}

export interface TechStackCategory {
  id: string;
  code: string;
  title: LocalizedText;
  description: LocalizedText;
  items: {
    name: string;
    role: LocalizedText;
    context: string;
  }[];
}

export interface ExperienceEntry {
  id: string;
  index: string;
  isPlaceholder: boolean;
  period: LocalizedText;
  role: LocalizedText;
  organization: LocalizedText;
  domain: LocalizedText;
  summary: LocalizedText;
  deliverables: {
    en: string[];
    id: string[];
  };
  technologies: string[];
}

export interface CertificateEntry {
  id: string;
  code: string;
  isPlaceholder: boolean;
  title: LocalizedText;
  issuer: LocalizedText;
  date: LocalizedText;
  category: LocalizedText;
  statusNote: LocalizedText;
  credentialUrl?: string;
  credentialId?: string;
  images: string[];
  hours?: string;
  description: LocalizedText;
  skills: string[];
}

export const OWNER_PROFILE = {
  name: 'Sakti',
  handle: 'sakti.dev',
  email: 'saktiarif830@gmail.com',
  github: 'https://github.com/SaktiArifDwiPutra',
  linkedin: 'https://www.linkedin.com/in/sakti-arif',
  cv: '#contact',
  links: {
    github: 'https://github.com/SaktiArifDwiPutra',
    linkedin: 'https://www.linkedin.com/in/sakti-arif',
    cv: '#contact',
  },
};

export const PROJECTS: ProjectEntry[] = [
  {
    slug: 'critiplay',
    index: '01',
    name: 'CritiPlay',
    disciplineGroup: 'fullstack',
    category: {
      en: 'Collaborative Full-Stack Web Platform',
      id: 'Platform Web Kolaboratif Full-Stack',
    },
    tagline: {
      en: 'A structured game rating and editorial review platform built with React, TypeScript, Laravel, and PostgreSQL (Neon DB).',
      id: 'Platform penilaian dan ulasan game terstruktur yang dibangun dengan React, TypeScript, Laravel, dan PostgreSQL (Neon DB).',
    },
    description: {
      en: 'CritiPlay is a full-stack collaborative web platform designed for cataloging, rating, and reviewing video games. Developed in engineering collaboration with partner Khairul with a decoupled production architecture: a typed React & TypeScript client interface hosted on Vercel, paired with a dedicated Laravel REST API server connected to PostgreSQL hosted on Neon DB.',
      id: 'CritiPlay adalah platform web kolaboratif full-stack yang dirancang untuk mengatalogkan, memberi nilai, dan mengulas video game. Dikembangkan berkolaborasi bersama mitra Khairul dengan arsitektur produksi decoupled: antarmuka klien React & TypeScript bertipe kuat yang di-host di Vercel, terhubung ke server backend API Laravel terpisah dengan basis data PostgreSQL di Neon DB.',
    },
    editorialOverview: {
      en: [
        'CritiPlay was conceived to bring editorial structure to community game reviews. The project is an engineering collaboration with partner Khairul.',
        'From an architectural standpoint, CritiPlay decouples presentation from backend services: a modern React & TypeScript client hosted on Vercel manages interactive filtering and review interfaces, while a separate dedicated Laravel API server handles authentication and business logic connected to a cloud PostgreSQL database hosted on Neon DB.',
      ],
      id: [
        'CritiPlay dirancang untuk menghadirkan struktur editorial pada ulasan game komunitas. Proyek ini merupakan kolaborasi rekayasa perangkat lunak bersama mitra Khairul.',
        'Dari sisi arsitektur, CritiPlay memisahkan antarmuka dari layanan backend: klien React & TypeScript modern yang di-host di Vercel menangani penyaringan interaktif dan antarmuka ulasan, sementara server API Laravel terpisah menangani autentikasi dan logika bisnis yang terhubung ke database cloud PostgreSQL di Neon DB.',
      ],
    },
    coverImage: '/images/projects/critiplay-cover.png',
    techStack: ['React', 'TypeScript', 'Laravel', 'PostgreSQL', 'Neon DB', 'Vercel', 'Tailwind CSS', 'REST API'],
    role: {
      en: 'Lead Full-Stack Developer & Product Designer (Design, Concept, Complete Backend Architecture & Frontend Finishing)',
      id: 'Lead Full-Stack Developer & Desainer Produk (Desain, Konsep, Arsitektur Backend Penuh & Finishing Frontend)',
    },
    status: {
      en: 'Live Production',
      id: 'Aktif Dipublikasikan',
    },
    features: [
      {
        code: 'CP-01',
        title: {
          en: 'Game Catalog & Taxonomy Filtering',
          id: 'Katalog Game & Penyaringan Taksonomi',
        },
        description: {
          en: 'Structured browsing across game titles, genres, platforms, and community rating distributions.',
          id: 'Penelusuran terstruktur lintas judul game, genre, platform, dan distribusi penilaian komunitas.',
        },
      },
      {
        code: 'CP-02',
        title: {
          en: 'Written Reviews & Rating Aggregation',
          id: 'Ulasan Tertulis & Agregasi Penilaian',
        },
        description: {
          en: 'Users can submit scored critiques that dynamically recalculate title averages in the relational database.',
          id: 'Pengguna dapat mengirimkan ulasan berskor yang secara dinamis memperbarui rata-rata penilaian di basis data relasional.',
        },
      },
      {
        code: 'CP-03',
        title: {
          en: 'Typed Client-Server Contract',
          id: 'Kontrak Klien-Server Bertipe Kuat',
        },
        description: {
          en: 'TypeScript interfaces aligned with Laravel API resources to prevent payload mismatches across views.',
          id: 'Antarmuka TypeScript yang diselaraskan dengan resource API Laravel untuk mencegah ketidakcocokan data antar tampilan.',
        },
      },
    ],
    challenges: [
      {
        title: {
          en: 'Decoupled Client-Server Performance & CORS Security',
          id: 'Performa Klien-Server Terpisah & Keamanan CORS',
        },
        problem: {
          en: 'Managing seamless session authentication and cookie security between Vercel frontend and standalone backend server.',
          id: 'Mengelola autentikasi sesi dan keamanan cookie secara mulus antara frontend Vercel dan server backend terpisah.',
        },
        solution: {
          en: 'Configured proper CORS headers, secure token passing, and optimized JSON API resource serialization.',
          id: 'Mengonfigurasi header CORS yang tepat, pengiriman token aman, dan serialisasi resource JSON API yang optimal.',
        },
      },
      {
        title: {
          en: 'Serverless PostgreSQL Cold Starts on Neon DB',
          id: 'Koneksi Serverless PostgreSQL di Neon DB',
        },
        problem: {
          en: 'Handling connection pooling and latency spikes during sudden community traffic spikes.',
          id: 'Menangani pooling koneksi dan lonjakan latensi saat traffic komunitas meningkat.',
        },
        solution: {
          en: 'Utilized Neon connection pooling with optimized relational queries, indexing, and eager loading in Laravel Eloquent.',
          id: 'Memanfaatkan Neon connection pooling dengan kueri relasional terindeks dan eager loading di Laravel Eloquent.',
        },
      },
    ],
    anatomyLayers: [
      {
        id: 'client',
        code: 'LAYER 01',
        layerName: {
          en: 'Client Presentation & State (Vercel)',
          id: 'Presentasi Klien & State (Vercel)',
        },
        tech: 'React + TypeScript',
        summary: {
          en: 'Component-driven catalog grids, review composer, and typed API hooks hosted on Vercel.',
          id: 'Grid katalog berbasis komponen, editor ulasan, dan hook API bertipe kuat yang di-host di Vercel.',
        },
        specs: {
          en: ['Strict TypeScript DTO models', 'Modular filter & search state', 'Responsive editorial review cards'],
          id: ['Model DTO TypeScript ketat', 'State pencarian & filter modular', 'Kartu ulasan editorial responsif'],
        },
      },
      {
        id: 'api',
        code: 'LAYER 02',
        layerName: {
          en: 'Decoupled Backend API Server',
          id: 'Server API Backend Terpisah',
        },
        tech: 'Laravel (PHP)',
        summary: {
          en: 'RESTful controllers, request validation, authentication guards, and resource serialization on standalone server.',
          id: 'Controller RESTful, validasi request, penjaga autentikasi, dan serialisasi resource pada server mandiri.',
        },
        specs: {
          en: ['FormRequest validation rules', 'API Resource JSON formatting', 'Session / Token authentication'],
          id: ['Aturan validasi FormRequest', 'Pemformatan JSON API Resource', 'Autentikasi Sesi / Token'],
        },
      },
      {
        id: 'data',
        code: 'LAYER 03',
        layerName: {
          en: 'Cloud Relational Persistence (Neon DB)',
          id: 'Penyimpanan Relasional Cloud (Neon DB)',
        },
        tech: 'PostgreSQL (Neon)',
        summary: {
          en: 'Serverless PostgreSQL database on Neon DB with normalized tables for games, genres, users, ratings, and reviews.',
          id: 'Database PostgreSQL serverless di Neon DB dengan tabel ternormalisasi untuk game, genre, pengguna, rating, dan ulasan.',
        },
        specs: {
          en: ['Neon pooled connection', 'Foreign key constraints', 'Aggregated score calculation queries'],
          id: ['Koneksi pooled Neon DB', 'Batasan kunci asing (Foreign Key)', 'Kueri kalkulasi agregasi skor'],
        },
      },
    ],
    gallery: [
      {
        id: 'cp-plate-1',
        plateNumber: 'PLATE I',
        title: {
          en: 'Catalog & Rating Matrix View',
          id: 'Tampilan Katalog & Matriks Penilaian',
        },
        caption: {
          en: 'Architectural layout of the game discovery interface with genre filters and aggregated rating distribution.',
          id: 'Tata letak arsitektural antarmuka penelusuran game dengan filter genre dan distribusi agregasi penilaian.',
        },
        aspectRatio: '16/9',
        imageSrc: '/images/projects/critiplay-cover.png',
        diagramType: 'interface',
      },
      {
        id: 'cp-plate-2',
        plateNumber: 'PLATE II',
        title: {
          en: 'Vercel / Laravel / PostgreSQL (Neon DB) Architecture',
          id: 'Arsitektur Vercel / Laravel / PostgreSQL (Neon DB)',
        },
        caption: {
          en: 'Decoupled lifecycle: Vercel frontend communicating with dedicated Laravel API server persisting to Neon DB cloud PostgreSQL.',
          id: 'Siklus decoupled: Frontend Vercel berkomunikasi dengan server API Laravel mandiri dan database cloud PostgreSQL di Neon DB.',
        },
        aspectRatio: '16/9',
        imageSrc: '/images/projects/critiplay-arch.svg',
        diagramType: 'architecture',
      },
    ],
    links: {
      repository: 'https://github.com/SaktiArifDwiPutra/CritiPlay',
      demo: 'https://www.critiplay.my.id',
      collaborator: {
        name: 'Khairul',
        url: 'https://github.com/Kyunn17',
      },
      note: {
        en: 'Collaborative engineering with Khairul. Live platform available via live preview redirect.',
        id: 'Proyek rekayasa kolaboratif bersama Khairul. Platform live tersedia melalui tombol pratinjau langsung.',
      },
    },
  },
  {
    slug: 'daus-anak-soleh',
    index: '02',
    name: 'Daus Anak Soleh',
    disciplineGroup: 'gamedev',
    category: {
      en: 'Children Islamic Prayer Puzzle Game',
      id: 'Game Teka-Teki Edukasi Gerakan & Bacaan Sholat Anak',
    },
    tagline: {
      en: 'Interactive educational puzzle adventure teaching Muslim prayer movements, readings, and sequences with 2D gameplay.',
      id: 'Game teka-teki edukatif interaktif yang mengajarkan urutan gerakan dan bacaan sholat untuk anak-anak muslim.',
    },
    description: {
      en: 'Daus Anak Soleh is an interactive children\'s educational puzzle game designed to teach Muslim prayer (sholat) movements and prayer readings. Players guide Daus through illustrated puzzles and sequence challenges matching each sholat posture with its proper recitation, built using Phaser Framework, HTML 5 Canvas, and modern JavaScript.',
      id: 'Daus Anak Soleh adalah game teka-teki edukasi anak yang dirancang untuk mempelajari gerakan dan bacaan sholat bagi umat muslim. Pemain memandu karakter Daus menyelesaikan tantangan puzzle interaktif yang mencocokkan setiap rukun gerakan sholat dengan bacaan yang tepat, dibangun dengan Phaser Framework, HTML 5 Canvas, dan JavaScript modern.',
    },
    editorialOverview: {
      en: [
        'Teaching fundamental Islamic worship through play requires engaging visual storytelling and rigorous procedural accuracy. Daus Anak Soleh was crafted as a browser-first children\'s puzzle game that breaks down the steps of Islamic prayer (sholat), from takbiratul ihram to salam, into memorable interactive puzzle mechanics.',
        'The gameplay challenges children to arrange correct prayer postures, match Arabic and translated prayer recitations, and unlock progressive prayer stages within an illustrated Islamic journey. Engineered with Phaser Framework and HTML 5 Canvas for responsive zero-latency web play.',
      ],
      id: [
        'Mengajarkan ibadah fundamental sholat kepada anak-anak membutuhkan pendekatan visual yang menyenangkan serta akurasi rukun yang tepat. Daus Anak Soleh dirancang sebagai game teka-teki edukasi berbasis peramban yang memandu tahapan sholat, dari takbiratul ihram hingga salam, menjadi mekanika puzzle interaktif yang mudah diingat.',
        'Pemain ditantang untuk menyusun urutan gerakan sholat yang benar, mencocokkan postur tubuh dengan bacaan doa sholat, serta membuka tingkat tantangan berikutnya dalam perjalanan yang ramah anak. Dikembangkan menggunakan Phaser Framework dan HTML 5 Canvas agar dapat dimainkan secara instan di peramban.',
      ],
    },
    coverImage: '/images/projects/daus-anak-soleh-cover.png',
    techStack: ['Phaser', 'HTML 5 Canvas', 'JavaScript', 'Web Audio API', 'Pixel Art', 'CSS'],
    role: {
      en: 'Game Developer (Canvas Architecture, Prayer Mechanics & Audio)',
      id: 'Pengembang Game (Arsitektur Canvas, Mekanika Rukun Sholat & Audio)',
    },
    status: {
      en: 'Finished Production / Live on Itch.io',
      id: 'Produksi Selesai / Telah Dirilis di Itch.io',
    },
    features: [
      {
        code: 'DAS-01',
        title: {
          en: 'Prayer Posture & Movement Puzzle Engine',
          id: 'Mesin Teka-Teki Gerakan & Postur Sholat',
        },
        description: {
          en: 'Interactive drag-and-match puzzle challenges verifying correct posture order from Takbiratul Ihram to Salam.',
          id: 'Tantangan teka-teki seret-dan-cocokkan interaktif yang memverifikasi urutan postur dari Takbiratul Ihram hingga Salam.',
        },
      },
      {
        code: 'DAS-02',
        title: {
          en: 'Prayer Recitation Audio & Reading Matching',
          id: 'Sistem Pencocokan Bacaan Doa Sholat & Audio',
        },
        description: {
          en: 'Dynamic audio cues and Arabic script flashcards reinforcing correct prayer recitations for each posture.',
          id: 'Efek audio dinamis dan kartu teks doa Arab yang memperkuat ingatan bacaan doa sholat pada setiap gerakan.',
        },
      },
      {
        code: 'DAS-03',
        title: {
          en: 'HTML 5 2D Canvas Sprite Renderer',
          id: 'Renderer Sprite Canvas 2D HTML 5',
        },
        description: {
          en: 'Custom lightweight render loop executing at 60 FPS across desktop and mobile browsers without third-party plugins.',
          id: 'Loop render ringan kustom berkinerja 60 FPS pada peramban desktop maupun ponsel tanpa plugin pihak ketiga.',
        },
      },
    ],
    challenges: [
      {
        title: {
          en: 'Pedagogical Accuracy in Prayer Sequences',
          id: 'Akurasi Pedagogis dalam Urutan Gerakan Sholat',
        },
        problem: {
          en: 'Ensuring prayer movements follow strict Islamic sequence rules while maintaining an intuitive puzzle flow for young children.',
          id: 'Memastikan urutan gerakan sholat mengikuti rukun yang shahih sekaligus mempertahankan alur teka-teki yang intuitif bagi anak.',
        },
        solution: {
          en: 'Implemented a state machine validating each step before unlocking subsequent prayer postures, with encouraging feedback.',
          id: 'Menerapkan mesin status (state machine) yang memvalidasi setiap tahapan sebelum membuka gerakan berikutnya disertai pesan penyemangat.',
        },
      },
      {
        title: {
          en: 'Responsive Canvas Scaling Across Mobile Viewports',
          id: 'Penskalaan Canvas Responsif Lintas Layar Ponsel',
        },
        problem: {
          en: 'Different device aspect ratios and pixel densities caused blurry sprite rendering and touch misalignment.',
          id: 'Rasio aspek dan kepadatan piksel perangkat yang beragam menyebabkan gambar buram dan koordinat sentuh bergeser.',
        },
        solution: {
          en: 'Implemented dynamic canvas resolution scaling matching window.devicePixelRatio with logical coordinate translation.',
          id: 'Menerapkan penskalaan resolusi dinamis berbasis window.devicePixelRatio yang dipadukan dengan translasi koordinat logika.',
        },
      },
    ],
    anatomyLayers: [
      {
        id: 'canvas-renderer',
        code: 'LAYER 01',
        layerName: {
          en: '2D Canvas Render Layer',
          id: 'Lapisan Render Canvas 2D',
        },
        tech: 'Phaser + HTML 5 Canvas API',
        summary: {
          en: 'Sprite sheet slicing, dynamic background scrolling, and UI overlay rendering.',
          id: 'Pemotongan sprite sheet, latar belakang bergulir dinamis, dan render overlay antarmuka.',
        },
        specs: {
          en: ['60 FPS requestAnimationFrame loop', 'HiDPI Retina coordinate mapping', 'Sprite asset preloader'],
          id: ['Loop requestAnimationFrame 60 FPS', 'Pemetaan koordinat Retina HiDPI', 'Preloader aset sprite'],
        },
      },
      {
        id: 'game-logic',
        code: 'LAYER 02',
        layerName: {
          en: 'Prayer Movement & Puzzle Logic',
          id: 'Logika Gerakan Sholat & Teka-Teki',
        },
        tech: 'JavaScript (ES6+)',
        summary: {
          en: 'Prayer posture matching algorithms, collision checks, score tallying, and stage state machines.',
          id: 'Algoritma pencocokan gerakan sholat, pengecekan tabrakan/klik, kalkulasi skor, dan mesin status level.',
        },
        specs: {
          en: ['Finite State Machine transitions', 'Dynamic prayer puzzle challenge matrix', 'Local progress retention'],
          id: ['Transisi Finite State Machine', 'Matriks tantangan puzzle sholat dinamis', 'Penyimpanan progres lokal'],
        },
      },
      {
        id: 'audio-subsystem',
        code: 'LAYER 03',
        layerName: {
          en: 'Recitation & Audio Subsystem',
          id: 'Subsistem Audio & Bacaan Sholat',
        },
        tech: 'Web Audio API / HTML 5 Audio',
        summary: {
          en: 'Thematic soundtrack streaming with low-latency recitation sound effects on user actions.',
          id: 'Streaming lagu tema dengan latensi rendah untuk efek suara bacaan sholat saat aksi pemain.',
        },
        specs: {
          en: ['Mute toggle with persistence', 'Polyphonic SFX playback', 'Mobile audio unlock handshake'],
          id: ['Pilihan mute dengan persistensi', 'Pemutaran efek suara polifonik', 'Inisialisasi audio ramah seluler'],
        },
      },
    ],
    gallery: [
      {
        id: 'das-plate-1',
        plateNumber: 'PLATE I',
        title: {
          en: 'Village Adventure Background & Canvas World',
          id: 'Latar Belakang Petualangan Desa & Dunia Canvas',
        },
        caption: {
          en: 'Vibrant scenic environment serving as the primary backdrop for Daus journey.',
          id: 'Latar pemandangan visual cerah yang menjadi panggung utama perjalanan Daus.',
        },
        aspectRatio: '16/9',
        imageSrc: '/images/projects/daus-anak-soleh-cover.png',
        diagramType: 'interface',
      },
    ],
    links: {
      repository: 'https://github.com/SaktiArifDwiPutra/DausAnakSoleh',
      demo: 'https://archdragonstudio.itch.io/daus-anak-soleh',
      note: {
        en: 'Playable game published on Itch.io; full source code available on GitHub.',
        id: 'Game dapat dimainkan di Itch.io; kode sumber lengkap tersedia di GitHub.',
      },
    },
  },
  {
    slug: 'website-pilketos',
    index: '03',
    name: 'Website Pilketos',
    disciplineGroup: 'fullstack',
    category: {
      en: 'E-Voting & Election Management Platform',
      id: 'Platform E-Voting & Manajemen Pilketos',
    },
    tagline: {
      en: 'A secure multi-role web voting system built with native PHP and MySQL featuring real-time graphical ballot counting.',
      id: 'Sistem pemungutan suara berbasis web dengan autentikasi multi-peran native PHP & MySQL dilengkapi visualisasi grafik perolehan suara langsung.',
    },
    description: {
      en: 'Website Pilketos provides a transparent digital electoral workflow for school student council elections. It incorporates tiered access controls (Administrator, Teacher/Supervisor, Student Voter), tamper-resistant vote recording, and live result tallying with responsive charts.',
      id: 'Website Pilketos menyediakan alur pemilihan ketua OSIS sekolah yang transparan dan aman secara digital. Sistem ini mencakup kontrol akses bertingkat (Administrator, Guru/Pengawas, Siswa), pencatatan suara anti-duplikasi, serta rekapitulasi perolehan suara langsung dengan grafik responsif.',
    },
    editorialOverview: {
      en: [
        'School democracy requires verifiable, tamper-evident election procedures that can run reliably across hundreds of students simultaneously without complicated infrastructure. Website Pilketos was engineered with native PHP and MySQL to maximize execution speed and simplify server deployment.',
        'The architecture enforces distinct role-based permissions: students receive single-use credentials to cast their ballots, teachers monitor polling activity, and administrators oversee candidate profiles, voter rolls, and real-time Chart.js visual telemetry.',
      ],
      id: [
        'Demokrasi di lingkungan sekolah membutuhkan prosedur pemilihan yang transparan dan dapat diverifikasi, serta mampu berjalan stabil saat diakses ratusan siswa secara bersamaan. Website Pilketos dibangun dengan PHP Native dan MySQL guna memaksimalkan kecepatan eksekusi dan mempermudah deployment di server sekolah.',
        'Arsitektur sistem menerapkan izin berbasis peran yang ketat: siswa menggunakan hak suara sekali pakai, guru mengawasi jalannya pemungutan suara, dan administrator mengelola profil kandidat, daftar pemilih tetap, serta grafik telemetri perolehan suara langsung menggunakan Chart.js.',
      ],
    },
    coverImage: '/images/projects/pilketos-cover.png',
    techStack: ['PHP Native', 'MySQL', 'JavaScript', 'HTML5', 'Bootstrap', 'Chart.js'],
    role: {
      en: 'Full-Stack Developer (Auth Architecture, Database & Real-Time Visualization)',
      id: 'Pengembang Full-Stack (Arsitektur Autentikasi, Basis Data & Visualisasi Real-Time)',
    },
    status: {
      en: 'Production-Ready System',
      id: 'Sistem Siap Produksi',
    },
    features: [
      {
        code: 'PKT-01',
        title: {
          en: 'Tiered Multi-Role Access Control',
          id: 'Kontrol Akses Multi-Peran Bertingkat',
        },
        description: {
          en: 'Strict session segregation between Administrator, Teacher supervisors, and Student voters with single-vote locking.',
          id: 'Pemisahan sesi ketat antara Administrator, Pengawas Guru, dan Pemilih Siswa dengan penguncian suara tunggal.',
        },
      },
      {
        code: 'PKT-02',
        title: {
          en: 'Real-Time Vote Tallying & Visual Charts',
          id: 'Rekapitulasi Suara Real-Time & Diagram Visual',
        },
        description: {
          en: 'Live vote percentage calculations and interactive bar/pie charts powered by Chart.js without manual database refresh.',
          id: 'Kalkulasi persentase suara langsung dan grafik batang/lingkaran interaktif berbasis Chart.js tanpa muat ulang manual.',
        },
      },
      {
        code: 'PKT-03',
        title: {
          en: 'Voter Roll Management & Audit Logs',
          id: 'Manajemen DPT & Log Audit Pemilihan',
        },
        description: {
          en: 'Complete registry for class rosters, candidate manifestos, and audit logs to verify election integrity.',
          id: 'Pencatatan lengkap daftar pemilih tetap per kelas, visi-misi kandidat, dan log audit integritas pemilu.',
        },
      },
    ],
    challenges: [
      {
        title: {
          en: 'Preventing Double Voting Under Concurrent Traffic',
          id: 'Mencegah Suara Ganda pada Lalu Lintas Konkuren',
        },
        problem: {
          en: 'Multiple students voting simultaneously could cause race conditions where a voter token is used more than once.',
          id: 'Banyak siswa yang memberikan suara pada waktu bersamaan berpotensi memicu race condition sehingga token pemilih terpakai ganda.',
        },
        solution: {
          en: 'Utilized atomic database updates and transaction locking in MySQL to flag voter status immediately upon ballot confirmation.',
          id: 'Memanfaatkan pembaruan atomik dan transaksi di MySQL untuk mengunci status pemilih secara instan begitu suara dikonfirmasi.',
        },
      },
      {
        title: {
          en: 'Streamlined UX for Quick Ballot Execution',
          id: 'Antarmuka Cepat untuk Pemungutan Suara di Bilik',
        },
        problem: {
          en: 'Long loading times or confusing confirmation modals slow down the physical polling queue in the computer lab.',
          id: 'Waktu muat yang lama atau dialog konfirmasi yang membingungkan memperlambat antrean bilik suara fisik di lab komputer.',
        },
        solution: {
          en: 'Designed an uncluttered candidate card selection interface with high-contrast buttons and instant ballot submission feedback.',
          id: 'Merancang tata letak kartu kandidat yang bersih dengan tombol kontras tinggi dan konfirmasi satu sentuhan yang langsung mengakhiri sesi.',
        },
      },
    ],
    anatomyLayers: [
      {
        id: 'auth-layer',
        code: 'LAYER 01',
        layerName: {
          en: 'Authentication & Session Guard',
          id: 'Autentikasi & Penjaga Sesi',
        },
        tech: 'PHP Sessions & Password Hashing',
        summary: {
          en: 'Cryptographic session tokens, password hashing, and role-based redirect middleware.',
          id: 'Token sesi kriptografis, hash kata sandi, dan middleware pengalihan berbasis peran.',
        },
        specs: {
          en: ['Role-based routing', 'Voter token invalidation on submit', 'Session timeout safeguards'],
          id: ['Routing berbasis peran', 'Invalidasi token siswa setelah memilih', 'Pengaman batas waktu sesi'],
        },
      },
      {
        id: 'data-persistence',
        code: 'LAYER 02',
        layerName: {
          en: 'Relational Schema & Vote Registry',
          id: 'Skema Relasional & Register Suara',
        },
        tech: 'MySQL Database',
        summary: {
          en: 'Structured tables for candidates, classes, voters, and tamper-resistant vote totals.',
          id: 'Tabel terstruktur untuk kandidat, kelas, pemilih, dan total perolehan suara.',
        },
        specs: {
          en: ['Relational foreign keys', 'Unique voter token constraints', 'Optimized count queries'],
          id: ['Foreign key relasional', 'Batasan token pemilih unik', 'Kueri kalkulasi suara teroptimasi'],
        },
      },
      {
        id: 'visualization',
        code: 'LAYER 03',
        layerName: {
          en: 'Live Telemetry & Dashboard View',
          id: 'Telemetri Langsung & Dasbor Visual',
        },
        tech: 'Chart.js & Bootstrap',
        summary: {
          en: 'Real-time voting tally charts, candidate progress bars, and administrative oversight consoles.',
          id: 'Grafik penghitungan suara real-time, progress bar kandidat, dan konsol pengawasan administrator.',
        },
        specs: {
          en: ['Dynamic Chart.js rendering', 'Responsive admin table view', 'CSV voter roll export'],
          id: ['Render Chart.js dinamis', 'Tampilan tabel admin responsif', 'Ekspor daftar pemilih CSV'],
        },
      },
    ],
    gallery: [
      {
        id: 'pkt-plate-1',
        plateNumber: 'PLATE I',
        title: {
          en: 'Pilketos Election Control Dashboard',
          id: 'Dasbor Pengendali Pemilihan Pilketos',
        },
        caption: {
          en: 'Real-time visual monitoring dashboard displaying candidate votes, participation quotas, and system status.',
          id: 'Dasbor pemantauan visual langsung yang menampilkan perolehan suara kandidat, kuota partisipasi, dan status sistem.',
        },
        aspectRatio: '16/9',
        imageSrc: '/images/projects/pilketos-cover.png',
        diagramType: 'interface',
      },
    ],
    links: {
      repository: 'https://github.com/SaktiArifDwiPutra/Website-Pilketos',
      demo: '', // [OWNER INPUT]: Insert live deployment URL here
      note: {
        en: 'Repository link active; live deployment slot prepared.',
        id: 'Tautan repositori aktif; slot deployment live telah disiapkan.',
      },
    },
  },
  {
    slug: 'laundryflow',
    index: '04',
    name: 'LaundryFlow',
    disciplineGroup: 'fullstack',
    category: {
      en: 'Mobile Enterprise Application',
      id: 'Aplikasi Mobile Enterprise',
    },
    tagline: {
      en: 'A mobile laundry management application built with Flutter and connected to an Odoo backend.',
      id: 'Aplikasi manajemen penatu (laundry) mobile yang dibangun dengan Flutter dan terhubung ke backend Odoo.',
    },
    description: {
      en: 'LaundryFlow streamlines day-to-day laundry service operations through a cross-platform Flutter mobile interface integrated directly with an Odoo ERP backend for order tracking, customer records, and workflow status updates.',
      id: 'LaundryFlow menyederhanakan operasional layanan penatu sehari-hari melalui antarmuka mobile lintas platform Flutter yang terintegrasi langsung dengan backend ERP Odoo untuk pelacakan pesanan, data pelanggan, dan pembaruan status pengerjaan.',
    },
    editorialOverview: {
      en: [
        'Operational service businesses rely on fast, low-friction data entry on the shop floor while needing structured accounting and inventory records in the back office. LaundryFlow bridges that gap by pairing a tactile Flutter mobile client with an Odoo backend.',
        'Staff can intake garments, assign service types, update washing/ironing/ready stages, and synchronize order records directly with Odoo models, eliminating manual double-entry between mobile operators and backend administration.',
      ],
      id: [
        'Bisnis layanan operasional membutuhkan pencatatan data yang cepat dan praktis di lapangan, sekaligus memerlukan pembukuan dan pencatatan terstruktur di sistem pusat. LaundryFlow menjembatani kebutuhan tersebut dengan memadukan klien mobile Flutter yang responsif dan backend Odoo.',
        'Staf operasional dapat mencatat penerimaan pakaian, menentukan jenis layanan, memperbarui tahapan pencucian/penyetrikaan/siap ambil, serta menyinkronkan data pesanan langsung dengan model Odoo, menghilangkan pencatatan ganda secara manual.',
      ],
    },
    coverImage: '/images/projects/laundryflow-cover.svg',
    techStack: ['Flutter', 'Dart', 'Odoo ERP', 'RPC / REST Integration', 'Mobile UI'],
    role: {
      en: 'Mobile & Integration Developer (Flutter Client & Odoo Connectivity)',
      id: 'Pengembang Mobile & Integrasi (Klien Flutter & Konektivitas Odoo)',
    },
    status: {
      en: 'Functional Application Build',
      id: 'Aplikasi Fungsional',
    },
    features: [
      {
        code: 'LF-01',
        title: {
          en: 'End-to-End Order Lifecycle Tracking',
          id: 'Pelacakan Siklus Pesanan Menyeluruh',
        },
        description: {
          en: 'Track laundry orders from initial reception and weighing through washing, pressing, and customer pickup.',
          id: 'Melacak pesanan laundry mulai dari penerimaan awal dan penimbangan hingga pencucian, penyetrikaan, dan pengambilan pelanggan.',
        },
      },
      {
        code: 'LF-02',
        title: {
          en: 'Odoo ERP Backend Synchronization',
          id: 'Sinkronisasi Backend ERP Odoo',
        },
        description: {
          en: 'Connects mobile operational actions with Odoo partners, service items, and order state models.',
          id: 'Menghubungkan aksi operasional di perangkat mobile dengan data pelanggan, item layanan, dan model status pesanan di Odoo.',
        },
      },
      {
        code: 'LF-03',
        title: {
          en: 'Task-Focused Mobile Ergonomics',
          id: 'Ergonomi Mobile Berfokus Tugas',
        },
        description: {
          en: 'Designed for quick one-handed status updates and clear order queue visibility during busy operational hours.',
          id: 'Dirancang untuk pembaruan status yang cepat dan visibilitas antrean pesanan yang jelas di tengah jam operasional sibuk.',
        },
      },
    ],
    challenges: [
      {
        title: {
          en: 'Bridging Flutter State with Odoo Data Models',
          id: 'Menjembatani State Flutter dengan Model Data Odoo',
        },
        problem: {
          en: 'Odoo ERP models carry rich relational structures and specific RPC/API conventions that differ from typical lightweight mobile JSON payloads.',
          id: 'Model ERP Odoo memiliki struktur relasional yang kompleks dan konvensi RPC/API khusus yang berbeda dari payload JSON mobile biasa.',
        },
        solution: {
          en: 'Built a dedicated Dart serialization and repository layer that maps Odoo records into clean, strongly typed Flutter domain models.',
          id: 'Membangun lapisan serialisasi dan repositori Dart khusus yang memetakan record Odoo ke dalam model domain Flutter yang bersih dan bertipe kuat.',
        },
      },
      {
        title: {
          en: 'Designing for High-Speed Operational Input',
          id: 'Merancang Input Operasional Berkecepatan Tinggi',
        },
        problem: {
          en: 'Operators handling physical laundry batches cannot navigate deep nested menus just to advance an order state.',
          id: 'Operator yang sedang menangani cucian fisik tidak memiliki waktu untuk menavigasi menu berlapis hanya untuk mengubah status pesanan.',
        },
        solution: {
          en: 'Created direct stage-transition controls and clear visual status queues in Flutter so common actions require minimal taps.',
          id: 'Merancang kontrol transisi tahapan langsung dan antrean status visual yang jelas di Flutter sehingga aksi utama memerlukan ketukan seminimal mungkin.',
        },
      },
    ],
    anatomyLayers: [
      {
        id: 'mobile-ui',
        code: 'LAYER 01',
        layerName: {
          en: 'Flutter Mobile Workspace',
          id: 'Ruang Kerja Mobile Flutter',
        },
        tech: 'Flutter + Dart',
        summary: {
          en: 'Cross-platform mobile views for intake queues, order details, and stage transitions.',
          id: 'Tampilan mobile lintas platform untuk antrean masuk, rincian pesanan, dan transisi tahapan.',
        },
        specs: {
          en: ['Reactive state management', 'Touch-optimized status cards', 'Customer & order lookup views'],
          id: ['Manajemen state reaktif', 'Kartu status ramah sentuhan', 'Tampilan pencarian pelanggan & pesanan'],
        },
      },
      {
        id: 'bridge',
        code: 'LAYER 02',
        layerName: {
          en: 'Odoo Integration & Adapter Layer',
          id: 'Lapisan Integrasi & Adapter Odoo',
        },
        tech: 'Dart Service / Odoo API',
        summary: {
          en: 'Handles session authentication, payload mapping, and error recovery between Flutter and Odoo.',
          id: 'Menangani autentikasi sesi, pemetaan payload, dan pemulihan kesalahan antara Flutter dan Odoo.',
        },
        specs: {
          en: ['Session & credential handshake', 'Model serializer / deserializer', 'Network state feedback'],
          id: ['Jabat tangan sesi & kredensial', 'Serializer / deserializer model', 'Umpan balik status jaringan'],
        },
      },
      {
        id: 'erp',
        code: 'LAYER 03',
        layerName: {
          en: 'Odoo ERP Core Backend',
          id: 'Backend Inti ERP Odoo',
        },
        tech: 'Odoo Backend',
        summary: {
          en: 'Centralized source of truth for customers, service catalogs, invoicing states, and order history.',
          id: 'Sumber data terpusat untuk pelanggan, katalog layanan, status tagihan, dan riwayat pesanan.',
        },
        specs: {
          en: ['Partner & customer records', 'Laundry order workflow states', 'Service pricing & item catalog'],
          id: ['Data mitra & pelanggan', 'Status alur kerja pesanan laundry', 'Katalog item & harga layanan'],
        },
      },
    ],
    gallery: [
      {
        id: 'lf-plate-1',
        plateNumber: 'PLATE I',
        title: {
          en: 'Mobile Order Pipeline & Stage Controls',
          id: 'Alur Pesanan Mobile & Kontrol Tahapan',
        },
        caption: {
          en: 'Flutter interface anatomy showing intake queues, active washing/ironing stages, and instant status progression.',
          id: 'Anatomi antarmuka Flutter yang menampilkan antrean masuk, tahapan pencucian/penyetrikaan aktif, dan progresi status instan.',
        },
        aspectRatio: '16/9',
        imageSrc: '/images/projects/laundryflow-cover.svg',
        diagramType: 'interface',
      },
      {
        id: 'lf-plate-2',
        plateNumber: 'PLATE II',
        title: {
          en: 'Flutter-to-Odoo Synchronization Topology',
          id: 'Topologi Sinkronisasi Flutter ke Odoo',
        },
        caption: {
          en: 'Architectural bridge connecting mobile field operations with centralized Odoo ERP business models.',
          id: 'Jembatan arsitektural yang menghubungkan operasional mobile di lapangan dengan model bisnis ERP Odoo terpusat.',
        },
        aspectRatio: '16/9',
        imageSrc: '/images/projects/laundryflow-arch.svg',
        diagramType: 'dataflow',
      },
    ],
    links: {
      repository: 'https://github.com/SaktiArifDwiPutra/LaundryFlow',
      repositories: [
        { name: 'Mobile App (Flutter)', url: 'https://github.com/SaktiArifDwiPutra/LaundryFlow' },
        { name: 'Odoo ERP Backend Module', url: 'https://github.com/SaktiArifDwiPutra/eventflow_management' },
      ],
      demo: '', // [OWNER INPUT]: Insert live deployment URL here
      note: {
        en: 'Repositories linked for both Flutter client and Odoo ERP backend module; live slot prepared.',
        id: 'Repositori terhubung untuk klien Flutter dan modul backend ERP Odoo; slot live telah disiapkan.',
      },
    },
  },
  {
    slug: 'dragonhold',
    index: '05',
    name: 'Dragonhold',
    disciplineGroup: 'fullstack',
    category: {
      en: 'Full-Stack Monorepo Architecture',
      id: 'Arsitektur Monorepo Full-Stack',
    },
    tagline: {
      en: 'A high-performance TypeScript monorepo pairing Next.js with a modular Hono API server and PostgreSQL persistence.',
      id: 'Monorepo TypeScript berkinerja tinggi memadukan Next.js dengan server API Hono modular dan persistensi PostgreSQL.',
    },
    description: {
      en: 'Dragonhold is a scalable full-stack monorepo platform managed via pnpm workspaces. It pairs a Next.js web application with a lightweight, sub-millisecond Hono REST API server, Drizzle ORM, Zod contract validation, and PostgreSQL. Engineered with strict cross-package type sharing and containerized runtime environments.',
      id: 'Dragonhold adalah platform monorepo full-stack terukur yang dikelola melalui pnpm workspaces. Platform ini menggabungkan aplikasi web Next.js dengan server REST API Hono yang sangat cepat, Drizzle ORM, validasi kontrak Zod, dan basis data PostgreSQL. Dirancang dengan pembagian tipe data ketat antarpaket serta lingkungan runtime berkontainer.',
    },
    editorialOverview: {
      en: [
        'Modern web platforms demand modular separation of concerns without sacrificing development velocity or type parity. Dragonhold demonstrates an industrial pnpm monorepo architecture uniting @dragonhold/web, @dragonhold/api, and @dragonhold/shared under a unified codebase.',
        'The backend API leverages Hono on Node.js paired with Drizzle ORM and Zod schemas, yielding instantaneous response times and zero-overhead routing, while the Next.js frontend delivers responsive, accessible interfaces styled with Tailwind CSS.',
      ],
      id: [
        'Platform web modern membutuhkan pemisahan modul yang rapi tanpa mengorbankan kecepatan pengembangan atau keselarasan tipe data. Dragonhold mendemonstrasikan arsitektur monorepo pnpm tingkat industri yang menyatukan @dragonhold/web, @dragonhold/api, dan @dragonhold/shared dalam satu basis kode terpadu.',
        'API backend memanfaatkan Hono di atas Node.js yang dipadukan dengan Drizzle ORM dan skema validasi Zod untuk respons kueri instan tanpa beban routing berlebih, sedangkan frontend Next.js menghadirkan antarmuka responsif dan aksesibel dengan Tailwind CSS.',
      ],
    },
    coverImage: '/images/projects/dragonhold-cover.svg',
    techStack: ['Next.js', 'React', 'Hono', 'TypeScript', 'Drizzle ORM', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'Zod', 'Node.js'],
    role: {
      en: 'Monorepo Architect & Backend Systems Engineer',
      id: 'Arsitek Monorepo & Perekayasa Sistem Backend',
    },
    status: {
      en: 'Active Development / Monorepo Core',
      id: 'Dalam Pengembangan Aktif / Inti Monorepo',
    },
    features: [
      {
        code: 'DH-01',
        title: {
          en: 'Unified Monorepo Workspace Pipeline',
          id: 'Pipeline Workspace Monorepo Terpadu',
        },
        description: {
          en: 'Pnpm workspaces orchestrating independent apps and shared domain packages with zero redundant dependencies.',
          id: 'Pnpm workspaces yang mengorkestrasi aplikasi mandiri dan paket domain bersama tanpa redundansi dependensi.',
        },
      },
      {
        code: 'DH-02',
        title: {
          en: 'Sub-Millisecond Hono REST API Server',
          id: 'Server REST API Hono Berkecepatan Tinggi',
        },
        description: {
          en: 'Ultra-lightweight HTTP routing with Zod schema validation guards and Argon2 password hashing.',
          id: 'Perutean HTTP sangat ringan dengan penjaga validasi skema Zod dan hashing kata sandi Argon2.',
        },
      },
      {
        code: 'DH-03',
        title: {
          en: 'Type-Safe Drizzle ORM & PostgreSQL Persistence',
          id: 'Persistensi PostgreSQL & Drizzle ORM Type-Safe',
        },
        description: {
          en: 'Declarative schema migrations, zero-cost relational mappings, and connection pooling.',
          id: 'Migrasi skema deklaratif, pemetaan relasional tanpa overhead biaya komputasi, dan connection pooling.',
        },
      },
    ],
    challenges: [
      {
        title: {
          en: 'Cross-Package Type Integrity in Monorepos',
          id: 'Integritas Tipe Data Lintas Paket dalam Monorepo',
        },
        problem: {
          en: 'Keeping client and server data transfer objects (DTOs) in sync during rapid backend iteration.',
          id: 'Menjaga sinkronisasi DTO klien dan server selama iterasi backend yang cepat.',
        },
        solution: {
          en: 'Established an internal @dragonhold/shared package exporting single-source Zod schemas and TypeScript types.',
          id: 'Membangun paket internal @dragonhold/shared yang mengekspor skema Zod dan tipe TypeScript sebagai sumber tunggal.',
        },
      },
      {
        title: {
          en: 'Zero-Bloat Minimalist HTTP Architecture',
          id: 'Arsitektur HTTP Minimalis Tanpa Beban Berlebih',
        },
        problem: {
          en: 'Heavy traditional backend frameworks introduce memory overhead and slower boot cycles.',
          id: 'Framework backend tradisional yang berat menimbulkan beban memori dan siklus boot yang lebih lambat.',
        },
        solution: {
          en: 'Adopted Hono framework with @hono/node-server and @hono/zod-validator for optimal cold-start and execution speeds.',
          id: 'Mengadopsi framework Hono dengan @hono/node-server dan @hono/zod-validator untuk kecepatan boot dan eksekusi optimal.',
        },
      },
    ],
    anatomyLayers: [
      {
        id: 'web-app',
        code: 'LAYER 01',
        layerName: {
          en: 'Web Presentation Layer (@dragonhold/web)',
          id: 'Lapisan Presentasi Web (@dragonhold/web)',
        },
        tech: 'Next.js 16 + React 19',
        summary: {
          en: 'Responsive dashboard and interface components styled with Tailwind CSS 4.',
          id: 'Dasbor responsif dan komponen antarmuka yang ditata dengan Tailwind CSS 4.',
        },
        specs: {
          en: ['Strict typechecking', 'Component-driven layout', 'Sub-second client hydration'],
          id: ['Pemeriksaan tipe data ketat', 'Tata letak berbasis komponen', 'Hidrasi klien sangat cepat'],
        },
      },
      {
        id: 'api-service',
        code: 'LAYER 02',
        layerName: {
          en: 'Microservice API Layer (@dragonhold/api)',
          id: 'Lapisan API Microservice (@dragonhold/api)',
        },
        tech: 'Hono (Node.js)',
        summary: {
          en: 'Lightweight REST routing, middleware guards, and authentication services.',
          id: 'Perutean REST ringan, middleware pelindung, dan layanan autentikasi.',
        },
        specs: {
          en: ['Zod request validation', 'Argon2 encryption', 'Automated test suite'],
          id: ['Validasi request Zod', 'Enkripsi Argon2', 'Rangkaian pengujian otomatis'],
        },
      },
      {
        id: 'db-layer',
        code: 'LAYER 03',
        layerName: {
          en: 'Relational Database (@dragonhold/db)',
          id: 'Basis Data Relasional (@dragonhold/db)',
        },
        tech: 'Drizzle ORM + PostgreSQL',
        summary: {
          en: 'Type-safe SQL query generation, schema migrations, and seeded test environments.',
          id: 'Pembangkitan kueri SQL type-safe, migrasi skema, dan lingkungan uji bersemai.',
        },
        specs: {
          en: ['Database migrations', 'Relational schema relations', 'Automated seeds'],
          id: ['Migrasi basis data', 'Relasi skema relasional', 'Seeding data otomatis'],
        },
      },
    ],
    gallery: [
      {
        id: 'dh-plate-1',
        plateNumber: 'PLATE I',
        title: {
          en: 'Monorepo Architecture & Workspace Blueprint',
          id: 'Cetak Biru Arsitektur Monorepo & Workspace',
        },
        caption: {
          en: 'Structural view of apps and shared packages communicating across Dragonhold pnpm workspace.',
          id: 'Tampilan struktural aplikasi dan paket bersama yang berkomunikasi di dalam workspace pnpm Dragonhold.',
        },
        aspectRatio: '16/9',
        imageSrc: '/images/projects/dragonhold-cover.svg',
        diagramType: 'architecture',
      },
    ],
    links: {
      repository: 'https://github.com/SaktiArifDwiPutra/Dragonhold',
      demo: '',
      note: {
        en: 'Active repository on GitHub; live deployment slot prepared.',
        id: 'Repositori aktif di GitHub; slot deployment live telah disiapkan.',
      },
    },
  },
  {
    slug: 'coordina',
    index: '06',
    name: 'Coordina',
    disciplineGroup: 'fullstack',
    category: {
      en: 'Real-Time Event Coordination Platform',
      id: 'Platform Koordinasi Acara Real-Time',
    },
    tagline: {
      en: 'A collaborative real-time event management system powered by Laravel, WebSockets, and modern frontend tooling.',
      id: 'Sistem manajemen dan koordinasi acara real-time kolaboratif ditenagai oleh Laravel, WebSockets, dan Vite.',
    },
    description: {
      en: 'Coordina is a real-time event and team coordination platform built with Laravel, Vite, and Tailwind CSS. It leverages WebSockets (Pusher & Laravel Echo) for instantaneous live broadcasts, task state synchronizations, and team communications without page reloads.',
      id: 'Coordina adalah platform koordinasi acara dan operasional tim real-time yang dibangun menggunakan Laravel, Vite, dan Tailwind CSS. Memanfaatkan WebSockets (Pusher & Laravel Echo) untuk siaran pembaruan instan, sinkronisasi status tugas, dan komunikasi tim tanpa refresh halaman.',
    },
    editorialOverview: {
      en: [
        'Live events and operational coordination require zero-latency status broadcasts between field staff and organizers. Coordina addresses this with an event-driven architecture using Laravel event broadcasting.',
        'By integrating Laravel Echo and Pusher WebSockets with a reactive frontend built with Vite and Tailwind CSS, Coordina ensures team rosters, schedule shifts, and urgent alerts synchronize instantly across all connected screens.',
      ],
      id: [
        'Acara langsung dan koordinasi operasional membutuhkan siaran status tanpa latensi antara staf lapangan dan panitia penyelenggara. Coordina menjawab kebutuhan ini dengan arsitektur berbasis event menggunakan Laravel event broadcasting.',
        'Dengan memadukan Laravel Echo dan WebSockets Pusher dengan frontend reaktif berbasis Vite dan Tailwind CSS, Coordina memastikan daftar penugasan tim, perubahan jadwal, dan peringatan darurat tersinkronisasi seketika di semua layar terhubung.',
      ],
    },
    coverImage: '/images/projects/coordina-cover.svg',
    techStack: ['Laravel', 'PHP', 'Vite', 'Tailwind CSS', 'WebSockets', 'Pusher', 'MySQL', 'JavaScript'],
    role: {
      en: 'Full-Stack Developer & Real-Time Systems Engineer',
      id: 'Pengembang Full-Stack & Perekayasa Sistem Real-Time',
    },
    status: {
      en: 'Functional System / Open Source',
      id: 'Sistem Fungsional / Open Source',
    },
    features: [
      {
        code: 'CD-01',
        title: {
          en: 'Real-Time WebSocket Event Broadcasting',
          id: 'Siaran Event Real-Time Berbasis WebSocket',
        },
        description: {
          en: 'Instant state propagation through public and private authenticated Laravel broadcast channels.',
          id: 'Penyebaran status instan melalui channel broadcast Laravel publik dan privat terautentikasi.',
        },
      },
      {
        code: 'CD-02',
        title: {
          en: 'Collaborative Task & Schedule Dispatch',
          id: 'Pengelolaan Tugas & Penjadwalan Kolaboratif',
        },
        description: {
          en: 'Live drag-and-drop schedule board reflecting real-time updates across all team coordinators.',
          id: 'Papan jadwal seret-dan-lepas langsung yang mencerminkan pembaruan real-time di semua koordinator tim.',
        },
      },
      {
        code: 'CD-03',
        title: {
          en: 'Lightning-Fast Vite & Tailwind Tooling',
          id: 'Build Tooling Vite & Tailwind Super Cepat',
        },
        description: {
          en: 'Optimized frontend asset compilation delivering snappy client interactions on both mobile and desktop.',
          id: 'Kompilasi aset frontend teroptimasi yang menghadirkan interaksi klien responsif di ponsel maupun desktop.',
        },
      },
    ],
    challenges: [
      {
        title: {
          en: 'Authenticated WebSocket Channel Authorization',
          id: 'Otorisasi Channel WebSocket Terautentikasi',
        },
        problem: {
          en: 'Preventing unauthorized clients from subscribing to sensitive coordinator communication channels.',
          id: 'Mencegah klien yang tidak berwenang berlangganan ke saluran komunikasi koordinasi yang sensitif.',
        },
        solution: {
          en: 'Implemented strict Laravel broadcast authorization gates validating session tokens on socket handshakes.',
          id: 'Menerapkan gerbang otorisasi broadcast Laravel yang ketat untuk memvalidasi token sesi saat inisialisasi socket.',
        },
      },
    ],
    anatomyLayers: [
      {
        id: 'client-layer',
        code: 'LAYER 01',
        layerName: {
          en: 'Reactive Client Layer',
          id: 'Lapisan Klien Reaktif',
        },
        tech: 'Vite + JavaScript + Laravel Echo',
        summary: {
          en: 'Live DOM updates, sound cues, and WebSocket listener subscriptions.',
          id: 'Pembaruan DOM langsung, efek suara, dan langganan listener WebSocket.',
        },
        specs: {
          en: ['Pusher JS client', 'Tailwind utility styling', 'Responsive mobile layout'],
          id: ['Klien Pusher JS', 'Penataan gaya utilitas Tailwind', 'Tata letak ramah seluler'],
        },
      },
      {
        id: 'backend-layer',
        code: 'LAYER 02',
        layerName: {
          en: 'Event Broadcasting Engine',
          id: 'Mesin Penyiaran Event',
        },
        tech: 'Laravel (PHP)',
        summary: {
          en: 'Asynchronous event listeners, queue workers, and broadcast channel authorization.',
          id: 'Listener event asinkron, antrean pemroses (queue workers), dan otorisasi channel broadcast.',
        },
        specs: {
          en: ['ShouldBroadcast events', 'Redis queue integration', 'Database transaction safety'],
          id: ['Event ShouldBroadcast', 'Integrasi antrean Redis', 'Keamanan transaksi basis data'],
        },
      },
    ],
    gallery: [
      {
        id: 'cd-plate-1',
        plateNumber: 'PLATE I',
        title: {
          en: 'Real-Time Event Dispatch Board',
          id: 'Papan Koordinasi Event Real-Time',
        },
        caption: {
          en: 'Interface layout of Coordina showing live task channels, broadcast status, and team member presence.',
          id: 'Tata letak antarmuka Coordina yang menampilkan channel tugas langsung, status siaran, dan kehadiran anggota tim.',
        },
        aspectRatio: '16/9',
        imageSrc: '/images/projects/coordina-cover.svg',
        diagramType: 'interface',
      },
    ],
    links: {
      repository: 'https://github.com/SaktiArifDwiPutra/coordina',
      demo: '',
      note: {
        en: 'Active repository on GitHub; live deployment slot prepared.',
        id: 'Repositori aktif di GitHub; slot deployment live telah disiapkan.',
      },
    },
  },
  {
    slug: 'obathaus',
    index: '07',
    name: 'Obathaus',
    disciplineGroup: 'fullstack',
    category: {
      en: 'Pharmacy Inventory & Ordering System',
      id: 'Sistem Inventaris Farmasi & Pemesanan Kasir',
    },
    tagline: {
      en: 'A streamlined medical inventory, stock tracking, and POS ordering application built with Laravel, Inertia.js, and Vue 3.',
      id: 'Aplikasi inventaris obat, pelacakan stok, dan kasir pemesanan yang dibangun dengan Laravel, Inertia.js, dan Vue 3.',
    },
    description: {
      en: 'Obathaus is an integrated pharmacy inventory and point-of-sale management system. Engineered with a single-page application experience using Inertia.js and Vue 3 atop a resilient Laravel backend, providing instant stock reconciliation, drug categorizations, and transaction auditing.',
      id: 'Obathaus adalah sistem manajemen inventaris farmasi dan kasir (point-of-sale) terintegrasi. Dirancang dengan pengalaman Single Page Application (SPA) menggunakan Inertia.js dan Vue 3 di atas backend Laravel yang andal, menghadirkan pencatatan stok instan, kategorisasi obat, dan audit transaksi penjualan.',
    },
    editorialOverview: {
      en: [
        'Healthcare retail and pharmacy management require rigorous batch auditing, expiration tracking, and zero friction at the checkout counter. Obathaus eliminates the traditional full-page reload bottleneck using Inertia.js.',
        'With Vue 3 powering dynamic cart calculations and modal interactions on the client side, and Laravel handling database transactions and stock deduction atomicity on the server, Obathaus delivers high operational throughput.',
      ],
      id: [
        'Manajemen ritel kesehatan dan apotek membutuhkan audit batch yang ketat, pelacakan masa kedaluwarsa, dan transaksi kasir tanpa jeda waktu. Obathaus meniadakan hambatan muat ulang halaman tradisional dengan memanfaatkan Inertia.js.',
        'Dengan Vue 3 yang menggerakkan kalkulasi keranjang dinamis dan interaksi modal di sisi klien, serta Laravel yang mengelola transaksi basis data dan pengurangan stok secara atomik di sisi server, Obathaus menghadirkan kinerja operasional yang tinggi.',
      ],
    },
    coverImage: '/images/projects/obathaus-cover.svg',
    techStack: ['Laravel', 'Inertia.js', 'Vue 3', 'PHP', 'Tailwind CSS', 'MySQL', 'Vite'],
    role: {
      en: 'Full-Stack Developer (Laravel + Inertia/Vue SPA)',
      id: 'Pengembang Full-Stack (Laravel + Inertia/Vue SPA)',
    },
    status: {
      en: 'Completed System / Open Source',
      id: 'Sistem Selesai / Open Source',
    },
    features: [
      {
        code: 'OB-01',
        title: {
          en: 'Instant POS Cashier & Checkout Terminal',
          id: 'Terminal Kasir & Checkout POS Instan',
        },
        description: {
          en: 'Rapid prescription and medicine search with instant stock calculation and receipt generation.',
          id: 'Pencarian resep dan obat cepat dengan kalkulasi stok instan dan pencetakan bukti transaksi.',
        },
      },
      {
        code: 'OB-02',
        title: {
          en: 'Single Page App Flow via Inertia.js & Vue 3',
          id: 'Alur Single Page App via Inertia.js & Vue 3',
        },
        description: {
          en: 'Fluid client navigation without API bloat, preserving complete server-side routing security.',
          id: 'Navigasi klien yang mulus tanpa beban overhead API, mempertahankan keamanan routing server secara penuh.',
        },
      },
      {
        code: 'OB-03',
        title: {
          en: 'Batch Expiry & Inventory Tracking',
          id: 'Pelacakan Inventaris & Kedaluwarsa Batch',
        },
        description: {
          en: 'Automated warnings for low-stock thresholds and upcoming expiry dates.',
          id: 'Peringatan otomatis untuk batas minimum stok dan tanggal kedaluwarsa yang mendekat.',
        },
      },
    ],
    challenges: [
      {
        title: {
          en: 'Atomic Stock Deductions Under Concurrent Checkouts',
          id: 'Pengurangan Stok Atomik Saat Transaksi Serentak',
        },
        problem: {
          en: 'Concurrent cashiers selling the same scarce medicine batches risking negative inventory anomalies.',
          id: 'Kasir yang menjual batch obat terbatas secara bersamaan berisiko menimbulkan anomali stok negatif.',
        },
        solution: {
          en: 'Encapsulated checkout logic in Laravel DB::transaction with pessimistic row locking.',
          id: 'Membungkus logika checkout dalam DB::transaction Laravel dengan penguncian baris pesimistik (pessimistic locking).',
        },
      },
    ],
    anatomyLayers: [
      {
        id: 'client-spa',
        code: 'LAYER 01',
        layerName: {
          en: 'Inertia.js + Vue 3 Client Interface',
          id: 'Antarmuka Klien Inertia.js + Vue 3',
        },
        tech: 'Vue 3 + Inertia.js',
        summary: {
          en: 'Reactive point-of-sale views, search filters, and real-time form validation.',
          id: 'Tampilan kasir reaktif, filter pencarian, dan validasi formulir real-time.',
        },
        specs: {
          en: ['Composition API', 'Tailwind styling', 'Zero-reload page transitions'],
          id: ['Composition API', 'Penataan gaya Tailwind', 'Transisi halaman tanpa reload'],
        },
      },
      {
        id: 'server-core',
        code: 'LAYER 02',
        layerName: {
          en: 'Inventory & Transaction Domain Core',
          id: 'Inti Domain Transaksi & Inventaris',
        },
        tech: 'Laravel (PHP)',
        summary: {
          en: 'ACID transactional inventory controllers, PDF receipt generation, and authentication.',
          id: 'Controller inventaris transaksional ACID, pembuatan bukti PDF, dan autentikasi.',
        },
        specs: {
          en: ['Eloquent ORM', 'FormRequest authorization', 'Database transactions'],
          id: ['Eloquent ORM', 'Otorisasi FormRequest', 'Transaksi basis data'],
        },
      },
    ],
    gallery: [
      {
        id: 'ob-plate-1',
        plateNumber: 'PLATE I',
        title: {
          en: 'Pharmacy Cashier & Inventory Terminal',
          id: 'Terminal Kasir & Inventaris Farmasi',
        },
        caption: {
          en: 'Interface layout of Obathaus showing instant item lookup, cart summary, and stock reconciliation.',
          id: 'Tata letak antarmuka Obathaus yang menampilkan pencarian obat instan, ringkasan keranjang, dan rekonsiliasi stok.',
        },
        aspectRatio: '16/9',
        imageSrc: '/images/projects/obathaus-cover.svg',
        diagramType: 'interface',
      },
    ],
    links: {
      repository: 'https://github.com/SaktiArifDwiPutra/obathaus',
      demo: '',
      note: {
        en: 'Active repository on GitHub; live deployment slot prepared.',
        id: 'Repositori aktif di GitHub; slot deployment live telah disiapkan.',
      },
    },
  },
];

export const TECH_STACK: TechStackCategory[] = [
  {
    id: 'frontend-mobile',
    code: 'SPEC.01',
    title: {
      en: 'Frontend & Cross-Platform Mobile',
      id: 'Frontend & Mobile Lintas Platform',
    },
    description: {
      en: 'Interfaces engineered for type safety, responsive layout discipline, and tactile interaction.',
      id: 'Antarmuka yang dirancang untuk keamanan tipe data, tata letak responsif, dan ketanggapan interaksi.',
    },
    items: [
      {
        name: 'React',
        role: {
          en: 'Component hierarchy, custom state hooks & reactive review feeds',
          id: 'Hierarki komponen, hook state kustom & antarmuka reaktif',
        },
        context: 'CritiPlay',
      },
      {
        name: 'Next.js',
        role: {
          en: 'App Router architecture, SSG/SSR bilingual workflows & speed',
          id: 'Arsitektur App Router, alur kerja dwibahasa SSG/SSR & kecepatan',
        },
        context: 'Portfolio Platform',
      },
      {
        name: 'TypeScript',
        role: {
          en: 'Static type systems, domain modeling & API contract safety',
          id: 'Sistem tipe statis, pemodelan domain & keamanan kontrak API',
        },
        context: 'CritiPlay / Full-Stack',
      },
      {
        name: 'JavaScript',
        role: {
          en: 'Core web scripting, DOM manipulation & client-side state',
          id: 'Pemrograman web inti, manipulasi DOM & state sisi klien',
        },
        context: 'Web & Canvas Apps',
      },
      {
        name: 'HTML 5',
        role: {
          en: 'Semantic markup structure, accessibility & 2D Canvas context',
          id: 'Struktur markup semantik, aksesibilitas & konteks 2D Canvas',
        },
        context: 'Daus Anak Soleh & Web',
      },
      {
        name: 'CSS',
        role: {
          en: 'Modern layouts, flexbox, CSS Grid choreography & responsive media',
          id: 'Tata letak modern, flexbox, CSS Grid & media responsif',
        },
        context: 'Web Layouts',
      },
      {
        name: 'Tailwind CSS',
        role: {
          en: 'Design token systems, responsive grids & utility styling',
          id: 'Sistem token desain, grid responsif & penataan gaya terukur',
        },
        context: 'Web Interfaces',
      },
      {
        name: 'Flutter',
        role: {
          en: 'Cross-platform mobile UI client & status board ergonomics',
          id: 'Klien antarmuka mobile lintas platform & ergonomi status pesanan',
        },
        context: 'LaundryFlow Mobile',
      },
      {
        name: 'Dart',
        role: {
          en: 'Strongly typed domain models, serialization & mobile logic',
          id: 'Model domain bertipe kuat, serialisasi data & logika mobile',
        },
        context: 'LaundryFlow Client',
      },
    ],
  },
  {
    id: 'backend-data',
    code: 'SPEC.02',
    title: {
      en: 'Backend, APIs & Databases',
      id: 'Backend, API & Basis Data',
    },
    description: {
      en: 'Server-side logic, relational data modeling, and enterprise integration.',
      id: 'Logika sisi server, pemodelan data relasional, dan integrasi enterprise.',
    },
    items: [
      {
        name: 'Laravel',
        role: {
          en: 'RESTful API design, authentication, Eloquent ORM & validation',
          id: 'Desain API RESTful, autentikasi, Eloquent ORM & validasi',
        },
        context: 'CritiPlay Backend',
      },
      {
        name: 'PHP',
        role: {
          en: 'Multi-role authentication guards, sessions & electoral tallying',
          id: 'Penjaga autentikasi multi-peran, sesi & kalkulasi suara',
        },
        context: 'Website Pilketos',
      },
      {
        name: 'Node.js',
        role: {
          en: 'Server-side runtime, build automation & asynchronous services',
          id: 'Runtime sisi server, otomasi build & layanan asinkron',
        },
        context: 'Full-Stack Services',
      },
      {
        name: 'Hono.js',
        role: {
          en: 'Lightweight web standards routing, edge APIs & fast microservices',
          id: 'Perutean berbasis standar web ringan, API edge & microservice cepat',
        },
        context: 'Cloud Edge APIs',
      },
      {
        name: 'MySQL',
        role: {
          en: 'Relational database schema design, indexing & transaction safety',
          id: 'Desain skema basis data relasional, pengindeksan & keamanan transaksi',
        },
        context: 'CritiPlay & Pilketos',
      },
      {
        name: 'PostgreSQL',
        role: {
          en: 'Advanced relational persistence, schemas & ACID compliance',
          id: 'Penyimpanan data relasional lanjutan, skema & kepatuhan ACID',
        },
        context: 'Database Engineering',
      },
      {
        name: 'SQLite',
        role: {
          en: 'Embedded zero-configuration local database for caching & apps',
          id: 'Basis data lokal tanpa konfigurasi untuk caching & aplikasi',
        },
        context: 'Embedded Storage',
      },
      {
        name: 'Supabase',
        role: {
          en: 'Postgres cloud infrastructure, real-time channels & Row Level Security',
          id: 'Infrastruktur cloud Postgres, kanal real-time & Row Level Security',
        },
        context: 'Cloud Backend',
      },
      {
        name: 'Odoo ERP',
        role: {
          en: 'Business resource modeling, order workflows & mobile API integration',
          id: 'Pemodelan sumber daya bisnis, alur pesanan & integrasi API mobile',
        },
        context: 'LaundryFlow Backend',
      },
    ],
  },
  {
    id: 'game-dev',
    code: 'SPEC.03',
    title: {
      en: 'Game Development & Interactive Media',
      id: 'Pengembangan Game & Media Interaktif',
    },
    description: {
      en: 'Simulation loops, scene trees, state machines, and interactive mechanics.',
      id: 'Alur simulasi, pohon scene, mesin state, dan mekanika interaktif.',
    },
    items: [
      {
        name: 'Phaser',
        role: {
          en: 'HTML5 2D game framework, sprite animations & educational mechanics',
          id: 'Framework game 2D HTML5, animasi sprite & mekanika edukatif',
        },
        context: 'Daus Anak Soleh',
      },
      {
        name: 'Godot',
        role: {
          en: 'Node-based scene architecture, signal buses & 2D game loops',
          id: 'Arsitektur scene berbasis node, bus sinyal & alur permainan 2D',
        },
        context: 'Game Prototypes',
      },
      {
        name: 'GDScript',
        role: {
          en: 'Gameplay scripting, finite state machines & custom dialogue parsers',
          id: 'Pemrograman mekanika permainan, mesin state & pengurai dialog',
        },
        context: 'Game Systems',
      },
      {
        name: 'Docker',
        role: {
          en: 'Containerization, reproducible deployment stacks & compose orchestration',
          id: 'Kontainerisasi, tumpukan deployment terisolasi & orkestrasi compose',
        },
        context: 'Dragonhold & Tools',
      },
    ],
  },
];

export const EXPERIENCES: ExperienceEntry[] = [
  {
    id: 'exp-pilketos-school',
    index: '01',
    isPlaceholder: false,
    period: {
      en: 'November 7, 2025',
      id: '7 November 2025',
    },
    role: {
      en: 'Lead Web Engineer & Systems Architect',
      id: 'Pengembang Web Utama & Arsitek Sistem',
    },
    organization: {
      en: 'School Project (Website Pilketos)',
      id: 'Proyek Sekolah (Website Pilketos)',
    },
    domain: {
      en: 'Digital Student Council Election & Real-Time Ballot Tally',
      id: 'Sistem Pemilihan Ketua OSIS Digital & Rekapitulasi Real-Time',
    },
    summary: {
      en: 'Engineered the official school student council digital election platform (Website Pilketos), replacing manual paper ballots with a secure, tamper-resistant, real-time responsive web voting system for hundreds of students.',
      id: 'Mengembangkan platform web resmi pemilihan ketua OSIS (Website Pilketos) untuk memodernisasi pemungutan suara sekolah dari surat suara fisik menjadi sistem digital yang terverifikasi, aman, dan real-time untuk ratusan pemilih siswa.',
    },
    deliverables: {
      en: [
        'Designed single-use unique voter token generation and authentication to eliminate duplicate voting and preserve absolute ballot anonymity.',
        'Built real-time administrative vote count visualizer and candidate tally dashboard.',
        'Optimized mobile-first interface for rapid, frictionless voting across concurrent student voter sessions.',
      ],
      id: [
        'Merancang otentikasi token pemilih unik sekali pakai untuk mencegah kecurangan dan menjaga kerahasiaan pilihan pemilih.',
        'Membangun dasbor visualisasi rekapitulasi perolehan suara calon ketua OSIS secara real-time untuk panitia dan siswa.',
        'Mengoptimalkan antarmuka responsif ramah seluler agar ratusan siswa dapat memberikan suara secara serentak tanpa kendala.',
      ],
    },
    technologies: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'Tailwind CSS', 'HTML 5'],
  },
  {
    id: 'exp-daus-gamedev',
    index: '02',
    isPlaceholder: false,
    period: {
      en: 'April 9, 2026',
      id: '9 April 2026',
    },
    role: {
      en: 'Indie Game Developer & Systems Engineer',
      id: 'Pengembang Game Indie & Perekayasa Sistem Game',
    },
    organization: {
      en: 'Indie Game Production (Daus Anak Soleh)',
      id: 'Produksi Game Indie (Daus Anak Soleh)',
    },
    domain: {
      en: '2D Action-Adventure & Educational Game Mechanics',
      id: 'Petualangan Aksi 2D & Mekanika Game Edukasi',
    },
    summary: {
      en: 'Engineered and completed 2D educational children puzzle game "Daus Anak Soleh" using Phaser Framework, HTML 5 Canvas, and JavaScript, teaching Islamic prayer movements (sholat) and recitations through interactive visual gameplay.',
      id: 'Mengembangkan dan menyelesaikan game petualangan edukatif anak 2D "Daus Anak Soleh" menggunakan Phaser Framework, HTML 5 Canvas, dan JavaScript untuk mengajarkan urutan rukun gerakan dan bacaan doa sholat bagi umat muslim.',
    },
    deliverables: {
      en: [
        'Engineered complete 2D HTML 5 Canvas gameplay loop: arcade physics collisions, jump mechanics, and smooth scene transitions in Phaser.',
        'Designed and implemented interactive quiz dialogue mechanics, scoring algorithms, and educational checkpoints.',
        'Assembled pixel-art spritesheets, animations, and sound triggers into a zero-dependency browser gameplay experience published on itch.io.',
      ],
      id: [
        'Membangun loop gameplay HTML 5 Canvas dari nol: deteksi tabrakan fisika arcade, pergerakan platformer, dan transisi scene di Phaser.',
        'Merancang dan mengimplementasikan mekanika dialog kuis edukatif interaktif, kalkulasi skor, serta checkpoint capaian.',
        'Mengintegrasikan spritesheet pixel art, animasi karakter, dan pemicu audio menjadi pengalaman bermain langsung di browser yang dipublikasikan di itch.io.',
      ],
    },
    technologies: ['Phaser', 'JavaScript', 'HTML 5 Canvas', 'Game Physics', 'itch.io'],
  },
  {
    id: 'exp-obathaus',
    index: '03',
    isPlaceholder: false,
    period: {
      en: 'May 7, 2026',
      id: '7 Mei 2026',
    },
    role: {
      en: 'Full-Stack Web Developer & POS Engineer',
      id: 'Pengembang Web Full-Stack & Perekayasa POS',
    },
    organization: {
      en: 'Pharmacy POS & Stock Management (Obat Haus)',
      id: 'Sistem POS & Inventaris Apotek (Obat Haus)',
    },
    domain: {
      en: 'Pharmacy Point of Sale & Atomic Stock Control',
      id: 'Point of Sale Apotek & Pengendalian Stok Atomik',
    },
    summary: {
      en: 'Developed full-stack pharmacy inventory and cashier POS platform using Laravel, Inertia.js, Vue 3, and MySQL, implementing batch tracking, unit conversions, and atomic stock deductions during checkout.',
      id: 'Mengembangkan platform manajemen inventaris dan kasir apotek full-stack menggunakan Laravel, Inertia.js, Vue 3, dan MySQL dengan pelacakan batch kedaluwarsa serta deduksi stok atomik saat checkout kasir.',
    },
    deliverables: {
      en: [
        'Engineered atomic transactional checkout flow preventing negative inventory anomalies under concurrent cashier orders.',
        'Designed normalized relational medicine taxonomy schema supporting generic vs brand-name classification and dosage units.',
        'Implemented reactive Vue 3 and Inertia.js single-page application experience with sub-second instant product search.',
      ],
      id: [
        'Merancang alur transaksi checkout atomik yang mencegah anomali stok negatif saat transaksi kasir berjalan serentak.',
        'Menyusun skema database relasional obat yang mendukung klasifikasi nama generik vs merek dagang serta satuan dosis.',
        'Mengimplementasikan SPA reaktif dengan Vue 3 dan Inertia.js untuk pencarian cepat katalog obat tanpa refresh halaman.',
      ],
    },
    technologies: ['Laravel', 'Inertia.js', 'Vue 3', 'MySQL', 'Tailwind CSS'],
  },
  {
    id: 'exp-coordina',
    index: '04',
    isPlaceholder: false,
    period: {
      en: 'May 18, 2026',
      id: '18 Mei 2026',
    },
    role: {
      en: 'Backend & Real-Time Systems Engineer',
      id: 'Perekayasa Backend & Sistem Real-Time',
    },
    organization: {
      en: 'Real-Time Event Broadcasting (Coordina)',
      id: 'Platform Penyiaran Event Real-Time (Coordina)',
    },
    domain: {
      en: 'WebSocket Infrastructure & Real-Time Collaboration',
      id: 'Infrastruktur WebSocket & Kolaborasi Real-Time',
    },
    summary: {
      en: 'Developed real-time event broadcasting platform using Laravel, Vite, Tailwind CSS 4, and WebSockets (Pusher / Laravel Echo) for instantaneous live state distribution across connected clients.',
      id: 'Mengembangkan platform penyiaran event real-time menggunakan Laravel, Vite, Tailwind CSS 4, dan WebSocket (Pusher / Laravel Echo) untuk sinkronisasi state instan antar pengguna yang terhubung.',
    },
    deliverables: {
      en: [
        'Implemented low-latency bidirectional event broadcasting over secure WebSocket channels.',
        'Designed presence channels and connection lifecycle monitoring with sub-100ms message delivery.',
        'Built responsive team dispatch dashboard with reactive activity streams and notification telemetry.',
      ],
      id: [
        'Mengimplementasikan penyiaran event dua arah berlatensi rendah melalui channel WebSocket yang aman.',
        'Merancang presence channel dan pemantauan siklus koneksi pengguna dengan transmisi pesan di bawah 100 milidetik.',
        'Membangun dasbor koordinasi tim yang responsif dengan feed aktivitas langsung dan telemetri notifikasi.',
      ],
    },
    technologies: ['Laravel', 'Vite', 'Tailwind CSS 4', 'WebSockets', 'Pusher', 'Laravel Echo'],
  },
  {
    id: 'exp-critiplay-collab',
    index: '05',
    isPlaceholder: false,
    period: {
      en: 'August 28, 2026',
      id: '28 Agustus 2026',
    },
    role: {
      en: 'Lead Full-Stack Architect & Product Designer',
      id: 'Lead Full-Stack Architect & Desainer Produk',
    },
    organization: {
      en: 'Collaborative Project (w/ Khairul)',
      id: 'Proyek Kolaborasi (bersama Khairul)',
    },
    domain: {
      en: 'Community Game Review & Platform Architecture',
      id: 'Platform Penilaian & Komunitas Game',
    },
    summary: {
      en: 'Collaborative web platform developed with partner Khairul. I spearheaded the product concept, visual theme, and UI/UX design; architected the complete backend from scratch (Laravel REST API with PostgreSQL on Neon DB); and completed the frontend finishing and post-publishing optimization. Built with a decoupled architecture separating the Vercel frontend from the dedicated backend API server.',
      id: 'Platform ulasan game kolaboratif yang dikembangkan bersama mitra Khairul. Saya memimpin konsep produk, tema visual, dan desain UI/UX; merancang seluruh backend dari nol (Laravel REST API dengan PostgreSQL di Neon DB); serta menyelesaikan finishing frontend dan penyempurnaan pasca-publikasi. Dibangun dengan arsitektur decoupled yang memisahkan frontend Vercel dari server API backend terpisah.',
    },
    deliverables: {
      en: [
        'Conceived and crafted complete product vision, visual theme, responsive typography, and reactive UI architecture in React & Tailwind CSS.',
        'Architected and built 100% of the backend infrastructure: relational database schemas, secure authentication, and performant REST APIs in Laravel.',
        'Configured decoupled production deployment: frontend hosted on Vercel, separate dedicated backend API server, and serverless PostgreSQL on Neon DB.',
        'Executed frontend finishing, responsive polish, and post-release performance optimization on live production platform.',
      ],
      id: [
        'Merancang visi produk menyeluruh, tema visual, tipografi responsif, dan arsitektur UI reaktif menggunakan React & Tailwind CSS.',
        'Membangun 100% infrastruktur backend: skema database relasional, autentikasi aman, dan endpoint RESTful API di Laravel.',
        'Mengonfigurasi deployment arsitektur terpisah: frontend di-host di Vercel, server API backend terpisah, dan basis data serverless PostgreSQL di Neon DB.',
        'Melakukan finishing frontend, polesan responsif, dan optimasi performa pasca-rilis pada platform live.',
      ],
    },
    technologies: ['React', 'TypeScript', 'Laravel', 'PostgreSQL', 'Neon DB', 'Vercel', 'Tailwind CSS', 'REST API'],
  },
  {
    id: 'exp-dragonhold-independent',
    index: '06',
    isPlaceholder: true,
    period: {
      en: 'Active Development // Blank Slot',
      id: 'Dalam Pengerjaan // Dikosongkan Sementara',
    },
    role: {
      en: 'Independent Project: Dragonhold (In-Progress)',
      id: 'Proyek Independen: Dragonhold (Belum Selesai)',
    },
    organization: {
      en: 'Independent Project (Reserved Blank Slot)',
      id: 'Proyek Independen (Slot Dikosongkan Sementara)',
    },
    domain: {
      en: 'Full-Stack Web & Systems Architecture',
      id: 'Arsitektur Sistem & Web Full-Stack',
    },
    summary: {
      en: 'Independent project Dragonhold is currently under active development and not yet finished. This slot is reserved and left blank for now until project completion and release.',
      id: 'Proyek independen Dragonhold saat ini masih dalam proses pengerjaan dan belum selesai. Slot ini dicadangkan dan dikosongkan untuk saat ini hingga proyek rampung dan dirilis.',
    },
    deliverables: {
      en: [
        '[Under Active Development]: Core systems, services, and architecture currently being developed.',
        '[Blank for Now]: Technical details, metrics, and case study will be published once project is completed.',
      ],
      id: [
        '[Dalam Pengembangan]: Arsitektur inti, layanan, dan sistem sedang dikembangkan.',
        '[Dikosongkan Sementara]: Rincian teknis, metrik, dan studi kasus akan diisi setelah proyek selesai.',
      ],
    },
    technologies: ['Next.js 16', 'Hono', 'Drizzle ORM', 'PostgreSQL', 'pnpm Monorepo'],
  },
];

export const CERTIFICATES: CertificateEntry[] = [
  {
    id: 'cert-dicoding-ai',
    code: 'CERT-01',
    isPlaceholder: false,
    title: {
      en: 'Belajar Dasar AI (Basic Artificial Intelligence)',
      id: 'Belajar Dasar AI (Artificial Intelligence Fundamentals)',
    },
    issuer: {
      en: 'Dicoding Indonesia & Google Cloud Partner',
      id: 'Dicoding Indonesia & Google Cloud Partner',
    },
    date: {
      en: 'October 4, 2025',
      id: '4 Oktober 2025',
    },
    category: {
      en: 'Artificial Intelligence & Machine Learning',
      id: 'Kecerdasan Buatan & Machine Learning',
    },
    credentialId: 'KEXL21330ZG2',
    credentialUrl: 'https://www.dicoding.com/certificates/KEXL21330ZG2',
    hours: '10 Jam Pembelajaran',
    images: [
      '/images/certificate/Dicoding dasar AI.jpg',
      '/images/certificate/Dicoding dasar AI2.jpg',
    ],
    description: {
      en: 'Verified competency certificate awarded by Dicoding Indonesia in partnership with Google Cloud for mastering foundational concepts of AI, Data for AI, Machine Learning principles, and Deep Learning neural architectures (10 hours of coursework with examination).',
      id: 'Sertifikat kompetensi kelulusan resmi dari Dicoding Indonesia bermitra dengan Google Cloud. Mempelajari konsep fundamental AI, pemanfaatan data untuk AI, pengantar Machine Learning, hingga arsitektur Deep Learning dengan total 10 jam kurikulum teruji.',
    },
    skills: ['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Neural Networks', 'Google Cloud Partner'],
    statusNote: {
      en: 'Verified Competency Certificate (Valid through October 4, 2028)',
      id: 'Sertifikat Kompetensi Terverifikasi (Berlaku hingga 4 Oktober 2028)',
    },
  },
  {
    id: 'cert-ddc-2026',
    code: 'CERT-02',
    isPlaceholder: false,
    title: {
      en: 'Dicoding Developer Conference 2026',
      id: 'Dicoding Developer Conference 2026',
    },
    issuer: {
      en: 'Dicoding Indonesia (Strategic Partner: EKRAF)',
      id: 'Dicoding Indonesia (Strategic Partner: EKRAF)',
    },
    date: {
      en: 'April 25, 2026',
      id: '25 April 2026',
    },
    category: {
      en: 'Developer Conference & Tech Ecosystem',
      id: 'Konferensi Pengembang & Ekosistem Teknologi',
    },
    hours: 'Full-Day Conference',
    images: [
      '/images/certificate/Sertifikat DDC 2026.jpg',
    ],
    description: {
      en: 'Official Certificate of Attendance awarded to Sakti Arif D.S for participating in the Dicoding Developer Conference (DDC) 2026 in Bandung. Featuring cutting-edge sessions on modern software engineering, AI advancements, and developer career scaling.',
      id: 'Sertifikat kehadiran resmi yang diberikan kepada Sakti Arif D.S atas keikutsertaannya dalam Dicoding Developer Conference (DDC) 2026 di Bandung. Membahas perkembangan rekayasa perangkat lunak modern, integrasi AI, serta percepatan karier teknologi.',
    },
    skills: ['Software Engineering', 'AI Trends', 'Tech Conference', 'Developer Community', 'Ecosystem'],
    statusNote: {
      en: 'Official Attendance Certificate (Bandung, April 25, 2026)',
      id: 'Sertifikat Kehadiran Resmi (Bandung, 25 April 2026)',
    },
  },
];

export function getProjectBySlug(slug: string): ProjectEntry | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: ProjectEntry;
  next: ProjectEntry;
} {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const safeIndex = index === -1 ? 0 : index;
  const prev = PROJECTS[(safeIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(safeIndex + 1) % PROJECTS.length];
  return { prev, next };
}

export function tField(field: LocalizedText, locale: Locale): string {
  return field[locale] ?? field.en;
}

