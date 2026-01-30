import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fc from 'fast-check';
import { ThemeManager, themeConfigs } from './themeManager';
import type { ThemeMode } from '../types';

describe('ThemeManager Property-Based Tests', () => {
  let originalLocalStorage: Storage;

  beforeEach(() => {
    // Save original localStorage
    originalLocalStorage = globalThis.localStorage;

    // Create a fresh localStorage mock for each test
    const localStorageMock: Record<string, string> = {};
    globalThis.localStorage = {
      getItem: (key: string) => localStorageMock[key] || null,
      setItem: (key: string, value: string) => {
        localStorageMock[key] = value;
      },
      removeItem: (key: string) => {
        delete localStorageMock[key];
      },
      clear: () => {
        Object.keys(localStorageMock).forEach(key => delete localStorageMock[key]);
      },
      key: (index: number) => Object.keys(localStorageMock)[index] || null,
      length: Object.keys(localStorageMock).length,
    } as Storage;

    // Clear any existing theme from DOM
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    // Restore original localStorage
    globalThis.localStorage = originalLocalStorage;
  });

  /**
   * Property 1: Theme Persistence Round-Trip
   * **Validates: Requirements 1.4, 1.5**
   * 
   * For any theme selection (light, dark, or futuristic), when a visitor selects
   * the theme, it should be persisted to browser storage, and when the application
   * loads, the stored theme should be applied automatically.
   */
  describe('Property 1: Theme Persistence Round-Trip', () => {
    it('should persist and restore any selected theme', () => {
      fc.assert(
        fc.property(
          fc.constantFrom<ThemeMode>('light', 'dark', 'futuristic'),
          (theme) => {
            // Create a new ThemeManager instance
            const manager = new ThemeManager();

            // Set the theme
            manager.setTheme(theme);

            // Verify the theme is persisted to localStorage
            const storedTheme = localStorage.getItem('portfolio-theme');
            expect(storedTheme).toBe(theme);

            // Verify the theme is returned by getTheme
            expect(manager.getTheme()).toBe(theme);

            // Simulate a page reload by creating a new ThemeManager instance
            const newManager = new ThemeManager();

            // Verify the new instance loads the persisted theme
            expect(newManager.getTheme()).toBe(theme);

            // Verify the theme is applied to the DOM
            expect(document.documentElement.getAttribute('data-theme')).toBe(theme);

            // Verify CSS custom properties are set correctly
            const config = themeConfigs[theme];
            const root = document.documentElement;
            expect(root.style.getPropertyValue('--color-primary')).toBe(config.colors.primary);
            expect(root.style.getPropertyValue('--color-secondary')).toBe(config.colors.secondary);
            expect(root.style.getPropertyValue('--color-background')).toBe(config.colors.background);
            expect(root.style.getPropertyValue('--color-text')).toBe(config.colors.text);
            expect(root.style.getPropertyValue('--color-accent')).toBe(config.colors.accent);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should handle theme persistence across multiple theme changes', () => {
      fc.assert(
        fc.property(
          fc.array(fc.constantFrom<ThemeMode>('light', 'dark', 'futuristic'), { minLength: 1, maxLength: 10 }),
          (themes) => {
            const manager = new ThemeManager();

            // Apply each theme in sequence
            themes.forEach(theme => {
              manager.setTheme(theme);
            });

            // The last theme should be persisted
            const lastTheme = themes[themes.length - 1];
            expect(localStorage.getItem('portfolio-theme')).toBe(lastTheme);
            expect(manager.getTheme()).toBe(lastTheme);

            // Create a new manager to simulate reload
            const newManager = new ThemeManager();
            expect(newManager.getTheme()).toBe(lastTheme);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should default to light theme when no theme is stored', () => {
      // Clear localStorage
      localStorage.clear();

      // Create a new ThemeManager
      const manager = new ThemeManager();

      // Should default to light theme
      expect(manager.getTheme()).toBe('light');
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });

    it('should handle invalid stored theme values gracefully', () => {
      // Set an invalid theme value in localStorage
      localStorage.setItem('portfolio-theme', 'invalid-theme');

      // Create a new ThemeManager
      const manager = new ThemeManager();

      // Should default to light theme when stored value is invalid
      expect(manager.getTheme()).toBe('light');
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });
  });
});
