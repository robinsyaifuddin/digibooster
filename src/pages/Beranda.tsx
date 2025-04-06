
import React from 'react';
import SplashScreen from '@/components/splash/SplashScreen';
import HomePage from '@/components/public/HomePage';
import { useSplashScreen } from '@/hooks/useSplashScreen';

const Beranda = () => {
  const { showSplash } = useSplashScreen();

  return (
    <>
      {showSplash && <SplashScreen duration={500} />}
      <HomePage />
    </>
  );
};

export default Beranda;
