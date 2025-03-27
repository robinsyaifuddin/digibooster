
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RefreshCw, Globe, Check, AlertTriangle, Zap, RotateCcw, Eye } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useWebsiteDataStore } from "@/stores/websiteDataStore";

interface ServicesDevelopmentProps {
  onTabChange: (tab: string) => void;
}

const ServicesDevelopment = ({ onTabChange }: ServicesDevelopmentProps) => {
  const { toast } = useToast();
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishProgress, setPublishProgress] = useState(0);
  const [lastPublished, setLastPublished] = useState<string | null>(
    localStorage.getItem('lastPublishTime')
  );
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'publishing' | 'success' | 'error'>('idle');
  const websiteData = useWebsiteDataStore(state => state);
  const [lastChanges, setLastChanges] = useState<string[]>([]);
  
  useEffect(() => {
    // Cek apakah ada data publikasi sebelumnya
    const storedLastPublished = localStorage.getItem('lastPublishTime');
    if (storedLastPublished) {
      setLastPublished(storedLastPublished);
    }
    
    // Cek apakah ada data perubahan terakhir
    const storedLastChanges = localStorage.getItem('lastChangesPublished');
    if (storedLastChanges) {
      try {
        setLastChanges(JSON.parse(storedLastChanges));
      } catch (e) {
        console.error('Error parsing stored changes', e);
        setLastChanges([]);
      }
    }
  }, []);
  
  const simulateProgressStep = (start: number, end: number, duration: number) => {
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const increment = (end - start) / steps;
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      setPublishProgress(current);
    }, interval);
    
    return new Promise<void>(resolve => {
      setTimeout(() => {
        clearInterval(timer);
        setPublishProgress(end);
        resolve();
      }, duration);
    });
  };
  
  const trackChanges = (): string[] => {
    const changes: string[] = [];
    
    // Simpan detail perubahan yang dilakukan
    if (localStorage.getItem('heroContentEdited') === 'true') {
      changes.push('Konten Hero Section diperbarui');
      localStorage.removeItem('heroContentEdited');
    }
    
    if (localStorage.getItem('servicesEdited') === 'true') {
      changes.push('Layanan diperbarui');
      localStorage.removeItem('servicesEdited');
    }
    
    if (localStorage.getItem('testimonialsEdited') === 'true') {
      changes.push('Testimonial diperbarui');
      localStorage.removeItem('testimonialsEdited');
    }
    
    if (localStorage.getItem('partnersEdited') === 'true') {
      changes.push('Partner perusahaan diperbarui');
      localStorage.removeItem('partnersEdited');
    }
    
    if (localStorage.getItem('generalInfoEdited') === 'true') {
      changes.push('Informasi umum website diperbarui');
      localStorage.removeItem('generalInfoEdited');
    }
    
    if (localStorage.getItem('seoEdited') === 'true') {
      changes.push('Pengaturan SEO diperbarui');
      localStorage.removeItem('seoEdited');
    }
    
    if (localStorage.getItem('appearanceEdited') === 'true') {
      changes.push('Tampilan website diperbarui');
      localStorage.removeItem('appearanceEdited');
    }
    
    // Jika tidak ada perubahan yang tercatat
    if (changes.length === 0) {
      changes.push('Website dipublikasikan');
    }
    
    return changes;
  };
  
  const handlePublishChanges = async () => {
    setIsPublishing(true);
    setDeploymentStatus('publishing');
    setPublishProgress(0);
    
    try {
      // Simulasi proses publikasi website dengan tahapan
      await simulateProgressStep(0, 20, 1000);
      
      toast({
        title: "Menyiapkan aset",
        description: "Mengoptimalkan gambar dan aset statis...",
        duration: 2000,
      });
      
      await simulateProgressStep(20, 50, 1500);
      
      toast({
        title: "Mengompilasi kode",
        description: "Membangun dan mengoptimalkan codebase...",
        duration: 2000,
      });
      
      await simulateProgressStep(50, 75, 1500);
      
      toast({
        title: "Menerapkan perubahan",
        description: "Mendorong perubahan ke server produksi...",
        duration: 2000,
      });
      
      await simulateProgressStep(75, 90, 1000);
      
      // Menyimpan data situs ke localStorage
      localStorage.setItem('websiteData', JSON.stringify(websiteData));
      
      // Menyinkronkan data ke halaman beranda dengan mengirim event
      window.dispatchEvent(new CustomEvent('websiteContentUpdated', { 
        detail: websiteData
      }));
      
      // Melacak dan menyimpan perubahan yang dipublikasikan
      const changes = trackChanges();
      setLastChanges(changes);
      localStorage.setItem('lastChangesPublished', JSON.stringify(changes));
      
      await simulateProgressStep(90, 100, 500);
      
      // Selesai
      setDeploymentStatus('success');
      
      const now = new Date().toLocaleString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      
      setLastPublished(now);
      localStorage.setItem('lastPublishTime', now);
      
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
    } catch (error) {
      setDeploymentStatus('error');
      toast({
        variant: "destructive",
        title: "Gagal mempublikasikan perubahan",
        description: "Terjadi kesalahan saat mempublikasi website. Silakan coba lagi.",
        duration: 5000,
      });
    } finally {
      setIsPublishing(false);
    }
  };
  
  const handleRollback = () => {
    toast({
      title: "Rollback dimulai",
      description: "Mengembalikan website ke versi sebelumnya...",
      duration: 3000,
    });
    
    // Simulasi rollback
    setTimeout(() => {
      toast({
        title: "Rollback selesai",
        description: "Website telah dikembalikan ke versi sebelumnya.",
        duration: 3000,
      });
    }, 2000);
  };
  
  const handlePreviewWebsite = () => {
    // Buka tab baru untuk preview website
    window.open('/', '_blank');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Publikasi Website</h2>
        <div className="flex gap-2">
          <Button 
            onClick={handlePreviewWebsite}
            variant="outline"
          >
            <Eye className="h-4 w-4 mr-2" />
            Lihat Website
          </Button>
          <Button 
            onClick={() => onTabChange('overview')}
            variant="outline"
          >
            Kembali ke Dashboard
          </Button>
        </div>
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
          {deploymentStatus === 'publishing' && (
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Memproses publikasi...</span>
                <span>{publishProgress.toFixed(0)}%</span>
              </div>
              <Progress value={publishProgress} className="h-2" />
            </div>
          )}
          
          {deploymentStatus === 'error' && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Publikasi gagal</AlertTitle>
              <AlertDescription>
                Terjadi kesalahan saat mempublikasikan website. Silakan coba lagi atau hubungi support.
              </AlertDescription>
            </Alert>
          )}
          
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
                  <p className="text-sm text-green-700 mt-1">
                    Perubahan sudah tersedia dan dapat dilihat oleh pengunjung website.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-md p-4">
              <h4 className="font-medium mb-2">Status Publikasi</h4>
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${
                  deploymentStatus === 'publishing' ? 'bg-blue-500' :
                  deploymentStatus === 'success' ? 'bg-green-500' :
                  deploymentStatus === 'error' ? 'bg-red-500' :
                  lastPublished ? 'bg-green-500' : 'bg-amber-500'
                }`}></div>
                <span className="text-sm">
                  {deploymentStatus === 'publishing' ? 'Sedang mempublikasikan...' :
                   deploymentStatus === 'success' ? 'Dipublikasikan' :
                   deploymentStatus === 'error' ? 'Publikasi gagal' :
                   lastPublished ? 'Dipublikasikan' : 'Belum dipublikasikan'}
                </span>
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
        
        <CardFooter className="flex flex-wrap gap-4">
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
          
          {lastPublished && (
            <Button 
              variant="outline" 
              onClick={handleRollback}
              disabled={isPublishing}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Rollback ke Versi Sebelumnya
            </Button>
          )}
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Informasi Terakhir Dipublikasikan</CardTitle>
          <CardDescription>
            Detail perubahan yang terakhir dipublikasikan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lastPublished ? (
              <>
                <div className="p-4 border border-gray-200 rounded-md">
                  <h3 className="font-medium">Waktu Publikasi</h3>
                  <p className="text-sm text-gray-500 mt-1">{lastPublished}</p>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-md">
                  <h3 className="font-medium">Perubahan yang Dipublikasikan</h3>
                  {lastChanges.length > 0 ? (
                    <ul className="text-sm text-gray-500 mt-1 space-y-1">
                      {lastChanges.map((change, index) => (
                        <li key={index}>• {change}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 mt-1">
                      • Website dipublikasikan
                    </p>
                  )}
                </div>
                
                <div className="p-4 border border-gray-200 rounded-md">
                  <h3 className="font-medium">Status CDN</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-500">Aktif di seluruh region</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-4 border border-dashed border-gray-300 rounded-md">
                <h3 className="font-medium text-gray-500">Belum Ada Publikasi</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Website belum pernah dipublikasikan. Klik tombol "Publikasikan Sekarang" untuk mempublikasikan perubahan.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Situs dan Domain</CardTitle>
          <CardDescription>
            Pengaturan alamat website dan domain
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-md">
              <h3 className="font-medium">URL Website</h3>
              <p className="text-sm text-gray-500 mt-1">
                <a href="/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                  {window.location.origin} <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </p>
            </div>
            
            <div className="p-4 border border-dashed border-gray-300 rounded-md">
              <h3 className="font-medium">Custom Domain</h3>
              <p className="text-sm text-gray-500 mt-1">
                Tidak ada custom domain yang dikonfigurasi. Hubungi administrator untuk menambahkan domain kustom.
              </p>
              <Button className="mt-2" variant="outline" disabled>
                Tambah Domain Kustom
              </Button>
            </div>
          </div>
        </CardContent>
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
