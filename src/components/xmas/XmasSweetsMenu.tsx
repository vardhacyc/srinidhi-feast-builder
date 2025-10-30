import React, { useState } from 'react';
import { Plus, Star, Sparkles, Crown, Leaf, Heart, Gift, Cookie } from 'lucide-react';
import { useCart, Sweet } from '../../contexts/CartContext';
import { Button } from '../ui/button';
import { DELIVERY_CONFIG } from '../../config/deliveryConfig';

const XmasSweetsMenu = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const sweetCategories = [
    { id: 'all', name: 'All Items', icon: Sparkles, color: 'hsl(var(--xmas-gold))' },
    { id: 'christmas-specials', name: 'Christmas Specials', icon: Star, color: 'hsl(var(--xmas-red))' },
    { id: 'cakes-pastries', name: 'Cakes & Pastries', icon: Heart, color: 'hsl(var(--xmas-green))' },
    { id: 'chocolates', name: 'Chocolates', icon: Crown, color: 'hsl(var(--xmas-bronze))' },
    { id: 'gift-boxes', name: 'Gift Boxes', icon: Gift, color: 'hsl(var(--xmas-gold))' },
    { id: 'cookies', name: 'Cookies', icon: Cookie, color: 'hsl(var(--xmas-red))' },
    { id: 'traditional', name: 'Traditional Sweets', icon: Leaf, color: 'hsl(var(--xmas-dark-green))' }
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
    // Christmas Specials
    {
      id: 'christmas-plum-cake',
      name: 'Christmas Plum Cake',
      description: 'Rich fruit cake soaked in rum with nuts and dried fruits',
      price: 800,
      image: '/lovable-uploads/plum-cake.jpg',
      category: 'christmas-specials'
    },
    {
      id: 'chocolate-yule-log',
      name: 'Chocolate Yule Log',
      description: 'Traditional festive log cake with chocolate cream filling',
      price: 850,
      image: '/lovable-uploads/yule-log.jpg',
      category: 'christmas-specials'
    },
    {
      id: 'gingerbread-cookies',
      name: 'Gingerbread Cookies',
      description: 'Classic spiced cookies perfect for the holidays',
      price: 450,
      image: '/lovable-uploads/gingerbread.jpg',
      category: 'christmas-specials'
    },
    {
      id: 'fruit-cake',
      name: 'Fruit Cake',
      description: 'Dense cake loaded with candied fruits and nuts',
      price: 750,
      image: '/lovable-uploads/fruit-cake.jpg',
      category: 'christmas-specials'
    },
    {
      id: 'christmas-gift-hamper',
      name: 'Christmas Gift Hamper',
      description: 'Assorted festive treats in premium gift packaging',
      price: 1200,
      image: '/lovable-uploads/gift-hamper.jpg',
      category: 'christmas-specials'
    },

    // Cakes & Pastries
    {
      id: 'red-velvet-cake',
      name: 'Red Velvet Cake',
      description: 'Classic red velvet with cream cheese frosting',
      price: 700,
      image: '/lovable-uploads/red-velvet.jpg',
      category: 'cakes-pastries'
    },
    {
      id: 'chocolate-truffle-cake',
      name: 'Chocolate Truffle Cake',
      description: 'Rich chocolate cake with truffle frosting',
      price: 750,
      image: '/lovable-uploads/chocolate-truffle.jpg',
      category: 'cakes-pastries'
    },
    {
      id: 'vanilla-sponge-cake',
      name: 'Vanilla Sponge Cake',
      description: 'Light and fluffy vanilla cake with buttercream',
      price: 600,
      image: '/lovable-uploads/vanilla-cake.jpg',
      category: 'cakes-pastries'
    },
    {
      id: 'holiday-cupcakes',
      name: 'Holiday Cupcakes (12 pcs)',
      description: 'Festive cupcakes with holiday decorations',
      price: 500,
      image: '/lovable-uploads/cupcakes.jpg',
      category: 'cakes-pastries'
    },
    {
      id: 'black-forest-cake',
      name: 'Black Forest Cake',
      description: 'Chocolate cake with cherry and cream layers',
      price: 800,
      image: '/lovable-uploads/black-forest.jpg',
      category: 'cakes-pastries'
    },

    // Chocolates
    {
      id: 'chocolate-truffles',
      name: 'Chocolate Truffles (500g)',
      description: 'Handmade premium chocolate truffles',
      price: 650,
      image: '/lovable-uploads/truffles.jpg',
      category: 'chocolates'
    },
    {
      id: 'peppermint-bark',
      name: 'Peppermint Bark',
      description: 'White and dark chocolate with crushed peppermint',
      price: 550,
      image: '/lovable-uploads/peppermint-bark.jpg',
      category: 'chocolates'
    },
    {
      id: 'chocolate-covered-strawberries',
      name: 'Chocolate Strawberries (12 pcs)',
      description: 'Fresh strawberries dipped in premium chocolate',
      price: 600,
      image: '/lovable-uploads/choc-strawberry.jpg',
      category: 'chocolates'
    },
    {
      id: 'assorted-chocolates',
      name: 'Assorted Chocolates Box',
      description: 'Premium collection of handmade chocolates',
      price: 700,
      image: '/lovable-uploads/assorted-choc.jpg',
      category: 'chocolates'
    },
    {
      id: 'chocolate-fudge',
      name: 'Chocolate Fudge',
      description: 'Rich and creamy chocolate fudge',
      price: 500,
      image: '/lovable-uploads/fudge.jpg',
      category: 'chocolates'
    },

    // Gift Boxes
    {
      id: 'deluxe-gift-box',
      name: 'Deluxe Christmas Box',
      description: 'Premium selection of cakes, cookies and chocolates',
      price: 1500,
      image: '/lovable-uploads/deluxe-box.jpg',
      category: 'gift-boxes'
    },
    {
      id: 'cookie-gift-box',
      name: 'Assorted Cookie Box',
      description: 'Variety of gourmet cookies in gift packaging',
      price: 600,
      image: '/lovable-uploads/cookie-box.jpg',
      category: 'gift-boxes'
    },
    {
      id: 'sweet-sampler',
      name: 'Sweet Sampler Box',
      description: 'Selection of traditional and modern sweets',
      price: 800,
      image: '/lovable-uploads/sampler.jpg',
      category: 'gift-boxes'
    },
    {
      id: 'chocolate-gift-box',
      name: 'Chocolate Lover\'s Box',
      description: 'Assortment of premium chocolates',
      price: 900,
      image: '/lovable-uploads/choc-gift.jpg',
      category: 'gift-boxes'
    },

    // Cookies
    {
      id: 'sugar-cookies',
      name: 'Sugar Cookies (500g)',
      description: 'Classic sugar cookies with festive decorations',
      price: 400,
      image: '/lovable-uploads/sugar-cookies.jpg',
      category: 'cookies'
    },
    {
      id: 'shortbread-cookies',
      name: 'Shortbread Cookies',
      description: 'Buttery Scottish shortbread',
      price: 450,
      image: '/lovable-uploads/shortbread.jpg',
      category: 'cookies'
    },
    {
      id: 'chocolate-chip-cookies',
      name: 'Chocolate Chip Cookies',
      description: 'Classic cookies loaded with chocolate chips',
      price: 420,
      image: '/lovable-uploads/choc-chip.jpg',
      category: 'cookies'
    },
    {
      id: 'oatmeal-raisin-cookies',
      name: 'Oatmeal Raisin Cookies',
      description: 'Healthy oatmeal cookies with raisins',
      price: 400,
      image: '/lovable-uploads/oatmeal.jpg',
      category: 'cookies'
    },
    {
      id: 'almond-cookies',
      name: 'Almond Cookies',
      description: 'Crunchy cookies with almond pieces',
      price: 480,
      image: '/lovable-uploads/almond-cookies.jpg',
      category: 'cookies'
    },

    // Traditional Sweets
    {
      id: 'marzipan-treats',
      name: 'Marzipan Treats',
      description: 'Traditional almond paste confections',
      price: 650,
      image: '/lovable-uploads/marzipan.jpg',
      category: 'traditional'
    },
    {
      id: 'gulab-jamun',
      name: 'Gulab Jamun',
      description: 'Traditional milk solid dumplings in syrup',
      price: 550,
      image: '/lovable-uploads/gulab-jamun.jpg',
      category: 'traditional'
    },
    {
      id: 'kaju-katli',
      name: 'Kaju Katli',
      description: 'Premium cashew fudge squares',
      price: 700,
      image: '/lovable-uploads/kaju-katli.jpg',
      category: 'traditional'
    },
    {
      id: 'mysore-pak',
      name: 'Mysore Pak',
      description: 'Traditional ghee-based sweet from Karnataka',
      price: 600,
      image: '/lovable-uploads/MysorePak.png',
      category: 'traditional'
    },
    {
      id: 'badam-halwa',
      name: 'Badam Halwa',
      description: 'Rich almond halwa with ghee',
      price: 750,
      image: '/lovable-uploads/badam-halwa.jpg',
      category: 'traditional'
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
        background: 'linear-gradient(to bottom, hsl(var(--xmas-white)) 0%, hsl(var(--xmas-cream)) 100%)'
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
                  borderColor: selectedCategory === category.id ? category.color : 'hsla(var(--xmas-silver), 0.3)',
                  background: selectedCategory === category.id 
                    ? `linear-gradient(135deg, ${category.color} 0%, hsla(var(--xmas-gold), 0.8) 100%)`
                    : 'hsla(var(--xmas-white), 0.9)'
                }}
              >
                <IconComponent 
                  className="w-5 h-5" 
                  style={{ 
                    color: selectedCategory === category.id ? 'white' : category.color 
                  }} 
                />
                <span 
                  className="font-bold"
                  style={{
                    color: selectedCategory === category.id ? 'white' : 'hsl(var(--xmas-dark))'
                  }}
                >
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Premium Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSweets.map((sweet) => {
            const priceInfo = calculatePriceWithGST(sweet.price, sweet.category);
            
            return (
              <div 
                key={sweet.id} 
                className="premium-hero-card group"
              >
                <div className="relative overflow-hidden rounded-t-3xl h-64 bg-gradient-to-br from-white to-gray-50">
                  <img
                    src={sweet.image}
                    alt={sweet.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-sweet.jpg';
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    <span 
                      className="xmas-badge px-3 py-1 rounded-full text-xs font-black"
                    >
                      FESTIVE
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 
                      className="text-xl font-black mb-2"
                      style={{ 
                        color: 'hsl(var(--xmas-dark))',
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: '0.02em'
                      }}
                    >
                      {sweet.name}
                    </h3>
                    <p 
                      className="text-sm leading-relaxed"
                      style={{ color: 'hsl(var(--xmas-text))' }}
                    >
                      {sweet.description}
                    </p>
                  </div>

                  <div className="flex items-baseline space-x-2">
                    <span 
                      className="text-3xl font-black"
                      style={{ color: 'hsl(var(--xmas-red))' }}
                    >
                      ₹{priceInfo.finalPrice}
                    </span>
                    <span 
                      className="text-sm"
                      style={{ color: 'hsl(var(--xmas-muted))' }}
                    >
                      /kg
                    </span>
                  </div>

                  <div 
                    className="text-xs space-y-1 pt-2"
                    style={{ 
                      borderTop: '1px solid hsla(var(--xmas-silver), 0.3)',
                      color: 'hsl(var(--xmas-muted))'
                    }}
                  >
                    <p>Base: ₹{priceInfo.basePrice}</p>
                    <p>GST ({priceInfo.gstRate}%): ₹{priceInfo.gstAmount}</p>
                  </div>

                  <Button
                    onClick={(e) => addToCart(sweet, e.currentTarget)}
                    className="w-full xmas-btn py-6 rounded-xl font-black text-base transition-all duration-300 hover:scale-105"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    ADD TO CART
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default XmasSweetsMenu;
