
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, ArrowUpDown, Check, AlertTriangle, Database, ArrowDown, ArrowUp } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useWebsiteDataStore } from "@/stores/websiteDataStore";
import { Badge } from '@/components/ui/badge';
import { Progress } from "@/components/ui/progress";
import { usePublishEvents } from "@/hooks/usePublishEvents";

const DataSyncManager = () => {
  const { toast } = useToast();
  const websiteData = useWebsiteDataStore();
  const { dispatchContentUpdateEvent, dispatchPageContentUpdates } = usePublishEvents();
  const [syncingStatus, setSyncingStatus] = useState<'idle' | 'checking' | 'syncing' | 'success' | 'error'>('idle');
  const [syncProgress, setSyncProgress] = useState(0);
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  const [syncDetails, setSyncDetails] = useState<{
    localData: { sections: string[], totalItems: number };
    remoteData: { sections: string[], totalItems: number };
    differences: { section: string, action: 'push' | 'pull' }[];
  } | null>(null);
  const [supabaseInfo, setSupabaseInfo] = useState<{
    isConnected: boolean;
    url?: string;
    error?: string;
  }>({
    isConnected: false
  });

  React.useEffect(() => {
    checkSupabaseConnection();
  }, []);

  const checkSupabaseConnection = async () => {
    try {
      const projectUrl = 'https://bacnskcizgzcrqusqalu.supabase.co';
      
      const { data, error } = await supabase.from('website_content').select('id').limit(1);
      
      if (error) {
        console.error('Koneksi Supabase gagal:', error);
        setSupabaseInfo({
          isConnected: false,
          error: error.message
        });
        return;
      }
      
      setSupabaseInfo({
        isConnected: true,
        url: projectUrl
      });
      
      checkSyncStatus();
    } catch (error) {
      console.error('Error memeriksa koneksi Supabase:', error);
      setSupabaseInfo({
        isConnected: false,
        error: error.message
      });
    }
  };

  const checkSyncStatus = async () => {
    setSyncingStatus('checking');
    setSyncProgress(10);
    
    try {
      const localData = {
        sections: Object.keys(websiteData).filter(key => typeof websiteData[key] !== 'function'),
        totalItems: countItemsInWebsiteData(websiteData)
      };
      
      const { data: remoteContent, error } = await supabase
        .from('website_content')
        .select('content')
        .eq('name', 'main')
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw new Error(`Error mengambil data dari Supabase: ${error.message}`);
      }
      
      setSyncProgress(50);
      
      if (!remoteContent) {
        setSyncDetails({
          localData,
          remoteData: { sections: [], totalItems: 0 },
          differences: localData.sections.map(section => ({ 
            section, 
            action: 'push' 
          }))
        });
        setSyncingStatus('success');
        return;
      }
      
      const remoteDataObj = remoteContent.content || {};
      const remoteData = {
        sections: Object.keys(remoteDataObj),
        totalItems: countItemsInObject(remoteDataObj)
      };
      
      const differences = [];
      
      localData.sections.forEach(section => {
        if (!remoteData.sections.includes(section) || 
            JSON.stringify(websiteData[section]) !== JSON.stringify(remoteDataObj[section])) {
          differences.push({ section, action: 'push' });
        }
      });
      
      remoteData.sections.forEach(section => {
        if (!localData.sections.includes(section)) {
          differences.push({ section, action: 'pull' });
        }
      });
      
      setSyncDetails({ localData, remoteData, differences });
      setSyncProgress(100);
      setSyncingStatus('success');
      
      const lastSyncedStr = localStorage.getItem('last_data_sync');
      if (lastSyncedStr) {
        setLastSynced(lastSyncedStr);
      }
      
    } catch (error) {
      console.error('Error memeriksa status sinkronisasi:', error);
      setSyncingStatus('error');
      toast({
        variant: "destructive",
        title: "Gagal memeriksa status sinkronisasi",
        description: error.message,
      });
    }
  };

  const syncData = async () => {
    if (!syncDetails) return;
    
    setSyncingStatus('syncing');
    setSyncProgress(0);
    
    try {
      if (syncDetails.remoteData.totalItems === 0) {
        setSyncProgress(30);
        
        const dataToSync = {};
        
        syncDetails.localData.sections.forEach(section => {
          if (typeof websiteData[section] !== 'function') {
            dataToSync[section] = websiteData[section];
          }
        });
        
        const { error } = await supabase
          .from('website_content')
          .upsert({
            name: 'main',
            content: dataToSync
          });
        
        if (error) throw new Error(`Gagal mengirim data: ${error.message}`);
        
        setSyncProgress(100);
        
        const now = new Date().toISOString();
        localStorage.setItem('last_data_sync', now);
        setLastSynced(now);
        
        toast({
          title: "Data berhasil disinkronkan",
          description: "Semua data lokal telah disimpan ke Supabase.",
        });
        
        setSyncingStatus('idle');
        return;
      }
      
      let completed = 0;
      const progressStep = 100 / syncDetails.differences.length;
      
      for (const diff of syncDetails.differences) {
        if (diff.action === 'push') {
          const { data: currentRemote, error: fetchError } = await supabase
            .from('website_content')
            .select('content')
            .eq('name', 'main')
            .single();
          
          if (fetchError && fetchError.code !== 'PGRST116') {
            throw new Error(`Gagal mengambil data remote: ${fetchError.message}`);
          }
          
          const updatedContent = {
            ...(currentRemote?.content || {}),
            [diff.section]: websiteData[diff.section]
          };
          
          const { error } = await supabase
            .from('website_content')
            .upsert({
              name: 'main',
              content: updatedContent
            });
          
          if (error) throw new Error(`Gagal memperbarui data: ${error.message}`);
        } 
        else if (diff.action === 'pull') {
          const { data: remoteData, error } = await supabase
            .from('website_content')
            .select('content')
            .eq('name', 'main')
            .single();
          
          if (error) throw new Error(`Gagal mengambil data remote: ${error.message}`);
          
          if (remoteData?.content && remoteData.content[diff.section]) {
            const sectionName = diff.section;
            const firstChar = sectionName.charAt(0).toUpperCase();
            const restChars = sectionName.slice(1);
            const updateFunctionName = `update${firstChar}${restChars}`;
            
            if (typeof websiteData[updateFunctionName] === 'function') {
              websiteData[updateFunctionName](remoteData.content[diff.section]);
            } else {
              console.warn(`Fungsi update tidak ditemukan untuk bagian: ${diff.section}`);
            }
            
            if (diff.section === 'pages' && Array.isArray(remoteData.content[diff.section])) {
              if (typeof websiteData.updatePage === 'function') {
                remoteData.content[diff.section].forEach(page => {
                  if (page.id) {
                    websiteData.updatePage(page.id, page);
                  }
                });
              }
            }
          }
        }
        
        completed++;
        setSyncProgress(Math.floor(completed * progressStep));
      }
      
      // Perbaikan disini: Mengganti spread operator dengan type casting yang tepat
      dispatchContentUpdateEvent(websiteData as Record<string, any>);
      
      if (syncDetails.differences.some(diff => diff.section === 'pages')) {
        dispatchPageContentUpdates(websiteData.pages);
      }
      
      const now = new Date().toISOString();
      localStorage.setItem('last_data_sync', now);
      setLastSynced(now);
      
      toast({
        title: "Sinkronisasi selesai",
        description: `${syncDetails.differences.length} perubahan telah disinkronkan.`,
      });
      
      await checkSyncStatus();
    } catch (error) {
      console.error('Error sinkronisasi data:', error);
      setSyncingStatus('error');
      toast({
        variant: "destructive",
        title: "Gagal sinkronisasi data",
        description: error.message,
      });
    } finally {
      setSyncingStatus('idle');
    }
  };

  const countItemsInWebsiteData = (data) => {
    let count = 0;
    Object.keys(data).forEach(key => {
      if (typeof data[key] !== 'function') {
        count += countItemsInObject(data[key]);
      }
    });
    return count;
  };

  const countItemsInObject = (obj) => {
    if (!obj || typeof obj !== 'object') return 1;
    
    let count = 1;
    
    if (Array.isArray(obj)) {
      obj.forEach(item => {
        if (typeof item === 'object' && item !== null) {
          count += countItemsInObject(item);
        } else {
          count += 1;
        }
      });
    } else {
      Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          count += countItemsInObject(obj[key]);
        } else {
          count += 1;
        }
      });
    }
    
    return count;
  };

  const formatLastSynced = (dateString) => {
    if (!dateString) return null;
    
    try {
      const date = new Date(dateString);
      return date.toLocaleString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowUpDown className="h-5 w-5" />
          Sinkronisasi Data Website
        </CardTitle>
        <CardDescription>
          Kelola sinkronisasi data antara browser lokal dan database Supabase
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 rounded-md border bg-slate-50">
          <h3 className="text-sm font-medium mb-1">Status Koneksi Supabase</h3>
          <div className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${supabaseInfo.isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm">
              {supabaseInfo.isConnected 
                ? 'Terhubung dengan Supabase' 
                : 'Tidak terhubung dengan Supabase'}
            </span>
          </div>
          {supabaseInfo.url && (
            <div className="text-xs text-gray-500 mt-1">
              URL: {supabaseInfo.url}
            </div>
          )}
          {supabaseInfo.error && (
            <div className="text-xs text-red-500 mt-1">
              Error: {supabaseInfo.error}
            </div>
          )}
        </div>
        
        {syncingStatus === 'syncing' && (
          <div className="mb-4 space-y-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Sinkronisasi sedang berjalan...</span>
              <span>{syncProgress.toFixed(0)}%</span>
            </div>
            <Progress value={syncProgress} className="h-2" />
          </div>
        )}
        
        {lastSynced && (
          <div className="mb-4 text-sm text-gray-500">
            Terakhir disinkronkan: {formatLastSynced(lastSynced)}
          </div>
        )}
        
        {syncingStatus === 'error' && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Gagal sinkronisasi</AlertTitle>
            <AlertDescription>
              Terjadi kesalahan saat memeriksa atau sinkronisasi data. Coba lagi atau periksa koneksi Anda.
            </AlertDescription>
          </Alert>
        )}
        
        {syncDetails && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-md p-3 border border-blue-100">
                <h3 className="text-sm font-medium text-blue-800 mb-1">Data Lokal</h3>
                <p className="text-xs text-blue-700">
                  {syncDetails.localData.sections.length} bagian, 
                  {syncDetails.localData.totalItems} item total
                </p>
              </div>
              
              <div className="bg-purple-50 rounded-md p-3 border border-purple-100">
                <h3 className="text-sm font-medium text-purple-800 mb-1">Data Remote</h3>
                <p className="text-xs text-purple-700">
                  {syncDetails.remoteData.sections.length} bagian, 
                  {syncDetails.remoteData.totalItems} item total
                </p>
              </div>
            </div>
            
            {syncDetails.differences.length > 0 ? (
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Perubahan yang perlu disinkronkan:</h3>
                <div className="rounded-md border divide-y">
                  {syncDetails.differences.map((diff, idx) => (
                    <div key={idx} className="p-2 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {diff.action === 'push' ? (
                          <ArrowUp className="h-4 w-4 text-blue-600" />
                        ) : (
                          <ArrowDown className="h-4 w-4 text-purple-600" />
                        )}
                        <span>{diff.section}</span>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={diff.action === 'push' 
                          ? "bg-blue-100 text-blue-800 border-blue-200"
                          : "bg-purple-100 text-purple-800 border-purple-200"
                        }
                      >
                        {diff.action === 'push' ? 'Upload ke Supabase' : 'Download dari Supabase'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Alert variant="default" className="bg-green-50 border-green-200">
                <Check className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Data sudah sinkron</AlertTitle>
                <AlertDescription className="text-green-700">
                  Data lokal dan remote sudah sama persis. Tidak ada perubahan yang perlu disinkronkan.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button 
          variant="outline" 
          onClick={checkSyncStatus}
          disabled={syncingStatus === 'checking' || syncingStatus === 'syncing' || !supabaseInfo.isConnected}
          className="w-full"
        >
          {syncingStatus === 'checking' ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Memeriksa Status Sinkronisasi...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Periksa Status Sinkronisasi
            </>
          )}
        </Button>
        
        {syncDetails && syncDetails.differences.length > 0 && (
          <Button 
            onClick={syncData}
            disabled={syncingStatus === 'checking' || syncingStatus === 'syncing' || !supabaseInfo.isConnected}
            className="w-full"
          >
            {syncingStatus === 'syncing' ? (
              <>
                <Database className="mr-2 h-4 w-4 animate-pulse" />
                Sedang Sinkronisasi Data...
              </>
            ) : (
              <>
                <Database className="mr-2 h-4 w-4" />
                Sinkronkan {syncDetails.differences.length} Perubahan
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default DataSyncManager;
