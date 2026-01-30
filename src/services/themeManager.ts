import type { ThemeMode, ThemeConfig } from '../types';

const THEME_STORAGE_KEY = 'portfolio-theme';

// Theme configuration objects
export const themeConfigs: Record<ThemeMode, ThemeConfig> = {
  light: {
    mode: 'light',
    colors: {
      primary: '#9b87f5',
      secondary: '#d4bbff',
      background: '#f3f0ff',
      text: '#000000',
      accent: '#7c3aed',
    },
    animations: {
      transitionDuration: 500,
    },
  },
  dark: {
    mode: 'dark',
    colors: {
      primary: '#60A5FA',
      secondary: '#A78BFA',
      background: '#111827',
      text: '#F9FAFB',
      accent: '#FBBF24',
    },
    animations: {
      transitionDuration: 500,
    },
  },
};

export class ThemeManager {
  private currentTheme: ThemeMode;

  constructor() {
    this.currentTheme = this.loadThemeFromStorage() || 'light';
    this.applyThemeToDOM(this.currentTheme);
  }

  setTheme(theme: ThemeMode): void {
    this.currentTheme = theme;
    this.saveThemeToStorage(theme);
    this.applyThemeToDOM(theme);
  }

  getTheme(): ThemeMode {
    return this.currentTheme;
  }

  private loadThemeFromStorage(): ThemeMode | null {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored && (stored === 'light' || stored === 'dark')) {
        return stored as ThemeMode;
      }
      return null;
    } catch (error) {
      console.warn('Failed to load theme from storage:', error);
      return null;
    }
  }

  private saveThemeToStorage(theme: ThemeMode): void {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.warn('Failed to save theme to storage:', error);
    }
  }

  private applyThemeToDOM(theme: ThemeMode): void {
    const config = themeConfigs[theme];
    const root = document.documentElement;

    // Set data-theme attribute for CSS
    root.setAttribute('data-theme', theme);

    // Update CSS custom properties
    root.style.setProperty('--color-primary', config.colors.primary);
    root.style.setProperty('--color-secondary', config.colors.secondary);
    root.style.setProperty('--color-background', config.colors.background);
    root.style.setProperty('--color-text', config.colors.text);
    root.style.setProperty('--color-accent', config.colors.accent);
    root.style.setProperty('--transition-duration', `${config.animations.transitionDuration}ms`);
  }
}

export const themeManager = new ThemeManager();
