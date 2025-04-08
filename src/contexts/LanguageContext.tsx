
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple translation dictionary
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
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('id');

  // Initialize language from localStorage if available
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage) {
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

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.id] || key;
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
