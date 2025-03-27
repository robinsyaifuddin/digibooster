
import { useToast } from "@/hooks/use-toast";
import { useImplementationSettings } from "./useImplementationSettings";

export const usePublishApi = () => {
  const { toast } = useToast();
  const { isRealImplementation, getSettings } = useImplementationSettings();
  
  const publishToApi = async (data: any) => {
    if (!isRealImplementation) {
      return { success: true, simulation: true };
    }
    
    try {
      const { apiUrl, apiKey } = getSettings();
      
      if (!apiUrl || !apiKey) {
        throw new Error('API URL atau API Key tidak ditemukan. Periksa pengaturan implementasi.');
      }
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal mengirim data ke server');
      }
      
      const publishResult = await response.json();
      console.log('Publish result:', publishResult);
      
      return { success: true, data: publishResult };
    } catch (apiError) {
      console.error('Error publishing to API:', apiError);
      toast({
        variant: "destructive",
        title: "Gagal menghubungi server",
        description: apiError.message || "Tidak dapat mengirim perubahan ke server. Periksa koneksi internet dan pengaturan API Anda.",
        duration: 5000,
      });
      throw new Error('API error');
    }
  };
  
  const rollbackOnApi = async () => {
    if (!isRealImplementation) {
      return { success: true, simulation: true };
    }
    
    try {
      const { apiUrl, apiKey } = getSettings();
      
      const response = await fetch(`${apiUrl}/rollback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Gagal melakukan rollback di server');
      }
      
      const data = await response.json();
      console.log('Rollback result:', data);
      
      return { success: true, data };
    } catch (error) {
      console.error('Error during API rollback:', error);
      toast({
        variant: "destructive",
        title: "Error saat rollback via API",
        description: error.message,
        duration: 5000,
      });
      throw error;
    }
  };
  
  return {
    publishToApi,
    rollbackOnApi,
    isRealImplementation
  };
};
