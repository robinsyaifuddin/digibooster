
import { Laptop, Users, Video, BookOpen, Calendar, Clock } from 'lucide-react';
import { ReactNode } from 'react';

export interface TrainingDetail {
  duration: string;
  schedule: string;
  participants: string;
  level: string;
  instructor: string;
  price: string;
  location: string;
}

export interface TrainingProgram {
  id: number;
  type: 'shortclass' | 'bootcamp' | 'webinar';
  title: string;
  description: string;
  icon: string; // Changed from ReactNode to string to store icon name
  iconComponent: keyof typeof iconComponents; // Add iconComponent property to specify which icon to use
  image: string;
  details: TrainingDetail;
  topics: string[];
  featured?: boolean;
}

// Define an object with all the icon components we need
export const iconComponents = {
  Laptop,
  Users,
  Video,
  BookOpen,
  Calendar,
  Clock
};

export const trainingPrograms: TrainingProgram[] = [
  // Short Class Programs
  {
    id: 1,
    type: 'shortclass',
    title: 'UI/UX Design Fundamentals',
    description: 'Pelajari dasar-dasar desain antarmuka dan pengalaman pengguna untuk membangun produk digital yang user-friendly.',
    icon: "h-8 w-8 text-digiblue-600",
    iconComponent: "Laptop",
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-1.2.1',
    details: {
      duration: '2 hari (6 jam/hari)',
      schedule: '1-2 Oktober 2023',
      participants: 'Maksimal 20 orang',
      level: 'Pemula',
      instructor: 'Amanda Pratiwi',
      price: 'Rp 1.500.000',
      location: 'Online via Zoom'
    },
    topics: [
      'Prinsip Dasar UI/UX Design',
      'User Research & Personas',
      'Wireframing & Prototyping',
      'Design Systems',
      'Usability Testing',
      'Design Tools (Figma)'
    ],
    featured: true
  },
  {
    id: 2,
    type: 'shortclass',
    title: 'Social Media Marketing Strategy',
    description: 'Kuasai strategi pemasaran di platform media sosial untuk meningkatkan brand awareness dan konversi.',
    icon: "h-8 w-8 text-digiblue-600",
    iconComponent: "Users",
    image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-1.2.1',
    details: {
      duration: '3 hari (4 jam/hari)',
      schedule: '15-17 Oktober 2023',
      participants: 'Maksimal 25 orang',
      level: 'Pemula hingga Menengah',
      instructor: 'Budi Santoso',
      price: 'Rp 1.800.000',
      location: 'Online via Zoom'
    },
    topics: [
      'Content Strategy for Social Media',
      'Instagram & TikTok Marketing',
      'Facebook & LinkedIn Business',
      'Content Creation & Planning',
      'Social Media Analytics',
      'Paid Social Campaigns'
    ]
  },
  {
    id: 3,
    type: 'shortclass',
    title: 'Video Editing for Content Creators',
    description: 'Belajar teknik editing video profesional untuk membuat konten yang menarik dan berkualitas tinggi.',
    icon: "h-8 w-8 text-digiblue-600",
    iconComponent: "Video",
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-1.2.1',
    details: {
      duration: '2 hari (5 jam/hari)',
      schedule: '22-23 Oktober 2023',
      participants: 'Maksimal 15 orang',
      level: 'Pemula',
      instructor: 'Dian Pramana',
      price: 'Rp 1.200.000',
      location: 'Online via Zoom'
    },
    topics: [
      'Dasar Editing Video',
      'Teknik Transisi & Efek',
      'Color Grading',
      'Sound Design',
      'Penggunaan Adobe Premiere Pro',
      'Export & Optimasi Video'
    ]
  },
  
  // Bootcamp Programs
  {
    id: 4,
    type: 'bootcamp',
    title: 'Full-Stack Web Development Bootcamp',
    description: 'Program intensif untuk menguasai pengembangan website dari front-end hingga back-end dengan teknologi terkini.',
    icon: "h-8 w-8 text-digiblue-600",
    iconComponent: "Laptop",
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1',
    details: {
      duration: '8 minggu (40 jam/minggu)',
      schedule: '1 November - 24 Desember 2023',
      participants: 'Maksimal 20 orang',
      level: 'Pemula hingga Menengah',
      instructor: 'Tim Instruktur DigiBooster',
      price: 'Rp 15.000.000',
      location: 'Hybrid (Offline & Online)'
    },
    topics: [
      'HTML, CSS & JavaScript',
      'React.js Frontend Development',
      'Node.js & Express Backend',
      'Database Design & Management',
      'API Development',
      'Deployment & DevOps',
      'Portfolio Project'
    ],
    featured: true
  },
  {
    id: 5,
    type: 'bootcamp',
    title: 'Digital Marketing Career Bootcamp',
    description: 'Bootcamp komprehensif untuk mempersiapkan karir di bidang digital marketing dengan sertifikasi industri.',
    icon: "h-8 w-8 text-digiblue-600",
    iconComponent: "BookOpen",
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1',
    details: {
      duration: '6 minggu (30 jam/minggu)',
      schedule: '15 November - 20 Desember 2023',
      participants: 'Maksimal 25 orang',
      level: 'Semua Level',
      instructor: 'Tim Digital Marketing DigiBooster',
      price: 'Rp 12.500.000',
      location: 'Hybrid (Offline & Online)'
    },
    topics: [
      'Strategic Digital Marketing',
      'Search Engine Optimization (SEO)',
      'Search Engine Marketing (SEM)',
      'Social Media Marketing',
      'Content Marketing',
      'Email Marketing',
      'Analytics & Data-driven Marketing',
      'Real-world Campaign Project'
    ]
  },
  {
    id: 6,
    type: 'bootcamp',
    title: 'Data Science & Analytics Bootcamp',
    description: 'Program intensif untuk belajar analisis data, visualisasi, dan machine learning untuk aplikasi bisnis.',
    icon: "h-8 w-8 text-digiblue-600",
    iconComponent: "Laptop",
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1',
    details: {
      duration: '10 minggu (35 jam/minggu)',
      schedule: '5 Desember 2023 - 15 Februari 2024',
      participants: 'Maksimal 20 orang',
      level: 'Menengah hingga Lanjutan',
      instructor: 'Tim Data Science DigiBooster',
      price: 'Rp 17.500.000',
      location: 'Hybrid (Offline & Online)'
    },
    topics: [
      'Python for Data Science',
      'Data Analysis & Visualization',
      'Statistical Analysis',
      'Machine Learning Fundamentals',
      'Data Engineering Basics',
      'Predictive Modeling',
      'Business Intelligence',
      'Capstone Project'
    ]
  },
  
  // Webinar Programs
  {
    id: 7,
    type: 'webinar',
    title: 'Digital Transformation for Business',
    description: 'Webinar tentang transformasi digital untuk mempersiapkan bisnis menghadapi era digital yang berkembang pesat.',
    icon: "h-8 w-8 text-digiblue-600",
    iconComponent: "Calendar",
    image: 'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-1.2.1',
    details: {
      duration: '2 jam',
      schedule: '10 Oktober 2023, 10:00 - 12:00 WIB',
      participants: 'Tidak terbatas',
      level: 'Semua Level',
      instructor: 'Dr. Agus Hermawan',
      price: 'Rp 150.000',
      location: 'Online via Zoom'
    },
    topics: [
      'Tren Transformasi Digital',
      'Teknologi Disruptif',
      'Digital Business Model',
      'Implementasi Strategi Digital',
      'Studi Kasus Perusahaan Sukses'
    ],
    featured: true
  },
  {
    id: 8,
    type: 'webinar',
    title: 'Personal Branding in Digital Era',
    description: 'Pelajari cara membangun personal branding yang kuat di era digital untuk meningkatkan karir dan bisnis Anda.',
    icon: "h-8 w-8 text-digiblue-600",
    iconComponent: "Users",
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1',
    details: {
      duration: '2 jam',
      schedule: '17 Oktober 2023, 19:00 - 21:00 WIB',
      participants: 'Tidak terbatas',
      level: 'Pemula hingga Menengah',
      instructor: 'Ratna Dewi',
      price: 'Rp 100.000',
      location: 'Online via Zoom'
    },
    topics: [
      'Konsep Personal Branding',
      'Membangun Identitas Digital',
      'Content Strategy untuk Personal Brand',
      'Networking Digital',
      'Monetisasi Personal Brand'
    ]
  },
  {
    id: 9,
    type: 'webinar',
    title: 'AI for Creative Industry',
    description: 'Webinar tentang pemanfaatan kecerdasan buatan (AI) untuk meningkatkan kreativitas dan produktivitas di industri kreatif.',
    icon: "h-8 w-8 text-digiblue-600",
    iconComponent: "Clock",
    image: 'https://images.unsplash.com/photo-1677442135148-58d576d9d4f5?ixlib=rb-1.2.1',
    details: {
      duration: '2 jam',
      schedule: '25 Oktober 2023, 14:00 - 16:00 WIB',
      participants: 'Tidak terbatas',
      level: 'Semua Level',
      instructor: 'Andi Wijaya',
      price: 'Rp 125.000',
      location: 'Online via Zoom'
    },
    topics: [
      'Pengenalan AI untuk Kreatif',
      'Tools AI untuk Design & Content',
      'AI dalam Produksi Video & Audio',
      'AI untuk Copywriting',
      'Etika Penggunaan AI'
    ]
  }
];
