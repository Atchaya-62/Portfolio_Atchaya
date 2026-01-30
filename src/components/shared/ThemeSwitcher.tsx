import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import './ThemeSwitcher.css';

export const ThemeSwitcher: React.FC = () => {
  const { theme, changeTheme } = useTheme();

  const toggleTheme = () => {
    changeTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
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
  );
};
