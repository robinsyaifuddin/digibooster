
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Server, Database, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useImplementationSettings } from "@/hooks/useImplementationSettings";

interface InfoSettingsCardProps {
  onTabChange: (tab: string) => void;
}

const InfoSettingsCard = ({ onTabChange }: InfoSettingsCardProps) => {
  const { isRealImplementation, implementationType } = useImplementationSettings();
  
  // Jika implementasi nyata sudah aktif, jangan tampilkan card ini
  if (isRealImplementation) {
    return null;
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
            berarti perubahan hanya tersimpan di browser ini. Untuk implementasi nyata, Anda perlu:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white rounded-md p-4 border border-amber-200">
              <div className="flex items-start gap-3">
                <Server className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800 mb-1">Konfigurasi Server</h4>
                  <p className="text-sm text-amber-700">
                    Perubahan perlu dikirim ke server hosting melalui API untuk penyimpanan permanen dan ditampilkan ke publik.
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
                    Gunakan database seperti MySQL, PostgreSQL, atau MongoDB untuk menyimpan data website secara permanen.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-md p-4 border border-amber-200 md:col-span-2">
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800 mb-1">Integrasi dengan API</h4>
                  <p className="text-sm text-amber-700 mb-4">
                    Untuk implementasi nyata, kode perlu memanggil API yang terhubung ke server dan database.
                    Berikut contoh kode implementasi di <code>usePublish.ts</code>:
                  </p>
                  <pre className="bg-gray-800 text-gray-200 p-3 rounded-md text-xs overflow-auto">
{`// Contoh panggilan API nyata
const response = await fetch('https://api.yourdomain.com/publish', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    websiteData,
    pageEdits
  })
});

if (!response.ok) {
  throw new Error('Gagal mengirim data ke server');
}

const publishResult = await response.json();`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button 
              variant="outline" 
              className="text-amber-800 border-amber-300 hover:bg-amber-100"
              onClick={() => onTabChange('settings')}
            >
              Lihat Pengaturan Website
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoSettingsCard;
