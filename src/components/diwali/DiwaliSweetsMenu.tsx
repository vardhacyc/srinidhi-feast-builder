import React, { useState } from 'react';
import { Plus, Star, Sparkles, Crown, Leaf, Heart, Gift, Cookie } from 'lucide-react';
import { useCart, Sweet } from '../../contexts/CartContext';
import { Button } from '../ui/button';
import { DELIVERY_CONFIG } from '../../config/deliveryConfig';

const DiwaliSweetsMenu = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const sweetCategories = [
    { id: 'all', name: 'All Items', icon: Sparkles, color: 'text-amber-600' },
    { id: 'diwali-sweets', name: 'Diwali Sweets', icon: Star, color: 'text-orange-600' },
    { id: 'ghee-sweets', name: 'Ghee Sweets', icon: Heart, color: 'text-yellow-600' },
    { id: 'special-ghee', name: 'Special Ghee', icon: Crown, color: 'text-purple-600' },
    { id: 'dryfruit', name: 'Dryfruit', icon: Leaf, color: 'text-green-600' },
    { id: 'assorted', name: 'Assorted', icon: Gift, color: 'text-pink-600' },
    { id: 'savouries', name: 'Savouries', icon: Cookie, color: 'text-red-600' }
  ];

  // Helper function to calculate price with GST
  const calculatePriceWithGST = (basePrice: number, category: string) => {
    const gstRate = category === 'savouries' ? DELIVERY_CONFIG.gstRates.savouries : DELIVERY_CONFIG.gstRates.sweets;
    const gstAmount = (basePrice * gstRate) / 100;
    return {
      basePrice,
      gstRate,
      gstAmount: Math.round(gstAmount),
      finalPrice: Math.round(basePrice + gstAmount)
    };
  };

  const sweetsData: Sweet[] = [
    // Diwali Sweets Menu with Base Prices (GST will be added)
    {
      id: 'laddu',
      name: 'Laddu',
      description: 'Traditional round sweets made with flour, ghee and sugar',
      price: 600,
      image: '/lovable-uploads/ladoo.png',
      category: 'diwali-sweets'
    },
    {
      id: 'badhusha',
      name: 'Badhusha',
      description: 'Flaky, layered sweet pastry soaked in sugar syrup',
      price: 600,
      image: '/lovable-uploads/badusha.jpg',
      category: 'diwali-sweets'
    },
    {
      id: 'mysorepak',
      name: 'Mysorepak',
      description: 'Rich, buttery sweet from Karnataka made with ghee',
      price: 600,
      image: '/lovable-uploads/MysorePak.png',
      category: 'diwali-sweets'
    },
    {
      id: 'bombay-halwa',
      name: 'Bombay Halwa',
      description: 'Colorful, translucent sweet made with corn flour',
      price: 600,
      image: '/lovable-uploads/bombay_halwa.webp',
      category: 'diwali-sweets'
    },
    {
      id: 'gulkandh-burfi',
      name: 'Gulkandh Burfi',
      description: 'Rose petal preserve flavored milk fudge squares',
      price: 600,
      image: '/lovable-uploads/3f9c1eba-d27c-4ca8-bff6-452efdb026dd.png',
      category: 'diwali-sweets'
    },

    // Ghee Sweets (₹650/kg)
    {
      id: 'special-laddu',
      name: 'Special Laddu',
      description: 'Premium laddus made with pure ghee and finest ingredients',
      price: 650,
      image: '/lovable-uploads/ladoo.png',
      category: 'ghee-sweets'
    },
    {
      id: 'carrot-mysore-pak',
      name: 'Carrot Mysore Pak',
      description: 'Traditional Mysore Pak enhanced with fresh carrots',
      price: 650,
      image: '/lovable-uploads/CarrotMysorePak.webp',
      category: 'ghee-sweets'
    },
    {
      id: 'dry-fruit-halwa',
      name: 'Dry Fruit Halwa',
      description: 'Rich halwa loaded with assorted dry fruits and ghee',
      price: 650,
      image: '/lovable-uploads/DryFruitHalwa',
      category: 'ghee-sweets'
    },
    {
      id: 'besan-burfi',
      name: 'Besan Burfi',
      description: 'Classic gram flour fudge squares made with pure ghee',
      price: 650,
      image: '/lovable-uploads/BesanBurfi.jpg',
      category: 'ghee-sweets'
    },

    // Special Ghee (₹700/kg)
    {
      id: 'ghee-khoha-burfi',
      name: 'Ghee Khoha Burfi',
      description: 'Premium milk solid squares enriched with pure ghee',
      price: 700,
      image: '/lovable-uploads/ghee-khoha-burfi.jpg',
      category: 'special-ghee'
    },
    {
      id: 'ghee-burfi',
      name: 'Ghee Burfi',
      description: 'Rich, melt-in-mouth squares made with premium ghee',
      price: 700,
      image: '/lovable-uploads/ghee-burfi.jpg',
      category: 'special-ghee'
    },

    // Dryfruit (₹800/kg)
    {
      id: 'dryfruit-burfi',
      name: 'Dryfruit Burfi',
      description: 'Luxurious squares packed with premium nuts and dry fruits',
      price: 800,
      image: '/lovable-uploads/dryfruit-burfi.jpg',
      category: 'dryfruit'
    },
    {
      id: 'dryfruit-laddu',
      name: 'Dryfruit Laddu',
      description: 'Premium round sweets loaded with assorted dry fruits',
      price: 800,
      image: '/lovable-uploads/dryfruit-laddu.jpg',
      category: 'dryfruit'
    },

    // Assorted Sweets (Special Mix)
    {
      id: 'assorted-box-500g',
      name: 'Assorted Sweet Box (500g)',
      description: 'Curated selection of our finest sweets - perfect for gifting',
      price: 450,
      image: '/placeholder-sweet.jpg',
      category: 'assorted'
    },
    {
      id: 'assorted-box-1kg',
      name: 'Assorted Sweet Box (1kg)',
      description: 'Premium collection of assorted traditional sweets',
      price: 850,
      image: '/placeholder-sweet.jpg',
      category: 'assorted'
    },

    // Savouries
    {
      id: 'butter-murukku',
      name: 'Butter Murukku',
      description: 'Crispy spiral snacks made with butter',
      price: 400,
      image: '/lovable-uploads/butter-murukku.webp',
      category: 'savouries'
    },
    {
      id: 'ragi-pakoda',
      name: 'Ragi Pakoda',
      description: 'Healthy finger millet fritters',
      price: 400,
      image: '/lovable-uploads/RagiPakoda.jpg',
      category: 'savouries'
    },
    {
      id: 'ribbon-pakoda',
      name: 'Ribbon Pakoda',
      description: 'Ribbon-shaped crispy savory snacks',
      price: 400,
      image: '/lovable-uploads/ribbon-pakoda.jpg',
      category: 'savouries'
    },
    {
      id: 'assorted-bites-10',
      name: 'Assorted Bites (10 pcs)',
      description: 'Mixed savory bites - pack of 10 pieces',
      price: 350,
      image: '/placeholder-sweet.jpg',
      category: 'savouries'
    },
    {
      id: 'assorted-bites-25',
      name: 'Assorted Bites (25 pcs)',
      description: 'Mixed savory bites - pack of 25 pieces',
      price: 700,
      image: '/placeholder-sweet.jpg',
      category: 'savouries'
    }
  ];

  const filteredSweets = selectedCategory === 'all' 
    ? sweetsData 
    : sweetsData.filter(sweet => sweet.category === selectedCategory);

  return (
    <section 
      id="sweets" 
      className="relative py-20" 
      style={{
        background: 'linear-gradient(to bottom, #FDE68A 0%, #F9F3E7 100%)'
      }}
    >
      {/* Luxury Hero Section Container */}
      <div className="luxury-hero-section scroll-fade-in">
        
        {/* Premium Collection Hero Card */}
        <div className="premium-hero-card">
          <div className="glassmorphism-panel h-full p-8 flex flex-col justify-center">
            
            {/* Royal Emblem */}
            <div className="royal-emblem"></div>
            
            {/* Premium Content */}
            <div className="text-center">
              <h2 className="premium-headline">
                Premium Collection
              </h2>
              
              <p className="premium-tagline">
                Handcrafted with finest ingredients and traditional recipes
                <br />
                passed down through generations
              </p>
            </div>
          </div>
        </div>

        {/* Luxury Category Filters */}
        <div className="luxury-filters">
          {sweetCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={(e) => {
                  setSelectedCategory(category.id);
                  // Add ripple effect
                  const rect = e.currentTarget.getBoundingClientRect();
                  const ripple = document.createElement('span');
                  const size = Math.max(rect.width, rect.height);
                  const x = e.clientX - rect.left - size / 2;
                  const y = e.clientY - rect.top - size / 2;
                  
                  ripple.style.width = ripple.style.height = size + 'px';
                  ripple.style.left = x + 'px';
                  ripple.style.top = y + 'px';
                  ripple.classList.add('ripple');
                  
                  e.currentTarget.appendChild(ripple);
                  
                  setTimeout(() => {
                    ripple.remove();
                  }, 600);
                }}
                className={`luxury-pill ${
                  selectedCategory === category.id ? 'selected' : ''
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <IconComponent className="gold-icon" />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sweets Grid - Outside luxury section */}
      <div className="container mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredSweets.map((sweet) => {
            const priceInfo = calculatePriceWithGST(sweet.price, sweet.category);
            
            return (
              <div
                key={sweet.id}
                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={sweet.image}
                    alt={sweet.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-amber-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      <Star className="w-3 h-3 inline mr-1" />
                      Premium
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">
                    {sweet.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {sweet.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Base Price:</span>
                      <span className="font-medium">₹{priceInfo.basePrice}/kg</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">GST ({priceInfo.gstRate}%):</span>
                      <span className="font-medium">₹{priceInfo.gstAmount}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold text-amber-700 border-t pt-2">
                      <span>Final Price:</span>
                      <span>₹{priceInfo.finalPrice}/kg</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => addToCart(sweet)}
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSweets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No sweets found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DiwaliSweetsMenu;
