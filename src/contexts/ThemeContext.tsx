import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  resetToLight: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark'); // Default to dark mode

  // Load theme from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('gm-theme') as Theme;
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        setThemeState(savedTheme);
      } else {
        // If no saved theme, default to dark mode
        setThemeState('dark');
      }
    } catch (error) {
      console.error('Failed to load theme from localStorage:', error);
      setThemeState('dark'); // Fallback to dark mode
    }
  }, []);

  // Apply theme to document and save to localStorage - optimized
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Use requestAnimationFrame to batch DOM updates
    requestAnimationFrame(() => {
      // Remove previous theme classes
      root.classList.remove('light', 'dark');
      
      // Add current theme class
      root.classList.add(theme);
      
      // Save to localStorage asynchronously
      try {
        localStorage.setItem('gm-theme', theme);
      } catch (error) {
        console.error('Failed to save theme to localStorage:', error);
      }
    });
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    if (newTheme !== theme) {
      setThemeState(newTheme);
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const resetToLight = useCallback(() => {
    if (theme !== 'light') {
      setThemeState('light');
    }
  }, [theme]);

  // Memoize the context value to prevent unnecessary re-renders
  const value: ThemeContextType = useMemo(() => ({
    theme,
    setTheme,
    toggleTheme,
    resetToLight,
  }), [theme, setTheme, toggleTheme, resetToLight]);

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
