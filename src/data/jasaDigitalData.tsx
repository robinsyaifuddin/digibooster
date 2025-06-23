
import React from 'react';
import { 
  Globe, 
  Smartphone, 
  Palette, 
  TrendingUp, 
  Camera, 
  Video,
  Code,
  Database,
  ShoppingCart,
  FileText,
  Users,
  BarChart3,
  Wrench,
  Briefcase,
  Image,
  Mail,
  Search,
  Share2,
  PenTool,
  Target,
  Store,
  Play,
  Clapperboard,
  Edit,
  Drone
} from 'lucide-react';

export interface ServiceSubcategoryProps {
  title: string;
  description: string;
  features: string[];
  priceRange: string;
  originalPrice: string;
  promoPrice: string;
  facilities: string[];
  icon: React.ReactNode;
}

export interface ServiceCategoryProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
  subcategories: ServiceSubcategoryProps[];
}

export const jasaDigitalData: ServiceCategoryProps[] = [
  {
    icon: <Globe className="h-6 w-6 text-sky-400" />,
    title: "Website & Aplikasi",
    description: "Solusi digital komprehensif untuk transformasi bisnis Anda ke era digital",
    items: [
      "Website Landing Page",
      "Website Profil", 
      "Website E-Commerce",
      "Website Portal / Blog",
      "Website Lembaga",
      "Website Dashboard",
      "Aplikasi Mobile",
      "Sistem Informasi",
      "Maintenance Website"
    ],
    subcategories: [
      {
        title: "Website Landing Page",
        description: "Tingkatkan daya tarik promosi produk atau jasa Anda melalui satu halaman profesional yang responsif dan menarik!",
        features: [
          "Desain responsif untuk semua device",
          "1 halaman utama yang optimal",
          "Optimasi SEO dasar",
          "Domain dan hosting included",
          "Contact form terintegrasi",
          "Loading speed yang cepat"
        ],
        facilities: ["Desain responsif", "1 halaman utama", "optimasi SEO", "domain dan hosting"],
        priceRange: "Rp 250.000",
        originalPrice: "Rp 750.000",
        promoPrice: "Rp 250.000",
        icon: <Globe className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Website Profil",
        description: "Bangun citra profesional untuk bisnis atau personal branding Anda dengan website informatif.",
        features: [
          "4-6 halaman profesional",
          "CMS (Content Management System)",
          "Galeri foto interaktif", 
          "Fitur blog terintegrasi",
          "SEO optimization",
          "Mobile responsive design"
        ],
        facilities: ["4–6 halaman", "CMS (Content Management System)", "galeri foto", "fitur blog"],
        priceRange: "Rp 500.000",
        originalPrice: "Rp 1.000.000",
        promoPrice: "Rp 500.000",
        icon: <FileText className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Website E-Commerce",
        description: "Miliki toko online lengkap untuk menjual produk Anda dengan sistem yang aman dan mudah.",
        features: [
          "Katalog produk lengkap",
          "Payment gateway terintegrasi",
          "Admin panel untuk pengelolaan",
          "Sistem inventory management",
          "Customer management",
          "Laporan penjualan"
        ],
        facilities: ["Katalog produk", "payment gateway", "admin panel untuk pengelolaan"],
        priceRange: "Rp 1.500.000",
        originalPrice: "Rp 2.000.000", 
        promoPrice: "Rp 1.500.000",
        icon: <ShoppingCart className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Website Portal / Blog",
        description: "Sajikan konten berita, artikel, atau opini dalam sistem portal yang dinamis dan SEO-friendly.",
        features: [
          "Manajemen artikel lengkap",
          "Struktur SEO optimal",
          "Kategori dan tag system",
          "Comment system",
          "Author management",
          "Social media integration"
        ],
        facilities: ["Manajemen artikel", "struktur SEO optimal"],
        priceRange: "Rp 1.500.000",
        originalPrice: "Rp 2.000.000",
        promoPrice: "Rp 1.500.000", 
        icon: <FileText className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Website Lembaga",
        description: "Ciptakan website resmi untuk sekolah, organisasi, atau komunitas Anda.",
        features: [
          "Halaman profil lengkap",
          "Sistem berita dan pengumuman",
          "Galeri kegiatan",
          "Struktur organisasi",
          "Download center",
          "Event calendar"
        ],
        facilities: ["Halaman profil", "berita", "galeri kegiatan", "struktur organisasi"],
        priceRange: "Rp 1.500.000",
        originalPrice: "Rp 2.000.000",
        promoPrice: "Rp 1.500.000",
        icon: <Users className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Website Dashboard",
        description: "Kelola data internal bisnis Anda dengan panel admin yang lengkap dan efisien.",
        features: [
          "Sistem login multi-level",
          "Visualisasi grafik real-time",
          "Fitur export data",
          "User management",
          "Report generator",
          "Data analytics"
        ],
        facilities: ["Sistem login", "visualisasi grafik", "fitur export data"],
        priceRange: "Rp 2.500.000",
        originalPrice: "Rp 3.000.000",
        promoPrice: "Rp 2.500.000",
        icon: <BarChart3 className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Aplikasi Mobile", 
        description: "Bangun aplikasi Android/iOS untuk pengalaman pengguna yang lebih dekat dan modern.",
        features: [
          "Fitur login dan registrasi",
          "Integrasi API lengkap",
          "Publikasi ke Play Store/App Store",
          "Push notification",
          "Offline capability",
          "User analytics"
        ],
        facilities: ["Fitur login", "integrasi API", "publikasi ke Play Store/App Store"],
        priceRange: "Rp 4.500.000",
        originalPrice: "Rp 5.000.000",
        promoPrice: "Rp 4.500.000",
        icon: <Smartphone className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Sistem Informasi",
        description: "Solusi digital untuk mengelola bisnis Anda secara terintegrasi dan efisien (CRM, POS, ERP).",
        features: [
          "Sistem custom sesuai kebutuhan",
          "Laporan lengkap dan detail",
          "Sesi training penggunaan",
          "Database management",
          "Multi-user access",
          "Data backup otomatis"
        ],
        facilities: ["Sistem custom sesuai kebutuhan", "laporan lengkap", "sesi training penggunaan"],
        priceRange: "Rp 3.000.000",
        originalPrice: "Rp 3.500.000",
        promoPrice: "Rp 3.000.000",
        icon: <Database className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Maintenance Website",
        description: "Jaga performa dan keamanan website Anda setiap bulan dengan layanan perawatan rutin.",
        features: [
          "Backup data otomatis",
          "Update sistem berkala",
          "Audit performa bulanan",
          "Security monitoring",
          "Bug fixing",
          "Performance optimization"
        ],
        facilities: ["Backup data", "update sistem", "audit performa"],
        priceRange: "Rp 500.000/bulan",
        originalPrice: "Rp 1.000.000/bulan",
        promoPrice: "Rp 500.000/bulan",
        icon: <Wrench className="h-5 w-5 text-sky-400" />
      }
    ]
  },
  {
    icon: <Palette className="h-6 w-6 text-sky-400" />,
    title: "Desain Grafis",
    description: "Layanan desain profesional untuk membangun identitas visual brand Anda",
    items: [
      "Logo & Brand Identity",
      "Company Profile",
      "Brosur / Flyer Promosi", 
      "Desain Kemasan Produk",
      "Konten Sosial Media",
      "Banner Digital",
      "Desain UI/UX",
      "Undangan Digital"
    ],
    subcategories: [
      {
        title: "Logo & Brand Identity",
        description: "Bangun identitas brand Anda yang kuat dan profesional sejak awal.",
        features: [
          "3 konsep desain berbeda",
          "File logo final HD/Vector",
          "Panduan brand (brand guideline)",
          "Logo variations",
          "Color palette",
          "Typography guidelines"
        ],
        facilities: ["3 konsep desain", "file logo final (HD)", "panduan brand (brand guideline)"],
        priceRange: "Rp 250.000",
        originalPrice: "Rp 500.000",
        promoPrice: "Rp 250.000",
        icon: <PenTool className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Company Profile",
        description: "Tampilkan profil bisnis Anda dalam bentuk digital maupun cetak yang informatif dan menarik.",
        features: [
          "6-12 halaman profesional",
          "Copywriting dasar included",
          "Layout modern dan menarik",
          "Print-ready files",
          "Digital version",
          "Revisi unlimited"
        ],
        facilities: ["6–12 halaman", "copywriting dasar"],
        priceRange: "Rp 250.000",
        originalPrice: "Rp 500.000",
        promoPrice: "Rp 250.000",
        icon: <Briefcase className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Brosur / Flyer Promosi",
        description: "Sampaikan pesan promosi secara visual dan efektif untuk berbagai media.",
        features: [
          "2 desain versi cetak & digital",
          "Siap produksi (print-ready)",
          "High resolution files",
          "Multiple format output",
          "Color variations",
          "Quick turnaround"
        ],
        facilities: ["2 desain versi cetak & digital", "siap produksi"],
        priceRange: "Rp 150.000",
        originalPrice: "Rp 300.000",
        promoPrice: "Rp 150.000",
        icon: <FileText className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Desain Kemasan Produk",
        description: "Desain kemasan menarik yang meningkatkan nilai jual produk Anda.",
        features: [
          "1 desain kemasan custom",
          "Mockup 3D realistic",
          "Print-ready files",
          "Multiple angles view",
          "Color variations",
          "Technical specifications"
        ],
        facilities: ["1 desain kemasan + mockup 3D"],
        priceRange: "Rp 100.000",
        originalPrice: "Rp 200.000",
        promoPrice: "Rp 100.000",
        icon: <Image className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Konten Sosial Media",
        description: "Bangun branding IG/FB Anda dengan konten desain profesional dan siap posting.",
        features: [
          "10 desain konten editable",
          "Template yang reusable",
          "Brand consistency",
          "Multiple platform sizes",
          "Engagement-focused design",
          "Trend-based aesthetics"
        ],
        facilities: ["10 desain konten editable"],
        priceRange: "Rp 250.000",
        originalPrice: "Rp 500.000", 
        promoPrice: "Rp 250.000",
        icon: <Share2 className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Banner Digital",
        description: "Promosikan bisnis Anda melalui banner digital dengan berbagai ukuran.",
        features: [
          "3 ukuran banner standar",
          "Opsi animasi menarik",
          "Web-optimized files",
          "Multiple format output",
          "Call-to-action focused",
          "Brand compliance"
        ],
        facilities: ["3 ukuran banner", "opsi animasi"],
        priceRange: "Rp 150.000",
        originalPrice: "Rp 300.000",
        promoPrice: "Rp 150.000",
        icon: <Image className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Desain UI/UX",
        description: "Desain antarmuka website/aplikasi yang elegan dan user-friendly.",
        features: [
          "Wireframe professional",
          "Mockup desain lengkap",
          "Tampilan responsif",
          "User experience optimization",
          "Interactive prototypes",
          "Design system"
        ],
        facilities: ["Wireframe", "mockup desain", "tampilan responsif"],
        priceRange: "Rp 200.000",
        originalPrice: "Rp 400.000",
        promoPrice: "Rp 200.000",
        icon: <Code className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Undangan Digital",
        description: "Buat momen spesial lebih berkesan dengan undangan digital yang cantik dan interaktif.",
        features: [
          "1 desain undangan custom",
          "Versi digital & siap cetak",
          "Interactive elements",
          "Animation effects",
          "Multiple format output", 
          "RSVP integration"
        ],
        facilities: ["1 desain undangan versi digital & siap cetak"],
        priceRange: "Rp 150.000",
        originalPrice: "Rp 300.000",
        promoPrice: "Rp 150.000",
        icon: <Mail className="h-5 w-5 text-sky-400" />
      }
    ]
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-sky-400" />,
    title: "Digital Marketing",
    description: "Strategi pemasaran digital untuk meningkatkan visibility dan engagement brand Anda",
    items: [
      "Manajemen Iklan Digital",
      "Layanan SEO",
      "Konten Sosial Media",
      "Email Marketing",
      "Copywriting",
      "Strategi Branding Digital",
      "Optimasi Marketplace"
    ],
    subcategories: [
      {
        title: "Manajemen Iklan Digital",
        description: "Jangkau audiens potensial melalui iklan yang terarah dan terukur.",
        features: [
          "Setup kampanye profesional",
          "Optimasi iklan berkelanjutan",
          "Laporan performa detail",
          "Audience targeting",
          "Budget optimization",
          "A/B testing"
        ],
        facilities: ["Setup kampanye", "optimasi iklan", "laporan performa"],
        priceRange: "Rp 750.000",
        originalPrice: "Rp 1.500.000",
        promoPrice: "Rp 750.000",
        icon: <Target className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Layanan SEO",
        description: "Naikkan peringkat website Anda di Google dengan strategi SEO yang menyeluruh.",
        features: [
          "Audit teknis mendalam",
          "Riset keyword komprehensif",
          "5 artikel SEO-friendly",
          "On-page optimization",
          "Technical SEO",
          "Monthly reporting"
        ],
        facilities: ["Audit teknis", "riset keyword", "5 artikel SEO-friendly"],
        priceRange: "Rp 250.000",
        originalPrice: "Rp 5.000.000",
        promoPrice: "Rp 250.000",
        icon: <Search className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Konten Sosial Media",
        description: "Posting rutin dan konsisten untuk membangun engagement.",
        features: [
          "20 desain konten menarik",
          "Caption yang engaging",
          "Content calendar",
          "Hashtag research",
          "Trend analysis",
          "Performance tracking"
        ],
        facilities: ["20 desain + caption menarik"],
        priceRange: "Rp 500.000",
        originalPrice: "Rp 1.000.000",
        promoPrice: "Rp 500.000",
        icon: <Share2 className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Email Marketing",
        description: "Kampanye email profesional untuk menjangkau pelanggan secara langsung.",
        features: [
          "Template email profesional",
          "Copywriting promosi menarik",
          "Email automation",
          "Segmentation strategy",
          "Performance analytics",
          "A/B testing"
        ],
        facilities: ["Template email", "penulisan copywriting promosi"],
        priceRange: "Rp 400.000",
        originalPrice: "Rp 800.000",
        promoPrice: "Rp 400.000",
        icon: <Mail className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Copywriting",
        description: "Tingkatkan nilai jual produk/jasa Anda melalui kata-kata yang menggugah.",
        features: [
          "Penulisan untuk 3 halaman",
          "Copywriting untuk 5 produk",
          "Sales-focused content",
          "SEO optimization",
          "Brand voice consistency",
          "Call-to-action optimization"
        ],
        facilities: ["Penulisan untuk 3 halaman atau 5 produk"],
        priceRange: "Rp 150.000",
        originalPrice: "Rp 300.000",
        promoPrice: "Rp 150.000",
        icon: <PenTool className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Strategi Branding Digital",
        description: "Tentukan arah brand Anda dengan analisis mendalam dan positioning yang tepat.",
        features: [
          "Riset brand komprehensif",
          "Pemetaan digital landscape",
          "Strategi branding terintegrasi",
          "Competitor analysis",
          "Brand positioning",
          "Digital roadmap"
        ],
        facilities: ["Riset brand", "pemetaan digital", "strategi branding"],
        priceRange: "Rp 250.000",
        originalPrice: "Rp 500.000",
        promoPrice: "Rp 250.000",
        icon: <TrendingUp className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Optimasi Marketplace",
        description: "Naikkan performa toko online Anda di berbagai platform marketplace.",
        features: [
          "Upload produk profesional",
          "Desain banner toko menarik",
          "Optimasi SEO produk",
          "Product photography guide",
          "Pricing strategy",
          "Performance monitoring"
        ],
        facilities: ["Upload produk", "desain banner toko", "optimasi SEO produk"],
        priceRange: "Rp 500.000",
        originalPrice: "Rp 1.000.000",
        promoPrice: "Rp 500.000",
        icon: <Store className="h-5 w-5 text-sky-400" />
      }
    ]
  },
  {
    icon: <Camera className="h-6 w-6 text-sky-400" />,
    title: "Foto & Videografi",
    description: "Layanan fotografi dan videografi profesional untuk berbagai kebutuhan bisnis dan event",
    items: [
      "Foto Produk",
      "Foto Event",
      "Video Profil Perusahaan",
      "Video Promosi Produk",
      "Video Event",
      "Video Tutorial",
      "Iklan Digital",
      "Drone Footage",
      "Video Editing"
    ],
    subcategories: [
      {
        title: "Foto Produk",
        description: "Foto katalog produk yang jernih dan menarik untuk meningkatkan daya tarik penjualan.",
        features: [
          "10 foto produk berkualitas tinggi",
          "Editing dasar professional",
          "Multiple angles",
          "Product styling",
          "Background options",
          "High resolution output"
        ],
        facilities: ["10 foto produk + editing dasar"],
        priceRange: "Rp 500.000",
        originalPrice: "Rp 1.000.000",
        promoPrice: "Rp 500.000",
        icon: <Camera className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Foto Event",
        description: "Abadikan momen spesial seperti wisuda, pernikahan, gathering secara profesional.",
        features: [
          "1 jam pemotretan intensif",
          "50-100 foto terbaik",
          "Professional editing",
          "Digital gallery",
          "High resolution files",
          "Quick delivery"
        ],
        facilities: ["1 jam pemotretan", "50–100 foto"],
        priceRange: "Rp 300.000",
        originalPrice: "Rp 600.000",
        promoPrice: "Rp 300.000",
        icon: <Camera className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Video Profil Perusahaan",
        description: "Bangun citra brand dengan video cinematic yang powerful dan berkesan.",
        features: [
          "Professional shooting",
          "Voice over berkualitas",
          "Editing cinematic style",
          "Background music",
          "Color grading",
          "Multiple format output"
        ],
        facilities: ["Shooting", "voice over", "editing cinematic"],
        priceRange: "Rp 400.000",
        originalPrice: "Rp 800.000",
        promoPrice: "Rp 400.000",
        icon: <Video className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Video Promosi Produk", 
        description: "Tingkatkan penjualan lewat video promosi produk yang menarik.",
        features: [
          "Professional shooting setup",
          "Editing ringan berkualitas",
          "Product showcase",
          "Call-to-action integration",
          "Multiple platform formats",
          "Quick turnaround"
        ],
        facilities: ["Shooting + editing ringan"],
        priceRange: "Rp 500.000",
        originalPrice: "Rp 1.000.000",
        promoPrice: "Rp 500.000",
        icon: <Play className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Video Event",
        description: "Highlight acara Anda dalam bentuk video sinematik profesional.",
        features: [
          "1 hari peliputan lengkap",
          "Video highlight menarik",
          "Multiple camera angles",
          "Professional editing",
          "Background music",
          "Social media ready"
        ],
        facilities: ["1 hari peliputan + video highlight"],
        priceRange: "Rp 500.000",
        originalPrice: "Rp 1.000.000",
        promoPrice: "Rp 500.000",
        icon: <Clapperboard className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Video Tutorial",
        description: "Buat konten video edukasi berdurasi hingga 5 menit lengkap dengan subtitle.",
        features: [
          "Durasi maksimal 5 menit",
          "Penambahan subtitle",
          "Screen recording",
          "Voice over clear",
          "Step-by-step guidance",
          "Educational format"
        ],
        facilities: ["Durasi 5 menit", "penambahan subtitle"],
        priceRange: "Rp 450.000",
        originalPrice: "Rp 900.000",
        promoPrice: "Rp 450.000",
        icon: <Play className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Iklan Digital",
        description: "Kuasai media sosial dengan video storytelling berdurasi 1 menit (Reels/TikTok Ads).",
        features: [
          "Konsep storytelling menarik",
          "Video berdurasi 1 menit",
          "Vertical format optimization",
          "Trend-based content",
          "Engaging hooks",
          "Call-to-action integration"
        ],
        facilities: ["Konsep storytelling", "video 1 menit"],
        priceRange: "Rp 250.000",
        originalPrice: "Rp 500.000",
        promoPrice: "Rp 250.000",
        icon: <TrendingUp className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Drone Footage",
        description: "Ambil gambar spektakuler dari udara untuk properti, event, atau promosi.",
        features: [
          "10 foto aerial berkualitas",
          "1 video drone cinematic",
          "4K resolution",
          "Multiple angles",
          "Professional piloting",
          "Weather consideration"
        ],
        facilities: ["10 foto + 1 video drone"],
        priceRange: "Rp 250.000",
        originalPrice: "Rp 500.000",
        promoPrice: "Rp 250.000",
        icon: <Drone className="h-5 w-5 text-sky-400" />
      },
      {
        title: "Video Editing",
        description: "Perindah footage Anda dengan editing profesional dan animasi modern (Motion Graphic).",
        features: [
          "Durasi maksimal 3 menit",
          "Motion graphic dinamis",
          "Color correction",
          "Audio enhancement",
          "Transition effects",
          "Professional output"
        ],
        facilities: ["Durasi 3 menit", "motion graphic dinamis"],
        priceRange: "Rp 400.000",
        originalPrice: "Rp 800.000",
        promoPrice: "Rp 400.000",
        icon: <Edit className="h-5 w-5 text-sky-400" />
      }
    ]
  }
];

// Service pricing data for order form
export const servicePrices: { [key: string]: { [key: string]: number } } = {
  'Website & Aplikasi': {
    'Website Landing Page': 250000,
    'Website Profil': 500000,
    'Website E-Commerce': 1500000,
    'Website Portal / Blog': 1500000,
    'Website Lembaga': 1500000,
    'Website Dashboard': 2500000,
    'Aplikasi Mobile': 4500000,
    'Sistem Informasi': 3000000,
    'Maintenance Website': 500000
  },
  'Desain Grafis': {
    'Logo & Brand Identity': 250000,
    'Company Profile': 250000,
    'Brosur / Flyer Promosi': 150000,
    'Desain Kemasan Produk': 100000,
    'Konten Sosial Media': 250000,
    'Banner Digital': 150000,
    'Desain UI/UX': 200000,
    'Undangan Digital': 150000
  },
  'Digital Marketing': {
    'Manajemen Iklan Digital': 750000,
    'Layanan SEO': 250000,
    'Konten Sosial Media': 500000,
    'Email Marketing': 400000,
    'Copywriting': 150000,
    'Strategi Branding Digital': 250000,
    'Optimasi Marketplace': 500000
  },
  'Foto & Videografi': {
    'Foto Produk': 500000,
    'Foto Event': 300000,
    'Video Profil Perusahaan': 400000,
    'Video Promosi Produk': 500000,
    'Video Event': 500000,
    'Video Tutorial': 450000,
    'Iklan Digital': 250000,
    'Drone Footage': 250000,
    'Video Editing': 400000
  }
};
