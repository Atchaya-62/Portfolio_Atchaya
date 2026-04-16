import { useEffect, useRef, useState } from 'react';

interface InteractiveHeadingProps {
  text: string;
  className?: string;
  textColor?: string;
  minFontSize?: number;
  maxFontSize?: number;
}

const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const getScale = (distance: number, maxDist: number) => {
  const scale = 1 + (1 - Math.min(distance / maxDist, 1)) * 0.5;
  return Math.max(1, Math.min(scale, 1.5));
};

const InteractiveHeading: React.FC<InteractiveHeadingProps> = ({
  text,
  className = '',
  textColor,
  minFontSize = 32,
  maxFontSize = 48
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [fontSize, setFontSize] = useState(minFontSize);

  const chars = text.split('');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      mouseRef.current.x = t.clientX;
      mouseRef.current.y = t.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + width / 2;
      mouseRef.current.y = top + height / 2;
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const { width } = containerRef.current.getBoundingClientRect();
      const newSize = Math.min(maxFontSize, Math.max(minFontSize, width / (chars.length * 0.6)));
      setFontSize(newSize);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [chars.length, minFontSize, maxFontSize]);

  useEffect(() => {
    let rafId: number;

    const animate = () => {
      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2;

        spansRef.current.forEach(span => {
          if (!span) return;

          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2
          };

          const d = dist(mouseRef.current, charCenter);
          const scale = getScale(d, maxDist);
          
          span.style.transform = `scale(${scale})`;
          span.style.fontWeight = d < maxDist / 2 ? '700' : '400';
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-visible">
      <h2
        ref={titleRef}
        className={`${className} flex justify-center items-center uppercase text-center m-0`}
        style={{
          fontSize: `${fontSize}px`,
          color: textColor,
          fontWeight: 400,
          letterSpacing: '0.05em'
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={el => {
              spansRef.current[i] = el;
            }}
            className="inline-block transition-all duration-200 ease-out"
            style={{
              transformOrigin: 'center',
              display: 'inline-block',
              minWidth: char === ' ' ? '0.3em' : 'auto'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>
    </div>
  );
};

export default InteractiveHeading;
