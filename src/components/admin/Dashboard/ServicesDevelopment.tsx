
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw, Globe, Eye, RotateCcw, ExternalLink } from "lucide-react";
import { useWebsiteDataStore } from "@/stores/websiteDataStore";
import PublishStatus from "./Services/PublishStatus";
import PublishStatusCard from "./Services/PublishStatusCard";
import PublishInfoCard from "./Services/PublishInfoCard";
import DomainCard from "./Services/DomainCard";
import UpcomingFeaturesCard from "./Services/UpcomingFeaturesCard";

interface ServicesDevelopmentProps {
  onTabChange: (tab: string) => void;
}

const ServicesDevelopment = ({ onTabChange }: ServicesDevelopmentProps) => {
  const { toast } = useToast();
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishProgress, setPublishProgress] = useState(0);
  const [lastPublished, setLastPublished] = useState<string | null>(
    localStorage.getItem('lastPublishTime')
  );
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'publishing' | 'success' | 'error'>('idle');
  const websiteData = useWebsiteDataStore(state => state);
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
  
  const handlePublishChanges = async () => {
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
      toast({
        title: "Rollback selesai",
        description: "Website telah dikembalikan ke versi sebelumnya.",
        duration: 3000,
      });
    }, 2000);
  };
  
  const handlePreviewWebsite = () => {
    // Open new tab for website preview
    window.open('/', '_blank');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Publikasi Website</h2>
        <div className="flex gap-2">
          <Button 
            onClick={handlePreviewWebsite}
            variant="outline"
          >
            <Eye className="h-4 w-4 mr-2" />
            Lihat Website
          </Button>
          <Button 
            onClick={() => onTabChange('overview')}
            variant="outline"
          >
            Kembali ke Dashboard
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Publikasi Real-Time Website
          </CardTitle>
          <CardDescription>
            Publikasikan perubahan website agar dapat dilihat secara real-time oleh pengguna publik
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <PublishStatus 
            deploymentStatus={deploymentStatus} 
            publishProgress={publishProgress} 
            lastPublished={lastPublished} 
          />
          
          <PublishStatusCard 
            deploymentStatus={deploymentStatus} 
            lastPublished={lastPublished} 
          />
        </CardContent>
        
        <CardFooter className="flex flex-wrap gap-4">
          <Button 
            onClick={handlePublishChanges}
            disabled={isPublishing}
            className="bg-green-600 hover:bg-green-700"
          >
            {isPublishing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Mempublikasikan...
              </>
            ) : (
              <>
                <Globe className="mr-2 h-4 w-4" />
                Publikasikan Sekarang
              </>
            )}
          </Button>
          
          {lastPublished && (
            <Button 
              variant="outline" 
              onClick={handleRollback}
              disabled={isPublishing}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Rollback ke Versi Sebelumnya
            </Button>
          )}
        </CardFooter>
      </Card>
      
      <PublishInfoCard lastPublished={lastPublished} lastChanges={lastChanges} />
      
      <DomainCard />
      
      <UpcomingFeaturesCard />
    </div>
  );
};

export default ServicesDevelopment;
