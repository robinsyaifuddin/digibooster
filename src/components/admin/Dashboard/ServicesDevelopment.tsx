
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw, Globe, Check, AlertTriangle } from "lucide-react";

interface ServicesDevelopmentProps {
  onTabChange: (tab: string) => void;
}

const ServicesDevelopment = ({ onTabChange }: ServicesDevelopmentProps) => {
  const { toast } = useToast();
  const [isPublishing, setIsPublishing] = useState(false);
  const [lastPublished, setLastPublished] = useState<string | null>(null);
  
  const handlePublishChanges = () => {
    setIsPublishing(true);
    
    // Simulasi proses publikasi website
    setTimeout(() => {
      setIsPublishing(false);
      const now = new Date().toLocaleString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setLastPublished(now);
      
      // Tampilkan pesan toast berhasil
      toast({
        title: "Website berhasil dipublikasikan",
        description: `Semua perubahan telah live dan dapat dilihat oleh publik pada ${now}`,
        duration: 5000,
      });
      
      // Simulasi pembaruan cache dan CDN
      setTimeout(() => {
        toast({
          title: "Pembaruan CDN selesai",
          description: "Perubahan telah didistribusikan ke semua server CDN",
          duration: 3000,
        });
      }, 2000);
    }, 3000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Publikasi Website</h2>
        <Button 
          onClick={() => onTabChange('overview')}
          variant="outline"
        >
          Kembali ke Dashboard
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Publikasi Real-Time Website
          </CardTitle>
          <CardDescription>
            Publikasikan perubahan website agar dapat dilihat secara real-time oleh pengguna publik
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
            <div className="flex gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800">Perhatian Publikasi</h4>
                <p className="text-sm text-amber-700 mt-1">
                  Publikasi akan mengupdate semua perubahan yang telah Anda simpan di dashboard admin dan membuatnya terlihat oleh pengguna publik.
                  Pastikan semua perubahan telah Anda review dengan baik sebelum dipublikasikan.
                </p>
              </div>
            </div>
          </div>
          
          {lastPublished && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800">Website Live</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Publikasi terakhir: {lastPublished}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-md p-4">
              <h4 className="font-medium mb-2">Status Publikasi</h4>
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${lastPublished ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                <span className="text-sm">{lastPublished ? 'Dipublikasikan' : 'Belum dipublikasikan'}</span>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-4">
              <h4 className="font-medium mb-2">Waktu Propagasi</h4>
              <p className="text-sm text-gray-500">
                Perubahan akan tersedia di seluruh dunia dalam waktu ~30 detik setelah dipublikasikan.
              </p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex gap-4">
          <Button 
            onClick={handlePublishChanges}
            disabled={isPublishing}
            className="bg-green-600 hover:bg-green-700"
          >
            {isPublishing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Mempublikasikan...
              </>
            ) : (
              <>
                <Globe className="mr-2 h-4 w-4" />
                Publikasikan Sekarang
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Layanan Dalam Pengembangan</CardTitle>
          <CardDescription>
            Fitur dan layanan yang akan segera tersedia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-dashed border-gray-300 rounded-md">
              <h3 className="font-medium">Publikasi Terjadwal</h3>
              <p className="text-sm text-gray-500 mt-1">
                Jadwalkan publikasi perubahan website pada waktu tertentu yang Anda inginkan.
              </p>
              <div className="mt-2 inline-flex items-center text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                Segera Hadir
              </div>
            </div>
            
            <div className="p-4 border border-dashed border-gray-300 rounded-md">
              <h3 className="font-medium">Preview Website</h3>
              <p className="text-sm text-gray-500 mt-1">
                Lihat pratinjau perubahan website sebelum dipublikasikan.
              </p>
              <div className="mt-2 inline-flex items-center text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                Segera Hadir
              </div>
            </div>
            
            <div className="p-4 border border-dashed border-gray-300 rounded-md">
              <h3 className="font-medium">Rollback Otomatis</h3>
              <p className="text-sm text-gray-500 mt-1">
                Kembalikan otomatis ke versi sebelumnya jika terjadi error setelah publikasi.
              </p>
              <div className="mt-2 inline-flex items-center text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                Segera Hadir
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicesDevelopment;
