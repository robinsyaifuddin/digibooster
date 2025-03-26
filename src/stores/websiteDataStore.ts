import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

// Definisi tipe untuk data website
export interface WebsiteData {
  generalInfo: {
    title: string;
    description: string;
    logo?: string;
    favicon?: string;
    contactEmail: string;
    contactPhone: string;
    socialMedia: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
      linkedin?: string;
    };
  };
  appearance: {
    theme: 'light' | 'dark' | 'system';
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
  pages: Array<{
    id: string;
    title: string;
    slug: string;
    content: string;
    isPublished: boolean;
  }>;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage?: string;
    googleAnalyticsId?: string;
  };
  homeContent: {
    hero: {
      title: string;
      subtitle: string;
      ctaText: string;
      ctaLink: string;
    };
    services: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
      link: string;
    }>;
    testimonials: Array<{
      id: string;
      name: string;
      role: string;
      content: string;
      image?: string;
    }>;
    benefits: string[];
  };
}

// Define the store's actions
interface WebsiteDataActions {
  updateGeneralInfo: (info: Partial<WebsiteData['generalInfo']>) => void;
  updateAppearance: (appearance: Partial<WebsiteData['appearance']>) => void;
  updatePage: (pageId: string, pageData: Partial<Omit<WebsiteData['pages'][0], 'id'>>) => void;
  addPage: (pageData: Omit<WebsiteData['pages'][0], 'id'>) => void;
  deletePage: (pageId: string) => void;
  updateSeo: (seo: Partial<WebsiteData['seo']>) => void;
  updateHomeContent: (content: Partial<WebsiteData['homeContent']>) => void;
  updateHomeServices: (services: WebsiteData['homeContent']['services']) => void;
  updateHomeTestimonials: (testimonials: WebsiteData['homeContent']['testimonials']) => void;
  resetToDefault: () => void;
}

// Define the full store type
type WebsiteStore = WebsiteData & WebsiteDataActions;

// Define persist configuration
type WebsiteDataPersist = PersistOptions<WebsiteStore, Partial<WebsiteStore>>;

// Nilai default untuk data website
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

// Persist configuration
const persistConfig: WebsiteDataPersist = {
  name: 'website-data-storage',
};

// Create the store with proper typing
export const useWebsiteDataStore = create<WebsiteStore>()(
  persist(
    (set) => ({
      ...defaultWebsiteData,
      
      // Update functions
      updateGeneralInfo: (info) => 
        set((state) => ({
          generalInfo: { ...state.generalInfo, ...info }
        })),
      
      updateAppearance: (appearance) => 
        set((state) => ({
          appearance: { ...state.appearance, ...appearance }
        })),
      
      updatePage: (pageId, pageData) => 
        set((state) => ({
          pages: state.pages.map(page => 
            page.id === pageId ? { ...page, ...pageData } : page
          )
        })),
      
      addPage: (pageData) =>
        set((state) => ({
          pages: [...state.pages, { id: Date.now().toString(), ...pageData }]
        })),
      
      deletePage: (pageId) =>
        set((state) => ({
          pages: state.pages.filter(page => page.id !== pageId)
        })),
      
      updateSeo: (seo) =>
        set((state) => ({
          seo: { ...state.seo, ...seo }
        })),
      
      updateHomeContent: (content) =>
        set((state) => ({
          homeContent: { ...state.homeContent, ...content }
        })),
      
      updateHomeServices: (services) =>
        set((state) => ({
          homeContent: {
            ...state.homeContent,
            services,
          }
        })),
      
      updateHomeTestimonials: (testimonials) =>
        set((state) => ({
          homeContent: {
            ...state.homeContent,
            testimonials,
          }
        })),
      
      resetToDefault: () => set(defaultWebsiteData),
    }),
    persistConfig
  )
);
