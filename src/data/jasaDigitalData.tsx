
import React from 'react';
import { 
  Code, 
  PenTool, 
  Megaphone, 
  FileText, 
  Camera, 
  FileCog, 
  DatabaseIcon, 
  Server, 
  LineChart, 
  Share2 
} from 'lucide-react';
import { ServiceProps } from '@/components/jasa-digital/ServiceCard';

export const jasaDigitalServices: ServiceProps[] = [
  {
    icon: <Code className="h-8 w-8 text-digiblue-600" />,
    title: 'Pengembangan Website & Aplikasi',
    description: 'Kami mengembangkan website dan aplikasi yang responsif, cepat, dan SEO-friendly untuk berbagai kebutuhan bisnis.',
    items: [
      'Website Perusahaan & Landing Page',
      'Toko Online & E-commerce',
      'Aplikasi Web Custom',
      'Aplikasi Mobile (Android & iOS)',
      'Sistem Informasi & Database',
      'Integrasi API & Sistem Third-party'
    ]
  },
  {
    icon: <PenTool className="h-8 w-8 text-digiblue-600" />,
    title: 'Desain Grafis',
    description: 'Tim desainer kami akan membuat visual menarik yang mencerminkan identitas brand Anda.',
    items: [
      'Desain Logo & Branding',
      'UI/UX Design',
      'Desain Media Sosial',
      'Infografis & Presentasi',
      'Desain Kemasan Produk',
      'Desain Marketing Materials'
    ]
  },
  {
    icon: <Megaphone className="h-8 w-8 text-digiblue-600" />,
    title: 'Digital Marketing & Branding',
    description: 'Strategi pemasaran digital yang efektif untuk meningkatkan brand awareness dan penjualan.',
    items: [
      'Social Media Marketing',
      'Search Engine Optimization (SEO)',
      'Google Ads & Facebook Ads',
      'Email Marketing',
      'Content Marketing',
      'Brand Strategy & Development'
    ]
  },
  {
    icon: <FileText className="h-8 w-8 text-digiblue-600" />,
    title: 'Manajemen Konten',
    description: 'Pembuatan dan pengelolaan konten berkualitas untuk website dan media sosial Anda.',
    items: [
      'Copywriting & Blog Writing',
      'Konten Media Sosial',
      'Pengelolaan Konten Website',
      'Strategi Konten',
      'Penerbitan Konten Berkala',
      'Optimasi Konten untuk SEO'
    ]
  },
  {
    icon: <Camera className="h-8 w-8 text-digiblue-600" />,
    title: 'Edit Video dan Fotografi',
    description: 'Layanan profesional untuk kebutuhan visual media dan marketing Anda.',
    items: [
      'Foto Produk & Corporate',
      'Videografi Produk & Promosi',
      'Editing Video Profesional',
      'Motion Graphics & Animation',
      'Live Streaming Setup',
      'Podcast Production'
    ]
  },
  {
    icon: <FileCog className="h-8 w-8 text-digiblue-600" />,
    title: 'Administrasi Digital',
    description: 'Pengelolaan sistem digital dan automasi untuk efisiensi operasional bisnis.',
    items: [
      'Document Management System',
      'Workflow Automation',
      'Data Entry & Processing',
      'Cloud Storage Setup',
      'Digital Asset Management',
      'System Integration'
    ]
  },
  {
    icon: <DatabaseIcon className="h-8 w-8 text-digiblue-600" />,
    title: 'Database Management',
    description: 'Pengelolaan dan optimasi database untuk kebutuhan bisnis dan aplikasi Anda.',
    items: [
      'Perancangan & Implementasi Database',
      'Migrasi Database',
      'Database Optimization',
      'Data Backup & Recovery',
      'Data Warehouse Solutions',
      'Big Data Processing'
    ]
  },
  {
    icon: <Server className="h-8 w-8 text-digiblue-600" />,
    title: 'Hosting & Domain Management',
    description: 'Layanan hosting dan pengelolaan domain yang handal untuk website dan aplikasi.',
    items: [
      'Web Hosting Setup',
      'Domain Registration & Management',
      'Server Configuration',
      'SSL Certificate Setup',
      'Website Maintenance',
      'Performance Optimization'
    ]
  },
  {
    icon: <LineChart className="h-8 w-8 text-digiblue-600" />,
    title: 'Analytics & Reporting',
    description: 'Analisis data dan pembuatan laporan untuk mengukur performa digital Anda.',
    items: [
      'Google Analytics Setup',
      'Performance Dashboards',
      'Competitive Analysis',
      'Custom Reports',
      'User Behavior Analysis',
      'Conversion Tracking'
    ]
  },
  {
    icon: <Share2 className="h-8 w-8 text-digiblue-600" />,
    title: 'Social Media Management',
    description: 'Pengelolaan media sosial untuk meningkatkan engagement dan brand awareness.',
    items: [
      'Content Planning & Calendar',
      'Community Management',
      'Social Media Audit',
      'Influencer Collaboration',
      'Social Media Advertising',
      'Performance Analysis'
    ]
  }
];
