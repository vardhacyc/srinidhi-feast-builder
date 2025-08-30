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

      // Find cart icon position - more specific selectors for Diwali page
      const cartElement = document.querySelector('button[aria-label*="cart"], button[aria-label*="Cart"], .cart-button, [data-cart-button]') || 
                         document.querySelector('svg[class*="ShoppingCart"]')?.closest('button') ||
                         document.querySelector('button:has(svg[class*="ShoppingCart"])') ||
                         document.querySelector('.relative button[class*="items-center"]');
      
      console.log('Cart element found:', cartElement);
      if (!cartElement) {
        console.log('Cart element not found, looking for alternatives...');
        // Try to find any button with shopping cart icon
        const allButtons = document.querySelectorAll('button');
        const cartButton = Array.from(allButtons).find(button => 
          button.innerHTML.includes('ShoppingCart') || 
          button.querySelector('svg')?.classList.toString().includes('ShoppingCart') ||
          button.textContent?.toLowerCase().includes('cart')
        );
        console.log('Alternative cart button:', cartButton);
        if (!cartButton) return;
      }
      
      const finalCartElement = cartElement || document.querySelector('button');
      if (!finalCartElement) return;
      
      const cartRect = finalCartElement.getBoundingClientRect();
      const cartX = cartRect.left + cartRect.width / 2;
      const cartY = cartRect.top + cartRect.height / 2;

      console.log('Source position:', { sourceX, sourceY });
      console.log('Cart position:', { cartX, cartY });

      // Calculate direction vector from source to cart
      const deltaX = cartX - sourceX;
      const deltaY = cartY - sourceY;

      console.log('Delta:', { deltaX, deltaY });

      // Create multiple rays with different delays
      const newRays = Array.from({ length: 3 }, (_, i) => ({
        id: Date.now() + i,
        startX: sourceX,
        startY: sourceY,
        deltaX,
        deltaY,
        delay: i * 80
      }));

      console.log('Creating rays:', newRays);
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
            className="absolute w-5 h-5 text-amber-400 drop-shadow-lg"
            style={{
              left: `${ray.startX}px`,
              top: `${ray.startY}px`,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${ray.delay}ms`,
              animation: `rayToCart 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
              '--target-x': `${ray.deltaX}px`,
              '--target-y': `${ray.deltaY}px`,
              filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.8))'
            } as React.CSSProperties}
          />
        </div>
      ))}
    </div>
  );
};

export default CartRayAnimation;