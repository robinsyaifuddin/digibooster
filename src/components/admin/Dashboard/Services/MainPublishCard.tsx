
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Server } from "lucide-react";
import PublishButton from "./PublishButton";
import RollbackButton from "./RollbackButton";
import PublishStatus from "./PublishStatus";
import PublishStatusCard from "./PublishStatusCard";

interface MainPublishCardProps {
  deploymentStatus: 'idle' | 'publishing' | 'success' | 'error';
  publishProgress: number;
  lastPublished: string | null;
  isPublishing: boolean;
  isRealImplementation?: boolean;
  handlePublishChanges: () => void;
  handleRollback: () => void;
}

const MainPublishCard = ({
  deploymentStatus,
  publishProgress,
  lastPublished,
  isPublishing,
  isRealImplementation = false,
  handlePublishChanges,
  handleRollback
}: MainPublishCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isRealImplementation ? (
            <>
              <Server className="h-5 w-5 text-green-600" />
              Publikasi Website ke Server Produksi
            </>
          ) : (
            <>
              <Globe className="h-5 w-5" />
              Publikasi Real-Time Website
            </>
          )}
        </CardTitle>
        <CardDescription>
          {isRealImplementation 
            ? "Publikasikan perubahan website ke server produksi dengan database nyata"
            : "Publikasikan perubahan website agar dapat dilihat secara real-time oleh pengguna publik (mode simulasi)"}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <PublishStatus 
          deploymentStatus={deploymentStatus} 
          publishProgress={publishProgress} 
          lastPublished={lastPublished}
          isRealImplementation={isRealImplementation}
        />
        
        <PublishStatusCard 
          deploymentStatus={deploymentStatus} 
          lastPublished={lastPublished}
          isRealImplementation={isRealImplementation}
        />
      </CardContent>
      
      <CardFooter className="flex flex-wrap gap-4">
        <PublishButton 
          isPublishing={isPublishing}
          onClick={handlePublishChanges}
          isRealImplementation={isRealImplementation}
        />
        
        {lastPublished && (
          <RollbackButton 
            onClick={handleRollback}
            disabled={isPublishing}
            isRealImplementation={isRealImplementation}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default MainPublishCard;
