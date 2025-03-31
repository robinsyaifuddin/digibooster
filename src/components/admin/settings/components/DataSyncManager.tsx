
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Download, Upload, Check, Database } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useImplementationSettings } from '@/hooks/useImplementationSettings';
import { useWebsiteData } from '@/stores/websiteDataStore';
import { WebsiteData } from '@/types/websiteTypes';

const DataSyncManager = () => {
  const { toast } = useToast();
  const { isRealImplementation, initializeSupabaseData } = useImplementationSettings();
  const { generalInfo, appearance, seo, homeContent, pages } = useWebsiteData();
  
  const [syncOperation, setSyncOperation] = useState<'none' | 'download' | 'upload'>('none');
  const [progress, setProgress] = useState(0);
  const [lastSync, setLastSync] = useState<string | null>(null);
  
  const handleSyncToSupabase = async () => {
    if (!isRealImplementation) {
      toast({
        variant: "destructive",
        title: "Mode Simulasi Aktif",
        description: "Aktifkan implementasi nyata di pengaturan untuk sinkronisasi data dengan Supabase."
      });
      return;
    }
    
    try {
      setSyncOperation('upload');
      setProgress(10);
      
      // Construct the website data object
      const websiteData = {
        generalInfo,
        appearance,
        seo,
        homeContent,
        pages
      };
      
      setProgress(50);
      
      // Call the function to initialize Supabase data
      const result = await initializeSupabaseData(websiteData);
      
      setProgress(90);
      
      if (result.success) {
        setProgress(100);
        toast({
          title: "Sinkronisasi Berhasil",
          description: "Data websit" +
          "e berhasil disinkronkan ke Supabase.",
        });
        
        // Set last sync time
        const now = new Date().toLocaleString();
        setLastSync(now);
        
        // Dispatch a custom event to notify other components
        window.dispatchEvent(new CustomEvent('website-data-synced', { 
          detail: {
            source: 'local-to-supabase',
            timestamp: new Date().toISOString(),
            data: websiteData 
          }
        }));
      } else {
        toast({
          variant: "destructive",
          title: "Sinkronisasi Gagal",
          description: `Terjadi kesalahan: ${result.error?.message || 'Kesalahan tidak diketahui'}`,
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sinkronisasi Gagal",
        description: error.message || "Terjadi kesalahan saat sinkronisasi ke Supabase.",
      });
    } finally {
      // Reset progress after a short delay
      setTimeout(() => {
        setSyncOperation('none');
        setProgress(0);
      }, 1000);
    }
  };
  
  const handleFetchFromSupabase = async () => {
    if (!isRealImplementation) {
      toast({
        variant: "destructive",
        title: "Mode Simulasi Aktif",
        description: "Aktifkan implementasi nyata di pengaturan untuk mengambil data dari Supabase."
      });
      return;
    }
    
    try {
      setSyncOperation('download');
      setProgress(10);
      
      // Fetch website content from Supabase
      const { data, error } = await supabase
        .from('website_content')
        .select('content')
        .eq('name', 'main')
        .single();
      
      setProgress(50);
      
      if (error) {
        throw new Error(`Gagal mengambil data: ${error.message}`);
      }
      
      if (!data || !data.content) {
        throw new Error('Tidak ada data website yang ditemukan di Supabase.');
      }
      
      setProgress(75);
      
      // Parse the content if it's a string
      let websiteData: Partial<WebsiteData> = typeof data.content === 'string' 
        ? JSON.parse(data.content) 
        : data.content;
      
      // Fetch pages from Supabase
      const { data: pagesData, error: pagesError } = await supabase
        .from('pages')
        .select('*')
        .order('created_at', { ascending: false });
      
      setProgress(90);
      
      if (pagesError) {
        console.error('Error fetching pages:', pagesError);
        // Continue with main content even if pages fetch fails
      } else if (pagesData) {
        // Add pages to the website data
        websiteData.pages = pagesData;
      }
      
      // Dispatch a custom event to update the website data store
      const websiteDataEvent = new CustomEvent('website-data-loaded', { 
        detail: { 
          data: websiteData as WebsiteData,
          source: 'supabase' 
        } 
      });
      
      window.dispatchEvent(websiteDataEvent);
      
      setProgress(100);
      
      toast({
        title: "Data Diambil",
        description: "Data website berhasil diambil dari Supabase.",
      });
      
      // Set last sync time
      const now = new Date().toLocaleString();
      setLastSync(now);
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Pengambilan Data Gagal",
        description: error.message || "Terjadi kesalahan saat mengambil data dari Supabase.",
      });
    } finally {
      // Reset progress after a short delay
      setTimeout(() => {
        setSyncOperation('none');
        setProgress(0);
      }, 1000);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5 text-blue-600" />
          Sinkronisasi Data
        </CardTitle>
        <CardDescription>
          Sinkronkan data website antara versi lokal dan database Supabase
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isRealImplementation && (
          <Alert variant="warning" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Mode simulasi aktif. Aktifkan implementasi nyata untuk menggunakan fitur sinkronisasi data.
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs defaultValue="sync" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sync">Sinkronisasi</TabsTrigger>
            <TabsTrigger value="info">Informasi</TabsTrigger>
          </TabsList>
          <TabsContent value="sync" className="pt-4">
            <div className="space-y-4">
              {syncOperation !== 'none' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{syncOperation === 'upload' ? 'Mengunggah ke Supabase...' : 'Mengunduh dari Supabase...'}</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="w-full gap-2"
                  onClick={handleSyncToSupabase}
                  disabled={syncOperation !== 'none' || !isRealImplementation}
                >
                  <Upload className="h-4 w-4" />
                  <span>Unggah ke Supabase</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full gap-2"
                  onClick={handleFetchFromSupabase}
                  disabled={syncOperation !== 'none' || !isRealImplementation}
                >
                  <Download className="h-4 w-4" />
                  <span>Ambil dari Supabase</span>
                </Button>
              </div>
              
              {lastSync && (
                <div className="text-center text-xs text-gray-500">
                  Terakhir disinkronkan: {lastSync}
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="info" className="space-y-4 pt-4">
            <div className="rounded-md border p-3">
              <h4 className="font-medium mb-1">Unggah ke Supabase</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Semua data website lokal akan diunggah dan disimpan di database Supabase. Data yang ada di Supabase akan ditimpa.
              </p>
              <div className="flex items-center text-xs bg-slate-100 p-2 rounded">
                <Check className="h-3 w-3 text-green-600 mr-1" /> 
                Pastikan Anda telah memeriksa perubahan sebelum mengunggah.
              </div>
            </div>
            
            <div className="rounded-md border p-3">
              <h4 className="font-medium mb-1">Ambil dari Supabase</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Data website akan diambil dari database Supabase. Perubahan lokal yang belum disimpan akan hilang.
              </p>
              <div className="flex items-center text-xs bg-slate-100 p-2 rounded">
                <AlertCircle className="h-3 w-3 text-amber-600 mr-1" /> 
                Tindakan ini akan menimpa data lokal saat ini.
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2"
          onClick={() => {
            const now = new Date().toLocaleString();
            setLastSync(now);
            toast({
              title: "Status Diperbarui",
              description: "Status sinkronisasi berhasil diperbarui."
            });
          }}
          disabled={syncOperation !== 'none'}
        >
          <RefreshCw className="h-4 w-4" />
          <span>Refresh Status</span>
        </Button>
        
        <div className="text-xs text-muted-foreground">
          {isRealImplementation ? (
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 bg-green-500 rounded-full"></span>
              Terhubung
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 bg-amber-500 rounded-full"></span>
              Mode Simulasi
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default DataSyncManager;
