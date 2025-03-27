
// Define website data structure types

// Website general information type
export interface GeneralInfo {
  title: string;
  description: string;
  tagline?: string;
  address?: string;
  email?: string;
  phone?: string;
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
}

// Website appearance settings type
export interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system';
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
}

// Website page type
export interface WebsitePage {
  id: string;
  title: string;
  slug: string;
  content: string;
  isPublished: boolean;
}

// SEO settings type
export interface SeoSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage?: string;
  googleAnalyticsId?: string;
}

// Home content hero section type
export interface HeroSection {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

// Service item type
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
}

// Testimonial item type
export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  content: string;
  image?: string;
}

// Partner/client item type
export interface PartnerItem {
  id: string;
  name: string;
  image: string;
  link?: string;
}

// Home content type
export interface HomeContent {
  hero: HeroSection;
  services: ServiceItem[];
  testimonials: TestimonialItem[];
  partners: PartnerItem[];
  benefits: string[];
}

// Full website data type
export interface WebsiteData {
  generalInfo: GeneralInfo;
  appearance: AppearanceSettings;
  pages: WebsitePage[];
  seo: SeoSettings;
  homeContent: HomeContent;
}

// Website store actions
export interface WebsiteDataActions {
  updateGeneralInfo: (info: Partial<GeneralInfo>) => void;
  updateAppearance: (appearance: Partial<AppearanceSettings>) => void;
  updatePage: (pageId: string, pageData: Partial<Omit<WebsitePage, 'id'>>) => void;
  addPage: (pageData: Omit<WebsitePage, 'id'>) => void;
  deletePage: (pageId: string) => void;
  updateSeo: (seo: Partial<SeoSettings>) => void;
  updateHomeContent: (content: Partial<HomeContent>) => void;
  updateHomeServices: (services: ServiceItem[]) => void;
  updateHomeTestimonials: (testimonials: TestimonialItem[]) => void;
  updateHomePartners: (partners: PartnerItem[]) => void;
  resetToDefault: () => void;
}

// Full website store type (data + actions)
export type WebsiteStore = WebsiteData & WebsiteDataActions;
