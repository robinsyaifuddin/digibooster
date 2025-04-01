
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface ContentTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

const ContentTabs = ({ activeTab, setActiveTab, children }: ContentTabsProps) => {
  return (
    <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-6 overflow-x-auto flex whitespace-nowrap pb-2 scrollbar-none bg-dark-300 p-1 rounded-lg">
        <TabsTrigger value="blog" className="data-[state=active]:bg-neon-purple data-[state=active]:text-white text-gray-300">Blog</TabsTrigger>
        <TabsTrigger value="courses" className="data-[state=active]:bg-neon-purple data-[state=active]:text-white text-gray-300">Kelas</TabsTrigger>
        <TabsTrigger value="portfolio" className="data-[state=active]:bg-neon-purple data-[state=active]:text-white text-gray-300">Portofolio</TabsTrigger>
        <TabsTrigger value="home" className="data-[state=active]:bg-neon-purple data-[state=active]:text-white text-gray-300">Beranda</TabsTrigger>
        <TabsTrigger value="partners" className="data-[state=active]:bg-neon-purple data-[state=active]:text-white text-gray-300">Partner</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export default ContentTabs;
