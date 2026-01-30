import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './IntroAnimation.css';

interface IntroAnimationProps {
  name: string;
  onComplete: () => void;
}

const SESSION_STORAGE_KEY = 'intro-animation-played';

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ name, onComplete }) => {
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if animation has already played in this session
    const hasPlayed = sessionStorage.getItem(SESSION_STORAGE_KEY);
    
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (hasPlayed || prefersReducedMotion) {
      // Skip animation
      onComplete();
      setIsVisible(false);
    } else {
      // Play animation
      setShouldPlay(true);
      sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
    }
  }, [onComplete]);

  const handleAnimationComplete = () => {
    // Wait a bit before transitioning out
    setTimeout(() => {
      setIsVisible(false);
      // Call onComplete after fade out
      setTimeout(onComplete, 500);
    }, 500);
  };

  if (!isVisible) {
    return null;
  }

  if (!shouldPlay) {
    return null;
  }

  // Split name into letters for animation
  const letters = name.split('');

  return (
    <AnimatePresence>
      <motion.div
        className="intro-animation-overlay"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        role="presentation"
        aria-hidden="true"
      >
        <div className="intro-animation-content">
          <motion.div
            className="intro-name-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {letters.map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                className="intro-letter"
                initial={{ 
                  opacity: 0, 
                  y: 50,
                  rotateX: -90
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  rotateX: 0
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.5 + index * 0.1,
                  ease: [0.6, 0.01, 0.05, 0.95]
                }}
                onAnimationComplete={
                  index === letters.length - 1 ? handleAnimationComplete : undefined
                }
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            className="intro-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.5 + letters.length * 0.1 + 0.3 
            }}
          >
            Welcome to my portfolio
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroAnimation;
