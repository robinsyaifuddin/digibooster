
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import PartnersEditor from "./PartnersEditor";
import { PartnerItem } from "@/types/websiteTypes";

interface PartnersTabContentProps {
  partners: PartnerItem[];
  handlePartnerChange: (id: string, field: string, value: string) => void;
  deletePartner: (id: string) => void;
  newPartner: Omit<PartnerItem, 'id'>;
  handleNewPartnerChange: (field: string, value: string) => void;
  addNewPartner: () => void;
  handlePublishContent: () => void;
  setActiveTab: (tab: string) => void;
}

const PartnersTabContent = ({ 
  partners, 
  handlePartnerChange, 
  deletePartner,
  newPartner,
  handleNewPartnerChange,
  addNewPartner,
  handlePublishContent,
  setActiveTab
}: PartnersTabContentProps) => {
  return (
    <TabsContent value="partners">
      <div className="space-y-6">
        <PartnersEditor 
          partners={partners}
          handlePartnerChange={handlePartnerChange}
          deletePartner={deletePartner}
          newPartner={newPartner}
          handleNewPartnerChange={handleNewPartnerChange}
          addNewPartner={addNewPartner}
        />
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setActiveTab("home")}>
            Kembali ke Beranda
          </Button>
          <Button onClick={handlePublishContent} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Siap Publikasi
          </Button>
        </div>
      </div>
    </TabsContent>
  );
};

export default PartnersTabContent;
