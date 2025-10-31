import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Star, Phone, Crown, ShoppingCart, Plus, Minus, X, ArrowRight, 
  Gift, Snowflake, Sparkles
} from 'lucide-react';
import { DELIVERY_CONFIG } from '@/config/deliveryConfig';
import { xmasSweetItems, xmasCategories, xmasTestimonials, type XmasSweet } from '@/data/xmasMenu';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function Xmas() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hoveredSweet, setHoveredSweet] = useState<string | null>(null);
  
  const totalCustomers = 3247;
  const customerCount = 11952;

  // Helper function to calculate price with GST
  const calculatePriceWithGST = (basePrice: number) => {
    const gstRate = DELIVERY_CONFIG.gstRates.sweets;
    const gstAmount = (basePrice * gstRate) / 100;
    return {
      basePrice,
      gstRate,
      gstAmount: Math.round(gstAmount),
      finalPrice: Math.round(basePrice + gstAmount)
    };
  };

  const filteredSweets = xmasSweetItems.filter(sweet => 
    selectedCategory === "All" || 
    (selectedCategory === "Premium" && sweet.premium) ||
    sweet.category === selectedCategory
  );

  const addToCart = (item: XmasSweet) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { 
        id: item.id, 
        name: item.name, 
        price: item.price, 
        quantity: 1
      }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleOrderWhatsApp = (sweetName: string) => {
    const message = `Hi! I'd like to order ${sweetName} from Sri Nidhi Christmas Collection. Please confirm availability and delivery details.`;
    const whatsappUrl = `https://wa.me/918760101010?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;
    
    const orderDetails = cart.map(item => 
      `${item.name} x${item.quantity} = ₹${item.price * item.quantity}`
    ).join('\n');
    
    const message = `🎄 *Sri Nidhi Christmas Order* 🎄\n\n${orderDetails}\n\n*Total: ₹${cartTotal}*\n\nPlease confirm availability and delivery time for this festive order. Thank you!`;
    
    const whatsappUrl = `https://wa.me/918760101010?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Styles for animations and effects */}
      <style>{`
        @keyframes snowfall {
          0% { transform: translateY(-10vh) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(110vh) translateX(100px) rotate(360deg); opacity: 0; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 30px rgba(139, 92, 246, 0.6), 0 0 60px rgba(139, 92, 246, 0.4), inset 0 0 30px rgba(139, 92, 246, 0.1); }
          50% { box-shadow: 0 0 50px rgba(139, 92, 246, 0.8), 0 0 80px rgba(139, 92, 246, 0.6), inset 0 0 40px rgba(139, 92, 246, 0.2); }
        }
        .snowflake {
          position: absolute;
          color: white;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
          animation: snowfall linear infinite;
          pointer-events: none;
          font-weight: bold;
        }
        .card-xmas {
          transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.4s, border-color 0.4s;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px);
        }
        .card-xmas::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent);
          transition: left 0.5s;
        }
        .card-xmas:hover::before {
          left: 100%;
        }
        .card-xmas::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(139, 92, 246, 0.1) 0%, transparent 50%, rgba(88, 28, 135, 0.1) 100%);
          pointer-events: none;
        }
        .card-xmas:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 60px -20px rgba(109, 40, 217, 0.6), 0 0 60px rgba(139, 92, 246, 0.4), inset 0 0 40px rgba(139, 92, 246, 0.1);
          border-color: rgba(139, 92, 246, 0.7) !important;
        }
        .cta-btn-xmas {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          font-weight: 700;
          letter-spacing: 0.025em;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(20px);
        }
        .cta-btn-xmas::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.5s, height 0.5s;
        }
        .cta-btn-xmas::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%, rgba(0, 0, 0, 0.2) 100%);
          pointer-events: none;
        }
        .cta-btn-xmas:hover::before {
          width: 300px;
          height: 300px;
        }
        .cta-btn-xmas:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 15px 40px -10px rgba(109, 40, 217, 0.7), 0 0 50px rgba(139, 92, 246, 0.5), inset 0 0 30px rgba(139, 92, 246, 0.2);
        }
        .cta-btn-xmas:active {
          transform: translateY(-2px) scale(1.02);
        }
        .gradient-text {
          background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 30%, #f472b6 60%, #fbbf24 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 2px 8px rgba(255, 255, 255, 0.3));
        }
        .shimmer-bg {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        .red-glow {
          box-shadow: 0 0 30px rgba(239, 68, 68, 0.5), inset 0 0 20px rgba(239, 68, 68, 0.2);
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

                  <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #2d1b4e 0%, #3d2463 20%, #4a2870 40%, #5b2e80 60%, #4a2870 80%, #3d2463 100%)' }}>
        {/* Animated Snowflakes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="snowflake"
              style={{
                left: `${Math.random() * 100}%`,
                fontSize: `${14 + Math.random() * 22}px`,
                animationDuration: `${10 + Math.random() * 15}s`,
                animationDelay: `${Math.random() * 8}s`,
                opacity: 0.6 + Math.random() * 0.4,
              }}
            >
              ❄
            </div>
          ))}
        </div>

        {/* Red Christmas Accents - Floating Ornaments */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${20 + Math.random() * 30}px`,
                opacity: 0.15 + Math.random() * 0.2,
                animation: `float ${4 + Math.random() * 6}s ease-in-out ${Math.random() * 3}s infinite`,
                filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.8))',
              }}
            >
              {['🎄', '🎁', '⭐', '🔴', '🎅'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>

        {/* Twinkling Stars Background */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '50%',
                animation: `twinkle ${2 + Math.random() * 3}s infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
          <div className="relative z-10 max-w-6xl mx-auto text-center">
            {/* Holiday Badge */}
                        {/* Holiday Badge */}
            <div className="inline-flex items-center gap-3 mb-8 px-8 py-3 rounded-full backdrop-blur-xl border-2 shadow-2xl red-glow" style={{ background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.7), rgba(76, 29, 149, 0.6))', borderColor: 'rgba(139, 92, 246, 0.6)', boxShadow: '0 8px 32px rgba(109, 40, 217, 0.5), inset 0 0 20px rgba(139, 92, 246, 0.2)' }}>
              <Snowflake className="w-5 h-5 text-cyan-200 animate-spin drop-shadow-lg" style={{ animationDuration: '4s' }} />
              <span className="text-xs tracking-[0.3em] font-bold text-white drop-shadow-lg">🎄 CHRISTMAS • THANKSGIVING • NEW YEAR 🎅</span>
              <Gift className="w-5 h-5 text-pink-300 drop-shadow-lg" />
            </div>

            {/* Main Heading */}
            <h1 className="mb-8 leading-tight">
              <span className="block text-5xl md:text-7xl font-extrabold gradient-text mb-4 drop-shadow-2xl">
                Festive Delights
              </span>
              <span className="block text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
                from Around the World
              </span>
            </h1>

            <p className="max-w-3xl mx-auto text-lg md:text-xl font-medium leading-relaxed mb-12 text-slate-100 drop-shadow-md">
              Celebrate the season with exotic sweets and premium treats from Europe, Asia, and beyond. 
              A curated collection for your special moments.
            </p>
          {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 px-4">
              <Button 
                onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
                className="cta-btn-xmas group w-full sm:w-auto px-8 sm:px-12 py-6 sm:py-7 rounded-full text-white text-base sm:text-lg shadow-2xl border-2"
                style={{ 
                  background: 'linear-gradient(135deg, #5b2e80 0%, #6d3a8f 30%, #7d459d 60%, #8e54ab 100%)',
                  borderColor: 'rgba(141, 84, 171, 0.6)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <span className="flex items-center justify-center relative z-10">
                  🎁 Explore Collection
                  <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-2" />
                </span>
              </Button>
              
              <Button 
                onClick={() => handleOrderWhatsApp('General Inquiry')}
                className="cta-btn-xmas w-full sm:w-auto px-8 sm:px-12 py-6 sm:py-7 rounded-full backdrop-blur-xl border-2 text-white text-base sm:text-lg shadow-2xl"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(61, 36, 99, 0.8), rgba(74, 40, 112, 0.7))',
                  borderColor: 'rgba(107, 70, 165, 0.6)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                <Phone className="w-5 h-5 mr-3" />
                WhatsApp Us
              </Button>
            </div>            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { label: 'Happy Customers', value: totalCustomers.toLocaleString() + '+', icon: '🎅' },
                { label: 'Festive Rating', value: '4.9★', icon: '⭐' },
                { label: 'Countries Inspired', value: '15+', icon: '🌍' }
              ].map((stat, idx) => (
                <div 
                  key={idx} 
                  className="backdrop-blur-xl p-10 rounded-3xl border-2 shadow-2xl relative overflow-hidden"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(55, 16, 82, 0.8), rgba(46, 16, 101, 0.7))',
                    borderColor: 'rgba(109, 40, 217, 0.5)',
                    boxShadow: '0 15px 50px rgba(74, 31, 117, 0.6), inset 0 0 30px rgba(139, 92, 246, 0.2)'
                  }}
                >
                  <div className="absolute top-0 right-0 text-6xl opacity-20">{stat.icon}</div>
                  <div className="text-4xl md:text-5xl font-black gradient-text mb-2 drop-shadow-lg">{stat.value}</div>
                  <div className="text-sm font-semibold text-white uppercase tracking-wider drop-shadow">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Collection Section */}
        <section id="collection" className="py-28 px-6 relative">
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-extrabold mb-6 gradient-text drop-shadow-2xl">
                Exotic Sweet Collection
              </h2>
              <p className="text-lg md:text-xl text-white font-medium drop-shadow-md">
                Handpicked delicacies from master confectioners worldwide
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex justify-center mb-16 overflow-x-auto">
              <div className="inline-flex rounded-full p-3 backdrop-blur-xl border-2 shadow-2xl gap-2" style={{ background: 'linear-gradient(135deg, rgba(46, 16, 101, 0.85), rgba(55, 16, 82, 0.8))', borderColor: 'rgba(109, 40, 217, 0.6)', boxShadow: '0 15px 50px rgba(74, 31, 117, 0.7), inset 0 0 30px rgba(139, 92, 246, 0.15)' }}>
                {xmasCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-3 rounded-full text-xs md:text-sm font-bold tracking-wide transition-all whitespace-nowrap backdrop-blur-lg ${
                      selectedCategory === cat 
                        ? 'text-white shadow-xl border-2' 
                        : 'text-slate-200 hover:text-white'
                    }`}
                    style={selectedCategory === cat ? {
                      background: 'linear-gradient(135deg, #371052 0%, #4c1d95 50%, #6d28d9 100%)',
                      borderColor: 'rgba(139, 92, 246, 0.5)',
                      boxShadow: '0 8px 30px rgba(109, 40, 217, 0.7), inset 0 0 20px rgba(139, 92, 246, 0.2)'
                    } : {
                      background: 'rgba(55, 16, 82, 0.4)',
                      boxShadow: 'inset 0 0 15px rgba(88, 28, 135, 0.1)'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredSweets.map(sweet => (
                <Card 
                  key={sweet.id} 
                  className="card-xmas group relative border-2 rounded-3xl shadow-2xl"
                  style={{ 
                    background: 'rgba(26, 10, 46, 0.9)',
                    borderColor: 'rgba(109, 40, 217, 0.5)',
                    backdropFilter: 'blur(25px)',
                    boxShadow: '0 15px 50px rgba(74, 31, 117, 0.5), inset 0 0 30px rgba(88, 28, 135, 0.15)'
                  }}
                  onMouseEnter={() => setHoveredSweet(sweet.id)}
                  onMouseLeave={() => setHoveredSweet(null)}
                >
                  {/* Image */}
                  <div className="relative h-72 overflow-hidden rounded-t-3xl">
                    <img 
                      src={sweet.image}
                      alt={sweet.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ filter: 'brightness(1.1) contrast(1.05)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent" />
                    
                    {/* Badges */}
                    {sweet.premium && (
                      <div className="absolute top-4 left-4 px-4 py-2 rounded-full text-xs font-bold tracking-wider border-2 text-white shadow-xl"
                        style={{ 
                          background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #a78bfa 100%)',
                          borderColor: 'rgba(168, 139, 250, 0.6)',
                          backdropFilter: 'blur(20px)',
                          boxShadow: '0 0 30px rgba(139, 92, 246, 0.8), inset 0 0 15px rgba(168, 139, 250, 0.2)'
                        }}>
                        <Crown className="w-3 h-3 inline mr-1" />
                        PREMIUM
                      </div>
                    )}
                    
                    {sweet.stockLeft <= 10 && (
                      <div className="absolute top-4 right-4 px-4 py-2 rounded-full text-xs font-bold tracking-wider backdrop-blur-md border-2 text-white shadow-xl red-glow"
                        style={{ 
                          background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.95), rgba(185, 28, 28, 0.9))',
                          borderColor: 'rgba(255, 255, 255, 0.5)'
                        }}>
                        🔥 {sweet.stockLeft} LEFT
                      </div>
                    )}

                    {/* Origin Flag */}
                    <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-semibold border-2 text-white shadow-xl"
                      style={{ 
                        background: 'rgba(76, 29, 149, 0.95)',
                        backdropFilter: 'blur(20px)',
                        borderColor: 'rgba(139, 92, 246, 0.6)',
                        boxShadow: '0 4px 20px rgba(109, 40, 217, 0.6), inset 0 0 15px rgba(139, 92, 246, 0.15)'
                      }}>
                      🌍 {sweet.origin}
                    </div>
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <CardTitle className="text-xl font-bold text-white leading-tight drop-shadow-md">
                        {sweet.name}
                      </CardTitle>
                      <div className="flex items-center gap-1 px-3 py-1.5 rounded-full backdrop-blur-md text-yellow-300 text-xs font-bold shadow-lg border border-yellow-400/30"
                        style={{ background: 'rgba(234, 179, 8, 0.3)' }}>
                        <Star className="w-4 h-4 fill-yellow-300" />
                        {sweet.rating}
                      </div>
                    </div>
                    <CardDescription className="text-slate-200 font-medium leading-relaxed">
                      {sweet.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="mb-4">
                      <Badge className="backdrop-blur-md border-2 border-purple-500/40 text-white font-medium text-xs"
                        style={{ background: 'rgba(76, 29, 149, 0.5)' }}>
                        {sweet.specialty}
                      </Badge>
                    </div>

                    {/* Price with GST */}
                    <div className="flex items-center gap-3 mb-6">
                      {(() => {
                        const priceInfo = calculatePriceWithGST(sweet.price);
                        return (
                          <div className="backdrop-blur-md rounded-xl p-4 border-2 border-purple-500/40 shadow-lg flex-1"
                            style={{ background: 'rgba(76, 29, 149, 0.5)' }}>
                            <div className="text-2xl font-bold text-white mb-1 drop-shadow-md">
                              ₹{priceInfo.finalPrice}
                              <span className="text-sm font-normal text-slate-200"> /kg</span>
                            </div>
                            <div className="text-xs text-slate-300 space-y-0.5">
                              <div>Base: ₹{priceInfo.basePrice} + GST {priceInfo.gstRate}%</div>
                              <div className="text-slate-400">(GST: ₹{priceInfo.gstAmount})</div>
                            </div>
                          </div>
                        );
                      })()}
                      {sweet.originalPrice && (
                        <span className="text-sm line-through text-blue-400">₹{sweet.originalPrice}</span>
                      )}
                    </div>

                    {/* Tasting Notes on Hover */}
                    {hoveredSweet === sweet.id && (
                      <div className="mb-6 p-4 rounded-xl border-2 shadow-lg"
                        style={{ 
                          background: 'rgba(55, 16, 82, 0.8)',
                          backdropFilter: 'blur(25px)',
                          borderColor: 'rgba(109, 40, 217, 0.6)',
                          boxShadow: '0 8px 30px rgba(74, 31, 117, 0.6), inset 0 0 20px rgba(139, 92, 246, 0.15)'
                        }}>
                        <p className="text-xs font-bold tracking-wider text-white mb-2 drop-shadow">TASTING NOTES</p>
                        <div className="flex flex-wrap gap-2">
                          {sweet.tastingNotes.map((note, i) => (
                            <span 
                              key={i} 
                              className="px-3 py-1 rounded-full text-xs font-semibold text-white border-2 shadow"
                              style={{ 
                                background: 'rgba(76, 29, 149, 0.7)',
                                backdropFilter: 'blur(15px)',
                                borderColor: 'rgba(139, 92, 246, 0.5)'
                              }}
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button 
                        onClick={() => addToCart(sweet)}
                        className="w-full rounded-xl text-white py-6 cta-btn-xmas border-2 shadow-xl relative overflow-hidden"
                        style={{ 
                          background: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 30%, #8b5cf6 60%, #a78bfa 100%)',
                          borderColor: 'rgba(139, 92, 246, 0.6)',
                          backdropFilter: 'blur(25px)',
                          boxShadow: '0 10px 40px rgba(109, 40, 217, 0.6), inset 0 0 25px rgba(139, 92, 246, 0.15)',
                          textShadow: '0 2px 6px rgba(0, 0, 0, 0.7)'
                        }}
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                      </Button>
                      
                      <Button 
                        onClick={() => handleOrderWhatsApp(sweet.name)}
                        className="w-full rounded-xl border-2 text-white py-6 cta-btn-xmas shadow-xl relative overflow-hidden"
                        style={{ 
                          background: 'linear-gradient(135deg, #4c1d95 0%, #5b21b6 30%, #6d28d9 60%, #7c3aed 100%)',
                          borderColor: 'rgba(139, 92, 246, 0.6)',
                          backdropFilter: 'blur(25px)',
                          boxShadow: '0 10px 40px rgba(76, 29, 149, 0.6), inset 0 0 25px rgba(139, 92, 246, 0.15)',
                          textShadow: '0 2px 6px rgba(0, 0, 0, 0.7)'
                        }}
                      >
                        Order via WhatsApp
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-28 px-6 relative">
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 gradient-text drop-shadow-2xl">
                Customer Celebrations
              </h2>
              <p className="text-white font-medium text-lg drop-shadow-md">Real stories from our festive family</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {xmasTestimonials.map((t, i) => (
                <Card 
                  key={i} 
                  className="card-xmas p-8 rounded-3xl border-2 shadow-2xl"
                  style={{ 
                    background: 'rgba(26, 10, 46, 0.9)',
                    borderColor: 'rgba(109, 40, 217, 0.5)',
                    backdropFilter: 'blur(25px)',
                    boxShadow: '0 15px 50px rgba(74, 31, 117, 0.5), inset 0 0 30px rgba(88, 28, 135, 0.15)'
                  }}
                >
                  <div className="flex mb-5 gap-1">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} className="w-5 h-5 fill-yellow-300 text-yellow-300 drop-shadow" />
                    ))}
                  </div>
                  <p className="text-slate-100 font-medium italic mb-6 leading-relaxed">
                    "{t.text}"
                  </p>
                  <div className="text-sm font-bold text-white drop-shadow">{t.name} • {t.location}</div>
                  <div className="text-xs mt-1 text-slate-300 uppercase tracking-wider">{t.item}</div>
                </Card>
              ))}
            </div>

            {/* Customer Counter */}
            <div className="text-center mt-20">
              <div className="inline-flex items-center gap-8 px-16 py-10 rounded-3xl border-2 shadow-2xl relative overflow-hidden"
                style={{ 
                  background: 'rgba(46, 16, 101, 0.85)',
                  backdropFilter: 'blur(25px)',
                  borderColor: 'rgba(109, 40, 217, 0.6)',
                  boxShadow: '0 15px 50px rgba(74, 31, 117, 0.7), inset 0 0 30px rgba(139, 92, 246, 0.15)'
                }}>
                <div className="absolute inset-0 shimmer-bg opacity-30" />
                <Sparkles className="w-12 h-12 text-yellow-300 relative z-10 drop-shadow-lg" />
                <div className="text-6xl font-black gradient-text relative z-10 drop-shadow-2xl">
                  {customerCount.toLocaleString()}+
                </div>
                <div className="text-white font-bold tracking-wide text-lg relative z-10 drop-shadow-md">
                  Sweet Lovers Worldwide
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cart Sidebar */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="flex-1 backdrop-blur-sm" style={{ background: 'rgba(0, 0, 0, 0.7)' }} onClick={() => setIsCartOpen(false)} />
            <div className="w-96 h-full overflow-y-auto backdrop-blur-xl border-l-2 shadow-2xl relative"
              style={{ 
                background: 'rgba(30, 27, 75, 0.95)',
                borderColor: 'rgba(139, 92, 246, 0.5)'
              }}>
              <div className="p-6 border-b border-white/20 flex items-center justify-between sticky top-0 backdrop-blur-xl z-10"
                style={{ background: 'rgba(30, 27, 75, 0.95)' }}>
                <h3 className="text-xl font-bold gradient-text">Your Cart</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsCartOpen(false)}
                  className="border-2 border-white/30 text-white backdrop-blur-md hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center py-20 text-blue-200 font-medium">
                    Your cart is empty
                  </div>
                ) : (
                  <>
                    {cart.map(item => (
                      <div 
                        key={item.id} 
                        className="flex items-center gap-4 p-4 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg"
                        style={{ background: 'rgba(99, 102, 241, 0.2)' }}
                      >
                        <div className="flex-1">
                          <h4 className="font-bold text-white text-sm leading-tight mb-1">{item.name}</h4>
                          <p className="text-xs text-blue-300">₹{item.price} each</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 p-0 border-2 border-white/30 text-white backdrop-blur-md hover:bg-white/10"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-10 text-center font-bold text-white">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0 border-2 border-white/30 text-white backdrop-blur-md hover:bg-white/10"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 p-0 border-2 border-white/30 text-white backdrop-blur-md hover:bg-white/10"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}

                    <div className="pt-6 border-t border-white/20">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-sm font-bold tracking-wider text-blue-200">TOTAL</span>
                        <span className="text-3xl font-black gradient-text">₹{cartTotal}</span>
                      </div>
                      <Button 
                        onClick={handleWhatsAppOrder}
                        className="w-full rounded-xl text-white py-6 cta-btn-xmas border-2 shadow-xl"
                        style={{ 
                          background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 50%, #a5b4fc 100%)',
                          borderColor: 'rgba(129, 140, 248, 0.6)'
                        }}
                      >
                        🎄 Place WhatsApp Order
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Floating Cart Button */}
        {cart.length > 0 && (
          <Button 
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-8 right-8 w-20 h-20 rounded-full flex items-center justify-center cta-btn-xmas border-2 shadow-2xl z-40 red-glow"
            style={{ 
              background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 40%, #c084fc 70%, #e879f9 100%)',
              borderColor: 'rgba(255, 255, 255, 0.6)'
            }}
          >
            <div className="relative">
              <ShoppingCart className="w-8 h-8 text-white drop-shadow-lg" />
              <span className="absolute -top-3 -right-3 min-w-[28px] h-7 rounded-full font-bold flex items-center justify-center text-white text-sm shadow-lg border-2 border-white/50"
                style={{ background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)' }}>
                {cartCount}
              </span>
            </div>
          </Button>
        )}

        {/* Floating Contact Button */}
        <Button 
          onClick={() => handleOrderWhatsApp('General Inquiry')}
          className="fixed bottom-8 left-8 rounded-full px-8 py-6 text-white cta-btn-xmas border-2 shadow-2xl z-40"
          style={{ 
            background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 50%, #a5b4fc 100%)',
            borderColor: 'rgba(255, 255, 255, 0.5)'
          }}
        >
          <Phone className="w-5 h-5 mr-3" />
          WhatsApp
        </Button>
      </div>
    </>
  );
}
