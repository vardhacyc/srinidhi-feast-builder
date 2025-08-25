import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber = "919994316559",
  message = "Hi! I'm interested in ordering Diwali sweets from Sri Nidhi. Could you please help me with the menu and pricing?",
  className = ""
}) => {
  const [bgStyle, setBgStyle] = useState('light');
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Detect background color and adjust button style
  useEffect(() => {
    const detectBackgroundColor = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Get elements at current scroll position - check multiple points
      const checkPoints = [
        { x: window.innerWidth - 100, y: window.innerHeight - 100 }, // Near button area
        { x: window.innerWidth / 2, y: window.innerHeight / 2 },     // Center
        { x: window.innerWidth - 50, y: window.innerHeight / 3 },    // Right side
      ];
      
      let detectedStyle = 'light';
      
      for (const point of checkPoints) {
        const elementsAtPoint = document.elementsFromPoint(point.x, point.y);
        
        for (const element of elementsAtPoint) {
          const computedStyle = window.getComputedStyle(element);
          const bgColor = computedStyle.backgroundColor;
          const bgImage = computedStyle.backgroundImage;
          const classList = Array.from(element.classList);
          
          // Check for Diwali-specific classes first
          if (classList.some(cls => 
            cls.includes('diwali') || 
            cls.includes('festive') || 
            cls.includes('hero')
          )) {
            // Check for specific Diwali color schemes
            if (classList.some(cls => 
              cls.includes('orange') || 
              cls.includes('red') || 
              cls.includes('warm') ||
              cls.includes('gradient')
            )) {
              detectedStyle = 'warm';
              break;
            } else if (classList.some(cls => 
              cls.includes('dark') || 
              cls.includes('purple') ||
              cls.includes('deep')
            )) {
              detectedStyle = 'dark';
              break;
            } else if (classList.some(cls => 
              cls.includes('gold') || 
              cls.includes('yellow') ||
              cls.includes('amber')
            )) {
              detectedStyle = 'yellow';
              break;
            }
          }
          
          // Check computed background colors
          if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
            const rgbMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            if (rgbMatch) {
              const [, r, g, b] = rgbMatch.map(Number);
              const brightness = (r * 299 + g * 587 + b * 114) / 1000;
              
              // Check for warm colors (orange, red tones)
              if (r > 180 && r > g * 1.2 && r > b * 1.2) {
                detectedStyle = 'warm';
                break;
              }
              
              // Check for golden/amber colors
              if (r > 200 && g > 180 && b < 100) {
                detectedStyle = 'yellow';
                break;
              }
              
              // Dark background
              if (brightness < 100) {
                detectedStyle = 'dark';
                break;
              }
              
              // Medium dark with warm tones
              if (brightness < 150 && (r > g || r > b)) {
                detectedStyle = 'warm';
                break;
              }
            }
          }
          
          // Check gradients
          if (bgImage.includes('gradient')) {
            if (bgImage.includes('orange') || bgImage.includes('red') || bgImage.includes('pink')) {
              detectedStyle = 'warm';
              break;
            } else if (bgImage.includes('purple') || bgImage.includes('dark')) {
              detectedStyle = 'dark';
              break;
            } else if (bgImage.includes('yellow') || bgImage.includes('gold') || bgImage.includes('amber')) {
              detectedStyle = 'yellow';
              break;
            }
          }
        }
        
        if (detectedStyle !== 'light') break;
      }
      
      setBgStyle(detectedStyle);
    };

    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
      detectBackgroundColor();
    };

    // Throttled scroll handler for performance
    let ticking = false;
    const throttledScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial setup
    handleScroll();
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    window.addEventListener('resize', detectBackgroundColor, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
      window.removeEventListener('resize', detectBackgroundColor);
    };
  }, []);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  // Dynamic styling based on detected background
  const getButtonStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      transform: `scale(${isHovered ? 1.1 : 1}) ${isClicked ? 'scale(0.95)' : ''}`,
      opacity: isVisible ? 1 : 0,
      visibility: (isVisible ? 'visible' : 'hidden') as 'visible' | 'hidden',
    };

    switch (bgStyle) {
      case 'dark':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          color: '#ffffff',
        };
      case 'warm':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderColor: 'rgba(255, 255, 255, 0.25)',
          color: '#ffffff',
        };
      case 'yellow':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          borderColor: 'rgba(0, 0, 0, 0.15)',
          color: '#1f2937',
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: 'rgba(37, 211, 102, 0.9)',
          borderColor: 'rgba(37, 211, 102, 0.3)',
          color: '#ffffff',
        };
    }
  };

  return (
    <>
      <style>{`
        @keyframes whatsapp-pulse {
          0%, 100% {
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 0 rgba(37, 211, 102, 0.3);
          }
          50% {
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15), 0 0 0 8px rgba(37, 211, 102, 0.1);
          }
        }

        @keyframes whatsapp-ripple {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        @keyframes whatsapp-glow {
          0%, 100% {
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
          }
          50% {
            filter: drop-shadow(0 4px 12px rgba(37, 211, 102, 0.3));
          }
        }

        .whatsapp-float {
          position: fixed;
          bottom: 25px;
          right: 25px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: whatsapp-pulse 3s ease-in-out infinite;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
          outline: none;
          overflow: hidden;
        }

        .whatsapp-float:focus-visible {
          outline: 2px solid #25D366;
          outline-offset: 3px;
        }

        .whatsapp-float::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border-radius: 50%;
          background: linear-gradient(45deg, rgba(37, 211, 102, 0.2), rgba(37, 211, 102, 0.05));
          transform: scale(0);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: -1;
        }

        .whatsapp-float:hover::before {
          transform: scale(1);
        }

        .whatsapp-float:active::before {
          animation: whatsapp-ripple 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .whatsapp-icon {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          animation: whatsapp-glow 2s ease-in-out infinite;
          z-index: 1;
        }

        .whatsapp-float:hover {
          transform: translateY(-2px) scale(1.05);
        }

        .whatsapp-float:hover .whatsapp-icon {
          transform: rotate(-8deg) scale(1.1);
        }

        .whatsapp-float:active {
          transform: translateY(0) scale(0.95);
        }

        /* Enhanced mobile optimizations */
        @media (max-width: 768px) {
          .whatsapp-float {
            bottom: 20px;
            right: 20px;
            width: 56px;
            height: 56px;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .whatsapp-float {
            width: 64px;
            height: 64px;
            bottom: 24px;
            right: 24px;
          }
          
          .whatsapp-float:hover {
            transform: none;
          }
          
          .whatsapp-float:active {
            transform: scale(0.9);
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .whatsapp-float {
            border-width: 2px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .whatsapp-float {
            animation: none;
            transition: opacity 0.3s ease, transform 0.2s ease;
          }
          
          .whatsapp-float:hover .whatsapp-icon {
            transform: none;
          }
          
          .whatsapp-icon {
            animation: none;
          }
        }
      `}</style>

      <button
        className={`whatsapp-float ${className}`}
        style={getButtonStyle()}
        onClick={handleClick}
        onKeyPress={handleKeyPress}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Contact us on WhatsApp for Diwali sweet orders"
        title="Chat with us on WhatsApp"
        tabIndex={0}
      >
        <MessageCircle 
          className="whatsapp-icon" 
          size={24}
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>
    </>
  );
};

export default FloatingWhatsApp;
