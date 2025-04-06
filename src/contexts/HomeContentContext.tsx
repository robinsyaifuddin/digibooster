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
  const websiteData = useWebsiteDataStore();
  // Initialize with data from the store to prevent null values
  const [homeContent, setHomeContent] = useState<WebsiteData['homeContent']>(websiteData.homeContent);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Initialize with data from the store
    setHomeContent(websiteData.homeContent);
    setIsLoading(false);
    
    // Setup event listener for content updates
    const handleContentUpdate = (event: CustomEvent<ContentUpdateEventDetail>) => {
      console.log('Content update event received:', event.detail);
      if (event.detail && event.detail.homeContent) {
        setHomeContent(event.detail.homeContent);
        
        // If update is marked as permanent, save to localStorage
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
        // If parsing fails, fallback to the store data
        setHomeContent(websiteData.homeContent);
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
          // If parsing fails, fallback to the store data
          setHomeContent(websiteData.homeContent);
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
