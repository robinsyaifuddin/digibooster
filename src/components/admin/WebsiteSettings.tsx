
import React, { useState } from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useWebsiteDataStore } from '@/stores/websiteDataStore';
import GeneralSettings from './settings/GeneralSettings';
import AppearanceSettings from './settings/AppearanceSettings';
import SeoSettings from './settings/SeoSettings';
import SocialMediaSettings from './settings/SocialMediaSettings';
import PublishingSettings from './settings/PublishingSettings';
import SettingsHeader from './settings/SettingsHeader';
import SettingsTabs from './settings/SettingsTabs';
import PageEditor from './Dashboard/PageEditor';

const WebsiteSettings = () => {
  const { toast } = useToast();
  const websiteData = useWebsiteDataStore();
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const handleSave = () => {
    setSaving(true);
    
    // Simulate saving data
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Pengaturan berhasil disimpan",
        description: "Perubahan pada pengaturan website telah berhasil disimpan.",
      });
    }, 1500);
  };

  return (
    <div>
      <SettingsHeader 
        title="Pengaturan Website" 
        saving={saving} 
        onSave={handleSave} 
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <SettingsTabs activeTab={activeTab} />

        {/* Content Tabs */}
        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>

        <TabsContent value="appearance">
          <AppearanceSettings />
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          <PageEditor pages={websiteData.pages} />
        </TabsContent>

        <TabsContent value="seo">
          <SeoSettings />
        </TabsContent>

        <TabsContent value="social">
          <SocialMediaSettings />
        </TabsContent>

        <TabsContent value="publishing">
          <PublishingSettings onTabChange={setActiveTab} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebsiteSettings;
