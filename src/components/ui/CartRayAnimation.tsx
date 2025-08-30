import React, { useEffect, useState, useRef } from 'react';
import { Sparkles, Star } from 'lucide-react';

interface CartRayAnimationProps {
  isAnimating: boolean;
  sourceElement?: HTMLElement | null;
  onAnimationComplete?: () => void;
}

interface StarParticle {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  delay: number;
  progress: number;
  scale: number;
  opacity: number;
  rotation: number;
  controlX: number; // For arc movement
  controlY: number;
}

const CartRayAnimation: React.FC<CartRayAnimationProps> = ({ 
  isAnimating, 
  sourceElement, 
  onAnimationComplete 
}) => {
  const [stars, setStars] = useState<StarParticle[]>([]);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (isAnimating && sourceElement && !prefersReducedMotion) {
      const rect = sourceElement.getBoundingClientRect();
      const sourceX = rect.left + rect.width / 2;
      const sourceY = rect.top + rect.height / 2;

      // Find cart icon with better targeting
      const cartSelectors = [
        'button[aria-label*="cart" i]',
        'button[aria-label*="Cart"]',
        '.cart-button',
        '[data-cart-button]',
        'button:has(svg[class*="ShoppingCart"])',
        'svg[class*="ShoppingCart"]',
        'button[class*="cart"]'
      ];

      let cartElement: Element | null = null;
      for (const selector of cartSelectors) {
        try {
          cartElement = document.querySelector(selector);
          if (cartElement) {
            if (cartElement.tagName === 'svg') {
              cartElement = cartElement.closest('button') || cartElement;
            }
            break;
          }
        } catch (e) {
          // Skip invalid selectors
          continue;
        }
      }

      if (!cartElement) {
        // Fallback: find any button with shopping cart text or icon
        const allButtons = document.querySelectorAll('button');
        cartElement = Array.from(allButtons).find(button => 
          button.innerHTML.toLowerCase().includes('cart') ||
          button.innerHTML.includes('ShoppingCart') ||
          button.querySelector('svg')?.outerHTML.includes('ShoppingCart')
        ) || null;
      }

      if (!cartElement) {
        console.log('Cart element not found for animation');
        return;
      }

      const cartRect = cartElement.getBoundingClientRect();
      const targetX = cartRect.left + cartRect.width / 2;
      const targetY = cartRect.top + cartRect.height / 2;

      // Create 8 star particles with arc movement
      const newStars: StarParticle[] = Array.from({ length: 8 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 8; // Spread stars in a circle initially
        const radius = 20;
        const startOffsetX = Math.cos(angle) * radius;
        const startOffsetY = Math.sin(angle) * radius;
        
        // Create arc control points for smooth curved movement
        const midX = (sourceX + targetX) / 2 + (Math.random() - 0.5) * 100;
        const midY = (sourceY + targetY) / 2 - 50 - Math.random() * 50; // Arc upward
        
        return {
          id: Date.now() + i,
          startX: sourceX + startOffsetX,
          startY: sourceY + startOffsetY,
          targetX,
          targetY,
          delay: i * 50, // Stagger the particles
          progress: 0,
          scale: 0.5 + Math.random() * 0.5,
          opacity: 1,
          rotation: Math.random() * 360,
          controlX: midX,
          controlY: midY
        };
      });

      setStars(newStars);
      startTimeRef.current = performance.now();
      
      // Start animation loop
      const animate = (currentTime: number) => {
        if (!startTimeRef.current) return;
        
        const elapsed = currentTime - startTimeRef.current;
        const duration = 1200; // 1.2 seconds
        
        if (elapsed >= duration) {
          setStars([]);
          onAnimationComplete?.();
          return;
        }

        setStars(prevStars => 
          prevStars.map(star => {
            const adjustedElapsed = Math.max(0, elapsed - star.delay);
            const progress = Math.min(adjustedElapsed / (duration - star.delay), 1);
            
            // Easing function for smooth animation
            const eased = 1 - Math.pow(1 - progress, 3); // Ease-out cubic
            
            // Calculate opacity (fade out near the end)
            const opacity = progress < 0.8 ? 1 : (1 - (progress - 0.8) / 0.2);
            
            // Calculate scale (shrink as it approaches target)
            const scale = star.scale * (1 - progress * 0.7);
            
            return {
              ...star,
              progress: eased,
              opacity,
              scale,
              rotation: star.rotation + elapsed * 0.5 // Gentle rotation
            };
          })
        );

        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    } else if (!isAnimating) {
      setStars([]);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [isAnimating, sourceElement, onAnimationComplete, prefersReducedMotion]);

  // Bezier curve calculation for smooth arc movement
  const calculatePosition = (star: StarParticle) => {
    const t = star.progress;
    const t2 = t * t;
    const mt = 1 - t;
    const mt2 = mt * mt;

    // Quadratic Bezier curve: B(t) = (1-t)²P₀ + 2(1-t)tP₁ + t²P₂
    const x = mt2 * star.startX + 2 * mt * t * star.controlX + t2 * star.targetX;
    const y = mt2 * star.startY + 2 * mt * t * star.controlY + t2 * star.targetY;

    return { x, y };
  };

  if (!isAnimating || stars.length === 0 || prefersReducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {stars.map((star) => {
        const { x, y } = calculatePosition(star);
        
        return (
          <div key={star.id} className="absolute">
            <Star 
              className="text-amber-400"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: `translate(-50%, -50%) scale(${star.scale}) rotate(${star.rotation}deg)`,
                opacity: star.opacity,
                width: '16px',
                height: '16px',
                filter: 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.8)) drop-shadow(0 0 12px rgba(255, 255, 255, 0.4))',
                pointerEvents: 'none'
              }}
              fill="currentColor"
            />
          </div>
        );
      })}
    </div>
  );
};

export default CartRayAnimation;