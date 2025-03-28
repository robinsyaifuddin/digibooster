
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw, Save } from "lucide-react";

interface SettingsHeaderProps {
  title?: string;
  saving?: boolean;
  onSave?: () => void;
  activeTab?: string; // Menambahkan properti activeTab
}

const SettingsHeader: React.FC<SettingsHeaderProps> = ({ 
  title = "Pengaturan Website", 
  saving = false, 
  onSave = () => {}, 
  activeTab 
}) => {
  // Fungsi untuk menentukan judul berdasarkan tab aktif
  const getTabTitle = () => {
    if (!activeTab) return title;
    
    switch (activeTab) {
      case "general": return "Pengaturan Umum";
      case "seo": return "Pengaturan SEO";
      case "appearance": return "Pengaturan Tampilan";
      case "social": return "Pengaturan Media Sosial";
      case "security": return "Pengaturan Keamanan";
      case "publishing": return "Pengaturan Penerbitan";
      case "implementation": return "Pengaturan Implementasi";
      default: return title;
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h1 className="text-2xl font-bold text-gray-800">{getTabTitle()}</h1>
      <div className="flex gap-2 mt-4 md:mt-0">
        <Button variant="outline">
          Lihat Preview
        </Button>
        <Button
          onClick={onSave}
          disabled={saving}
        >
          {saving ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Simpan Pengaturan
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SettingsHeader;
