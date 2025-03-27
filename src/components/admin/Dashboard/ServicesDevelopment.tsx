
import { usePublish } from "@/hooks/usePublish";
import PublishPageHeader from "./Services/PublishPageHeader";
import MainPublishCard from "./Services/MainPublishCard";
import PublishInfoCard from "./Services/PublishInfoCard";
import DomainCard from "./Services/DomainCard";
import UpcomingFeaturesCard from "./Services/UpcomingFeaturesCard";
import PreviewButton from "./Services/PreviewButton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ServicesDevelopmentProps {
  onTabChange: (tab: string) => void;
}

const ServicesDevelopment = ({ onTabChange }: ServicesDevelopmentProps) => {
  const {
    isPublishing,
    publishProgress,
    lastPublished,
    deploymentStatus,
    lastChanges,
    publishChanges,
    handleRollback,
    previewWebsite
  } = usePublish();
  
  return (
    <div className="space-y-6">
      <PublishPageHeader onTabChange={onTabChange} />
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <h3 className="text-blue-800 font-medium mb-2">Panduan Penerbitan Website</h3>
            <p className="text-blue-700 text-sm">
              Sebelum menerbitkan website, pastikan Anda telah memeriksa semua konten. 
              Penerbitan akan membuat perubahan langsung terlihat oleh pengunjung website.
              Jika terjadi error, gunakan fitur Rollback untuk kembali ke versi sebelumnya.
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end gap-2">
          <PreviewButton onClick={previewWebsite} />
        </CardFooter>
      </Card>
      
      <MainPublishCard
        deploymentStatus={deploymentStatus}
        publishProgress={publishProgress}
        lastPublished={lastPublished}
        isPublishing={isPublishing}
        handlePublishChanges={publishChanges}
        handleRollback={handleRollback}
      />
      
      <PublishInfoCard lastPublished={lastPublished} lastChanges={lastChanges} />
      
      <DomainCard />
      
      <UpcomingFeaturesCard />
    </div>
  );
};

export default ServicesDevelopment;
