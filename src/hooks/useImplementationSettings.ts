
import { supabase } from "@/integrations/supabase/client";

export const useImplementationSettings = () => {
  // Periksa apakah implementasi nyata telah selesai
  const isRealImplementation = localStorage.getItem('implementation_status') === 'completed';
  
  // Ambil pengaturan implementasi jika sudah selesai
  const getSettings = () => {
    return {
      apiUrl: localStorage.getItem('implementation_apiUrl') || '',
      apiKey: localStorage.getItem('implementation_apiKey') || '',
      databaseType: localStorage.getItem('implementation_databaseType') || 'mysql',
      backendType: localStorage.getItem('implementation_backendType') || 'php',
      serverProvider: localStorage.getItem('implementation_serverProvider') || ''
    };
  };
  
  // Aktifkan implementasi nyata menggunakan Supabase
  const activateRealImplementation = () => {
    localStorage.setItem('implementation_status', 'completed');
    localStorage.setItem('implementation_provider', 'supabase');
    
    // Reset localStorage jika ada konflik dengan data sebelumnya
    localStorage.removeItem('websiteData');
    localStorage.removeItem('websiteDataPermanent');
    
    return true;
  };
  
  // Verifikasi koneksi dengan Supabase
  const verifySupabaseConnection = async () => {
    try {
      const { data, error } = await supabase.from('website_content').select('id').limit(1);
      
      if (error) {
        throw new Error(`Tidak dapat terhubung ke Supabase: ${error.message}`);
      }
      
      return { success: true, connected: true };
    } catch (error) {
      console.error('Verifikasi koneksi Supabase gagal:', error);
      return { success: false, error: error.message };
    }
  };
  
  return {
    isRealImplementation,
    getSettings,
    activateRealImplementation,
    verifySupabaseConnection
  };
};
