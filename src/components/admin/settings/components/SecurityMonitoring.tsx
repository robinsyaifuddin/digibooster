
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const SecurityMonitoring: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Pembatasan & Monitoring</h3>
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Rate Limiting</Label>
          <p className="text-sm text-gray-500">Batasi percobaan login (5 kali / 15 menit)</p>
        </div>
        <Switch id="rate-limiting" defaultChecked />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Notifikasi Login Baru</Label>
          <p className="text-sm text-gray-500">Dapatkan email saat ada login dari perangkat baru</p>
        </div>
        <Switch id="login-notification" defaultChecked />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Audit Log</Label>
          <p className="text-sm text-gray-500">Catat semua aktivitas login dan perubahan sensitif</p>
        </div>
        <Switch id="audit-log" defaultChecked />
      </div>
    </div>
  );
};

export default SecurityMonitoring;
