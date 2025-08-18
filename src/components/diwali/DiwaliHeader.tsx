
import React, { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const DiwaliHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-food-yellow-500 via-secondary to-accent shadow-lg animate-diwali-glow">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="text-3xl animate-sparkle">🪔</div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">
                Sri Nidhi Diwali Sweets
              </h1>
              <p className="text-xs md:text-sm text-orange-100">
                Premium Festive Delights
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection('sweets')}
              className="text-white hover:text-orange-200 font-medium transition-colors"
            >
              Sweets Menu
            </button>
            <button
              onClick={() => scrollToSection('cart')}
              className="relative bg-white text-orange-600 px-4 py-2 rounded-full font-bold hover:bg-orange-100 transition-colors flex items-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => scrollToSection('cart')}
              className="relative bg-white text-orange-600 p-2 rounded-full"
            >
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-orange-400">
            <button
              onClick={() => scrollToSection('sweets')}
              className="block w-full text-left text-white hover:text-orange-200 font-medium py-2"
            >
              Sweets Menu
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default DiwaliHeader;
