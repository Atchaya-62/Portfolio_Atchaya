import { useState, useEffect } from 'react';
import type { ThemeMode } from '../types';
import { themeManager } from '../services/themeManager';

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(themeManager.getTheme());

  useEffect(() => {
    // Initialize with current theme from manager
    setTheme(themeManager.getTheme());
  }, []);

  const changeTheme = (newTheme: ThemeMode) => {
    themeManager.setTheme(newTheme);
    setTheme(newTheme);
  };

  return { theme, changeTheme };
}
