
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Button } from "@/components/ui/button";
import { BarChart2, Users, Eye, Download, Calendar, ArrowUpRight, Clock, RefreshCw, Map } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useImplementationSettings } from "@/hooks/useImplementationSettings";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#5DADE2'];

const AnalyticsMonitor = () => {
  const { isRealImplementation } = useImplementationSettings();
  const [activeTab, setActiveTab] = useState("traffic");
  const [timeRange, setTimeRange] = useState("7d");
  
  // Sample data for demonstration
  const trafficData = [
    { name: 'Mon', visits: 1200, pageviews: 1800, users: 900 },
    { name: 'Tue', visits: 1300, pageviews: 2100, users: 950 },
    { name: 'Wed', visits: 1400, pageviews: 2300, users: 1100 },
    { name: 'Thu', visits: 1800, pageviews: 2900, users: 1450 },
    { name: 'Fri', visits: 2000, pageviews: 3100, users: 1500 },
    { name: 'Sat', visits: 1500, pageviews: 2300, users: 1200 },
    { name: 'Sun', visits: 1100, pageviews: 1700, users: 950 },
  ];
  
  const deviceData = [
    { name: 'Mobile', value: 65 },
    { name: 'Desktop', value: 30 },
    { name: 'Tablet', value: 5 },
  ];
  
  const browserData = [
    { name: 'Chrome', value: 55 },
    { name: 'Safari', value: 25 },
    { name: 'Firefox', value: 10 },
    { name: 'Edge', value: 8 },
    { name: 'Others', value: 2 },
  ];
  
  const contentPerformanceData = [
    { name: 'Home', views: 3000, engagement: 80, conversion: 5.2 },
    { name: 'About', views: 1200, engagement: 75, conversion: 3.5 },
    { name: 'Services', views: 1800, engagement: 65, conversion: 4.8 },
    { name: 'Portfolio', views: 2200, engagement: 70, conversion: 6.1 },
    { name: 'Blog', views: 1500, engagement: 85, conversion: 7.2 },
    { name: 'Contact', views: 900, engagement: 60, conversion: 9.5 },
  ];
  
  const locationData = [
    { name: 'Indonesia', value: 68 },
    { name: 'United States', value: 12 },
    { name: 'Malaysia', value: 8 },
    { name: 'Singapore', value: 5 },
    { name: 'Others', value: 7 },
  ];
  
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
          <h2 className="text-2xl font-bold">Analytics</h2>
          <p className="text-muted-foreground">
            Analisis performa website dan perilaku pengguna
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Pilih Rentang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24 Jam</SelectItem>
              <SelectItem value="7d">7 Hari</SelectItem>
              <SelectItem value="30d">30 Hari</SelectItem>
              <SelectItem value="90d">90 Hari</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>
      
      {!isRealImplementation && (
        <div className="flex items-center gap-2 bg-amber-50 text-amber-800 p-3 rounded-md border border-amber-200">
          <Badge className="bg-amber-500">Demo</Badge>
          <span className="text-sm">
            Menampilkan data demo. Aktifkan implementasi nyata untuk mendapatkan data analytics sebenarnya.
          </span>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Kunjungan</p>
                <h2 className="text-3xl font-bold">12,384</h2>
              </div>
              <div className="p-2 bg-blue-100 text-blue-700 rounded-full">
                <Eye className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">12.5%</span>
              <span className="text-muted-foreground ml-2">vs minggu lalu</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pengguna Aktif</p>
                <h2 className="text-3xl font-bold">4,821</h2>
              </div>
              <div className="p-2 bg-green-100 text-green-700 rounded-full">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">8.3%</span>
              <span className="text-muted-foreground ml-2">vs minggu lalu</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Page Views</p>
                <h2 className="text-3xl font-bold">28,219</h2>
              </div>
              <div className="p-2 bg-purple-100 text-purple-700 rounded-full">
                <BarChart2 className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">15.2%</span>
              <span className="text-muted-foreground ml-2">vs minggu lalu</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rata-rata Durasi</p>
                <h2 className="text-3xl font-bold">3:24</h2>
              </div>
              <div className="p-2 bg-amber-100 text-amber-700 rounded-full">
                <Clock className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">5.8%</span>
              <span className="text-muted-foreground ml-2">vs minggu lalu</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="content">Konten</TabsTrigger>
          <TabsTrigger value="demographics">Demografi</TabsTrigger>
        </TabsList>
        
        <TabsContent value="traffic" className="pt-4">
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Overview Kunjungan Website</CardTitle>
                <CardDescription>
                  Grafik kunjungan, page views, dan pengguna aktif selama 7 hari terakhir
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trafficData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="visits" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="pageviews" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="users" stroke="#ffc658" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Perangkat</CardTitle>
                <CardDescription>
                  Distribusi berdasarkan perangkat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Browser</CardTitle>
                <CardDescription>
                  Distribusi berdasarkan browser
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={browserData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {browserData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sumber Traffic</CardTitle>
                <CardDescription>
                  Distribusi berdasarkan sumber
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Direct', value: 40 },
                          { name: 'Organic Search', value: 30 },
                          { name: 'Social Media', value: 15 },
                          { name: 'Referral', value: 10 },
                          { name: 'Other', value: 5 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {browserData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="content" className="pt-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Performa Halaman</CardTitle>
                <CardDescription>
                  Metrik berdasarkan halaman website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={contentPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="views" fill="#8884d8" name="Views" />
                      <Bar yAxisId="left" dataKey="engagement" fill="#82ca9d" name="Engagement (%)" />
                      <Bar yAxisId="right" dataKey="conversion" fill="#ffc658" name="Conversion (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Halaman Paling Populer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contentPerformanceData.sort((a, b) => b.views - a.views).slice(0, 5).map((page, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-100 text-blue-800 h-6 w-6 rounded-full flex items-center justify-center text-xs">
                          {index + 1}
                        </div>
                        <span>{page.name}</span>
                      </div>
                      <div className="text-sm font-medium">{page.views.toLocaleString()} views</div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Lihat Semua
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Konversi Tertinggi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contentPerformanceData.sort((a, b) => b.conversion - a.conversion).slice(0, 5).map((page, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="bg-green-100 text-green-800 h-6 w-6 rounded-full flex items-center justify-center text-xs">
                          {index + 1}
                        </div>
                        <span>{page.name}</span>
                      </div>
                      <div className="text-sm font-medium">{page.conversion}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Lihat Semua
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Engagement Tertinggi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contentPerformanceData.sort((a, b) => b.engagement - a.engagement).slice(0, 5).map((page, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="bg-purple-100 text-purple-800 h-6 w-6 rounded-full flex items-center justify-center text-xs">
                          {index + 1}
                        </div>
                        <span>{page.name}</span>
                      </div>
                      <div className="text-sm font-medium">{page.engagement}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Lihat Semua
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="demographics" className="pt-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5 text-blue-600" />
                  Lokasi Pengunjung
                </CardTitle>
                <CardDescription>
                  Distribusi geografis pengunjung website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={locationData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip formatter={(value) => [`${value}%`, 'Pengunjung']} />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Bahasa</CardTitle>
                <CardDescription>
                  Bahasa yang digunakan pengunjung
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Indonesia', value: 75 },
                      { name: 'English', value: 18 },
                      { name: 'Malay', value: 4 },
                      { name: 'Chinese', value: 2 },
                      { name: 'Others', value: 1 },
                    ]} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip formatter={(value) => [`${value}%`, 'Pengunjung']} />
                      <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Usia Pengunjung</CardTitle>
                <CardDescription>
                  Distribusi pengunjung berdasarkan kelompok usia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: '18-24', value: 25 },
                      { name: '25-34', value: 38 },
                      { name: '35-44', value: 22 },
                      { name: '45-54', value: 10 },
                      { name: '55+', value: 5 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}%`, 'Pengunjung']} />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Jenis Kelamin</CardTitle>
                <CardDescription>
                  Distribusi pengunjung berdasarkan jenis kelamin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Pria', value: 55 },
                          { name: 'Wanita', value: 42 },
                          { name: 'Lainnya', value: 3 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        <Cell fill="#8884d8" />
                        <Cell fill="#82ca9d" />
                        <Cell fill="#ffc658" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsMonitor;
