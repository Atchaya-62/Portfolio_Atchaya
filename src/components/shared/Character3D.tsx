import React, { useEffect, useRef, useState } from 'react';
import './Character3D.css';

interface Character3DProps {
  className?: string;
}

export const Character3D: React.FC<Character3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !isHovering) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Calculate rotation based on mouse position
      const rotateY = (deltaX / rect.width) * 30; // Max 30 degrees
      const rotateX = -(deltaY / rect.height) * 30; // Max 30 degrees

      setRotation({ x: rotateX, y: rotateY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovering]);

  return (
    <div
      ref={containerRef}
      className={`character-3d-container ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setRotation({ x: 0, y: 0 });
      }}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      }}
    >
      {/* Personalized avatar */}
      <div className="avatar-character">
        {/* Hair */}
        <div className="avatar-hair">
          <div className="hair-wave left"></div>
          <div className="hair-wave right"></div>
        </div>

        {/* Head */}
        <div className="avatar-head">
          <div className="avatar-face">
            <div className="avatar-eyebrow left"></div>
            <div className="avatar-eyebrow right"></div>
            <div className="avatar-eye left"></div>
            <div className="avatar-eye right"></div>
            <div className="avatar-nose"></div>
            <div className="avatar-smile"></div>
          </div>
        </div>

        {/* Body - Red top */}
        <div className="avatar-body">
          <div className="avatar-torso"></div>
        </div>

        {/* Arms */}
        <div className="avatar-arm left">
          <div className="avatar-hand"></div>
        </div>
        <div className="avatar-arm right">
          <div className="avatar-hand"></div>
          <div className="avatar-watch"></div>
        </div>

        {/* Legs - Blue jeans */}
        <div className="avatar-legs">
          <div className="avatar-leg left"></div>
          <div className="avatar-leg right"></div>
        </div>
      </div>

      {/* Shadow */}
      <div className="character-shadow"></div>
    </div>
  );
};

export default Character3D;
