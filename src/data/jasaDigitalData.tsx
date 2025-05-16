
import React from 'react';
import { 
  Code, 
  PenTool, 
  Megaphone, 
  FileText, 
  Camera, 
  Share2 
} from 'lucide-react';

export interface ServiceProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
  slug?: string;
  image?: string;
  category?: string;
}

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
    ],
    slug: 'website-dan-aplikasi',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    category: 'Development'
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
    ],
    slug: 'desain-grafis',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    category: 'Design'
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
    ],
    slug: 'digital-marketing',
    image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    category: 'Marketing'
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
    ],
    slug: 'manajemen-konten',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    category: 'Content'
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
    ],
    slug: 'foto-dan-videografi',
    image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    category: 'Video'
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
    ],
    slug: 'manajemen-sosial-media',
    image: 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    category: 'Marketing'
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
    ],
    slug: 'api-integration',
    image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    category: 'Development'
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
    ],
    slug: 'ui-ux-design',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    category: 'Design'
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
    ],
    slug: 'seo-management',
    image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    category: 'SEO'
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
    ],
    slug: 'content-strategy',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    category: 'Content'
  }
];
