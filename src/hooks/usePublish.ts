
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

export const usePublish = () => {
  const websiteData = useWebsiteDataStore(state => state);
  const { publishProgress, simulateProgressStep, resetProgress } = usePublishProgress();
  const { isPublishing, deploymentStatus, lastPublished, updatePublishState, recordPublishTime } = usePublishState();
  const { lastChanges, trackChanges, saveChanges } = usePublishTracking();
  const { isRealImplementation } = useImplementationSettings();
  const { publishToApi, rollbackOnApi } = usePublishApi();
  const { saveWebsiteData, backupCurrentData, restoreFromBackup } = usePublishStorage();
  const { dispatchContentUpdateEvent, dispatchPageContentUpdates } = usePublishEvents();
  const notifications = usePublishNotifications();
  
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
          await publishToApi({
            websiteData,
            pageEdits
          });
          
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
  
  const handleRollback = () => {
    notifications.notifyRollbackStarted();
    
    try {
      // Jika implementasi nyata, panggil API untuk rollback
      if (isRealImplementation) {
        // Asinkron, tidak menunggu respons
        rollbackOnApi().catch(error => {
          console.error('Error during API rollback:', error);
        });
      }
      
      // Tetap lakukan rollback lokal
      setTimeout(() => {
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
      }, 2000);
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
    isRealImplementation
  };
};
