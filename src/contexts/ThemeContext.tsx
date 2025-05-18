
import * as React from 'react';

interface ThemeContextType {
  theme: 'dark';
  primaryColor: string;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always use dark theme for DigiBooster
  const theme = 'dark' as const;
  // Set primary color to match DigiBooster logo
  const primaryColor = '#00E9F2';

  // Set dark theme on document element
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
    // Add CSS variable for the primary color
    document.documentElement.style.setProperty('--primary-color', primaryColor);
  }, []);

  const value = {
    theme,
    primaryColor
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
