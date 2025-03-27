
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PublishInfoCardProps {
  lastPublished: string | null;
  lastChanges: string[];
}

const PublishInfoCard = ({ lastPublished, lastChanges }: PublishInfoCardProps) => {
  return (
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
  );
};

export default PublishInfoCard;
