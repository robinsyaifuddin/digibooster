
import { useToast } from "@/hooks/use-toast";
import { useWebsiteDataStore } from "@/stores/websiteDataStore";
import { usePublishProgress } from "./usePublishProgress";
import { usePublishState } from "./usePublishState";
import { usePublishTracking } from "./usePublishTracking";

export const usePublish = () => {
  const { toast } = useToast();
  const websiteData = useWebsiteDataStore(state => state);
  const { publishProgress, simulateProgressStep, resetProgress } = usePublishProgress();
  const { isPublishing, deploymentStatus, lastPublished, updatePublishState, recordPublishTime } = usePublishState();
  const { lastChanges, trackChanges, saveChanges } = usePublishTracking();
  
  // Periksa apakah implementasi nyata telah selesai
  const isRealImplementation = localStorage.getItem('implementation_status') === 'completed';
  
  // Ambil pengaturan implementasi jika sudah selesai
  const getImplementationSettings = () => {
    return {
      apiUrl: localStorage.getItem('implementation_apiUrl') || '',
      apiKey: localStorage.getItem('implementation_apiKey') || '',
      databaseType: localStorage.getItem('implementation_databaseType') || 'mysql',
      backendType: localStorage.getItem('implementation_backendType') || 'php',
      serverProvider: localStorage.getItem('implementation_serverProvider') || ''
    };
  };
  
  const publishChanges = async () => {
    updatePublishState('publishing', true);
    resetProgress();
    
    try {
      // Simpan data website saat ini sebagai backup sebelum mempublikasikan
      const currentData = localStorage.getItem('websiteData');
      if (currentData) {
        localStorage.setItem('websiteDataBackup', currentData);
      }

      // Simpan data halaman yang dipublish
      const pageEdits = {};
      websiteData.pages.forEach(page => {
        const isEdited = localStorage.getItem('pageEdited_' + page.id);
        if (isEdited) {
          pageEdits[page.id] = page.content;
        }
      });

      await simulateProgressStep(0, 20, 1000);
      
      toast({
        title: "Menyiapkan aset",
        description: "Mengoptimalkan gambar dan aset statis...",
        duration: 2000,
      });
      
      await simulateProgressStep(20, 50, 1500);
      
      // Jika implementasi nyata sudah selesai, gunakan API
      if (isRealImplementation) {
        try {
          const { apiUrl, apiKey } = getImplementationSettings();
          
          if (!apiUrl || !apiKey) {
            throw new Error('API URL atau API Key tidak ditemukan. Periksa pengaturan implementasi.');
          }
          
          await simulateProgressStep(50, 75, 1500);
          
          toast({
            title: "Mengirim data ke server",
            description: "Menyinkronkan perubahan dengan server produksi...",
            duration: 2000,
          });
          
          // Kirim data website ke server menggunakan fetch API
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              websiteData,
              pageEdits
            })
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Gagal mengirim data ke server');
          }
          
          const publishResult = await response.json();
          console.log('Publish result:', publishResult);
          
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
      } else {
        // Mode simulasi
        await simulateProgressStep(50, 75, 1500);
        toast({
          title: "Mode Simulasi",
          description: "Perubahan disimpan dalam localStorage browser (mode simulasi).",
          duration: 2000,
        });
      }
      
      // Coba simpan data dengan penanganan error yang lebih baik
      try {
        // Save site data to localStorage with a permanent flag
        localStorage.setItem('websiteData', JSON.stringify(websiteData));
        localStorage.setItem('websiteDataPermanent', 'true');
        
        // Hapus semua flag edit halaman karena sudah dipublikasikan
        websiteData.pages.forEach(page => {
          localStorage.removeItem('pageEdited_' + page.id);
        });
      } catch (storageError) {
        console.error('Error saving to localStorage:', storageError);
        toast({
          variant: "destructive",
          title: "Kesalahan penyimpanan",
          description: "Tidak dapat menyimpan data website. Pastikan browser tidak dalam mode private.",
          duration: 5000,
        });
        throw new Error('Storage error');
      }
      
      // Create and dispatch an event to notify all components that content has been updated
      try {
        const contentUpdateEvent = new CustomEvent('websiteContentUpdated', { 
          detail: {
            ...websiteData,
            isPermanent: true,
            pageEdits
          }
        });
        
        window.dispatchEvent(contentUpdateEvent);
      } catch (eventError) {
        console.error('Error dispatching event:', eventError);
      }
      
      // Track and save published changes
      const changes = trackChanges();
      saveChanges(changes);
      
      await simulateProgressStep(90, 100, 500);
      
      // Complete
      updatePublishState('success', false);
      
      // Record publication time
      const publishTime = recordPublishTime();
      
      // Show success toast
      toast({
        title: "Website berhasil dipublikasikan",
        description: `Semua perubahan telah ${isRealImplementation ? 'tersimpan di database dan' : ''} dapat dilihat oleh publik pada ${publishTime}`,
        duration: 5000,
      });
      
      // Tampilkan informasi implementasi jika masih dalam mode simulasi
      if (!isRealImplementation) {
        setTimeout(() => {
          toast({
            title: "Catatan implementasi nyata",
            description: "Untuk implementasi nyata, Anda perlu mengonfigurasi API dan database server melalui pengaturan Implementasi Nyata.",
            duration: 8000,
          });
        }, 1000);
      }
    } catch (error) {
      console.error('Publish error:', error);
      updatePublishState('error', false);
      toast({
        variant: "destructive",
        title: "Gagal mempublikasikan perubahan",
        description: error.message || "Terjadi kesalahan saat mempublikasi website. Silakan coba lagi.",
        duration: 5000,
      });
    } finally {
      updatePublishState(deploymentStatus, false);
    }
  };
  
  const handleRollback = () => {
    toast({
      title: "Rollback dimulai",
      description: "Mengembalikan website ke versi sebelumnya...",
      duration: 3000,
    });
    
    try {
      // Jika implementasi nyata, panggil API untuk rollback
      if (isRealImplementation) {
        try {
          const { apiUrl, apiKey } = getImplementationSettings();
          
          // Asinkron, tidak menunggu respons
          fetch(`${apiUrl}/rollback`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            }
          }).then(response => {
            if (!response.ok) {
              throw new Error('Gagal melakukan rollback di server');
            }
            return response.json();
          }).then(data => {
            console.log('Rollback result:', data);
          }).catch(error => {
            console.error('Error during API rollback:', error);
            toast({
              variant: "destructive",
              title: "Error saat rollback via API",
              description: error.message,
              duration: 5000,
            });
          });
        } catch (error) {
          console.error('Error preparing API rollback:', error);
        }
      }
      
      // Tetap lakukan rollback lokal
      setTimeout(() => {
        // Remove permanent flag
        localStorage.removeItem('websiteDataPermanent');
        
        // Get the previous version from backup if available
        const backupData = localStorage.getItem('websiteDataBackup');
        if (backupData) {
          try {
            const parsedBackup = JSON.parse(backupData);
            localStorage.setItem('websiteData', backupData);
            
            // Notify components of rollback
            window.dispatchEvent(new CustomEvent('websiteContentUpdated', { 
              detail: parsedBackup
            }));
            
            // Notifikasi semua komponen tentang perubahan konten halaman
            parsedBackup.pages.forEach(page => {
              window.dispatchEvent(new CustomEvent('pageContentUpdated', {
                detail: {
                  pageId: page.id,
                  content: page.content,
                  isPermanent: true,
                  isRollback: true
                }
              }));
            });
            
            toast({
              title: "Rollback selesai",
              description: "Website telah dikembalikan ke versi sebelumnya.",
              duration: 3000,
            });
          } catch (e) {
            console.error('Error parsing backup data:', e);
            toast({
              variant: "destructive",
              title: "Gagal melakukan rollback",
              description: "Terjadi kesalahan saat mengembalikan versi website. Silakan coba lagi.",
              duration: 5000,
            });
          }
        } else {
          toast({
            variant: "destructive",
            title: "Rollback gagal",
            description: "Tidak ada versi backup yang tersedia untuk dikembalikan.",
            duration: 5000,
          });
        }
      }, 2000);
    } catch (error) {
      console.error('Rollback error:', error);
      toast({
        variant: "destructive",
        title: "Rollback gagal",
        description: "Terjadi kesalahan saat mengembalikan versi website. Silakan coba lagi.",
        duration: 5000,
      });
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
    isRealImplementation
  };
};
