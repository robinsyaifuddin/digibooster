
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Lock, Key, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Komponen-komponen yang dipisahkan
import SecurityLevelSelector from './components/SecurityLevelSelector';
import PasswordChecker from './components/PasswordChecker';
import ApiKeyManager from './components/ApiKeyManager';
import SecurityRecommendation from './components/SecurityRecommendation';
import AuthenticationSettings from './components/AuthenticationSettings';
import SecurityMonitoring from './components/SecurityMonitoring';
import ActiveSessions from './components/ActiveSessions';
import IntegratedServices from './components/IntegratedServices';

const SecuritySettings = () => {
  const { user, updateSecurityLevel } = useAuth();
  const [securityLevel, setSecurityLevel] = useState(user?.securityLevel || 'standard');
  
  const handleSecurityLevelChange = (newLevel: 'standard' | 'enhanced' | 'maximum') => {
    setSecurityLevel(newLevel);
    updateSecurityLevel(newLevel);
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Umum
          </TabsTrigger>
          <TabsTrigger value="access" className="flex items-center gap-2">
            <Key className="w-4 h-4" />
            Kontrol Akses
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            API & Integrasi
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-amber-500" />
                Pengaturan Keamanan Umum
              </CardTitle>
              <CardDescription>
                Atur level keamanan dan proteksi untuk website Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Level Keamanan</h3>
                  <SecurityLevelSelector 
                    currentLevel={securityLevel} 
                    onChange={handleSecurityLevelChange} 
                  />
                </div>
                
                <SecurityRecommendation 
                  title="Rekomendasi Keamanan"
                  description="Gunakan kombinasi password yang kuat dan aktifkan autentikasi dua faktor untuk 
                    meningkatkan keamanan akun admin. Pastikan juga website selalu diperbarui 
                    dan gunakan HTTPS untuk semua koneksi."
                />
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Alat Keamanan</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PasswordChecker />
                    
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium flex items-center gap-2 mb-3">
                        <Shield className="h-4 w-4 text-green-600" />
                        Security Scanner
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Pindai website Anda untuk menemukan celah keamanan potensial.
                      </p>
                      <Button variant="outline" className="w-full">
                        Mulai Pemindaian
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="access">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-blue-500" />
                Pengaturan Akses & Otentikasi
              </CardTitle>
              <CardDescription>
                Atur kontrol akses dan keamanan login
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <AuthenticationSettings />
                <SecurityMonitoring />
              </div>
              
              <div className="border-t pt-4 mt-2">
                <ActiveSessions />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-purple-500" />
                API & Keamanan Integrasi
              </CardTitle>
              <CardDescription>
                Kelola API key dan integrasi pihak ketiga dengan aman
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ApiKeyManager />
              
              <div className="border-t pt-4 mt-2">
                <IntegratedServices />
              </div>
              
              <SecurityRecommendation 
                variant="info"
                title="Praktik Terbaik Keamanan API"
                description="Jangan pernah menyertakan API key langsung dalam kode frontend. Gunakan 
                  environment variable server atau layanan pengelolaan rahasia. Perbarui API key 
                  secara berkala dan batasi akses berdasarkan domain."
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecuritySettings;
