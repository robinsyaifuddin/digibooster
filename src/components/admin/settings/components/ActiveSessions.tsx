
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const ActiveSessions: React.FC = () => {
  const { logoutFromAllDevices } = useAuth();

  const handleLogoutAllDevices = () => {
    if (logoutFromAllDevices) {
      logoutFromAllDevices();
    }
  };

  return (
    <div>
      <h3 className="text-sm font-medium mb-3">Sesi Aktif</h3>
      
      <div className="border rounded-md divide-y">
        <div className="p-3 flex items-center justify-between bg-gray-50">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <div>
              <p className="text-sm font-medium">Perangkat Ini</p>
              <p className="text-xs text-gray-500">Chrome di Windows • Bandar Lampung, Indonesia</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Saat Ini
          </Badge>
        </div>
      </div>
      
      <div className="mt-3">
        <Button variant="outline" size="sm" onClick={handleLogoutAllDevices}>
          Logout Dari Semua Perangkat
        </Button>
      </div>
    </div>
  );
};

export default ActiveSessions;
