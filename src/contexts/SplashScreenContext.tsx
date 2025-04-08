
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SplashScreenContextType {
  isVisible: boolean;
  triggerSplash: () => void;
  hideSplash: () => void;
}

// Create context with default values
const SplashScreenContext = createContext<SplashScreenContextType>({
  isVisible: false,
  triggerSplash: () => {},
  hideSplash: () => {},
});

export const useSplashScreen = () => {
  const context = useContext(SplashScreenContext);
  if (!context) {
    throw new Error('useSplashScreen must be used within a SplashScreenProvider');
  }
  return context;
};

interface SplashScreenProviderProps {
  children: ReactNode;
}

export const SplashScreenProvider: React.FC<SplashScreenProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const triggerSplash = () => {
    setIsVisible(true);
    // Auto-hide after animation completes
    setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Adjust time to match animation duration
  };

  const hideSplash = () => {
    setIsVisible(false);
  };

  return (
    <SplashScreenContext.Provider value={{ isVisible, triggerSplash, hideSplash }}>
      {children}
    </SplashScreenContext.Provider>
  );
};
