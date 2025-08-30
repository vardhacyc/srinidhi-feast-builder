import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface CartRayAnimationProps {
  isAnimating: boolean;
  sourceElement?: HTMLElement | null;
  onAnimationComplete?: () => void;
}

interface Ray {
  id: number;
  startX: number;
  startY: number;
  deltaX: number;
  deltaY: number;
  delay: number;
}

const CartRayAnimation: React.FC<CartRayAnimationProps> = ({ 
  isAnimating, 
  sourceElement, 
  onAnimationComplete 
}) => {
  const [rays, setRays] = useState<Ray[]>([]);

  useEffect(() => {
    if (isAnimating && sourceElement) {
      const rect = sourceElement.getBoundingClientRect();
      const sourceX = rect.left + rect.width / 2;
      const sourceY = rect.top + rect.height / 2;

      // Find cart icon position
      const cartElement = document.querySelector('.desktop-cart-container button, .md\\:hidden .relative button[aria-label*="Cart"]');
      if (!cartElement) return;
      
      const cartRect = cartElement.getBoundingClientRect();
      const cartX = cartRect.left + cartRect.width / 2;
      const cartY = cartRect.top + cartRect.height / 2;

      // Calculate direction vector from source to cart
      const deltaX = cartX - sourceX;
      const deltaY = cartY - sourceY;

      // Create multiple rays with different delays
      const newRays = Array.from({ length: 3 }, (_, i) => ({
        id: Date.now() + i,
        startX: sourceX,
        startY: sourceY,
        deltaX,
        deltaY,
        delay: i * 80
      }));

      setRays(newRays);

      // Clear rays after animation
      const timer = setTimeout(() => {
        setRays([]);
        onAnimationComplete?.();
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [isAnimating, sourceElement, onAnimationComplete]);

  if (!isAnimating || rays.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {rays.map((ray) => (
        <div key={ray.id}>
          <Sparkles 
            className="absolute w-4 h-4 text-yellow-400"
            style={{
              left: `${ray.startX}px`,
              top: `${ray.startY}px`,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${ray.delay}ms`,
              animation: `rayToCart 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
              '--target-x': `${ray.deltaX}px`,
              '--target-y': `${ray.deltaY}px`
            } as React.CSSProperties}
          />
        </div>
      ))}
    </div>
  );
};

export default CartRayAnimation;