
import { Button } from "@/components/ui/button";
import PreviewButton from "./PreviewButton";

interface PublishPageHeaderProps {
  onTabChange: (tab: string) => void;
}

const PublishPageHeader = ({ onTabChange }: PublishPageHeaderProps) => {
  const handlePreviewWebsite = () => {
    // Open new tab for website preview
    window.open('/', '_blank');
  };

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-800">Publikasi Website</h2>
      <div className="flex gap-2">
        <PreviewButton onClick={handlePreviewWebsite} />
        <Button 
          onClick={() => onTabChange('overview')}
          variant="outline"
        >
          Kembali ke Dashboard
        </Button>
      </div>
    </div>
  );
};

export default PublishPageHeader;
