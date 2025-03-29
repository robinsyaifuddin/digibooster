
import { useToast } from "@/hooks/use-toast";
import { useImplementationSettings } from "./useImplementationSettings";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { WebsiteData } from "@/types/websiteTypes";

export const usePublishApi = () => {
  const { toast } = useToast();
  const { isRealImplementation, implementationType, getSettings } = useImplementationSettings();
  const { user } = useAuth();
  
  const publishToApi = async (data: { websiteData: WebsiteData, pageEdits: Record<string, any> }) => {
    if (!isRealImplementation) {
      return { success: true, simulation: true };
    }
    
    try {
      // Jika menggunakan Supabase sebagai implementasi
      if (implementationType === 'supabase') {
        return await publishToSupabase(data);
      } 
      // Jika menggunakan implementasi kustom
      else if (implementationType === 'custom') {
        return await publishToCustomApi(data);
      }
      
      return { success: true, simulation: true };
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
  
  // Fungsi untuk mempublikasikan ke Supabase
  const publishToSupabase = async (data: { websiteData: WebsiteData, pageEdits: Record<string, any> }) => {
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
  };
  
  // Fungsi untuk mempublikasikan ke API kustom
  const publishToCustomApi = async (data: { websiteData: WebsiteData, pageEdits: Record<string, any> }) => {
    const settings = getSettings();
    
    if (!settings.apiUrl) {
      throw new Error('URL API tidak dikonfigurasi');
    }
    
    // Buat URL endpoint untuk menyimpan data
    const saveEndpoint = settings.apiUrl.endsWith('/') 
      ? `${settings.apiUrl}website/save` 
      : `${settings.apiUrl}/website/save`;
    
    // Buat header dengan API key jika tersedia
    const headers = {
      'Content-Type': 'application/json',
      ...(settings.apiKey && { 'Authorization': `Bearer ${settings.apiKey}` })
    };
    
    // Siapkan data untuk dikirim
    const payload = {
      websiteContent: data.websiteData,
      pageEdits: data.pageEdits,
      userId: user?.id,
      timestamp: new Date().toISOString()
    };
    
    // Kirim data ke API kustom
    const response = await fetch(saveEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API error: ${response.status} - ${errorData.message || response.statusText}`);
    }
    
    const result = await response.json();
    
    return { 
      success: true, 
      data: result.message || 'Konten berhasil disimpan via API kustom',
      apiResponse: result 
    };
  };
  
  const rollbackOnApi = async () => {
    if (!isRealImplementation) {
      return { success: true, simulation: true };
    }
    
    // Jika menggunakan Supabase sebagai implementasi
    if (implementationType === 'supabase') {
      return rollbackOnSupabase();
    } 
    // Jika menggunakan implementasi kustom
    else if (implementationType === 'custom') {
      return rollbackOnCustomApi();
    }
    
    return { success: false, reason: 'unknown-implementation' };
  };
  
  // Fungsi untuk rollback di Supabase
  const rollbackOnSupabase = async () => {
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
          let previousPages = [];
          if (lastPublishes[1].changes && 
              typeof lastPublishes[1].changes === 'object') {
            const changes = lastPublishes[1].changes as Record<string, any>;
            if (changes.pages) {
              previousPages = changes.pages;
            }
          }
          
          // Ensure contentData is an object that can be spread
          const resultData = typeof contentData === 'object' && contentData !== null 
            ? { ...contentData as Record<string, any>, pages: previousPages }
            : { pages: previousPages };
          
          return { 
            success: true, 
            data: resultData
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
  
  // Fungsi untuk rollback di API kustom
  const rollbackOnCustomApi = async () => {
    try {
      const settings = getSettings();
      
      if (!settings.apiUrl) {
        throw new Error('URL API tidak dikonfigurasi');
      }
      
      // Buat URL endpoint untuk rollback
      const rollbackEndpoint = settings.apiUrl.endsWith('/') 
        ? `${settings.apiUrl}website/rollback` 
        : `${settings.apiUrl}/website/rollback`;
      
      // Buat header dengan API key jika tersedia
      const headers = {
        'Content-Type': 'application/json',
        ...(settings.apiKey && { 'Authorization': `Bearer ${settings.apiKey}` })
      };
      
      // Kirim permintaan rollback ke API kustom
      const response = await fetch(rollbackEndpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          userId: user?.id,
          timestamp: new Date().toISOString()
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API error: ${response.status} - ${errorData.message || response.statusText}`);
      }
      
      const result = await response.json();
      
      if (!result.success) {
        return { success: false, reason: result.reason || 'api-error' };
      }
      
      // Jika respons berisi data versi sebelumnya
      if (result.data) {
        return { 
          success: true, 
          data: result.data
        };
      }
      
      return { success: false, reason: 'no-previous-version' };
    } catch (error) {
      console.error('Error during custom API rollback:', error);
      toast({
        variant: "destructive",
        title: "Error saat rollback via API kustom",
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
