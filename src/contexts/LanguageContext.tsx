
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Enhanced translation dictionary
const translations = {
  id: {
    // Navbar
    'beranda': 'Beranda',
    'program': 'Program',
    'jasa-digital': 'Jasa Digital',
    'motivasi-edukasi': 'Motivasi & Edukasi',
    'sharing-konsultasi': 'Sharing & Konsultasi',
    'kelas': 'Kelas',
    'blog': 'Blog',
    'portofolio': 'Portofolio',
    'tentang': 'Tentang',
    'masuk': 'Masuk',
    'daftar': 'Daftar',
    'dashboard': 'Dashboard',
    'keluar': 'Keluar',
    'lihat-website': 'Lihat Website',
    
    // Common UI elements
    'light-mode': 'Mode Terang',
    'dark-mode': 'Mode Gelap',
    'english': 'Bahasa Inggris',
    'indonesian': 'Bahasa Indonesia',
    'switch-to-light': 'Beralih ke Mode Terang',
    'switch-to-dark': 'Beralih ke Mode Gelap',
    
    // CTA Section
    'ready-to-improve': 'Siap Tingkatkan Keterampilan Digital Anda?',
    'join-thousands': 'Bergabunglah dengan ribuan orang yang telah meningkatkan kemampuan digitalnya bersama {companyName}.',
    'register-now': 'Daftar Sekarang',
    'view-classes': 'Lihat Kelas',
    
    // Contact Section
    'questions': 'Ada pertanyaan?',
    'team-ready': 'Tim kami siap membantu Anda dengan segala pertanyaan tentang layanan {companyName}.',
    'contact-us': 'Hubungi Kami',
    
    // Services Section
    'our-services': 'Layanan Digital Kami',
    'services-subtitle': 'Solusi digital terbaik untuk percepatan digitalisasi Indonesia',
    'learn-more': 'Selengkapnya',
    'website-app-development': 'Pembuatan Website & Aplikasi',
    'website-app-desc': 'Kami mengembangkan website responsif dan aplikasi yang sesuai dengan kebutuhan bisnis Anda.',
    'graphic-design': 'Desain Grafis',
    'graphic-design-desc': 'Layanan desain visual berkualitas tinggi untuk brand, logo, dan kebutuhan marketing Anda.',
    'digital-marketing': 'Digital Marketing & Branding',
    'digital-marketing-desc': 'Strategi pemasaran digital yang efektif untuk meningkatkan awareness dan penjualan.',
    'content-management': 'Manajemen Konten',
    'content-management-desc': 'Pengelolaan konten berkualitas untuk website dan media sosial bisnis Anda.',
    'photo-video': 'Foto dan Videografi',
    'photo-video-desc': 'Layanan foto dan video profesional untuk kebutuhan promosi produk dan bisnis.',
    'social-media': 'Manajemen Sosial Media',
    'social-media-desc': 'Pengelolaan akun media sosial untuk meningkatkan engagement dan brand awareness.',
    
    // Benefits Section
    'our-advantages': 'Keunggulan Kami',
    'why-company': 'Mengapa {companyName}?',
    'company-description': '{companyName} hadir sebagai solusi terpadu untuk kebutuhan digitalisasi Anda. Dengan pendekatan yang komprehensif, kami membantu baik individu maupun bisnis mencapai potensi maksimal di era digital.',
    'learn-more-about': 'Pelajari Lebih Lanjut',
    
    // Testimonials Section
    'what-clients-say': 'Apa Kata Klien Kami',
    'clients-testimonials': 'Klien kami telah merasakan manfaat dari layanan yang kami berikan. Berikut adalah beberapa testimoni dari mereka.',
    
    // Partners Section
    'trusted-partners': 'Dipercaya oleh Brand Terkemuka',
    'partners-description': 'Berkolaborasi dengan berbagai perusahaan dan organisasi untuk mengembangkan solusi digital.',
    
    // Portfolio Section
    'popular-portfolio': 'Portfolio Terpopuler Minggu Ini',
    'view-all-portfolio': 'Lihat Semua Portfolio',
    'view-details': 'Lihat Detail',
    'by': 'oleh',
    
    // Order Form
    'order-now': 'Pesan Sekarang'
  },
  en: {
    // Navbar
    'beranda': 'Home',
    'program': 'Programs',
    'jasa-digital': 'Digital Services',
    'motivasi-edukasi': 'Motivation & Education',
    'sharing-konsultasi': 'Sharing & Consultation',
    'kelas': 'Classes',
    'blog': 'Blog',
    'portofolio': 'Portfolio',
    'tentang': 'About',
    'masuk': 'Login',
    'daftar': 'Register',
    'dashboard': 'Dashboard',
    'keluar': 'Logout',
    'lihat-website': 'View Website',
    
    // Common UI elements
    'light-mode': 'Light Mode',
    'dark-mode': 'Dark Mode',
    'english': 'English',
    'indonesian': 'Indonesian',
    'switch-to-light': 'Switch to Light Mode',
    'switch-to-dark': 'Switch to Dark Mode',
    
    // CTA Section
    'ready-to-improve': 'Ready to Improve Your Digital Skills?',
    'join-thousands': 'Join thousands of people who have enhanced their digital capabilities with {companyName}.',
    'register-now': 'Register Now',
    'view-classes': 'View Classes',
    
    // Contact Section
    'questions': 'Have questions?',
    'team-ready': 'Our team is ready to help you with any questions about {companyName} services.',
    'contact-us': 'Contact Us',
    
    // Services Section
    'our-services': 'Our Digital Services',
    'services-subtitle': 'Best digital solutions for accelerating Indonesia\'s digitalization',
    'learn-more': 'Learn More',
    'website-app-development': 'Website & App Development',
    'website-app-desc': 'We develop responsive websites and applications tailored to your business needs.',
    'graphic-design': 'Graphic Design',
    'graphic-design-desc': 'High-quality visual design services for your brand, logo, and marketing needs.',
    'digital-marketing': 'Digital Marketing & Branding',
    'digital-marketing-desc': 'Effective digital marketing strategies to increase awareness and sales.',
    'content-management': 'Content Management',
    'content-management-desc': 'Quality content management for your business website and social media.',
    'photo-video': 'Photography & Videography',
    'photo-video-desc': 'Professional photo and video services for product and business promotion.',
    'social-media': 'Social Media Management',
    'social-media-desc': 'Management of social media accounts to increase engagement and brand awareness.',
    
    // Benefits Section
    'our-advantages': 'Our Advantages',
    'why-company': 'Why {companyName}?',
    'company-description': '{companyName} provides an integrated solution for your digitalization needs. With a comprehensive approach, we help both individuals and businesses reach their maximum potential in the digital era.',
    'learn-more-about': 'Learn More About Us',
    
    // Testimonials Section
    'what-clients-say': 'What Our Clients Say',
    'clients-testimonials': 'Our clients have experienced the benefits of our services. Here are some testimonials from them.',
    
    // Partners Section
    'trusted-partners': 'Trusted by Leading Brands',
    'partners-description': 'Collaborating with various companies and organizations to develop digital solutions.',
    
    // Portfolio Section
    'popular-portfolio': 'Popular Portfolio This Week',
    'view-all-portfolio': 'View All Portfolio',
    'view-details': 'View Details',
    'by': 'by',
    
    // Order Form
    'order-now': 'Order Now'
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('id');

  // Initialize language from localStorage if available
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage && (savedLanguage === 'id' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Update language in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prevLanguage => prevLanguage === 'id' ? 'en' : 'id');
  };

  // Enhanced translation function with parameter support
  const t = (key: string, params?: Record<string, string>): string => {
    const langDict = translations[language] as Record<string, string>;
    let translated = langDict[key] || key;
    
    // Replace any parameters in the translated string
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translated = translated.replace(`{${param}}`, value);
      });
    }
    
    return translated;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
