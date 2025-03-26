
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  useEffect(() => {
    document.title = "404 - Halaman Tidak Ditemukan | DigiBooster";
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="text-9xl font-bold text-diginavy opacity-10">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl font-bold text-diginavy">404</div>
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Ups! Halaman Tidak Ditemukan</h1>
        <p className="text-gray-600 mb-8">
          Halaman yang Anda cari mungkin telah dihapus, dipindahkan, atau tidak pernah ada.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/">
            <Button className="bg-diginavy text-white hover:bg-diginavy-800 w-full sm:w-auto">
              <Home className="mr-2 h-4 w-4" /> Kembali ke Beranda
            </Button>
          </Link>
          <Button 
            variant="outline" 
            className="border-diginavy text-diginavy w-full sm:w-auto"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Halaman Sebelumnya
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
