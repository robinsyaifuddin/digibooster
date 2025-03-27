
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const DomainCard = () => {
  return (
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
  );
};

export default DomainCard;
