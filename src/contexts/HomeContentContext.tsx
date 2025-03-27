
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useWebsiteDataStore, WebsiteData } from '@/stores/websiteDataStore';

// Define the context type
interface HomeContentContextType {
  homeContent: WebsiteData['homeContent'] | null;
  isLoading: boolean;
}

// Define the expected event detail type
interface ContentUpdateEventDetail extends WebsiteData {
  isPermanent?: boolean;
}

// Create the context with default values
const HomeContentContext = createContext<HomeContentContextType>({
  homeContent: null,
  isLoading: true,
});

// Create a provider component
export const HomeContentProvider = ({ children }: { children: ReactNode }) => {
  const [homeContent, setHomeContent] = useState<WebsiteData['homeContent'] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const websiteData = useWebsiteDataStore();

  useEffect(() => {
    // Initialize with data from the store
    setHomeContent(websiteData.homeContent);
    setIsLoading(false);
    
    // Setup event listener for content updates
    const handleContentUpdate = (event: CustomEvent<ContentUpdateEventDetail>) => {
      console.log('Content update event received:', event.detail);
      if (event.detail && event.detail.homeContent) {
        setHomeContent(event.detail.homeContent);
        
        // Jika pembaruan bertanda permanen, simpan ke localStorage
        if (event.detail.isPermanent) {
          localStorage.setItem('permanentHomeContent', JSON.stringify(event.detail.homeContent));
        }
      }
    };
    
    window.addEventListener('websiteContentUpdated', handleContentUpdate as EventListener);
    
    // Check local storage for permanent content data first
    const permanentContent = localStorage.getItem('permanentHomeContent');
    if (permanentContent) {
      try {
        const parsedContent = JSON.parse(permanentContent);
        setHomeContent(parsedContent);
      } catch (error) {
        console.error('Error parsing permanent home content:', error);
      }
    } 
    // Otherwise, check for any stored data
    else {
      const storedData = localStorage.getItem('websiteData');
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          if (parsedData.homeContent) {
            setHomeContent(parsedData.homeContent);
          }
        } catch (error) {
          console.error('Error parsing stored website data:', error);
        }
      }
    }
    
    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('websiteContentUpdated', handleContentUpdate as EventListener);
    };
  }, [websiteData]);

  return (
    <HomeContentContext.Provider value={{ homeContent, isLoading }}>
      {children}
    </HomeContentContext.Provider>
  );
};

// Create a custom hook for easy consumption
export const useHomeContent = () => useContext(HomeContentContext);
