
import { useState, useEffect } from 'react';

// Hook untuk mengelola logika splash screen
export const useSplashScreen = () => {
  const [showSplash, setShowSplash] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Periksa apakah ini kunjungan pertama ke halaman beranda
    const hasVisitedHome = sessionStorage.getItem('visitedHome');
    
    if (!hasVisitedHome) {
      // Ini adalah kunjungan pertama
      setShowSplash(true);
      sessionStorage.setItem('visitedHome', 'true');
    } else {
      // Bukan kunjungan pertama
      setIsFirstVisit(false);
    }
    
    setIsLoading(false);
  }, []);
  
  const onSplashComplete = () => {
    setShowSplash(false);
  };
  
  return {
    showSplash,
    isFirstVisit,
    isLoading,
    onSplashComplete
  };
};
