
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { useImplementationSettings } from '@/hooks/useImplementationSettings';
import { Database, ServerIcon, Shield, Check, X, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';

const ImplementationSettings = () => {
  const { toast } = useToast();
  const { isRealImplementation, activateRealImplementation, verifySupabaseConnection } = useImplementationSettings();
  const [activating, setActivating] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState('supabase');
  
  const checkSupabaseConnection = async () => {
    setConnectionStatus('checking');
    
    try {
      const result = await verifySupabaseConnection();
      
      if (result.success) {
        setConnectionStatus('success');
        toast({
          title: "Koneksi berhasil",
          description: "Terhubung dengan database Supabase",
        });
      } else {
        setConnectionStatus('error');
        toast({
          variant: "destructive",
          title: "Koneksi gagal",
          description: result.error || "Tidak dapat terhubung ke Supabase",
        });
      }
    } catch (error) {
      setConnectionStatus('error');
      toast({
        variant: "destructive",
        title: "Koneksi gagal",
        description: "Terjadi kesalahan saat mencoba terhubung ke Supabase",
      });
    }
  };
  
  const handleActivateImplementation = async () => {
    setActivating(true);
    
    try {
      // Periksa koneksi Supabase terlebih dahulu
      const connectionResult = await verifySupabaseConnection();
      
      if (connectionResult.success) {
        // Aktifkan implementasi nyata
        const result = activateRealImplementation();
        
        if (result) {
          toast({
            title: "Implementasi nyata diaktifkan",
            description: "Website Anda sekarang terhubung dengan database Supabase",
          });
          
          // Simpan konten website saat ini ke Supabase
          const websiteData = localStorage.getItem('websiteData');
          
          if (websiteData) {
            try {
              const parsedData = JSON.parse(websiteData);
              
              const { error } = await supabase
                .from('website_content')
                .upsert({
                  name: 'main',
                  content: parsedData
                }, {
                  onConflict: 'name'
                });
              
              if (error) {
                console.error('Gagal menyimpan konten awal ke Supabase:', error);
              }
            } catch (parseError) {
              console.error('Gagal parsing data website dari localStorage:', parseError);
            }
          }
          
          // Reload halaman untuk melihat perubahan
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          toast({
            variant: "destructive",
            title: "Aktivasi gagal",
            description: "Terjadi kesalahan saat mengaktifkan implementasi nyata",
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Koneksi Supabase gagal",
          description: connectionResult.error || "Tidak dapat terhubung ke Supabase. Periksa pengaturan Anda.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Aktivasi gagal",
        description: "Terjadi kesalahan: " + error.message,
      });
    } finally {
      setActivating(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Implementasi Nyata</h2>
        <p className="text-muted-foreground">
          Konfigurasi implementasi nyata website dengan database dan API
        </p>
      </div>
      
      {isRealImplementation ? (
        <Alert variant="default" className="bg-green-50 border-green-200">
          <Check className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Implementasi Nyata Aktif</AlertTitle>
          <AlertDescription className="text-green-700">
            Website Anda telah terhubung dengan database Supabase. Semua perubahan akan disimpan secara permanen.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Mode Simulasi Aktif</AlertTitle>
          <AlertDescription>
            Website Anda berjalan dalam mode simulasi menggunakan localStorage browser. Perubahan hanya akan terlihat di perangkat ini.
          </AlertDescription>
        </Alert>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="supabase" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Supabase
            <Badge variant="outline" className="ml-1 bg-blue-100 text-blue-800">Direkomendasikan</Badge>
          </TabsTrigger>
          <TabsTrigger value="custom" className="flex items-center gap-2">
            <ServerIcon className="h-4 w-4" />
            Kustom
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="supabase" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                Implementasi dengan Supabase
              </CardTitle>
              <CardDescription>
                Gunakan Supabase sebagai backend untuk website Anda dengan database PostgreSQL.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <h3 className="font-medium text-blue-800">Tentang Supabase</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Supabase adalah platform backend open-source yang menyediakan database PostgreSQL, autentikasi, storage, dan API REST/GraphQL.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Status Koneksi Supabase</h3>
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${
                    connectionStatus === 'checking' ? 'bg-amber-500 animate-pulse' :
                    connectionStatus === 'success' ? 'bg-green-500' :
                    connectionStatus === 'error' ? 'bg-red-500' :
                    'bg-gray-300'
                  }`}></div>
                  <span className="text-sm text-gray-600">
                    {connectionStatus === 'checking' ? 'Memeriksa koneksi...' :
                     connectionStatus === 'success' ? 'Terhubung dengan Supabase' :
                     connectionStatus === 'error' ? 'Gagal terhubung ke Supabase' :
                     'Belum memeriksa koneksi'}
                  </span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                onClick={checkSupabaseConnection}
                disabled={connectionStatus === 'checking'}
              >
                {connectionStatus === 'checking' ? 'Memeriksa...' : 'Periksa Koneksi Supabase'}
              </Button>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {isRealImplementation ? 
                  'Implementasi nyata telah diaktifkan dengan Supabase' : 
                  'Aktifkan untuk menghubungkan website Anda dengan database nyata'}
              </div>
              <Button 
                onClick={handleActivateImplementation}
                disabled={isRealImplementation || activating || connectionStatus !== 'success'}
                className={isRealImplementation ? 'bg-gray-400' : ''}
              >
                {activating ? 'Mengaktifkan...' : isRealImplementation ? 'Sudah Diaktifkan' : 'Aktifkan Implementasi Nyata'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ServerIcon className="h-5 w-5" />
                Implementasi Kustom
              </CardTitle>
              <CardDescription>
                Hubungkan website Anda dengan API dan database kustom.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                <div className="flex gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800">Implementasi Lanjutan</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      Implementasi kustom memerlukan pengaturan API dan database sendiri. Direkomendasikan untuk pengguna tingkat lanjut.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled variant="outline">Implementasi Kustom (Segera Hadir)</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImplementationSettings;
