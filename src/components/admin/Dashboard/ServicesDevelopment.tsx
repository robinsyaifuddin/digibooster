
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import PublishButton from "./Services/PublishButton";
import PublishStatus from "./Services/PublishStatus";
import PublishStatusCard from "./Services/PublishStatusCard";
import PublishInfoCard from "./Services/PublishInfoCard";
import DomainCard from "./Services/DomainCard";
import UpcomingFeaturesCard from "./Services/UpcomingFeaturesCard";
import PreviewButton from "./Services/PreviewButton";
import RollbackButton from "./Services/RollbackButton";
import MainPublishCard from "./Services/MainPublishCard";
import PublishTracker from "./Services/PublishTracker";

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
  
  const { publishChanges } = PublishTracker({
    setDeploymentStatus,
    setPublishProgress,
    setLastPublished,
    setLastChanges
  });
  
  const handlePublishChanges = async () => {
    setIsPublishing(true);
    await publishChanges();
    setIsPublishing(false);
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
          <PreviewButton onClick={handlePreviewWebsite} />
          <Button 
            onClick={() => onTabChange('overview')}
            variant="outline"
          >
            Kembali ke Dashboard
          </Button>
        </div>
      </div>
      
      <MainPublishCard
        deploymentStatus={deploymentStatus}
        publishProgress={publishProgress}
        lastPublished={lastPublished}
        isPublishing={isPublishing}
        handlePublishChanges={handlePublishChanges}
        handleRollback={handleRollback}
      />
      
      <PublishInfoCard lastPublished={lastPublished} lastChanges={lastChanges} />
      
      <DomainCard />
      
      <UpcomingFeaturesCard />
    </div>
  );
};

export default ServicesDevelopment;
