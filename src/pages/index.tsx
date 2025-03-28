
import React, { useEffect, useState } from 'react';
import { useImplementationSettings } from '@/hooks/useImplementationSettings';
import { usePublish } from '@/hooks/usePublish';
import { useWebsiteDataStore } from '@/stores/websiteDataStore';
import HomePage from '@/components/public/HomePage';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { WebsiteData } from '@/types/websiteTypes';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { isRealImplementation } = useImplementationSettings();
  const { loadWebsiteDataFromSupabase } = usePublish();
  const websiteStore = useWebsiteDataStore();
  
  useEffect(() => {
    async function loadData() {
      try {
        if (isRealImplementation) {
          // Jika implementasi nyata, ambil data dari Supabase
          const websiteData = await loadWebsiteDataFromSupabase();
          
          if (websiteData && typeof websiteData === 'object') {
            // Update store dengan data dari Supabase
            if (websiteData.generalInfo) {
              websiteStore.updateGeneralInfo(websiteData.generalInfo);
            }
            
            if (websiteData.appearance) {
              websiteStore.updateAppearance(websiteData.appearance);
            }
            
            if (websiteData.seo) {
              websiteStore.updateSeo(websiteData.seo);
            }
            
            if (websiteData.homeContent) {
              websiteStore.updateHomeContent(websiteData.homeContent);
            }
            
            // Load halaman dari Supabase
            const { data: pagesData, error: pagesError } = await supabase
              .from('pages')
              .select('*')
              .eq('published', true);
            
            if (!pagesError && pagesData) {
              // Replace pages in store with pages from database
              pagesData.forEach(page => {
                const pageContent = typeof page.content === 'string' 
                  ? page.content 
                  : JSON.stringify(page.content);
                
                const existingPage = websiteStore.pages.find(p => p.id === page.id);
                
                if (existingPage) {
                  websiteStore.updatePage(page.id, {
                    title: page.title,
                    slug: page.slug,
                    content: pageContent,
                    isPublished: page.published
                  });
                } else {
                  websiteStore.addPage({
                    title: page.title,
                    slug: page.slug,
                    content: pageContent,
                    isPublished: page.published
                  });
                }
              });
            }
          }
        } else {
          // Jika simulasi, cek apakah ada data permanen di localStorage
          const permanentData = localStorage.getItem('websiteDataPermanent');
          
          if (permanentData === 'true') {
            // Tidak perlu lakukan apa-apa karena data sudah di-load oleh store
            console.log("Using permanent data from localStorage");
          }
        }
      } catch (error) {
        console.error("Error loading website data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [isRealImplementation]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500" />
          <p className="mt-2 text-gray-600">Memuat website...</p>
        </div>
      </div>
    );
  }
  
  return <HomePage />;
}
