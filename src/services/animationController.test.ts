import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { AnimationController } from './animationController';
import type { ScrollAnimationConfig } from '../types';

describe('AnimationController', () => {
  let controller: AnimationController;
  let mockElement: HTMLElement;
  let mockIntersectionObserver: any;
  let intersectionCallback: IntersectionObserverCallback;

  beforeEach(() => {
    // Create a mock element
    mockElement = document.createElement('div');
    document.body.appendChild(mockElement);

    // Mock IntersectionObserver
    mockIntersectionObserver = {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    };

    intersectionCallback = vi.fn();

    (globalThis as any).IntersectionObserver = class MockIntersectionObserver {
      constructor(callback: IntersectionObserverCallback) {
        intersectionCallback = callback;
      }
      observe = mockIntersectionObserver.observe;
      unobserve = mockIntersectionObserver.unobserve;
      disconnect = mockIntersectionObserver.disconnect;
      takeRecords = vi.fn();
      root = null;
      rootMargin = '';
      thresholds = [];
    } as any;

    // Mock matchMedia for prefers-reduced-motion
    (globalThis as any).matchMedia = vi.fn((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })) as any;

    controller = new AnimationController();
  });

  afterEach(() => {
    if (mockElement.parentNode) {
      document.body.removeChild(mockElement);
    }
    controller.destroy();
    vi.clearAllMocks();
  });

  describe('Scroll Animation Registration', () => {
    it('should register an element for scroll animation', () => {
      const config: ScrollAnimationConfig = {
        duration: 500,
        easing: 'ease-out',
        threshold: 0.5,
        triggerOnce: true,
      };

      controller.registerScrollAnimation(mockElement, config);

      expect(mockIntersectionObserver.observe).toHaveBeenCalledWith(mockElement);
    });

    it('should handle multiple element registrations', () => {
      const element1 = document.createElement('div');
      const element2 = document.createElement('div');
      document.body.appendChild(element1);
      document.body.appendChild(element2);

      const config: ScrollAnimationConfig = {
        duration: 500,
        easing: 'ease-out',
        threshold: 0.5,
        triggerOnce: true,
      };

      controller.registerScrollAnimation(element1, config);
      controller.registerScrollAnimation(element2, config);

      expect(mockIntersectionObserver.observe).toHaveBeenCalledTimes(2);
      expect(mockIntersectionObserver.observe).toHaveBeenCalledWith(element1);
      expect(mockIntersectionObserver.observe).toHaveBeenCalledWith(element2);

      document.body.removeChild(element1);
      document.body.removeChild(element2);
    });

    it('should not register null or undefined elements', () => {
      const config: ScrollAnimationConfig = {
        duration: 500,
        easing: 'ease-out',
        threshold: 0.5,
        triggerOnce: true,
      };

      controller.registerScrollAnimation(null as any, config);
      controller.registerScrollAnimation(undefined as any, config);

      // Should not throw and should not call observe
      expect(mockIntersectionObserver.observe).not.toHaveBeenCalled();
    });
  });

  describe('Intersection Observer Setup', () => {
    it('should create IntersectionObserver on initialization', () => {
      // The controller was already created in beforeEach, so IntersectionObserver should have been instantiated
      // We can verify by checking that the controller has an observer
      expect(controller).toBeDefined();
      // The observer is private, but we can verify it was created by checking that observe works
      const testElement = document.createElement('div');
      controller.registerScrollAnimation(testElement, {
        duration: 500,
        easing: 'ease-out',
        threshold: 0.5,
        triggerOnce: true,
      });
      expect(mockIntersectionObserver.observe).toHaveBeenCalledWith(testElement);
    });

    it('should trigger animation when element enters viewport', () => {
      const config: ScrollAnimationConfig = {
        duration: 500,
        easing: 'ease-out',
        threshold: 0.5,
        triggerOnce: true,
      };

      controller.registerScrollAnimation(mockElement, config);

      // Simulate intersection
      const entries: IntersectionObserverEntry[] = [
        {
          target: mockElement,
          isIntersecting: true,
          intersectionRatio: 0.6,
          boundingClientRect: {} as DOMRectReadOnly,
          intersectionRect: {} as DOMRectReadOnly,
          rootBounds: null,
          time: Date.now(),
        } as IntersectionObserverEntry,
      ];

      intersectionCallback(entries, mockIntersectionObserver);

      // Check if animation styles were applied
      expect(mockElement.style.opacity).toBe('1');
      expect(mockElement.classList.contains('animate-in')).toBe(true);
    });

    it('should not trigger animation when element is not intersecting', () => {
      const config: ScrollAnimationConfig = {
        duration: 500,
        easing: 'ease-out',
        threshold: 0.5,
        triggerOnce: true,
      };

      controller.registerScrollAnimation(mockElement, config);

      // Simulate no intersection
      const entries: IntersectionObserverEntry[] = [
        {
          target: mockElement,
          isIntersecting: false,
          intersectionRatio: 0,
          boundingClientRect: {} as DOMRectReadOnly,
          intersectionRect: {} as DOMRectReadOnly,
          rootBounds: null,
          time: Date.now(),
        } as IntersectionObserverEntry,
      ];

      intersectionCallback(entries, mockIntersectionObserver);

      // Animation should not be applied
      expect(mockElement.style.opacity).not.toBe('1');
      expect(mockElement.classList.contains('animate-in')).toBe(false);
    });

    it('should respect triggerOnce configuration', () => {
      const config: ScrollAnimationConfig = {
        duration: 500,
        easing: 'ease-out',
        threshold: 0.5,
        triggerOnce: true,
      };

      controller.registerScrollAnimation(mockElement, config);

      // First intersection
      const entries: IntersectionObserverEntry[] = [
        {
          target: mockElement,
          isIntersecting: true,
          intersectionRatio: 0.6,
          boundingClientRect: {} as DOMRectReadOnly,
          intersectionRect: {} as DOMRectReadOnly,
          rootBounds: null,
          time: Date.now(),
        } as IntersectionObserverEntry,
      ];

      intersectionCallback(entries, mockIntersectionObserver);
      expect(mockElement.classList.contains('animate-in')).toBe(true);

      // Remove the class to test if it gets re-added
      mockElement.classList.remove('animate-in');

      // Second intersection (should not trigger again)
      intersectionCallback(entries, mockIntersectionObserver);
      expect(mockElement.classList.contains('animate-in')).toBe(false);
    });

    it('should allow multiple triggers when triggerOnce is false', () => {
      const config: ScrollAnimationConfig = {
        duration: 500,
        easing: 'ease-out',
        threshold: 0.5,
        triggerOnce: false,
      };

      controller.registerScrollAnimation(mockElement, config);

      const entries: IntersectionObserverEntry[] = [
        {
          target: mockElement,
          isIntersecting: true,
          intersectionRatio: 0.6,
          boundingClientRect: {} as DOMRectReadOnly,
          intersectionRect: {} as DOMRectReadOnly,
          rootBounds: null,
          time: Date.now(),
        } as IntersectionObserverEntry,
      ];

      // First trigger
      intersectionCallback(entries, mockIntersectionObserver);
      expect(mockElement.classList.contains('animate-in')).toBe(true);

      // Remove class
      mockElement.classList.remove('animate-in');

      // Second trigger (should work because triggerOnce is false)
      intersectionCallback(entries, mockIntersectionObserver);
      expect(mockElement.classList.contains('animate-in')).toBe(true);
    });
  });

  describe('Micro-Animation Triggers', () => {
    it('should trigger hover micro-animation', () => {
      controller.triggerMicroAnimation(mockElement, 'hover');
      expect(mockElement.classList.contains('micro-hover')).toBe(true);
    });

    it('should trigger focus micro-animation', () => {
      controller.triggerMicroAnimation(mockElement, 'focus');
      expect(mockElement.classList.contains('micro-focus')).toBe(true);
    });

    it('should trigger click micro-animation and remove it after delay', async () => {
      vi.useFakeTimers();

      controller.triggerMicroAnimation(mockElement, 'click');
      expect(mockElement.classList.contains('micro-click')).toBe(true);

      // Fast-forward time
      vi.advanceTimersByTime(300);

      expect(mockElement.classList.contains('micro-click')).toBe(false);

      vi.useRealTimers();
    });

    it('should not trigger micro-animations on null elements', () => {
      // Should not throw
      expect(() => {
        controller.triggerMicroAnimation(null as any, 'hover');
      }).not.toThrow();
    });
  });

  describe('Prefers-Reduced-Motion Support', () => {
    it('should detect prefers-reduced-motion preference', () => {
      // Mock matchMedia to return matches: true
      (globalThis as any).matchMedia = vi.fn((query: string) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })) as any;

      const reducedMotionController = new AnimationController();
      expect(reducedMotionController.isPrefersReducedMotion()).toBe(true);

      reducedMotionController.destroy();
    });

    it('should skip animations when prefers-reduced-motion is enabled', () => {
      // Mock matchMedia to return matches: true
      (globalThis as any).matchMedia = vi.fn((query: string) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })) as any;

      // Get the callback from the new controller
      let reducedMotionCallback: IntersectionObserverCallback = vi.fn();
      
      (globalThis as any).IntersectionObserver = class MockIntersectionObserver {
        constructor(callback: IntersectionObserverCallback) {
          reducedMotionCallback = callback;
        }
        observe = mockIntersectionObserver.observe;
        unobserve = mockIntersectionObserver.unobserve;
        disconnect = mockIntersectionObserver.disconnect;
        takeRecords = vi.fn();
        root = null;
        rootMargin = '';
        thresholds = [];
      } as any;

      const reducedMotionController = new AnimationController();

      const config: ScrollAnimationConfig = {
        duration: 500,
        easing: 'ease-out',
        threshold: 0.5,
        triggerOnce: true,
      };

      reducedMotionController.registerScrollAnimation(mockElement, config);

      // Simulate intersection
      const entries: IntersectionObserverEntry[] = [
        {
          target: mockElement,
          isIntersecting: true,
          intersectionRatio: 0.6,
          boundingClientRect: {} as DOMRectReadOnly,
          intersectionRect: {} as DOMRectReadOnly,
          rootBounds: null,
          time: Date.now(),
        } as IntersectionObserverEntry,
      ];

      // Trigger the callback
      reducedMotionCallback(entries, mockIntersectionObserver as any);

      // Should apply simplified styles (no transition)
      expect(mockElement.style.opacity).toBe('1');
      expect(mockElement.style.transform).toBe('none');

      reducedMotionController.destroy();
    });

    it('should not trigger micro-animations when prefers-reduced-motion is enabled', () => {
      // Mock matchMedia to return matches: true
      (globalThis as any).matchMedia = vi.fn((query: string) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })) as any;

      const reducedMotionController = new AnimationController();

      reducedMotionController.triggerMicroAnimation(mockElement, 'hover');
      expect(mockElement.classList.contains('micro-hover')).toBe(false);

      reducedMotionController.destroy();
    });
  });

  describe('Unregister and Cleanup', () => {
    it('should unregister an element from scroll animations', () => {
      const config: ScrollAnimationConfig = {
        duration: 500,
        easing: 'ease-out',
        threshold: 0.5,
        triggerOnce: true,
      };

      controller.registerScrollAnimation(mockElement, config);
      controller.unregisterScrollAnimation(mockElement);

      expect(mockIntersectionObserver.unobserve).toHaveBeenCalledWith(mockElement);
    });

    it('should handle unregistering non-registered elements gracefully', () => {
      const element = document.createElement('div');
      
      // Should not throw
      expect(() => {
        controller.unregisterScrollAnimation(element);
      }).not.toThrow();
    });

    it('should clean up all observers and entries on destroy', () => {
      const config: ScrollAnimationConfig = {
        duration: 500,
        easing: 'ease-out',
        threshold: 0.5,
        triggerOnce: true,
      };

      controller.registerScrollAnimation(mockElement, config);
      controller.destroy();

      expect(mockIntersectionObserver.disconnect).toHaveBeenCalled();
    });

    it('should handle multiple destroy calls gracefully', () => {
      controller.destroy();
      
      // Should not throw
      expect(() => {
        controller.destroy();
      }).not.toThrow();
    });
  });

  describe('Animation Configuration', () => {
    it('should apply animation duration from config', () => {
      const config: ScrollAnimationConfig = {
        duration: 1000,
        easing: 'ease-in-out',
        threshold: 0.5,
        triggerOnce: true,
      };

      controller.registerScrollAnimation(mockElement, config);

      const entries: IntersectionObserverEntry[] = [
        {
          target: mockElement,
          isIntersecting: true,
          intersectionRatio: 0.6,
          boundingClientRect: {} as DOMRectReadOnly,
          intersectionRect: {} as DOMRectReadOnly,
          rootBounds: null,
          time: Date.now(),
        } as IntersectionObserverEntry,
      ];

      intersectionCallback(entries, mockIntersectionObserver);

      expect(mockElement.style.transition).toContain('1000ms');
    });

    it('should apply animation easing from config', () => {
      const config: ScrollAnimationConfig = {
        duration: 500,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        threshold: 0.5,
        triggerOnce: true,
      };

      controller.registerScrollAnimation(mockElement, config);

      const entries: IntersectionObserverEntry[] = [
        {
          target: mockElement,
          isIntersecting: true,
          intersectionRatio: 0.6,
          boundingClientRect: {} as DOMRectReadOnly,
          intersectionRect: {} as DOMRectReadOnly,
          rootBounds: null,
          time: Date.now(),
        } as IntersectionObserverEntry,
      ];

      intersectionCallback(entries, mockIntersectionObserver);

      expect(mockElement.style.transition).toContain('cubic-bezier(0.4, 0, 0.2, 1)');
    });

    it('should apply animation delay when specified', () => {
      const config: ScrollAnimationConfig = {
        duration: 500,
        easing: 'ease-out',
        delay: 200,
        threshold: 0.5,
        triggerOnce: true,
      };

      controller.registerScrollAnimation(mockElement, config);

      const entries: IntersectionObserverEntry[] = [
        {
          target: mockElement,
          isIntersecting: true,
          intersectionRatio: 0.6,
          boundingClientRect: {} as DOMRectReadOnly,
          intersectionRect: {} as DOMRectReadOnly,
          rootBounds: null,
          time: Date.now(),
        } as IntersectionObserverEntry,
      ];

      intersectionCallback(entries, mockIntersectionObserver);

      expect(mockElement.style.transitionDelay).toBe('200ms');
    });

    it('should not set delay when not specified in config', () => {
      const config: ScrollAnimationConfig = {
        duration: 500,
        easing: 'ease-out',
        threshold: 0.5,
        triggerOnce: true,
      };

      controller.registerScrollAnimation(mockElement, config);

      const entries: IntersectionObserverEntry[] = [
        {
          target: mockElement,
          isIntersecting: true,
          intersectionRatio: 0.6,
          boundingClientRect: {} as DOMRectReadOnly,
          intersectionRect: {} as DOMRectReadOnly,
          rootBounds: null,
          time: Date.now(),
        } as IntersectionObserverEntry,
      ];

      intersectionCallback(entries, mockIntersectionObserver);

      // transitionDelay should not be set or should be empty
      expect(mockElement.style.transitionDelay).toBeFalsy();
    });
  });

  describe('Intro Animation', () => {
    it('should have playIntroAnimation method', () => {
      expect(controller.playIntroAnimation).toBeDefined();
      expect(typeof controller.playIntroAnimation).toBe('function');
    });

    it('should return a promise from playIntroAnimation', async () => {
      const result = controller.playIntroAnimation();
      expect(result).toBeInstanceOf(Promise);
      await result;
    });
  });
});
