
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Server, Database, Key, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ImplementationSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('server');
  const [apiUrl, setApiUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [databaseType, setDatabaseType] = useState('mysql');
  
  const handleSaveSettings = () => {
    // Simulasi penyimpanan pengaturan
    localStorage.setItem('implementation_apiUrl', apiUrl);
    localStorage.setItem('implementation_apiKey', apiKey);
    localStorage.setItem('implementation_databaseType', databaseType);
    
    toast({
      title: "Pengaturan implementasi disimpan",
      description: "Pengaturan telah berhasil disimpan. Untuk menerapkan pengaturan, hubungi pengembang.",
      duration: 3000,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Pengaturan Implementasi</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Pengaturan Implementasi Nyata
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
            <h3 className="text-blue-800 font-medium mb-2">Informasi Penting</h3>
            <p className="text-blue-700 text-sm">
              Bagian ini digunakan untuk mengkonfigurasi koneksi ke server dan database untuk implementasi nyata website.
              Pengaturan ini memerlukan bantuan pengembang untuk mengaktifkan integrasi dengan server backend.
            </p>
          </div>
          
          <Tabs defaultValue="server" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="server" className="flex items-center gap-2">
                <Server className="h-4 w-4" />
                Server API
              </TabsTrigger>
              <TabsTrigger value="database" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Database
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="server" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-url">URL API</Label>
                <Input 
                  id="api-url" 
                  placeholder="https://api.yourdomain.com" 
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  URL endpoint API untuk mengirim data website
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-key" className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  API Key
                </Label>
                <Input 
                  id="api-key" 
                  type="password" 
                  placeholder="••••••••••••••••" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Kunci API untuk otentikasi dengan server
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="database" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="database-type">Jenis Database</Label>
                <select 
                  id="database-type"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={databaseType}
                  onChange={(e) => setDatabaseType(e.target.value)}
                >
                  <option value="mysql">MySQL</option>
                  <option value="postgresql">PostgreSQL</option>
                  <option value="mongodb">MongoDB</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Jenis database yang digunakan untuk menyimpan data website
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end mt-6">
            <Button onClick={handleSaveSettings}>
              <Save className="h-4 w-4 mr-2" />
              Simpan Pengaturan Implementasi
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImplementationSettings;
