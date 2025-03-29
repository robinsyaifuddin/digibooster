
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Code } from 'lucide-react';

const ApiProtocolCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5 text-blue-600" />
          Spesifikasi API Protokol
        </CardTitle>
        <CardDescription>
          Dokumentasi endpoint API yang diperlukan untuk implementasi kustom.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm">
          <p className="mb-4">
            Implementasi kustom memerlukan server API dengan endpoint tertentu. API Anda harus menyediakan endpoint berikut:
          </p>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Endpoint</TableHead>
                <TableHead>Metode</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono text-xs">/health</TableCell>
                <TableCell>GET</TableCell>
                <TableCell>Memeriksa status API</TableCell>
                <TableCell><Badge variant="outline" className="bg-green-100 text-green-800">Wajib</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-xs">/website/save</TableCell>
                <TableCell>POST</TableCell>
                <TableCell>Menyimpan data website</TableCell>
                <TableCell><Badge variant="outline" className="bg-green-100 text-green-800">Wajib</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-xs">/website/get</TableCell>
                <TableCell>GET</TableCell>
                <TableCell>Mengambil data website</TableCell>
                <TableCell><Badge variant="outline" className="bg-green-100 text-green-800">Wajib</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-xs">/website/rollback</TableCell>
                <TableCell>POST</TableCell>
                <TableCell>Mengembalikan ke versi sebelumnya</TableCell>
                <TableCell><Badge variant="outline" className="bg-amber-100 text-amber-800">Opsional</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-xs">/auth/login</TableCell>
                <TableCell>POST</TableCell>
                <TableCell>Autentikasi pengguna</TableCell>
                <TableCell><Badge variant="outline" className="bg-amber-100 text-amber-800">Opsional</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          
          <div className="mt-6 space-y-4">
            <div>
              <h4 className="font-medium mb-2">Format Request</h4>
              <div className="bg-gray-100 p-3 rounded-md">
                <pre className="text-xs overflow-auto">
{`// POST /website/save
{
  "websiteContent": {
    "generalInfo": { ... },
    "appearance": { ... },
    "seo": { ... },
    "homeContent": { ... },
    "pages": [ ... ]
  },
  "pageEdits": {
    "page-id-1": { ... },
    "page-id-2": { ... }
  },
  "userId": "user-id",
  "timestamp": "2023-01-01T00:00:00Z"
}`}
                </pre>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Format Response</h4>
              <div className="bg-gray-100 p-3 rounded-md">
                <pre className="text-xs overflow-auto">
{`// Successful response
{
  "success": true,
  "message": "Data berhasil disimpan",
  "timestamp": "2023-01-01T00:00:00Z"
}

// Error response
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Pesan error"
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiProtocolCard;
