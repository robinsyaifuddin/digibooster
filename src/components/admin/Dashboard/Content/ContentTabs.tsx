
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface ContentTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

const ContentTabs = ({ activeTab, setActiveTab, children }: ContentTabsProps) => {
  return (
    <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-6 overflow-x-auto flex whitespace-nowrap pb-2 scrollbar-none">
        <TabsTrigger value="blog">Blog</TabsTrigger>
        <TabsTrigger value="courses">Kelas</TabsTrigger>
        <TabsTrigger value="portfolio">Portofolio</TabsTrigger>
        <TabsTrigger value="home">Beranda</TabsTrigger>
        <TabsTrigger value="partners">Partner</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export default ContentTabs;
