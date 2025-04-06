
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import SecuritySettings from './SecuritySettings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, Info, Shield } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PublishingSettingsProps {
  onTabChange: (tab: string) => void;
}

const PublishingSettings: React.FC<PublishingSettingsProps> = ({ onTabChange }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('publishing');
  const [publishChanges, setPublishChanges] = useState(true);
  const [securityLevel, setSecurityLevel] = useState((user as any)?.securityLevel || 'standard');
  const [notifyChanges, setNotifyChanges] = useState(true);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Pengaturan Penerbitan</h2>
        <p className="text-muted-foreground">
          Kelola bagaimana website Anda diterbitkan dan diamankan
        </p>
      </div>
      
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Info Penerbitan</AlertTitle>
        <AlertDescription>
          Perubahan yang Anda buat di website hanya akan tersedia untuk publik setelah diterbitkan.
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList>
          <TabsTrigger value="publishing">Penerbitan</TabsTrigger>
          <TabsTrigger value="security">Keamanan</TabsTrigger>
        </TabsList>
        
        <TabsContent value="publishing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                Status Penerbitan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-green-500/10 p-4 border border-green-500/30">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <div>
                    <p className="font-medium">Website Tersedia</p>
                    <p className="text-sm text-muted-foreground">
                      Website Anda saat ini aktif dan tersedia untuk umum
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-publish">Terbitkan perubahan otomatis</Label>
                    <p className="text-sm text-muted-foreground">
                      Terbitkan perubahan secara otomatis setelah disimpan
                    </p>
                  </div>
                  <Switch
                    id="auto-publish"
                    checked={publishChanges}
                    onCheckedChange={setPublishChanges}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notify-changes">Notifikasi perubahan</Label>
                    <p className="text-sm text-muted-foreground">
                      Dapatkan notifikasi ketika perubahan diterbitkan
                    </p>
                  </div>
                  <Switch
                    id="notify-changes"
                    checked={notifyChanges}
                    onCheckedChange={setNotifyChanges}
                  />
                </div>
                
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox id="backup" />
                  <label
                    htmlFor="backup"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Backup otomatis sebelum penerbitan
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <SecuritySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PublishingSettings;
