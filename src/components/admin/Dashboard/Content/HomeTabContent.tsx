
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import HeroEditor from "./HeroEditor";
import ServicesEditor from "./ServicesEditor";
import TestimonialsEditor from "./TestimonialsEditor";
import { ServiceItem, TestimonialItem } from "@/types/websiteTypes";
import { motion } from "framer-motion";

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <TabsContent value="home" className="space-y-6">
      <motion.div 
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <HeroEditor 
            heroContent={heroContent} 
            handleHeroChange={handleHeroChange} 
            saveHeroChanges={saveHeroChanges} 
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ServicesEditor 
            services={services} 
            handleServiceChange={handleServiceChange} 
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <TestimonialsEditor 
            testimonials={testimonials}
            handleTestimonialChange={handleTestimonialChange}
          />
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex justify-between">
          <Button variant="outline" onClick={() => setActiveTab("blog")} className="border-dark-300 text-white hover:bg-dark-300">
            Kembali ke Blog
          </Button>
          <Button onClick={handlePublishContent} className="bg-neon-purple hover:bg-neon-violet text-white">
            <Save className="w-4 h-4 mr-2" />
            Siap Publikasi
          </Button>
        </motion.div>
      </motion.div>
    </TabsContent>
  );
};

export default HomeTabContent;
