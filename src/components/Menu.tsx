
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
    <section id="menu" className="section-spacing bg-bg-neutral">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-10 text-balance">
            Our{' '}
            <span className="relative inline-block">
              <ScribbleUnderline variant="wavy" delay={1.2} color="#464646">
                <span className="text-gradient">Menu</span>
              </ScribbleUnderline>
              {/* Enhanced underline effect */}
              <div className="absolute -bottom-3 left-0 w-full h-5 bg-gradient-to-r from-accent/40 via-primary/60 to-gold/40 transform rotate-1 rounded-lg blur-sm"></div>
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed text-balance">
            Authentic South Indian flavors with modern presentation and competitive pricing
          </p>
          <div className="divider-elegant max-w-md mx-auto"></div>
        </div>

        {/* Enhanced Signature Dishes Gallery */}
        <div className="mb-32 card-elevated bg-white p-16 border-2 border-primary/20">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 text-balance">
              Signature <span className="text-gradient">Dishes</span>
            </h3>
            <p className="text-lg text-gray-700 text-balance">Our most loved traditional preparations</p>
            <div className="divider-elegant max-w-sm mx-auto"></div>
          </div>
          
          <div className="grid-cards">
            <div className="group relative overflow-hidden card-elevated hover:scale-105 transition-all duration-300">
              <img 
                src="/a3_demo.jpg" 
                alt="Traditional South Indian Thali - Sri Nidhi Catering"
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h4 className="font-bold text-xl mb-2 text-balance">Traditional Thali</h4>
                <p className="text-base opacity-90 text-balance">₹120 per plate</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden card-elevated hover:scale-105 transition-all duration-300">
              <img 
                src="/a2.jpg" 
                alt="Vegetable Biryani - Sri Nidhi Catering"
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h4 className="font-bold text-xl mb-2 text-balance">Vegetable Biryani</h4>
                <p className="text-base opacity-90 text-balance">₹80 per plate</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden card-elevated hover:scale-105 transition-all duration-300">
              <img 
                src="/a4_outdoor.jpg" 
                alt="Live Counter Setup - Sri Nidhi Catering"
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h4 className="font-bold text-xl mb-2 text-balance">Live Counters</h4>
                <p className="text-base opacity-90 text-balance">Interactive Experience</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden card-elevated hover:scale-105 transition-all duration-300">
              <img 
                src="/a1_award.jpg" 
                alt="Award-Winning Preparations - Sri Nidhi Catering"
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h4 className="font-bold text-xl mb-2 text-balance">Award Winners</h4>
                <p className="text-base opacity-90 text-balance">Excellence Recognized</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Category tabs */}
        <div className="flex flex-wrap justify-center gap-6 mb-20">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-4 px-10 py-5 rounded-xl font-black text-lg transition-all transform ${
                activeCategory === category.id
                  ? 'btn-primary-modern shadow-2xl scale-105'
                  : 'btn-secondary-modern bg-white text-gray-700 hover:bg-primary/10 hover:scale-102 border-2 border-primary/20'
              }`}
            >
              <category.icon className="h-7 w-7" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Enhanced Menu items */}
        <div className="grid-cards">
          {menuItems[activeCategory as keyof typeof menuItems].map((item, index) => (
            <div 
              key={index}
              className="card-elevated bg-white p-10 group border-2 border-primary/20 hover:border-primary/40"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-black text-gray-900 group-hover:text-primary transition-colors flex-1 mr-4 text-balance">
                  {item.name}
                </h3>
                <span className="text-3xl font-black text-primary bg-gradient-to-r from-accent/20 to-primary/20 px-6 py-3 rounded-xl shadow-sm">₹{item.rate}</span>
              </div>
              <p className="text-gray-700 mb-8 text-lg font-medium leading-relaxed text-balance">{item.description}</p>
              <div className="text-sm text-gray-500 font-semibold bg-gradient-to-r from-gray-100 to-gray-50 px-4 py-2 rounded-lg inline-block border border-gray-200">
                Per plate
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Note section */}
        <div className="text-center mt-24">
          <div className="card-elevated bg-white p-12 border-2 border-primary/20 max-w-2xl mx-auto mb-8">
            <p className="text-gray-700 mb-8 text-lg font-medium text-balance">
              * Prices may vary based on quantity and customization requirements
            </p>
            <button 
              onClick={() => {
                const element = document.querySelector('#calculator');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary-modern text-lg hover:scale-105 transition-all duration-300 shadow-xl"
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
