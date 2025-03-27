
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface PublishStatusCardProps {
  deploymentStatus: 'idle' | 'publishing' | 'success' | 'error';
  lastPublished: string | null;
}

const PublishStatusCard = ({ 
  deploymentStatus, 
  lastPublished 
}: PublishStatusCardProps) => {
  return (
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
  );
};

export default PublishStatusCard;
