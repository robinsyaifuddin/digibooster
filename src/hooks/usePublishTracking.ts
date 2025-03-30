
import { useState, useEffect } from 'react';
import { useWebsiteDataStore } from "@/stores/websiteDataStore";

export const usePublishTracking = () => {
  const [lastChanges, setLastChanges] = useState<string[] | null>(null);
  const websiteData = useWebsiteDataStore();
  
  // Muat perubahan terakhir dari localStorage saat komponen dimount
  useEffect(() => {
    const storedChanges = localStorage.getItem('lastChanges');
    if (storedChanges) {
      try {
        setLastChanges(JSON.parse(storedChanges));
      } catch (e) {
        console.error('Error parsing last changes:', e);
        setLastChanges(null);
      }
    }
  }, []);
  
  // Fungsi untuk melacak perubahan yang telah dilakukan
  const trackChanges = (): string[] => {
    // Dapatkan informasi tentang halaman yang diedit
    const editedPages = websiteData.pages
      .filter(page => localStorage.getItem('pageEdited_' + page.id))
      .map(page => `Halaman "${page.title}" telah diperbarui`);
    
    // Cek apakah pengaturan umum telah diubah
    const generalSettingsEdited = localStorage.getItem('generalSettingsEdited') === 'true';
    const appearanceSettingsEdited = localStorage.getItem('appearanceSettingsEdited') === 'true';
    const seoSettingsEdited = localStorage.getItem('seoSettingsEdited') === 'true';
    
    // Buat daftar perubahan
    const changes: string[] = [];
    
    if (editedPages.length > 0) {
      changes.push(...editedPages);
    }
    
    if (generalSettingsEdited) {
      changes.push('Pengaturan umum website telah diperbarui');
    }
    
    if (appearanceSettingsEdited) {
      changes.push('Tampilan dan tema website telah diperbarui');
    }
    
    if (seoSettingsEdited) {
      changes.push('Pengaturan SEO telah diperbarui');
    }
    
    // Jika tidak ada perubahan terdeteksi, berikan pesan umum
    if (changes.length === 0) {
      changes.push('Website telah diperbarui');
    }
    
    return changes;
  };
  
  // Simpan perubahan ke localStorage
  const saveChanges = (changes: string[]) => {
    setLastChanges(changes);
    localStorage.setItem('lastChanges', JSON.stringify(changes));
    
    // Reset status edit setelah publikasi
    websiteData.pages.forEach(page => {
      localStorage.removeItem('pageEdited_' + page.id);
    });
    
    localStorage.removeItem('generalSettingsEdited');
    localStorage.removeItem('appearanceSettingsEdited');
    localStorage.removeItem('seoSettingsEdited');
  };
  
  return {
    lastChanges,
    trackChanges,
    saveChanges
  };
};
