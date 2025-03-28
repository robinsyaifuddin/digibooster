
import React, { useState } from 'react';
import SecurityLevelSelector from './components/SecurityLevelSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import AuthenticationSettings from './components/AuthenticationSettings';
import SecurityMonitoring from './components/SecurityMonitoring';
import ApiKeyManager from './components/ApiKeyManager';
import PasswordChecker from './components/PasswordChecker';
import IntegratedServices from './components/IntegratedServices';
import SecurityRecommendation from './components/SecurityRecommendation';
import ActiveSessions from './components/ActiveSessions';

const SecuritySettings: React.FC = () => {
  const { user, updateSecurityLevel, logoutFromAllDevices } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  
  const handleSecurityLevelChange = (level: 'standard' | 'enhanced' | 'maximum') => {
    updateSecurityLevel(level);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Pengaturan Keamanan</h2>
        <p className="text-muted-foreground">
          Kelola pengaturan keamanan dan izin untuk website Anda
        </p>
      </div>
      
      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Informasi Keamanan</AlertTitle>
        <AlertDescription>
          Meningkatkan pengaturan keamanan dapat mempengaruhi cara pengguna mengakses website Anda. Pastikan untuk menguji pengaturan setelah melakukan perubahan.
        </AlertDescription>
      </Alert>
      
      <Card>
        <CardHeader>
          <CardTitle>Level Keamanan</CardTitle>
        </CardHeader>
        <CardContent>
          <SecurityLevelSelector 
            currentLevel={user?.securityLevel || 'standard'} 
            onChange={handleSecurityLevelChange} 
          />
        </CardContent>
      </Card>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Umum</TabsTrigger>
          <TabsTrigger value="authentication">Autentikasi</TabsTrigger>
          <TabsTrigger value="access">Akses & API</TabsTrigger>
          <TabsTrigger value="sessions">Sesi Aktif</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6">
                <SecurityMonitoring />
                <PasswordChecker />
                <SecurityRecommendation 
                  title="Rekomendasi Keamanan" 
                  description="Aktifkan autentikasi dua faktor untuk meningkatkan keamanan akun Anda." 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="authentication" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <AuthenticationSettings />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="access" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <ApiKeyManager />
                <IntegratedServices />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <ActiveSessions />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecuritySettings;
