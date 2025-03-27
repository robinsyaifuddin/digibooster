
import React from 'react';
import ServicesDevelopment from '../Dashboard/ServicesDevelopment';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, FileWarning, Database } from 'lucide-react';

interface PublishingSettingsProps {
  onTabChange: (tab: string) => void;
}

const PublishingSettings: React.FC<PublishingSettingsProps> = ({ onTabChange }) => {
  return (
    <div className="space-y-6">
      <ServicesDevelopment onTabChange={onTabChange} />
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-amber-500" />
            Informasi Keamanan Penerbitan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
            <h3 className="font-medium text-amber-800 mb-2">Tindakan Keamanan</h3>
            <p className="text-sm text-amber-700">
              Setiap kali Anda menerbitkan perubahan, sistem kami akan secara otomatis membuat backup
              dari versi sebelumnya. Jika terjadi masalah, Anda dapat menggunakan fitur Rollback
              untuk mengembalikan ke versi yang stabil.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="border border-gray-200 rounded-md p-4">
              <div className="flex items-start gap-3">
                <FileWarning className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Mengatasi Error Penerbitan</h4>
                  <p className="text-sm text-gray-600">
                    Jika mengalami error seperti "Error 1101" atau "Worker threw exception",
                    lakukan rollback dan coba publikasikan kembali dengan perubahan yang lebih sedikit.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-4">
              <div className="flex items-start gap-3">
                <Database className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Penyimpanan Data</h4>
                  <p className="text-sm text-gray-600">
                    Data website disimpan dengan aman di browser Anda. Pastikan tidak menggunakan
                    mode penyamaran (incognito) saat menerbitkan website.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublishingSettings;
