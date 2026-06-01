import { useState } from 'react';
import { Coffee, Sun, Moon, Cookie, Cake } from 'lucide-react';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('breakfast');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    { id: 'breakfast', label: 'Breakfast', icon: Sun },
    { id: 'lunch', label: 'Lunch', icon: Sun },
    { id: 'dinner', label: 'Dinner', icon: Moon },
    { id: 'snacks', label: 'Snacks', icon: Cookie },
    { id: 'sweets', label: 'Sweets', icon: Cake },
    { id: 'beverages', label: 'Beverages', icon: Coffee },
  ];

  const menuItems = {
    breakfast: [
      { name: 'Idli (3 pcs)', description: 'Soft steamed rice cakes with sambar and chutneys', rate: 40 },
      { name: 'Dosa', description: 'Crispy rice crepe with potato filling', rate: 45 },
      { name: 'Vada (2 pcs)', description: 'Crispy lentil donuts with sambar', rate: 35 },
      { name: 'Upma', description: 'Traditional South Indian semolina dish', rate: 30 },
      { name: 'Pongal', description: 'Comforting rice and lentil porridge', rate: 35 },
      { name: 'Poori with Curry', description: 'Fried bread with spiced potato curry', rate: 40 },
    ],
    lunch: [
      { name: 'South Indian Thali', description: 'Complete meal with rice, sambar, rasam, vegetables', rate: 120 },
      { name: 'Curd Rice', description: 'Cooling rice with yogurt and tempering', rate: 50 },
      { name: 'Sambar Rice', description: 'Flavorful lentil curry mixed with rice', rate: 60 },
      { name: 'Vegetable Biryani', description: 'Aromatic basmati rice with vegetables', rate: 80 },
    ],
    dinner: [
      { name: 'Traditional Dinner', description: 'Complete dinner with rice, curry, dal', rate: 100 },
      { name: 'Chapati with Curry', description: 'Soft Indian bread with vegetable curry', rate: 70 },
      { name: 'Biriyani Special', description: 'Premium biryani with raita and pickle', rate: 110 },
      { name: 'South Indian Combo', description: 'Rice with sambar, rasam, vegetables', rate: 85 },
    ],
    snacks: [
      { name: 'Samosa (2 pcs)', description: 'Crispy triangular pastries', rate: 25 },
      { name: 'Bajji Combo', description: 'Mixed vegetable fritters', rate: 35 },
      { name: 'Cutlet (2 pcs)', description: 'Potato and vegetable cutlets', rate: 30 },
      { name: 'Sundal', description: 'Spiced chickpea snack', rate: 20 },
    ],
    sweets: [
      { name: 'Gulab Jamun', description: 'Sweet milk dumplings in syrup', rate: 30 },
      { name: 'Payasam', description: 'Traditional sweet pudding', rate: 40 },
      { name: 'Mysore Pak', description: 'Buttery gram flour sweet', rate: 45 },
      { name: 'Laddu (2 pcs)', description: 'Round sweet balls with nuts', rate: 35 },
    ],
    beverages: [
      { name: 'Filter Coffee', description: 'Traditional South Indian coffee', rate: 15 },
      { name: 'Tea', description: 'Refreshing Indian spiced tea', rate: 12 },
      { name: 'Lassi', description: 'Cool yogurt-based drink', rate: 25 },
      { name: 'Buttermilk', description: 'Spiced churned yogurt drink', rate: 20 },
    ],
  };

  return (
    <section id="menu" className="relative py-24 overflow-hidden bg-[#0A0A0A]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 relative">
          {/* Mobile Menu Button (Three Dots) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="absolute right-0 top-1/2 -translate-y-1/2 block md:hidden mobile-menu-button"
            aria-label="Open menu"
          >
            <div className="h-5 w-5 flex flex-col space-y-1">
              <div className="h-0.5 w-3 bg-white"></div>
              <div className="h-0.5 w-3 bg-white"></div>
              <div className="h-0.5 w-3 bg-white"></div>
            </div>
          </button>

          {/* Section Header Content */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#C9A227]"></div>
            <span className="text-sm tracking-[0.3em] uppercase" style={{ color: '#C9A227' }}>
              Our Menu
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#C9A227]"></div>
          </div>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Taste of{' '}
            <span className="italic" style={{ color: '#C9A227' }}>India</span>
          </h2>
        </div>

        {/* Category Tabs (Desktop) */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 hidden md:block">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-light tracking-wide transition-all duration-300 ${activeCategory === category.id
                  ? 'text-black'
                  : 'text-white/60 hover:text-white border border-white/20 hover:border-white/40'
                }`}
              style={{
                background: activeCategory === category.id ? '#C9A227' : 'transparent',
              }}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute left-0 right-0 mt-2 bg-white border border-white/20 rounded-md shadow-lg z-10 w-full max-w-xs mx-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 border-b border-white/10 hover:bg-gray-50 transition-colors"
              >
                <category.icon className="w-4 h-4 mr-3 text-black" />
                <span className="text-black">{category.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {menuItems[activeCategory as keyof typeof menuItems].map((item, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl transition-all duration-300 hover:bg-white/5 border border-white/10 hover:border-[#C9A227]/30"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-light text-white group-hover:text-[#C9A227] transition-colors">
                  {item.name}
                </h3>
                <span className="text-lg font-light" style={{ color: '#C9A227' }}>
                  ₹{item.rate}
                </span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                {item.description}
              </p>
              <div className="mt-2 text-xs text-white/30 tracking-wide">
                Per Plate
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              const element = document.querySelector('#calculator');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-10 py-4 rounded-full font-light tracking-wide transition-all duration-300 hover:scale-105"
            style={{
              background: '#C9A227',
              color: '#0A0A0A',
            }}
          >
            Calculate Your Order
          </button>
        </div>
      </div>
    </section>
  );
};

export default Menu;