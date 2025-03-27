
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface PreviewButtonProps {
  onClick: () => void;
}

const PreviewButton = ({ onClick }: PreviewButtonProps) => {
  return (
    <Button 
      onClick={onClick}
      variant="outline"
    >
      <Eye className="h-4 w-4 mr-2" />
      Lihat Website
    </Button>
  );
};

export default PreviewButton;
