
import { Button } from '@/components/ui/button';
import { GraduationCap, Globe, Settings, ArrowUpRightFromSquare, Shield } from 'lucide-react';
import { useEffect } from 'react';

interface SettingsTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function SettingsTabs({ activeTab, setActiveTab }: SettingsTabsProps) {
  // Handle tab change without refreshing
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    // Update URL without refresh
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('tab', tab);
    window.history.pushState({tab}, '', newUrl.toString());
  };
  
  // Sync URL with active tab on mount and back/forward navigation
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.tab) {
        setActiveTab(event.state.tab);
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [setActiveTab]);

  return (
    <div className="space-y-2">
      <Button
        variant={activeTab === 'general' ? 'default' : 'ghost'}
        className="w-full justify-start"
        onClick={() => handleTabChange('general')}
      >
        <Settings className="mr-2 h-4 w-4" />
        Pengaturan Umum
      </Button>
      <Button
        variant={activeTab === 'publishing' ? 'default' : 'ghost'}
        className="w-full justify-start"
        onClick={() => handleTabChange('publishing')}
      >
        <Globe className="mr-2 h-4 w-4" />
        Penerbitan & Keamanan
      </Button>
      <Button
        variant={activeTab === 'implementation' ? 'default' : 'ghost'}
        className="w-full justify-start"
        onClick={() => handleTabChange('implementation')}
      >
        <ArrowUpRightFromSquare className="mr-2 h-4 w-4" />
        Implementasi Nyata
      </Button>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Bantuan</h3>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-600"
          onClick={() => window.open('https://docs.example.com', '_blank')}
        >
          <GraduationCap className="mr-2 h-4 w-4" />
          Dokumentasi
        </Button>
      </div>
    </div>
  );
}
