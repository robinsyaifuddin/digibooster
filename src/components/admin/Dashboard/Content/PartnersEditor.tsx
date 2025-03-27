
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Save, ExternalLink, Trash2 } from "lucide-react";
import { PartnerItem } from "@/types/websiteTypes";

interface PartnersEditorProps {
  partners: PartnerItem[];
  handlePartnerChange: (id: string, field: string, value: string) => void;
  deletePartner: (id: string) => void;
  newPartner: Omit<PartnerItem, 'id'>;
  handleNewPartnerChange: (field: string, value: string) => void;
  addNewPartner: () => void;
}

const PartnersEditor = ({ 
  partners, 
  handlePartnerChange, 
  deletePartner,
  newPartner,
  handleNewPartnerChange,
  addNewPartner
}: PartnersEditorProps) => {
  const [editingPartner, setEditingPartner] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Kelola Partner Perusahaan</CardTitle>
        <CardDescription>
          Edit dan tambahkan perusahaan teknologi yang menjadi partner DigiBooster
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.map(partner => (
              <Card key={partner.id} className="shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{partner.name}</CardTitle>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => setEditingPartner(editingPartner === partner.id ? null : partner.id)}
                    >
                      {editingPartner === partner.id ? "Tutup" : "Edit"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-16 flex items-center justify-center mb-2">
                    <img 
                      src={partner.image} 
                      alt={partner.name}
                      className="h-full object-contain"
                    />
                  </div>
                  
                  {editingPartner === partner.id ? (
                    <div className="space-y-3 mt-4">
                      <div>
                        <Label htmlFor={`partner-name-${partner.id}`}>Nama Partner</Label>
                        <Input 
                          id={`partner-name-${partner.id}`}
                          value={partner.name}
                          onChange={(e) => handlePartnerChange(partner.id, 'name', e.target.value)}
                          className="mt-1" 
                        />
                      </div>
                      <div>
                        <Label htmlFor={`partner-image-${partner.id}`}>URL Logo</Label>
                        <Input 
                          id={`partner-image-${partner.id}`}
                          value={partner.image}
                          onChange={(e) => handlePartnerChange(partner.id, 'image', e.target.value)}
                          className="mt-1" 
                        />
                      </div>
                      <div>
                        <Label htmlFor={`partner-link-${partner.id}`}>Website Link (opsional)</Label>
                        <Input 
                          id={`partner-link-${partner.id}`}
                          value={partner.link || ''}
                          onChange={(e) => handlePartnerChange(partner.id, 'link', e.target.value)}
                          className="mt-1" 
                          placeholder="https://"
                        />
                      </div>
                      <div className="flex justify-between">
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={() => deletePartner(partner.id)}
                        >
                          <Trash2 className="h-3 w-3 mr-2" />
                          Hapus
                        </Button>
                        <Button size="sm" onClick={() => setEditingPartner(null)}>
                          <Save className="h-3 w-3 mr-2" />
                          Simpan
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 truncate">
                      {partner.link ? (
                        <a href={partner.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                          {partner.link} <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      ) : (
                        "Tidak ada link website"
                      )}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tambah Partner Baru</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="new-partner-name">Nama Partner</Label>
                  <Input 
                    id="new-partner-name"
                    value={newPartner.name}
                    onChange={(e) => handleNewPartnerChange('name', e.target.value)}
                    className="mt-1" 
                    placeholder="Nama perusahaan"
                  />
                </div>
                <div>
                  <Label htmlFor="new-partner-image">URL Logo</Label>
                  <Input 
                    id="new-partner-image"
                    value={newPartner.image}
                    onChange={(e) => handleNewPartnerChange('image', e.target.value)}
                    className="mt-1" 
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                <div>
                  <Label htmlFor="new-partner-link">Website Link (opsional)</Label>
                  <Input 
                    id="new-partner-link"
                    value={newPartner.link || ''}
                    onChange={(e) => handleNewPartnerChange('link', e.target.value)}
                    className="mt-1" 
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={addNewPartner}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Partner
              </Button>
            </CardFooter>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default PartnersEditor;
