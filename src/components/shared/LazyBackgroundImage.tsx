import { useState, useEffect, useRef, ReactNode } from 'react';

interface LazyBackgroundImageProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  role?: string;
  'aria-label'?: string;
}

/**
 * LazyBackgroundImage component that loads background images only when they enter the viewport
 * Uses Intersection Observer API for efficient lazy loading
 */
export const LazyBackgroundImage: React.FC<LazyBackgroundImageProps> = ({
  src,
  className = '',
  style = {},
  children,
  role,
  'aria-label': ariaLabel,
}) => {
  const [backgroundImage, setBackgroundImage] = useState<string>('none');
  const [isLoaded, setIsLoaded] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: load image immediately if IntersectionObserver is not supported
      setBackgroundImage(`url(${src})`);
      setIsLoaded(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Preload the image
            const img = new Image();
            img.onload = () => {
              setBackgroundImage(`url(${src})`);
              setIsLoaded(true);
            };
            img.src = src;

            if (divRef.current) {
              observer.unobserve(divRef.current);
            }
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before the element enters viewport
        threshold: 0.01,
      }
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, [src]);

  return (
    <div
      ref={divRef}
      className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
      style={{
        ...style,
        backgroundImage,
        transition: 'opacity 0.3s ease-in-out',
        opacity: isLoaded ? 1 : 0.7,
      }}
      role={role}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
};
