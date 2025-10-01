
import { useState } from 'react';
import { Coffee, Sun, Moon, Cookie, Cake } from 'lucide-react';
import ScribbleUnderline from '@/components/ui/ScribbleUnderline';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('breakfast');

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
      { name: 'Idli (3 pcs)', description: 'Soft steamed rice cakes served with sambar and chutneys', rate: 40 },
      { name: 'Dosa', description: 'Crispy rice crepe with potato filling', rate: 45 },
      { name: 'Vada (2 pcs)', description: 'Crispy lentil donuts with sambar and chutneys', rate: 35 },
      { name: 'Upma', description: 'Traditional South Indian semolina dish', rate: 30 },
      { name: 'Pongal', description: 'Comforting rice and lentil porridge', rate: 35 },
      { name: 'Poori with Curry', description: 'Fried bread with spiced potato curry', rate: 40 },
    ],
    lunch: [
      { name: 'South Indian Thali', description: 'Complete meal with rice, sambar, rasam, vegetables, and sweets', rate: 120 },
      { name: 'Curd Rice', description: 'Cooling rice with yogurt and traditional tempering', rate: 50 },
      { name: 'Sambar Rice', description: 'Flavorful lentil curry mixed with rice', rate: 60 },
      { name: 'Vegetable Biryani', description: 'Aromatic basmati rice with mixed vegetables', rate: 80 },
      { name: 'Lemon Rice', description: 'Tangy rice with curry leaves and peanuts', rate: 45 },
      { name: 'Variety Rice Combo', description: 'Choice of 3 different rice varieties', rate: 90 },
    ],
    dinner: [
      { name: 'Traditional Dinner', description: 'Complete dinner with rice, curry, dal, and sides', rate: 100 },
      { name: 'Chapati with Curry', description: 'Soft Indian bread with mixed vegetable curry', rate: 70 },
      { name: 'Biriyani Special', description: 'Premium biryani with raita and pickle', rate: 110 },
      { name: 'South Indian Combo', description: 'Rice with sambar, rasam, and seasonal vegetables', rate: 85 },
      { name: 'Parotta with Curry', description: 'Layered bread with spicy vegetable curry', rate: 75 },
      { name: 'Mini Meals', description: 'Light dinner with essential items', rate: 65 },
    ],
    snacks: [
      { name: 'Samosa (2 pcs)', description: 'Crispy triangular pastries with spiced filling', rate: 25 },
      { name: 'Bajji Combo', description: 'Mixed vegetable fritters with chutneys', rate: 35 },
      { name: 'Cutlet (2 pcs)', description: 'Potato and vegetable cutlets', rate: 30 },
      { name: 'Sundal', description: 'Spiced chickpea or lentil snack', rate: 20 },
      { name: 'Murukku', description: 'Traditional spiral-shaped snack', rate: 15 },
      { name: 'Mix Namkeen', description: 'Assorted savory snacks', rate: 25 },
    ],
    sweets: [
      { name: 'Gulab Jamun (2 pcs)', description: 'Sweet milk dumplings in sugar syrup', rate: 30 },
      { name: 'Rasagulla (2 pcs)', description: 'Spongy cottage cheese balls in syrup', rate: 25 },
      { name: 'Payasam', description: 'Traditional South Indian sweet pudding', rate: 40 },
      { name: 'Halwa', description: 'Rich semolina or carrot-based sweet', rate: 35 },
      { name: 'Mysore Pak', description: 'Buttery gram flour sweet', rate: 45 },
      { name: 'Laddu (2 pcs)', description: 'Round sweet balls with nuts', rate: 35 },
    ],
    beverages: [
      { name: 'Filter Coffee', description: 'Traditional South Indian filter coffee', rate: 15 },
      { name: 'Tea', description: 'Refreshing Indian spiced tea', rate: 12 },
      { name: 'Lassi', description: 'Cool yogurt-based drink', rate: 25 },
      { name: 'Buttermilk', description: 'Spiced churned yogurt drink', rate: 20 },
      { name: 'Fresh Lime Juice', description: 'Refreshing lime drink', rate: 18 },
      { name: 'Tender Coconut', description: 'Fresh coconut water', rate: 30 },
    ],
  };

  return (
    <section id="menu" className="relative py-24 overflow-hidden" style={{
      background: 'linear-gradient(135deg, #d97706 0%, #b45309 25%, #92400e 50%, #78350f 75%, #451a03 100%)'
    }}>
      {/* Vibrant Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-300/30 via-yellow-500/40 to-amber-600/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(255,255,255,0.20)_20%,transparent_50%),radial-gradient(circle_at_60%_60%,rgba(255,255,255,0.18)_20%,transparent_50%)]"></div>
      </div>
      {/* Elegant floating background elements */}
      <div className="absolute inset-0 opacity-8">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-ethereal-drift"
            style={{
              left: `${20 + i * 25}%`,
              top: `${15 + i * 20}%`,
              animationDelay: `${i * 3}s`,
              animationDuration: `${12 + i * 2}s`
            }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-amber-200 to-yellow-300 rounded-full opacity-25"></div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="font-display text-5xl md:text-6xl font-black mb-8 text-white drop-shadow-lg">
            Our{' '}
            <span className="relative inline-block">
              <ScribbleUnderline variant="wavy" delay={1.2} color="#ffffff">
                <span className="text-yellow-200">Menu</span>
              </ScribbleUnderline>
              {/* Hand-drawn yellow underline effect */}
              <div className="absolute -bottom-2 left-0 w-full h-4 bg-yellow-300 opacity-80 transform rotate-1 rounded-lg"></div>
            </span>
          </h2>
          <p className="text-xl text-yellow-100 max-w-4xl mx-auto font-medium leading-relaxed drop-shadow">
            Authentic South Indian flavors with modern presentation and competitive pricing
          </p>
        </div>

        {/* Signature Dishes Gallery */}
        <div className="mb-20 bg-white rounded-3xl p-12 shadow-xl border-2 border-primary/20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-black text-gray-900 mb-4">
              Signature <span className="text-primary">Dishes</span>
            </h3>
            <p className="text-lg text-gray-700">Our most loved traditional preparations</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <img 
                src="/a3_demo.jpg" 
                alt="Traditional South Indian Thali - Sri Nidhi Catering"
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h4 className="font-bold text-lg">Traditional Thali</h4>
                <p className="text-sm opacity-90">₹120 per plate</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <img 
                src="/a2.jpg" 
                alt="Vegetable Biryani - Sri Nidhi Catering"
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h4 className="font-bold text-lg">Vegetable Biryani</h4>
                <p className="text-sm opacity-90">₹80 per plate</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <img 
                src="/a4_outdoor.jpg" 
                alt="Live Counter Setup - Sri Nidhi Catering"
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h4 className="font-bold text-lg">Live Counters</h4>
                <p className="text-sm opacity-90">Interactive Experience</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <img 
                src="/a1_award.jpg" 
                alt="Award-Winning Preparations - Sri Nidhi Catering"
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h4 className="font-bold text-lg">Award Winners</h4>
                <p className="text-sm opacity-90">Excellence Recognized</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category tabs with vibrant styling */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-3 px-8 py-4 rounded-xl font-black text-lg transition-all transform ${
                activeCategory === category.id
                  ? 'btn-gradient-primary shadow-2xl scale-105'
                  : 'bg-white text-gray-700 hover:bg-primary/10 shadow-lg hover:scale-102 border-2 border-primary/20'
              }`}
            >
              <category.icon className="h-6 w-6" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Menu items with bold styling */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems[activeCategory as keyof typeof menuItems].map((item, index) => (
            <div 
              key={index}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-yellow-300/50 hover:border-yellow-300 group hover:-translate-y-2"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-enhanced-contrast text-2xl font-black mb-2 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="description-enhanced text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>
                <div className="ml-6 text-right">
                  <span className="price-enhanced text-2xl font-black">
                    ₹{item.rate}
                  </span>
                  <div className="text-sm text-gray-500 font-semibold bg-gray-100 px-3 py-1 rounded-lg inline-block mt-2">
                    Per plate
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note section with vibrant styling */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-primary/20 max-w-2xl mx-auto mb-8">
            <p className="text-gray-700 mb-6 text-lg font-medium">
              * Prices may vary based on quantity and customization requirements
            </p>
            <button 
              onClick={() => {
                const element = document.querySelector('#calculator');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-gradient-multicolor px-10 py-4 rounded-xl font-black text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Calculate Your Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
