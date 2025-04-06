
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

type SplashScreenContextType = {
  showSplash: boolean;
  triggerSplash: () => void;
};

const SplashScreenContext = createContext<SplashScreenContextType | undefined>(undefined);

export const SplashScreenProvider = ({ children }: { children: ReactNode }) => {
  const [showSplash, setShowSplash] = useState(true);
  const [lastPathVisited, setLastPathVisited] = useState('');
  const location = useLocation();

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';
  
  useEffect(() => {
    // Show splash when we navigate to the home page from another page
    // or when the page is initially loaded
    if (isHomePage && (lastPathVisited !== '/' || lastPathVisited === '')) {
      setShowSplash(true);
    }
    
    setLastPathVisited(location.pathname);
  }, [location.pathname, isHomePage, lastPathVisited]);
  
  // Function to manually trigger splash screen
  const triggerSplash = () => {
    if (isHomePage) {
      setShowSplash(true);
    }
  };

  return (
    <SplashScreenContext.Provider value={{ showSplash, triggerSplash }}>
      {children}
    </SplashScreenContext.Provider>
  );
};

export const useSplashScreen = () => {
  const context = useContext(SplashScreenContext);
  if (context === undefined) {
    throw new Error('useSplashScreen must be used within a SplashScreenProvider');
  }
  return context;
};
