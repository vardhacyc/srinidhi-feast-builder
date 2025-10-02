import { useCallback } from 'react';

/**
 * Custom hook for animating items flying to cart (Floating Cart button)
 * 
 * Usage:
 * const animateToCart = useCartFlyAnimation();
 * 
 * // In your click handler:
 * animateToCart(buttonElement, productImage);
 */
export const useCartFlyAnimation = () => {
  const animateToCart = useCallback((sourceButton: HTMLElement | EventTarget, imageSrc: string) => {
    // Get the floating cart icon position
    const cartIcon = document.getElementById('floating-cart');
    if (!cartIcon) {
      console.warn('Floating cart icon not found');
      return;
    }

    const targetRect = cartIcon.getBoundingClientRect();
    
    // Create a temporary flying element
    const flyingElement = document.createElement('img');
    flyingElement.src = imageSrc;
    flyingElement.className = 'flying-cart-item';
    flyingElement.style.cssText = `
      position: fixed;
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 8px;
      pointer-events: none;
      z-index: 9999;
      opacity: 0;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
      will-change: transform, opacity;
    `;
    
    document.body.appendChild(flyingElement);

    // Get the actual button position (the one that was clicked)
    let startRect: DOMRect;
    
    if (sourceButton && 'getBoundingClientRect' in sourceButton) {
      startRect = (sourceButton as HTMLElement).getBoundingClientRect();
    } else {
      // Fallback: use center of screen
      startRect = {
        left: window.innerWidth / 2,
        top: window.innerHeight / 2,
        width: 0,
        height: 0,
        right: window.innerWidth / 2,
        bottom: window.innerHeight / 2,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        toJSON: () => ({})
      } as DOMRect;
    }

    // Calculate start and end positions
    const startX = startRect.left + startRect.width / 2 - 30;
    const startY = startRect.top + startRect.height / 2 - 30;
    const targetCenterX = targetRect.left + targetRect.width / 2 - 30;
    const targetCenterY = targetRect.top + targetRect.height / 2 - 30;

    // Set initial position
    flyingElement.style.left = `${startX}px`;
    flyingElement.style.top = `${startY}px`;

    // Trigger reflow to ensure animation works
    flyingElement.offsetHeight;

    // Animate with parabolic arc using requestAnimationFrame
    const duration = 800; // ms
    const startTime = performance.now();
    
    // Calculate control points for Bezier curve (parabolic arc)
    const deltaX = targetCenterX - startX;
    const deltaY = targetCenterY - startY;
    const arcHeight = Math.min(150, Math.abs(deltaY) + 100); // Height of the arc
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth motion
      const easeProgress = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      // Calculate position along parabolic arc
      // X moves linearly
      const currentX = startX + (deltaX * easeProgress);
      
      // Y follows a parabolic path (arc upward then down)
      // Using quadratic bezier: B(t) = (1-t)²P0 + 2(1-t)tP1 + t²P2
      const controlY = startY - arcHeight; // Control point at top of arc
      const parabolicT = progress;
      const currentY = 
        Math.pow(1 - parabolicT, 2) * startY +
        2 * (1 - parabolicT) * parabolicT * controlY +
        Math.pow(parabolicT, 2) * targetCenterY;
      
      // Rotation increases as item flies
      const rotation = progress * 720; // Two full rotations
      
      // Scale decreases as it approaches cart
      const scale = 1 - (progress * 0.7); // From 1 to 0.3
      
      // Opacity fades out near the end
      const opacity = progress < 0.8 ? 1 : 1 - ((progress - 0.8) / 0.2);
      
      // Apply transformations
      flyingElement.style.left = `${currentX}px`;
      flyingElement.style.top = `${currentY}px`;
      flyingElement.style.transform = `rotate(${rotation}deg) scale(${scale})`;
      flyingElement.style.opacity = `${opacity}`;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    // Start animation
    requestAnimationFrame(() => {
      flyingElement.style.opacity = '1';
      requestAnimationFrame(() => animate(performance.now()));
    });

    // Animate the cart icon bounce
    cartIcon.style.animation = 'none';
    requestAnimationFrame(() => {
      cartIcon.style.animation = 'cart-bounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });

    // Update cart badge with pulse animation
    const cartBadge = cartIcon.querySelector('.cart-count-badge') as HTMLElement;
    if (cartBadge) {
      cartBadge.classList.remove('updating');
      requestAnimationFrame(() => {
        cartBadge.classList.add('updating');
      });
      
      // Remove the updating class after animation completes
      setTimeout(() => {
        cartBadge.classList.remove('updating');
      }, 600);
    }

    // Clean up the flying element after animation
    setTimeout(() => {
      if (document.body.contains(flyingElement)) {
        document.body.removeChild(flyingElement);
      }
      // Reset cart animation
      cartIcon.style.animation = '';
    }, 850);
  }, []);

  return animateToCart;
};

/**
 * Fallback animation for browsers without good CSS transition support
 * Uses Web Animations API if available
 */
export const animateToCartFallback = (
  sourceElement: HTMLElement,
  targetElement: HTMLElement,
  imageSrc?: string
) => {
  const sourceRect = sourceElement.getBoundingClientRect();
  const targetRect = targetElement.getBoundingClientRect();

  const flyingElement = document.createElement('div');
  flyingElement.style.position = 'fixed';
  flyingElement.style.left = `${sourceRect.left}px`;
  flyingElement.style.top = `${sourceRect.top}px`;
  flyingElement.style.width = '50px';
  flyingElement.style.height = '50px';
  flyingElement.style.zIndex = '99999';
  
  if (imageSrc) {
    flyingElement.innerHTML = `<img src="${imageSrc}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" alt="Product" />`;
  } else {
    flyingElement.innerHTML = '🛒';
    flyingElement.style.fontSize = '24px';
  }

  document.body.appendChild(flyingElement);

  // Check for Web Animations API support
  if (flyingElement.animate) {
    // Use Web Animations API
    flyingElement.animate(
      [
        {
          left: `${sourceRect.left}px`,
          top: `${sourceRect.top}px`,
          transform: 'scale(1)',
          opacity: 1,
        },
        {
          left: `${targetRect.left}px`,
          top: `${targetRect.top}px`,
          transform: 'scale(0.3)',
          opacity: 0,
        },
      ],
      {
        duration: 800,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }
    ).onfinish = () => {
      document.body.removeChild(flyingElement);
    };
  } else {
    // Fallback: just remove after a delay
    setTimeout(() => {
      document.body.removeChild(flyingElement);
    }, 800);
  }
};
