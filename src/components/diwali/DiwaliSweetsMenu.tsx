import React, { useState } from 'react';
import { Plus, Leaf, Heart, Star } from 'lucide-react';
import { useCart, Sweet } from '../../contexts/CartContext';
import { Button } from '../ui/button';

const DiwaliSweetsMenu = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const sweetCategories = [
    { id: 'all', name: 'All Items', emoji: '🍯' },
    { id: 'diwali-sweets', name: 'Diwali Sweets', emoji: '🪔' },
    { id: 'ghee-sweets', name: 'Ghee Sweets', emoji: '🧈' },
    { id: 'special-ghee', name: 'Special Ghee', emoji: '👑' },
    { id: 'dryfruit', name: 'Dryfruit', emoji: '🌰' },
    { id: 'assorted', name: 'Assorted', emoji: '🎁' },
    { id: 'savouries', name: 'Savouries', emoji: '🥨' }
  ];

  const sweetsData: Sweet[] = [
    // Diwali Sweets Menu with Prices (₹600/kg)
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
      id: 'soan-papdi-ghee',
      name: 'Soan Papdi',
      description: 'Flaky, melt-in-mouth sweet made with pure ghee',
      price: 650,
      image: '/lovable-uploads/soan-papdi.png',
      category: 'ghee-sweets'
    },

    // Special Ghee Sweets (₹1400/kg)
    {
      id: 'cashew-cake',
      name: 'Cashew Cake',
      description: 'Premium cake-style sweet made with cashews and ghee',
      price: 1400,
      image: '/lovable-uploads/CashewCake.webp',
      category: 'special-ghee'
    },
    {
      id: 'gulkand-ball',
      name: 'Gulkand Ball',
      description: 'Rose petal preserve filled sweet balls',
      price: 1400,
      image: '/lovable-uploads/gulkand-ball.jpg',
      category: 'special-ghee'
    },
    {
      id: 'strawberry-pista-roll',
      name: 'Strawberry Pista Roll',
      description: 'Pistachio rolls with strawberry flavor',
      price: 1400,
      image: '/lovable-uploads/Strawberry-pista-Roll.webp',
      category: 'special-ghee'
    },
    {
      id: 'fig-roll',
      name: 'Fig Roll',
      description: 'Premium fig and nut rolls with ghee',
      price: 1400,
      image: '/placeholder-sweet.jpg',
      category: 'special-ghee'
    },
    {
      id: 'kaju-cassata',
      name: 'Kaju Cassata',
      description: 'Layered cashew sweet with multiple flavors',
      price: 1400,
      image: '/placeholder-sweet.jpg',
      category: 'special-ghee'
    },
    {
      id: 'kaju-anjeer-burfi',
      name: 'Kaju Anjeer Burfi',
      description: 'Cashew and fig fudge squares',
      price: 1400,
      image: '/placeholder-sweet.jpg',
      category: 'special-ghee'
    },
    {
      id: 'strawberry-choco-burfi',
      name: 'Strawberry Choco Burfi',
      description: 'Chocolate and strawberry flavored milk fudge',
      price: 1400,
      image: '/placeholder-sweet.jpg',
      category: 'special-ghee'
    },

    // Dryfruit Sweets
    {
      id: 'royal',
      name: 'Royal',
      description: 'Premium dry fruit sweet collection',
      price: 600,
      image: '/placeholder-sweet.jpg',
      category: 'dryfruit'
    },
    {
      id: 'supreme',
      name: 'Supreme',
      description: 'Superior quality dry fruit sweet assortment',
      price: 650,
      image: '/placeholder-sweet.jpg',
      category: 'dryfruit'
    },
    {
      id: 'grandeur',
      name: 'Grandeur',
      description: 'Luxurious dry fruit sweet collection',
      price: 1400,
      image: '/placeholder-sweet.jpg',
      category: 'dryfruit'
    },

    // Assorted Sweets
    {
      id: 'kc-special-mixture',
      name: 'KC Special Mixture',
      description: 'House special assorted sweet mixture',
      price: 400,
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
    <section id="sweets" className="relative py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <Star className="h-8 w-8 mr-2" style={{ color: 'hsl(var(--diwali-gold))' }} />
            <h2 className="text-4xl md:text-6xl font-bold diwali-text-gradient">
              Premium Collection
            </h2>
            <Star className="h-8 w-8 ml-2" style={{ color: 'hsl(var(--diwali-gold))' }} />
          </div>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'hsl(var(--diwali-text))' }}>
            Handcrafted with the finest ingredients and traditional recipes passed down through generations
          </p>
        </div>

        {/* Category Filters - Flowing Design */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {sweetCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'diwali-btn diwali-shadow-lg scale-105'
                  : 'diwali-glass-card hover:scale-105 diwali-shadow'
              }`}
              style={selectedCategory !== category.id ? { color: 'hsl(var(--diwali-text))' } : {}}
            >
              <span className="flex items-center space-x-2">
                <span>{category.emoji}</span>
                <span>{category.name}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Sweets Grid - Flowing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSweets.map((sweet, index) => (
            <div
              key={sweet.id}
              className="diwali-glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 diwali-shadow-lg group flex flex-col h-full"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-4 flex flex-col h-full">
                {/* Sweet Image */}
                <div className="relative w-full h-40 mb-3 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={sweet.image} 
                    alt={sweet.name}
                    className="w-full h-full object-cover diwali-glass-effect"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--diwali-cream)) 0%, hsl(var(--diwali-light)) 100%)',
                      boxShadow: 'inset 0 1px 3px hsl(var(--diwali-shadow) / 0.2)'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
                </div>
                
                {/* Sweet Info - Flexible content area */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-lg font-bold mb-2 text-center diwali-text-gradient line-clamp-2">
                    {sweet.name}
                  </h3>
                  <p className="text-sm mb-3 text-center leading-relaxed flex-1 line-clamp-3" style={{ color: 'hsl(var(--diwali-text))' }}>
                    {sweet.description}
                  </p>
                  
                  {/* Badges */}
                  <div className="flex justify-center gap-2 mb-3 min-h-[24px]">
                    {sweet.isVegan && (
                      <span className="diwali-badge px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <Leaf className="h-3 w-3" />
                        Vegan
                      </span>
                    )}
                    {sweet.isSugarFree && (
                      <span className="diwali-badge px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        Sugar Free
                      </span>
                    )}
                  </div>
                </div>

                {/* Price and Add to Cart - Fixed at bottom */}
                <div className="text-center space-y-3 mt-auto">
                  <div className="text-xl font-bold diwali-text-gradient">
                    ₹{sweet.price}
                    <span className="text-sm font-normal" style={{ color: 'hsl(var(--diwali-subtle))' }}>/kg</span>
                  </div>
                  <Button
                    onClick={() => addToCart(sweet)}
                    className="diwali-btn w-full font-semibold py-2.5 px-4 rounded-full transition-all duration-300 hover:scale-105 diwali-shadow text-sm flex items-center justify-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSweets.length === 0 && (
          <div className="text-center py-16">
            <div className="text-8xl mb-6 opacity-50">🍯</div>
            <p className="text-xl" style={{ color: 'hsl(var(--diwali-subtle))' }}>No sweets found in this category</p>
          </div>
        )}
      </div>

      {/* Top Wave Divider */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-20 rotate-180" style={{ color: 'hsl(var(--diwali-cream))' }}>
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
};

export default DiwaliSweetsMenu;