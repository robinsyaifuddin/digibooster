
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Server, Database, RefreshCw, CheckCircle, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const SupabaseConnectionStatus = () => {
  const { toast } = useToast();
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'checking' | 'connected' | 'error'>('idle');
  const [lastChecked, setLastChecked] = useState<string | null>(null);
  const [latency, setLatency] = useState<number | null>(null);
  const [healthChecks, setHealthChecks] = useState<{
    database: boolean;
    auth: boolean;
    storage: boolean;
    realtime: boolean;
  }>({
    database: false,
    auth: false,
    storage: false,
    realtime: false,
  });
  const [checkingProgress, setCheckingProgress] = useState(0);
  
  useEffect(() => {
    checkConnection();
    
    // Set up a periodic check every 5 minutes
    const intervalId = setInterval(() => {
      checkConnection();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const checkConnection = async () => {
    setConnectionStatus('checking');
    setCheckingProgress(10);
    
    try {
      // 1. Test Database Connection
      const startTime = performance.now();
      const { data: dbData, error: dbError } = await supabase
        .from('website_content')
        .select('id')
        .limit(1);
      const endTime = performance.now();
      setLatency(Math.round(endTime - startTime));
      
      setHealthChecks(prev => ({ ...prev, database: !dbError }));
      setCheckingProgress(40);
      
      // 2. Test Auth Connection
      const { data: authData, error: authError } = await supabase.auth.getSession();
      setHealthChecks(prev => ({ ...prev, auth: !authError }));
      setCheckingProgress(60);
      
      // 3. Test Storage Connection (just checking bucket list)
      const { data: storageData, error: storageError } = await supabase.storage.listBuckets();
      setHealthChecks(prev => ({ ...prev, storage: !storageError }));
      setCheckingProgress(80);
      
      // 4. Test Realtime Connection (subscribe and unsubscribe quickly)
      try {
        const channel = supabase.channel('connection_test');
        const subscription = channel.subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            setHealthChecks(prev => ({ ...prev, realtime: true }));
            // Clean up subscription
            setTimeout(() => {
              supabase.removeChannel(channel);
            }, 500);
          }
        });
        setCheckingProgress(100);
      } catch (realtimeError) {
        setHealthChecks(prev => ({ ...prev, realtime: false }));
      }
      
      // Determine overall status
      const allConnected = !dbError && !authError && !storageError;
      setConnectionStatus(allConnected ? 'connected' : 'error');
      
      // Update last checked time
      const now = new Date().toLocaleString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      setLastChecked(now);
      
      if (allConnected) {
        console.log('Supabase connection check successful');
      } else {
        console.error('Supabase connection check failed', { dbError, authError, storageError });
        toast({
          variant: "destructive",
          title: "Koneksi Supabase bermasalah",
          description: "Beberapa layanan Supabase tidak dapat dijangkau. Periksa status koneksi untuk detail.",
        });
      }
    } catch (error) {
      console.error('Error checking Supabase connection:', error);
      setConnectionStatus('error');
      toast({
        variant: "destructive",
        title: "Koneksi Supabase gagal",
        description: "Terjadi kesalahan saat memeriksa koneksi ke Supabase.",
      });
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Database className="h-5 w-5 text-blue-600" />
          Status Koneksi Supabase
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 gap-1"
          onClick={checkConnection} 
          disabled={connectionStatus === 'checking'}
        >
          {connectionStatus === 'checking' ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span className="text-xs">Memeriksa...</span>
            </>
          ) : (
            <>
              <RefreshCw className="h-3 w-3" />
              <span className="text-xs">Periksa</span>
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {connectionStatus === 'checking' && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Memeriksa koneksi...</span>
              <span>{checkingProgress}%</span>
            </div>
            <Progress value={checkingProgress} className="h-1" />
          </div>
        )}
        
        <div className="flex items-center gap-2 mb-3">
          <div className={`h-3 w-3 rounded-full ${
            connectionStatus === 'connected' ? 'bg-green-500' : 
            connectionStatus === 'error' ? 'bg-red-500' : 
            connectionStatus === 'checking' ? 'bg-blue-500 animate-pulse' : 
            'bg-gray-300'
          }`} />
          <span className="font-medium">
            {connectionStatus === 'connected' ? 'Terhubung' : 
             connectionStatus === 'error' ? 'Koneksi bermasalah' : 
             connectionStatus === 'checking' ? 'Memeriksa koneksi' : 
             'Belum diperiksa'}
          </span>
          
          {latency !== null && connectionStatus === 'connected' && (
            <Badge variant="outline" className="ml-auto text-xs">
              {latency} ms
            </Badge>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2 p-2 rounded-md border">
            <Database className="h-4 w-4 text-blue-600" />
            <span>Database</span>
            {healthChecks.database ? (
              <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-amber-500 ml-auto" />
            )}
          </div>
          
          <div className="flex items-center gap-2 p-2 rounded-md border">
            <Shield className="h-4 w-4 text-indigo-600" />
            <span>Auth</span>
            {healthChecks.auth ? (
              <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-amber-500 ml-auto" />
            )}
          </div>
          
          <div className="flex items-center gap-2 p-2 rounded-md border">
            <Server className="h-4 w-4 text-green-600" />
            <span>Storage</span>
            {healthChecks.storage ? (
              <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-amber-500 ml-auto" />
            )}
          </div>
          
          <div className="flex items-center gap-2 p-2 rounded-md border">
            <RefreshCw className="h-4 w-4 text-purple-600" />
            <span>Realtime</span>
            {healthChecks.realtime ? (
              <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-amber-500 ml-auto" />
            )}
          </div>
        </div>
        
        {lastChecked && (
          <div className="mt-3 text-xs text-center text-gray-500">
            Terakhir diperiksa: {lastChecked}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SupabaseConnectionStatus;
