import { useEffect, useRef } from 'react';
import './ThemeTransition.css';

interface ThemeTransitionProps {
  isTransitioning: boolean;
  isDarkMode: boolean;
}

export const ThemeTransition: React.FC<ThemeTransitionProps> = ({
  isTransitioning,
  isDarkMode,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isTransitioning || !overlayRef.current) return;

    const overlay = overlayRef.current;

    // Trigger animation
    requestAnimationFrame(() => {
      overlay.classList.add('clip-path-active');
    });

    return () => {
      overlay.classList.remove('clip-path-active');
    };
  }, [isTransitioning]);

  if (!isTransitioning) return null;

  return (
    <div
      ref={overlayRef}
      className={`theme-clip-path-overlay ${isDarkMode ? 'dark-theme-bg' : 'light-theme-bg'}`}
      aria-hidden="true"
    />
  );
};
