import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { ThemeTransition } from './ThemeTransition';
import './ThemeSwitcher.css';

export const ThemeSwitcher: React.FC = () => {
  const { theme, changeTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleTheme = () => {
    // Start transition
    setIsTransitioning(true);

    // Change theme at 300ms (halfway through 600ms animation)
    setTimeout(() => {
      changeTheme(theme === 'light' ? 'dark' : 'light');
    }, 300);

    // End transition after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  return (
    <>
      <button
        className="theme-toggle-button"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      >
        <span className="theme-icon" aria-hidden="true">
          {theme === 'light' ? '🌸' : '🕷️'}
        </span>
      </button>

      <ThemeTransition
        isTransitioning={isTransitioning}
        isDarkMode={theme === 'dark'}
      />
    </>
  );
};
