import React, { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle, Star } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { DELIVERY_CONFIG } from '../../config/deliveryConfig';

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
          <div className="diwali-glass-card rounded-3xl p-16 max-w-md mx-auto diwali-shadow-lg">
            <div className="text-8xl mb-6 opacity-60">🛒</div>
            <h2 className="text-3xl font-bold mb-4 diwali-text-gradient">Your Cart is Empty</h2>
            <p className="mb-8 leading-relaxed" style={{ color: 'hsl(var(--diwali-text))' }}>
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
            <ShoppingBag className="h-8 w-8 mr-2" style={{ color: 'hsl(var(--diwali-gold))' }} />
            <h2 className="text-4xl md:text-6xl font-bold diwali-text-gradient">
              Your Sweet Cart
            </h2>
            <ShoppingBag className="h-8 w-8 ml-2" style={{ color: 'hsl(var(--diwali-gold))' }} />
          </div>
          <p className="text-xl" style={{ color: 'hsl(var(--diwali-text))' }}>
            Review your selection and proceed to order via WhatsApp
          </p>
        </div>

        <div className="diwali-glass-card rounded-3xl overflow-hidden diwali-shadow-lg">
          {/* Customer name input */}
          <div className="p-6 border-b border-yellow-200/20 diwali-molten-honey">
            <label className="block font-bold mb-3" style={{ color: 'hsl(var(--diwali-dark))' }}>
              👤 Your Name (Optional)
            </label>
            <Input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name (optional)"
              className="w-full p-3 border-2 border-yellow-200/30 rounded-xl diwali-glass"
              style={{ color: 'hsl(var(--diwali-dark))' }}
            />
          </div>

          {/* Cart items */}
          <div className="p-6">
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 diwali-glass-card rounded-xl hover:scale-102 transition-all duration-300">
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
                      <h3 className="font-bold diwali-text-gradient text-base sm:text-lg leading-snug">{item.name}</h3>
                      <p className="text-xs sm:text-sm" style={{ color: 'hsl(var(--diwali-subtle))' }}>₹{item.price}/kg</p>
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
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full diwali-glass-card flex items-center justify-center hover:scale-110 transition-all duration-300"
                        style={{ color: 'hsl(var(--diwali-dark))' }}
                      >
                        <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>
                      <span className="px-2 sm:px-3 py-1 rounded-full font-bold text-center min-w-[50px] sm:min-w-[60px] diwali-glass-card text-xs sm:text-sm">
                        {item.quantity}kg
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full diwali-glass-card flex items-center justify-center hover:scale-110 transition-all duration-300"
                        style={{ color: 'hsl(var(--diwali-dark))' }}
                      >
                        <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>
                    </div>
                    
                    {/* Item total */}
                    <div className="text-right">
                      <div className="font-bold diwali-text-gradient text-base sm:text-lg">
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
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 diwali-glass-card rounded-xl border-2 border-yellow-300/30">
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-yellow-200/20">
                <span className="text-base sm:text-lg font-semibold" style={{ color: 'hsl(var(--diwali-dark))' }}>Total Items:</span>
                <span className="text-base sm:text-lg font-bold" style={{ color: 'hsl(var(--diwali-dark))' }}>{getTotalItems()}kg</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-base sm:text-lg font-semibold" style={{ color: 'hsl(var(--diwali-dark))' }}>Subtotal:</span>
                <span className="text-base sm:text-lg font-bold" style={{ color: 'hsl(var(--diwali-dark))' }}>₹{getSubtotal()}</span>
              </div>
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-yellow-200/20">
                <span className="text-base sm:text-lg font-semibold" style={{ color: 'hsl(var(--diwali-dark))' }}>GST:</span>
                <span className="text-base sm:text-lg font-bold" style={{ color: 'hsl(var(--diwali-dark))' }}>₹{getTotalGST().toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xl sm:text-2xl font-bold diwali-text-gradient">Final Total:</span>
                <span className="text-xl sm:text-2xl font-bold diwali-text-gradient">₹{getFinalTotal().toFixed(2)}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                onClick={clearCart}
                variant="outline"
                className="flex-1 border-2 border-red-400/80 bg-red-50/20 hover:bg-red-100/30 hover:border-red-500 text-red-600 hover:text-red-700 py-3 sm:py-4 font-semibold rounded-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                <Trash2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Clear Cart
              </Button>
              <Button
                onClick={handleWhatsAppOrder}
                disabled={isProcessing}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 text-sm sm:text-lg"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white mr-2"></div>
                    <span className="hidden sm:inline">Processing...</span>
                    <span className="sm:hidden">Processing</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                    <span className="hidden sm:inline">Order via WhatsApp</span>
                    <span className="sm:hidden">WhatsApp Order</span>
                  </>
                )}
              </Button>
            </div>

            {/* Delivery note */}
            <div className="mt-6 mb-4 p-4 diwali-glass-card rounded-xl border border-blue-400/30">
              <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--diwali-dark))' }}>
                📞 <strong>Note:</strong> After clicking "Order via WhatsApp", you'll be redirected to WhatsApp 
                where you can confirm your order details, delivery address, and payment method with us directly.
              </p>
            </div>
          </div>
        </div>
      </div>

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