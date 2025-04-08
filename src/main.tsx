
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/splash.css' // Import gaya splash screen
import React from 'react' // Explicitly import React
import { StrictMode } from 'react'
import { initScrollEffects, initIntersectionObserver } from './utils/scrollEffects.ts'

// Initialize scroll effects
const AppWithEffects = () => {
  // Use React hooks inside a functional component
  React.useEffect(() => {
    // Initialize scroll effects
    const cleanupScrollEffects = initScrollEffects();
    
    // Initialize intersection observer
    const observer = initIntersectionObserver();
    
    // Cleanup function
    return () => {
      cleanupScrollEffects();
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);
  
  return <App />;
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
