import React, { useEffect, useRef } from 'react';

interface SilkProps {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
  className?: string;
}

export const Silk: React.FC<SilkProps> = ({
  speed = 1.9,
  scale = 1,
  color = '#8c69ab',
  noiseIntensity = 0.8,
  rotation = 0,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const size = Math.min(window.innerWidth, window.innerHeight, 1080);
    canvas.width = size;
    canvas.height = size;

    let time = 0;

    const drawSilk = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = (canvas.width / 2) * scale * 0.8;

      // Create gradient
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius
      );
      
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.5, `${color}80`);
      gradient.addColorStop(1, `${color}00`);

      // Draw flowing silk effect
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((rotation * Math.PI) / 180);

      for (let i = 0; i < 360; i += 2) {
        const angle = (i * Math.PI) / 180;
        const noise = Math.sin(time * speed + i * 0.1) * noiseIntensity;
        const r = radius * (1 + noise * 0.3);
        
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;

        ctx.beginPath();
        ctx.arc(x, y, 2 + noise * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Draw flowing waves
      for (let wave = 0; wave < 3; wave++) {
        ctx.beginPath();
        for (let i = 0; i <= 360; i += 5) {
          const angle = (i * Math.PI) / 180;
          const waveOffset = Math.sin(time * speed * 0.5 + i * 0.05 + wave) * 20 * noiseIntensity;
          const r = radius * (0.5 + wave * 0.2) + waveOffset;
          
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.strokeStyle = `${color}40`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.restore();

      time += 0.01;
      animationFrameRef.current = requestAnimationFrame(drawSilk);
    };

    drawSilk();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [speed, scale, color, noiseIntensity, rotation]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
};
