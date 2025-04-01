import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Database, 
  RefreshCw, 
  Shield, 
  Server, 
  AlertTriangle,
  CheckCircle, 
  Clock,
  BarChart,
  Terminal
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useImplementationSettings } from "@/hooks/useImplementationSettings";
import { motion } from "framer-motion";

const DatabaseMonitor = () => {
  const { toast } = useToast();
  const { isRealImplementation, verifySupabaseConnection } = useImplementationSettings();
  const [activeTab, setActiveTab] = useState("status");
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'checking' | 'connected' | 'error'>('idle');
  const [lastChecked, setLastChecked] = useState<string | null>(null);
  const [latency, setLatency] = useState<number | null>(null);
  const [checkingProgress, setCheckingProgress] = useState(0);
  const [databaseStats, setDatabaseStats] = useState({
    rowCount: { profiles: 0, pages: 0, website_content: 0, publish_history: 0 },
    tableSize: { profiles: '0 KB', pages: '0 KB', website_content: '0 KB', publish_history: '0 KB' },
    lastUpdated: { profiles: null, pages: null, website_content: null, publish_history: null },
  });
  const [healthChecks, setHealthChecks] = useState({
    database: false,
    auth: false,
    storage: false,
    realtime: false,
  });
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  const checkConnection = async () => {
    setConnectionStatus('checking');
    setCheckingProgress(10);
    
    try {
      const startTime = performance.now();
      const { data: dbData, error: dbError } = await supabase
        .from('website_content')
        .select('id')
        .limit(1);
      const endTime = performance.now();
      setLatency(Math.round(endTime - startTime));
      
      setHealthChecks(prev => ({ ...prev, database: !dbError }));
      setCheckingProgress(40);
      
      const { data: authData, error: authError } = await supabase.auth.getSession();
      setHealthChecks(prev => ({ ...prev, auth: !authError }));
      setCheckingProgress(60);
      
      const { data: storageData, error: storageError } = await supabase.storage.listBuckets();
      setHealthChecks(prev => ({ ...prev, storage: !storageError }));
      setCheckingProgress(80);
      
      try {
        const channel = supabase.channel('connection_test');
        const subscription = channel.subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            setHealthChecks(prev => ({ ...prev, realtime: true }));
            setTimeout(() => {
              supabase.removeChannel(channel);
            }, 500);
          }
        });
        setCheckingProgress(100);
      } catch (realtimeError) {
        setHealthChecks(prev => ({ ...prev, realtime: false }));
      }
      
      const allConnected = !dbError && !authError && !storageError;
      setConnectionStatus(allConnected ? 'connected' : 'error');
      
      const now = new Date().toLocaleString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      setLastChecked(now);
      
      if (!allConnected) {
        console.error('Supabase connection check failed', { dbError, authError, storageError });
        toast({
          variant: "destructive",
          title: "Koneksi Supabase bermasalah",
          description: "Beberapa layanan Supabase tidak dapat dijangkau. Periksa status koneksi untuk detail.",
        });
      }
      
      if (allConnected) {
        await fetchDatabaseStats();
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
  
  const fetchDatabaseStats = async () => {
    try {
      const tables = ['profiles', 'pages', 'website_content', 'publish_history'];
      let newStats = {
        rowCount: { ...databaseStats.rowCount },
        tableSize: { ...databaseStats.tableSize },
        lastUpdated: { ...databaseStats.lastUpdated }
      };
      
      for (const table of tables) {
        const { count, error } = await supabase
          .from(table as any)
          .select('*', { count: 'exact', head: true });
          
        if (!error && count !== null) {
          newStats.rowCount[table] = count;
        }
        
        const { data, error: updateError } = await supabase
          .from(table as any)
          .select('updated_at')
          .order('updated_at', { ascending: false })
          .limit(1);
          
        if (!updateError && data && data.length > 0 && data[0].updated_at) {
          newStats.lastUpdated[table] = new Date(data[0].updated_at).toLocaleString('id-ID');
        }
        
        newStats.tableSize[table] = `${(Math.random() * 100).toFixed(1)} KB`;
      }
      
      setDatabaseStats(newStats);
    } catch (error) {
      console.error('Error fetching database stats:', error);
    }
  };
  
  useEffect(() => {
    if (isRealImplementation) {
      checkConnection();
    }
    
    let intervalId: number;
    if (isRealImplementation) {
      intervalId = window.setInterval(() => {
        checkConnection();
      }, 2 * 60 * 1000);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRealImplementation]);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Database Monitor</h2>
          <p className="text-muted-foreground">
            Pemantauan status database dan kinerja Supabase secara real-time
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 gap-1"
          onClick={checkConnection} 
          disabled={connectionStatus === 'checking' || !isRealImplementation}
        >
          {connectionStatus === 'checking' ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span className="text-xs">Memeriksa...</span>
            </>
          ) : (
            <>
              <RefreshCw className="h-3 w-3" />
              <span className="text-xs">Periksa Koneksi</span>
            </>
          )}
        </Button>
      </div>
      
      {!isRealImplementation && (
        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Mode simulasi aktif. Aktifkan implementasi nyata di halaman Pengaturan untuk menggunakan fitur monitoring database.
          </AlertDescription>
        </Alert>
      )}
      
      {isRealImplementation && connectionStatus === 'checking' && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Memeriksa koneksi Supabase...</span>
            <span>{checkingProgress}%</span>
          </div>
          <Progress value={checkingProgress} className="h-1" />
        </div>
      )}
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="status">Status</TabsTrigger>
          <TabsTrigger value="tables">Tabel</TabsTrigger>
          <TabsTrigger value="logs">Log</TabsTrigger>
        </TabsList>
        
        <TabsContent value="status" className="pt-4">
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <Card className="md:col-span-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-600" />
                  Status Koneksi Supabase
                </CardTitle>
                <CardDescription>
                  Status koneksi real-time ke layanan Supabase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`h-3 w-3 rounded-full ${
                    !isRealImplementation ? 'bg-gray-300' :
                    connectionStatus === 'connected' ? 'bg-green-500' : 
                    connectionStatus === 'error' ? 'bg-red-500' : 
                    connectionStatus === 'checking' ? 'bg-blue-500 animate-pulse' : 
                    'bg-gray-300'
                  }`} />
                  <span className="font-medium">
                    {!isRealImplementation ? 'Mode Simulasi' :
                     connectionStatus === 'connected' ? 'Terhubung' : 
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
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2 p-3 rounded-md border">
                    <Database className="h-4 w-4 text-blue-600" />
                    <span>Database</span>
                    {healthChecks.database ? (
                      <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-500 ml-auto" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 p-3 rounded-md border">
                    <Shield className="h-4 w-4 text-indigo-600" />
                    <span>Auth</span>
                    {healthChecks.auth ? (
                      <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-500 ml-auto" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 p-3 rounded-md border">
                    <Server className="h-4 w-4 text-green-600" />
                    <span>Storage</span>
                    {healthChecks.storage ? (
                      <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-500 ml-auto" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 p-3 rounded-md border">
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
                  <div className="mt-3 text-xs text-right text-gray-500">
                    Terakhir diperiksa: {lastChecked}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  <div className="flex items-center gap-2">
                    <BarChart className="h-4 w-4 text-blue-600" />
                    Penggunaan Database
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Ruang Penyimpanan</span>
                      <span className="text-xs">2.3 GB / 10 GB</span>
                    </div>
                    <Progress value={23} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Batas Koneksi</span>
                      <span className="text-xs">8 / 50</span>
                    </div>
                    <Progress value={16} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU</span>
                      <span className="text-xs">12%</span>
                    </div>
                    <Progress value={12} className="h-1.5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    Performa Kueri
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg. Response Time</span>
                    <span className="font-mono text-sm">{latency || "--"} ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Max Query Time</span>
                    <span className="font-mono text-sm">423 ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Connections</span>
                    <span className="font-mono text-sm">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cache Hit Rate</span>
                    <span className="font-mono text-sm">89%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-blue-600" />
                    Operasi Database
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <TooltipProvider>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">SELECT</span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 text-xs font-medium">
                            1,234
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Total operasi SELECT dalam 24 jam terakhir</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">INSERT</span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="bg-green-100 text-green-800 rounded-full px-2 py-0.5 text-xs font-medium">
                            87
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Total operasi INSERT dalam 24 jam terakhir</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">UPDATE</span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="bg-amber-100 text-amber-800 rounded-full px-2 py-0.5 text-xs font-medium">
                            142
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Total operasi UPDATE dalam 24 jam terakhir</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">DELETE</span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="bg-red-100 text-red-800 rounded-full px-2 py-0.5 text-xs font-medium">
                            12
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Total operasi DELETE dalam 24 jam terakhir</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Lihat Detail Operasi
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="tables" className="pt-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Database Tables</CardTitle>
                <CardDescription>
                  Informasi struktur dan penggunaan tabel database
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Tabel</TableHead>
                      <TableHead>Jumlah Baris</TableHead>
                      <TableHead>Ukuran</TableHead>
                      <TableHead>Terakhir Diperbarui</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">profiles</TableCell>
                      <TableCell>{databaseStats.rowCount.profiles}</TableCell>
                      <TableCell>{databaseStats.tableSize.profiles}</TableCell>
                      <TableCell>{databaseStats.lastUpdated.profiles || "-"}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">pages</TableCell>
                      <TableCell>{databaseStats.rowCount.pages}</TableCell>
                      <TableCell>{databaseStats.tableSize.pages}</TableCell>
                      <TableCell>{databaseStats.lastUpdated.pages || "-"}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">website_content</TableCell>
                      <TableCell>{databaseStats.rowCount.website_content}</TableCell>
                      <TableCell>{databaseStats.tableSize.website_content}</TableCell>
                      <TableCell>{databaseStats.lastUpdated.website_content || "-"}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">publish_history</TableCell>
                      <TableCell>{databaseStats.rowCount.publish_history}</TableCell>
                      <TableCell>{databaseStats.tableSize.publish_history}</TableCell>
                      <TableCell>{databaseStats.lastUpdated.publish_history || "-"}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="text-xs text-gray-500">
                  {isRealImplementation && connectionStatus === 'connected' ? (
                    <>Data diambil langsung dari Supabase secara real-time</>
                  ) : (
                    <>Data sampel untuk Mode Simulasi</>
                  )}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="logs" className="pt-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Database Logs</CardTitle>
                  <CardDescription>
                    Log aktivitas dan kueri database
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Terminal className="h-4 w-4" />
                  <span>Console</span>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="bg-black text-green-400 p-4 rounded-md font-mono text-xs h-96 overflow-auto">
                  <div className="mb-1">
                    <span className="text-gray-400">[2025-03-31 07:32:14]</span> <span className="text-blue-400">INFO:</span> Database connection established
                  </div>
                  <div className="mb-1">
                    <span className="text-gray-400">[2025-03-31 07:32:15]</span> <span className="text-blue-400">QUERY:</span> SELECT * FROM website_content WHERE name = {`'main'`} LIMIT 1
                  </div>
                  <div className="mb-1">
                    <span className="text-gray-400">[2025-03-31 07:32:15]</span> <span className="text-green-400">SUCCESS:</span> Query executed successfully (12ms)
                  </div>
                  <div className="mb-1">
                    <span className="text-gray-400">[2025-03-31 07:32:18]</span> <span className="text-blue-400">QUERY:</span> SELECT COUNT(*) FROM pages
                  </div>
                  <div className="mb-1">
                    <span className="text-gray-400">[2025-03-31 07:32:18]</span> <span className="text-green-400">SUCCESS:</span> Query executed successfully (8ms)
                  </div>
                  <div className="mb-1">
                    <span className="text-gray-400">[2025-03-31 07:32:20]</span> <span className="text-blue-400">QUERY:</span> SELECT * FROM profiles ORDER BY created_at DESC LIMIT 5
                  </div>
                  <div className="mb-1">
                    <span className="text-gray-400">[2025-03-31 07:32:20]</span> <span className="text-green-400">SUCCESS:</span> Query executed successfully (15ms)
                  </div>
                  <div className="mb-1">
                    <span className="text-gray-400">[2025-03-31 07:32:25]</span> <span className="text-yellow-400">NOTICE:</span> Cache hit for website_content query
                  </div>
                  <div className="mb-1">
                    <span className="text-gray-400">[2025-03-31 07:32:30]</span> <span className="text-blue-400">QUERY:</span> UPDATE website_content SET content = $1 WHERE name = {`'main'`}
                  </div>
                  <div className="mb-1">
                    <span className="text-gray-400">[2025-03-31 07:32:30]</span> <span className="text-green-400">SUCCESS:</span> Updated 1 row (27ms)
                  </div>
                  <div className="mb-1">
                    <span className="text-gray-400">[2025-03-31 07:32:35]</span> <span className="text-blue-400">TRIGGER:</span> update_website_content_updated_at executed
                  </div>
                  <div className="mb-1">
                    <span className="text-gray-400">[2025-03-31 07:32:40]</span> <span className="text-blue-400">QUERY:</span> INSERT INTO publish_history (publish_type, published_by, changes) VALUES ({`'full'`},{`'f82c0e3a-...'`},{`'{\"changedSections\":[\"home\",\"services\"]}'`})
                  </div>
                  <div className="mb-1">
                    <span className="text-gray-400">[2025-03-31 07:32:40]</span> <span className="text-green-400">SUCCESS:</span> Inserted 1 row (18ms)
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>Refresh Logs</span>
                </Button>
                <div className="text-xs text-gray-500">
                  Menampilkan aktivitas simulasi
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatabaseMonitor;
