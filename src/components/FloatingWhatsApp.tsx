import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber = '918760101010',
  message = 'Hi! I would like to know more about your Diwali sweets collection.',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const bubbleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show button after 1 second
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    // Create large bubble burst animation with 3 directional bubbles
    const createBubbleBurst = () => {
      if (!bubbleContainerRef.current) return;
      
      const bubbleContainer = bubbleContainerRef.current;
      
      // Remove badge elements while preserving WhatsApp icon
      const button = bubbleContainer.parentElement;
      if (button) {
        // Only remove badge-specific elements, not the WhatsApp icon
        const badges = button.querySelectorAll('.notification-badge, .badge, [class*="badge"]:not(.whatsapp-icon), [class*="notification"]:not(.whatsapp-icon)');
        badges.forEach(badge => {
          // Double-check we're not removing the WhatsApp icon
          if (!badge.classList.contains('whatsapp-icon')) {
            badge.remove();
          }
        });
        
        // Remove badge-related data attributes
        button.removeAttribute('data-badge');
        button.removeAttribute('data-notification');
        button.removeAttribute('data-count');
      }
      
      // Clear existing bubbles
      bubbleContainer.innerHTML = '';

      // Create exactly 3 large bubbles with specific movements
      for (let i = 0; i < 3; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        // Add WhatsApp icon to bubble
        bubble.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.687"/>
          </svg>
        `;

        bubbleContainer.appendChild(bubble);
      }

      // Remove bubbles after animation completes
      setTimeout(() => {
        if (bubbleContainer) {
          bubbleContainer.innerHTML = '';
        }
      }, 4000);
    };

    // Trigger bubble burst every 18 seconds (slower synchronized with color cycle)
    const bubbleInterval = setInterval(() => {
      // Only create bubbles when button is in green phase (16-17.4 seconds of 18-second cycle)
      setTimeout(createBubbleBurst, 16200);
    }, 18000);

    // Initial bubble burst after 17 seconds
    const initialBubble = setTimeout(createBubbleBurst, 17000);

    return () => {
      clearTimeout(visibilityTimer);
      clearInterval(bubbleInterval);
      clearTimeout(initialBubble);
    };
  }, []);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <style>{`
        /* Base button design with conditional pulsating animation */
        .whatsapp-float {
          position: fixed;
          bottom: 25px;
          right: 25px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #FFD700; /* Default yellow */
          border: 2px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 16px rgba(255, 215, 0, 0.2);
          transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          animation: color-cycle-with-pulse 18s infinite;
          z-index: 1000;
          overflow: visible;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'scale(1)' : 'scale(0.5)'};
          user-select: none;
          -webkit-tap-highlight-color: transparent;
          outline: none;
        }

        /* Remove notification badges while preserving WhatsApp icon */
        .whatsapp-float::after,
        .whatsapp-float::before,
        .whatsapp-float .notification-badge,
        .whatsapp-float .badge,
        .whatsapp-float [class*="badge"]:not(.whatsapp-icon),
        .whatsapp-float [class*="notification"]:not(.whatsapp-icon) {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
        }

        /* Ensure WhatsApp icon remains visible */
        .whatsapp-float .whatsapp-icon {
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
          z-index: 10 !important;
        }

        /* Color cycle with pulsating only when turning green and about to bubble */
        @keyframes color-cycle-with-pulse {
          /* Completely stable yellow periods (88.89% of the time) */
          0%, 88.89% {
            background: #FFD700;
            box-shadow: 0 4px 16px rgba(255, 215, 0, 0.2);
            transform: scale(1);
          }

          /* Start green transition with gentle pulsing (anticipation phase) */
          89.5% {
            background: #FFD700;
            box-shadow: 0 4px 16px rgba(255, 215, 0, 0.2);
            transform: scale(1.02);
          }
          90% {
            background: #25D366;
            box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4);
            transform: scale(1);
          }
          90.5% {
            background: #25D366;
            box-shadow: 0 6px 24px rgba(37, 211, 102, 0.5);
            transform: scale(1.05);
          }
          91% {
            background: #25D366;
            box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4);
            transform: scale(1);
          }

          /* Continue gentle pulsing during bubble period */
          93% {
            background: #25D366;
            box-shadow: 0 6px 24px rgba(37, 211, 102, 0.5);
            transform: scale(1.05);
          }
          94% {
            background: #25D366;
            box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4);
            transform: scale(1);
          }
          95.5% {
            background: #25D366;
            box-shadow: 0 6px 24px rgba(37, 211, 102, 0.5);
            transform: scale(1.05);
          }
          96.67% {
            background: #25D366;
            box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4);
            transform: scale(1);
          }

          /* Return to completely stable yellow */
          100% {
            background: #FFD700;
            box-shadow: 0 4px 16px rgba(255, 215, 0, 0.2);
            transform: scale(1);
          }
        }

        /* Hover interactions - clean without pulsing */
        .whatsapp-float:hover {
          transform: scale(1.08);
          box-shadow: 0 8px 32px rgba(255, 215, 0, 0.3);
        }

        .whatsapp-float:active,
        .whatsapp-float.clicked {
          transform: scale(0.98);
          transition: all 0.1s ease;
        }

        .whatsapp-float:focus-visible {
          outline: 2px solid #25D366;
          outline-offset: 3px;
        }

        /* Icon styling - clean and clear */
        .whatsapp-icon {
          color: white;
          width: 30px;
          height: 30px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.6, 1);
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
          z-index: 1;
        }

        .whatsapp-float:hover .whatsapp-icon {
          transform: scale(1.1);
        }

        /* Bubble container */
        .bubble-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          width: 1px;
          height: 1px;
        }

        /* Bubble animation */
        .bubble {
          position: absolute;
          width: 35px;
          height: 35px;
          background: #25D366;
          border-radius: 50%;
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 16px;
          box-shadow: 0 2px 8px rgba(37, 211, 102, 0.3);
        }

        /* Bubble 1 - Moves UP (unchanged) */
        .bubble:nth-child(1) {
          animation: gentle-bubble-up 4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @keyframes gentle-bubble-up {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.4);
          }
          40% {
            opacity: 0.95;
            transform: translate(-50%, -60px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -90px) scale(0.7);
          }
        }

        /* Bubble 2 - Moves DIAGONALLY UP-LEFT (corrected) */
        .bubble:nth-child(2) {
          animation: gentle-bubble-diagonal-left 4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          animation-delay: 0.4s;
        }

        @keyframes gentle-bubble-diagonal-left {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.4);
          }
          40% {
            opacity: 0.95;
            transform: translate(-80px, -60px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-110px, -90px) scale(0.7);
          }
        }

        /* Bubble 3 - Moves HORIZONTALLY LEFT (corrected) */
        .bubble:nth-child(3) {
          animation: gentle-bubble-left 4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          animation-delay: 0.8s;
        }

        @keyframes gentle-bubble-left {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.4);
          }
          40% {
            opacity: 0.95;
            transform: translate(-90px, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-130px, -50%) scale(0.7);
          }
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .whatsapp-float {
            bottom: 20px;
            right: 20px;
            width: 56px;
            height: 56px;
          }
          
          .whatsapp-icon {
            width: 24px;
            height: 24px;
          }
          
          .bubble {
            width: 28px;
            height: 28px;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .whatsapp-float:hover {
            transform: scale(1);
          }
          
          .whatsapp-float:active {
            transform: scale(0.95);
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .whatsapp-float {
            border-width: 3px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .whatsapp-float {
            animation: none !important;
            background: #25D366 !important;
            box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4) !important;
            transform: scale(1) !important;
          }
          
          .bubble {
            animation: none !important;
            display: none !important;
          }
        }
      `}</style>

      <button
        className={`whatsapp-float ${isClicked ? 'clicked' : ''} ${className}`}
        onClick={handleClick}
        aria-label="Contact us on WhatsApp for Diwali sweet orders"
        title="Chat with us on WhatsApp"
        type="button"
      >
        <MessageCircle className="whatsapp-icon" />
        <div ref={bubbleContainerRef} className="bubble-container" aria-hidden="true"></div>
      </button>
    </>
  );
};

export default FloatingWhatsApp;