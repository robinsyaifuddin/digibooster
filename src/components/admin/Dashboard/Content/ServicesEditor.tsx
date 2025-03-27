
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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Layanan</CardTitle>
        <CardDescription>
          Edit layanan yang ditampilkan di halaman beranda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map(service => (
            <Card key={service.id} className="shadow-sm">
              <CardHeader className="py-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">{service.title}</CardTitle>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => setEditingService(editingService === service.id ? null : service.id)}
                  >
                    {editingService === service.id ? "Tutup" : "Edit"}
                  </Button>
                </div>
              </CardHeader>
              
              {editingService === service.id && (
                <CardContent className="pb-3">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor={`service-title-${service.id}`}>Judul Layanan</Label>
                      <Input 
                        id={`service-title-${service.id}`}
                        value={service.title}
                        onChange={(e) => handleServiceChange(service.id, 'title', e.target.value)}
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label htmlFor={`service-desc-${service.id}`}>Deskripsi</Label>
                      <Textarea 
                        id={`service-desc-${service.id}`}
                        value={service.description}
                        onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)}
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label htmlFor={`service-link-${service.id}`}>Link</Label>
                      <Input 
                        id={`service-link-${service.id}`}
                        value={service.link}
                        onChange={(e) => handleServiceChange(service.id, 'link', e.target.value)}
                        className="mt-1" 
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button size="sm" onClick={() => setEditingService(null)}>
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
