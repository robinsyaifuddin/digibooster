import { WebsiteData } from '../types/websiteTypes';

// Default website data values
const defaultWebsiteData: WebsiteData = {
  generalInfo: {
    title: 'DigiBooster',
    description: 'Platform Agensi dan Pengembangan Digital',
    tagline: 'Boost Your Digital Presence',
    address: 'Jl. Digital No. 123, Jakarta, Indonesia',
    email: 'hello@digibooster.id',
    phone: '+62 812 3456 7890',
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
        name: 'Lania',
        role: 'Owner zenboard.id',
        content: 'Voodoo recomended banget, menurut saya itu jasa paling clex sih. Dijamin pek rapi hasilnya memuaskan!!!!',
        image: 'https://randomuser.me/api/portraits/women/1.jpg',
      },
      {
        id: '2',
        name: 'Alvin Rahman',
        role: 'Owner sixtwogkarta.com',
        content: 'Pelayananya cepat, hasil bagusss, udah bikin 5 bulanan yang lalu terus minta tolong ada yg di edit masih bisa dibanggiin!!!',
        image: 'https://randomuser.me/api/portraits/men/2.jpg',
      },
      {
        id: '3',
        name: 'John Smith',
        role: 'Marketing rentalspace.web.id',
        content: 'Voodoo sangat membantu dlm membuat website, kerja dengan cepat, dan hasil website memuaskan banget!',
        image: 'https://randomuser.me/api/portraits/men/3.jpg',
      },
      {
        id: '4',
        name: 'Dea',
        role: 'Marketing sfp-lawfirm.com',
        content: 'SUKA BANGET sama Voodoo, sabar banget menjawab segala pertanyaan kita dan hasil web nya jempol dehhh.',
        image: 'https://randomuser.me/api/portraits/women/4.jpg',
      },
      {
        id: '5',
        name: 'Caca',
        role: 'Seo jasaiklmurah.my.id',
        content: 'Terima kasih Pak, websitenya sangat membantu... after salesnya juga bagus, top deh, next time pasti order lg.',
        image: 'https://randomuser.me/api/portraits/women/5.jpg',
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
