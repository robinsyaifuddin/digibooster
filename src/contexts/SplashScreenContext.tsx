
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

type SplashScreenContextType = {
  showSplash: boolean;
  triggerSplash: () => void;
  hideSplash: () => void;
};

const SplashScreenContext = createContext<SplashScreenContextType | undefined>(undefined);

export const SplashScreenProvider = ({ children }: { children: ReactNode }) => {
  const [showSplash, setShowSplash] = useState(true);
  const [lastPathVisited, setLastPathVisited] = useState<string | null>(null);
  const location = useLocation();

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';
  
  useEffect(() => {
    // Always show splash on initial load or when navigating to homepage
    if (isHomePage) {
      setShowSplash(true);
    }
    
    setLastPathVisited(location.pathname);
  }, [location.pathname, isHomePage]);
  
  // Function to manually trigger splash screen
  const triggerSplash = () => {
    setShowSplash(true);
  };
  
  // Function to manually hide splash screen
  const hideSplash = () => {
    setShowSplash(false);
  };

  return (
    <SplashScreenContext.Provider value={{ showSplash, triggerSplash, hideSplash }}>
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
