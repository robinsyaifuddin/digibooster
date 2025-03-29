
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Code, AlertTriangle, Server, Zap, BookOpen, Lock } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

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
      <CardContent className="space-y-6">
        <div className="text-sm">
          <Alert variant="warning" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Pastikan server API Anda dapat diakses secara publik dan mendukung operasi RESTful standar.
            </AlertDescription>
          </Alert>
          
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
          
          <div className="mt-6 space-y-6">
            <div>
              <h4 className="font-medium mb-2 text-blue-700 flex items-center gap-1">
                <Server className="h-4 w-4" /> Format Request
              </h4>
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
              <h4 className="font-medium mb-2 text-blue-700 flex items-center gap-1">
                <Zap className="h-4 w-4" /> Format Response
              </h4>
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

            <div>
              <h4 className="font-medium mb-2 text-blue-700 flex items-center gap-1">
                <BookOpen className="h-4 w-4" /> Endpoint /health
              </h4>
              <p className="text-sm mb-2">
                Endpoint ini digunakan untuk memeriksa ketersediaan API. Harus mengembalikan status health check dan versi API.
              </p>
              <div className="bg-gray-100 p-3 rounded-md">
                <pre className="text-xs overflow-auto">
{`// GET /health
// Response:
{
  "success": true,
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2023-01-01T00:00:00Z"
}`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-blue-700 flex items-center gap-1">
                <BookOpen className="h-4 w-4" /> Endpoint /website/get
              </h4>
              <p className="text-sm mb-2">
                Mengambil data website lengkap dari database. Opsional dapat menerima parameter versi.
              </p>
              <div className="bg-gray-100 p-3 rounded-md">
                <pre className="text-xs overflow-auto">
{`// GET /website/get
// Response:
{
  "success": true,
  "data": {
    "generalInfo": { ... },
    "appearance": { ... },
    "seo": { ... },
    "homeContent": { ... },
    "pages": [ ... ]
  },
  "version": "current",
  "timestamp": "2023-01-01T00:00:00Z"
}`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-blue-700 flex items-center gap-1">
                <BookOpen className="h-4 w-4" /> Endpoint /website/rollback
              </h4>
              <p className="text-sm mb-2">
                Mengembalikan ke versi website sebelumnya. Harus mengembalikan data website versi sebelumnya.
              </p>
              <div className="bg-gray-100 p-3 rounded-md">
                <pre className="text-xs overflow-auto">
{`// POST /website/rollback
// Request:
{
  "userId": "user-id",
  "timestamp": "2023-01-01T00:00:00Z"
}

// Response:
{
  "success": true,
  "data": {
    // Data website versi sebelumnya
  },
  "version": "previous",
  "timestamp": "2023-01-01T00:00:00Z"
}`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-blue-700 flex items-center gap-1">
                <Lock className="h-4 w-4" /> Keamanan API
              </h4>
              <p className="text-sm mb-2">
                Rekomendasi untuk mengamankan API Anda:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                <li>Gunakan HTTPS untuk semua komunikasi API</li>
                <li>Implementasikan autentikasi dengan API key atau JWT token</li>
                <li>Tambahkan rate limiting untuk mencegah penyalahgunaan</li>
                <li>Validasi semua input yang diterima dari klien</li>
                <li>Implementasikan logging untuk aktivitas API</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiProtocolCard;
