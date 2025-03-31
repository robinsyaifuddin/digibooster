
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Code, Copy, ExternalLink, Link as LinkIcon, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useImplementationSettings } from "@/hooks/useImplementationSettings";
import { motion } from "framer-motion";

const ApiDocumentation = () => {
  const { toast } = useToast();
  const { isRealImplementation } = useImplementationSettings();
  const [activeTab, setActiveTab] = useState("rest");
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Disalin ke clipboard",
      description: "Kode telah disalin ke clipboard",
    });
  };
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Dokumentasi API</h2>
          <p className="text-muted-foreground">
            Panduan dan referensi untuk mengakses API DigiBooster
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            <span>Buka di Tab Baru</span>
          </Button>
        </div>
      </div>
      
      {!isRealImplementation && (
        <div className="flex items-center gap-2 bg-amber-50 text-amber-800 p-3 rounded-md border border-amber-200">
          <Badge className="bg-amber-500">Simulasi</Badge>
          <span className="text-sm">
            Mode simulasi aktif. Beberapa endpoint API mungkin tidak tersedia.
          </span>
        </div>
      )}
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b">
          <TabsList className="bg-transparent py-0">
            <TabsTrigger value="rest" className="py-3 px-6 data-[state=active]:bg-background data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-diginavy data-[state=active]:rounded-none">
              REST API
            </TabsTrigger>
            <TabsTrigger value="graphql" className="py-3 px-6 data-[state=active]:bg-background data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-diginavy data-[state=active]:rounded-none">
              GraphQL
            </TabsTrigger>
            <TabsTrigger value="websocket" className="py-3 px-6 data-[state=active]:bg-background data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-diginavy data-[state=active]:rounded-none">
              WebSocket
            </TabsTrigger>
            <TabsTrigger value="webhooks" className="py-3 px-6 data-[state=active]:bg-background data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-diginavy data-[state=active]:rounded-none">
              Webhooks
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="rest" className="pt-4">
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="md:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-blue-600" />
                    Endpoints
                  </CardTitle>
                  <CardDescription>
                    List endpoint API yang tersedia untuk digunakan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Endpoint</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Deskripsi</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-mono text-sm">/api/website/content</TableCell>
                        <TableCell>GET</TableCell>
                        <TableCell>Mengambil konten website</TableCell>
                        <TableCell><Badge variant="outline" className="bg-green-100 text-green-800">Aktif</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-sm">/api/website/update</TableCell>
                        <TableCell>POST</TableCell>
                        <TableCell>Memperbarui konten website</TableCell>
                        <TableCell><Badge variant="outline" className="bg-green-100 text-green-800">Aktif</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-sm">/api/users</TableCell>
                        <TableCell>GET</TableCell>
                        <TableCell>Daftar pengguna</TableCell>
                        <TableCell>
                          {isRealImplementation ? (
                            <Badge variant="outline" className="bg-green-100 text-green-800">Aktif</Badge>
                          ) : (
                            <Badge variant="outline" className="bg-amber-100 text-amber-800">Simulasi</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-sm">/api/analytics/summary</TableCell>
                        <TableCell>GET</TableCell>
                        <TableCell>Ringkasan data analitik</TableCell>
                        <TableCell><Badge variant="outline" className="bg-blue-100 text-blue-800">Beta</Badge></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Contoh Request</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-4 rounded-md relative">
                    <pre className="font-mono text-sm overflow-auto">
{`// Mengambil konten website
fetch('https://api.digibooster.com/api/website/content', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));`}
                    </pre>
                    <Button variant="ghost" size="sm" className="absolute top-2 right-2 h-8 w-8 p-0" onClick={() => copyToClipboard(`fetch('https://api.digibooster.com/api/website/content', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));`)}>
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Autentikasi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    Semua request API memerlukan autentikasi dengan token API. Token dapat dibuat di halaman Pengaturan.
                  </p>
                  <div className="bg-gray-100 p-3 rounded-md font-mono text-sm overflow-auto">
                    Authorization: Bearer YOUR_API_KEY
                  </div>
                  <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => copyToClipboard("Authorization: Bearer YOUR_API_KEY")}>
                    <Copy className="h-4 w-4" />
                    <span>Salin Header</span>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Status API</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${isRealImplementation ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                    <span className="font-medium">{isRealImplementation ? 'Aktif' : 'Mode Simulasi'}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="border rounded-md p-2">
                      <div className="text-gray-500">Uptime</div>
                      <div className="font-medium">99.9%</div>
                    </div>
                    <div className="border rounded-md p-2">
                      <div className="text-gray-500">Latency</div>
                      <div className="font-medium">234 ms</div>
                    </div>
                    <div className="border rounded-md p-2">
                      <div className="text-gray-500">Versi</div>
                      <div className="font-medium">v1.2.3</div>
                    </div>
                    <div className="border rounded-md p-2">
                      <div className="text-gray-500">Rate Limit</div>
                      <div className="font-medium">100/menit</div>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <RefreshCw className="h-4 w-4" />
                    <span>Periksa Status</span>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Referensi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                    <LinkIcon className="h-4 w-4" />
                    <span>Dokumentasi Lengkap</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                    <LinkIcon className="h-4 w-4" />
                    <span>Contoh Kode</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                    <LinkIcon className="h-4 w-4" />
                    <span>Changelog API</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="graphql" className="pt-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-center py-12"
          >
            <Code className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h3 className="text-xl font-medium mb-2">GraphQL API Segera Hadir</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Kami sedang mengembangkan API GraphQL untuk memberikan pengalaman developer yang lebih fleksibel.
            </p>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="websocket" className="pt-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-center py-12"
          >
            <Code className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h3 className="text-xl font-medium mb-2">WebSocket API Segera Hadir</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Kami sedang mengembangkan WebSocket API untuk komunikasi real-time.
            </p>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="webhooks" className="pt-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-center py-12"
          >
            <Code className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h3 className="text-xl font-medium mb-2">Webhooks Segera Hadir</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Kami sedang mengembangkan fitur Webhooks untuk notifikasi event.
            </p>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiDocumentation;
