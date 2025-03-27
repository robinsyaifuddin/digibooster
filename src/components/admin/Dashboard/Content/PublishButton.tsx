
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface PublishButtonProps {
  onClick: () => void;
}

const PublishButton = ({ onClick }: PublishButtonProps) => {
  return (
    <Button onClick={onClick} className="bg-green-600 hover:bg-green-700">
      <Save className="w-4 h-4 mr-2" />
      Siap Publikasi
    </Button>
  );
};

export default PublishButton;
