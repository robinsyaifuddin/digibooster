
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw, Save } from "lucide-react";

interface SettingsHeaderProps {
  title: string;
  saving: boolean;
  onSave: () => void;
}

const SettingsHeader: React.FC<SettingsHeaderProps> = ({ title, saving, onSave }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
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
