
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Check } from "lucide-react";

interface PublishStatusProps {
  deploymentStatus: 'idle' | 'publishing' | 'success' | 'error';
  publishProgress: number;
  lastPublished: string | null;
}

const PublishStatus = ({ 
  deploymentStatus, 
  publishProgress, 
  lastPublished 
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
    </>
  );
};

export default PublishStatus;
