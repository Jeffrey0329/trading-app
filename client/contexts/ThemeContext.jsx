import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getThemeColors } from '../constants/Color';
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [colors, setColors] = useState(getThemeColors('dark'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSavedTheme();
  }, []);

  const loadSavedTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('app-theme');
      if (savedTheme) {
        setTheme(savedTheme);
        setColors(getThemeColors(savedTheme));
      } else {
        const colorScheme = Appearance.getColorScheme();
        const initialTheme = colorScheme || 'dark';
        setTheme(initialTheme);
        setColors(getThemeColors(initialTheme));
        
        await AsyncStorage.setItem('app-theme', initialTheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
      setTheme('dark');
      setColors(getThemeColors('dark'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setColors(getThemeColors(theme));
  }, [theme]);

  const toggleTheme = async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    setTheme(newTheme);
    
    try {
      await AsyncStorage.setItem('app-theme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const value = {
    theme,
    toggleTheme,
    colors,
    isLoading
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};