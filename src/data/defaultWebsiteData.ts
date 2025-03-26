
import { WebsiteData } from '../types/websiteTypes';

// Default website data values
const defaultWebsiteData: WebsiteData = {
  generalInfo: {
    title: 'DigiBooster',
    description: 'Platform Agensi dan Pengembangan Digital',
    contactEmail: 'hello@digibooster.id',
    contactPhone: '+62 812 3456 7890',
    socialMedia: {
      facebook: 'https://facebook.com/digibooster',
      instagram: 'https://instagram.com/digibooster',
      twitter: 'https://twitter.com/digibooster',
      linkedin: 'https://linkedin.com/company/digibooster',
    },
  },
  appearance: {
    theme: 'light',
    primaryColor: '#1a365d',
    secondaryColor: '#3182ce',
    fontFamily: 'Inter, sans-serif',
  },
  pages: [
    {
      id: '1',
      title: 'Beranda',
      slug: '/',
      content: 'Halaman beranda website DigiBooster',
      isPublished: true,
    },
    {
      id: '2',
      title: 'Layanan',
      slug: '/layanan',
      content: 'Halaman layanan yang kami tawarkan',
      isPublished: true,
    },
    {
      id: '3',
      title: 'Tentang Kami',
      slug: '/tentang',
      content: 'Halaman tentang DigiBooster',
      isPublished: true,
    },
    {
      id: '4',
      title: 'Kontak',
      slug: '/kontak',
      content: 'Halaman kontak DigiBooster',
      isPublished: true,
    },
  ],
  seo: {
    metaTitle: 'DigiBooster - Platform Agensi dan Pengembangan Digital',
    metaDescription: 'Membantu masyarakat Indonesia mengoptimalkan digitalisasi untuk peningkatan kualitas hidup dan bisnis.',
    keywords: ['digital agency', 'web development', 'digital marketing', 'indonesia', 'education'],
  },
  homeContent: {
    hero: {
      title: 'Skill Up, Stand Out with DigiBooster',
      subtitle: 'Membantu masyarakat Indonesia mengoptimalkan digitalisasi untuk peningkatan kualitas hidup dan bisnis.',
      ctaText: 'Lihat Layanan',
      ctaLink: '/layanan',
    },
    services: [
      {
        id: '1',
        title: 'Layanan Jasa Digital',
        description: 'Tingkatkan presence digital Anda dengan layanan jasa design, web development, dan digital marketing kami.',
        icon: 'Code',
        link: '/layanan/jasa-digital',
      },
      {
        id: '2',
        title: 'Motivasi dan Edukasi Digital',
        description: 'Dapatkan inspirasi dan pengetahuan digital melalui seminar dan workshop yang kami selenggarakan.',
        icon: 'Lightbulb',
        link: '/layanan/motivasi-edukasi',
      },
      {
        id: '3',
        title: 'Sharing dan Konsultasi Bisnis Digital',
        description: 'Konsultasikan kebutuhan digital bisnis Anda dengan pakar kami untuk solusi terbaik.',
        icon: 'Users',
        link: '/layanan/sharing-konsultasi',
      },
      {
        id: '4',
        title: 'Short Class dan Mini Bootcamp',
        description: 'Pelajari keterampilan digital terbaru melalui kelas intensif dan bootcamp dari para ahli.',
        icon: 'PenTool',
        link: '/layanan/kelas',
      },
    ],
    testimonials: [
      {
        id: '1',
        name: 'Budi Santoso',
        role: 'Pemilik UMKM',
        content: 'DigiBooster membantu bisnis saya bertransformasi secara digital. Penjualan meningkat 300% hanya dalam 3 bulan!',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
      {
        id: '2',
        name: 'Siti Rahma',
        role: 'Freelancer',
        content: 'Bootcamp yang diselenggarakan sangat bermanfaat. Saya mendapatkan keterampilan baru yang langsung bisa diterapkan.',
        image: 'https://randomuser.me/api/portraits/women/2.jpg',
      },
      {
        id: '3',
        name: 'Ahmad Fauzi',
        role: 'Startup Founder',
        content: 'Konsultasi dengan tim DigiBooster membuka wawasan tentang potensi digital marketing yang belum kami maksimalkan.',
        image: 'https://randomuser.me/api/portraits/men/3.jpg',
      },
    ],
    benefits: [
      'Tingkatkan keterampilan digital Anda',
      'Dapatkan konsultasi dari pakar bisnis digital',
      'Akses ke komunitas digital enthusiast',
      'Kesempatan kolaborasi dengan partner kami',
      'Update teknologi terbaru dan implementasinya',
      'Dukungan 24/7 untuk pertanyaan teknis',
    ],
  },
};

export default defaultWebsiteData;
