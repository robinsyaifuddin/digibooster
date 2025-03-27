
import React, { useState, useEffect } from 'react';
import { SettingsTabs } from './settings/SettingsTabs';
import GeneralSettings from './settings/GeneralSettings';
import AppearanceSettings from './settings/AppearanceSettings';
import SeoSettings from './settings/SeoSettings';
import PublishingSettings from './settings/PublishingSettings';
import ImplementationSettings from './settings/ImplementationSettings';
import SettingsHeader from './settings/SettingsHeader';
import { useToast } from '@/hooks/use-toast';

const WebsiteSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [implementationComplete, setImplementationComplete] = useState(false);
  
  // Cek status implementasi saat komponen dimuat
  useEffect(() => {
    const implementationStatus = localStorage.getItem('implementation_status');
    if (implementationStatus === 'completed') {
      setImplementationComplete(true);
    }
    
    // Cek jika ada parameter tab di URL
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && ['general', 'appearance', 'seo', 'publishing', 'implementation'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, []);
  
  const handleSave = () => {
    setSaving(true);
    
    // Simulasi penyimpanan pengaturan
    setTimeout(() => {
      setSaving(false);
      
      // Menandai bahwa pengaturan telah diedit
      localStorage.setItem('generalInfoEdited', 'true');
      localStorage.setItem('appearanceEdited', 'true');
      localStorage.setItem('seoEdited', 'true');
      
      // Dispatch event untuk memberi tahu komponen lain tentang perubahan
      const updateEvent = new CustomEvent('settingsUpdated', { 
        detail: { isPermanent: !implementationComplete }
      });
      window.dispatchEvent(updateEvent);
      
      toast({
        title: "Pengaturan disimpan",
        description: implementationComplete 
          ? "Perubahan telah disimpan dan akan terlihat setelah dipublikasikan." 
          : "Perubahan telah disimpan dalam mode simulasi. Untuk penyimpanan permanen, selesaikan pengaturan implementasi.",
        duration: 4000,
      });
    }, 1500);
  };
  
  const getTabTitle = () => {
    switch (activeTab) {
      case 'general':
        return 'Pengaturan Umum';
      case 'appearance':
        return 'Tampilan Website';
      case 'seo':
        return 'Pengaturan SEO';
      case 'publishing':
        return 'Publikasi Website';
      case 'implementation':
        return 'Implementasi Nyata';
      default:
        return 'Pengaturan Website';
    }
  };
  
  return (
    <div>
      <SettingsHeader
        title={getTabTitle()}
        saving={saving}
        onSave={handleSave}
      />
      
      {!implementationComplete && activeTab !== 'implementation' && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md text-amber-800">
          <div className="flex gap-2 items-start">
            <div className="text-amber-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium">Mode Simulasi Aktif</p>
              <p className="text-sm mt-1">
                Website Anda saat ini berjalan dalam mode simulasi menggunakan penyimpanan lokal.
                Untuk implementasi nyata dengan database dan server API, kunjungi 
                <button 
                  onClick={() => setActiveTab('implementation')}
                  className="mx-1 font-medium underline hover:text-amber-900"
                >
                  tab Implementasi Nyata
                </button>.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 mb-6 md:mb-0">
          <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="flex-1">
          {activeTab === 'general' && <GeneralSettings />}
          {activeTab === 'appearance' && <AppearanceSettings />}
          {activeTab === 'seo' && <SeoSettings />}
          {activeTab === 'publishing' && <PublishingSettings onTabChange={setActiveTab} />}
          {activeTab === 'implementation' && <ImplementationSettings />}
        </div>
      </div>
    </div>
  );
};

export default WebsiteSettings;
