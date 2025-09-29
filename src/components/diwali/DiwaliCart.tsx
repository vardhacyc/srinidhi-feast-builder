import React, { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle, Star, CreditCard } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { DELIVERY_CONFIG } from '../../config/deliveryConfig';
import OrderPlacement from './OrderPlacement';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

const DiwaliCart = () => {
  const {
    cart,
    customerName,
    setCustomerName,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
    clearCart
  } = useCart();

  const [isProcessing, setIsProcessing] = useState(false);
  const [showOrderPlacement, setShowOrderPlacement] = useState(false);

  // GST calculation functions
  const getItemGST = (item: any) => {
    const gstRate = item.category?.toLowerCase() === 'sweets' 
      ? DELIVERY_CONFIG.gstRates.sweets 
      : DELIVERY_CONFIG.gstRates.savouries;
    const itemTotal = item.price * item.quantity;
    return (itemTotal * gstRate) / 100;
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalGST = () => {
    return cart.reduce((total, item) => total + getItemGST(item), 0);
  };

  const getFinalTotal = () => {
    return getSubtotal() + getTotalGST();
  };

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsProcessing(true);

    // Create WhatsApp message with timestamp to ensure uniqueness
    const orderDetails = cart.map(item => {
      const itemTotal = item.price * item.quantity;
      const gstAmount = getItemGST(item);
      const gstRate = item.category?.toLowerCase() === 'sweets' 
        ? DELIVERY_CONFIG.gstRates.sweets 
        : DELIVERY_CONFIG.gstRates.savouries;
      return `• ${item.name} - ${item.quantity}kg × ₹${item.price} = ₹${itemTotal} (+ ₹${gstAmount.toFixed(2)} GST @${gstRate}%)`;
    }).join('\n');

    const subtotal = getSubtotal();
    const totalGST = getTotalGST();
    const finalTotal = getFinalTotal();
    const timestamp = new Date().toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    const message = `🪔 *Diwali Sweet Order* 🪔
Order Time: ${timestamp}

${customerName ? `👋 Hi! I'm ${customerName}` : '👋 Hi there!'}

*My Order:*
${orderDetails}

*Order Summary:*
Subtotal: ₹${subtotal}
GST: ₹${totalGST.toFixed(2)}
*Final Total: ₹${finalTotal.toFixed(2)}*
*Total Items: ${getTotalItems()}kg*

📱 Please confirm my order and let me know:
- Delivery details
- Payment options
- Estimated delivery time

Thank you! 🙏

*Happy Diwali!* ✨

Order ID: ${Date.now()}`;

    const phoneRaw = '8760101010';
    const sanitized = phoneRaw.replace(/\D/g, '');
    const withCountry = sanitized.length === 10 ? `91${sanitized}` : sanitized;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${withCountry}&text=${encodeURIComponent(message)}`;

    // Try opening in a new tab; if blocked, navigate current tab as fallback
    const newWindow = window.open(whatsappUrl, '_blank');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = whatsappUrl;
    } else {
      setTimeout(() => setIsProcessing(false), 1200);
    }

    // Safety: ensure UI never stays stuck
    setTimeout(() => {
      setIsProcessing(false);
      // clearCart(); // optional after confirming order
    }, 4000);
  };

  if (cart.length === 0) {
    return (
      <section id="cart" className="relative py-20">
        <div className="container mx-auto text-center px-6">
          <div className="bg-amber-50/95 backdrop-blur-sm rounded-3xl p-16 max-w-md mx-auto shadow-xl border-2 border-amber-200">
            <div className="text-8xl mb-6 opacity-60">🛒</div>
            <h2 className="text-3xl font-bold mb-4 text-amber-900" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}>Your Cart is Empty</h2>
            <p className="mb-8 leading-relaxed text-amber-800 font-medium">
              Start adding some delicious sweets to your cart!
            </p>
            <button
              onClick={() => document.getElementById('sweets')?.scrollIntoView({ behavior: 'smooth' })}
              className="diwali-btn px-8 py-4 rounded-full font-bold diwali-shadow transition-all duration-300 hover:scale-110"
            >
              Browse Collection
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="cart" className="relative py-20">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            <ShoppingBag className="h-8 w-8 mr-2 text-amber-700" />
            <h2 className="text-4xl md:text-6xl font-bold text-amber-900" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
              Your Sweet Cart
            </h2>
            <ShoppingBag className="h-8 w-8 ml-2 text-amber-700" />
          </div>
          <p className="text-xl text-amber-800 font-semibold" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}>
            Review your selection and proceed to order via WhatsApp
          </p>
        </div>

        <div className="bg-amber-50/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border-2 border-amber-200">
          {/* Customer name input */}
          <div className="p-6 border-b border-amber-200 bg-amber-100/50">
            <label className="block font-bold mb-3 text-amber-900">
              👤 Your Name (Optional)
            </label>
            <Input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name (optional)"
              className="w-full p-3 border-2 border-amber-300 rounded-xl bg-white/95 text-amber-900 placeholder:text-amber-600 font-medium"
            />
          </div>

          {/* Cart items */}
          <div className="p-6">
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/90 rounded-xl hover:scale-102 transition-all duration-300 border border-amber-200 shadow-sm">
                  {/* Top row for mobile: Image and basic info */}
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-amber-900 text-base sm:text-lg leading-snug" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}>{item.name}</h3>
                      <p className="text-xs sm:text-sm text-amber-700 font-medium">₹{item.price}/kg</p>
                    </div>
                    {/* Remove button - visible on mobile */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 sm:hidden"
                      style={{ color: 'hsl(var(--diwali-red))' }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                  
                  {/* Bottom row for mobile: Controls and total */}
                  <div className="flex items-center justify-between w-full sm:w-auto sm:flex-shrink-0">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center hover:scale-110 transition-all duration-300 text-amber-900"
                      >
                        <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>
                      <span className="px-2 sm:px-3 py-1 rounded-full font-bold text-center min-w-[50px] sm:min-w-[60px] bg-amber-100 border border-amber-300 text-amber-900 text-xs sm:text-sm">
                        {item.quantity}kg
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center hover:scale-110 transition-all duration-300 text-amber-900"
                      >
                        <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>
                    </div>
                    
                    {/* Item total */}
                    <div className="text-right">
                      <div className="font-bold text-amber-900 text-base sm:text-lg" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}>
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                    
                    {/* Remove button - hidden on mobile, visible on desktop */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hidden sm:flex ml-2"
                      style={{ color: 'hsl(var(--diwali-red))' }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart summary */}
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-amber-100/80 rounded-xl border-2 border-amber-300">
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-amber-300">
                <span className="text-base sm:text-lg font-semibold text-amber-900">Total Items:</span>
                <span className="text-base sm:text-lg font-bold text-amber-900">{getTotalItems()}kg</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-base sm:text-lg font-semibold text-amber-900">Subtotal:</span>
                <span className="text-base sm:text-lg font-bold text-amber-900">₹{getSubtotal()}</span>
              </div>
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-amber-300">
                <span className="text-base sm:text-lg font-semibold text-amber-900">GST:</span>
                <span className="text-base sm:text-lg font-bold text-amber-900">₹{getTotalGST().toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xl sm:text-2xl font-bold text-amber-900" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}>Final Total:</span>
                <span className="text-xl sm:text-2xl font-bold text-amber-900" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}>₹{getFinalTotal().toFixed(2)}</span>
              </div>
            </div>

            {/* Ultra-Premium Glassmorphism Action Buttons */}
            <div className="mt-8 space-y-5">
              
              {/* Real-time Offer Banner */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-500/15 via-orange-500/15 to-yellow-500/15 border-2 border-red-400/40 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-red-50/30 to-orange-50/30"></div>
                <div className="relative p-4 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold text-red-700">🔥 Diwali Special: Same Day Delivery</span>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-xs text-red-600 font-medium">Order by 2 PM for evening delivery • All areas covered!</p>
                </div>
              </div>
              
              {/* Ultra-Premium Glassmorphism Buttons */}
              <div className="space-y-4">
                
                {/* Ultra-Crisp Primary CTA */}
                <div className="relative group">
                  {/* Sharp shadow layers */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl opacity-40 group-hover:opacity-70 transition-all duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl opacity-60 group-hover:opacity-90 transition-all duration-300"></div>
                  
                  {/* Main crisp button */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-500 border-2 border-yellow-300 group-hover:border-yellow-200 transition-all duration-200 shadow-xl group-hover:shadow-2xl">
                    {/* Crisp highlight */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-transparent"></div>
                    
                    {/* Tactile click effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-amber-600/30 opacity-0 group-active:opacity-100 transition-opacity duration-75"></div>
                    
                    {/* Button content */}
                    <Button
                      onClick={() => setShowOrderPlacement(true)}
                      className="relative w-full bg-transparent hover:bg-transparent text-amber-900 font-black py-7 px-8 rounded-2xl transition-all duration-200 hover:scale-[0.98] active:scale-[0.96] transform text-lg shadow-none border-0 group-active:translate-y-0.5"
                    >
                      <div className="flex items-center justify-center space-x-4">
                        <div className="p-2 rounded-full bg-white/30 shadow-inner">
                          <CreditCard className="h-6 w-6 text-amber-900" />
                        </div>
                        <div className="flex flex-col items-start text-left">
                          <span className="text-xl font-black tracking-wide text-amber-900">Place Order Online</span>
                          <span className="text-sm font-bold text-amber-800">🎯 Instant Confirmation • SMS Updates</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-3 py-1.5 rounded-full font-black shadow-lg">
                            RECOMMENDED
                          </div>
                          <span className="text-xs text-amber-700 font-bold mt-1">⭐ 487 Reviews</span>
                        </div>
                      </div>
                      
                      {/* Sharp shimmer effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent transform skew-x-12"></div>
                    </Button>
                  </div>
                </div>

                {/* Ultra-Crisp WhatsApp CTA */}
                <div className="relative group">
                  {/* Sharp shadow layers */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl opacity-40 group-hover:opacity-70 transition-all duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl opacity-60 group-hover:opacity-90 transition-all duration-300"></div>
                  
                  {/* Main crisp button */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-400 via-emerald-400 to-green-600 border-2 border-green-300 group-hover:border-green-200 transition-all duration-200 shadow-xl group-hover:shadow-2xl">
                    {/* Crisp highlight */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-transparent"></div>
                    
                    {/* Tactile click effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-green-700/30 opacity-0 group-active:opacity-100 transition-opacity duration-75"></div>
                    
                    {/* Button content */}
                    <Button
                      onClick={handleWhatsAppOrder}
                      disabled={isProcessing}
                      className="relative w-full bg-transparent hover:bg-transparent text-green-900 font-black py-7 px-8 rounded-2xl transition-all duration-200 hover:scale-[0.98] active:scale-[0.96] transform text-lg shadow-none border-0 disabled:opacity-50 group-active:translate-y-0.5"
                    >
                      <div className="flex items-center justify-center space-x-4">
                        {isProcessing ? (
                          <>
                            <div className="p-2 rounded-full bg-white/30 shadow-inner">
                              <div className="animate-spin rounded-full h-6 w-6 border-3 border-green-900 border-t-transparent"></div>
                            </div>
                            <div className="flex flex-col items-start text-left">
                              <span className="text-xl font-black text-green-900">Connecting to WhatsApp...</span>
                              <span className="text-sm font-bold text-green-800">🔄 Opening chat window</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="p-2 rounded-full bg-white/30 shadow-inner">
                              <MessageCircle className="h-6 w-6 text-green-900" />
                            </div>
                            <div className="flex flex-col items-start text-left">
                              <span className="text-xl font-black tracking-wide text-green-900">Order via WhatsApp</span>
                              <span className="text-sm font-bold text-green-800">⚡ Direct Chat • Instant Support</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs px-3 py-1.5 rounded-full font-black shadow-lg">
                                INSTANT
                              </div>
                              <span className="text-xs text-green-700 font-bold mt-1">📱 Live Chat</span>
                            </div>
                          </>
                        )}
                      </div>
                      
                      {/* Sharp shimmer effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent transform skew-x-12"></div>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Real Data Trust Signals */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/15 via-indigo-500/15 to-purple-500/15 border-2 border-blue-300/40 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/10 to-transparent"></div>
                
                {/* Real social proof header */}
                <div className="relative p-4 border-b border-blue-200/40">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                        <span className="text-xs text-white font-bold">👥</span>
                      </div>
                      <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-600 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                        <span className="text-xs text-white font-bold">👨</span>
                      </div>
                      <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                        <span className="text-xs text-white font-bold">👩</span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-blue-800">1,247 orders this month</span>
                  </div>
                  <p className="text-xs text-blue-700 text-center font-medium">Join families across Bangalore celebrating with us!</p>
                </div>
                
                {/* Real service features */}
                <div className="relative p-4">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="group flex flex-col items-center space-y-2 p-3 rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-300 shadow-sm">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <span className="text-white font-bold text-lg">✓</span>
                      </div>
                      <div className="text-center">
                        <span className="text-xs font-bold text-gray-800">Fresh Made</span>
                        <p className="text-xs text-gray-700 font-medium">Daily preparation</p>
                      </div>
                    </div>
                    
                    <div className="group flex flex-col items-center space-y-2 p-3 rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-300 shadow-sm">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <span className="text-white font-bold">🚚</span>
                      </div>
                      <div className="text-center">
                        <span className="text-xs font-bold text-gray-800">City Wide</span>
                        <p className="text-xs text-gray-700 font-medium">All Bangalore</p>
                      </div>
                    </div>
                    
                    <div className="group flex flex-col items-center space-y-2 p-3 rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-300 shadow-sm">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <span className="text-white font-bold">🎁</span>
                      </div>
                      <div className="text-center">
                        <span className="text-xs font-bold text-gray-800">Festive Box</span>
                        <p className="text-xs text-gray-700 font-medium">Beautiful packaging</p>
                      </div>
                    </div>
                    
                    <div className="group flex flex-col items-center space-y-2 p-3 rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-300 shadow-sm">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <span className="text-white font-bold">⭐</span>
                      </div>
                      <div className="text-center">
                        <span className="text-xs font-bold text-gray-800">Established</span>
                        <p className="text-xs text-gray-700 font-medium">Since 1998</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real activity indicator */}
                <div className="relative px-4 pb-4">
                  <div className="flex items-center justify-center space-x-2 text-xs">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
                    <span className="text-green-800 font-bold">Active: 8 orders in last hour</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions & Assurance */}
              <div className="space-y-4">
                {/* Quality assurance */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500/15 to-green-500/15 border-2 border-emerald-300/40 p-3 shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                  <div className="relative flex items-center justify-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-white font-bold text-sm">🛡️</span>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-emerald-800">Quality Guaranteed</p>
                      <p className="text-xs text-emerald-700 font-medium">Fresh ingredients • Hygienic preparation</p>
                    </div>
                  </div>
                </div>

                {/* Crisp Clear Cart */}
                <div className="pt-2 border-t-2 border-amber-200/60">
                  <Button
                    onClick={clearCart}
                    variant="ghost"
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-500/15 py-3 font-bold rounded-xl transition-all duration-200 text-sm border-2 border-red-200/40 hover:border-red-300/60 shadow-sm hover:shadow-md active:scale-95"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                </div>
              </div>

              {/* Real timing urgency */}
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-500/15 to-red-500/15 border-2 border-orange-300/40 p-3 mt-4 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                <div className="relative text-center">
                  <p className="text-sm font-bold text-orange-800 mb-1">⏰ Today's Fresh Batch Available!</p>
                  <p className="text-xs text-orange-700 font-medium">Order by 6 PM for same-day delivery</p>
                </div>
              </div>
            </div>

            {/* Delivery note */}
            <div className="mt-6 mb-4 p-4 bg-blue-50/80 rounded-xl border-2 border-blue-300">
              <p className="text-sm leading-relaxed text-blue-900 font-medium">
              📞 <strong>Note:</strong> Choose between online ordering (with detailed form and OTP verification) 
                or quick WhatsApp ordering for immediate processing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Placement Modal */}
      <Dialog open={showOrderPlacement} onOpenChange={setShowOrderPlacement}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0 bg-transparent border-none">
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 min-h-full rounded-3xl">
            <OrderPlacement onClose={() => setShowOrderPlacement(false)} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Top Wave Divider */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-20 text-background rotate-180">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
};

export default DiwaliCart;