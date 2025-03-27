
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, TwitterIcon, Linkedin, Globe, Github, BarChart4 } from "lucide-react";

const SocialMediaSettings = () => {
  return (
    <div className="space-y-4">
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
              placeholder="Judul untuk share di sosial media"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="og-description">OG Description</Label>
            <Textarea
              id="og-description"
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
    </div>
  );
};

export default SocialMediaSettings;
