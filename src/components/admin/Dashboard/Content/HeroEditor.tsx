
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HeroEditorProps {
  heroContent: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
  };
  handleHeroChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  saveHeroChanges: () => void;
}

const HeroEditor = ({ heroContent, handleHeroChange, saveHeroChanges }: HeroEditorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Hero Section</CardTitle>
        <CardDescription>
          Edit konten utama di bagian atas halaman beranda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Judul Hero</Label>
            <Input 
              id="title" 
              name="title" 
              value={heroContent.title} 
              onChange={handleHeroChange}
              className="mt-1" 
            />
          </div>
          <div>
            <Label htmlFor="subtitle">Subtitle Hero</Label>
            <Textarea 
              id="subtitle" 
              name="subtitle" 
              value={heroContent.subtitle} 
              onChange={handleHeroChange}
              className="mt-1" 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ctaText">Teks Tombol CTA</Label>
              <Input 
                id="ctaText" 
                name="ctaText" 
                value={heroContent.ctaText} 
                onChange={handleHeroChange}
                className="mt-1" 
              />
            </div>
            <div>
              <Label htmlFor="ctaLink">Link Tombol CTA</Label>
              <Input 
                id="ctaLink" 
                name="ctaLink" 
                value={heroContent.ctaLink} 
                onChange={handleHeroChange}
                className="mt-1" 
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={saveHeroChanges}>
          <Save className="h-4 w-4 mr-2" />
          Simpan Perubahan
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HeroEditor;
