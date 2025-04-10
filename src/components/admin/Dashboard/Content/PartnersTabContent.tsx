
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
        <div className="bg-dark-300 p-4 rounded-md mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Format Tampilan Partner</h3>
          <p className="text-gray-300 mb-4">Partner akan ditampilkan dalam format marquee dengan background gelap dan logo pada card putih.</p>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
            <span>Pastikan logo memiliki background transparan untuk tampilan terbaik</span>
          </div>
        </div>
        
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
