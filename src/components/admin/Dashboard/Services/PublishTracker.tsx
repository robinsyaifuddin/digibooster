
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useWebsiteDataStore } from "@/stores/websiteDataStore";

interface PublishTrackerProps {
  setDeploymentStatus: (status: 'idle' | 'publishing' | 'success' | 'error') => void;
  setPublishProgress: (progress: number) => void;
  setLastPublished: (time: string | null) => void;
  setLastChanges: (changes: string[]) => void;
}

const PublishTracker = ({ 
  setDeploymentStatus, 
  setPublishProgress, 
  setLastPublished, 
  setLastChanges
}: PublishTrackerProps) => {
  const { toast } = useToast();
  const websiteData = useWebsiteDataStore(state => state);
  
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
      
      // Save site data to localStorage
      localStorage.setItem('websiteData', JSON.stringify(websiteData));
      
      // Sync data to homepage by sending an event
      window.dispatchEvent(new CustomEvent('websiteContentUpdated', { 
        detail: websiteData
      }));
      
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
    }
  };
  
  return { publishChanges };
};

export default PublishTracker;
