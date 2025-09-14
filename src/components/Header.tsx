
import { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#menu', label: 'Menu' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      {/* Top bar with contact info - Updated with new royal blue color */}
      <div className="bg-header-bar text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>8760101010</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>srinidhicatering10@gmail.com</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Continuing Kovai Catering's Premium Legacy in Coimbatore</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-white py-4 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {/* Catering Logo with enhanced hover zoom effect */}
            <img 
              src="/cateringLogo.png" 
              alt="Sri Nidhi Catering Logo" 
              className="h-16 w-16 object-contain logo-hover cursor-pointer"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Sri Nidhi Catering</h1>
              <p className="text-sm text-gray-600">Premium Catering Services</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-gray-700 hover:text-header-bar font-medium transition-colors"
              >
                {link.label}
              </button>
            ))}
            {/* Updated Book Now button with primary yellow */}
            <Button 
              onClick={() => scrollToSection('#contact')}
              className="bg-primary hover:bg-accent text-white px-6"
            >
              Book Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-gray-700 hover:text-header-bar font-medium text-left"
                >
                  {link.label}
                </button>
              ))}
              {/* Updated mobile Book Now button */}
              <Button 
                onClick={() => scrollToSection('#contact')}
                className="bg-primary hover:bg-accent text-white w-full"
              >
                Book Now
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
