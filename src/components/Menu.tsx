
import { useState } from 'react';
import { Coffee, Sun, Moon, Cookie, Cake } from 'lucide-react';

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
    <section id="menu" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our <span className="text-orange-600">Menu</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-red-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Authentic South Indian flavors with modern presentation and competitive pricing
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-orange-50 shadow-md'
              }`}
            >
              <category.icon className="h-5 w-5" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Menu items */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems[activeCategory as keyof typeof menuItems].map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                  {item.name}
                </h3>
                <span className="text-2xl font-bold text-orange-600">₹{item.rate}</span>
              </div>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="text-sm text-gray-500">
                Per plate
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            * Prices may vary based on quantity and customization requirements
          </p>
          <button 
            onClick={() => {
              const element = document.querySelector('#calculator');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Calculate Your Order
          </button>
        </div>
      </div>
    </section>
  );
};

export default Menu;
