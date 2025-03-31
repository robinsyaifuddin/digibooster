
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

type ImplementationType = 'supabase' | 'custom';

interface CustomApiConfig {
  apiUrl: string;
  apiKey?: string;
  databaseType?: string;
  backendType?: string;
  serverProvider?: string;
}

export const useImplementationSettings = () => {
  const [isRealImplementation, setIsRealImplementation] = useState<boolean>(false);
  const [implementationType, setImplementationType] = useState<ImplementationType>('supabase');
  
  useEffect(() => {
    // Periksa apakah implementasi nyata sudah diaktifkan
    const checkImplementation = () => {
      const implementation = localStorage.getItem('implementation_mode');
      const type = localStorage.getItem('implementation_type') as ImplementationType | null;
      
      setIsRealImplementation(implementation === 'real');
      setImplementationType(type || 'supabase');
    };
    
    checkImplementation();
    
    // Atur event listener untuk mendeteksi perubahan di localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'implementation_mode' || e.key === 'implementation_type') {
        checkImplementation();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  // Verifikasi koneksi ke Supabase
  const verifySupabaseConnection = async () => {
    try {
      const { data, error } = await supabase.from('website_content').select('id').limit(1);
      
      if (error) {
        return {
          success: false,
          error: error.message
        };
      }
      
      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  };
  
  // Inisialisasi data website di Supabase
  const initializeSupabaseData = async (websiteData: any) => {
    try {
      // Periksa apakah data sudah ada
      const { data: existingData, error: checkError } = await supabase
        .from('website_content')
        .select('id')
        .eq('name', 'main')
        .maybeSingle();
      
      if (checkError && checkError.code !== 'PGRST116') {
        return {
          success: false,
          error: checkError
        };
      }
      
      // Jika data sudah ada, update
      if (existingData) {
        const { error: updateError } = await supabase
          .from('website_content')
          .update({ content: websiteData })
          .eq('name', 'main');
        
        if (updateError) {
          return {
            success: false,
            error: updateError
          };
        }
      } else {
        // Jika data belum ada, insert baru
        const { error: insertError } = await supabase
          .from('website_content')
          .insert({ name: 'main', content: websiteData });
        
        if (insertError) {
          return {
            success: false,
            error: insertError
          };
        }
      }
      
      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error
      };
    }
  };
  
  // Verifikasi koneksi ke API kustom
  const verifyCustomApiConnection = async (apiUrl: string, apiKey?: string) => {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      
      if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`;
      }
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers
      });
      
      if (!response.ok) {
        return {
          success: false,
          error: `API merespon dengan status: ${response.status}`
        };
      }
      
      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  };
  
  // Aktivasi implementasi nyata
  const activateRealImplementation = () => {
    try {
      localStorage.setItem('implementation_mode', 'real');
      localStorage.setItem('implementation_type', 'supabase');
      setIsRealImplementation(true);
      setImplementationType('supabase');
      return true;
    } catch (error) {
      console.error('Error activating real implementation:', error);
      return false;
    }
  };
  
  // Aktivasi implementasi kustom
  const activateCustomImplementation = (config: CustomApiConfig) => {
    try {
      localStorage.setItem('implementation_mode', 'real');
      localStorage.setItem('implementation_type', 'custom');
      localStorage.setItem('implementation_apiUrl', config.apiUrl);
      
      if (config.apiKey) {
        localStorage.setItem('implementation_apiKey', config.apiKey);
      }
      
      if (config.databaseType) {
        localStorage.setItem('implementation_databaseType', config.databaseType);
      }
      
      if (config.backendType) {
        localStorage.setItem('implementation_backendType', config.backendType);
      }
      
      if (config.serverProvider) {
        localStorage.setItem('implementation_serverProvider', config.serverProvider);
      }
      
      setIsRealImplementation(true);
      setImplementationType('custom');
      
      return true;
    } catch (error) {
      console.error('Error activating custom implementation:', error);
      return false;
    }
  };
  
  // Nonaktifkan implementasi nyata (kembali ke mode simulasi)
  const deactivateRealImplementation = () => {
    try {
      localStorage.removeItem('implementation_mode');
      localStorage.removeItem('implementation_type');
      localStorage.removeItem('implementation_apiUrl');
      localStorage.removeItem('implementation_apiKey');
      localStorage.removeItem('implementation_databaseType');
      localStorage.removeItem('implementation_backendType');
      localStorage.removeItem('implementation_serverProvider');
      
      setIsRealImplementation(false);
      setImplementationType('supabase');
      
      return true;
    } catch (error) {
      console.error('Error deactivating real implementation:', error);
      return false;
    }
  };
  
  return {
    isRealImplementation,
    implementationType,
    verifySupabaseConnection,
    initializeSupabaseData,
    verifyCustomApiConnection,
    activateRealImplementation,
    activateCustomImplementation,
    deactivateRealImplementation
  };
};
