import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import CartRayAnimation from '../ui/CartRayAnimation';

const DiwaliHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems, isAnimating, animationSource } = useCart();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 diwali-glass border-b border-yellow-200/20 diwali-shadow">
      <div className="container mx-auto px-4 py-4 safe-area-mobile" style={{ paddingRight: '1.5rem' }}>
        <div className="flex justify-between items-center">
          {/* Premium Logo */}
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative">
              {/* High-quality logo matching main page */}
              <img 
                src="/cateringLogo.png?v=2024" 
                alt="Sri Nidhi Catering Logo" 
                className="h-12 w-12 object-contain logo-hover cursor-pointer"
              />
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-400 animate-sparkle" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold diwali-text-gradient">
                Sri Nidhi
              </h1>
              <p className="text-xs md:text-sm" style={{ color: 'hsl(var(--diwali-text))' }}>
                Premium Diwali Sweets
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('sweets')}
              className="font-medium transition-all duration-300 hover:scale-105"
              style={{ color: 'hsl(var(--diwali-text))' }}
            >
              Collection
            </button>
            <div className="relative desktop-cart-container">
              <button
                onClick={() => scrollToSection('cart')}
                className={`diwali-btn px-6 py-2 rounded-full font-bold diwali-shadow transition-all duration-300 hover:scale-105 flex items-center space-x-2 ${isAnimating ? 'animate-cart-bounce' : ''}`}
                aria-label={`View Cart - ${getTotalItems()} items`}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Cart</span>
              </button>
              {getTotalItems() > 0 && (
                <span 
                  className="cart-notification-badge"
                  aria-label={`${getTotalItems()} items in cart`}
                  role="status"
                >
                  {getTotalItems()}
                </span>
              )}
            </div>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-2 pr-2">
            <div className="relative">
              <button
                onClick={() => scrollToSection('cart')}
                className={`diwali-btn p-3 rounded-full flex items-center justify-center relative ${isAnimating ? 'animate-cart-bounce' : ''}`}
                style={{ minWidth: '52px', minHeight: '52px' }}
                aria-label={`View Cart - ${getTotalItems()} items`}
              >
                <ShoppingCart className="h-6 w-6" />
              </button>
              {getTotalItems() > 0 && (
                <span 
                  className="cart-notification-badge"
                  style={{ top: '-2px', right: '-2px', width: '20px', height: '20px', fontSize: '11px' }}
                  aria-label={`${getTotalItems()} items in cart`}
                  role="status"
                >
                  {getTotalItems()}
                </span>
              )}
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ color: 'hsl(var(--diwali-text))', minWidth: '48px', minHeight: '48px' }}
              className="flex items-center justify-center p-3 rounded-full hover:bg-yellow-200/20 transition-colors"
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-yellow-200/20">
            <button
              onClick={() => scrollToSection('sweets')}
              className="block w-full text-left font-medium py-2 transition-colors hover:scale-105"
              style={{ color: 'hsl(var(--diwali-text))' }}
            >
              Sweet Collection
            </button>
          </div>
        )}
      </div>
      
      {/* Cart Ray Animation */}
      <CartRayAnimation 
        isAnimating={isAnimating}
        sourceElement={animationSource}
      />
    </header>
  );
};

export default DiwaliHeader;