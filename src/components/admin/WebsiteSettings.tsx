
import React, { useState } from 'react';
import { SettingsTabs } from './settings/SettingsTabs';
import { GeneralSettings } from './settings/GeneralSettings';
import { AppearanceSettings } from './settings/AppearanceSettings';
import { SeoSettings } from './settings/SeoSettings';
import PublishingSettings from './settings/PublishingSettings';
import ImplementationSettings from './settings/ImplementationSettings';
import SettingsHeader from './settings/SettingsHeader';

const WebsiteSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  
  const handleSave = () => {
    setSaving(true);
    
    // Simulate saving settings
    setTimeout(() => {
      setSaving(false);
      
      // Menandai bahwa pengaturan telah diedit
      localStorage.setItem('generalInfoEdited', 'true');
      localStorage.setItem('appearanceEdited', 'true');
      localStorage.setItem('seoEdited', 'true');
      
      // Dispatch event untuk memberi tahu komponen lain tentang perubahan
      const updateEvent = new CustomEvent('settingsUpdated', { 
        detail: { isPermanent: false }
      });
      window.dispatchEvent(updateEvent);
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
