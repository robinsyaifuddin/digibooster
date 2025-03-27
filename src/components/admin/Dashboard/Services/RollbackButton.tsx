
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface RollbackButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const RollbackButton = ({ onClick, disabled }: RollbackButtonProps) => {
  return (
    <Button 
      variant="outline" 
      onClick={onClick}
      disabled={disabled}
    >
      <RotateCcw className="mr-2 h-4 w-4" />
      Rollback ke Versi Sebelumnya
    </Button>
  );
};

export default RollbackButton;
