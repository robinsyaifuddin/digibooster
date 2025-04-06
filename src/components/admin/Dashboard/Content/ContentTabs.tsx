
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

interface ContentTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

const ContentTabs = ({ activeTab, setActiveTab, children }: ContentTabsProps) => {
  // Animation variants for the tab elements
  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={tabVariants}
      className="w-full"
    >
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 overflow-x-auto flex whitespace-nowrap pb-2 scrollbar-none bg-dark-300 p-1 rounded-lg">
          <TabsTrigger value="blog" className="data-[state=active]:bg-neon-purple data-[state=active]:text-white text-gray-300">Blog</TabsTrigger>
          <TabsTrigger value="courses" className="data-[state=active]:bg-neon-purple data-[state=active]:text-white text-gray-300">Kelas</TabsTrigger>
          <TabsTrigger value="portfolio" className="data-[state=active]:bg-neon-purple data-[state=active]:text-white text-gray-300">Portofolio</TabsTrigger>
          <TabsTrigger value="home" className="data-[state=active]:bg-neon-purple data-[state=active]:text-white text-gray-300">Beranda</TabsTrigger>
          <TabsTrigger value="partners" className="data-[state=active]:bg-neon-purple data-[state=active]:text-white text-gray-300">Partner</TabsTrigger>
        </TabsList>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </Tabs>
    </motion.div>
  );
};

export default ContentTabs;
