
import { useToast } from "@/hooks/use-toast";
import { useImplementationSettings } from "./useImplementationSettings";

export const usePublishNotifications = () => {
  const { toast } = useToast();
  const { isRealImplementation } = useImplementationSettings();
  
  const notifyPublishStarted = () => {
    toast({
      title: "Menyiapkan aset",
      description: "Mengoptimalkan gambar dan aset statis...",
      duration: 2000,
    });
  };
  
  const notifyDataSending = () => {
    toast({
      title: "Mengirim data ke server",
      description: "Menyinkronkan perubahan dengan server produksi...",
      duration: 2000,
    });
  };
  
  const notifySimulationMode = () => {
    toast({
      title: "Mode Simulasi",
      description: "Perubahan disimpan dalam localStorage browser (mode simulasi).",
      duration: 2000,
    });
  };
  
  const notifyPublishSuccess = (publishTime: string) => {
    toast({
      title: "Website berhasil dipublikasikan",
      description: `Semua perubahan telah ${isRealImplementation ? 'tersimpan di database dan' : ''} dapat dilihat oleh publik pada ${publishTime}`,
      duration: 5000,
    });
    
    // Tampilkan informasi implementasi jika masih dalam mode simulasi
    if (!isRealImplementation) {
      setTimeout(() => {
        toast({
          title: "Catatan implementasi nyata",
          description: "Untuk implementasi nyata, Anda perlu mengonfigurasi API dan database server melalui pengaturan Implementasi Nyata.",
          duration: 8000,
        });
      }, 1000);
    }
  };
  
  const notifyPublishError = (error: Error) => {
    toast({
      variant: "destructive",
      title: "Gagal mempublikasikan perubahan",
      description: error.message || "Terjadi kesalahan saat mempublikasi website. Silakan coba lagi.",
      duration: 5000,
    });
  };
  
  const notifyRollbackStarted = () => {
    toast({
      title: "Rollback dimulai",
      description: "Mengembalikan website ke versi sebelumnya...",
      duration: 3000,
    });
  };
  
  const notifyRollbackSuccess = () => {
    toast({
      title: "Rollback selesai",
      description: "Website telah dikembalikan ke versi sebelumnya.",
      duration: 3000,
    });
  };
  
  const notifyRollbackFailed = (reason: string = "") => {
    toast({
      variant: "destructive",
      title: "Rollback gagal",
      description: reason || "Terjadi kesalahan saat mengembalikan versi website. Silakan coba lagi.",
      duration: 5000,
    });
  };
  
  const notifyNoBackupAvailable = () => {
    toast({
      variant: "destructive",
      title: "Rollback gagal",
      description: "Tidak ada versi backup yang tersedia untuk dikembalikan.",
      duration: 5000,
    });
  };
  
  return {
    notifyPublishStarted,
    notifyDataSending,
    notifySimulationMode,
    notifyPublishSuccess,
    notifyPublishError,
    notifyRollbackStarted,
    notifyRollbackSuccess,
    notifyRollbackFailed,
    notifyNoBackupAvailable
  };
};
