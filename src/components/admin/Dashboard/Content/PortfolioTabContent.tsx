
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PortfolioGrid from "./PortfolioGrid";
import { TabsContent } from "@/components/ui/tabs";

interface PortfolioProps {
  id: number;
  title: string;
  category: string;
  client: string;
}

interface PortfolioTabContentProps {
  portfolios: PortfolioProps[];
}

const PortfolioTabContent = ({ portfolios }: PortfolioTabContentProps) => {
  return (
    <TabsContent value="portfolio">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
        <h3 className="text-lg font-semibold">Portofolio</h3>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Portofolio
        </Button>
      </div>
      
      <PortfolioGrid portfolios={portfolios} />
    </TabsContent>
  );
};

export default PortfolioTabContent;
