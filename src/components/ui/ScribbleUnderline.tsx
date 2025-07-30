import React, { useEffect, useState, useRef } from 'react';

interface ScribbleUnderlineProps {
  children: React.ReactNode;
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  delay?: number;
  variant?: 'wavy' | 'zigzag' | 'smooth' | 'rough';
  className?: string;
}

const ScribbleUnderline: React.FC<ScribbleUnderlineProps> = ({
  children,
  color = '#E1A200', // Deep Amber default color
  strokeWidth = 6,
  animationDuration = 1.2,
  delay = 0.3,
  variant = 'wavy',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Different scribble path variants for variety
  const scribblePaths = {
    wavy: "M10,22 C40,18 80,24 120,18 C150,14 180,26 220,16 C250,10 290,28 310,22",
    zigzag: "M10,20 L30,15 L50,25 L70,12 L90,22 L110,16 L130,24 L150,14 L170,20 L190,18 L210,26 L230,12 L250,22 L270,16 L290,24 L310,18",
    smooth: "M10,20 Q80,15 160,18 T310,20",
    rough: "M8,22 C25,19 42,25 58,18 C75,12 92,28 108,20 C125,14 142,24 158,17 C175,11 192,27 208,19 C225,13 242,25 258,18 C275,12 292,26 308,21"
  };

  // Intersection Observer to trigger animation when element comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add delay before starting animation
          setTimeout(() => {
            setIsVisible(true);
          }, delay * 1000);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of element is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div 
      ref={containerRef}
      className={`relative inline-block ${className}`}
    >
      {/* Text content */}
      {children}
      
      {/* Animated scribble underline SVG */}
      <svg 
        className="absolute left-0 right-0 w-full pointer-events-none z-10"
        style={{ 
          bottom: '-8px',
          height: '32px'
        }}
        viewBox="0 0 320 32" 
        preserveAspectRatio="none"
      >
        <path 
          d={scribblePaths[variant]}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: '400',
            strokeDashoffset: isVisible ? '0' : '400',
            transition: `stroke-dashoffset ${animationDuration}s cubic-bezier(0.4,0,0.2,1)`
          }}
        />
      </svg>
    </div>
  );
};

export default ScribbleUnderline;
