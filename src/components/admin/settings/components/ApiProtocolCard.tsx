
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, FileCode, Network, RefreshCw, Server, Database } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ApiProtocolCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCode className="h-5 w-5 text-blue-600" />
          Dokumentasi API Supabase
        </CardTitle>
        <CardDescription>
          Informasi teknis tentang penggunaan Supabase untuk backend website
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="intro" className="space-y-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="intro">Pengenalan</TabsTrigger>
            <TabsTrigger value="tables">Struktur Tabel</TabsTrigger>
            <TabsTrigger value="code">Contoh Kode</TabsTrigger>
          </TabsList>
          
          <TabsContent value="intro" className="space-y-4">
            <div className="text-sm text-gray-700 space-y-3">
              <p>
                Supabase menyediakan backend yang komprehensif untuk website Anda dengan fitur:
              </p>
              
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium">Database PostgreSQL</span> - Penyimpanan data yang kuat dan terstruktur
                </li>
                <li>
                  <span className="font-medium">Autentikasi</span> - Sistem login/registrasi dengan pengelolaan user
                </li>
                <li>
                  <span className="font-medium">Storage</span> - Penyimpanan file dan gambar
                </li>
                <li>
                  <span className="font-medium">API RESTful</span> - Akses data via HTTP dengan otentikasi terintegrasi
                </li>
                <li>
                  <span className="font-medium">Realtime</span> - Pembaruan data secara langsung
                </li>
              </ul>
              
              <div className="flex items-start gap-2 bg-blue-50 p-3 rounded-md border border-blue-200 mt-4">
                <Server className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-800">Keuntungan Implementasi Supabase</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Dengan mengaktifkan implementasi ini, Anda mendapatkan penyimpanan data yang aman, performa
                    yang lebih baik, dan kemampuan untuk memperluas fitur website Anda dengan mudah.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tables" className="space-y-4">
            <div className="text-sm text-gray-700 space-y-3">
              <p>
                Supabase menggunakan struktur tabel berikut untuk menyimpan data website Anda:
              </p>
              
              <div className="overflow-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Tabel</th>
                      <th className="border p-2 text-left">Deskripsi</th>
                      <th className="border p-2 text-left">Kolom Utama</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2 font-medium">website_content</td>
                      <td className="border p-2">Konten umum website</td>
                      <td className="border p-2"><code>id, name, content, updated_at</code></td>
                    </tr>
                    <tr>
                      <td className="border p-2 font-medium">pages</td>
                      <td className="border p-2">Halaman individual</td>
                      <td className="border p-2"><code>id, title, slug, content, published</code></td>
                    </tr>
                    <tr>
                      <td className="border p-2 font-medium">publish_history</td>
                      <td className="border p-2">Riwayat publikasi</td>
                      <td className="border p-2"><code>id, published_at, changes</code></td>
                    </tr>
                    <tr>
                      <td className="border p-2 font-medium">profiles</td>
                      <td className="border p-2">Profil pengguna</td>
                      <td className="border p-2"><code>id, name, avatar_url, role</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="flex items-start gap-2 bg-blue-50 p-3 rounded-md border border-blue-200 mt-4">
                <Database className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-800">Row-Level Security (RLS)</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Semua tabel dilindungi dengan kebijakan keamanan tingkat baris untuk memastikan
                    hanya user dengan izin yang sesuai yang dapat mengakses atau mengubah data.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="code" className="space-y-4">
            <div className="text-sm text-gray-700 space-y-4">
              <p>
                Berikut adalah contoh penggunaan Supabase dalam kode React:
              </p>
              
              <div className="bg-gray-800 text-gray-200 p-4 rounded-md text-xs overflow-auto">
                <pre>{`// Contoh mengambil data website
import { supabase } from '@/integrations/supabase/client';

async function getWebsiteData() {
  const { data, error } = await supabase
    .from('website_content')
    .select('content')
    .eq('name', 'main')
    .single();
    
  if (error) {
    console.error('Error:', error);
    return null;
  }
  
  return data.content;
}

// Contoh menyimpan perubahan
async function saveWebsiteChanges(websiteData) {
  const { error } = await supabase
    .from('website_content')
    .upsert({
      name: 'main',
      content: websiteData
    }, {
      onConflict: 'name'
    });
    
  if (error) {
    throw new Error(\`Gagal menyimpan perubahan: \${error.message}\`);
  }
  
  return { success: true };
}`}</pre>
              </div>
              
              <div className="flex items-start gap-2 bg-blue-50 p-3 rounded-md border border-blue-200">
                <Code className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-800">Integrasi dalam Aplikasi</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Kode di aplikasi Anda sudah siap untuk bekerja dengan Supabase setelah implementasi nyata diaktifkan.
                    Semua interaksi dengan localStorage akan diganti dengan panggilan Supabase.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-start gap-2">
            <RefreshCw className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <h4 className="font-medium">Sinkronisasi Data</h4>
              <p className="text-sm text-gray-600 mt-1">
                Setelah mengaktifkan implementasi nyata, data lokal Anda akan otomatis disinkronkan ke Supabase.
                Proses ini aman dan tidak akan menghapus data Anda yang ada.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiProtocolCard;
