import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fc from 'fast-check';
import { AnimationController } from './animationController';
import type { ScrollAnimationConfig } from '../types';

/**
 * Property-Based Tests for Animation System
 * 
 * These tests verify universal properties that should hold true across all valid inputs
 * using the fast-check library for property-based testing.
 */

describe('Animation System - Property-Based Tests', () => {
  let controller: AnimationController;
  let mockIntersectionObserver: any;
  let intersectionCallback: IntersectionObserverCallback;

  beforeEach(() => {
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
    controller.destroy();
    vi.clearAllMocks();
  });

  /**
   * Property 2: Scroll Animation Triggers
   * **Validates: Requirements 2.3**
   * 
   * For any element with scroll-triggered animation, when that element enters the viewport,
   * the animation should be applied to the element.
   */
  describe('Property 2: Scroll Animation Triggers', () => {
    it('should apply animation to any element when it enters the viewport', () => {
      fc.assert(
        fc.property(
          // Generate random animation configurations
          fc.record({
            duration: fc.integer({ min: 100, max: 2000 }),
            easing: fc.constantFrom('ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'),
            delay: fc.option(fc.integer({ min: 0, max: 1000 }), { nil: undefined }),
            threshold: fc.double({ min: 0, max: 1 }),
            triggerOnce: fc.boolean(),
          }),
          // Generate random intersection ratio (element visibility)
          fc.double({ min: 0, max: 1 }),
          (config, intersectionRatio) => {
            // Create a test element
            const element = document.createElement('div');
            document.body.appendChild(element);

            try {
              // Register the element for scroll animation
              controller.registerScrollAnimation(element, config as ScrollAnimationConfig);

              // Simulate the element entering the viewport
              const entries: IntersectionObserverEntry[] = [
                {
                  target: element,
                  isIntersecting: true,
                  intersectionRatio,
                  boundingClientRect: {} as DOMRectReadOnly,
                  intersectionRect: {} as DOMRectReadOnly,
                  rootBounds: null,
                  time: Date.now(),
                } as IntersectionObserverEntry,
              ];

              // Trigger the intersection callback
              intersectionCallback(entries, mockIntersectionObserver);

              // PROPERTY: When element enters viewport, animation should be applied
              // Verify animation was applied by checking:
              // 1. Element has the 'animate-in' class
              expect(element.classList.contains('animate-in')).toBe(true);

              // 2. Element opacity is set to 1 (visible)
              expect(element.style.opacity).toBe('1');

              // 3. Element has transform applied
              expect(element.style.transform).toContain('translateY(0)');
              expect(element.style.transform).toContain('scale(1)');

              // 4. Element has transition with correct duration
              expect(element.style.transition).toContain(`${config.duration}ms`);

              // 5. Element has correct easing function
              expect(element.style.transition).toContain(config.easing);

              // 6. If delay is specified and greater than 0, it should be applied
              if (config.delay !== undefined && config.delay > 0) {
                expect(element.style.transitionDelay).toBe(`${config.delay}ms`);
              }
            } finally {
              // Cleanup
              if (element.parentNode) {
                document.body.removeChild(element);
              }
              controller.unregisterScrollAnimation(element);
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should not apply animation to any element when it is not intersecting', () => {
      fc.assert(
        fc.property(
          // Generate random animation configurations
          fc.record({
            duration: fc.integer({ min: 100, max: 2000 }),
            easing: fc.constantFrom('ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'),
            delay: fc.option(fc.integer({ min: 0, max: 1000 }), { nil: undefined }),
            threshold: fc.double({ min: 0, max: 1 }),
            triggerOnce: fc.boolean(),
          }),
          (config) => {
            // Create a test element
            const element = document.createElement('div');
            document.body.appendChild(element);

            try {
              // Register the element for scroll animation
              controller.registerScrollAnimation(element, config as ScrollAnimationConfig);

              // Simulate the element NOT intersecting (not in viewport)
              const entries: IntersectionObserverEntry[] = [
                {
                  target: element,
                  isIntersecting: false,
                  intersectionRatio: 0,
                  boundingClientRect: {} as DOMRectReadOnly,
                  intersectionRect: {} as DOMRectReadOnly,
                  rootBounds: null,
                  time: Date.now(),
                } as IntersectionObserverEntry,
              ];

              // Trigger the intersection callback
              intersectionCallback(entries, mockIntersectionObserver);

              // PROPERTY: When element is not in viewport, animation should NOT be applied
              // Verify animation was NOT applied by checking:
              // 1. Element does NOT have the 'animate-in' class
              expect(element.classList.contains('animate-in')).toBe(false);

              // 2. Element opacity is NOT set to 1
              expect(element.style.opacity).not.toBe('1');
            } finally {
              // Cleanup
              if (element.parentNode) {
                document.body.removeChild(element);
              }
              controller.unregisterScrollAnimation(element);
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should respect triggerOnce configuration for any element', () => {
      fc.assert(
        fc.property(
          // Generate random animation configurations with triggerOnce = true
          fc.record({
            duration: fc.integer({ min: 100, max: 2000 }),
            easing: fc.constantFrom('ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'),
            delay: fc.option(fc.integer({ min: 0, max: 1000 }), { nil: undefined }),
            threshold: fc.double({ min: 0, max: 1 }),
            triggerOnce: fc.constant(true), // Always true for this test
          }),
          (config) => {
            // Create a test element
            const element = document.createElement('div');
            document.body.appendChild(element);

            try {
              // Register the element for scroll animation
              controller.registerScrollAnimation(element, config as ScrollAnimationConfig);

              // First intersection - should trigger
              const entries: IntersectionObserverEntry[] = [
                {
                  target: element,
                  isIntersecting: true,
                  intersectionRatio: 0.6,
                  boundingClientRect: {} as DOMRectReadOnly,
                  intersectionRect: {} as DOMRectReadOnly,
                  rootBounds: null,
                  time: Date.now(),
                } as IntersectionObserverEntry,
              ];

              intersectionCallback(entries, mockIntersectionObserver);

              // PROPERTY: First trigger should apply animation
              expect(element.classList.contains('animate-in')).toBe(true);

              // Remove the class to test if it gets re-added
              element.classList.remove('animate-in');

              // Second intersection - should NOT trigger again (triggerOnce = true)
              intersectionCallback(entries, mockIntersectionObserver);

              // PROPERTY: When triggerOnce is true, animation should NOT be applied again
              expect(element.classList.contains('animate-in')).toBe(false);
            } finally {
              // Cleanup
              if (element.parentNode) {
                document.body.removeChild(element);
              }
              controller.unregisterScrollAnimation(element);
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should allow multiple triggers when triggerOnce is false for any element', () => {
      fc.assert(
        fc.property(
          // Generate random animation configurations with triggerOnce = false
          fc.record({
            duration: fc.integer({ min: 100, max: 2000 }),
            easing: fc.constantFrom('ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'),
            delay: fc.option(fc.integer({ min: 0, max: 1000 }), { nil: undefined }),
            threshold: fc.double({ min: 0, max: 1 }),
            triggerOnce: fc.constant(false), // Always false for this test
          }),
          (config) => {
            // Create a test element
            const element = document.createElement('div');
            document.body.appendChild(element);

            try {
              // Register the element for scroll animation
              controller.registerScrollAnimation(element, config as ScrollAnimationConfig);

              const entries: IntersectionObserverEntry[] = [
                {
                  target: element,
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
              expect(element.classList.contains('animate-in')).toBe(true);

              // Remove class
              element.classList.remove('animate-in');

              // Second trigger - should work because triggerOnce is false
              intersectionCallback(entries, mockIntersectionObserver);

              // PROPERTY: When triggerOnce is false, animation should be applied multiple times
              expect(element.classList.contains('animate-in')).toBe(true);
            } finally {
              // Cleanup
              if (element.parentNode) {
                document.body.removeChild(element);
              }
              controller.unregisterScrollAnimation(element);
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should skip animations when prefers-reduced-motion is enabled for any element', () => {
      fc.assert(
        fc.property(
          // Generate random animation configurations
          fc.record({
            duration: fc.integer({ min: 100, max: 2000 }),
            easing: fc.constantFrom('ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'),
            delay: fc.option(fc.integer({ min: 0, max: 1000 }), { nil: undefined }),
            threshold: fc.double({ min: 0, max: 1 }),
            triggerOnce: fc.boolean(),
          }),
          (config) => {
            // Mock matchMedia to return matches: true for reduced motion
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

            // Create a new controller with reduced motion enabled
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

            // Create a test element
            const element = document.createElement('div');
            document.body.appendChild(element);

            try {
              // Register the element for scroll animation
              reducedMotionController.registerScrollAnimation(element, config as ScrollAnimationConfig);

              // Simulate intersection
              const entries: IntersectionObserverEntry[] = [
                {
                  target: element,
                  isIntersecting: true,
                  intersectionRatio: 0.6,
                  boundingClientRect: {} as DOMRectReadOnly,
                  intersectionRect: {} as DOMRectReadOnly,
                  rootBounds: null,
                  time: Date.now(),
                } as IntersectionObserverEntry,
              ];

              reducedMotionCallback(entries, mockIntersectionObserver);

              // PROPERTY: When prefers-reduced-motion is enabled, animations should be simplified
              // Element should be visible but without animated transitions
              expect(element.style.opacity).toBe('1');
              expect(element.style.transform).toBe('none');
            } finally {
              // Cleanup
              if (element.parentNode) {
                document.body.removeChild(element);
              }
              reducedMotionController.destroy();
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
