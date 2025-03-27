
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsIcon, Palette, LayoutGrid, Search, Facebook, Globe } from "lucide-react";

interface SettingsTabsProps {
  activeTab: string;
}

const SettingsTabs: React.FC<SettingsTabsProps> = ({ activeTab }) => {
  return (
    <TabsList className="w-full md:w-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
      <TabsTrigger value="general" className="flex items-center">
        <SettingsIcon className="w-4 h-4 mr-2" />
        Umum
      </TabsTrigger>
      <TabsTrigger value="appearance" className="flex items-center">
        <Palette className="w-4 h-4 mr-2" />
        Tampilan
      </TabsTrigger>
      <TabsTrigger value="pages" className="flex items-center">
        <LayoutGrid className="w-4 h-4 mr-2" />
        Halaman
      </TabsTrigger>
      <TabsTrigger value="seo" className="flex items-center">
        <Search className="w-4 h-4 mr-2" />
        SEO
      </TabsTrigger>
      <TabsTrigger value="social" className="flex items-center">
        <Facebook className="w-4 h-4 mr-2" />
        Sosial Media
      </TabsTrigger>
      <TabsTrigger value="publishing" className="flex items-center">
        <Globe className="w-4 h-4 mr-2" />
        Publikasi
      </TabsTrigger>
    </TabsList>
  );
};

export default SettingsTabs;
