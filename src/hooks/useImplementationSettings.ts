
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { WebsiteData } from '@/types/websiteTypes';

// Define explicit return type for initializeSupabaseData
interface SupabaseDataResult {
  success: boolean;
  error?: any;
}

export const useImplementationSettings = () => {
  const [isRealImplementation, setIsRealImplementation] = useState<boolean>(false);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [lastVerified, setLastVerified] = useState<Date | null>(null);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const storedSetting = localStorage.getItem('implementation-setting');
    if (storedSetting) {
      setIsRealImplementation(storedSetting === 'real');
    }
  }, []);

  // Update localStorage when setting changes
  useEffect(() => {
    localStorage.setItem('implementation-setting', isRealImplementation ? 'real' : 'simulation');
  }, [isRealImplementation]);

  const toggleImplementation = () => {
    setIsRealImplementation(!isRealImplementation);
  };

  const verifySupabaseConnection = async (): Promise<boolean> => {
    if (!isRealImplementation) {
      return false;
    }

    setIsBusy(true);
    try {
      const { data, error } = await supabase.from('website_content').select('id').limit(1);
      
      if (error) {
        console.error('Supabase connection error:', error);
        return false;
      }
      
      setLastVerified(new Date());
      return true;
    } catch (err) {
      console.error('Error verifying Supabase connection:', err);
      return false;
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
      
      // Prepare serialized website data
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
            content: serializedData 
          });
      } else {
        // Update existing record
        contentResult = await supabase
          .from('website_content')
          .update({ content: serializedData })
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
            content: page.content,
            meta: page.meta,
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

  return {
    isRealImplementation,
    toggleImplementation,
    verifySupabaseConnection,
    initializeSupabaseData,
    isBusy,
    lastVerified
  };
};

export default useImplementationSettings;
