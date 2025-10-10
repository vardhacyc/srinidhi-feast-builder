import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Sparkles } from 'lucide-react';
import { useKovaiCart } from '../../contexts/KovaiCartContext';

const KovaiHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useKovaiCart();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 py-4 safe-area-mobile" style={{ paddingRight: '1.5rem' }}>
        <div className="flex justify-between items-center">
          {/* Premium Logo */}
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative">
              <img 
                src="/cateringLogo.png?v=2024" 
                alt="Kovai Caterers Logo" 
                className="h-12 w-12 object-contain cursor-pointer hover:scale-105 transition-transform"
              />
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-emerald-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-emerald-900">
                Kovai Caterers
              </h1>
              <p className="text-xs md:text-sm font-semibold text-emerald-700">
                Premium Sweets & Catering
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('sweets')}
              className="font-bold transition-all duration-300 hover:scale-105 text-emerald-900"
            >
              Collection
            </button>
            <div className="relative">
              <button
                onClick={() => scrollToSection('cart')}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-full font-bold shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                aria-label={`View Cart - ${getTotalItems()} items`}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Cart</span>
              </button>
              {getTotalItems() > 0 && (
                <span 
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
                  aria-label={`${getTotalItems()} items in cart`}
                  role="status"
                >
                  {getTotalItems()}
                </span>
              )}
            </div>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center justify-end space-x-3 pr-1">
            <div className="relative">
              <button
                onClick={() => scrollToSection('cart')}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-3 rounded-full flex items-center justify-center relative"
                style={{ minWidth: '48px', minHeight: '48px' }}
                aria-label={`View Cart - ${getTotalItems()} items`}
              >
                <ShoppingCart className="h-5 w-5" />
              </button>
              {getTotalItems() > 0 && (
                <span 
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                  style={{ minWidth: '18px', minHeight: '18px', fontSize: '10px', zIndex: 30 }}
                  aria-label={`${getTotalItems()} items in cart`}
                  role="status"
                >
                  {getTotalItems()}
                </span>
              )}
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center p-3 rounded-full hover:bg-emerald-100 transition-colors text-emerald-900" 
              style={{ minWidth: '48px', minHeight: '48px' }}
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-emerald-200">
            <button
              onClick={() => scrollToSection('sweets')}
              className="block w-full text-left font-bold py-2 transition-colors hover:scale-105 text-emerald-900"
            >
              Sweet Collection
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default KovaiHeader;
