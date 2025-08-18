import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Sparkles } from 'lucide-react';
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
    <header className="fixed top-0 left-0 right-0 z-50 premium-gradient glass-dark border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Premium Logo */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="text-3xl animate-pulse-glow">🪔</div>
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-primary animate-sparkle" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground text-shadow-gold">
                Sri Nidhi
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground">
                Premium Diwali Sweets
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('sweets')}
              className="text-foreground hover:text-primary font-medium transition-all duration-300 hover:scale-105"
            >
              Collection
            </button>
            <button
              onClick={() => scrollToSection('cart')}
              className="relative gold-gradient text-accent-foreground px-6 py-2 rounded-full font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-bounce">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => scrollToSection('cart')}
              className="relative gold-gradient text-accent-foreground p-2 rounded-full"
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
              className="text-foreground"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-white/10">
            <button
              onClick={() => scrollToSection('sweets')}
              className="block w-full text-left text-foreground hover:text-primary font-medium py-2 transition-colors"
            >
              Sweet Collection
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default DiwaliHeader;