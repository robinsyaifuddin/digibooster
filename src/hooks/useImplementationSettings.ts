
// Create this file if it doesn't exist, or update it if it does
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SupabaseDataResult {
  success: boolean;
  error: any | null;  // Make sure error is always present but can be null
}

export interface CustomImplementationConfig {
  apiUrl: string;
  apiKey: string;
  databaseType: string;
  backendType: string;
  serverProvider: string;
}

export const useImplementationSettings = () => {
  const [isRealImplementation, setIsRealImplementation] = useState<boolean>(() => {
    const stored = localStorage.getItem('realImplementation');
    return stored ? JSON.parse(stored) : false;
  });
  
  const [implementationType, setImplementationType] = useState<'supabase' | 'custom'>(() => {
    const stored = localStorage.getItem('implementationType');
    return (stored as 'supabase' | 'custom') || 'supabase';
  });

  const activateRealImplementation = (): boolean => {
    try {
      localStorage.setItem('realImplementation', 'true');
      localStorage.setItem('implementationType', 'supabase');
      setIsRealImplementation(true);
      setImplementationType('supabase');
      return true;
    } catch (error) {
      console.error('Failed to activate real implementation:', error);
      return false;
    }
  };
  
  const activateCustomImplementation = (config: CustomImplementationConfig): boolean => {
    try {
      localStorage.setItem('realImplementation', 'true');
      localStorage.setItem('implementationType', 'custom');
      localStorage.setItem('customApiConfig', JSON.stringify(config));
      setIsRealImplementation(true);
      setImplementationType('custom');
      return true;
    } catch (error) {
      console.error('Failed to activate custom implementation:', error);
      return false;
    }
  };

  const verifySupabaseConnection = async (): Promise<{ success: boolean; error: string | null }> => {
    try {
      const { data, error } = await supabase.from('website_content').select('id').limit(1);
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: error.message || 'Unknown error' };
    }
  };
  
  const verifyCustomApiConnection = async (apiUrl: string, apiKey: string): Promise<{ success: boolean; error: string | null }> => {
    try {
      // Simulate an API connection check
      if (!apiUrl) {
        return { success: false, error: 'API URL is required' };
      }
      
      // In a real implementation, we would actually try to connect to the API
      // For now, just check if it's a valid URL
      try {
        new URL(apiUrl);
      } catch (e) {
        return { success: false, error: 'Invalid API URL format' };
      }
      
      // Simulate a successful connection for demo purposes
      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: error.message || 'Unknown error' };
    }
  };
  
  const initializeSupabaseData = async (data: any): Promise<SupabaseDataResult> => {
    try {
      // If the data already exists, don't override it
      const { data: existingData, error: checkError } = await supabase
        .from('website_content')
        .select('id')
        .eq('name', 'main')
        .limit(1);
      
      if (checkError) {
        return { success: false, error: checkError };
      }
      
      if (existingData && existingData.length > 0) {
        // Data already exists, don't override
        return { success: true, error: null };
      }
      
      // Insert initial data
      const { error: insertError } = await supabase
        .from('website_content')
        .insert({ name: 'main', content: data });
      
      if (insertError) {
        return { success: false, error: insertError };
      }
      
      return { success: true, error: null };
    } catch (error) {
      return { success: false, error };
    }
  };

  const getSettings = (): CustomImplementationConfig => {
    try {
      const configString = localStorage.getItem('customApiConfig');
      if (configString) {
        return JSON.parse(configString);
      }
      return {
        apiUrl: '',
        apiKey: '',
        databaseType: 'mysql',
        backendType: 'php',
        serverProvider: ''
      };
    } catch (error) {
      console.error('Failed to get custom API settings:', error);
      return {
        apiUrl: '',
        apiKey: '',
        databaseType: 'mysql',
        backendType: 'php',
        serverProvider: ''
      };
    }
  };

  return {
    isRealImplementation,
    implementationType,
    activateRealImplementation,
    activateCustomImplementation,
    verifySupabaseConnection,
    verifyCustomApiConnection,
    initializeSupabaseData,
    getSettings
  };
};
