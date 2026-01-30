import { useEffect, useRef } from 'react';
import { animationController } from '../services/animationController';
import type { ScrollAnimationConfig } from '../types';

/**
 * Hook to register an element for scroll-triggered animations
 * @param config - Animation configuration
 * @returns ref - Ref to attach to the element
 */
export function useScrollAnimation<T extends HTMLElement>(
  config: Partial<ScrollAnimationConfig> = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Default configuration
    const defaultConfig: ScrollAnimationConfig = {
      duration: 600,
      easing: 'ease-out',
      threshold: 0.1,
      triggerOnce: true,
      delay: 0,
    };

    // Merge with provided config
    const finalConfig: ScrollAnimationConfig = {
      ...defaultConfig,
      ...config,
    };

    // Register the element for scroll animation
    animationController.registerScrollAnimation(element, finalConfig);

    // Cleanup on unmount
    return () => {
      animationController.unregisterScrollAnimation(element);
    };
  }, [config.duration, config.easing, config.threshold, config.triggerOnce, config.delay]);

  return ref;
}
