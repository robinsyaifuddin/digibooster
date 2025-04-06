
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
      className="border-neon-cyan/40 text-neon-cyan hover:bg-dark-300 hover:border-neon-cyan/80"
    >
      <Eye className="h-4 w-4 mr-2" />
      Lihat Website
    </Button>
  );
};

export default PreviewButton;
