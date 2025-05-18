
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from '@/contexts/ThemeContext';
import { CheckIcon } from 'lucide-react';

const AppearanceSettings = () => {
  const { theme } = useTheme();
  const [selectedColor, setSelectedColor] = useState("#03d5eb");
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const colorOptions = [
    { value: "#03d5eb", label: "Cyan Default" },
    { value: "#0bbcd1", label: "Ocean Blue" },
    { value: "#4CC9F0", label: "Sky Blue" },
    { value: "#0245A3", label: "Deep Blue" },
    { value: "#4f46e5", label: "Indigo" },
    { value: "#9333ea", label: "Purple" }
  ];

  return (
    <motion.div 
      className="space-y-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
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
              <div className="flex flex-wrap gap-3">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    style={{ backgroundColor: color.value }}
                    className={`w-10 h-10 rounded-full relative focus:outline-none focus:ring-2 focus:ring-offset-2 transition-transform hover:scale-110 ${
                      selectedColor === color.value ? 'ring-2 ring-offset-2' : ''
                    }`}
                    onClick={() => setSelectedColor(color.value)}
                    aria-label={`Pilih warna ${color.label}`}
                  >
                    {selectedColor === color.value && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <CheckIcon className="w-5 h-5 text-white" />
                      </span>
                    )}
                  </button>
                ))}
                <div className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center bg-gray-50 dark:bg-dark-300 hover:bg-gray-100 dark:hover:bg-dark-400 transition-colors">
                  <span className="text-lg">+</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Mode Tampilan</Label>
              <RadioGroup defaultValue={theme} className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="dark-mode" />
                  <Label htmlFor="dark-mode" className="font-normal">Mode Gelap</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label>Font Utama</Label>
              <select
                className="w-full h-10 rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                defaultValue="poppins"
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
      </motion.div>
      
      <motion.div variants={itemVariants}>
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
                <div className="relative group">
                  <img
                    src="/lovable-uploads/63175a8a-8817-436e-8f8b-a3246a8bf733.png"
                    alt="Logo saat ini"
                    className="h-10 rounded border p-1 bg-card/40 transition-all group-hover:border-primary/50"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded">
                    <span className="text-xs text-white">Ganti</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Ganti Logo
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Favicon</Label>
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <div className="w-8 h-8 bg-card/40 rounded border flex items-center justify-center text-xs text-muted-foreground transition-all group-hover:border-primary/50">
                    Icon
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded">
                    <span className="text-xs text-white">Ganti</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Ganti Favicon
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AppearanceSettings;
