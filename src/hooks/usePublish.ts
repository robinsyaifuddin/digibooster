
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useWebsiteDataStore } from "@/stores/websiteDataStore";

interface UsePublishReturn {
  isPublishing: boolean;
  publishProgress: number;
  lastPublished: string | null;
  deploymentStatus: 'idle' | 'publishing' | 'success' | 'error';
  lastChanges: string[];
  publishChanges: () => Promise<void>;
  handleRollback: () => void;
}

export const usePublish = (): UsePublishReturn => {
  const { toast } = useToast();
  const websiteData = useWebsiteDataStore(state => state);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishProgress, setPublishProgress] = useState(0);
  const [lastPublished, setLastPublished] = useState<string | null>(
    localStorage.getItem('lastPublishTime')
  );
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'publishing' | 'success' | 'error'>('idle');
  const [lastChanges, setLastChanges] = useState<string[]>([]);
  
  useEffect(() => {
    // Load previous publication data
    const storedLastPublished = localStorage.getItem('lastPublishTime');
    if (storedLastPublished) {
      setLastPublished(storedLastPublished);
    }
    
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
  
  const simulateProgressStep = (start: number, end: number, duration: number) => {
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const increment = (end - start) / steps;
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      setPublishProgress(current);
    }, interval);
    
    return new Promise<void>(resolve => {
      setTimeout(() => {
        clearInterval(timer);
        setPublishProgress(end);
        resolve();
      }, duration);
    });
  };
  
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
  
  const publishChanges = async () => {
    setIsPublishing(true);
    setDeploymentStatus('publishing');
    setPublishProgress(0);
    
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
      setLastChanges(changes);
      localStorage.setItem('lastChangesPublished', JSON.stringify(changes));
      
      await simulateProgressStep(90, 100, 500);
      
      // Complete
      setDeploymentStatus('success');
      
      const now = new Date().toLocaleString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      
      setLastPublished(now);
      localStorage.setItem('lastPublishTime', now);
      
      // Show success toast
      toast({
        title: "Website berhasil dipublikasikan",
        description: `Semua perubahan telah live dan dapat dilihat oleh publik pada ${now}`,
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
      setDeploymentStatus('error');
      toast({
        variant: "destructive",
        title: "Gagal mempublikasikan perubahan",
        description: "Terjadi kesalahan saat mempublikasi website. Silakan coba lagi.",
        duration: 5000,
      });
    } finally {
      setIsPublishing(false);
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
