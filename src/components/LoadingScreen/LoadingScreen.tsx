import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from '../shared/Sparkles';
import './LoadingScreen.css';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  // Floating tech terms
  const techTerms = ['AI', 'ML', 'DS', '00', '11', 'DL', 'NLP', 'CV'];

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 100);   // Start immediately
    const timer2 = setTimeout(() => setStage(2), 800);   // Combine H
    const timer3 = setTimeout(() => setStage(3), 1200);  // Show tagline
    const timer4 = setTimeout(() => onComplete(), 2500); // Fade out (total 2.5s)

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="loading-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Floating tech terms background */}
        <div className="floating-terms" aria-hidden="true">
          {techTerms.map((term, index) => (
            <motion.div
              key={`${term}-${index}`}
              className="floating-term"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0.3,
                scale: 0.8
              }}
              animate={{
                x: [
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth
                ],
                y: [
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight
                ],
                opacity: [0.2, 0.4, 0.2],
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 360]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {term}
            </motion.div>
          ))}
        </div>

        {/* Main name animation */}
        <div className="name-container">
          {/* ATC - slides in from left while H splits */}
          <motion.span
            className="letter"
            initial={{ x: -150, opacity: 0 }}
            animate={{ 
              x: stage >= 1 ? 0 : -150, 
              opacity: stage >= 1 ? 1 : 0 
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            ATC
          </motion.span>

          {/* H - Split and combine animation */}
          <div className="h-container">
            {/* Left bar of H - starts split, comes together */}
            <motion.span
              className="h-bar h-left-bar"
              initial={{ x: -60, opacity: 1 }}
              animate={{ 
                x: stage >= 2 ? 0 : -60,
                opacity: stage >= 3 ? 0 : 1
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              |
            </motion.span>

            {/* Right bar of H - starts split, comes together */}
            <motion.span
              className="h-bar h-right-bar"
              initial={{ x: 60, opacity: 1 }}
              animate={{ 
                x: stage >= 2 ? 0 : 60,
                opacity: stage >= 3 ? 0 : 1
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              |
            </motion.span>

            {/* Complete H appears */}
            <motion.span
              className="letter h-complete"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: stage >= 3 ? 1 : 0,
                opacity: stage >= 3 ? 1 : 0
              }}
              transition={{ duration: 0.4 }}
            >
              H
            </motion.span>
          </div>

          {/* AYA - slides in from right while H splits */}
          <motion.span
            className="letter"
            initial={{ x: 150, opacity: 0 }}
            animate={{ 
              x: stage >= 1 ? 0 : 150, 
              opacity: stage >= 1 ? 1 : 0 
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            AYA
          </motion.span>
        </div>

        {/* Sparkles Animation Below Name */}
        {stage >= 1 && (
          <div className="sparkles-container" style={{ width: '40rem', height: '10rem', position: 'relative', marginTop: '2rem' }}>
            {/* Gradients */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px w-1/4" />
            
            {/* Sparkles Core */}
            <Sparkles
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={800}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />
            
            {/* Radial Gradient to prevent sharp edges */}
            <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" style={{ pointerEvents: 'none' }}></div>
          </div>
        )}

        {/* Loading progress */}
        <div className="loading-bar-container">
          <motion.div
            className="loading-bar"
            initial={{ width: '0%' }}
            animate={{ width: `${(stage / 3) * 100}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>

        {/* Tagline */}
        {stage >= 3 && (
          <motion.p
            className="tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            AI & Data Science Explorer
          </motion.p>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
