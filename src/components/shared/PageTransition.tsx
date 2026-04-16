import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.css';

export function PageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Start transition
    setIsTransitioning(true);

    // End transition after animation completes
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Match CSS animation duration

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!isTransitioning) return null;

  return (
    <div 
      className="page-transition-overlay"
      aria-hidden="true"
    />
  );
}
