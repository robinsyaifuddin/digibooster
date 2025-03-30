
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SettingsHeader from './settings/SettingsHeader';
import GeneralSettings from './settings/GeneralSettings';
import PublishingSettings from './settings/PublishingSettings';
import ImplementationSettings from './settings/ImplementationSettings';
import { useToast } from '@/hooks/use-toast';

const WebsiteSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    // Update URL without page refresh using history API
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('tab', tab);
    window.history.pushState({tab}, '', newUrl.toString());
  };

  // Effect to handle browser back/forward buttons and custom events
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.tab) {
        setActiveTab(event.state.tab);
      }
    };
    
    // Handle custom event from ServicesDevelopment component
    const handleSwitchToSettingsTab = (event: CustomEvent) => {
      if (event.detail) {
        setActiveTab(event.detail);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('switchToSettingsTab', handleSwitchToSettingsTab as EventListener);
    
    // Check for tab in URL
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    
    if (tabParam) {
      setActiveTab(tabParam);
    }
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('switchToSettingsTab', handleSwitchToSettingsTab as EventListener);
    };
  }, []);
  
  const handleSwitchToTab = (tab: string) => {
    setActiveTab(tab);
    handleTabChange(tab);
  };

  const handleSaveSettings = () => {
    setSaving(true);
    
    // Simulate saving process with a promise
    new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    })
    .then(() => {
      setSaving(false);
      toast({
        title: "Pengaturan berhasil disimpan",
        description: "Semua perubahan telah disimpan dengan sukses",
      });
    })
    .catch((error) => {
      setSaving(false);
      toast({
        variant: "destructive",
        title: "Gagal menyimpan pengaturan",
        description: error.message || "Terjadi kesalahan saat menyimpan pengaturan",
      });
    });
  };

  return (
    <div className="space-y-6">
      <SettingsHeader activeTab={activeTab} saving={saving} onSave={handleSaveSettings} />
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 overflow-auto bg-white border">
          <TabsTrigger value="general">Pengaturan Umum</TabsTrigger>
          <TabsTrigger value="publishing">Penerbitan & Keamanan</TabsTrigger>
          <TabsTrigger value="implementation" className="relative">
            Implementasi Nyata
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              Baru
            </span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-6">
          <GeneralSettings />
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
