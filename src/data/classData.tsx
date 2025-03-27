
import { BookOpen, Users, Monitor, Calendar, Clock, Award } from 'lucide-react';
import { Class } from '@/types/classTypes';

export const classes: Class[] = [
  {
    icon: <Monitor className="h-8 w-8 text-digiblue-600" />,
    title: 'Digital Marketing Essentials',
    description: 'Kelas intensif 3 hari untuk memahami dasar-dasar digital marketing yang efektif.',
    details: {
      duration: '3 hari (6 jam/hari)',
      participants: 'Maksimal 20 orang',
      level: 'Pemula',
      schedule: 'Fleksibel (Online/Offline)'
    },
    topics: [
      'Dasar-dasar Digital Marketing',
      'SEO & SEM Fundamentals',
      'Social Media Marketing',
      'Content Marketing Strategy',
      'Email Marketing',
      'Analytics & Measurement'
    ]
  },
  {
    icon: <BookOpen className="h-8 w-8 text-digiblue-600" />,
    title: 'Web Development Bootcamp',
    description: 'Bootcamp intensif pengembangan website dari dasar hingga mampu membangun website sendiri.',
    details: {
      duration: '5 hari (8 jam/hari)',
      participants: 'Maksimal 15 orang',
      level: 'Pemula hingga Menengah',
      schedule: 'Batch Bulanan'
    },
    topics: [
      'HTML, CSS Fundamentals',
      'JavaScript Essentials',
      'Responsive Web Design',
      'Website Optimization',
      'Basic Backend Integration',
      'Project Development'
    ]
  },
  {
    icon: <Users className="h-8 w-8 text-digiblue-600" />,
    title: 'Social Media Management',
    description: 'Kelas pengelolaan media sosial profesional untuk meningkatkan engagement dan konversi.',
    details: {
      duration: '2 hari (7 jam/hari)',
      participants: 'Maksimal 25 orang',
      level: 'Semua Level',
      schedule: 'Bulanan'
    },
    topics: [
      'Content Planning & Calendar',
      'Visual Content Creation',
      'Community Management',
      'Advertising on Social Media',
      'Analytics & Reporting',
      'Crisis Management'
    ]
  },
  {
    icon: <Calendar className="h-8 w-8 text-digiblue-600" />,
    title: 'Content Creation Masterclass',
    description: 'Kelas pembuatan konten berkualitas tinggi untuk berbagai platform digital.',
    details: {
      duration: '3 hari (5 jam/hari)',
      participants: 'Maksimal 20 orang',
      level: 'Menengah',
      schedule: 'Kuartalan'
    },
    topics: [
      'Content Strategy Development',
      'Copywriting for Digital',
      'Visual Content Creation',
      'Video Content Production',
      'SEO Content Optimization',
      'Content Distribution'
    ]
  },
  {
    icon: <Award className="h-8 w-8 text-digiblue-600" />,
    title: 'UX/UI Design Workshop',
    description: 'Workshop desain pengalaman pengguna untuk menciptakan produk digital yang user-friendly.',
    details: {
      duration: '4 hari (6 jam/hari)',
      participants: 'Maksimal 15 orang',
      level: 'Menengah hingga Lanjutan',
      schedule: 'Per Kuartal'
    },
    topics: [
      'User Research Methods',
      'Information Architecture',
      'Wireframing & Prototyping',
      'Visual Design Principles',
      'Usability Testing',
      'Design Systems'
    ]
  },
  {
    icon: <Clock className="h-8 w-8 text-digiblue-600" />,
    title: 'E-commerce Business Class',
    description: 'Kelas komprehensif untuk memulai dan mengembangkan bisnis e-commerce yang sukses.',
    details: {
      duration: '3 hari (7 jam/hari)',
      participants: 'Maksimal 20 orang',
      level: 'Semua Level',
      schedule: 'Tiap 2 Bulan'
    },
    topics: [
      'E-commerce Business Model',
      'Platform Selection & Setup',
      'Product Photography',
      'Inventory & Fulfillment',
      'Customer Service Excellence',
      'Growth & Scaling Strategies'
    ]
  },
];
