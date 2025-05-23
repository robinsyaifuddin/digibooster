
import React from 'react';
import { 
  Code, 
  PenTool, 
  Megaphone, 
  Camera,
  Monitor,
  User,
  Building,
  Shield,
  Heart,
  Palette,
  Users,
  Play,
  Edit,
  Brush,
  Share2,
  Target,
  Mail,
  MessageCircle,
  FileText
} from 'lucide-react';

export interface ServiceSubcategoryProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  priceRange: string;
  duration: string;
  popular?: boolean;
}

export interface ServiceProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
  slug?: string;
  image?: string;
  category?: string;
  packages?: ServicePackageProps[];
  subcategories?: ServiceSubcategoryProps[];
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
    icon: <Code className="h-6 w-6 text-sky-500" />,
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
    subcategories: [
      {
        id: 'landing-page',
        title: 'Landing Page',
        description: 'Website satu halaman yang dirancang khusus untuk konversi dan penjualan produk atau layanan Anda.',
        icon: <Monitor className="h-5 w-5 text-sky-500" />,
        features: [
          'Design responsif dan modern',
          'Optimasi untuk konversi',
          'Form capture leads',
          'Integrasi analytics',
          'Loading speed optimal'
        ],
        priceRange: 'Rp 2.500.000 - Rp 5.000.000',
        duration: '5-7 hari kerja'
      },
      {
        id: 'personal-corporate',
        title: 'Website Pribadi/Lembaga',
        description: 'Website profesional untuk personal branding atau profil lembaga dengan fitur lengkap.',
        icon: <User className="h-5 w-5 text-sky-500" />,
        features: [
          'Halaman profil lengkap',
          'Portfolio/galeri',
          'Blog dan artikel',
          'Kontak dan lokasi',
          'SEO friendly'
        ],
        priceRange: 'Rp 3.000.000 - Rp 8.000.000',
        duration: '7-10 hari kerja',
        popular: true
      },
      {
        id: 'admin-panel',
        title: 'Website Panel Admin',
        description: 'Sistem manajemen konten dengan dashboard admin untuk mengelola website dan data bisnis.',
        icon: <Shield className="h-5 w-5 text-sky-500" />,
        features: [
          'Dashboard admin lengkap',
          'Manajemen user dan role',
          'CRUD data sistem',
          'Laporan dan analytics',
          'Keamanan berlapis'
        ],
        priceRange: 'Rp 8.000.000 - Rp 15.000.000',
        duration: '14-21 hari kerja'
      },
      {
        id: 'wedding-invitation',
        title: 'Website Undangan',
        description: 'Website undangan digital yang elegan untuk pernikahan atau acara spesial lainnya.',
        icon: <Heart className="h-5 w-5 text-sky-500" />,
        features: [
          'Design tema romantis',
          'Countdown timer acara',
          'RSVP dan konfirmasi tamu',
          'Galeri foto couple',
          'Musik background'
        ],
        priceRange: 'Rp 1.500.000 - Rp 3.500.000',
        duration: '3-5 hari kerja'
      },
      {
        id: 'custom-website',
        title: 'Website Custom',
        description: 'Solusi website khusus sesuai kebutuhan spesifik bisnis Anda dengan fitur unik.',
        icon: <Building className="h-5 w-5 text-sky-500" />,
        features: [
          'Analisis kebutuhan mendalam',
          'Fitur custom sesuai bisnis',
          'Integrasi sistem existing',
          'Scalable architecture',
          'Support dan maintenance'
        ],
        priceRange: 'Rp 12.000.000 - Rp 50.000.000',
        duration: '21-60 hari kerja'
      }
    ],
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
    icon: <PenTool className="h-6 w-6 text-sky-500" />,
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
    subcategories: [
      {
        id: 'rebrand-logo',
        title: 'Rebrand/Pembuatan Logo',
        description: 'Pembuatan atau refresh logo brand Anda dengan konsep yang modern dan memorable.',
        icon: <Palette className="h-5 w-5 text-sky-500" />,
        features: [
          '3-5 konsep logo berbeda',
          'Unlimited revisi',
          'File vector dan raster',
          'Brand guidelines',
          'Hak cipta penuh'
        ],
        priceRange: 'Rp 1.500.000 - Rp 5.000.000',
        duration: '7-10 hari kerja',
        popular: true
      },
      {
        id: 'poster-design',
        title: 'Desain Poster',
        description: 'Desain poster menarik untuk promosi, event, atau keperluan marketing lainnya.',
        icon: <FileText className="h-5 w-5 text-sky-500" />,
        features: [
          'Konsep kreatif original',
          'High resolution print ready',
          'Format digital dan print',
          '3x revisi gratis',
          'Template variations'
        ],
        priceRange: 'Rp 500.000 - Rp 2.000.000',
        duration: '3-5 hari kerja'
      },
      {
        id: 'ui-ux-design',
        title: 'UI/UX Design',
        description: 'Desain antarmuka dan pengalaman pengguna yang intuitif untuk aplikasi dan website.',
        icon: <Monitor className="h-5 w-5 text-sky-500" />,
        features: [
          'User research dan analisis',
          'Wireframe dan prototype',
          'Visual design modern',
          'Responsive design',
          'Usability testing'
        ],
        priceRange: 'Rp 5.000.000 - Rp 20.000.000',
        duration: '14-30 hari kerja'
      }
    ],
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
    icon: <Megaphone className="h-6 w-6 text-sky-500" />,
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
    subcategories: [
      {
        id: 'social-media-management',
        title: 'Manajemen Media Sosial',
        description: 'Pengelolaan media sosial profesional untuk meningkatkan engagement dan brand awareness.',
        icon: <Share2 className="h-5 w-5 text-sky-500" />,
        features: [
          'Content planning & strategy',
          'Posting schedule optimization',
          'Community management',
          'Analytics & reporting',
          'Hashtag research'
        ],
        priceRange: 'Rp 2.500.000 - Rp 8.000.000/bulan',
        duration: 'Bulanan',
        popular: true
      },
      {
        id: 'ads-management',
        title: 'Pembuatan Iklan Ads',
        description: 'Kampanye iklan berbayar di Google, Facebook, Instagram untuk target audience yang tepat.',
        icon: <Target className="h-5 w-5 text-sky-500" />,
        features: [
          'Campaign strategy & setup',
          'Audience targeting',
          'Ad creative design',
          'Budget optimization',
          'Performance monitoring'
        ],
        priceRange: 'Rp 3.000.000 - Rp 12.000.000/bulan',
        duration: 'Bulanan'
      },
      {
        id: 'email-marketing',
        title: 'Email Marketing',
        description: 'Kampanye email marketing untuk nurturing leads dan meningkatkan customer retention.',
        icon: <Mail className="h-5 w-5 text-sky-500" />,
        features: [
          'Email template design',
          'List segmentation',
          'Automated sequences',
          'A/B testing',
          'Performance analytics'
        ],
        priceRange: 'Rp 1.500.000 - Rp 5.000.000/bulan',
        duration: 'Bulanan'
      },
      {
        id: 'wa-blaster',
        title: 'WA Blaster',
        description: 'Sistem broadcast WhatsApp untuk marketing dan komunikasi massal dengan customer.',
        icon: <MessageCircle className="h-5 w-5 text-sky-500" />,
        features: [
          'Multi-device broadcasting',
          'Contact management',
          'Message scheduling',
          'Auto-reply setup',
          'Delivery reports'
        ],
        priceRange: 'Rp 2.000.000 - Rp 6.000.000/bulan',
        duration: 'Bulanan'
      },
      {
        id: 'content-writing',
        title: 'Copy/Content Writing',
        description: 'Pembuatan konten dan copywriting yang persuasif untuk berbagai platform marketing.',
        icon: <Edit className="h-5 w-5 text-sky-500" />,
        features: [
          'SEO-optimized content',
          'Sales copy & landing page',
          'Social media captions',
          'Blog articles',
          'Product descriptions'
        ],
        priceRange: 'Rp 500.000 - Rp 2.500.000/konten',
        duration: '3-7 hari kerja'
      }
    ],
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
    icon: <Camera className="h-6 w-6 text-sky-500" />,
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
    subcategories: [
      {
        id: 'personal-photography',
        title: 'Fotografer Pribadi',
        description: 'Layanan fotografi personal untuk berbagai kebutuhan seperti portrait, prewedding, dan acara pribadi.',
        icon: <Users className="h-5 w-5 text-sky-500" />,
        features: [
          'Portrait photography',
          'Prewedding & engagement',
          'Family & lifestyle',
          'Professional headshots',
          'Event documentation'
        ],
        priceRange: 'Rp 1.500.000 - Rp 8.000.000/sesi',
        duration: '4-8 jam sesi',
        popular: true
      },
      {
        id: 'product-photography',
        title: 'Foto Produk',
        description: 'Fotografi produk profesional untuk e-commerce, katalog, dan kebutuhan marketing.',
        icon: <Camera className="h-5 w-5 text-sky-500" />,
        features: [
          'White background clean',
          'Lifestyle product shots',
          'Multiple angles',
          'High resolution',
          'Basic retouching'
        ],
        priceRange: 'Rp 150.000 - Rp 500.000/produk',
        duration: '1-2 hari kerja'
      },
      {
        id: 'cinematic-video',
        title: 'Video Sinematik',
        description: 'Produksi video sinematik berkualitas tinggi untuk company profile, wedding, dan event.',
        icon: <Play className="h-5 w-5 text-sky-500" />,
        features: [
          'Cinematic storytelling',
          '4K video quality',
          'Professional equipment',
          'Color grading',
          'Background music'
        ],
        priceRange: 'Rp 5.000.000 - Rp 25.000.000/project',
        duration: '7-14 hari kerja'
      },
      {
        id: 'photo-editing',
        title: 'Editing Foto',
        description: 'Layanan editing dan retouching foto profesional untuk berbagai kebutuhan.',
        icon: <Brush className="h-5 w-5 text-sky-500" />,
        features: [
          'Color correction',
          'Skin retouching',
          'Background removal',
          'Object manipulation',
          'Creative effects'
        ],
        priceRange: 'Rp 50.000 - Rp 300.000/foto',
        duration: '1-3 hari kerja'
      },
      {
        id: 'video-editing',
        title: 'Editing Video',
        description: 'Editing video profesional dengan motion graphics dan effects untuk konten yang menarik.',
        icon: <Edit className="h-5 w-5 text-sky-500" />,
        features: [
          'Professional video editing',
          'Motion graphics',
          'Sound design',
          'Color correction',
          'Multiple format export'
        ],
        priceRange: 'Rp 500.000 - Rp 3.000.000/project',
        duration: '3-7 hari kerja'
      }
    ],
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
