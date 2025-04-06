
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const AppearanceSettings = () => {
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

  return (
    <motion.div 
      className="space-y-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <Card className="bg-dark-200 border-dark-300 text-white">
          <CardHeader>
            <CardTitle className="text-white">Tema dan Warna</CardTitle>
            <CardDescription className="text-gray-400">
              Kustomisasi tampilan website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Pilihan Warna Utama</Label>
              <div className="flex flex-wrap gap-2">
                {["#A633FF", "#7209B7", "#4CC9F0", "#F72585", "#0245A3", "#4f46e5"].map((color) => (
                  <button
                    key={color}
                    style={{ backgroundColor: color }}
                    className="w-8 h-8 rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-purple transition-transform hover:scale-110"
                    aria-label={`Pilih warna ${color}`}
                  />
                ))}
                <div className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center bg-dark-300 text-gray-300 hover:bg-dark-400 transition-colors">
                  <span className="text-xs">+</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-300">Mode Tampilan</Label>
              <RadioGroup defaultValue="dark-mode" className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light-mode" id="light-mode" className="border-gray-600 text-neon-purple" />
                  <Label htmlFor="light-mode" className="font-normal text-gray-300">Mode Terang</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark-mode" id="dark-mode" className="border-gray-600 text-neon-purple" />
                  <Label htmlFor="dark-mode" className="font-normal text-gray-300">Mode Gelap</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="auto-mode" id="auto-mode" className="border-gray-600 text-neon-purple" />
                  <Label htmlFor="auto-mode" className="font-normal text-gray-300">Otomatis</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-300">Font Utama</Label>
              <select
                className="w-full h-10 rounded-md border border-dark-400 bg-dark-300 px-3 py-2 text-sm text-white focus:border-neon-purple focus:outline-none"
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
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Card className="bg-dark-200 border-dark-300 text-white">
          <CardHeader>
            <CardTitle className="text-white">Logo dan Favicon</CardTitle>
            <CardDescription className="text-gray-400">
              Pengaturan logo dan ikon website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Logo Website</Label>
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <img
                    src="/lovable-uploads/eb7d859a-60c0-4007-afe4-522ffdd5afda.png"
                    alt="Logo saat ini"
                    className="h-10 rounded border border-dark-400 p-1 bg-dark-300 transition-all group-hover:border-neon-purple/50"
                  />
                  <div className="absolute inset-0 bg-dark-300/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded">
                    <span className="text-xs text-white">Ganti</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-dark-300 text-white hover:bg-dark-300 hover:border-neon-purple/50">
                  Ganti Logo
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-300">Favicon</Label>
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <div className="w-8 h-8 bg-dark-300 rounded border border-dark-400 flex items-center justify-center text-xs text-gray-400 transition-all group-hover:border-neon-purple/50">
                    Icon
                  </div>
                  <div className="absolute inset-0 bg-dark-300/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded">
                    <span className="text-xs text-white">Ganti</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-dark-300 text-white hover:bg-dark-300 hover:border-neon-purple/50">
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
