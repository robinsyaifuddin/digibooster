
import { useWebsiteDataStore } from "@/stores/websiteDataStore";

export const usePublishStorage = () => {
  const websiteData = useWebsiteDataStore();
  
  // Simpan data website ke localStorage
  const saveWebsiteData = (data: any) => {
    localStorage.setItem('websiteData', JSON.stringify(data));
    localStorage.setItem('websiteDataPermanent', JSON.stringify(data));
  };
  
  // Buat backup data saat ini sebelum publikasi
  const backupCurrentData = () => {
    // Simpan data saat ini ke localStorage sebagai backup
    try {
      localStorage.setItem('websiteDataBackup', JSON.stringify(websiteData));
      localStorage.setItem('websiteDataBackupTime', new Date().toISOString());
      return true;
    } catch (error) {
      console.error('Error creating backup:', error);
      return false;
    }
  };
  
  // Pulihkan dari backup jika terjadi masalah
  const restoreFromBackup = () => {
    try {
      // Cek apakah ada backup tersedia
      const backupData = localStorage.getItem('websiteDataBackup');
      const backupTime = localStorage.getItem('websiteDataBackupTime');
      
      if (!backupData || !backupTime) {
        return { success: false, reason: 'no-backup' };
      }
      
      // Parse data backup
      const parsedData = JSON.parse(backupData);
      
      // Perbarui store dengan data backup
      Object.keys(parsedData).forEach(key => {
        // Hanya perbarui properti data, bukan method
        if (typeof parsedData[key] !== 'function' && typeof websiteData[`update${key.charAt(0).toUpperCase() + key.slice(1)}`] === 'function') {
          const updateMethod = websiteData[`update${key.charAt(0).toUpperCase() + key.slice(1)}`];
          updateMethod(parsedData[key]);
        }
      });
      
      // Simpan kembali data ke localStorage
      localStorage.setItem('websiteData', backupData);
      
      return { 
        success: true, 
        data: parsedData,
        backupTime
      };
      
    } catch (error) {
      console.error('Error restoring from backup:', error);
      return { success: false, reason: 'error', error };
    }
  };
  
  return {
    saveWebsiteData,
    backupCurrentData,
    restoreFromBackup
  };
};
