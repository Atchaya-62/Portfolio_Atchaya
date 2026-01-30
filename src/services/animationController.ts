import type { ScrollAnimationConfig } from '../types';

interface AnimationEntry {
  element: HTMLElement;
  config: ScrollAnimationConfig;
  hasTriggered: boolean;
}

export class AnimationController {
  private observer: IntersectionObserver | null = null;
  private animationEntries: Map<HTMLElement, AnimationEntry> = new Map();
  private prefersReducedMotion: boolean = false;

  constructor() {
    this.checkReducedMotionPreference();
    this.setupIntersectionObserver();
  }

  /**
   * Check if user prefers reduced motion
   */
  private checkReducedMotionPreference(): void {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.prefersReducedMotion = mediaQuery.matches;

      // Listen for changes to the preference
      mediaQuery.addEventListener('change', (e) => {
        this.prefersReducedMotion = e.matches;
      });
    }
  }

  /**
   * Set up Intersection Observer for viewport detection
   */
  private setupIntersectionObserver(): IntersectionObserver | null {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return null;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const animationEntry = this.animationEntries.get(entry.target as HTMLElement);
          
          if (!animationEntry) return;

          // Check if element is intersecting and hasn't been triggered yet (or can trigger multiple times)
          if (entry.isIntersecting && (!animationEntry.hasTriggered || !animationEntry.config.triggerOnce)) {
            this.applyScrollAnimation(entry.target as HTMLElement, animationEntry.config);
            animationEntry.hasTriggered = true;
          }
        });
      },
      {
        threshold: 0.1, // Default threshold, can be overridden per element
        rootMargin: '0px',
      }
    );

    return this.observer;
  }

  /**
   * Register an element for scroll-triggered animation
   */
  registerScrollAnimation(
    element: HTMLElement,
    config: ScrollAnimationConfig
  ): void {
    if (!element || !this.observer) return;

    // Store the animation entry
    this.animationEntries.set(element, {
      element,
      config,
      hasTriggered: false,
    });

    // Update observer threshold if specified in config
    if (config.threshold !== undefined) {
      // For custom thresholds, we need to recreate the observer
      // or use multiple observers (simplified approach: use default threshold)
      this.observer.observe(element);
    } else {
      this.observer.observe(element);
    }
  }

  /**
   * Apply scroll animation to an element
   */
  private applyScrollAnimation(element: HTMLElement, config: ScrollAnimationConfig): void {
    // Skip animations if user prefers reduced motion
    if (this.prefersReducedMotion) {
      element.style.opacity = '1';
      element.style.transform = 'none';
      return;
    }

    // Apply animation using CSS transitions
    element.style.transition = `all ${config.duration}ms ${config.easing}`;
    
    if (config.delay) {
      element.style.transitionDelay = `${config.delay}ms`;
    }

    // Trigger animation by adding a class or modifying styles
    element.classList.add('animate-in');
    element.style.opacity = '1';
    element.style.transform = 'translateY(0) scale(1)';
  }

  /**
   * Trigger micro-animation on interactive elements
   */
  triggerMicroAnimation(
    element: HTMLElement,
    type: 'hover' | 'focus' | 'click'
  ): void {
    if (!element || this.prefersReducedMotion) return;

    // Apply different animations based on interaction type
    switch (type) {
      case 'hover':
        element.classList.add('micro-hover');
        break;
      case 'focus':
        element.classList.add('micro-focus');
        break;
      case 'click':
        element.classList.add('micro-click');
        // Remove the class after animation completes
        setTimeout(() => {
          element.classList.remove('micro-click');
        }, 300);
        break;
    }
  }

  /**
   * Unregister an element from scroll animations
   */
  unregisterScrollAnimation(element: HTMLElement): void {
    if (!element || !this.observer) return;

    this.observer.unobserve(element);
    this.animationEntries.delete(element);
  }

  /**
   * Clean up all observers and entries
   */
  destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.animationEntries.clear();
  }

  /**
   * Check if reduced motion is preferred
   */
  isPrefersReducedMotion(): boolean {
    return this.prefersReducedMotion;
  }

  /**
   * Play intro animation (placeholder for task 4.1)
   */
  playIntroAnimation(): Promise<void> {
    // Implementation will be added in task 4.1
    return Promise.resolve();
  }
}

export const animationController = new AnimationController();
