
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";
import PublishButton from "./PublishButton";
import RollbackButton from "./RollbackButton";
import PublishStatus from "./PublishStatus";
import PublishStatusCard from "./PublishStatusCard";

interface MainPublishCardProps {
  deploymentStatus: 'idle' | 'publishing' | 'success' | 'error';
  publishProgress: number;
  lastPublished: string | null;
  isPublishing: boolean;
  handlePublishChanges: () => void;
  handleRollback: () => void;
}

const MainPublishCard = ({
  deploymentStatus,
  publishProgress,
  lastPublished,
  isPublishing,
  handlePublishChanges,
  handleRollback
}: MainPublishCardProps) => {
  return (
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
        <PublishButton 
          isPublishing={isPublishing}
          onClick={handlePublishChanges}
        />
        
        {lastPublished && (
          <RollbackButton 
            onClick={handleRollback}
            disabled={isPublishing}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default MainPublishCard;
