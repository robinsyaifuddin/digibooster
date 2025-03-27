
import { usePublish } from "@/hooks/usePublish";
import PublishPageHeader from "./Services/PublishPageHeader";
import MainPublishCard from "./Services/MainPublishCard";
import PublishInfoCard from "./Services/PublishInfoCard";
import DomainCard from "./Services/DomainCard";
import UpcomingFeaturesCard from "./Services/UpcomingFeaturesCard";

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
    handleRollback
  } = usePublish();
  
  return (
    <div className="space-y-6">
      <PublishPageHeader onTabChange={onTabChange} />
      
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
