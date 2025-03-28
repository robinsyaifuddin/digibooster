import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SettingsHeader from './settings/SettingsHeader';
import GeneralSettings from './settings/GeneralSettings';
import SeoSettings from './settings/SeoSettings';
import AppearanceSettings from './settings/AppearanceSettings';
import PublishingSettings from './settings/PublishingSettings';
import SecuritySettings from './settings/SecuritySettings';
import SocialMediaSettings from './settings/SocialMediaSettings';
import ImplementationSettings from './settings/ImplementationSettings';
import { useToast } from '@/hooks/use-toast';

const WebsiteSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    // Perbarui URL dengan tab aktif
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('tab', tab);
    window.history.pushState({}, '', newUrl);
  };

  React.useEffect(() => {
    // Check for tab in URL
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, []);
  
  const handleSwitchToTab = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSaveSettings = () => {
    setSaving(true);
    
    // Simulasi proses penyimpanan
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Pengaturan berhasil disimpan",
        description: "Semua perubahan telah disimpan dengan sukses",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <SettingsHeader activeTab={activeTab} saving={saving} onSave={handleSaveSettings} />
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 overflow-auto bg-white border">
          <TabsTrigger value="general">Umum</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="appearance">Tampilan</TabsTrigger>
          <TabsTrigger value="social">Media Sosial</TabsTrigger>
          <TabsTrigger value="security" className="relative">
            Keamanan
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              Baru
            </span>
          </TabsTrigger>
          <TabsTrigger value="publishing">Penerbitan</TabsTrigger>
          <TabsTrigger value="implementation" className="relative">
            Implementasi
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              Baru
            </span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-6">
          <GeneralSettings />
        </TabsContent>
        
        <TabsContent value="seo" className="mt-6">
          <SeoSettings />
        </TabsContent>
        
        <TabsContent value="appearance" className="mt-6">
          <AppearanceSettings />
        </TabsContent>
        
        <TabsContent value="social" className="mt-6">
          <SocialMediaSettings />
        </TabsContent>
        
        <TabsContent value="security" className="mt-6">
          <SecuritySettings />
        </TabsContent>
        
        <TabsContent value="publishing" className="mt-6">
          <PublishingSettings onTabChange={handleSwitchToTab} />
        </TabsContent>
        
        <TabsContent value="implementation" className="mt-6">
          <ImplementationSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebsiteSettings;
