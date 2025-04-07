
import { createContext, useContext, ReactNode } from 'react';

type SplashScreenContextType = {
  showSplash: boolean;
  triggerSplash: () => void;
  hideSplash: () => void;
};

const SplashScreenContext = createContext<SplashScreenContextType | undefined>(undefined);

export const SplashScreenProvider = ({ children }: { children: ReactNode }) => {
  // Disable splash screen functionality by always setting showSplash to false
  const showSplash = false;
  
  // Empty functions to maintain API compatibility
  const triggerSplash = () => {};
  const hideSplash = () => {};

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
