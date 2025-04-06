
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Clock, Monitor, Smartphone, Laptop, LogOut } from 'lucide-react';

type SessionDevice = {
  id: string;
  device: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  location: string;
  ip: string;
  lastActive: string;
  current: boolean;
};

const ActiveSessions = () => {
  const auth = useAuth();
  const { toast } = useToast();

  // Mock data for active sessions
  const [sessions] = useState<SessionDevice[]>([
    {
      id: '1',
      device: 'desktop',
      browser: 'Chrome 98.0.4758',
      location: 'Jakarta, Indonesia',
      ip: '103.158.xx.xx',
      lastActive: 'Aktif sekarang',
      current: true,
    },
    {
      id: '2',
      device: 'mobile',
      browser: 'Safari Mobile 15.4',
      location: 'Bandung, Indonesia',
      ip: '112.215.xx.xx',
      lastActive: '3 jam yang lalu',
      current: false,
    },
    {
      id: '3',
      device: 'tablet',
      browser: 'Firefox 97.0.1',
      location: 'Surabaya, Indonesia',
      ip: '103.10.xx.xx',
      lastActive: '1 hari yang lalu',
      current: false,
    },
  ]);

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'mobile':
        return <Smartphone className="h-5 w-5 text-blue-400" />;
      case 'tablet':
        return <Monitor className="h-5 w-5 text-purple-400" />;
      case 'desktop':
      default:
        return <Laptop className="h-5 w-5 text-green-400" />;
    }
  };

  const handleRevokeSession = (id: string) => {
    toast({
      title: "Sesi diakhiri",
      description: "Sesi pengguna berhasil diakhiri",
    });
  };

  const handleSignOutAllDevices = () => {
    if (auth.logoutFromAllDevices) {
      auth.logoutFromAllDevices()
        .then(() => {
          // Success is handled in the auth context
        })
        .catch((error) => {
          console.error("Error signing out all devices:", error);
          toast({
            variant: "destructive",
            title: "Gagal keluar dari semua perangkat",
            description: "Terjadi kesalahan saat mencoba keluar dari semua perangkat",
          });
        });
    } else {
      toast({
        title: "Keluar dari semua perangkat",
        description: "Anda telah keluar dari semua perangkat",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Sesi Aktif</h3>
        <Button
          variant="outline"
          onClick={handleSignOutAllDevices}
          className="border-red-800/30 hover:bg-red-800/20 hover:text-red-400 text-red-500"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Keluar dari semua perangkat
        </Button>
      </div>
      
      <div className="space-y-4">
        {sessions.map((session) => (
          <div 
            key={session.id}
            className={`p-4 rounded-md border ${
              session.current 
                ? 'bg-neon-purple/5 border-neon-purple/30' 
                : 'bg-dark-300/50 border-dark-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-md bg-dark-300/70">
                  {getDeviceIcon(session.device)}
                </div>
                <div>
                  <div className="font-medium flex items-center">
                    {session.browser}
                    {session.current && (
                      <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-neon-purple/20 text-neon-purple rounded-sm">
                        Saat ini
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-400 flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    {session.lastActive}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="text-right mr-4">
                  <div className="text-sm">{session.location}</div>
                  <div className="text-xs text-gray-400">{session.ip}</div>
                </div>
                
                {!session.current && (
                  <Button 
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRevokeSession(session.id)}
                    className="text-red-500 hover:text-red-400 hover:bg-red-900/20"
                  >
                    Akhiri
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveSessions;
