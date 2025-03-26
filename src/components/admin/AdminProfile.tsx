
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "../../hooks/use-toast";
import { User, Key, Bell, Shield, RefreshCw, Upload, FileText, BarChart4 } from "lucide-react";

const AdminProfile = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const handleSaveProfile = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Profil berhasil diperbarui",
        description: "Informasi profil admin telah berhasil diperbarui.",
      });
    }, 1500);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Profil Admin</h1>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general" className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            Informasi Umum
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Key className="w-4 h-4 mr-2" />
            Keamanan
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="w-4 h-4 mr-2" />
            Notifikasi
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Aktivitas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Informasi Profil</CardTitle>
                <CardDescription>
                  Perbarui informasi profil admin Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-name">Nama Lengkap</Label>
                    <Input id="admin-name" defaultValue="Admin DigiBooster" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Email</Label>
                    <Input id="admin-email" defaultValue="digibooster@123" disabled />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="admin-bio">Bio</Label>
                  <Textarea 
                    id="admin-bio" 
                    defaultValue="Administrator website DigiBooster yang bertanggung jawab untuk mengelola seluruh konten dan pengguna." 
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="admin-position">Jabatan</Label>
                  <Input id="admin-position" defaultValue="Website Administrator" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-phone">Nomor Telepon</Label>
                    <Input id="admin-phone" defaultValue="+62 821-1234-5678" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-location">Lokasi</Label>
                    <Input id="admin-location" defaultValue="Bandar Lampung, Indonesia" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveProfile} disabled={saving}>
                  {saving ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : null}
                  {saving ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Foto Profil</CardTitle>
                <CardDescription>
                  Perbarui foto profil admin
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <Avatar className="w-32 h-32 mb-6">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-4xl bg-diginavy text-white">AD</AvatarFallback>
                </Avatar>
                
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Unggah Foto
                  </Button>
                  <Button variant="outline" className="text-red-600 hover:text-red-700">
                    Hapus
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Ubah Kata Sandi</CardTitle>
                <CardDescription>
                  Perbarui kata sandi admin Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Kata Sandi Saat Ini</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Kata Sandi Baru</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Konfirmasi Kata Sandi Baru</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Perbarui Kata Sandi</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Keamanan Akun</CardTitle>
                <CardDescription>
                  Pengaturan keamanan tambahan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autentikasi Dua Faktor</Label>
                    <p className="text-sm text-gray-500">Aktifkan verifikasi dua langkah untuk keamanan lebih</p>
                  </div>
                  <Switch id="two-factor" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Pemberitahuan Login</Label>
                    <p className="text-sm text-gray-500">Dapatkan notifikasi saat ada login baru</p>
                  </div>
                  <Switch id="login-notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sesi Aktif</Label>
                    <p className="text-sm text-gray-500">Kelola dan pantau sesi login aktif</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Kelola
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Notifikasi</CardTitle>
              <CardDescription>
                Atur preferensi notifikasi admin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Notifikasi Email</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-user-registration" className="cursor-pointer">
                        Pendaftaran Pengguna Baru
                      </Label>
                      <Switch id="notify-user-registration" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-comments" className="cursor-pointer">
                        Komentar Baru di Blog
                      </Label>
                      <Switch id="notify-comments" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-contact" className="cursor-pointer">
                        Pesan dari Formulir Kontak
                      </Label>
                      <Switch id="notify-contact" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-security" className="cursor-pointer">
                        Peringatan Keamanan
                      </Label>
                      <Switch id="notify-security" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Notifikasi Dashboard</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-dash-user" className="cursor-pointer">
                        Aktivitas Pengguna
                      </Label>
                      <Switch id="notify-dash-user" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-dash-updates" className="cursor-pointer">
                        Update System
                      </Label>
                      <Switch id="notify-dash-updates" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-dash-analytics" className="cursor-pointer">
                        Laporan Analitik Mingguan
                      </Label>
                      <Switch id="notify-dash-analytics" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Simpan Pengaturan</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Aktivitas Admin</CardTitle>
              <CardDescription>
                Lihat riwayat aktivitas terbaru Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { id: 1, action: "Login berhasil", date: "Hari ini, 10:23", ip: "182.23.45.67", device: "Chrome / Windows" },
                  { id: 2, action: "Perbarui pengaturan website", date: "Hari ini, 09:45", ip: "182.23.45.67", device: "Chrome / Windows" },
                  { id: 3, action: "Tambah artikel blog baru", date: "Kemarin, 16:30", ip: "182.23.45.67", device: "Chrome / Windows" },
                  { id: 4, action: "Perbarui data pengguna", date: "Kemarin, 14:15", ip: "182.23.45.67", device: "Chrome / Windows" },
                  { id: 5, action: "Login berhasil", date: "Kemarin, 09:10", ip: "182.23.45.67", device: "Chrome / Windows" },
                  { id: 6, action: "Tambah layanan baru", date: "2 hari lalu, 15:45", ip: "58.147.89.32", device: "Safari / MacOS" },
                  { id: 7, action: "Perbarui tampilan beranda", date: "3 hari lalu, 11:20", ip: "58.147.89.32", device: "Safari / MacOS" },
                ].map((activity) => (
                  <div key={activity.id} className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      {activity.action.includes("Login") ? (
                        <Shield className="w-4 h-4 text-gray-600" />
                      ) : activity.action.includes("blog") ? (
                        <FileText className="w-4 h-4 text-gray-600" />
                      ) : activity.action.includes("pengguna") ? (
                        <User className="w-4 h-4 text-gray-600" />
                      ) : activity.action.includes("analitik") ? (
                        <BarChart4 className="w-4 h-4 text-gray-600" />
                      ) : (
                        <FileText className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{activity.action}</h4>
                      <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-500 gap-1 md:gap-3">
                        <span>{activity.date}</span>
                        <span className="hidden md:inline">•</span>
                        <span>IP: {activity.ip}</span>
                        <span className="hidden md:inline">•</span>
                        <span>{activity.device}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Hapus Riwayat</Button>
              <Button variant="outline">Lihat Semua Aktivitas</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminProfile;
