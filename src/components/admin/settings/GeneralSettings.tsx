import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useWebsiteDataStore } from '@/stores/websiteDataStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Palette, Search, Globe } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const GeneralSettings = () => {
  const websiteData = useWebsiteDataStore();
  const [activeSubTab, setActiveSubTab] = useState("basic");

  return (
    <div className="space-y-4">
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="basic" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Dasar
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center">
            <Palette className="h-4 w-4 mr-2" />
            Tampilan
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center">
            <Search className="h-4 w-4 mr-2" />
            SEO
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            Media Sosial
          </TabsTrigger>
        </TabsList>
        
        {/* Basic Settings Tab */}
        <TabsContent value="basic" className="space-y-4">
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
                  <Select defaultValue="id">
                    <SelectTrigger id="site-language">
                      <SelectValue placeholder="Pilih bahasa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="id">Bahasa Indonesia</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="other">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="site-timezone">Zona Waktu</Label>
                  <Select defaultValue="Asia/Jakarta">
                    <SelectTrigger id="site-timezone">
                      <SelectValue placeholder="Pilih zona waktu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Jakarta">Asia/Jakarta (WIB)</SelectItem>
                      <SelectItem value="Asia/Makassar">Asia/Makassar (WITA)</SelectItem>
                      <SelectItem value="Asia/Jayapura">Asia/Jayapura (WIT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tema Website</CardTitle>
              <CardDescription>
                Kustomisasi tampilan dan nuansa website Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Mode Tema</Label>
                <RadioGroup defaultValue={websiteData.appearance.theme} className="flex space-x-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="theme-light" />
                    <Label htmlFor="theme-light" className="cursor-pointer">Terang</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label htmlFor="theme-dark" className="cursor-pointer">Gelap</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="theme-system" />
                    <Label htmlFor="theme-system" className="cursor-pointer">Sistem</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Warna Utama</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="primary-color"
                      type="color"
                      className="w-12 h-10 p-1"
                      defaultValue={websiteData.appearance.primaryColor}
                    />
                    <Input 
                      type="text"
                      defaultValue={websiteData.appearance.primaryColor}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="secondary-color">Warna Sekunder</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="secondary-color"
                      type="color"
                      className="w-12 h-10 p-1"
                      defaultValue={websiteData.appearance.secondaryColor}
                    />
                    <Input 
                      type="text"
                      defaultValue={websiteData.appearance.secondaryColor}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 pt-2">
                <Label htmlFor="font-family">Font Utama</Label>
                <Select defaultValue={websiteData.appearance.fontFamily}>
                  <SelectTrigger id="font-family">
                    <SelectValue placeholder="Pilih font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Poppins">Poppins</SelectItem>
                    <SelectItem value="Roboto">Roboto</SelectItem>
                    <SelectItem value="Open Sans">Open Sans</SelectItem>
                    <SelectItem value="Montserrat">Montserrat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Layout Website</CardTitle>
              <CardDescription>
                Konfigurasi tata letak halaman website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-sidebar">Tampilkan Sidebar</Label>
                  <Switch id="enable-sidebar" defaultChecked />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sticky-header">Header Tetap</Label>
                  <Switch id="sticky-header" defaultChecked />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content-width">Lebar Konten</Label>
                <Select defaultValue="container">
                  <SelectTrigger id="content-width">
                    <SelectValue placeholder="Pilih lebar konten" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="container">Container (1200px)</SelectItem>
                    <SelectItem value="container-sm">Kecil (768px)</SelectItem>
                    <SelectItem value="container-md">Sedang (992px)</SelectItem>
                    <SelectItem value="container-lg">Besar (1200px)</SelectItem>
                    <SelectItem value="container-xl">Ekstra Besar (1400px)</SelectItem>
                    <SelectItem value="full">Lebar Penuh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* SEO Tab */}
        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan SEO</CardTitle>
              <CardDescription>
                Konfigurasi Search Engine Optimization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input
                  id="meta-title"
                  defaultValue={websiteData.seo.metaTitle}
                  placeholder="Judul untuk mesin pencari"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Disarankan 50-60 karakter untuk hasil optimal
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  rows={3}
                  defaultValue={websiteData.seo.metaDescription}
                  placeholder="Deskripsi singkat website Anda untuk mesin pencari"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Disarankan 150-160 karakter untuk hasil optimal
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="meta-keywords">Keywords</Label>
                <Textarea
                  id="meta-keywords"
                  rows={2}
                  defaultValue={websiteData.seo.keywords.join(', ')}
                  placeholder="Kata kunci yang relevan dengan website Anda (pisahkan dengan koma)"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="canonical-url">URL Kanonik</Label>
                <Input
                  id="canonical-url"
                  placeholder="https://www.example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="robots-txt">Robots.txt</Label>
                <Textarea
                  id="robots-txt"
                  rows={3}
                  defaultValue={"User-agent: *\nAllow: /\nDisallow: /admin/"}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="google-analytics">ID Google Analytics</Label>
                <Input
                  id="google-analytics"
                  defaultValue={websiteData.seo.googleAnalyticsId}
                  placeholder="UA-XXXXXXXX-X atau G-XXXXXXXXXX"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Social Media Tab */}
        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Media Sosial</CardTitle>
              <CardDescription>
                Hubungkan website Anda dengan profil media sosial
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="facebook-url">Facebook</Label>
                <Input
                  id="facebook-url"
                  placeholder="https://facebook.com/yourpage"
                  defaultValue={websiteData.generalInfo.socialMedia?.facebook}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instagram-url">Instagram</Label>
                <Input
                  id="instagram-url"
                  placeholder="https://instagram.com/yourusername"
                  defaultValue={websiteData.generalInfo.socialMedia?.instagram}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="twitter-url">Twitter / X</Label>
                <Input
                  id="twitter-url"
                  placeholder="https://twitter.com/yourusername"
                  defaultValue={websiteData.generalInfo.socialMedia?.twitter}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="linkedin-url">LinkedIn</Label>
                <Input
                  id="linkedin-url"
                  placeholder="https://linkedin.com/in/yourusername"
                  defaultValue={websiteData.generalInfo.socialMedia?.linkedin}
                />
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium mb-3">Pengaturan Sharing</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="og-title">Judul Open Graph</Label>
                  <Input
                    id="og-title"
                    placeholder="Judul untuk share di sosial media"
                  />
                </div>
                
                <div className="space-y-2 mt-2">
                  <Label htmlFor="og-description">Deskripsi Open Graph</Label>
                  <Textarea
                    id="og-description"
                    rows={2}
                    placeholder="Deskripsi pendek untuk tampilan share"
                  />
                </div>
                
                <div className="space-y-2 mt-2">
                  <Label htmlFor="og-image">Gambar Open Graph</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="og-image"
                      defaultValue={websiteData.seo.ogImage}
                      placeholder="URL gambar untuk tampilan share"
                    />
                    <Button variant="outline">Upload</Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Ukuran gambar 1200x630 piksel disarankan
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GeneralSettings;
