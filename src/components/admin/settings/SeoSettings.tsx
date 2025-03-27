
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useWebsiteDataStore } from '@/stores/websiteDataStore';

const SeoSettings = () => {
  const websiteData = useWebsiteDataStore();
  
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default SeoSettings;
