import React, { useState, useEffect } from 'react';
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
  const [activeOrders, setActiveOrders] = useState(7);
  const [orderMethod, setOrderMethod] = useState<'none' | 'online' | 'whatsapp'>('none');

  // Update active orders count every 5 minutes with random numbers 1-14 (avoiding round numbers)
  useEffect(() => {
    const updateActiveOrders = () => {
      const avoidNumbers = [5, 10]; // Avoid round numbers
      let newNumber;
      do {
        newNumber = Math.floor(Math.random() * 14) + 1; // 1-14
      } while (avoidNumbers.includes(newNumber));
      setActiveOrders(newNumber);
    };

    const interval = setInterval(updateActiveOrders, 5 * 60 * 1000); // 5 minutes
    return () => clearInterval(interval);
  }, []);

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
          <div className="diwali-glass-card p-16 max-w-md mx-auto shadow-xl">
            <div className="text-8xl mb-6 opacity-60">🛒</div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'hsl(var(--diwali-dark))', textShadow: '1px 1px 2px hsla(var(--diwali-shadow), 0.2)' }}>Your Cart is Empty</h2>
            <p className="mb-8 leading-relaxed font-medium" style={{ color: 'hsl(var(--diwali-text))' }}>
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
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'hsl(var(--diwali-dark))' }}>
            Your Cart
          </h2>
          <p className="text-base text-gray-600">
            Review your selection and choose your preferred ordering method
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Cart items */}
          <div className="p-6">
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl hover:scale-102 transition-all duration-300 shadow-sm" style={{ background: 'hsla(var(--diwali-cream), 0.9)', border: '1px solid hsla(var(--diwali-gold), 0.3)'}}>
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = '/placeholder-sweet.jpg';
                      }}
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg leading-tight mb-1" style={{ color: 'hsl(var(--diwali-dark))', textShadow: '1px 1px 2px hsla(var(--diwali-shadow), 0.1)' }}>
                      {item.name}
                    </h3>
                    <p className="text-sm font-medium" style={{ color: 'hsl(var(--diwali-text))' }}>
                      ₹{item.price}/kg
                    </p>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
                      style={{ background: 'hsl(var(--diwali-light))', border: '1px solid hsl(var(--diwali-gold))', color: 'hsl(var(--diwali-dark))' }}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-1.5 rounded-full font-bold text-center min-w-[70px]" style={{ background: 'hsl(var(--diwali-light))', border: '1px solid hsl(var(--diwali-gold))', color: 'hsl(var(--diwali-dark))' }}>
                      {item.quantity}kg
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
                      style={{ background: 'hsl(var(--diwali-light))', border: '1px solid hsl(var(--diwali-gold))', color: 'hsl(var(--diwali-dark))' }}
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {/* Item Total Price */}
                  <div className="text-right min-w-[100px] flex-shrink-0">
                    <div className="font-bold text-xl" style={{ color: 'hsl(var(--diwali-dark))', textShadow: '1px 1px 2px hsla(var(--diwali-shadow), 0.1)' }}>
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                  
                  {/* Delete Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 flex-shrink-0"
                    style={{ background: 'hsla(var(--diwali-bronze), 0.1)', color: 'hsl(var(--diwali-dark))' }}
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Cart summary */}
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl" style={{ background: 'hsla(var(--diwali-light), 0.8)', border: '2px solid hsl(var(--diwali-gold))' }}>
              <div className="flex justify-between items-center mb-2 pb-2" style={{ borderBottom: '1px solid hsl(var(--diwali-gold))' }}>
                <span className="text-base sm:text-lg font-semibold" style={{ color: 'hsl(var(--diwali-dark))' }}>Total Items:</span>
                <span className="text-base sm:text-lg font-bold" style={{ color: 'hsl(var(--diwali-dark))' }}>{getTotalItems()}kg</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-base sm:text-lg font-semibold" style={{ color: 'hsl(var(--diwali-dark))' }}>Subtotal:</span>
                <span className="text-base sm:text-lg font-bold" style={{ color: 'hsl(var(--diwali-dark))' }}>₹{getSubtotal()}</span>
              </div>
              <div className="flex justify-between items-center mb-3 pb-2" style={{ borderBottom: '1px solid hsl(var(--diwali-gold))' }}>
                <span className="text-base sm:text-lg font-semibold" style={{ color: 'hsl(var(--diwali-dark))' }}>GST:</span>
                <span className="text-base sm:text-lg font-bold" style={{ color: 'hsl(var(--diwali-dark))' }}>₹{getTotalGST().toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xl sm:text-2xl font-bold" style={{ color: 'hsl(var(--diwali-dark))', textShadow: '1px 1px 2px hsla(var(--diwali-shadow), 0.2)' }}>Final Total:</span>
                <span className="text-xl sm:text-2xl font-bold" style={{ color: 'hsl(var(--diwali-dark))', textShadow: '1px 1px 2px hsla(var(--diwali-shadow), 0.2)' }}>₹{getFinalTotal().toFixed(2)}</span>
              </div>
            </div>

              {/* Conditional Name Input for WhatsApp Orders */}
              {orderMethod === 'whatsapp' && (
                <div className="mb-6 p-4 bg-green-50 rounded-xl border-2 border-green-200">
                  <label className="block text-sm font-semibold text-green-800 mb-2">
                    Your Name (Optional)
                  </label>
                  <Input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your name for WhatsApp order"
                    className="w-full p-3 border border-green-300 rounded-lg bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>
              )}

              {/* Apple-Style Action Buttons */}
            <div className="mt-8 space-y-3">
              
              {/* Primary Order Button - Apple Style */}
              <Button
                onClick={() => {
                  setOrderMethod('online');
                  setShowOrderPlacement(true);
                }}
                className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 active:scale-[0.98] border-0"
                style={{
                  boxShadow: '0 2px 8px -2px rgba(59, 130, 246, 0.5), 0 4px 16px -8px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="flex items-center justify-center space-x-3">
                  <CreditCard className="h-5 w-5" />
                  <span className="text-base">Place Order Online</span>
                </div>
              </Button>

              {/* WhatsApp Button - Apple Style */}
              <Button
                onClick={() => {
                  if (orderMethod !== 'whatsapp') {
                    setOrderMethod('whatsapp');
                  } else {
                    handleWhatsAppOrder();
                  }
                }}
                disabled={isProcessing}
                className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 active:scale-[0.98] border-0 disabled:opacity-50"
                style={{
                  boxShadow: '0 2px 8px -2px rgba(34, 197, 94, 0.5), 0 4px 16px -8px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="flex items-center justify-center space-x-3">
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span className="text-base">Connecting...</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-base">
                        {orderMethod === 'whatsapp' ? 'Send WhatsApp Order' : 'Order via WhatsApp'}
                      </span>
                    </>
                  )}
                </div>
              </Button>              {/* Dynamic Active Orders Counter */}
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-500/15 to-emerald-500/15 border-2 border-green-300/40 p-4 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                <div className="relative flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
                  <span className="text-sm font-bold text-green-800">Active: {activeOrders} orders in last hour</span>
                </div>
              </div>

              {/* Bottom Actions & Assurance */}
              <div className="space-y-4">


                {/* Crisp Clear Cart */}
                <div className="pt-2" style={{ borderTop: '2px solid hsla(var(--diwali-gold), 0.6)' }}>
                  <Button
                    onClick={clearCart}
                    variant="ghost"
                    className="w-full hover:bg-red-500/15 py-3 font-bold rounded-xl transition-all duration-200 text-sm border-2 hover:border-red-300/60 shadow-sm hover:shadow-md active:scale-95"
                    style={{ color: 'hsl(var(--diwali-dark))', borderColor: 'hsla(var(--diwali-gold), 0.4)' }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                </div>
              </div>


            </div>

            {orderMethod === 'whatsapp' && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-700">
                  � <strong>WhatsApp Order:</strong> Your order details will be sent to our WhatsApp for quick processing.
                </p>
              </div>
            )}
            
            {orderMethod === 'online' && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700">
                  🔒 <strong>Online Order:</strong> Complete form with OTP verification for secure ordering.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Placement Modal */}
      <Dialog open={showOrderPlacement} onOpenChange={setShowOrderPlacement}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0 bg-transparent border-none">
          <div className="min-h-full rounded-3xl" style={{ background: 'linear-gradient(to bottom right, hsl(var(--diwali-cream)), hsl(var(--diwali-light)))' }}>
            <OrderPlacement onClose={() => setShowOrderPlacement(false)} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Top Wave Divider */}
            {/* Premium Golden Wave Divider */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden">
        <div className="relative h-16">
          {/* Premium layered waves with golden theme */}
          <div className="absolute inset-0">
            <svg viewBox="0 0 1200 120" className="w-full h-full">
              <defs>
                <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--diwali-gold))', stopOpacity: 0.3 }} />
                  <stop offset="50%" style={{ stopColor: 'hsl(var(--diwali-bronze))', stopOpacity: 0.4 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--diwali-gold))', stopOpacity: 0.3 }} />
                </linearGradient>
                <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--diwali-light))', stopOpacity: 0.6 }} />
                  <stop offset="50%" style={{ stopColor: 'hsl(var(--diwali-cream))', stopOpacity: 0.8 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--diwali-light))', stopOpacity: 0.6 }} />
                </linearGradient>
                <linearGradient id="wave-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--diwali-cream))', stopOpacity: 0.9 }} />
                  <stop offset="50%" style={{ stopColor: 'hsl(var(--diwali-light))', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--diwali-cream))', stopOpacity: 0.9 }} />
                </linearGradient>
              </defs>
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="url(#wave-gradient-1)" transform="rotate(180 600 60)"></path>
              <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="url(#wave-gradient-2)" transform="rotate(180 600 60)"></path>
              <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="url(#wave-gradient-3)" transform="rotate(180 600 60)"></path>
            </svg>
          </div>
          {/* Premium shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"></div>
        </div>
      </div>
    </section>
  );
};

export default DiwaliCart;