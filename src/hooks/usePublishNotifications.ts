
import { useToast } from "@/hooks/use-toast";

export const usePublishNotifications = () => {
  const { toast } = useToast();
  
  const notifyPublishStarted = () => {
    toast({
      title: "Publikasi dimulai",
      description: "Sedang mempublikasikan perubahan website Anda...",
    });
  };
  
  const notifyDataSending = () => {
    toast({
      title: "Mengirim data",
      description: "Mengirim data website ke server...",
    });
  };
  
  const notifySimulationMode = () => {
    toast({
      title: "Mode Simulasi",
      description: "Website berjalan dalam mode simulasi. Perubahan hanya tersimpan secara lokal.",
    });
  };
  
  const notifyPublishSuccess = (publishTime: string) => {
    toast({
      title: "Publikasi berhasil",
      description: `Website berhasil dipublikasikan pada ${new Date(publishTime).toLocaleTimeString('id-ID')}`,
    });
  };
  
  const notifyPublishError = (error: any) => {
    toast({
      variant: "destructive",
      title: "Publikasi gagal",
      description: error.message || "Terjadi kesalahan saat mempublikasikan website",
    });
  };
  
  const notifyRollbackStarted = () => {
    toast({
      title: "Rollback dimulai",
      description: "Sedang mengembalikan website ke versi sebelumnya...",
    });
  };
  
  const notifyRollbackSuccess = () => {
    toast({
      title: "Rollback berhasil",
      description: "Website telah dikembalikan ke versi sebelumnya",
    });
  };
  
  const notifyRollbackFailed = (message?: string) => {
    toast({
      variant: "destructive",
      title: "Rollback gagal",
      description: message || "Terjadi kesalahan saat mengembalikan website ke versi sebelumnya",
    });
  };
  
  const notifyNoBackupAvailable = () => {
    toast({
      variant: "destructive",
      title: "Tidak ada backup",
      description: "Tidak ada versi sebelumnya yang tersedia untuk dikembalikan",
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
