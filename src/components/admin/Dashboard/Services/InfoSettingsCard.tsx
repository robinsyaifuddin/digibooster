
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Server, Database, Globe, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useImplementationSettings } from "@/hooks/useImplementationSettings";
import { Badge } from "@/components/ui/badge";

interface InfoSettingsCardProps {
  onTabChange: (tab: string) => void;
}

const InfoSettingsCard = ({ onTabChange }: InfoSettingsCardProps) => {
  const { isRealImplementation, implementationType } = useImplementationSettings();
  
  // Jika implementasi nyata sudah aktif, tampilkan konfirmasi terhubung
  if (isRealImplementation) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="h-5 w-5" />
            Implementasi Nyata Aktif
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-green-700">
              Website Anda telah terhubung dengan {implementationType === 'supabase' ? (
                <span className="font-medium">Supabase</span>
              ) : (
                <span className="font-medium">API Kustom</span>
              )}. 
              Semua perubahan disimpan secara permanen dan dapat diakses dari browser mana pun.
            </p>
            
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                className="text-green-800 border-green-300 hover:bg-green-100"
                onClick={() => onTabChange('implementation')}
              >
                Lihat Pengaturan Implementasi
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="bg-amber-50 border-amber-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-800">
          <AlertCircle className="h-5 w-5" />
          Informasi Implementasi Nyata
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-amber-700">
            Saat ini website Anda menggunakan penyimpanan <strong>lokal (localStorage)</strong> yang
            berarti perubahan hanya tersimpan di browser ini. Untuk implementasi nyata, hubungkan dengan
            <Badge variant="outline" className="mx-1 font-medium bg-blue-100 text-blue-800 border-blue-200">Supabase</Badge>
            untuk penyimpanan data yang lebih baik.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white rounded-md p-4 border border-amber-200">
              <div className="flex items-start gap-3">
                <Server className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800 mb-1">Konfigurasi Server</h4>
                  <p className="text-sm text-amber-700">
                    Aktifkan implementasi nyata untuk mengirim perubahan ke Supabase dan simpan data secara permanen.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-md p-4 border border-amber-200">
              <div className="flex items-start gap-3">
                <Database className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800 mb-1">Database</h4>
                  <p className="text-sm text-amber-700">
                    Gunakan database PostgreSQL dari Supabase untuk menyimpan data website secara aman dan terstruktur.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-md p-4 border border-amber-200 md:col-span-2">
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800 mb-1">Integrasi dengan Supabase</h4>
                  <p className="text-sm text-amber-700 mb-4">
                    Untuk implementasi nyata, website Anda akan terhubung dengan Supabase untuk penyimpanan
                    data dan pengelolaan konten yang lebih baik.
                  </p>
                  <div className="bg-gray-800 text-gray-200 p-3 rounded-md text-xs overflow-auto">
                    {`// Contoh data tersimpan di Supabase
{
  "website_content": {
    "generalInfo": { ... },
    "pages": [ ... ],
    "appearance": { ... }
  },
  "users": [ ... ],
  "publish_history": [ ... ]
}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button 
              variant="outline" 
              className="text-amber-800 border-amber-300 hover:bg-amber-100"
              onClick={() => onTabChange('implementation')}
            >
              Aktifkan Implementasi Nyata
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoSettingsCard;
