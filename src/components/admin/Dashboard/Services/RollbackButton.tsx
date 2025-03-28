
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

interface RollbackButtonProps {
  onClick: () => void;
  disabled: boolean;
  isRealImplementation?: boolean;
}

const RollbackButton = ({ onClick, disabled, isRealImplementation = false }: RollbackButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            onClick={onClick}
            disabled={disabled}
            variant="outline"
            className="border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Kembali ke Versi Sebelumnya
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-amber-50 border-amber-200 text-amber-800 max-w-xs">
          <p className="text-xs">
            {isRealImplementation
              ? "Mengembalikan website ke versi yang dipublikasikan sebelumnya dari database."
              : "Mengembalikan website ke versi sebelumnya yang tersimpan di browser."}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RollbackButton;
