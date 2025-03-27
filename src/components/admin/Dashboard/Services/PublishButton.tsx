
import { Button } from "@/components/ui/button";
import { Globe, RefreshCw } from "lucide-react";

interface PublishButtonProps {
  isPublishing: boolean;
  onClick: () => void;
}

const PublishButton = ({ isPublishing, onClick }: PublishButtonProps) => {
  return (
    <Button 
      onClick={onClick}
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
  );
};

export default PublishButton;
