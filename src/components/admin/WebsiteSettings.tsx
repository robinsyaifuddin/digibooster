import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { BarChart4, CheckCircle, Facebook, FileEdit, Github, Globe, GripHorizontal, Instagram, LayoutGrid, Linkedin, Move, Palette, RefreshCw, Save, Search, Settings as SettingsIcon, TwitterIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useWebsiteDataStore } from '@/stores/websiteDataStore';
import ServicesDevelopment from './Dashboard/ServicesDevelopment';
import PageEditor from './Dashboard/PageEditor';

const WebsiteSettings = () => {
  const { toast } = useToast();
  const websiteData = useWebsiteDataStore();
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const handleSave = () => {
    setSaving(true);
    
    // Simulate saving data
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Pengaturan berhasil disimpan",
        description: "Perubahan pada pengaturan website telah berhasil disimpan.",
      });
    }, 1500);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Pengaturan Website</h1>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline">
            Lihat Preview
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Simpan Pengaturan
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="w-full md:w-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          <TabsTrigger value="general" className="flex items-center">
            <SettingsIcon className="w-4 h-4 mr-2" />
            Umum
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center">
            <Palette className="w-4 h-4 mr-2" />
            Tampilan
          </TabsTrigger>
          <TabsTrigger value="pages" className="flex items-center">
            <LayoutGrid className="w-4 h-4 mr-2" />
            Halaman
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center">
            <Search className="w-4 h-4 mr-2" />
            SEO
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center">
            <Facebook className="w-4 h-4 mr-2" />
            Sosial Media
          </TabsTrigger>
          <TabsTrigger value="publishing" className="flex items-center">
            <Globe className="w-4 h-4 mr-2" />
            Publikasi
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Dasar Website</CardTitle>
              <CardDescription>
                Pengaturan informasi utama website Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Nama Website</Label>
                <Input
                  id="site-name"
                  defaultValue={websiteData.generalInfo.title}
                  placeholder="Masukkan nama website Anda"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="site-tagline">Tagline</Label>
                <Input
                  id="site-tagline"
                  defaultValue={websiteData.generalInfo.tagline}
                  placeholder="Tagline atau slogan singkat website Anda"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="site-description">Deskripsi</Label>
                <Textarea
                  id="site-description"
                  defaultValue={websiteData.generalInfo.description}
                  placeholder="Deskripsi singkat mengenai website Anda"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="site-address">Alamat</Label>
                <Input
                  id="site-address"
                  defaultValue={websiteData.generalInfo.address}
                  placeholder="Alamat fisik bisnis atau organisasi Anda"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site-email">Email Kontak</Label>
                  <Input
                    id="site-email"
                    defaultValue={websiteData.generalInfo.email}
                    placeholder="Email kontak utama"
                    type="email"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="site-phone">Nomor Telepon</Label>
                  <Input
                    id="site-phone"
                    defaultValue={websiteData.generalInfo.phone}
                    placeholder="Nomor telepon kontak"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Lokalisasi</CardTitle>
              <CardDescription>
                Pengaturan bahasa dan zona waktu
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site-language">Bahasa Utama</Label>
                  <select
                    id="site-language"
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    defaultValue="id"
                  >
                    <option value="id">Bahasa Indonesia</option>
                    <option value="en">English</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="site-timezone">Zona Waktu</Label>
                  <select
                    id="site-timezone"
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    defaultValue="Asia/Jakarta"
                  >
                    <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                    <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                    <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tema dan Warna</CardTitle>
              <CardDescription>
                Kustomisasi tampilan website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Pilihan Warna Utama</Label>
                <div className="flex flex-wrap gap-2">
                  {["#0245A3", "#0284c7", "#1e40af", "#4f46e5", "#7c3aed", "#9333ea"].map((color) => (
                    <button
                      key={color}
                      style={{ backgroundColor: color }}
                      className="w-8 h-8 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                      aria-label={`Pilih warna ${color}`}
                    />
                  ))}
                  <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">
                    <span className="text-xs">+</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Mode Tampilan</Label>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="light-mode"
                      name="color-mode"
                      className="w-4 h-4"
                      defaultChecked
                    />
                    <Label htmlFor="light-mode" className="font-normal">Mode Terang</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="dark-mode"
                      name="color-mode"
                      className="w-4 h-4"
                    />
                    <Label htmlFor="dark-mode" className="font-normal">Mode Gelap</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="auto-mode"
                      name="color-mode"
                      className="w-4 h-4"
                    />
                    <Label htmlFor="auto-mode" className="font-normal">Otomatis</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Font Utama</Label>
                <select
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  defaultValue="inter"
                >
                  <option value="inter">Inter</option>
                  <option value="poppins">Poppins</option>
                  <option value="montserrat">Montserrat</option>
                  <option value="roboto">Roboto</option>
                  <option value="open-sans">Open Sans</option>
                </select>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Logo dan Favicon</CardTitle>
              <CardDescription>
                Pengaturan logo dan ikon website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Logo Website</Label>
                <div className="flex items-center gap-4">
                  <img
                    src="/lovable-uploads/eb7d859a-60c0-4007-afe4-522ffdd5afda.png"
                    alt="Logo saat ini"
                    className="h-10 rounded border border-gray-200 p-1"
                  />
                  <Button variant="outline" size="sm">
                    Ganti Logo
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Favicon</Label>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-xs text-gray-500">
                    Icon
                  </div>
                  <Button variant="outline" size="sm">
                    Ganti Favicon
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* New Pages Editor Tab */}
        <TabsContent value="pages" className="space-y-4">
          <PageEditor pages={websiteData.pages} />
        </TabsContent>

        {/* SEO Settings */}
        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan SEO</CardTitle>
              <CardDescription>
                Optimasi website untuk mesin pencari
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input
                  id="meta-title"
                  defaultValue={websiteData.generalInfo.title}
                  placeholder="Title untuk mesin pencari"
                />
                <p className="text-xs text-gray-500">Ideal: 50-60 karakter</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  defaultValue={websiteData.generalInfo.description}
                  placeholder="Deskripsi singkat untuk mesin pencari"
                  rows={3}
                />
                <p className="text-xs text-gray-500">Ideal: 120-155 karakter</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="meta-keywords">Meta Keywords</Label>
                <Input
                  id="meta-keywords"
                  placeholder="Kata kunci dipisahkan dengan koma"
                  defaultValue="digital marketing, jasa website, digital consulting, digital transformation"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="canonical-url">Canonical URL</Label>
                <Input
                  id="canonical-url"
                  placeholder="URL kanonik website Anda"
                  defaultValue="https://www.digibooster.id"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="sitemap" defaultChecked />
                <Label htmlFor="sitemap" className="font-normal">Aktifkan Sitemap XML</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="robots" defaultChecked />
                <Label htmlFor="robots" className="font-normal">Izinkan pengindeksan oleh mesin pencari</Label>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Alat Analitik</CardTitle>
              <CardDescription>
                Integrasi alat analitik untuk tracking pengunjung
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="google-analytics">Google Analytics ID</Label>
                <Input
                  id="google-analytics"
                  placeholder="Contoh: G-XXXXXXXXXX atau UA-XXXXXXXX-X"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="google-tag-manager">Google Tag Manager ID</Label>
                <Input
                  id="google-tag-manager"
                  placeholder="Contoh: GTM-XXXXXXX"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="facebook-pixel">Meta (Facebook) Pixel ID</Label>
                <Input
                  id="facebook-pixel"
                  placeholder="Contoh: XXXXXXXXXXXXXXXXXX"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media Settings */}
        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sosial Media</CardTitle>
              <CardDescription>
                Pengaturan profil sosial media
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Facebook className="h-4 w-4" />
                  Facebook URL
                </Label>
                <Input
                  placeholder="https://facebook.com/yourbusiness"
                  defaultValue="https://facebook.com/digibooster"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  Instagram URL
                </Label>
                <Input
                  placeholder="https://instagram.com/yourbusiness"
                  defaultValue="https://instagram.com/digibooster.id"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <TwitterIcon className="h-4 w-4" />
                  Twitter URL
                </Label>
                <Input
                  placeholder="https://twitter.com/yourbusiness"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn URL
                </Label>
                <Input
                  placeholder="https://linkedin.com/company/yourbusiness"
                  defaultValue="https://linkedin.com/company/digibooster"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website URL
                </Label>
                <Input
                  placeholder="https://www.yourwebsite.com"
                  defaultValue="https://www.digibooster.id"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  GitHub URL
                </Label>
                <Input
                  placeholder="https://github.com/yourbusiness"
                />
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">
                  <BarChart4 className="inline-block w-4 h-4 mr-1" />
                  Sosial media digunakan di footer dan halaman kontak
                </p>
              </div>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Open Graph</CardTitle>
              <CardDescription>
                Pengaturan untuk share konten di sosial media
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="og-title">OG Title</Label>
                <Input
                  id="og-title"
                  defaultValue={websiteData.generalInfo.title}
                  placeholder="Judul untuk share di sosial media"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="og-description">OG Description</Label>
                <Textarea
                  id="og-description"
                  defaultValue={websiteData.generalInfo.description}
                  placeholder="Deskripsi untuk share di sosial media"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label>OG Image</Label>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-16 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-xs text-gray-500">
                    Preview Image
                  </div>
                  <Button variant="outline" size="sm">
                    Upload Gambar
                  </Button>
                </div>
                <p className="text-xs text-gray-500">Rekomendasi: ukuran 1200 x 630 piksel</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Publishing Settings */}
        <TabsContent value="publishing">
          <ServicesDevelopment onTabChange={setActiveTab} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebsiteSettings;
