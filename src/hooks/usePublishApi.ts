
import { useToast } from "@/hooks/use-toast";
import { useImplementationSettings } from "./useImplementationSettings";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { WebsiteData } from "@/types/websiteTypes";

export const usePublishApi = () => {
  const { toast } = useToast();
  const { isRealImplementation, getSettings } = useImplementationSettings();
  const { user } = useAuth();
  
  const publishToApi = async (data: { websiteData: WebsiteData, pageEdits: Record<string, any> }) => {
    if (!isRealImplementation) {
      return { success: true, simulation: true };
    }
    
    try {
      // Jika implementasi nyata, simpan perubahan di Supabase
      const { generalInfo, pages, appearance, seo, homeContent } = data.websiteData;
      
      // Konversi objek TypeScript ke JSON yang bisa diterima oleh Supabase
      const websiteContent = {
        generalInfo, 
        appearance, 
        seo, 
        homeContent
      };
      
      // Simpan konten website umum
      const { error: contentError } = await supabase
        .from('website_content')
        .upsert({
          name: 'main',
          content: websiteContent as any
        }, {
          onConflict: 'name'
        });
      
      if (contentError) {
        throw new Error(`Gagal menyimpan konten website: ${contentError.message}`);
      }
      
      // Simpan halaman yang diedit
      if (data.pageEdits && Object.keys(data.pageEdits).length > 0) {
        for (const pageId in data.pageEdits) {
          const page = pages.find(p => p.id === pageId);
          if (page) {
            const { error: pageError } = await supabase
              .from('pages')
              .upsert({
                id: pageId,
                title: page.title,
                slug: page.slug,
                content: page.content,
                published: page.isPublished,
                created_by: user?.id
              }, {
                onConflict: 'id'
              });
            
            if (pageError) {
              console.error(`Gagal menyimpan halaman ${page.title}:`, pageError);
            }
          }
        }
      }
      
      // Catat riwayat publikasi
      const { error: historyError } = await supabase
        .from('publish_history')
        .insert({
          publish_type: 'full',
          published_by: user?.id,
          changes: { changedSections: Object.keys(data.pageEdits || {}) }
        });
      
      if (historyError) {
        console.error('Gagal menyimpan riwayat publikasi:', historyError);
      }
      
      return { success: true, data: 'Konten berhasil disimpan di database' };
    } catch (apiError) {
      console.error('Error publishing to API:', apiError);
      toast({
        variant: "destructive",
        title: "Gagal menghubungi server",
        description: apiError.message || "Tidak dapat mengirim perubahan ke server. Periksa koneksi internet dan pengaturan API Anda.",
        duration: 5000,
      });
      throw new Error('API error');
    }
  };
  
  const rollbackOnApi = async () => {
    if (!isRealImplementation) {
      return { success: true, simulation: true };
    }
    
    try {
      // Ambil riwayat publikasi terakhir dan dapatkan ID publikasi sebelumnya
      const { data: lastPublishes, error: historyError } = await supabase
        .from('publish_history')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(2);
      
      if (historyError) {
        throw new Error(`Gagal mengambil riwayat publikasi: ${historyError.message}`);
      }
      
      if (lastPublishes && lastPublishes.length > 1) {
        // Dapatkan konten website sebelumnya
        const { data: prevContentData } = await supabase
          .from('website_content')
          .select('content')
          .eq('name', 'main')
          .single();
        
        if (prevContentData && prevContentData.content) {
          // Jika konten content adalah string JSON, parse terlebih dahulu
          let contentData = prevContentData.content;
          if (typeof contentData === 'string') {
            try {
              contentData = JSON.parse(contentData);
            } catch (e) {
              console.error("Failed to parse content:", e);
            }
          }
          
          // Jika lastPublishes[1].changes adalah objek dengan properti pages, gunakan data tersebut
          const previousPages = lastPublishes[1].changes && 
                               typeof lastPublishes[1].changes === 'object' && 
                               lastPublishes[1].changes.pages ? 
                               lastPublishes[1].changes.pages : [];
          
          return { 
            success: true, 
            data: {
              ...contentData,
              pages: previousPages
            }
          };
        }
      }
      
      return { success: false, reason: 'no-previous-version' };
    } catch (error) {
      console.error('Error during API rollback:', error);
      toast({
        variant: "destructive",
        title: "Error saat rollback via API",
        description: error.message,
        duration: 5000,
      });
      throw error;
    }
  };
  
  return {
    publishToApi,
    rollbackOnApi,
    isRealImplementation
  };
};
