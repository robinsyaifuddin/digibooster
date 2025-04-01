
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Check, Database, RefreshCw, Server } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useImplementationSettings } from '@/hooks/useImplementationSettings';
import { useWebsiteDataStore } from '@/stores/websiteDataStore';
import { useWebsiteData } from '@/hooks/useWebsiteData';
import { WebsitePage } from '@/types/websiteTypes';
import { Json } from '@/integrations/supabase/types';

const DataSyncManager = () => {
  const { toast } = useToast();
  const { isRealImplementation } = useImplementationSettings();
  const websiteStore = useWebsiteDataStore();
  const websiteData = useWebsiteData();
  
  const [syncing, setSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('pull');
  
  const pullFromDatabase = async () => {
    if (!isRealImplementation) {
      toast({
        variant: "destructive",
        title: "Mode simulasi aktif",
        description: "Aktifkan implementasi nyata untuk menggunakan fitur sinkronisasi data.",
      });
      return;
    }
    
    try {
      setSyncing(true);
      setSyncProgress(10);
      
      // Fetch website content
      const { data: websiteContent, error: contentError } = await supabase
        .from('website_content')
        .select('content')
        .eq('name', 'main')
        .single();
      
      if (contentError) {
        throw contentError;
      }
      
      setSyncProgress(40);
      
      // Fetch pages
      const { data: pages, error: pagesError } = await supabase
        .from('pages')
        .select('*');
      
      if (pagesError) {
        throw pagesError;
      }
      
      setSyncProgress(70);
      
      // Update local state
      if (websiteContent?.content) {
        // Update website content
        const content = websiteContent.content as unknown as any;
        
        if (content.generalInfo) {
          websiteStore.updateGeneralInfo(content.generalInfo);
        }
        
        if (content.appearance) {
          websiteStore.updateAppearance(content.appearance);
        }
        
        if (content.seo) {
          websiteStore.updateSeo(content.seo);
        }
        
        if (content.homeContent) {
          websiteStore.updateHomeContent(content.homeContent);
        }
      }
      
      // Update pages
      if (pages && pages.length > 0) {
        // Map DB pages to WebsitePage format
        const formattedPages: WebsitePage[] = pages.map(page => ({
          id: page.id,
          title: page.title,
          slug: page.slug,
          content: typeof page.content === 'string' ? page.content : JSON.stringify(page.content),
          isPublished: page.published,
          meta: page.meta ? (typeof page.meta === 'string' ? JSON.parse(page.meta) : page.meta) : {}
        }));
        
        // Replace all pages in the store
        websiteStore.updatePages(formattedPages);
      }
      
      setSyncProgress(100);
      setLastSynced(new Date().toLocaleString('id-ID'));
      
      toast({
        title: "Sinkronisasi berhasil",
        description: "Data berhasil ditarik dari database.",
      });
    } catch (error) {
      console.error('Error pulling data from database:', error);
      toast({
        variant: "destructive",
        title: "Gagal sinkronisasi",
        description: "Terjadi kesalahan saat menarik data dari database.",
      });
    } finally {
      setSyncing(false);
    }
  };
  
  const pushToDatabase = async () => {
    if (!isRealImplementation) {
      toast({
        variant: "destructive",
        title: "Mode simulasi aktif",
        description: "Aktifkan implementasi nyata untuk menggunakan fitur sinkronisasi data.",
      });
      return;
    }
    
    try {
      setSyncing(true);
      setSyncProgress(10);
      
      // Prepare website content
      const websiteContent = {
        generalInfo: websiteData.generalInfo,
        appearance: websiteData.appearance,
        seo: websiteData.seo,
        homeContent: websiteData.homeContent,
      };
      
      // Check if record exists
      const { data: existingContent, error: checkError } = await supabase
        .from('website_content')
        .select('id')
        .eq('name', 'main')
        .single();
      
      setSyncProgress(30);
      
      // Update or insert website content
      let contentResult;
      if (checkError || !existingContent) {
        contentResult = await supabase
          .from('website_content')
          .insert({
            name: 'main',
            content: websiteContent as unknown as Json
          });
      } else {
        contentResult = await supabase
          .from('website_content')
          .update({
            content: websiteContent as unknown as Json
          })
          .eq('name', 'main');
      }
      
      if (contentResult.error) {
        throw contentResult.error;
      }
      
      setSyncProgress(60);
      
      // Update pages
      if (websiteData.pages && websiteData.pages.length > 0) {
        for (const page of websiteData.pages) {
          // Check if page exists
          const { data: existingPage, error: pageCheckError } = await supabase
            .from('pages')
            .select('id')
            .eq('id', page.id)
            .single();
          
          // Format page data for database
          const pageData = {
            title: page.title,
            slug: page.slug,
            content: page.content as unknown as Json,
            published: page.isPublished,
            meta: {} as Json
          };
          
          // Handle meta data if present
          if (page.meta) {
            pageData.meta = page.meta as unknown as Json;
          }
          
          // Insert or update page
          let pageResult;
          if (pageCheckError || !existingPage) {
            pageResult = await supabase
              .from('pages')
              .insert({
                id: page.id,
                ...pageData
              });
          } else {
            pageResult = await supabase
              .from('pages')
              .update(pageData)
              .eq('id', page.id);
          }
          
          if (pageResult.error) {
            console.error(`Error updating page ${page.id}:`, pageResult.error);
          }
        }
      }
      
      setSyncProgress(100);
      setLastSynced(new Date().toLocaleString('id-ID'));
      
      toast({
        title: "Sinkronisasi berhasil",
        description: "Data berhasil dikirim ke database.",
      });
    } catch (error) {
      console.error('Error pushing data to database:', error);
      toast({
        variant: "destructive",
        title: "Gagal sinkronisasi",
        description: "Terjadi kesalahan saat mengirim data ke database.",
      });
    } finally {
      setSyncing(false);
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
          Kelola sinkronisasi data antara aplikasi lokal dan database
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isRealImplementation && (
          <Alert variant="warning" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Mode Simulasi Aktif</AlertTitle>
            <AlertDescription>
              Aktifkan implementasi nyata di tab Implementasi untuk menggunakan fitur sinkronisasi data.
            </AlertDescription>
          </Alert>
        )}
        
        {syncing && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Sinkronisasi data...</span>
              <span>{syncProgress}%</span>
            </div>
            <Progress value={syncProgress} className="h-1" />
          </div>
        )}
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="pull">
              <Server className="h-4 w-4 mr-2" />
              Tarik dari Database
            </TabsTrigger>
            <TabsTrigger value="push">
              <Database className="h-4 w-4 mr-2" />
              Kirim ke Database
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pull">
            <div className="space-y-4">
              <div className="bg-blue-50 text-blue-800 p-4 rounded-md text-sm">
                <div className="flex gap-2">
                  <AlertTriangle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Tarik data dari database akan menimpa data lokal</p>
                    <p className="mt-1">Proses ini akan mengambil data terbaru dari database dan menimpa data yang ada di aplikasi lokal.</p>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={pullFromDatabase}
                disabled={syncing || !isRealImplementation}
                className="w-full"
              >
                {syncing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Sinkronisasi...
                  </>
                ) : (
                  <>
                    <Server className="mr-2 h-4 w-4" />
                    Tarik Data dari Database
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="push">
            <div className="space-y-4">
              <div className="bg-amber-50 text-amber-800 p-4 rounded-md text-sm">
                <div className="flex gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Kirim data ke database akan menimpa data di server</p>
                    <p className="mt-1">Proses ini akan mengirim data lokal ke database dan menimpa data yang ada di server.</p>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={pushToDatabase}
                disabled={syncing || !isRealImplementation}
                className="w-full"
              >
                {syncing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Sinkronisasi...
                  </>
                ) : (
                  <>
                    <Database className="mr-2 h-4 w-4" />
                    Kirim Data ke Database
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-sm text-gray-500">
          {lastSynced ? (
            <div className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              Terakhir disinkronkan: {lastSynced}
            </div>
          ) : (
            <div className="flex items-center">
              <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
              Belum ada sinkronisasi
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default DataSyncManager;
