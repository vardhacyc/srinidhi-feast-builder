import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

/**
 * FloatingCart component
 * Displays a floating cart icon above the WhatsApp button
 * Shows cart count badge when items are in cart
 */
const FloatingCart: React.FC = () => {
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  return (
    <>
      <style>{`
        /* Floating Cart Icon - positioned above WhatsApp button */
        .floating-cart {
          position: fixed;
          bottom: 95px; /* Above WhatsApp icon */
          right: 25px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          border: 2px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 16px rgba(245, 158, 11, 0.3);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 999;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: scale(0) translateY(20px);
          pointer-events: none;
        }

        .floating-cart.visible {
          opacity: 1;
          transform: scale(1) translateY(0);
          pointer-events: auto;
          animation: cart-appear 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes cart-appear {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(20px);
          }
          50% {
            transform: scale(1.1) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .floating-cart:hover {
          transform: scale(1.1) translateY(-2px);
          box-shadow: 0 8px 24px rgba(245, 158, 11, 0.4);
          background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%);
        }

        .floating-cart:active {
          transform: scale(0.95);
          transition: all 0.1s ease;
        }

        .cart-icon {
          color: white;
          width: 24px;
          height: 24px;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
        }

        /* Cart Count Badge */
        .cart-count-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #ef4444;
          color: white;
          border-radius: 50%;
          min-width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
          border: 2px solid white;
          z-index: 1;
          animation: badge-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes badge-pop {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        /* Pulse animation when badge updates */
        .cart-count-badge.updating {
          animation: badge-update 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes badge-update {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
            background: #dc2626;
          }
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .floating-cart {
            bottom: 90px;
            right: 20px;
            width: 52px;
            height: 52px;
          }

          .cart-icon {
            width: 22px;
            height: 22px;
          }

          .cart-count-badge {
            min-width: 22px;
            height: 22px;
            font-size: 11px;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .floating-cart,
          .cart-count-badge {
            animation: none !important;
            transition: opacity 0.2s ease !important;
          }

          .floating-cart.visible {
            animation: none;
          }

          .floating-cart:hover {
            transform: scale(1);
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .floating-cart {
            border-width: 3px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
          }

          .cart-count-badge {
            border-width: 3px;
          }
        }
      `}</style>

      <div
        id="floating-cart"
        className={`floating-cart ${cartCount > 0 ? 'visible' : ''}`}
        role="button"
        tabIndex={cartCount > 0 ? 0 : -1}
        aria-label={`Shopping cart with ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
        title={`Cart (${cartCount} item${cartCount !== 1 ? 's' : ''})`}
        onClick={() => {
          // Scroll to cart section for checkout
          const cartSection = document.getElementById('cart');
          if (cartSection) {
            cartSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            console.warn('Cart section not found');
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.currentTarget.click();
          }
        }}
      >
        <ShoppingCart className="cart-icon" />
        {cartCount > 0 && (
          <span 
            className="cart-count-badge"
            aria-live="polite"
            aria-atomic="true"
          >
            {cartCount}
          </span>
        )}
      </div>
    </>
  );
};

export default FloatingCart;
