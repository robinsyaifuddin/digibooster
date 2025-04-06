
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useSplashScreen = () => {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(false);
  
  useEffect(() => {
    // Cek apakah ini halaman beranda dan belum pernah ditampilkan
    const isHomePage = location.pathname === '/';
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    
    if (isHomePage && !hasSeenSplash) {
      setShowSplash(true);
      // Set flag di sessionStorage untuk menandai bahwa splash screen sudah pernah ditampilkan
      sessionStorage.setItem('hasSeenSplash', 'true');
    } else {
      setShowSplash(false);
    }
  }, [location.pathname]);
  
  return { showSplash };
};
