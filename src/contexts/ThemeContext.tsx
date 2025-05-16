
import React, { createContext, useContext } from 'react';

interface ThemeContextType {
  theme: 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always use dark theme for DigiBooster
  const theme = 'dark' as const;

  // Set dark theme on document element
  if (typeof document !== 'undefined') {
    document.documentElement.classList.add('dark');
  }

  const value = {
    theme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
