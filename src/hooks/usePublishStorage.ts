
import { useToast } from "@/hooks/use-toast";

export const usePublishStorage = () => {
  const { toast } = useToast();
  
  const saveWebsiteData = (data: any) => {
    try {
      // Save site data to localStorage with a permanent flag
      localStorage.setItem('websiteData', JSON.stringify(data));
      localStorage.setItem('websiteDataPermanent', 'true');
      
      // Hapus semua flag edit halaman karena sudah dipublikasikan
      if (data?.pages) {
        data.pages.forEach(page => {
          localStorage.removeItem('pageEdited_' + page.id);
        });
      }
      
      return true;
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
  };
  
  const backupCurrentData = () => {
    try {
      // Simpan data website saat ini sebagai backup sebelum mempublikasikan
      const currentData = localStorage.getItem('websiteData');
      if (currentData) {
        localStorage.setItem('websiteDataBackup', currentData);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error creating backup:', error);
      return false;
    }
  };
  
  const restoreFromBackup = () => {
    try {
      // Remove permanent flag
      localStorage.removeItem('websiteDataPermanent');
      
      // Get the previous version from backup if available
      const backupData = localStorage.getItem('websiteDataBackup');
      if (backupData) {
        const parsedBackup = JSON.parse(backupData);
        localStorage.setItem('websiteData', backupData);
        return { success: true, data: parsedBackup };
      }
      
      return { success: false, reason: 'no-backup' };
    } catch (error) {
      console.error('Error restoring from backup:', error);
      return { success: false, reason: 'parse-error', error };
    }
  };
  
  return {
    saveWebsiteData,
    backupCurrentData,
    restoreFromBackup
  };
};
