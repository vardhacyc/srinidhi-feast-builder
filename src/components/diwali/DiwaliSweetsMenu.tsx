import React, { useState } from 'react';
import { Plus, Leaf, Heart, Star } from 'lucide-react';
import { useCart, Sweet } from '../../contexts/CartContext';
import { Button } from '../ui/button';

const DiwaliSweetsMenu = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const sweetCategories = [
    { id: 'all', name: 'All Sweets', emoji: '🍯' },
    { id: 'milk-based', name: 'Milk Based', emoji: '🥛' },
    { id: 'fried', name: 'Fried Delights', emoji: '🍥' },
    { id: 'dry-fruits', name: 'Dry Fruit Special', emoji: '🌰' },
    { id: 'regional', name: 'Regional Specials', emoji: '🏛️' }
  ];

  const sweetsData: Sweet[] = [
    // Milk-based sweets
    {
      id: 'rasgulla',
      name: 'Bengali Rasgulla',
      description: 'Soft, spongy cottage cheese balls in sugar syrup',
      price: 450,
      image: '/lovable-uploads/a7c240ca-9638-4f9a-b530-e2a2e1696347.png',
      category: 'milk-based'
    },
    {
      id: 'rasmalai',
      name: 'Rasmalai',
      description: 'Delicate cottage cheese dumplings in sweetened milk',
      price: 550,
      image: '/lovable-uploads/90e0608c-b5fa-480e-9dfa-0a8173cd3f7e.png',
      category: 'milk-based'
    },
    {
      id: 'kheer',
      name: 'Royal Kheer',
      description: 'Creamy rice pudding with nuts and cardamom',
      price: 350,
      image: '/lovable-uploads/3f9c1eba-d27c-4ca8-bff6-452efdb026dd.png',
      category: 'milk-based'
    },
    {
      id: 'kulfi',
      name: 'Kulfi Falooda',
      description: 'Traditional Indian ice cream with vermicelli',
      price: 250,
      image: '/lovable-uploads/8a25412c-6bca-463c-a2f9-cd4ba98905e6.png',
      category: 'milk-based'
    },
    
    // Fried delights
    {
      id: 'jalebi',
      name: 'Crispy Jalebi',
      description: 'Golden spirals soaked in sugar syrup',
      price: 300,
      image: '/lovable-uploads/63e67f13-ca1f-4971-9c1e-b7c7b3bec5cc.png',
      category: 'fried'
    },
    {
      id: 'gulab-jamun',
      name: 'Gulab Jamun',
      description: 'Soft milk solid balls in rose-flavored syrup',
      price: 400,
      image: '/lovable-uploads/83c09900-3531-4b73-80e6-69da609f6f92.png',
      category: 'fried'
    },
    {
      id: 'imarti',
      name: 'Imarti',
      description: 'Flower-shaped crispy sweet in saffron syrup',
      price: 450,
      image: '/lovable-uploads/be4a8a1a-e952-4710-8111-60ee6ed7eb78.png',
      category: 'fried'
    },
    {
      id: 'balushahi',
      name: 'Balushahi',
      description: 'Flaky pastry glazed with sugar syrup',
      price: 350,
      image: '/lovable-uploads/8f7791bb-208a-4778-9f6a-21441f9bfaff.png',
      category: 'fried'
    },

    // Dry fruit specials
    {
      id: 'kaju-katli',
      name: 'Kaju Katli',
      description: 'Diamond-shaped cashew fudge with silver leaf',
      price: 800,
      image: '/lovable-uploads/90e0608c-b5fa-480e-9dfa-0a8173cd3f7e.png',
      category: 'dry-fruits'
    },
    {
      id: 'badam-halwa',
      name: 'Badam Halwa',
      description: 'Rich almond pudding with ghee and cardamom',
      price: 650,
      image: '/lovable-uploads/be4a8a1a-e952-4710-8111-60ee6ed7eb78.png',
      category: 'dry-fruits'
    },
    {
      id: 'anjeer-roll',
      name: 'Anjeer Roll',
      description: 'Fig and nut rolls with pure ghee',
      price: 750,
      image: '/lovable-uploads/3f9c1eba-d27c-4ca8-bff6-452efdb026dd.png',
      category: 'dry-fruits',
      isVegan: true
    },
    {
      id: 'pista-roll',
      name: 'Pista Roll',
      description: 'Pistachio rolls with sweetened milk',
      price: 900,
      image: '/lovable-uploads/8a25412c-6bca-463c-a2f9-cd4ba98905e6.png',
      category: 'dry-fruits'
    },

    // Regional specials
    {
      id: 'mysore-pak',
      name: 'Mysore Pak',
      description: 'Karnataka\'s famous ghee-rich sweet',
      price: 500,
      image: '/lovable-uploads/be4a8a1a-e952-4710-8111-60ee6ed7eb78.png',
      category: 'regional'
    },
    {
      id: 'soan-papdi',
      name: 'Soan Papdi',
      description: 'Flaky, crispy sweet with cardamom',
      price: 400,
      image: '/lovable-uploads/8f7791bb-208a-4778-9f6a-21441f9bfaff.png',
      category: 'regional'
    },
    {
      id: 'motichoor-laddu',
      name: 'Motichoor Laddu',
      description: 'Golden droplet laddus with nuts',
      price: 450,
      image: '/lovable-uploads/63e67f13-ca1f-4971-9c1e-b7c7b3bec5cc.png',
      category: 'regional'
    },
    {
      id: 'coconut-barfi',
      name: 'Coconut Barfi',
      description: 'Fresh coconut fudge squares',
      price: 350,
      image: '/lovable-uploads/3f9c1eba-d27c-4ca8-bff6-452efdb026dd.png',
      category: 'regional',
      isVegan: true
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredSweets.map((sweet, index) => (
            <div
              key={sweet.id}
              className="diwali-glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 diwali-shadow-lg group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-6">
                {/* Sweet Image */}
                <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
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
                
                {/* Sweet Info */}
                <h3 className="text-xl font-bold mb-2 text-center diwali-text-gradient">
                  {sweet.name}
                </h3>
                <p className="text-sm mb-4 text-center h-12 leading-relaxed" style={{ color: 'hsl(var(--diwali-text))' }}>
                  {sweet.description}
                </p>
                
                {/* Badges */}
                <div className="flex justify-center gap-2 mb-4">
                  {sweet.isVegan && (
                    <span className="diwali-badge px-3 py-1 rounded-full text-xs flex items-center gap-1">
                      <Leaf className="h-3 w-3" />
                      Vegan
                    </span>
                  )}
                  {sweet.isSugarFree && (
                    <span className="diwali-badge px-3 py-1 rounded-full text-xs flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      Sugar Free
                    </span>
                  )}
                </div>

                {/* Price and Add to Cart */}
                <div className="text-center space-y-4">
                  <div className="text-2xl font-bold diwali-text-gradient">
                    ₹{sweet.price}
                    <span className="text-sm font-normal" style={{ color: 'hsl(var(--diwali-subtle))' }}>/kg</span>
                  </div>
                  <Button
                    onClick={() => addToCart(sweet)}
                    className="diwali-btn w-full font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-110 diwali-shadow group-hover:-translate-y-1"
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