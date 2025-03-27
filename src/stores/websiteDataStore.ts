
import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { WebsiteStore, WebsiteData, PartnerItem } from '../types/websiteTypes';
import defaultWebsiteData from '../data/defaultWebsiteData';

// Define persist configuration
type WebsiteDataPersist = PersistOptions<WebsiteStore, Partial<WebsiteStore>>;

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
      
      updateHomePartners: (partners) =>
        set((state) => ({
          homeContent: {
            ...state.homeContent,
            partners,
          }
        })),
      
      resetToDefault: () => set(defaultWebsiteData),
    }),
    persistConfig
  )
);

// Re-export the types for convenience
export type { WebsiteData } from '../types/websiteTypes';
