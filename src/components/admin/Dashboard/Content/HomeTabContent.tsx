
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import HeroEditor from "./HeroEditor";
import ServicesEditor from "./ServicesEditor";
import TestimonialsEditor from "./TestimonialsEditor";
import { ServiceItem, TestimonialItem } from "@/types/websiteTypes";

interface HomeTabContentProps {
  heroContent: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
  };
  handleHeroChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  saveHeroChanges: () => void;
  services: ServiceItem[];
  handleServiceChange: (id: string, field: string, value: string) => void;
  testimonials: TestimonialItem[];
  handleTestimonialChange: (id: string, field: string, value: string) => void;
  handlePublishContent: () => void;
  setActiveTab: (tab: string) => void;
}

const HomeTabContent = ({ 
  heroContent, 
  handleHeroChange, 
  saveHeroChanges,
  services,
  handleServiceChange,
  testimonials,
  handleTestimonialChange,
  handlePublishContent,
  setActiveTab
}: HomeTabContentProps) => {
  return (
    <TabsContent value="home">
      <div className="space-y-6">
        <HeroEditor 
          heroContent={heroContent} 
          handleHeroChange={handleHeroChange} 
          saveHeroChanges={saveHeroChanges} 
        />
        
        <ServicesEditor 
          services={services} 
          handleServiceChange={handleServiceChange} 
        />
        
        <TestimonialsEditor 
          testimonials={testimonials}
          handleTestimonialChange={handleTestimonialChange}
        />
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setActiveTab("blog")}>
            Kembali ke Blog
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

export default HomeTabContent;
