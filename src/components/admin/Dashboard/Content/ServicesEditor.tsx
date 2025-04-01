
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { ServiceItem } from "@/types/websiteTypes";

interface ServicesEditorProps {
  services: ServiceItem[];
  handleServiceChange: (id: string, field: string, value: string) => void;
}

const ServicesEditor = ({ services, handleServiceChange }: ServicesEditorProps) => {
  const [editingService, setEditingService] = useState<string | null>(null);

  return (
    <Card className="bg-dark-200 border-dark-300 text-white">
      <CardHeader>
        <CardTitle className="text-lg text-white">Layanan</CardTitle>
        <CardDescription className="text-gray-400">
          Edit layanan yang ditampilkan di halaman beranda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map(service => (
            <Card key={service.id} className="shadow-sm bg-dark-300 border-dark-400">
              <CardHeader className="py-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base text-white">{service.title}</CardTitle>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => setEditingService(editingService === service.id ? null : service.id)}
                    className="text-neon-purple hover:bg-dark-400 hover:text-neon-purple"
                  >
                    {editingService === service.id ? "Tutup" : "Edit"}
                  </Button>
                </div>
              </CardHeader>
              
              {editingService === service.id && (
                <CardContent className="pb-3">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor={`service-title-${service.id}`} className="text-gray-300">Judul Layanan</Label>
                      <Input 
                        id={`service-title-${service.id}`}
                        value={service.title}
                        onChange={(e) => handleServiceChange(service.id, 'title', e.target.value)}
                        className="mt-1 bg-dark-400 border-dark-500 text-white focus:border-neon-purple focus:ring-neon-purple/20" 
                      />
                    </div>
                    <div>
                      <Label htmlFor={`service-desc-${service.id}`} className="text-gray-300">Deskripsi</Label>
                      <Textarea 
                        id={`service-desc-${service.id}`}
                        value={service.description}
                        onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)}
                        className="mt-1 bg-dark-400 border-dark-500 text-white focus:border-neon-purple focus:ring-neon-purple/20" 
                      />
                    </div>
                    <div>
                      <Label htmlFor={`service-link-${service.id}`} className="text-gray-300">Link</Label>
                      <Input 
                        id={`service-link-${service.id}`}
                        value={service.link}
                        onChange={(e) => handleServiceChange(service.id, 'link', e.target.value)}
                        className="mt-1 bg-dark-400 border-dark-500 text-white focus:border-neon-purple focus:ring-neon-purple/20" 
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button size="sm" onClick={() => setEditingService(null)} className="bg-neon-purple hover:bg-neon-violet text-white">
                        <Save className="h-3 w-3 mr-2" />
                        Simpan
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServicesEditor;
