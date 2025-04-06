
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/splash.css' // Import gaya splash screen
import { StrictMode, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { initScrollEffects, initIntersectionObserver } from './utils/scrollEffects.ts'

// Add dark class to html element for dark theme
document.documentElement.classList.add('dark');

// Initialize scroll effects
const AppWithEffects = () => {
  useEffect(() => {
    // Initialize scroll effects
    const cleanupScrollEffects = initScrollEffects();
    
    // Initialize intersection observer
    const observer = initIntersectionObserver();
    
    // Cleanup function
    return () => {
      cleanupScrollEffects();
      observer.disconnect();
    };
  }, []);
  
  return (
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  );
};

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AppWithEffects />
    </StrictMode>
  );
} else {
  console.error("Root element with id 'root' not found");
}
