
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const AppearanceSettings = () => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default AppearanceSettings;
