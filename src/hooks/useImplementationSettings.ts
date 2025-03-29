
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";

export const useImplementationSettings = () => {
  const { toast } = useToast();
  
  // Periksa apakah implementasi nyata telah selesai
  const isRealImplementation = localStorage.getItem('implementation_status') === 'completed';
  
  // Periksa tipe implementasi (supabase atau kustom)
  const implementationType = localStorage.getItem('implementation_provider') || 'supabase';
  
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
    try {
      console.log('Memulai aktivasi implementasi nyata...');
      
      // Tambahkan konfigurasi implementasi ke localStorage
      localStorage.setItem('implementation_status', 'completed');
      localStorage.setItem('implementation_provider', 'supabase');
      
      console.log('Konfigurasi implementasi berhasil disimpan di localStorage');
      
      // Reset localStorage jika ada konflik dengan data sebelumnya
      localStorage.removeItem('websiteData');
      localStorage.removeItem('websiteDataPermanent');
      
      console.log('Data simulasi lama telah dihapus dari localStorage');
      
      toast({
        title: "Implementasi nyata diaktifkan",
        description: "Website Anda sekarang terhubung dengan Supabase. Halaman akan dimuat ulang...",
      });
      
      return true;
    } catch (error) {
      console.error('Gagal mengaktifkan implementasi nyata:', error);
      toast({
        variant: "destructive",
        title: "Aktivasi gagal",
        description: `Gagal mengaktifkan implementasi nyata: ${error.message}`,
      });
      return false;
    }
  };
  
  // Verifikasi koneksi dengan Supabase
  const verifySupabaseConnection = async () => {
    try {
      console.log('Memeriksa koneksi Supabase...');
      // Using the project URL directly instead of accessing the protected property
      const projectUrl = 'https://bacnskcizgzcrqusqalu.supabase.co';
      console.log('Supabase URL:', projectUrl);
      
      const { data, error } = await supabase.from('website_content').select('id').limit(1);
      
      if (error) {
        console.error('Koneksi Supabase gagal:', error);
        throw new Error(`Tidak dapat terhubung ke Supabase: ${error.message}`);
      }
      
      console.log('Koneksi Supabase berhasil:', data);
      return { success: true, connected: true, data };
    } catch (error) {
      console.error('Verifikasi koneksi Supabase gagal:', error);
      return { success: false, error: error.message };
    }
  };
  
  // Cek apakah konten website sudah ada di Supabase
  const initializeSupabaseData = async (websiteData) => {
    try {
      console.log('Menginisialisasi data di Supabase...');
      
      // Cek apakah data website sudah ada
      const { data: existingData, error: checkError } = await supabase
        .from('website_content')
        .select('id')
        .eq('name', 'main')
        .single();
      
      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "not found" error
        console.error('Gagal memeriksa data yang ada:', checkError);
        return { success: false, error: checkError };
      }
      
      // Jika data belum ada, masukkan data dari localStorage
      if (!existingData) {
        const { error: insertError } = await supabase
          .from('website_content')
          .insert({
            name: 'main',
            content: websiteData
          });
        
        if (insertError) {
          console.error('Gagal menginisialisasi data Supabase:', insertError);
          return { success: false, error: insertError };
        }
        
        console.log('Data berhasil diinisialisasi di Supabase');
      } else {
        console.log('Data website sudah ada di Supabase');
      }
      
      return { success: true };
    } catch (error) {
      console.error('Inisialisasi data Supabase gagal:', error);
      return { success: false, error: error };
    }
  };
  
  // Implementasi Kustom - Verifikasi koneksi dengan API kustom
  const verifyCustomApiConnection = async (apiUrl, apiKey) => {
    try {
      console.log('Memeriksa koneksi API kustom:', apiUrl);
      
      // Validasi parameter
      if (!apiUrl) {
        return { success: false, error: 'URL API tidak boleh kosong' };
      }
      
      // Buat URL endpoint untuk health check
      const healthCheckUrl = apiUrl.endsWith('/') 
        ? `${apiUrl}health` 
        : `${apiUrl}/health`;
      
      // Buat header dengan API key jika disediakan
      const headers = {
        'Content-Type': 'application/json',
        ...(apiKey && { 'Authorization': `Bearer ${apiKey}` })
      };
      
      // Lakukan permintaan untuk memeriksa koneksi
      const response = await fetch(healthCheckUrl, { 
        method: 'GET',
        headers
      });
      
      if (!response.ok) {
        throw new Error(`Koneksi gagal dengan status: ${response.status}`);
      }
      
      const data = await response.json();
      
      console.log('Koneksi API kustom berhasil:', data);
      return { success: true, connected: true, data };
    } catch (error) {
      console.error('Verifikasi koneksi API kustom gagal:', error);
      return { success: false, error: error.message };
    }
  };
  
  // Aktifkan implementasi kustom
  const activateCustomImplementation = (settings) => {
    try {
      console.log('Memulai aktivasi implementasi kustom...', settings);
      
      if (!settings.apiUrl) {
        throw new Error('URL API tidak boleh kosong');
      }
      
      // Simpan pengaturan implementasi kustom
      localStorage.setItem('implementation_status', 'completed');
      localStorage.setItem('implementation_provider', 'custom');
      localStorage.setItem('implementation_apiUrl', settings.apiUrl);
      localStorage.setItem('implementation_apiKey', settings.apiKey || '');
      localStorage.setItem('implementation_databaseType', settings.databaseType || 'mysql');
      localStorage.setItem('implementation_backendType', settings.backendType || 'php');
      localStorage.setItem('implementation_serverProvider', settings.serverProvider || '');
      
      console.log('Konfigurasi implementasi kustom berhasil disimpan');
      
      // Reset localStorage untuk menghindari konflik data
      localStorage.removeItem('websiteData');
      localStorage.removeItem('websiteDataPermanent');
      
      toast({
        title: "Implementasi kustom diaktifkan",
        description: "Website Anda sekarang terhubung dengan API kustom. Halaman akan dimuat ulang...",
      });
      
      return true;
    } catch (error) {
      console.error('Gagal mengaktifkan implementasi kustom:', error);
      toast({
        variant: "destructive",
        title: "Aktivasi gagal",
        description: `Gagal mengaktifkan implementasi kustom: ${error.message}`,
      });
      return false;
    }
  };
  
  return {
    isRealImplementation,
    implementationType,
    getSettings,
    activateRealImplementation,
    verifySupabaseConnection,
    initializeSupabaseData,
    verifyCustomApiConnection,
    activateCustomImplementation
  };
};
