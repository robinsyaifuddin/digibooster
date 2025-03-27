
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
  
  const publishChanges = async () => {
    updatePublishState('publishing', true);
    resetProgress();
    
    try {
      // Simulate website publishing process with stages
      await simulateProgressStep(0, 20, 1000);
      
      toast({
        title: "Menyiapkan aset",
        description: "Mengoptimalkan gambar dan aset statis...",
        duration: 2000,
      });
      
      await simulateProgressStep(20, 50, 1500);
      
      toast({
        title: "Mengompilasi kode",
        description: "Membangun dan mengoptimalkan codebase...",
        duration: 2000,
      });
      
      await simulateProgressStep(50, 75, 1500);
      
      toast({
        title: "Menerapkan perubahan",
        description: "Mendorong perubahan ke server produksi...",
        duration: 2000,
      });
      
      await simulateProgressStep(75, 90, 1000);
      
      // Save site data to localStorage with a permanent flag
      localStorage.setItem('websiteData', JSON.stringify(websiteData));
      localStorage.setItem('websiteDataPermanent', 'true');
      
      // Create and dispatch an event to notify all components that content has been updated
      const contentUpdateEvent = new CustomEvent('websiteContentUpdated', { 
        detail: {
          ...websiteData,
          isPermanent: true
        }
      });
      
      window.dispatchEvent(contentUpdateEvent);
      
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
        description: `Semua perubahan telah live dan dapat dilihat oleh publik pada ${publishTime}`,
        duration: 5000,
      });
      
      // Simulate CDN cache update
      setTimeout(() => {
        toast({
          title: "Pembaruan CDN selesai",
          description: "Perubahan telah didistribusikan ke semua server CDN",
          duration: 3000,
        });
      }, 2000);
    } catch (error) {
      updatePublishState('error', false);
      toast({
        variant: "destructive",
        title: "Gagal mempublikasikan perubahan",
        description: "Terjadi kesalahan saat mempublikasi website. Silakan coba lagi.",
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
    
    // Simulate rollback
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
        } catch (e) {
          console.error('Error parsing backup data:', e);
        }
      }
      
      toast({
        title: "Rollback selesai",
        description: "Website telah dikembalikan ke versi sebelumnya.",
        duration: 3000,
      });
    }, 2000);
  };
  
  return {
    isPublishing,
    publishProgress,
    lastPublished,
    deploymentStatus,
    lastChanges,
    publishChanges,
    handleRollback
  };
};
