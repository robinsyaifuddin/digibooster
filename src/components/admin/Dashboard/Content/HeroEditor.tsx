
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
    <Card className="bg-dark-200 border-dark-300 text-white">
      <CardHeader>
        <CardTitle className="text-lg text-white">Hero Section</CardTitle>
        <CardDescription className="text-gray-400">
          Edit konten utama di bagian atas halaman beranda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-gray-300">Judul Hero</Label>
            <Input 
              id="title" 
              name="title" 
              value={heroContent.title} 
              onChange={handleHeroChange}
              className="mt-1 bg-dark-300 border-dark-400 text-white focus:border-neon-purple focus:ring-neon-purple/20" 
            />
          </div>
          <div>
            <Label htmlFor="subtitle" className="text-gray-300">Subtitle Hero</Label>
            <Textarea 
              id="subtitle" 
              name="subtitle" 
              value={heroContent.subtitle} 
              onChange={handleHeroChange}
              className="mt-1 bg-dark-300 border-dark-400 text-white focus:border-neon-purple focus:ring-neon-purple/20" 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ctaText" className="text-gray-300">Teks Tombol CTA</Label>
              <Input 
                id="ctaText" 
                name="ctaText" 
                value={heroContent.ctaText} 
                onChange={handleHeroChange}
                className="mt-1 bg-dark-300 border-dark-400 text-white focus:border-neon-purple focus:ring-neon-purple/20" 
              />
            </div>
            <div>
              <Label htmlFor="ctaLink" className="text-gray-300">Link Tombol CTA</Label>
              <Input 
                id="ctaLink" 
                name="ctaLink" 
                value={heroContent.ctaLink} 
                onChange={handleHeroChange}
                className="mt-1 bg-dark-300 border-dark-400 text-white focus:border-neon-purple focus:ring-neon-purple/20" 
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={saveHeroChanges} className="bg-neon-purple hover:bg-neon-violet text-white">
          <Save className="h-4 w-4 mr-2" />
          Simpan Perubahan
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HeroEditor;
