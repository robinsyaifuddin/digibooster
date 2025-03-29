
import { Button } from '@/components/ui/button';
import { GraduationCap, Globe, Settings, Palette, Search, ArrowUpRightFromSquare, Shield } from 'lucide-react';

interface SettingsTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function SettingsTabs({ activeTab, setActiveTab }: SettingsTabsProps) {
  return (
    <div className="space-y-2">
      <Button
        variant={activeTab === 'general' ? 'default' : 'ghost'}
        className="w-full justify-start"
        onClick={() => setActiveTab('general')}
      >
        <Settings className="mr-2 h-4 w-4" />
        Pengaturan Umum
      </Button>
      <Button
        variant={activeTab === 'publishing' ? 'default' : 'ghost'}
        className="w-full justify-start"
        onClick={() => setActiveTab('publishing')}
      >
        <Globe className="mr-2 h-4 w-4" />
        Penerbitan & Keamanan
      </Button>
      <Button
        variant={activeTab === 'implementation' ? 'default' : 'ghost'}
        className="w-full justify-start"
        onClick={() => setActiveTab('implementation')}
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
