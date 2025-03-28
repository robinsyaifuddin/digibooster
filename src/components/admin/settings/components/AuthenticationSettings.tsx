
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const AuthenticationSettings: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Autentikasi</h3>
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Autentikasi Dua Faktor (2FA)</Label>
          <p className="text-sm text-gray-500">Tingkatkan keamanan dengan verifikasi dua langkah</p>
        </div>
        <Switch id="two-factor" />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Kedaluwarsa Sesi</Label>
          <p className="text-sm text-gray-500">Logout otomatis setelah 2 jam tidak aktif</p>
        </div>
        <Switch id="session-expiry" defaultChecked />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Login Satu Perangkat</Label>
          <p className="text-sm text-gray-500">Batasi login hanya pada satu perangkat</p>
        </div>
        <Switch id="single-device" />
      </div>
    </div>
  );
};

export default AuthenticationSettings;
