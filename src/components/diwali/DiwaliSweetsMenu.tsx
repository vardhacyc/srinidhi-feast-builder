import React, { useState } from 'react';
import { Plus, Star, Sparkles, Crown, Leaf, Heart, Gift, Cookie, Cake, Zap } from 'lucide-react';
import { useCart, Sweet } from '../../contexts/CartContext';
import { Button } from '../ui/button';
import { DIWALI_MENU_DATA, CATEGORY_GROUPS, getProductsByCategory } from '../../data/diwaliMenu';

const DiwaliSweetsMenu = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const sweetCategories = [
    { id: 'all', name: 'All Items', icon: Sparkles, color: 'hsl(var(--diwali-gold))' },
    { id: 'Dry Fruit Sweets', name: 'Dry Fruit Sweets', icon: Leaf, color: 'hsl(var(--diwali-bronze))' },
    { id: 'Ghee Sweets', name: 'Ghee Sweets', icon: Heart, color: 'hsl(var(--diwali-bright))' },
    { id: 'Premium Cakes & Sweets', name: 'Premium Cakes', icon: Cake, color: 'hsl(var(--diwali-amber))' },
    { id: 'Bites', name: 'Bites', icon: Zap, color: 'hsl(var(--diwali-gold))' },
    { id: 'Milk Sweets', name: 'Milk Sweets', icon: Star, color: 'hsl(var(--diwali-bright))' },
    { id: 'Savouries', name: 'Savouries', icon: Cookie, color: 'hsl(var(--diwali-dark))' },
    { id: 'Assorted & Combo Gift Boxes', name: 'Gift Boxes', icon: Gift, color: 'hsl(var(--diwali-gold))' }
  ];

  // Convert menu data to Sweet format for cart compatibility
  const convertToSweets = (): Sweet[] => {
    const allSweets: Sweet[] = [];
    
    DIWALI_MENU_DATA.categories.forEach(category => {
      category.products.forEach(product => {
        if (product.price) {
          allSweets.push({
            id: product.id,
            name: product.name,
            description: product.description || `Premium ${product.name}`,
            price: product.price,
            image: product.image || '/placeholder-sweet.jpg',
            category: category.name
          });
        }
      });
    });
    
    return allSweets;
  };

  const sweetsData = convertToSweets();

  const filteredSweets = selectedCategory === 'all' 
    ? sweetsData 
    : sweetsData.filter(sweet => sweet.category === selectedCategory);

  return (
    <section 
      id="sweets" 
      className="relative py-20" 
      style={{
        background: 'linear-gradient(to bottom, hsl(var(--diwali-light)) 0%, hsl(var(--diwali-cream)) 100%)'
      }}
    >
      {/* Luxury Hero Section Container */}
      <div className="luxury-hero-section scroll-fade-in">
        
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

      {/* Menu Section Header */}
      <div className="container mx-auto px-6 mt-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'hsl(var(--diwali-dark))' }}>
            {selectedCategory === 'all' ? 'Complete Diwali Collection' : selectedCategory}
          </h2>
          {selectedCategory !== 'all' && (
            <p className="text-lg mb-4" style={{ color: 'hsl(var(--diwali-text))' }}>
              {DIWALI_MENU_DATA.categories.find(cat => cat.name === selectedCategory)?.products.length || 0} items available
            </p>
          )}
          
          {/* Menu Notes */}
          <div className="bg-amber-50/80 backdrop-blur-sm rounded-xl p-4 max-w-4xl mx-auto border-2 border-amber-200">
            <div className="space-y-2 text-sm">
              {DIWALI_MENU_DATA.meta.notes.map((note, index) => (
                <p key={index} className="text-amber-800 font-medium">
                  {index === 0 && "📦 "}{index === 1 && "₹ "}{index === 2 && "🎁 "}{index === 3 && "🚚 "}
                  {note}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sweets Grid */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredSweets.map((sweet) => {
            return (
              <div
                key={sweet.id}
                className="diwali-glass-card hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={sweet.image}
                    alt={sweet.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src = '/placeholder-sweet.jpg';
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    <div className="diwali-badge px-2 py-1 rounded-full text-xs font-medium">
                      <Star className="w-3 h-3 inline mr-1" />
                      Premium
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'hsl(var(--diwali-dark))' }}>
                    {sweet.name}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: 'hsl(var(--diwali-text))' }}>
                    {sweet.description}
                  </p>
                  
                  {/* Show selection details for gift boxes */}
                  {(sweet.name.includes('Royal') || sweet.name.includes('Supreme') || sweet.name.includes('Grandeur')) && (
                    <div className="mb-3 p-2 bg-amber-50 rounded-lg border border-amber-200">
                      <p className="text-xs font-semibold text-amber-800 mb-1">Includes:</p>
                      <p className="text-xs text-amber-700">
                        {sweet.name.includes('Royal') && DIWALI_MENU_DATA.selections.Royal.items.join(', ')}
                        {sweet.name.includes('Supreme') && DIWALI_MENU_DATA.selections.Supreme.items.join(', ')}
                        {sweet.name.includes('Grandeur') && DIWALI_MENU_DATA.selections.Grandeur.items.join(', ')}
                      </p>
                    </div>
                  )}

                  <div className="mb-4">
                    {sweet.price ? (
                      <>
                        <div className="flex justify-between items-center text-xl font-bold" style={{ color: 'hsl(var(--diwali-bronze))' }}>
                          <span>Price:</span>
                          <span>
                            ₹{sweet.price}/
                            {sweet.category === 'Bites' || sweet.name.includes('pcs') || sweet.name.includes('Box') ? 'box' : 'kg'}
                          </span>
                        </div>
                        <p className="text-xs text-center mt-2" style={{ color: 'hsl(var(--diwali-subtle))' }}>*GST will be added at checkout</p>
                      </>
                    ) : (
                      <div className="text-center">
                        <div className="text-lg font-bold text-amber-600 mb-2">Price on Availability</div>
                        <p className="text-xs" style={{ color: 'hsl(var(--diwali-subtle))' }}>Contact us for pricing</p>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={() => addToCart(sweet)}
                    className="w-full diwali-btn text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
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
            <p className="text-lg" style={{ color: 'hsl(var(--diwali-subtle))' }}>No sweets found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DiwaliSweetsMenu;
