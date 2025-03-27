
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Check, Database } from "lucide-react";

interface PublishStatusProps {
  deploymentStatus: 'idle' | 'publishing' | 'success' | 'error';
  publishProgress: number;
  lastPublished: string | null;
  isRealImplementation?: boolean;
}

const PublishStatus = ({ 
  deploymentStatus, 
  publishProgress, 
  lastPublished,
  isRealImplementation = false
}: PublishStatusProps) => {
  return (
    <>
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
              {isRealImplementation 
                ? " Perubahan akan disimpan di database dan diterapkan ke server website."
                : " Saat ini dalam mode simulasi menggunakan localStorage browser."}
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
                Perubahan sudah tersedia dan dapat dilihat oleh pengunjung website
                {isRealImplementation && " melalui database dan server nyata"}.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {isRealImplementation && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex gap-2">
            <Database className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800">Implementasi Nyata Aktif</h4>
              <p className="text-sm text-blue-700 mt-1">
                Website Anda telah terhubung dengan database dan API nyata. Semua perubahan akan disimpan secara permanen.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PublishStatus;
