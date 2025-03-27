
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useWebsiteDataStore } from '@/stores/websiteDataStore';

const GeneralSettings = () => {
  const websiteData = useWebsiteDataStore();

  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default GeneralSettings;
