
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { RefreshCw, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase, testSupabaseConnection } from "@/integrations/supabase/client";
import ApiProtocolCard from "./custom-implementation/ApiProtocolCard";
import SupabaseDatabaseTester from "./components/SupabaseDatabaseTester";

type SupabaseDataResult = {
  success: boolean;
  data?: any;
  error?: any;
};

const ImplementationSettings = () => {
  const { toast } = useToast();
  const [testingConnection, setTestingConnection] = useState(false);
  const [activeTab, setActiveTab] = useState("supabase");
  const [connectionStatus, setConnectionStatus] = useState<SupabaseDataResult | null>(null);

  useEffect(() => {
    // Attempt to test connection when component mounts
    handleTestConnection();
  }, []);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const handleTestConnection = async () => {
    setTestingConnection(true);
    
    try {
      const result = await testSupabaseConnection();
      setConnectionStatus(result);
      
      if (result.success) {
        toast({
          title: "Koneksi berhasil",
          description: "Berhasil terhubung dengan database Supabase",
          variant: "default"
        });
      } else {
        toast({
          title: "Koneksi gagal",
          description: result.error || "Gagal terhubung ke database Supabase",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      setConnectionStatus({
        success: false, 
        error: error.message || "Terjadi kesalahan saat menghubungkan ke database"
      });
      
      toast({
        title: "Error",
        description: error.message || "Terjadi kesalahan saat menghubungkan ke database",
        variant: "destructive"
      });
    } finally {
      setTestingConnection(false);
    }
  };
  
  const resetConnectionStatus = () => {
    setConnectionStatus(null);
  };
  
  const getApiCredentials = async () => {
    try {
      const { data: apiKeys, error } = await supabase
        .from('api_keys')
        .select('*')
        .limit(1);
      
      if (error) {
        throw error;
      }
      
      return { 
        success: true,
        data: apiKeys 
      };
    } catch (error: any) {
      console.error("Error fetching API keys:", error);
      return { 
        success: false,
        error: error.message 
      };
    }
  };
  
  const refreshApiKeys = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('refresh-api-keys', {
        body: { refresh: true }
      });
      
      if (error) throw error;
      
      if (data) {
        toast({
          title: "API keys diperbarui",
          description: "Berhasil memperbarui API keys",
        });
        return true;
      }
      
      return false;
    } catch (error: any) {
      console.error("Error refreshing API keys:", error);
      toast({
        title: "Gagal memperbarui API keys",
        description: error.message || "Terjadi kesalahan saat memperbarui API keys",
        variant: "destructive"
      });
      return false;
    }
  };
  
  const setupDatabase = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('setup-database', {
        body: {}
      });
      
      if (error) throw error;
      
      toast({
        title: "Setup database berhasil",
        description: "Database berhasil diatur",
      });
      
      return true;
    } catch (error: any) {
      console.error("Error setting up database:", error);
      toast({
        title: "Gagal mengatur database",
        description: error.message || "Terjadi kesalahan saat mengatur database",
        variant: "destructive"
      });
      return false;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="bg-dark-300 text-gray-300 mb-6">
          <TabsTrigger value="supabase" className="data-[state=active]:bg-neon-purple data-[state=active]:text-white">
            Supabase
          </TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:bg-neon-purple data-[state=active]:text-white">
            API
          </TabsTrigger>
          <TabsTrigger value="domain" className="data-[state=active]:bg-neon-purple data-[state=active]:text-white">
            Domain
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="supabase">
          <div className="grid gap-6">
            <Card className="bg-dark-200 border-dark-300 text-white">
              <CardHeader>
                <CardTitle>Supabase Connection</CardTitle>
                <CardDescription className="text-gray-400">
                  Status koneksi dengan database Supabase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-white">Status koneksi saat ini:</h3>
                      {connectionStatus === null ? (
                        <p className="text-sm text-muted-foreground">Memeriksa koneksi...</p>
                      ) : connectionStatus.success ? (
                        <div className="flex items-center text-green-500">
                          <CheckCircle className="w-5 h-5 mr-1" />
                          <span>Terkoneksi</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-red-500">
                          <XCircle className="w-5 h-5 mr-1" />
                          <span>{connectionStatus.error || "Koneksi gagal"}</span>
                        </div>
                      )}
                    </div>
                    <Button 
                      onClick={handleTestConnection} 
                      variant="secondary"
                      disabled={testingConnection}
                      className="bg-dark-300 border border-dark-400 text-white hover:bg-dark-400"
                    >
                      {testingConnection ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Testing...
                        </>
                      ) : (
                        "Test Connection"
                      )}
                    </Button>
                  </div>
                  
                  <Separator className="bg-dark-300" />
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Database Setup</h3>
                    <p className="text-sm text-gray-400">
                      Setup database dan struktur tabel yang diperlukan
                    </p>
                    <div className="flex gap-4 mt-2">
                      <Button onClick={setupDatabase} className="bg-neon-purple hover:bg-neon-violet text-white">
                        Setup Database
                      </Button>
                      <Button variant="outline" onClick={resetConnectionStatus} className="border-dark-300 hover:bg-dark-300">
                        Reset Status
                      </Button>
                    </div>
                  </div>
                  
                  <SupabaseDatabaseTester />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="api">
          <div className="grid gap-6">
            <ApiProtocolCard />
            
            <Card className="bg-dark-200 border-dark-300 text-white">
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription className="text-gray-400">
                  Kelola API keys untuk mengakses layanan eksternal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Alert className="bg-dark-300 border border-dark-400 text-white">
                    <AlertTitle>Perhatian</AlertTitle>
                    <AlertDescription>
                      API keys harus dijaga kerahasiaannya. Jangan bagikan API keys ke orang lain.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="flex justify-end">
                    <Button 
                      onClick={refreshApiKeys}
                      className="bg-neon-purple hover:bg-neon-violet text-white"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh API Keys
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="domain">
          <Card className="bg-dark-200 border-dark-300 text-white">
            <CardHeader>
              <CardTitle>Domain Settings</CardTitle>
              <CardDescription className="text-gray-400">
                Konfigurasi domain dan subdomain untuk website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="bg-dark-300 border border-dark-400 text-white">
                <AlertTitle>Custom Domain</AlertTitle>
                <AlertDescription>
                  Untuk menggunakan custom domain, hubungi administrator untuk bantuan pengaturan.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImplementationSettings;
