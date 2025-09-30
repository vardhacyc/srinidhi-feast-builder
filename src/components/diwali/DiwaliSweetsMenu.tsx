import React, { useState } from 'react';
import { Plus, Star, Sparkles, Crown, Leaf, Heart, Gift, Cookie, Cake, Zap } from 'lucide-react';
import { useCart, Sweet } from '../../contexts/CartContext';
import { Button } from '../ui/button';
import { DIWALI_MENU_DATA, CATEGORY_GROUPS, getProductsByCategory } from '../../data/diwaliMenu';

const DiwaliSweetsMenu = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVariants, setSelectedVariants] = useState<{[key: string]: string}>({});

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

  // Group products by family (base name without variants)
  const groupProductsByFamily = (products: Sweet[]) => {
    const families: {[key: string]: Sweet[]} = {};
    
    products.forEach(product => {
      // Extract base name by removing variant indicators
      let baseName = product.name
        .replace(/\s*\(\d+pcs\)/gi, '')
        .replace(/\s*\(1\/[24]kg\)/gi, '')
        .replace(/\s*\(1kg\)/gi, '')
        .replace(/\s*12pcs$/gi, '')
        .replace(/\s*25pcs$/gi, '')
        .trim();
      
      // Special handling for collections
      if (baseName.includes('Collection')) {
        baseName = baseName.replace(/\s*(12pcs|25pcs).*$/gi, '').trim();
      }
      
      if (!families[baseName]) {
        families[baseName] = [];
      }
      families[baseName].push(product);
    });
    
    return families;
  };

  // Get variant display info with weight/quantity value for sorting
  const getVariantInfo = (product: Sweet) => {
    if (product.name.includes('12pcs') || product.name.includes('(12pcs)')) {
      return { label: '12 pieces', value: '12pcs', sortOrder: 12 };
    }
    if (product.name.includes('25pcs') || product.name.includes('(25pcs)')) {
      return { label: '25 pieces', value: '25pcs', sortOrder: 25 };
    }
    if (product.name.includes('1/4kg') || product.name.includes('(1/4kg)')) {
      return { label: '1/4 kg', value: '1/4kg', sortOrder: 0.25 };
    }
    if (product.name.includes('1/2kg') || product.name.includes('(1/2kg)')) {
      return { label: '1/2 kg', value: '1/2kg', sortOrder: 0.5 };
    }
    if (product.name.includes('1kg') || product.name.includes('(1kg)')) {
      return { label: '1 kg', value: '1kg', sortOrder: 1 };
    }
    return { label: 'Standard', value: 'standard', sortOrder: 0 };
  };

  // Get highest quantity variant from a family
  const getHighestQuantityVariant = (variants: Sweet[]) => {
    return variants.reduce((highest, current) => {
      const currentInfo = getVariantInfo(current);
      const highestInfo = getVariantInfo(highest);
      return currentInfo.sortOrder > highestInfo.sortOrder ? current : highest;
    });
  };

  // Handle variant selection
  const handleVariantChange = (familyName: string, variantValue: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [familyName]: variantValue
    }));
  };

  // Get selected product for a family
  const getSelectedProduct = (familyName: string, variants: Sweet[]) => {
    const selectedVariant = selectedVariants[familyName];
    if (!selectedVariant) {
      return getHighestQuantityVariant(variants); // Default to highest quantity variant
    }
    return variants.find(v => getVariantInfo(v).value === selectedVariant) || getHighestQuantityVariant(variants);
  };

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
      className="relative py-20 min-h-screen" 
      style={{
        background: 'linear-gradient(135deg, rgba(255, 243, 176, 0.95) 0%, rgba(254, 215, 170, 0.9) 25%, rgba(253, 186, 116, 0.95) 50%, rgba(255, 237, 213, 0.9) 75%, rgba(255, 248, 220, 0.95) 100%)'
      }}
    >
      {/* Decorative Diwali Header */}
      <div className="relative py-16 mb-12 overflow-hidden">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-amber-50/40 to-orange-50/30 backdrop-blur-sm border-b border-white/20 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-transparent to-orange-300/10"></div>
        </div>
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          {/* Left side decorations */}
          <div className="absolute left-4 top-4 w-24 h-24 opacity-30">
            <svg viewBox="0 0 100 100" className="w-full h-full text-amber-600">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1"/>
              <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1"/>
              <path d="M50,10 L55,25 L50,30 L45,25 Z" fill="currentColor"/>
              <path d="M50,70 L55,85 L50,90 L45,85 Z" fill="currentColor"/>
              <path d="M10,50 L25,55 L30,50 L25,45 Z" fill="currentColor"/>
              <path d="M70,50 L85,55 L90,50 L85,45 Z" fill="currentColor"/>
            </svg>
          </div>
          
          {/* Right side decorations */}
          <div className="absolute right-4 top-4 w-24 h-24 opacity-30">
            <svg viewBox="0 0 100 100" className="w-full h-full text-amber-600">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1"/>
              <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1"/>
              <path d="M50,10 L55,25 L50,30 L45,25 Z" fill="currentColor"/>
              <path d="M50,70 L55,85 L50,90 L45,85 Z" fill="currentColor"/>
              <path d="M10,50 L25,55 L30,50 L25,45 Z" fill="currentColor"/>
              <path d="M70,50 L85,55 L90,50 L85,45 Z" fill="currentColor"/>
            </svg>
          </div>
          
          {/* Hanging diyas */}
          <div className="absolute top-0 left-1/4 w-3 h-8 opacity-40">
            <div className="w-full h-4 bg-amber-600 rounded-b-full"></div>
            <div className="w-1 h-4 bg-amber-700 mx-auto"></div>
          </div>
          <div className="absolute top-0 right-1/4 w-3 h-8 opacity-40">
            <div className="w-full h-4 bg-amber-600 rounded-b-full"></div>
            <div className="w-1 h-4 bg-amber-700 mx-auto"></div>
          </div>
          <div className="absolute top-0 left-1/3 w-3 h-10 opacity-30">
            <div className="w-full h-5 bg-amber-600 rounded-b-full"></div>
            <div className="w-1 h-5 bg-amber-700 mx-auto"></div>
          </div>
          <div className="absolute top-0 right-1/3 w-3 h-10 opacity-30">
            <div className="w-full h-5 bg-amber-600 rounded-b-full"></div>
            <div className="w-1 h-5 bg-amber-700 mx-auto"></div>
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          {/* Main Title with Decorative Elements */}
          <div className="relative inline-block">
            {/* Glassmorphism title background */}
            <div className="absolute inset-0 -m-8 bg-white/20 backdrop-blur-md rounded-3xl border border-white/30 shadow-xl"></div>
            {/* Central Mandala */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 opacity-20">
              <svg viewBox="0 0 100 100" className="w-full h-full text-amber-700">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1"/>
                <path d="M50,5 L52,20 L50,25 L48,20 Z" fill="currentColor"/>
                <path d="M50,75 L52,90 L50,95 L48,90 Z" fill="currentColor"/>
                <path d="M5,50 L20,52 L25,50 L20,48 Z" fill="currentColor"/>
                <path d="M75,50 L90,52 L95,50 L90,48 Z" fill="currentColor"/>
                <path d="M20,20 L30,25 L25,30 L20,28 Z" fill="currentColor"/>
                <path d="M70,20 L80,25 L75,30 L70,28 Z" fill="currentColor"/>
                <path d="M20,70 L30,75 L25,80 L20,78 Z" fill="currentColor"/>
                <path d="M70,70 L80,75 L75,80 L70,78 Z" fill="currentColor"/>
              </svg>
            </div>
            
                      <h1 className="relative text-5xl md:text-7xl font-bold bg-gradient-to-br from-amber-800 via-orange-700 to-amber-900 bg-clip-text text-transparent mb-6 tracking-tight drop-shadow-sm">
            Diwali Sweet Delights
          </h1>
          </div>
          
          <div className="relative flex items-center justify-center gap-6 mb-8">
            <div className="hidden md:block w-32 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent shadow-sm"></div>
            <div className="relative">
              <span className="text-amber-600 text-3xl drop-shadow-lg animate-pulse">✨</span>
              <div className="absolute inset-0 text-amber-400 text-3xl animate-ping opacity-20">✨</div>
            </div>
            <div className="hidden md:block w-32 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent shadow-sm"></div>
          </div>
          
          <div className="relative bg-white/30 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/40 shadow-lg max-w-4xl mx-auto">
            <p className="text-lg text-amber-900 font-medium leading-relaxed">
              Authentic traditional sweets handcrafted with love • Premium ingredients • Fresh daily • Perfect for celebrations
            </p>
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
          <div className="md:hidden sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-white/30 shadow-lg mb-6">
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
        {/* Product Family Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {Object.entries(groupProductsByFamily(filteredSweets)).map(([familyName, variants]) => {
            const selectedProduct = getSelectedProduct(familyName, variants);
            const isGiftBox = selectedProduct.name.includes('Royal') || selectedProduct.name.includes('Supreme') || selectedProduct.name.includes('Grandeur') || selectedProduct.name.includes('Premium') || selectedProduct.category === 'Assorted & Combo Gift Boxes';
            const isPremium = selectedProduct.category === 'Dry Fruit Sweets' || selectedProduct.category === 'Premium Cakes & Sweets' || (selectedProduct.price && selectedProduct.price > 1000);
            
            return (
              <div
                key={familyName}
                className="relative bg-white/70 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-white/30 hover:border-amber-300/50 hover:bg-white/80 transform hover:scale-[1.02]"
              >
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-amber-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {/* Large Product Image */}
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={selectedProduct.image}
                    alt={familyName}
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
                    {familyName} 🪔
                  </h3>
                  
                  {/* Short Description */}
                  <p className="text-sm text-amber-700 mb-3 line-clamp-1">
                    {selectedProduct.description?.split('.')[0] || 'Authentic • Festive • Premium Quality'}
                  </p>

                  {/* Variant Selector */}
                  {variants.length > 1 && (
                    <div className="mb-3">
                      <label className="text-xs font-semibold text-gray-700 mb-2 block">Select Size/Quantity:</label>
                      <div className="flex flex-wrap gap-1">
                        {variants.map((variant) => {
                          const variantInfo = getVariantInfo(variant);
                          const isSelected = selectedVariants[familyName] === variantInfo.value || (!selectedVariants[familyName] && variant === getHighestQuantityVariant(variants));
                          return (
                            <button
                              key={variant.id}
                              onClick={() => handleVariantChange(familyName, variantInfo.value)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 backdrop-blur-sm ${
                                isSelected
                                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg border border-amber-400/30'
                                  : 'bg-white/60 text-amber-700 hover:bg-white/80 border border-white/40 hover:shadow-md'
                              }`}
                            >
                              {variantInfo.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Gift Box Contents */}
                  {isGiftBox && (
                    <div className="mb-3 p-2 bg-amber-50 rounded-lg border border-amber-200">
                      <p className="text-xs font-semibold text-amber-800 mb-1">🎁 Includes:</p>
                      <p className="text-xs text-amber-700 line-clamp-2">
                        {selectedProduct.name.includes('Royal') && DIWALI_MENU_DATA.selections.Royal.join(', ')}
                        {selectedProduct.name.includes('Supreme') && DIWALI_MENU_DATA.selections.Supreme.join(', ')}
                        {selectedProduct.name.includes('Grandeur') && DIWALI_MENU_DATA.selections.Grandeur.join(', ')}
                        {selectedProduct.name.includes('Premium') && 'Premium selection of specialty cakes and sweets'}
                        {selectedProduct.name.includes('Bites') && 'Assorted premium bite-sized sweets'}
                      </p>
                    </div>
                  )}

                  {/* Price */}
                  <div className="mb-4">
                    {selectedProduct.price ? (
                      <div className="text-left">
                        <span className="text-2xl font-bold text-amber-900">
                          ₹{selectedProduct.price}
                          <span className="text-sm text-amber-600 font-medium ml-1">
                            /{selectedProduct.category === 'Bites' || selectedProduct.name.includes('pcs') || selectedProduct.name.includes('Box') ? 'box' : 'kg'}
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
                      onClick={() => addToCart(selectedProduct)}
                      className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm border border-amber-300/20 hover:scale-[1.02] transform"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    
                    {isGiftBox && (
                      <Button
                        variant="outline"
                        className="w-full border-2 border-amber-400/60 text-amber-700 hover:bg-amber-50/80 font-semibold py-2 rounded-xl transition-all duration-300 backdrop-blur-sm hover:border-amber-500/80 hover:shadow-md"
                        onClick={() => {
                          const message = `Hi! I'm interested in ${selectedProduct.name} as a gift box. Please share available sizes and pricing details.`;
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

        {Object.keys(groupProductsByFamily(filteredSweets)).length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg" style={{ color: 'hsl(var(--diwali-subtle))' }}>No sweets found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DiwaliSweetsMenu;
