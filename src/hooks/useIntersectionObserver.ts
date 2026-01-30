import { useEffect, useRef, useState } from 'react';

/**
 * Hook to observe when an element enters/exits the viewport
 * @param options - IntersectionObserver options
 * @returns ref and isIntersecting state
 */
export function useIntersectionObserver<T extends HTMLElement>(
  options: IntersectionObserverInit = {}
) {
  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback: assume element is visible
      setIsIntersecting(true);
      return;
    }

    // Default options
    const defaultOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px',
      ...options,
    };

    // Create observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsIntersecting(entry.isIntersecting);
      });
    }, defaultOptions);

    // Observe the element
    observer.observe(element);

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin, options.root]);

  return { ref, isIntersecting };
}
