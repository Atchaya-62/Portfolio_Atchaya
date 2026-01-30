import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import './SpiderWebBackground.css';

interface WebNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const SpiderWebBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<WebNode[]>([]);
  const animationFrameRef = useRef<number>();
  const { theme } = useTheme();
  const [showTransition, setShowTransition] = useState(false);
  const prevThemeRef = useRef(theme);

  // Detect theme change to futuristic
  useEffect(() => {
    if (prevThemeRef.current !== 'futuristic' && theme === 'futuristic') {
      setShowTransition(true);
      setTimeout(() => setShowTransition(false), 2000);
    }
    prevThemeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize web anchor points for neural network
    const nodeCount = Math.floor((canvas.width * canvas.height) / 20000);
    nodesRef.current = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    // Draw realistic spider web from a corner
    const drawSpiderWeb = (centerX: number, centerY: number, radius: number, opacity: number = 1) => {
      const radialLines = 12;
      const spirals = 8;

      // Get theme colors
      const primaryColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary')
        .trim();
      const secondaryColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-secondary')
        .trim();

      // Draw radial lines (spokes)
      for (let i = 0; i < radialLines; i++) {
        const angle = (Math.PI * 2 * i) / radialLines;
        const endX = centerX + Math.cos(angle) * radius;
        const endY = centerY + Math.sin(angle) * radius;

        const gradient = ctx.createLinearGradient(centerX, centerY, endX, endY);
        gradient.addColorStop(0, `${primaryColor}${Math.floor(0.6 * opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${secondaryColor}${Math.floor(0.3 * opacity * 255).toString(16).padStart(2, '0')}`);

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      // Draw spiral connections
      for (let s = 1; s <= spirals; s++) {
        const spiralRadius = (radius / spirals) * s;
        ctx.beginPath();
        ctx.strokeStyle = `${primaryColor}${Math.floor((0.5 * opacity / s) * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 1.5;

        for (let i = 0; i <= radialLines; i++) {
          const angle = (Math.PI * 2 * i) / radialLines;
          const x = centerX + Math.cos(angle) * spiralRadius;
          const y = centerY + Math.sin(angle) * spiralRadius;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Draw center point
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
      ctx.fillStyle = `${primaryColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
      ctx.fill();
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Get theme colors
      const primaryColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary')
        .trim();
      const secondaryColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-secondary')
        .trim();

      if (theme === 'futuristic') {
        // Draw realistic spider webs in corners
        const webSize = Math.min(canvas.width, canvas.height) * 0.4;
        
        // Top-left web
        drawSpiderWeb(0, 0, webSize, 0.7);
        
        // Top-right web
        drawSpiderWeb(canvas.width, 0, webSize, 0.6);
        
        // Bottom-left web
        drawSpiderWeb(0, canvas.height, webSize, 0.6);
        
        // Bottom-right web
        drawSpiderWeb(canvas.width, canvas.height, webSize, 0.7);

        // Center web (smaller)
        drawSpiderWeb(canvas.width / 2, canvas.height / 2, webSize * 0.6, 0.5);
      } else {
        // Regular neural network for other themes
        nodesRef.current.forEach((node, i) => {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
          if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

          node.x = Math.max(0, Math.min(canvas.width, node.x));
          node.y = Math.max(0, Math.min(canvas.height, node.y));

          nodesRef.current.forEach((otherNode, j) => {
            if (i >= j) return;

            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
              const opacity = (1 - distance / 150) * 0.3;
              ctx.beginPath();
              ctx.strokeStyle = `${primaryColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
              ctx.lineWidth = 1;
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(otherNode.x, otherNode.y);
              ctx.stroke();
            }
          });

          ctx.beginPath();
          ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = primaryColor;
          ctx.fill();

          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 8);
          gradient.addColorStop(0, `${secondaryColor}80`);
          gradient.addColorStop(1, `${secondaryColor}00`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [theme]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="spider-web-background"
        aria-hidden="true"
      />
      {showTransition && (
        <div className="spider-web-transition" aria-hidden="true">
          <svg className="falling-web" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="webGradient">
                <stop offset="0%" stopColor="#E31B23" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#2B6CC4" stopOpacity="0.4" />
              </radialGradient>
            </defs>
            {/* Radial spokes */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (Math.PI * 2 * i) / 12;
              const x = 100 + Math.cos(angle) * 90;
              const y = 100 + Math.sin(angle) * 90;
              return (
                <line
                  key={`spoke-${i}`}
                  x1="100"
                  y1="100"
                  x2={x}
                  y2={y}
                  stroke="url(#webGradient)"
                  strokeWidth="2"
                />
              );
            })}
            {/* Spiral circles */}
            {Array.from({ length: 6 }).map((_, i) => (
              <circle
                key={`circle-${i}`}
                cx="100"
                cy="100"
                r={15 * (i + 1)}
                fill="none"
                stroke="#E31B23"
                strokeWidth="1.5"
                opacity={0.6 - i * 0.1}
              />
            ))}
            {/* Center */}
            <circle cx="100" cy="100" r="5" fill="#E31B23" stroke="#000" strokeWidth="1" />
          </svg>
        </div>
      )}
    </>
  );
};

export default SpiderWebBackground;
