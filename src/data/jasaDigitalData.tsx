
import React from 'react';
import { 
  Code, 
  PenTool, 
  Megaphone, 
  FileText, 
  Camera, 
  Share2 
} from 'lucide-react';
import { ServiceProps } from '@/components/jasa-digital/ServiceCard';

export const jasaDigitalServices: ServiceProps[] = [
  {
    icon: <Code className="h-6 w-6 text-red-500" />,
    title: 'Website & Aplikasi',
    description: 'Solusi digital profesional untuk kebutuhan website dan aplikasi bisnis Anda dengan teknologi terkini.',
    items: [
      'Website Bisnis & Landing Page',
      'E-commerce & Toko Online',
      'Aplikasi Web & Mobile (Android/iOS)',
      'Sistem Informasi & Database',
      'Integrasi API',
      'Website Maintenance'
    ]
  },
  {
    icon: <PenTool className="h-6 w-6 text-red-500" />,
    title: 'Desain Grafis',
    description: 'Layanan desain visual profesional untuk meningkatkan identitas brand dan visual marketing Anda.',
    items: [
      'Logo & Brand Identity',
      'UI/UX Design',
      'Desain Media Sosial',
      'Desain Kemasan Produk',
      'Infografis & Presentasi',
      'Desain Marketing Materials'
    ]
  },
  {
    icon: <Megaphone className="h-6 w-6 text-red-500" />,
    title: 'Digital Marketing',
    description: 'Strategi pemasaran digital komprehensif untuk meningkatkan brand awareness dan penjualan.',
    items: [
      'Social Media Marketing',
      'Search Engine Optimization (SEO)',
      'Google Ads & Meta Ads',
      'Email Marketing',
      'Content Marketing',
      'Influencer Marketing'
    ]
  },
  {
    icon: <FileText className="h-6 w-6 text-red-500" />,
    title: 'Manajemen Konten',
    description: 'Layanan pembuatan dan pengelolaan konten profesional untuk platform digital Anda.',
    items: [
      'Copywriting & Artikel',
      'Content Planning & Calendar',
      'Blog Management',
      'Content Optimization (SEO)',
      'Newsletter Creation',
      'Product Description'
    ]
  },
  {
    icon: <Camera className="h-6 w-6 text-red-500" />,
    title: 'Foto dan Videografi',
    description: 'Layanan visual profesional untuk kebutuhan konten marketing dan branding Anda.',
    items: [
      'Product Photography',
      'Corporate Videography',
      'Video Editing & Animation',
      'Motion Graphics',
      'Social Media Video',
      'Company Profile Video'
    ]
  },
  {
    icon: <Share2 className="h-6 w-6 text-red-500" />,
    title: 'Manajemen Sosial Media',
    description: 'Pengelolaan akun media sosial profesional untuk meningkatkan engagement dan brand awareness.',
    items: [
      'Social Media Management',
      'Content Creation & Posting',
      'Community Management',
      'Performance Analytics',
      'Social Media Ads',
      'Growth Strategy'
    ]
  },
  {
    icon: <Code className="h-6 w-6 text-red-500" />,
    title: 'API Integration',
    description: 'Integrasi sistem dan API untuk menghubungkan berbagai platform digital yang Anda gunakan.',
    items: [
      'Third-party API Integration',
      'Payment Gateway Integration',
      'CRM Integration',
      'Custom API Development',
      'Webhook Setup',
      'API Maintenance'
    ]
  },
  {
    icon: <PenTool className="h-6 w-6 text-red-500" />,
    title: 'UI/UX Design',
    description: 'Desain antarmuka dan pengalaman pengguna yang optimal untuk website dan aplikasi Anda.',
    items: [
      'User Research',
      'Wireframing & Prototyping',
      'UI Design System',
      'Usability Testing',
      'Interaction Design',
      'Design Implementation'
    ]
  },
  {
    icon: <Megaphone className="h-6 w-6 text-red-500" />,
    title: 'SEO Management',
    description: 'Optimasi mesin pencari untuk meningkatkan peringkat website dan trafik organik Anda.',
    items: [
      'Keyword Research',
      'On-page SEO',
      'Technical SEO',
      'Link Building',
      'Local SEO',
      'SEO Audit & Reporting'
    ]
  },
  {
    icon: <FileText className="h-6 w-6 text-red-500" />,
    title: 'Content Strategy',
    description: 'Strategi konten yang efektif untuk mendukung tujuan bisnis dan marketing Anda.',
    items: [
      'Content Audit',
      'Content Calendar Planning',
      'Content Distribution Strategy',
      'Content Performance Analysis',
      'Content Trend Research',
      'Content Optimization'
    ]
  }
];
