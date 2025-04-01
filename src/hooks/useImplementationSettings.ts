
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { WebsiteData } from '@/types/websiteTypes';
import { Json } from '@/integrations/supabase/types';

// Define explicit return type for initializeSupabaseData
export interface SupabaseDataResult {
  success: boolean;
  error?: any;
}

// Define CustomApiSettings interface
interface CustomApiSettings {
  apiUrl: string;
  apiKey: string;
  databaseType: string;
  backendType: string;
  serverProvider: string;
}

// Define connection result type
interface ConnectionResult {
  success: boolean;
  error?: string;
}

export const useImplementationSettings = () => {
  const [isRealImplementation, setIsRealImplementation] = useState<boolean>(false);
  const [implementationType, setImplementationType] = useState<'supabase' | 'custom'>('supabase');
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [lastVerified, setLastVerified] = useState<Date | null>(null);
  const [settings, setSettings] = useState<Record<string, any>>({});

  // Load settings from localStorage on component mount
  useEffect(() => {
    const storedSetting = localStorage.getItem('implementation-setting');
    if (storedSetting) {
      setIsRealImplementation(storedSetting === 'real');
    }
    
    const storedType = localStorage.getItem('implementation-type');
    if (storedType && (storedType === 'supabase' || storedType === 'custom')) {
      setImplementationType(storedType as 'supabase' | 'custom');
    }
    
    const storedSettings = localStorage.getItem('implementation-settings');
    if (storedSettings) {
      try {
        setSettings(JSON.parse(storedSettings));
      } catch (e) {
        console.error('Failed to parse implementation settings', e);
      }
    }
  }, []);

  // Update localStorage when setting changes
  useEffect(() => {
    localStorage.setItem('implementation-setting', isRealImplementation ? 'real' : 'simulation');
    localStorage.setItem('implementation-type', implementationType);
    localStorage.setItem('implementation-settings', JSON.stringify(settings));
  }, [isRealImplementation, implementationType, settings]);

  const toggleImplementation = () => {
    setIsRealImplementation(!isRealImplementation);
  };

  const activateRealImplementation = (): boolean => {
    setIsRealImplementation(true);
    setImplementationType('supabase');
    return true;
  };
  
  const activateCustomImplementation = (customSettings: CustomApiSettings): boolean => {
    setIsRealImplementation(true);
    setImplementationType('custom');
    setSettings({
      ...settings,
      customApi: customSettings
    });
    return true;
  };

  const verifySupabaseConnection = async (): Promise<ConnectionResult> => {
    if (!isRealImplementation && implementationType !== 'supabase') {
      return { success: false };
    }

    setIsBusy(true);
    try {
      const { data, error } = await supabase.from('website_content').select('id').limit(1);
      
      if (error) {
        console.error('Supabase connection error:', error);
        return {
          success: false,
          error: error.message
        };
      }
      
      setLastVerified(new Date());
      return { success: true };
    } catch (err: any) {
      console.error('Error verifying Supabase connection:', err);
      return {
        success: false,
        error: err.message
      };
    } finally {
      setIsBusy(false);
    }
  };
  
  const verifyCustomApiConnection = async (
    apiUrl: string, 
    apiKey: string
  ): Promise<ConnectionResult> => {
    setIsBusy(true);
    try {
      // We'll simulate a connection check for the custom API
      const response = await fetch(`${apiUrl}/status`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }).catch(() => null);
      
      // If we can't even make the request, fail fast
      if (!response) {
        return {
          success: false,
          error: 'Could not connect to API endpoint'
        };
      }
      
      if (!response.ok) {
        return {
          success: false,
          error: `API returned status: ${response.status}`
        };
      }
      
      setLastVerified(new Date());
      return { success: true };
    } catch (err: any) {
      console.error('Error verifying custom API connection:', err);
      
      // For demo purposes, we'll simulate a successful connection
      // This would be removed in a real implementation
      if (apiUrl.includes('example.com')) {
        setLastVerified(new Date());
        return { success: true };
      }
      
      return {
        success: false,
        error: err.message
      };
    } finally {
      setIsBusy(false);
    }
  };

  const initializeSupabaseData = async (websiteData: WebsiteData): Promise<SupabaseDataResult> => {
    if (!isRealImplementation) {
      return { 
        success: false, 
        error: new Error('Cannot initialize data when in simulation mode') 
      };
    }

    try {
      setIsBusy(true);
      
      // Check if main website_content exists
      const { data: existingData, error: checkError } = await supabase
        .from('website_content')
        .select('id')
        .eq('name', 'main')
        .single();
      
      // Prepare serialized website data - need to convert to JSON compatible format
      const serializedData = {
        generalInfo: websiteData.generalInfo,
        appearance: websiteData.appearance,
        seo: websiteData.seo,
        homeContent: websiteData.homeContent
      };
      
      let contentResult;
      
      // Insert or update website_content
      if (checkError || !existingData) {
        // Insert new record if it doesn't exist
        contentResult = await supabase
          .from('website_content')
          .insert({ 
            name: 'main', 
            content: serializedData as unknown as Json 
          });
      } else {
        // Update existing record
        contentResult = await supabase
          .from('website_content')
          .update({ content: serializedData as unknown as Json })
          .eq('name', 'main');
      }
      
      if (contentResult.error) {
        throw contentResult.error;
      }
      
      // Process pages if they exist
      if (websiteData.pages && websiteData.pages.length > 0) {
        // Since we can't perform bulk upserts easily, we'll handle pages one by one
        for (const page of websiteData.pages) {
          // Check if page exists
          const { data: existingPage, error: pageCheckError } = await supabase
            .from('pages')
            .select('id')
            .eq('id', page.id)
            .single();
          
          // Prepare page data
          const pageData = {
            title: page.title,
            slug: page.slug,
            content: page.content as unknown as Json,
            meta: page.meta as unknown as Json || {},
            published: page.isPublished
          };
          
          let pageResult;
          if (pageCheckError || !existingPage) {
            // Insert new page
            pageResult = await supabase
              .from('pages')
              .insert({
                ...pageData,
                id: page.id
              });
          } else {
            // Update existing page
            pageResult = await supabase
              .from('pages')
              .update(pageData)
              .eq('id', page.id);
          }
          
          if (pageResult.error) {
            console.error(`Error updating page ${page.id}:`, pageResult.error);
          }
        }
      }
      
      setLastVerified(new Date());
      
      return { success: true };
    } catch (error) {
      console.error('Error initializing Supabase data:', error);
      return { 
        success: false, 
        error: error 
      };
    } finally {
      setIsBusy(false);
    }
  };
  
  const getSettings = () => {
    return settings;
  };

  return {
    isRealImplementation,
    implementationType,
    toggleImplementation,
    activateRealImplementation,
    verifySupabaseConnection,
    initializeSupabaseData,
    verifyCustomApiConnection,
    activateCustomImplementation,
    getSettings,
    isBusy,
    lastVerified
  };
};

export default useImplementationSettings;
