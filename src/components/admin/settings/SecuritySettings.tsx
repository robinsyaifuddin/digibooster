
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  RotateCw, 
  Key, 
  AlertTriangle, 
  CheckCircle2, 
  FileWarning,
  Fingerprint,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const SecuritySettings = () => {
  const { toast } = useToast();
  const { user, updateSecurityLevel, checkPasswordStrength } = useAuth();
  
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState('sk_live_DigiB00st3r_S3cur3_K3y_2024');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: '' });
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const [securityLevel, setSecurityLevel] = useState(user?.securityLevel || 'standard');
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };
  
  const handleGenerateApiKey = () => {
    setIsGeneratingKey(true);
    setTimeout(() => {
      const newKey = 'sk_live_' + Math.random().toString(36).substring(2, 15) + 
                    Math.random().toString(36).substring(2, 15);
      setApiKey(newKey);
      setIsGeneratingKey(false);
      toast({
        title: "API key telah diperbarui",
        description: "Pastikan untuk menyimpan API key baru Anda dengan aman",
      });
    }, 1500);
  };
  
  const handleSecurityLevelChange = (newLevel: 'standard' | 'enhanced' | 'maximum') => {
    setSecurityLevel(newLevel);
    updateSecurityLevel(newLevel);
    
    toast({
      title: "Level keamanan diperbarui",
      description: `Level keamanan telah diubah menjadi ${newLevel}`,
    });
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Umum
          </TabsTrigger>
          <TabsTrigger value="access" className="flex items-center gap-2">
            <Key className="w-4 h-4" />
            Kontrol Akses
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            API & Integrasi
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-amber-500" />
                Pengaturan Keamanan Umum
              </CardTitle>
              <CardDescription>
                Atur level keamanan dan proteksi untuk website Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Level Keamanan</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card 
                      className={`border cursor-pointer hover:border-blue-300 ${
                        securityLevel === 'standard' ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => handleSecurityLevelChange('standard')}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Standar</h4>
                          <Badge variant="outline" className="bg-blue-100">Default</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Perlindungan dasar untuk website Anda</p>
                        <ul className="text-xs space-y-1 text-gray-500">
                          <li className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                            Validasi input
                          </li>
                          <li className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                            Enkripsi data dasar
                          </li>
                          <li className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                            Perlindungan CSRF
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card 
                      className={`border cursor-pointer hover:border-blue-300 ${
                        securityLevel === 'enhanced' ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => handleSecurityLevelChange('enhanced')}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Ditingkatkan</h4>
                          <Badge variant="outline" className="bg-green-100 text-green-800">Direkomendasikan</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Keamanan tambahan untuk data sensitif</p>
                        <ul className="text-xs space-y-1 text-gray-500">
                          <li className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                            Semua fitur Standar
                          </li>
                          <li className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                            Login dengan 2FA
                          </li>
                          <li className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                            Rate limiting
                          </li>
                          <li className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                            Log audit keamanan
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card 
                      className={`border cursor-pointer hover:border-blue-300 ${
                        securityLevel === 'maximum' ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => handleSecurityLevelChange('maximum')}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Maksimum</h4>
                          <Badge variant="outline" className="bg-purple-100 text-purple-800">Enterprise</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Perlindungan tingkat tertinggi</p>
                        <ul className="text-xs space-y-1 text-gray-500">
                          <li className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                            Semua fitur Ditingkatkan
                          </li>
                          <li className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                            Advanced encryption
                          </li>
                          <li className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                            Security headers
                          </li>
                          <li className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                            IP filtering
                          </li>
                          <li className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                            Anomaly detection
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                  <div className="flex gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-amber-800 mb-1">Rekomendasi Keamanan</h3>
                      <p className="text-sm text-amber-700">
                        Gunakan kombinasi password yang kuat dan aktifkan autentikasi dua faktor untuk 
                        meningkatkan keamanan akun admin. Pastikan juga website selalu diperbarui 
                        dan gunakan HTTPS untuk semua koneksi.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Alat Keamanan</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium flex items-center gap-2 mb-3">
                        <Fingerprint className="h-4 w-4 text-blue-600" />
                        Password Security Check
                      </h4>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="password-check">Periksa Kekuatan Password</Label>
                          <div className="flex gap-2">
                            <Input
                              type={showApiKey ? 'text' : 'password'}
                              id="password-check"
                              placeholder="Masukkan password untuk diperiksa"
                              value={password}
                              onChange={handlePasswordChange}
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setShowApiKey(!showApiKey)}
                            >
                              {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                        
                        {password && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Kekuatan:</span>
                              <span className={`font-medium ${
                                passwordStrength.score <= 2 ? 'text-red-600' :
                                passwordStrength.score <= 4 ? 'text-amber-600' :
                                'text-green-600'
                              }`}>
                                {passwordStrength.score <= 2 ? 'Lemah' :
                                 passwordStrength.score <= 4 ? 'Sedang' : 'Kuat'}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className={`h-2.5 rounded-full ${
                                passwordStrength.score <= 2 ? 'bg-red-600' :
                                passwordStrength.score <= 4 ? 'bg-amber-500' :
                                'bg-green-600'
                              }`} style={{ width: `${Math.min(passwordStrength.score * 16.6, 100)}%` }}></div>
                            </div>
                            <p className="text-xs text-gray-600">{passwordStrength.feedback}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium flex items-center gap-2 mb-3">
                        <Shield className="h-4 w-4 text-green-600" />
                        Security Scanner
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Pindai website Anda untuk menemukan celah keamanan potensial.
                      </p>
                      <Button variant="outline" className="w-full">
                        Mulai Pemindaian
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="access">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-blue-500" />
                Pengaturan Akses & Otentikasi
              </CardTitle>
              <CardDescription>
                Atur kontrol akses dan keamanan login
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Autentikasi</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Autentikasi Dua Faktor (2FA)</Label>
                      <p className="text-sm text-gray-500">Tingkatkan keamanan dengan verifikasi dua langkah</p>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Kedaluwarsa Sesi</Label>
                      <p className="text-sm text-gray-500">Logout otomatis setelah 2 jam tidak aktif</p>
                    </div>
                    <Switch id="session-expiry" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Login Satu Perangkat</Label>
                      <p className="text-sm text-gray-500">Batasi login hanya pada satu perangkat</p>
                    </div>
                    <Switch id="single-device" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Pembatasan & Monitoring</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Rate Limiting</Label>
                      <p className="text-sm text-gray-500">Batasi percobaan login (5 kali / 15 menit)</p>
                    </div>
                    <Switch id="rate-limiting" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notifikasi Login Baru</Label>
                      <p className="text-sm text-gray-500">Dapatkan email saat ada login dari perangkat baru</p>
                    </div>
                    <Switch id="login-notification" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Audit Log</Label>
                      <p className="text-sm text-gray-500">Catat semua aktivitas login dan perubahan sensitif</p>
                    </div>
                    <Switch id="audit-log" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-2">
                <h3 className="text-sm font-medium mb-3">Sesi Aktif</h3>
                
                <div className="border rounded-md divide-y">
                  <div className="p-3 flex items-center justify-between bg-gray-50">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <div>
                        <p className="text-sm font-medium">Perangkat Ini</p>
                        <p className="text-xs text-gray-500">Chrome di Windows • Bandar Lampung, Indonesia</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Saat Ini
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-3">
                  <Button variant="outline" size="sm">
                    Logout Dari Semua Perangkat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-purple-500" />
                API & Keamanan Integrasi
              </CardTitle>
              <CardDescription>
                Kelola API key dan integrasi pihak ketiga dengan aman
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">API Key</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key Anda</Label>
                    <div className="flex gap-2">
                      <Input
                        type={showApiKey ? 'text' : 'password'}
                        id="api-key"
                        value={apiKey}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      API key ini digunakan untuk mengintegrasikan layanan eksternal. Jaga kerahasiaannya.
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={handleGenerateApiKey}
                      disabled={isGeneratingKey}
                    >
                      {isGeneratingKey ? (
                        <>
                          <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Generate API Key Baru
                        </>
                      )}
                    </Button>
                    
                    <Button variant="outline">
                      Salin
                    </Button>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-2">
                  <h3 className="text-sm font-medium mb-3">Layanan Terintegrasi</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center mr-3">
                          <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-600" fill="currentColor">
                            <path d="M10.5 13.5v2.25h3v-2.25h-3zm0-9v2.25h3V4.5h-3zm0 4.5v2.25h3V9h-3zM4.5 13.5v2.25h3v-2.25h-3zm0-9v2.25h3V4.5h-3zm0 4.5v2.25h3V9h-3zm13.5 0v2.25h3V9h-3zm0-4.5v2.25h3V4.5h-3zm0 9v2.25h3v-2.25h-3z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Database Service</p>
                          <p className="text-xs text-gray-500">Terhubung • Diperbarui 2 hari lalu</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Atur
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-amber-100 rounded-md flex items-center justify-center mr-3">
                          <FileWarning className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Security Scanner</p>
                          <p className="text-xs text-gray-500">Terhubung • Diperbarui 7 hari lalu</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Atur
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <div className="flex gap-3">
                  <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-800 mb-1">Praktik Terbaik Keamanan API</h3>
                    <p className="text-sm text-blue-700">
                      Jangan pernah menyertakan API key langsung dalam kode frontend. Gunakan 
                      environment variable server atau layanan pengelolaan rahasia. Perbarui API key 
                      secara berkala dan batasi akses berdasarkan domain.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecuritySettings;
