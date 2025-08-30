import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface CartRayAnimationProps {
  isAnimating: boolean;
  sourceElement?: HTMLElement | null;
  onAnimationComplete?: () => void;
}

const CartRayAnimation: React.FC<CartRayAnimationProps> = ({ 
  isAnimating, 
  sourceElement, 
  onAnimationComplete 
}) => {
  const [rays, setRays] = useState<Array<{ id: number; startX: number; startY: number; delay: number }>>([]);

  useEffect(() => {
    if (isAnimating && sourceElement) {
      const rect = sourceElement.getBoundingClientRect();
      const sourceX = rect.left + rect.width / 2;
      const sourceY = rect.top + rect.height / 2;

      // Create multiple rays with different delays
      const newRays = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now() + i,
        startX: sourceX,
        startY: sourceY,
        delay: i * 100
      }));

      setRays(newRays);

      // Clear rays after animation
      const timer = setTimeout(() => {
        setRays([]);
        onAnimationComplete?.();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isAnimating, sourceElement, onAnimationComplete]);

  if (!isAnimating || rays.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {rays.map((ray) => (
        <div key={ray.id}>
          <Sparkles 
            className="absolute w-4 h-4 text-yellow-400 animate-ray-to-cart"
            style={{
              left: `${ray.startX}px`,
              top: `${ray.startY}px`,
              animationDelay: `${ray.delay}ms`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default CartRayAnimation;