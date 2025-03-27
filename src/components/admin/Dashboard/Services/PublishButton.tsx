
import { Button } from "@/components/ui/button";
import { Globe, RefreshCw } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

interface PublishButtonProps {
  isPublishing: boolean;
  onClick: () => void;
  isRealImplementation?: boolean;
}

const PublishButton = ({ isPublishing, onClick, isRealImplementation = false }: PublishButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
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
        </TooltipTrigger>
        <TooltipContent className="bg-amber-50 border-amber-200 text-amber-800 max-w-xs">
          <p className="text-xs">
            {isRealImplementation 
              ? "Perubahan akan disimpan di database dan dipublikasikan ke website sebenarnya."
              : "Mode simulasi: Perubahan disimpan di localStorage browser. Untuk implementasi nyata, diperlukan konfigurasi API dan database."}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PublishButton;
