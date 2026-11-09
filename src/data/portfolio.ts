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
    demo?: string;
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
}

export const OWNER_PROFILE = {
  name: 'Sakti',
  handle: 'sakti.dev',
  email: 'sakti@example.com', // [OWNER INPUT]: Replace with actual email address
  github: 'https://github.com/', // [OWNER INPUT]: Replace with actual GitHub profile URL
  linkedin: 'https://linkedin.com/', // [OWNER INPUT]: Replace with actual LinkedIn profile URL
};

export const PROJECTS: ProjectEntry[] = [
  {
    slug: 'critiplay',
    index: '01',
    name: 'CritiPlay',
    disciplineGroup: 'fullstack',
    category: {
      en: 'Full-Stack Web Platform',
      id: 'Platform Web Full-Stack',
    },
    tagline: {
      en: 'A structured game rating and editorial review platform built with React, TypeScript, Laravel, and MySQL.',
      id: 'Platform penilaian dan ulasan game terstruktur yang dibangun dengan React, TypeScript, Laravel, dan MySQL.',
    },
    description: {
      en: 'CritiPlay is a full-stack web platform designed for cataloging, rating, and reviewing video games. It pairs a typed React & TypeScript client interface with a RESTful Laravel backend and a relational MySQL schema.',
      id: 'CritiPlay adalah platform web full-stack yang dirancang untuk mengatalogkan, memberi nilai, dan mengulas video game. Proyek ini memadukan antarmuka klien React & TypeScript bertipe kuat dengan backend RESTful Laravel serta skema relasional MySQL.',
    },
    editorialOverview: {
      en: [
        'CritiPlay was conceived to bring editorial structure to community game reviews. Rather than treating user ratings as isolated numbers, the platform organizes games by metadata, release taxonomy, and written critical perspectives.',
        'From an engineering standpoint, CritiPlay separates presentation state from domain validation: a React and TypeScript frontend handles responsive filtering, review composition, and rating breakdowns, while a Laravel API manages authentication, relational queries, and score aggregation over MySQL.',
      ],
      id: [
        'CritiPlay dirancang untuk menghadirkan struktur editorial pada ulasan game komunitas. Alih-alih memperlakukan penilaian pengguna sekadar sebagai angka tunggal, platform ini mengorganisasikan game berdasarkan metadata, taksonomi rilis, dan ulasan tertulis yang terstruktur.',
        'Dari sisi rekayasa perangkat lunak, CritiPlay memisahkan state antarmuka dari validasi domain: frontend React dan TypeScript menangani penyaringan interaktif, penulisan ulasan, dan rincian skor, sementara API Laravel mengelola autentikasi, kueri relasional, serta agregasi penilaian di atas MySQL.',
      ],
    },
    coverImage: '/images/projects/critiplay-cover.svg',
    techStack: ['React', 'TypeScript', 'Laravel', 'MySQL', 'REST API', 'Tailwind CSS'],
    role: {
      en: 'Full-Stack Developer (Architecture, Frontend & Backend API)',
      id: 'Pengembang Full-Stack (Arsitektur, Frontend & API Backend)',
    },
    status: {
      en: 'Functional Prototype / Active Development',
      id: 'Prototipe Fungsional / Pengembangan Aktif',
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
          en: 'Relational Schema Design for Multi-Criteria Reviews',
          id: 'Desain Skema Relasional untuk Ulasan Multi-Kriteria',
        },
        problem: {
          en: 'Querying game listings alongside aggregated review scores and user metadata can introduce N+1 query bottlenecks as catalog data grows.',
          id: 'Mengambil daftar game beserta agregasi skor ulasan dan metadata pengguna berisiko memicu masalah kueri N+1 saat data katalog bertambah.',
        },
        solution: {
          en: 'Structured Eloquent relationships with eager loading, indexed foreign keys in MySQL, and dedicated Laravel API Resource transformers to keep response payloads predictable.',
          id: 'Menyusun relasi Eloquent dengan eager loading, indeks kunci asing di MySQL, serta transformer API Resource Laravel khusus agar ukuran respons tetap terukur.',
        },
      },
      {
        title: {
          en: 'Synchronizing Optimistic UI State with Backend Validation',
          id: 'Sinkronisasi State Antarmuka dengan Validasi Backend',
        },
        problem: {
          en: 'Submitting or editing a review requires immediate visual feedback without risking inconsistent rating totals.',
          id: 'Pengiriman atau penyuntingan ulasan membutuhkan umpan balik visual instan tanpa mengorbankan konsistensi total penilaian.',
        },
        solution: {
          en: 'Implemented strict TypeScript form state handling paired with structured validation responses from Laravel controllers.',
          id: 'Menerapkan pengelolaan state formulir TypeScript yang ketat yang dipadukan dengan respons validasi terstruktur dari controller Laravel.',
        },
      },
    ],
    anatomyLayers: [
      {
        id: 'client',
        code: 'LAYER 01',
        layerName: {
          en: 'Client Presentation & State',
          id: 'Presentasi Klien & State',
        },
        tech: 'React + TypeScript',
        summary: {
          en: 'Component-driven catalog grids, review composer, and typed API hooks.',
          id: 'Grid katalog berbasis komponen, editor ulasan, dan hook API bertipe kuat.',
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
          en: 'Application & Domain API',
          id: 'Aplikasi & API Domain',
        },
        tech: 'Laravel (PHP)',
        summary: {
          en: 'RESTful controllers, request validation, authentication guards, and resource serialization.',
          id: 'Controller RESTful, validasi request, penjaga autentikasi, dan serialisasi resource.',
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
          en: 'Relational Persistence',
          id: 'Penyimpanan Relasional',
        },
        tech: 'MySQL',
        summary: {
          en: 'Normalized tables for games, genres, users, ratings, and review threads.',
          id: 'Tabel ternormalisasi untuk data game, genre, pengguna, penilaian, dan ulasan.',
        },
        specs: {
          en: ['Foreign key constraints', 'Indexed lookup columns', 'Aggregated score calculation queries'],
          id: ['Batasan kunci asing (Foreign Key)', 'Kolom pencarian terindeks', 'Kueri kalkulasi agregasi skor'],
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
        imageSrc: '/images/projects/critiplay-cover.svg',
        diagramType: 'interface',
      },
      {
        id: 'cp-plate-2',
        plateNumber: 'PLATE II',
        title: {
          en: 'React–Laravel–MySQL Data Flow',
          id: 'Alur Data React–Laravel–MySQL',
        },
        caption: {
          en: 'Request lifecycle from typed TypeScript client actions through Laravel controllers to MySQL relational storage.',
          id: 'Siklus request dari aksi klien TypeScript melewati controller Laravel menuju penyimpanan relasional MySQL.',
        },
        aspectRatio: '16/9',
        imageSrc: '/images/projects/critiplay-arch.svg',
        diagramType: 'architecture',
      },
    ],
    links: {
      note: {
        en: 'Repository & live demo URLs can be attached in src/data/portfolio.ts',
        id: 'Tautan repositori & demo langsung dapat ditambahkan di src/data/portfolio.ts',
      },
    },
  },
  {
    slug: 'laundryflow',
    index: '02',
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
        'Staff can intake garments, assign service types, update washing/ironing/ready stages, and synchronize order records directly with Odoo models—eliminating manual double-entry between mobile operators and backend administration.',
      ],
      id: [
        'Bisnis layanan operasional membutuhkan pencatatan data yang cepat dan praktis di lapangan, sekaligus memerlukan pembukuan dan pencatatan terstruktur di sistem pusat. LaundryFlow menjembatani kebutuhan tersebut dengan memadukan klien mobile Flutter yang responsif dan backend Odoo.',
        'Staf operasional dapat mencatat penerimaan pakaian, menentukan jenis layanan, memperbarui tahapan pencucian/penyetrikaan/siap ambil, serta menyinkronkan data pesanan langsung dengan model Odoo—menghilangkan pencatatan ganda secara manual.',
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
      note: {
        en: 'Repository & build links can be configured in src/data/portfolio.ts',
        id: 'Tautan repositori & paket aplikasi dapat diatur di src/data/portfolio.ts',
      },
    },
  },
  {
    slug: 'negeri-kelabu',
    index: '03',
    name: 'Negeri Kelabu',
    disciplineGroup: 'gamedev',
    category: {
      en: 'Indie Game Development (Life-Sim RPG)',
      id: 'Pengembangan Game Indie (RPG Simulasi Kehidupan)',
    },
    tagline: {
      en: 'An indie life-simulation RPG concept developed with Godot.',
      id: 'Konsep game RPG simulasi kehidupan indie yang dikembangkan menggunakan Godot.',
    },
    description: {
      en: 'Negeri Kelabu is an independent life-simulation RPG concept built in Godot Engine. It explores everyday routines, atmospheric world-building, character interactions, and time-driven state progression.',
      id: 'Negeri Kelabu adalah konsep RPG simulasi kehidupan independen yang dikembangkan di Godot Engine. Proyek ini mengeksplorasi rutinitas keseharian, pembangunan atmosfer dunia, interaksi antarkarakter, dan progresi state berbasis waktu.',
    },
    editorialOverview: {
      en: [
        'Negeri Kelabu ("The Grey Land") investigates how quiet, grounded daily mechanics can tell a resonant story. Rather than centering purely on combat loops, the concept focuses on life-simulation rhythms—managing time, navigating social dialogues, and observing subtle environmental shifts.',
        'Developed in Godot, the project emphasizes modular scene composition, signal-driven communication between gameplay systems, and a clean separation between narrative data and world rendering.',
      ],
      id: [
        'Negeri Kelabu mengeksplorasi bagaimana mekanika keseharian yang tenang dan membumi dapat menyampaikan cerita yang berkesan. Alih-alih hanya berpusat pada pertarungan, konsep ini menonjolkan ritme simulasi kehidupan—mengelola waktu, menjalin dialog sosial, dan mengamati perubahan lingkungan.',
        'Dikembangkan menggunakan Godot, proyek ini menekankan komposisi scene yang modular, komunikasi berbasis sinyal (signal-driven) antarsistem permainan, serta pemisahan yang rapi antara data narasi dan perenderan dunia.',
      ],
    },
    coverImage: '/images/projects/negeri-kelabu-cover.svg',
    techStack: ['Godot Engine', 'GDScript', 'State Machines', '2D/RPG Systems', 'Scene Architecture'],
    role: {
      en: 'Solo Game Developer & Systems Designer',
      id: 'Pengembang Game Independen & Perancang Sistem',
    },
    status: {
      en: 'Concept & Systems Prototype',
      id: 'Konsep & Prototipe Sistem',
    },
    features: [
      {
        code: 'NK-01',
        title: {
          en: 'Time & Daily Rhythm Simulation',
          id: 'Simulasi Waktu & Ritme Harian',
        },
        description: {
          en: 'World state system tracking day phases, environmental mood transitions, and schedule-aware interactions.',
          id: 'Sistem state dunia yang melacak fase waktu harian, transisi suasana lingkungan, dan interaksi yang peka terhadap jadwal.',
        },
      },
      {
        code: 'NK-02',
        title: {
          en: 'Modular Dialogue & Event Architecture',
          id: 'Arsitektur Dialog & Event Modular',
        },
        description: {
          en: 'Data-driven conversation nodes and conditional triggers that respond to player choices and world variables.',
          id: 'Node percakapan berbasis data dan pemicu bersyarat yang merespons pilihan pemain serta variabel dunia.',
        },
      },
      {
        code: 'NK-03',
        title: {
          en: 'Godot Node & Signal Composition',
          id: 'Komposisi Node & Signal Godot',
        },
        description: {
          en: 'Decoupled character controllers, interaction zones, and HUD overlays communicating via Godot signals.',
          id: 'Pengendali karakter, zona interaksi, dan antarmuka HUD terpisah yang saling berkomunikasi melalui sinyal Godot.',
        },
      },
    ],
    challenges: [
      {
        title: {
          en: 'Decoupling World State from Individual Scenes',
          id: 'Memisahkan State Dunia dari Scene Individual',
        },
        problem: {
          en: 'In a life-simulation RPG, transitioning between indoor and outdoor scenes must preserve time progression, NPC states, and inventory data seamlessly.',
          id: 'Dalam RPG simulasi kehidupan, perpindahan antar-scene dalam dan luar ruangan harus mempertahankan progresi waktu, status NPC, dan data inventaris secara mulus.',
        },
        solution: {
          en: 'Designed autoloaded manager singletons and signal buses in Godot so scene transitions read and mutate a unified world state smoothly.',
          id: 'Merancang singleton pengelola (Autoload) dan bus sinyal di Godot sehingga perpindahan scene membaca serta memperbarui state dunia terpadu secara konsisten.',
        },
      },
      {
        title: {
          en: 'Structuring Scalable Narrative & Interaction Logic',
          id: 'Menyusun Logika Narasi & Interaksi yang Mudah Dikembangkan',
        },
        problem: {
          en: 'Hardcoding dialogue branches inside character scripts quickly becomes brittle as world interactions grow.',
          id: 'Menanamkan percabangan dialog secara langsung di dalam skrip karakter akan cepat menjadi rumit seiring bertambahnya interaksi dunia.',
        },
        solution: {
          en: 'Separated interaction triggers from dialogue data structures, allowing reusable interaction components across different NPCs and objects.',
          id: 'Memisahkan pemicu interaksi dari struktur data dialog, sehingga komponen interaksi dapat digunakan kembali di berbagai NPC dan objek.',
        },
      },
    ],
    anatomyLayers: [
      {
        id: 'world-loop',
        code: 'LAYER 01',
        layerName: {
          en: 'World Simulation & Time Manager',
          id: 'Simulasi Dunia & Pengelola Waktu',
        },
        tech: 'Godot Autoload + GDScript',
        summary: {
          en: 'Global clock, day-cycle state broadcasts, and persistent world flags.',
          id: 'Jam global, penyiaran status siklus hari, dan penanda state dunia persisten.',
        },
        specs: {
          en: ['Signal-driven phase transitions', 'Scene-persistent state dictionary', 'Ambient lighting / mood hooks'],
          id: ['Transisi fase berbasis sinyal', 'Penyimpanan state lintas scene', 'Pengait pencahayaan & atmosfer'],
        },
      },
      {
        id: 'entity-fsm',
        code: 'LAYER 02',
        layerName: {
          en: 'Character & Interaction State Machine',
          id: 'Mesin State Karakter & Interaksi',
        },
        tech: 'Godot Nodes + Finite State Machine',
        summary: {
          en: 'Handles movement, collision raycasts/areas, and context-sensitive interaction prompts.',
          id: 'Menangani pergerakan, deteksi area interaksi, dan pemicu aksi kontekstual.',
        },
        specs: {
          en: ['Idle / Move / Interact states', 'Area2D interactionables', 'Decoupled input handling'],
          id: ['State Diam / Bergerak / Interaksi', 'Deteksi objek Area2D', 'Pengelolaan input terpisah'],
        },
      },
      {
        id: 'narrative-ui',
        code: 'LAYER 03',
        layerName: {
          en: 'Dialogue & HUD Presentation Layer',
          id: 'Lapisan Presentasi Dialog & HUD',
        },
        tech: 'Godot Control Nodes',
        summary: {
          en: 'Renders dialogue sequences, choice prompts, and non-intrusive life-sim HUD indicators.',
          id: 'Merender rangkaian dialog, pilihan respons, dan indikator HUD simulasi yang tidak mengganggu layar.',
        },
        specs: {
          en: ['Structured dialogue parser', 'Condition-checked choices', 'Minimalist atmospheric UI'],
          id: ['Pengurai dialog terstruktur', 'Pilihan dengan pemeriksaan kondisi', 'UI atmosferik minimalis'],
        },
      },
    ],
    gallery: [
      {
        id: 'nk-plate-1',
        plateNumber: 'PLATE I',
        title: {
          en: 'World Viewport & Atmospheric HUD Concept',
          id: 'Konsep Viewport Dunia & HUD Atmosferik',
        },
        caption: {
          en: 'Visual blueprint of Negeri Kelabu showing day-phase indicators, interaction zones, and narrative dialogue framing.',
          id: 'Cetak biru visual Negeri Kelabu yang menampilkan indikator fase hari, zona interaksi, dan pembingkaian dialog naratif.',
        },
        aspectRatio: '16/9',
        imageSrc: '/images/projects/negeri-kelabu-cover.svg',
        diagramType: 'interface',
      },
      {
        id: 'nk-plate-2',
        plateNumber: 'PLATE II',
        title: {
          en: 'Godot Scene Tree & Signal Bus Architecture',
          id: 'Arsitektur Pohon Scene & Bus Sinyal Godot',
        },
        caption: {
          en: 'System diagram illustrating how the Time Manager, Player FSM, and Dialogue Controller communicate without tight coupling.',
          id: 'Diagram sistem yang mengilustrasikan komunikasi antara Pengelola Waktu, FSM Pemain, dan Pengendali Dialog tanpa ketergantungan kaku.',
        },
        aspectRatio: '16/9',
        imageSrc: '/images/projects/negeri-kelabu-arch.svg',
        diagramType: 'architecture',
      },
    ],
    links: {
      note: {
        en: 'Devlog or playable build links can be added in src/data/portfolio.ts',
        id: 'Tautan devlog atau build permainan dapat ditambahkan di src/data/portfolio.ts',
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
        name: 'React & Next.js',
        role: {
          en: 'Component architecture, routing & SSR/SSG web applications',
          id: 'Arsitektur komponen, perutean & aplikasi web modern',
        },
        context: 'CritiPlay / Web Systems',
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
        name: 'Flutter & Dart',
        role: {
          en: 'Cross-platform mobile UI & operational workflow apps',
          id: 'Antarmuka mobile lintas platform & aplikasi alur kerja operasional',
        },
        context: 'LaundryFlow',
      },
      {
        name: 'Tailwind CSS',
        role: {
          en: 'Design token systems, responsive grids & utility styling',
          id: 'Sistem token desain, grid responsif & penataan gaya terukur',
        },
        context: 'Web Interfaces',
      },
    ],
  },
  {
    id: 'backend-data',
    code: 'SPEC.02',
    title: {
      en: 'Backend, API & Enterprise Systems',
      id: 'Backend, API & Sistem Enterprise',
    },
    description: {
      en: 'Server-side logic, relational data modeling, and business process integration.',
      id: 'Logika sisi server, pemodelan data relasional, dan integrasi proses bisnis.',
    },
    items: [
      {
        name: 'Laravel (PHP)',
        role: {
          en: 'RESTful API design, authentication, Eloquent ORM & validation',
          id: 'Desain API RESTful, autentikasi, Eloquent ORM & validasi',
        },
        context: 'CritiPlay Backend',
      },
      {
        name: 'MySQL',
        role: {
          en: 'Relational database schema design, indexing & query optimization',
          id: 'Desain skema basis data relasional, pengindeksan & optimasi kueri',
        },
        context: 'CritiPlay Persistence',
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
      en: 'Game Development & Interactive Systems',
      id: 'Pengembangan Game & Sistem Interaktif',
    },
    description: {
      en: 'Simulation loops, scene trees, state machines, and interactive storytelling tools.',
      id: 'Alur simulasi, pohon scene, mesin state, dan perangkat penceritaan interaktif.',
    },
    items: [
      {
        name: 'Godot Engine',
        role: {
          en: 'Node-based scene architecture, signal systems & 2D/3D game loops',
          id: 'Arsitektur scene berbasis node, sistem sinyal & alur permainan',
        },
        context: 'Negeri Kelabu',
      },
      {
        name: 'GDScript',
        role: {
          en: 'Gameplay scripting, finite state machines & custom dialogue parsers',
          id: 'Pemrograman mekanika permainan, mesin state & pengurai dialog',
        },
        context: 'Negeri Kelabu',
      },
      {
        name: 'Systems & Narrative Design',
        role: {
          en: 'Life-simulation mechanics, progression balancing & world state logic',
          id: 'Mekanika simulasi kehidupan, keseimbangan progresi & logika state dunia',
        },
        context: 'Interactive Prototypes',
      },
    ],
  },
];

export const EXPERIENCES: ExperienceEntry[] = [
  {
    id: 'exp-fullstack-practice',
    index: '01',
    isPlaceholder: false,
    period: {
      en: 'Ongoing Practice',
      id: 'Praktik Berkelanjutan',
    },
    role: {
      en: 'Independent Full-Stack & Mobile Developer',
      id: 'Pengembang Full-Stack & Mobile Independen',
    },
    organization: {
      en: 'Self-Directed Product Engineering',
      id: 'Rekayasa Produk Mandiri',
    },
    domain: {
      en: 'Web Platforms & Mobile ERP Integration',
      id: 'Platform Web & Integrasi ERP Mobile',
    },
    summary: {
      en: 'Designing and building full-stack web applications and mobile operational tools from database schema to user interface, including CritiPlay (React, TypeScript, Laravel, MySQL) and LaundryFlow (Flutter + Odoo).',
      id: 'Merancang dan membangun aplikasi web full-stack serta perangkat operasional mobile mulai dari skema basis data hingga antarmuka pengguna, termasuk CritiPlay (React, TypeScript, Laravel, MySQL) dan LaundryFlow (Flutter + Odoo).',
    },
    deliverables: {
      en: [
        'Architected end-to-end relational schemas and REST API endpoints in Laravel & MySQL for community game ratings in CritiPlay.',
        'Engineered cross-platform mobile workflows in Flutter integrated with an Odoo backend for laundry order management in LaundryFlow.',
        'Established reusable TypeScript component patterns and responsive editorial interfaces.',
      ],
      id: [
        'Merancang skema relasional menyeluruh dan endpoint REST API menggunakan Laravel & MySQL untuk penilaian game di CritiPlay.',
        'Membangun alur kerja mobile lintas platform dengan Flutter yang terintegrasi ke backend Odoo untuk manajemen pesanan di LaundryFlow.',
        'Menyusun pola komponen TypeScript yang dapat digunakan kembali serta antarmuka responsif.',
      ],
    },
    technologies: ['React', 'TypeScript', 'Laravel', 'MySQL', 'Flutter', 'Odoo'],
  },
  {
    id: 'exp-gamedev-practice',
    index: '02',
    isPlaceholder: false,
    period: {
      en: 'Ongoing Exploration',
      id: 'Eksplorasi Berkelanjutan',
    },
    role: {
      en: 'Indie Game Developer & Systems Prototyper',
      id: 'Pengembang Game Indie & Perancang Prototipe Sistem',
    },
    organization: {
      en: 'Independent Game Development',
      id: 'Pengembangan Game Independen',
    },
    domain: {
      en: 'Interactive Simulation & RPG Mechanics',
      id: 'Simulasi Interaktif & Mekanika RPG',
    },
    summary: {
      en: 'Developing Negeri Kelabu in Godot Engine—focusing on life-simulation rhythms, modular scene trees, signal-driven state management, and narrative interaction systems.',
      id: 'Mengembangkan Negeri Kelabu di Godot Engine—berfokus pada ritme simulasi kehidupan, pohon scene modular, pengelolaan state berbasis sinyal, dan sistem interaksi naratif.',
    },
    deliverables: {
      en: [
        'Prototyped global time/day-phase simulation and persistent world state architecture in Godot.',
        'Built decoupled character interaction zones and conditional dialogue structures using GDScript.',
      ],
      id: [
        'Membuat prototipe simulasi fase waktu harian global dan arsitektur state dunia persisten di Godot.',
        'Membangun zona interaksi karakter terpisah serta struktur dialog bersyarat menggunakan GDScript.',
      ],
    },
    technologies: ['Godot Engine', 'GDScript', 'State Machines', 'Game Systems'],
  },
  {
    id: 'exp-placeholder-role',
    index: '03',
    isPlaceholder: true,
    period: {
      en: '[OWNER INPUT: Year – Year]',
      id: '[INPUT PEMILIK: Tahun – Tahun]',
    },
    role: {
      en: '[OWNER INPUT: Formal Role / Internship / Freelance Engagement]',
      id: '[INPUT PEMILIK: Posisi Formal / Magang / Proyek Klien]',
    },
    organization: {
      en: '[OWNER INPUT: Company, Studio, or Academic Institution]',
      id: '[INPUT PEMILIK: Nama Perusahaan, Studio, atau Institusi]',
    },
    domain: {
      en: 'Reserved Career Milestone Slot',
      id: 'Slot Riwayat Karier Formal',
    },
    summary: {
      en: 'Reserved entry for formal employment, internship, or client contract details. Edit this item in src/data/portfolio.ts to publish verified career history.',
      id: 'Slot terstruktur yang disediakan untuk rincian pekerjaan formal, magang, atau kontrak klien. Sunting entri ini di src/data/portfolio.ts untuk menampilkan riwayat karier resmi.',
    },
    deliverables: {
      en: [
        'Replace with factual responsibilities and technical contributions.',
        'Add verified project outcomes or team workflows.',
      ],
      id: [
        'Ganti dengan tanggung jawab faktual dan kontribusi teknis Anda.',
        'Tambahkan hasil proyek atau alur kerja tim yang terverifikasi.',
      ],
    },
    technologies: ['TypeScript', 'Full-Stack', 'Game Dev'],
  },
];

export const CERTIFICATES: CertificateEntry[] = [
  {
    id: 'cert-slot-01',
    code: 'CERT-01',
    isPlaceholder: true,
    title: {
      en: '[OWNER INPUT: Full-Stack / Web Engineering Certificate Title]',
      id: '[INPUT PEMILIK: Judul Sertifikat Rekayasa Web / Full-Stack]',
    },
    issuer: {
      en: '[OWNER INPUT: Issuing Organization / Platform]',
      id: '[INPUT PEMILIK: Institusi / Platform Penerbit]',
    },
    date: {
      en: '[Year / Month]',
      id: '[Tahun / Bulan]',
    },
    category: {
      en: 'Full-Stack & Software Engineering',
      id: 'Rekayasa Perangkat Lunak & Full-Stack',
    },
    statusNote: {
      en: 'Update in src/data/portfolio.ts with official credential ID and verification URL.',
      id: 'Perbarui di src/data/portfolio.ts dengan ID kredensial resmi dan tautan verifikasi.',
    },
  },
  {
    id: 'cert-slot-02',
    code: 'CERT-02',
    isPlaceholder: true,
    title: {
      en: '[OWNER INPUT: Mobile / Backend / Cloud Development Certificate]',
      id: '[INPUT PEMILIK: Sertifikat Pengembangan Mobile / Backend / Cloud]',
    },
    issuer: {
      en: '[OWNER INPUT: Issuing Organization / Academy]',
      id: '[INPUT PEMILIK: Institusi / Akademi Penerbit]',
    },
    date: {
      en: '[Year / Month]',
      id: '[Tahun / Bulan]',
    },
    category: {
      en: 'Mobile & Enterprise Systems',
      id: 'Sistem Mobile & Enterprise',
    },
    statusNote: {
      en: 'Update in src/data/portfolio.ts with official credential ID and verification URL.',
      id: 'Perbarui di src/data/portfolio.ts dengan ID kredensial resmi dan tautan verifikasi.',
    },
  },
  {
    id: 'cert-slot-03',
    code: 'CERT-03',
    isPlaceholder: true,
    title: {
      en: '[OWNER INPUT: Game Development / Computer Science Credential]',
      id: '[INPUT PEMILIK: Kredensial Pengembangan Game / Ilmu Komputer]',
    },
    issuer: {
      en: '[OWNER INPUT: Issuing Institution / Event]',
      id: '[INPUT PEMILIK: Institusi / Penyelenggara]',
    },
    date: {
      en: '[Year / Month]',
      id: '[Tahun / Bulan]',
    },
    category: {
      en: 'Game Development & Interactive Media',
      id: 'Pengembangan Game & Media Interaktif',
    },
    statusNote: {
      en: 'Update in src/data/portfolio.ts with official credential ID and verification URL.',
      id: 'Perbarui di src/data/portfolio.ts dengan ID kredensial resmi dan tautan verifikasi.',
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

