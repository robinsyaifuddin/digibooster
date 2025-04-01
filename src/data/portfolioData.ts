
import { PortfolioItemType } from '@/types/portfolioTypes';

export const portfolioItems: PortfolioItemType[] = [
  {
    id: 1,
    title: 'Website E-commerce Fashion',
    client: 'FashionStyle Boutique',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Pengembangan website e-commerce modern dengan fitur katalog produk, keranjang belanja, pembayaran terintegrasi, dan sistem manajemen inventori.',
    services: ['Web Development', 'UI/UX Design', 'Payment Integration']
  },
  {
    id: 2,
    title: 'Rebranding Digital Agency',
    client: 'CreativePulse Agency',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Proses rebranding menyeluruh meliputi logo baru, guidelines brand, stationery design, dan implementasi identitas pada seluruh aset digital.',
    services: ['Brand Strategy', 'Logo Design', 'Brand Guidelines', 'Marketing Collateral']
  },
  {
    id: 3,
    title: 'Kampanye Digital Marketing',
    client: 'NutriHealth Products',
    category: 'Digital Marketing',
    image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Kampanye pemasaran digital terintegrasi untuk meluncurkan produk baru dengan strategi konten, social media, dan paid advertising.',
    services: ['Content Strategy', 'Social Media Management', 'Google & Facebook Ads', 'Analytics & Reporting']
  },
  {
    id: 4,
    title: 'Aplikasi Mobile Fintech',
    client: 'EasyPay Solutions',
    category: 'App Development',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Pengembangan aplikasi mobile untuk layanan keuangan digital dengan fitur pembayaran, transfer, dan manajemen keuangan pribadi.',
    services: ['Mobile App Development', 'UI/UX Design', 'Backend Integration', 'Security Implementation']
  },
  {
    id: 5,
    title: 'Produksi Video Korporat',
    client: 'IndustrialTech Corporation',
    category: 'Video Production',
    image: 'https://images.unsplash.com/photo-1579165466949-3180a0d950f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Produksi video perusahaan untuk memperkenalkan visi, misi, dan layanan dengan teknik storytelling yang menarik dan profesional.',
    services: ['Script Writing', 'Videography', 'Animation', 'Post-Production', 'Sound Design']
  },
  {
    id: 6,
    title: 'Sistem Manajemen Konten',
    client: 'EduLearn Platform',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Pengembangan sistem manajemen konten khusus untuk platform pembelajaran online dengan fitur kursus, materi, dan penilaian terintegrasi.',
    services: ['Custom CMS Development', 'Learning Management System', 'User Authentication', 'Content Delivery']
  }
];

export const portfolioFilters = [
  "All",
  "Web Development",
  "Branding",
  "Digital Marketing",
  "App Development",
  "Video Production"
];
