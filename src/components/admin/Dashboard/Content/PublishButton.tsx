
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface PublishButtonProps {
  onClick: () => void;
}

const PublishButton = ({ onClick }: PublishButtonProps) => {
  return (
    <Button onClick={onClick} className="bg-neon-cyan hover:bg-neon-cyan/90 text-dark-900 font-medium">
      <Save className="w-4 h-4 mr-2" />
      Siap Publikasi
    </Button>
  );
};

export default PublishButton;
