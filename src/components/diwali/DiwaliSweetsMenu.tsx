import React, { useState } from 'react';
import { Plus, Star, Sparkles, Crown, Leaf, Heart, Gift, Cookie, Cake, Zap } from 'lucide-react';
import { useCart, Sweet } from '../../contexts/CartContext';
import { Button } from '../ui/button';
import { DIWALI_MENU_DATA, CATEGORY_GROUPS, getProductsByCategory } from '../../data/diwaliMenu';

const DiwaliSweetsMenu = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const sweetCategories = [
    { id: 'all', name: 'All Items', icon: Sparkles, color: 'hsl(var(--diwali-gold))', mobile: 'All' },
    { id: 'Dry Fruit Sweets', name: 'Dry Fruit Sweets', icon: Leaf, color: 'hsl(var(--diwali-bronze))', mobile: 'Dry Fruit' },
    { id: 'Ghee Sweets', name: 'Ghee Sweets', icon: Heart, color: 'hsl(var(--diwali-bright))', mobile: 'Ghee' },
    { id: 'Milk Sweets', name: 'Milk Sweets', icon: Star, color: 'hsl(var(--diwali-bright))', mobile: 'Milk' },
    { id: 'Premium Cakes & Sweets', name: 'Premium Cakes', icon: Cake, color: 'hsl(var(--diwali-amber))', mobile: 'Premium' },
    { id: 'Bites', name: 'Bites', icon: Zap, color: 'hsl(var(--diwali-gold))', mobile: 'Bites' },
    { id: 'Savouries', name: 'Savouries', icon: Cookie, color: 'hsl(var(--diwali-dark))', mobile: 'Savouries' },
    { id: 'Assorted & Combo Gift Boxes', name: 'Gift Boxes & Combos', icon: Gift, color: 'hsl(var(--diwali-gold))', mobile: 'Combos' }
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
      {/* Engagement Banner */}
      <div className="bg-gradient-to-r from-amber-100 to-amber-200 py-8 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
            🪔 Premium Diwali Sweet Collection ✨
          </h1>
          <p className="text-lg text-amber-800 mb-6 max-w-3xl mx-auto">
            Authentic traditional sweets handcrafted in Coimbatore • Premium ingredients • Fresh daily • Perfect for gifting
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/80 px-4 py-2 rounded-full text-amber-800 font-semibold">
              🎁 Gift boxes available
            </span>
            <span className="bg-white/80 px-4 py-2 rounded-full text-amber-800 font-semibold">
              🚚 Free delivery ₹6000+
            </span>
            <span className="bg-white/80 px-4 py-2 rounded-full text-amber-800 font-semibold">
              ⭐ 25+ years legacy
            </span>
          </div>
        </div>
      </div>

      {/* Smart Category Tabs - Mobile Optimized */}
      <div className="category-tabs-container">
          {/* Desktop Tabs */}
          <div className="hidden md:flex justify-center mb-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-2 shadow-lg border-2 border-amber-200">
              <div className="flex flex-wrap gap-2">
                {sweetCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        selectedCategory === category.id 
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-md' 
                          : 'text-amber-800 hover:bg-amber-100'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span className="whitespace-nowrap">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Sticky Toolbar */}
          <div className="md:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b-2 border-amber-200 mb-6">
            <div className="px-4 py-3">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {sweetCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
                        selectedCategory === category.id 
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-md' 
                          : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span>{category.mobile}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
      </div>

      {/* Simplified Section Header */}
      <div className="container mx-auto px-4 md:px-6">
        {selectedCategory !== 'all' && (
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-amber-900">
              {selectedCategory} Collection 🪔
            </h2>
          </div>
        )}
      </div>

      {/* Sweets Grid */}
      <div className="container mx-auto px-4 md:px-6">
        {/* Minimalist Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredSweets.map((sweet) => {
            const isGiftBox = sweet.name.includes('Royal') || sweet.name.includes('Supreme') || sweet.name.includes('Grandeur') || sweet.name.includes('Premium') || sweet.category === 'Assorted & Combo Gift Boxes';
            const isPremium = sweet.category === 'Dry Fruit Sweets' || sweet.category === 'Premium Cakes & Sweets' || sweet.price && sweet.price > 1000;
            
            return (
              <div
                key={sweet.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-amber-200"
              >
                {/* Large Product Image */}
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={sweet.image}
                    alt={sweet.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src = '/placeholder-sweet.jpg';
                    }}
                  />
                  {/* Premium Badge */}
                  {isPremium && (
                    <div className="absolute top-3 left-3">
                      <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                        ✨ Premium
                      </div>
                    </div>
                  )}
                  {/* Gift Box Badge */}
                  {isGiftBox && (
                    <div className="absolute top-3 right-3">
                      <div className="bg-gradient-to-r from-red-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                        🎁 Gift Box
                      </div>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  {/* Product Name with Diwali Emoji */}
                  <h3 className="text-lg font-bold text-amber-900 mb-1 line-clamp-2">
                    {sweet.name} 🪔
                  </h3>
                  
                  {/* Short Description */}
                  <p className="text-sm text-amber-700 mb-3 line-clamp-1">
                    {sweet.description?.split('.')[0] || 'Authentic • Festive • Premium Quality'}
                  </p>

                  {/* Gift Box Contents */}
                  {isGiftBox && (
                    <div className="mb-3 p-2 bg-amber-50 rounded-lg border border-amber-200">
                      <p className="text-xs font-semibold text-amber-800 mb-1">🎁 Includes:</p>
                      <p className="text-xs text-amber-700 line-clamp-2">
                        {sweet.name.includes('Royal') && DIWALI_MENU_DATA.selections.Royal.join(', ')}
                        {sweet.name.includes('Supreme') && DIWALI_MENU_DATA.selections.Supreme.join(', ')}
                        {sweet.name.includes('Grandeur') && DIWALI_MENU_DATA.selections.Grandeur.join(', ')}
                        {sweet.name.includes('Premium') && 'Premium selection of specialty cakes and sweets'}
                        {sweet.name.includes('Bites') && 'Assorted premium bite-sized sweets'}
                      </p>
                    </div>
                  )}

                  {/* Price */}
                  <div className="mb-4">
                    {sweet.price ? (
                      <div className="text-left">
                        <span className="text-2xl font-bold text-amber-900">
                          ₹{sweet.price}
                          <span className="text-sm text-amber-600 font-medium ml-1">
                            /{sweet.category === 'Bites' || sweet.name.includes('pcs') || sweet.name.includes('Box') ? 'box' : 'kg'}
                          </span>
                        </span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-lg font-bold text-amber-600">Price on Request</div>
                        <p className="text-xs text-amber-500">Contact for pricing</p>
                      </div>
                    )}
                    
                    {/* Size Options */}
                    {isGiftBox && (
                      <p className="text-xs text-amber-600 mt-1">
                        📦 1/4kg, 1/2kg, 1kg options available
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button
                      onClick={() => addToCart(sweet)}
                      className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    
                    {isGiftBox && (
                      <Button
                        variant="outline"
                        className="w-full border-2 border-amber-400 text-amber-700 hover:bg-amber-50 font-semibold py-2 rounded-xl transition-all duration-300"
                        onClick={() => {
                          const message = `Hi! I'm interested in ${sweet.name} as a gift box. Please share available sizes and pricing details.`;
                          const whatsappUrl = `https://wa.me/918760101010?text=${encodeURIComponent(message)}`;
                          window.open(whatsappUrl, '_blank');
                        }}
                      >
                        🎁 Buy for Gifting
                      </Button>
                    )}
                  </div>
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
