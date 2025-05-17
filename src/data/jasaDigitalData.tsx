
import React from 'react';
import { 
  Code, 
  PenTool, 
  Megaphone, 
  Camera
} from 'lucide-react';

export interface ServiceProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
  slug?: string;
  image?: string;
  category?: string;
  packages?: ServicePackageProps[];
}

export interface ServicePackageProps {
  name: string;
  description: string;
  priceRange: string;
  features: string[];
  recommended?: boolean;
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
    category: 'Development',
    packages: [
      {
        name: "Basic Website",
        description: "Ideal untuk bisnis kecil dan UMKM",
        priceRange: "Rp 1.500.000 - Rp 3.000.000",
        features: [
          "5 Halaman Website",
          "Responsive Design",
          "Basic SEO",
          "Form Kontak",
          "Integrasi Media Sosial"
        ]
      },
      {
        name: "Professional Website",
        description: "Solusi lengkap untuk bisnis menengah",
        priceRange: "Rp 3.500.000 - Rp 8.000.000",
        features: [
          "10-15 Halaman Website",
          "Responsive Design",
          "Advanced SEO",
          "CMS Admin Panel",
          "Integrasi Pembayaran",
          "Hosting 1 Tahun"
        ],
        recommended: true
      },
      {
        name: "E-Commerce Solution",
        description: "Platform online shop komprehensif",
        priceRange: "Rp 8.500.000 - Rp 15.000.000",
        features: [
          "Website E-commerce Lengkap",
          "Katalog Produk Unlimited",
          "Sistem Keranjang & Checkout",
          "Integrasi Multiple Payment",
          "Dashboard Admin",
          "Laporan Penjualan",
          "Maintenance 6 Bulan"
        ]
      }
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
    ],
    slug: 'desain-grafis',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    category: 'Design',
    packages: [
      {
        name: "Logo Design",
        description: "Desain logo profesional untuk brand Anda",
        priceRange: "Rp 750.000 - Rp 2.500.000",
        features: [
          "3 Konsep Logo",
          "3x Revisi",
          "File Source (AI/PSD)",
          "File Format (PNG/JPG/PDF)",
          "Brand Guidelines Simple"
        ]
      },
      {
        name: "Brand Identity Package",
        description: "Paket lengkap identitas visual brand",
        priceRange: "Rp 3.000.000 - Rp 7.500.000",
        features: [
          "Logo Design",
          "Business Card Design",
          "Letterhead & Envelope",
          "Brand Guidelines",
          "Social Media Templates",
          "5x Revisi"
        ],
        recommended: true
      },
      {
        name: "Marketing Material Design",
        description: "Desain material marketing untuk berbagai kebutuhan",
        priceRange: "Rp 500.000 - Rp 2.000.000 (per item)",
        features: [
          "Brosur/Flyer Design",
          "Banner/Poster Design",
          "Social Media Content",
          "Packaging Design",
          "Infografis",
          "3x Revisi per Item"
        ]
      }
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
    ],
    slug: 'digital-marketing',
    image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    category: 'Marketing',
    packages: [
      {
        name: "Social Media Management",
        description: "Pengelolaan media sosial untuk bisnis Anda",
        priceRange: "Rp 2.000.000 - Rp 5.000.000 /bulan",
        features: [
          "Pengelolaan 2 Platform",
          "12 Konten per Bulan",
          "Content Planning",
          "Caption Writing",
          "Basic Analytics Report"
        ]
      },
      {
        name: "Digital Marketing Campaign",
        description: "Kampanye iklan digital multi-platform",
        priceRange: "Rp 5.000.000 - Rp 15.000.000 /bulan",
        features: [
          "Social Media Ads",
          "Google Ads",
          "Landing Page Design",
          "Targeting Audience",
          "Performance Analytics",
          "Monthly Report"
        ],
        recommended: true
      },
      {
        name: "SEO Package",
        description: "Optimasi mesin pencari untuk website Anda",
        priceRange: "Rp 3.500.000 - Rp 8.000.000 /bulan",
        features: [
          "Website Audit",
          "Keyword Research",
          "On-page SEO",
          "Content Optimization",
          "Backlink Building",
          "Monthly Reporting"
        ]
      }
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
    ],
    slug: 'foto-dan-videografi',
    image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    category: 'Video',
    packages: [
      {
        name: "Product Photography",
        description: "Foto produk profesional untuk katalog dan e-commerce",
        priceRange: "Rp 100.000 - Rp 500.000 /produk",
        features: [
          "White Background",
          "3 Angle per Produk",
          "Basic Retouching",
          "High Resolution",
          "Format Digital"
        ]
      },
      {
        name: "Company Profile Video",
        description: "Video profil perusahaan profesional",
        priceRange: "Rp 5.000.000 - Rp 15.000.000",
        features: [
          "Durasi 2-3 Menit",
          "Script Writing",
          "Full HD Quality",
          "Professional Voiceover",
          "Background Music",
          "2x Revisi"
        ],
        recommended: true
      },
      {
        name: "Social Media Video Package",
        description: "Paket video untuk konten media sosial",
        priceRange: "Rp 3.000.000 - Rp 8.000.000 /bulan",
        features: [
          "4 Video per Bulan",
          "Durasi 30-60 detik",
          "Script Writing",
          "Motion Graphics",
          "Format Custom (Story, Post, Reels)",
          "1x Revisi per Video"
        ]
      }
    ]
  }
];
