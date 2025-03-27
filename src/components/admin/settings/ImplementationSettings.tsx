
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Server, Database, Key, Save, Code, Globe, AlertTriangle, ArrowRight, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ImplementationSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('server');
  const [apiUrl, setApiUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [databaseType, setDatabaseType] = useState('mysql');
  const [backendType, setBackendType] = useState('php');
  const [serverProvider, setServerProvider] = useState('');
  const [implementationStatus, setImplementationStatus] = useState<'not-started' | 'in-progress' | 'completed'>('not-started');
  const [databaseConfig, setDatabaseConfig] = useState({
    host: '',
    port: '',
    name: '',
    user: '',
    password: ''
  });

  useEffect(() => {
    // Load saved settings if any
    const savedApiUrl = localStorage.getItem('implementation_apiUrl');
    const savedApiKey = localStorage.getItem('implementation_apiKey');
    const savedDatabaseType = localStorage.getItem('implementation_databaseType');
    const savedBackendType = localStorage.getItem('implementation_backendType');
    const savedServerProvider = localStorage.getItem('implementation_serverProvider');
    const savedImplementationStatus = localStorage.getItem('implementation_status');
    const savedDatabaseConfig = localStorage.getItem('implementation_databaseConfig');

    if (savedApiUrl) setApiUrl(savedApiUrl);
    if (savedApiKey) setApiKey(savedApiKey);
    if (savedDatabaseType) setDatabaseType(savedDatabaseType);
    if (savedBackendType) setBackendType(savedBackendType);
    if (savedServerProvider) setServerProvider(savedServerProvider);
    if (savedImplementationStatus) setImplementationStatus(savedImplementationStatus as any);
    if (savedDatabaseConfig) {
      try {
        setDatabaseConfig(JSON.parse(savedDatabaseConfig));
      } catch (error) {
        console.error('Error parsing database config', error);
      }
    }
  }, []);
  
  const handleSaveSettings = () => {
    // Simpan pengaturan implementasi
    localStorage.setItem('implementation_apiUrl', apiUrl);
    localStorage.setItem('implementation_apiKey', apiKey);
    localStorage.setItem('implementation_databaseType', databaseType);
    localStorage.setItem('implementation_backendType', backendType);
    localStorage.setItem('implementation_serverProvider', serverProvider);
    localStorage.setItem('implementation_status', implementationStatus);
    localStorage.setItem('implementation_databaseConfig', JSON.stringify(databaseConfig));
    
    toast({
      title: "Pengaturan implementasi disimpan",
      description: "Konfigurasi telah berhasil disimpan. Lihat instruksi berikutnya untuk menyelesaikan implementasi.",
      duration: 3000,
    });
  };

  const handleDatabaseConfigChange = (field: keyof typeof databaseConfig, value: string) => {
    setDatabaseConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateImplementationStatus = (status: 'not-started' | 'in-progress' | 'completed') => {
    setImplementationStatus(status);
    localStorage.setItem('implementation_status', status);
    
    if (status === 'completed') {
      toast({
        title: "Implementasi selesai!",
        description: "Selamat! Website Anda sekarang terhubung dengan database dan API nyata.",
        duration: 5000,
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Implementasi Website Sebenarnya</h2>
        
        <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-gray-100">
          Status: 
          {implementationStatus === 'not-started' && (
            <span className="text-amber-600 flex items-center gap-1">
              <AlertTriangle className="h-3.5 w-3.5" /> Belum Diimplementasikan
            </span>
          )}
          {implementationStatus === 'in-progress' && (
            <span className="text-blue-600 flex items-center gap-1">
              <ArrowRight className="h-3.5 w-3.5" /> Dalam Proses
            </span>
          )}
          {implementationStatus === 'completed' && (
            <span className="text-green-600 flex items-center gap-1">
              <Check className="h-3.5 w-3.5" /> Selesai
            </span>
          )}
        </div>
      </div>
      
      <Alert variant="info" className="bg-blue-50 border-blue-200">
        <AlertTriangle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-700">
          Mode simulasi saat ini menggunakan penyimpanan lokal (localStorage) yang hanya tersimpan di browser Anda. 
          Gunakan tab-tab di bawah untuk mengonfigurasi website Anda menggunakan database dan API nyata.
        </AlertDescription>
      </Alert>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Konfigurasi Server dan Database
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="server" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="server" className="flex items-center gap-2">
                <Server className="h-4 w-4" />
                Server & API
              </TabsTrigger>
              <TabsTrigger value="database" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Database
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Integrasi Kode
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="server" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="backend-type">Jenis Backend</Label>
                <select 
                  id="backend-type"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={backendType}
                  onChange={(e) => setBackendType(e.target.value)}
                >
                  <option value="php">PHP (Laravel, CodeIgniter, dll)</option>
                  <option value="nodejs">Node.js (Express, NestJS, dll)</option>
                  <option value="python">Python (Django, Flask, dll)</option>
                  <option value="java">Java (Spring Boot)</option>
                  <option value="dotnet">ASP.NET Core</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Pilih teknologi backend yang akan digunakan untuk API website Anda
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="server-provider">Penyedia Hosting/Server</Label>
                <select 
                  id="server-provider"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={serverProvider}
                  onChange={(e) => setServerProvider(e.target.value)}
                >
                  <option value="">Pilih penyedia...</option>
                  <option value="vps">VPS (DigitalOcean, Linode, AWS EC2)</option>
                  <option value="shared">Shared Hosting (cPanel)</option>
                  <option value="managed">Managed Hosting (Kinsta, WP Engine)</option>
                  <option value="paas">Platform as a Service (Heroku, Vercel, Netlify)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Pilih di mana aplikasi backend Anda akan di-deploy
                </p>
              </div>
              
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
                  <option value="sqlite">SQLite</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Jenis database yang digunakan untuk menyimpan data website
                </p>
              </div>
              
              <div className="space-y-4 border border-gray-200 rounded-md p-4 mt-2">
                <h3 className="font-medium">Konfigurasi Koneksi Database</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="db-host">Host Database</Label>
                    <Input 
                      id="db-host" 
                      placeholder="localhost atau IP address" 
                      value={databaseConfig.host}
                      onChange={(e) => handleDatabaseConfigChange('host', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="db-port">Port</Label>
                    <Input 
                      id="db-port" 
                      placeholder="3306 untuk MySQL, 5432 untuk PostgreSQL" 
                      value={databaseConfig.port}
                      onChange={(e) => handleDatabaseConfigChange('port', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="db-name">Nama Database</Label>
                    <Input 
                      id="db-name" 
                      placeholder="nama_database" 
                      value={databaseConfig.name}
                      onChange={(e) => handleDatabaseConfigChange('name', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="db-user">Username</Label>
                    <Input 
                      id="db-user" 
                      placeholder="username database" 
                      value={databaseConfig.user}
                      onChange={(e) => handleDatabaseConfigChange('user', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="db-password">Password</Label>
                    <Input 
                      id="db-password" 
                      type="password" 
                      placeholder="••••••••••••••••" 
                      value={databaseConfig.password}
                      onChange={(e) => handleDatabaseConfigChange('password', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mt-2">
                  <p className="text-xs text-amber-700">
                    <strong>Catatan Keamanan:</strong> Informasi koneksi database hanya disimpan sementara 
                    di browser Anda dan akan digunakan untuk menghasilkan kode konfigurasi. 
                    Pastikan untuk mengamankan kredensial database Anda di server produksi.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="code" className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
                <h3 className="text-blue-800 font-medium mb-2">Panduan Implementasi Kode</h3>
                <p className="text-blue-700 text-sm">
                  Berikut adalah langkah-langkah yang perlu Anda ikuti untuk menghubungkan website admin Anda dengan backend nyata:
                </p>
                <ol className="text-blue-700 text-sm mt-2 space-y-1 list-decimal list-inside">
                  <li>Siapkan server backend menggunakan teknologi pilihan Anda</li>
                  <li>Buat database dan tabel sesuai struktur yang diperlukan</li>
                  <li>Implementasikan API untuk mengelola data website</li>
                  <li>Hubungkan frontend admin dengan API tersebut</li>
                  <li>Deploy aplikasi Anda ke server produksi</li>
                </ol>
              </div>
              
              <div className="space-y-2">
                <Label>
                  Contoh Kode Koneksi Database ({databaseType})
                </Label>
                <Textarea 
                  readOnly
                  className="font-mono text-xs h-40 bg-gray-800 text-gray-200"
                  value={
                    databaseType === 'mysql' ? 
`// Koneksi MySQL di PHP
$host = '${databaseConfig.host || 'localhost'}';
$db   = '${databaseConfig.name || 'nama_database'}';
$user = '${databaseConfig.user || 'username'}';
$pass = '${databaseConfig.password || 'password'}';
$port = ${databaseConfig.port || '3306'};

$conn = new mysqli($host, $user, $pass, $db, $port);
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}`
                    : databaseType === 'postgresql' ?
`// Koneksi PostgreSQL di Node.js dengan pg
const { Pool } = require('pg');
const pool = new Pool({
  user: '${databaseConfig.user || 'username'}',
  host: '${databaseConfig.host || 'localhost'}',
  database: '${databaseConfig.name || 'nama_database'}',
  password: '${databaseConfig.password || 'password'}',
  port: ${databaseConfig.port || '5432'},
});`
                    : databaseType === 'mongodb' ?
`// Koneksi MongoDB dengan mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://${databaseConfig.user ? databaseConfig.user + ':' + databaseConfig.password + '@' : ''}${databaseConfig.host || 'localhost'}:${databaseConfig.port || '27017'}/${databaseConfig.name || 'nama_database'}');`
                    : 'Pilih jenis database untuk melihat contoh kode koneksi'
                  }
                />
              </div>
              
              <div className="space-y-2 mt-4">
                <Label>
                  Contoh Kode API untuk Publikasi Website
                </Label>
                <Textarea 
                  readOnly
                  className="font-mono text-xs h-40 bg-gray-800 text-gray-200"
                  value={
                    backendType === 'php' ?
`// Endpoint API PHP untuk publikasi website
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Verifikasi API Key
$headers = getallheaders();
$apiKey = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : '';

if ($apiKey !== '${apiKey || 'YOUR_API_KEY'}') {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

// Terima data dari request
$data = json_decode(file_get_contents('php://input'), true);

// Simpan data ke database
// ... kode untuk menyimpan data ke database ...

echo json_encode(['success' => true, 'message' => 'Website berhasil dipublikasikan']);
?>`
                    : backendType === 'nodejs' ?
`// Endpoint API Node.js dengan Express untuk publikasi website
const express = require('express');
const router = express.Router();

// Middleware untuk verifikasi API Key
const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers.authorization?.replace('Bearer ', '');
  if (apiKey !== '${apiKey || 'YOUR_API_KEY'}') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Endpoint untuk publikasi website
router.post('/publish', verifyApiKey, async (req, res) => {
  try {
    const websiteData = req.body;
    
    // Simpan data ke database
    // ... kode untuk menyimpan data ke database ...
    
    res.json({ success: true, message: 'Website berhasil dipublikasikan' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;`
                    : backendType === 'python' ?
`# Endpoint API Python dengan Flask untuk publikasi website
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Middleware untuk verifikasi API Key
def verify_api_key():
    api_key = request.headers.get('Authorization', '').replace('Bearer ', '')
    if api_key != '${apiKey || 'YOUR_API_KEY'}':
        return jsonify({'error': 'Unauthorized'}), 401
    return None

@app.route('/api/publish', methods=['POST'])
def publish_website():
    # Verifikasi API Key
    auth_error = verify_api_key()
    if auth_error:
        return auth_error
        
    # Terima data dari request
    website_data = request.json
    
    # Simpan data ke database
    # ... kode untuk menyimpan data ke database ...
    
    return jsonify({'success': True, 'message': 'Website berhasil dipublikasikan'})

if __name__ == '__main__':
    app.run(debug=True)`
                    : 'Pilih jenis backend untuk melihat contoh kode API'
                  }
                />
              </div>
              
              <div className="space-y-2 mt-4">
                <Label>
                  Modifikasi Frontend untuk Menggunakan API Nyata
                </Label>
                <Textarea 
                  readOnly
                  className="font-mono text-xs h-40 bg-gray-800 text-gray-200"
                  value={`// Modifikasi hook usePublish.ts untuk menggunakan API nyata

// Import axios untuk HTTP requests
import axios from 'axios';

// Di dalam fungsi publishChanges:
const publishChanges = async () => {
  updatePublishState('publishing', true);
  resetProgress();
  
  try {
    // Simpan data website saat ini sebagai backup
    const currentData = localStorage.getItem('websiteData');
    if (currentData) {
      localStorage.setItem('websiteDataBackup', currentData);
    }

    await simulateProgressStep(0, 20, 1000);
    
    toast({
      title: "Menyiapkan aset",
      description: "Mengoptimalkan gambar dan aset statis...",
    });
    
    await simulateProgressStep(20, 50, 1000);
    
    // Kirim data ke API nyata
    try {
      const apiUrl = '${apiUrl || 'https://api.yourdomain.com/publish'}';
      const apiKey = '${apiKey || 'YOUR_API_KEY'}';
      
      await simulateProgressStep(50, 75, 1000);
      
      toast({
        title: "Mengirim data ke server",
        description: "Menyinkronkan perubahan dengan server produksi...",
      });
      
      // Kirim data website ke server
      const response = await axios.post(apiUrl, {
        websiteData,
        pageEdits
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${apiKey}\`
        }
      });
      
      console.log('Publish result:', response.data);
      
      if (!response.data.success) {
        throw new Error('Gagal mengirim data ke server');
      }
    } catch (apiError) {
      console.error('Error publishing to API:', apiError);
      toast({
        variant: "destructive",
        title: "Gagal menghubungi server",
        description: "Tidak dapat mengirim perubahan ke server. Periksa koneksi internet Anda.",
      });
      throw new Error('API error');
    }
    
    // ... kode selanjutnya ...
  } catch (error) {
    // ... penanganan error ...
  }
};`}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-col gap-2">
            <Button 
              variant="outline"
              size="sm"
              className={implementationStatus === 'not-started' ? 'text-blue-600' : 'text-gray-400'}
              disabled={implementationStatus !== 'not-started'}
              onClick={() => updateImplementationStatus('in-progress')}
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Mulai Implementasi
            </Button>
            <Button 
              variant="outline"
              size="sm"
              className={implementationStatus === 'in-progress' ? 'text-green-600' : 'text-gray-400'}
              disabled={implementationStatus !== 'in-progress'}
              onClick={() => updateImplementationStatus('completed')}
            >
              <Check className="h-4 w-4 mr-2" />
              Selesaikan Implementasi
            </Button>
          </div>
          
          <Button onClick={handleSaveSettings} className="w-full sm:w-auto">
            <Save className="h-4 w-4 mr-2" />
            Simpan Pengaturan Implementasi
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Langkah-langkah Implementasi Website Produksi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-medium">1. Persiapan Server dan Database</h3>
              <p className="text-sm text-gray-600">
                Setup server hosting dan database yang akan digunakan untuk menyimpan data website Anda.
                Pastikan sudah membuat database dengan struktur tabel yang sesuai dengan kebutuhan website.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">2. Pengembangan Backend API</h3>
              <p className="text-sm text-gray-600">
                Kembangkan backend API menggunakan teknologi yang Anda pilih (PHP, Node.js, Python, dll).
                Implementasikan endpoint-endpoint yang diperlukan untuk mengelola konten website.
              </p>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="border border-gray-200 rounded-md p-3">
                  <h4 className="text-sm font-medium">Endpoint yang Diperlukan:</h4>
                  <ul className="text-xs text-gray-600 mt-1 space-y-1 list-disc list-inside">
                    <li>POST /api/publish - Untuk mempublikasikan website</li>
                    <li>GET /api/content - Untuk mengambil konten website</li>
                    <li>PUT /api/content - Untuk memperbarui konten website</li>
                    <li>POST /api/auth - Untuk otentikasi admin</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-md p-3">
                  <h4 className="text-sm font-medium">Fitur Backend:</h4>
                  <ul className="text-xs text-gray-600 mt-1 space-y-1 list-disc list-inside">
                    <li>Otentikasi & otorisasi pengguna admin</li>
                    <li>Validasi data input</li>
                    <li>Penyimpanan data ke database</li>
                    <li>Pengelolaan file & gambar</li>
                    <li>Pencatatan log (logging)</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">3. Modifikasi Frontend Admin</h3>
              <p className="text-sm text-gray-600">
                Ubah kode frontend admin untuk terhubung dengan API backend nyata alih-alih menggunakan localStorage.
                Modifikasi terutama diperlukan pada file-file berikut:
              </p>
              <ul className="text-xs text-gray-600 mt-1 space-y-1 list-disc list-inside">
                <li><span className="font-mono">src/hooks/usePublish.ts</span> - Ganti simulasi dengan panggilan API nyata</li>
                <li><span className="font-mono">src/stores/websiteDataStore.ts</span> - Tambahkan fungsi untuk sinkronisasi dengan backend</li>
                <li><span className="font-mono">src/components/admin/settings/*.tsx</span> - Hubungkan form dengan API</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">4. Testing dan Deployment</h3>
              <p className="text-sm text-gray-600">
                Uji integrasi antara frontend dan backend secara menyeluruh sebelum melakukan deployment ke server produksi.
                Pastikan semua fitur berfungsi dengan baik dan data tersimpan dengan aman di database.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-green-50 border border-green-200 rounded-md p-5">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 p-1 rounded-full bg-green-100">
            <Database className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-medium text-green-800 mb-1">Pilihan Alternatif: Layanan Backend as a Service</h3>
            <p className="text-sm text-green-700 mb-3">
              Jika Anda tidak ingin mengembangkan backend dari awal, Anda dapat menggunakan layanan Backend as a Service (BaaS) seperti:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-white rounded-md p-3 border border-green-200">
                <h4 className="font-medium text-green-800 mb-1">Firebase</h4>
                <p className="text-xs text-green-700">
                  Solusi lengkap dari Google yang menyediakan database realtime, otentikasi, hosting, dan banyak lagi.
                </p>
              </div>
              <div className="bg-white rounded-md p-3 border border-green-200">
                <h4 className="font-medium text-green-800 mb-1">Supabase</h4>
                <p className="text-xs text-green-700">
                  Alternatif open-source untuk Firebase dengan PostgreSQL, otentikasi, dan API yang mudah digunakan.
                </p>
              </div>
              <div className="bg-white rounded-md p-3 border border-green-200">
                <h4 className="font-medium text-green-800 mb-1">AWS Amplify</h4>
                <p className="text-xs text-green-700">
                  Layanan dari Amazon yang mempermudah pembuatan aplikasi cloud-powered dengan skalabilitas tinggi.
                </p>
              </div>
            </div>
            <p className="text-sm text-green-700 mt-3">
              Layanan-layanan ini dapat mempercepat pengembangan dan mengurangi kebutuhan untuk mengelola infrastruktur sendiri.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImplementationSettings;
