
import { useToast } from "@/hooks/use-toast";
import { useWebsiteDataStore } from "@/stores/websiteDataStore";
import { usePublishProgress } from "./usePublishProgress";
import { usePublishState } from "./usePublishState";
import { usePublishTracking } from "./usePublishTracking";
import { useImplementationSettings } from "./useImplementationSettings";
import { usePublishApi } from "./usePublishApi";
import { usePublishStorage } from "./usePublishStorage";
import { usePublishEvents } from "./usePublishEvents";
import { usePublishNotifications } from "./usePublishNotifications";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { WebsiteData } from "@/types/websiteTypes";

export const usePublish = () => {
  const websiteData = useWebsiteDataStore(state => state);
  const { publishProgress, simulateProgressStep, resetProgress } = usePublishProgress();
  const { isPublishing, deploymentStatus, lastPublished, updatePublishState, recordPublishTime } = usePublishState();
  const { lastChanges, trackChanges, saveChanges } = usePublishTracking();
  const { isRealImplementation, implementationType } = useImplementationSettings();
  const { publishToApi, rollbackOnApi } = usePublishApi();
  const { saveWebsiteData, backupCurrentData, restoreFromBackup } = usePublishStorage();
  const { dispatchContentUpdateEvent, dispatchPageContentUpdates } = usePublishEvents();
  const notifications = usePublishNotifications();
  const { user } = useAuth();
  
  // Fungsi untuk memuat data website dari Supabase (jika menggunakan implementasi nyata)
  const loadWebsiteDataFromSupabase = async (): Promise<WebsiteData | null> => {
    if (!isRealImplementation) return null;
    
    try {
      // Jika implementasi Supabase
      if (implementationType === 'supabase') {
        const { data, error } = await supabase
          .from('website_content')
          .select('content')
          .eq('name', 'main')
          .single();
        
        if (error) {
          console.error('Error loading website data from Supabase:', error);
          return null;
        }
        
        if (data && data.content) {
          return data.content as unknown as WebsiteData;
        }
      } 
      // Jika implementasi kustom
      else if (implementationType === 'custom') {
        // Ambil pengaturan implementasi kustom
        const apiUrl = localStorage.getItem('implementation_apiUrl');
        const apiKey = localStorage.getItem('implementation_apiKey');
        
        if (!apiUrl) {
          console.error('API URL tidak dikonfigurasi');
          return null;
        }
        
        // Buat URL endpoint untuk mengambil data
        const getEndpoint = apiUrl.endsWith('/') 
          ? `${apiUrl}website/get` 
          : `${apiUrl}/website/get`;
        
        // Buat header dengan API key jika tersedia
        const headers = {
          'Content-Type': 'application/json',
          ...(apiKey && { 'Authorization': `Bearer ${apiKey}` })
        };
        
        // Kirim permintaan ke API kustom
        const response = await fetch(getEndpoint, { 
          method: 'GET',
          headers
        });
        
        if (!response.ok) {
          console.error('Error loading website data from custom API:', response.statusText);
          return null;
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
          return result.data as WebsiteData;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error loading website data:', error);
      return null;
    }
  };
  
  const publishChanges = async () => {
    updatePublishState('publishing', true);
    resetProgress();
    
    try {
      // Backup data saat ini
      backupCurrentData();

      // Kumpulkan data halaman yang diedit
      const pageEdits = {};
      websiteData.pages.forEach(page => {
        const isEdited = localStorage.getItem('pageEdited_' + page.id);
        if (isEdited) {
          pageEdits[page.id] = page.content;
        }
      });

      await simulateProgressStep(0, 20, 1000);
      
      notifications.notifyPublishStarted();
      
      await simulateProgressStep(20, 50, 1500);
      
      // Jika implementasi nyata, publikasikan via API
      if (isRealImplementation) {
        try {
          await simulateProgressStep(50, 75, 1500);
          
          notifications.notifyDataSending();
          
          // Kirim data website ke server menggunakan API
          const apiResult = await publishToApi({
            websiteData,
            pageEdits
          });
          
          // Check if there's error from API
          if (!apiResult.success) {
            throw new Error('API error');
          }
          
          // Perbaikan kondisional untuk memeriksa apakah apiResult memiliki properti data
          if ('data' in apiResult && apiResult.data) {
            console.log('Data berhasil dipublikasikan ke API:', apiResult.data);
          }
          
        } catch (apiError) {
          throw new Error('API error');
        }
      } else {
        // Mode simulasi
        await simulateProgressStep(50, 75, 1500);
        notifications.notifySimulationMode();
      }
      
      // Simpan data website
      saveWebsiteData(websiteData);
      
      // Dispatch event untuk memperbarui konten
      dispatchContentUpdateEvent({
        ...websiteData,
        isPermanent: true,
        pageEdits
      });
      
      // Track dan simpan perubahan yang dipublikasikan
      const changes = trackChanges();
      saveChanges(changes);
      
      await simulateProgressStep(90, 100, 500);
      
      // Selesai publikasi
      updatePublishState('success', false);
      
      // Catat waktu publikasi
      const publishTime = recordPublishTime();
      
      // Tambahkan riwayat publikasi jika dalam mode nyata dan menggunakan Supabase
      if (isRealImplementation && implementationType === 'supabase') {
        await supabase.from('publish_history').insert({
          publish_type: 'full',
          published_by: user?.id,
          changes: { changes }
        });
      }
      
      // Tampilkan pesan sukses
      notifications.notifyPublishSuccess(publishTime);
      
    } catch (error) {
      console.error('Publish error:', error);
      updatePublishState('error', false);
      notifications.notifyPublishError(error);
    } finally {
      updatePublishState(deploymentStatus, false);
    }
  };
  
  const handleRollback = async () => {
    notifications.notifyRollbackStarted();
    
    try {
      // Jika implementasi nyata, panggil API untuk rollback
      if (isRealImplementation) {
        try {
          const result = await rollbackOnApi();
          
          if (result.success && 'data' in result && result.data) {
            // Dispatch event dengan data yang dikembalikan dari API
            dispatchContentUpdateEvent(result.data);
            
            if (result.data.pages) {
              dispatchPageContentUpdates(result.data.pages);
            }
            
            notifications.notifyRollbackSuccess();
            return;
          }
        } catch (apiError) {
          console.error('Error during API rollback:', apiError);
        }
      }
      
      // Jika tidak ada implementasi nyata atau API rollback gagal, lakukan rollback lokal
      const result = restoreFromBackup();
      
      if (result.success) {
        // Notify components of rollback
        dispatchContentUpdateEvent(result.data);
        
        // Notifikasi semua komponen tentang perubahan konten halaman
        if (result.data.pages) {
          dispatchPageContentUpdates(result.data.pages);
        }
        
        notifications.notifyRollbackSuccess();
      } else if (result.reason === 'no-backup') {
        notifications.notifyNoBackupAvailable();
      } else {
        notifications.notifyRollbackFailed("Terjadi kesalahan saat mengembalikan versi website.");
      }
    } catch (error) {
      console.error('Rollback error:', error);
      notifications.notifyRollbackFailed();
    }
  };
  
  const previewWebsite = () => {
    // Buka preview website di tab baru
    const previewUrl = window.location.origin;
    window.open(previewUrl, '_blank');
  };
  
  return {
    isPublishing,
    publishProgress,
    lastPublished,
    deploymentStatus,
    lastChanges,
    publishChanges,
    handleRollback,
    previewWebsite,
    isRealImplementation,
    loadWebsiteDataFromSupabase
  };
};
