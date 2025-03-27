
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const UpcomingFeaturesCard = () => {
  return (
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
  );
};

export default UpcomingFeaturesCard;
