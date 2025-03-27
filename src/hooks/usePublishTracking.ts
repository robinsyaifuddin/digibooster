
import { useState, useEffect } from "react";

export interface PublishChange {
  id: string;
  description: string;
  timestamp: string;
}

export const usePublishTracking = () => {
  const [lastChanges, setLastChanges] = useState<string[]>([]);
  
  useEffect(() => {
    // Load previous changes data
    const storedLastChanges = localStorage.getItem('lastChangesPublished');
    if (storedLastChanges) {
      try {
        setLastChanges(JSON.parse(storedLastChanges));
      } catch (e) {
        console.error('Error parsing stored changes', e);
        setLastChanges([]);
      }
    }
  }, []);
  
  const trackChanges = (): string[] => {
    const changes: string[] = [];
    
    // Track changes made
    if (localStorage.getItem('heroContentEdited') === 'true') {
      changes.push('Konten Hero Section diperbarui');
      localStorage.removeItem('heroContentEdited');
    }
    
    if (localStorage.getItem('servicesEdited') === 'true') {
      changes.push('Layanan diperbarui');
      localStorage.removeItem('servicesEdited');
    }
    
    if (localStorage.getItem('testimonialsEdited') === 'true') {
      changes.push('Testimonial diperbarui');
      localStorage.removeItem('testimonialsEdited');
    }
    
    if (localStorage.getItem('partnersEdited') === 'true') {
      changes.push('Partner perusahaan diperbarui');
      localStorage.removeItem('partnersEdited');
    }
    
    if (localStorage.getItem('generalInfoEdited') === 'true') {
      changes.push('Informasi umum website diperbarui');
      localStorage.removeItem('generalInfoEdited');
    }
    
    if (localStorage.getItem('seoEdited') === 'true') {
      changes.push('Pengaturan SEO diperbarui');
      localStorage.removeItem('seoEdited');
    }
    
    if (localStorage.getItem('appearanceEdited') === 'true') {
      changes.push('Tampilan website diperbarui');
      localStorage.removeItem('appearanceEdited');
    }
    
    // If no changes were recorded
    if (changes.length === 0) {
      changes.push('Website dipublikasikan');
    }
    
    return changes;
  };
  
  const saveChanges = (changes: string[]) => {
    setLastChanges(changes);
    localStorage.setItem('lastChangesPublished', JSON.stringify(changes));
  };
  
  return {
    lastChanges,
    trackChanges,
    saveChanges
  };
};
