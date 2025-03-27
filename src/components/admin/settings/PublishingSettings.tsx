
import React from 'react';
import ServicesDevelopment from '../Dashboard/ServicesDevelopment';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, FileWarning, Database, Lock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface PublishingSettingsProps {
  onTabChange: (tab: string) => void;
}

const PublishingSettings: React.FC<PublishingSettingsProps> = ({ onTabChange }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const isEnhancedSecurity = user?.securityLevel === 'enhanced' || user?.securityLevel === 'maximum';
  const isMaximumSecurity = user?.securityLevel === 'maximum';
  
  const handleSecurityInfo = () => {
    toast({
      title: "Keamanan Penerbitan",
      description: "Level keamanan penerbitan tergantung dari pengaturan keamanan akun Anda",
    });
  };
  
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
          <div className="flex items-center space-x-4 mb-4">
            <div className="font-medium text-sm">Level Keamanan Penerbitan: </div>
            <div 
              onClick={handleSecurityInfo}
              className="cursor-help flex items-center space-x-1.5"
            >
              {isMaximumSecurity ? (
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs flex items-center">
                  <Lock className="h-3 w-3 mr-1" />
                  Maksimum
                </span>
              ) : isEnhancedSecurity ? (
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs flex items-center">
                  <Shield className="h-3 w-3 mr-1" />
                  Ditingkatkan
                </span>
              ) : (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center">
                  <Shield className="h-3 w-3 mr-1" />
                  Standar
                </span>
              )}
            </div>
          </div>
        
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
          
          {isEnhancedSecurity && (
            <div className="mt-4 space-y-3">
              <h3 className="font-medium text-sm">Fitur Keamanan Tambahan</h3>
              
              <div className="border border-green-200 bg-green-50 rounded-md p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="space-y-2">
                    <h4 className="font-medium">Proteksi Penerbitan Aktif</h4>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-700">
                        Dengan level keamanan {isMaximumSecurity ? "Maksimum" : "Ditingkatkan"}, 
                        Anda mendapatkan fitur keamanan tambahan berikut:
                      </p>
                      
                      <ul className="text-sm text-gray-600 pl-5 list-disc space-y-1">
                        <li>Verifikasi integritas data sebelum penerbitan</li>
                        <li>Enkripsi end-to-end untuk data sensitif</li>
                        <li>Pemindaian otomatis untuk konten berbahaya</li>
                        {isMaximumSecurity && (
                          <>
                            <li>Versioning canggih dengan riwayat perubahan</li>
                            <li>Deteksi anomali pada pola penerbitan</li>
                            <li>Backup terenkripsi di cloud</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="border-t border-gray-200 pt-4 mt-2">
            <div className="flex items-center gap-2 text-amber-800">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">Praktik Terbaik Keamanan Penerbitan</span>
            </div>
            <ul className="mt-2 space-y-1 text-sm text-gray-600 pl-6 list-disc">
              <li>Selalu buat cadangan manual sebelum melakukan perubahan besar</li>
              <li>Gunakan kata sandi yang kuat untuk akun admin</li>
              <li>Jangan bagikan akses dashboard admin kepada pihak yang tidak berwenang</li>
              <li>Periksa kembali semua perubahan sebelum menerbitkan</li>
              <li>Atur jadwal penerbitan pada waktu traffic rendah</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublishingSettings;
