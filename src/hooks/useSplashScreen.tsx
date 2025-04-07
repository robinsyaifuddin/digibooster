
import { useState, useEffect } from 'react';

// Hook untuk mengelola logika splash screen (disabled)
export const useSplashScreen = () => {
  const [showSplash, setShowSplash] = useState(false); // Always start as false
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // No need to check for first visit anymore
  useEffect(() => {
    setIsLoading(false);
  }, []);
  
  const onSplashComplete = () => {
    setShowSplash(false);
  };
  
  return {
    showSplash: false, // Always return false
    isFirstVisit: false,
    isLoading: false,
    onSplashComplete
  };
};

