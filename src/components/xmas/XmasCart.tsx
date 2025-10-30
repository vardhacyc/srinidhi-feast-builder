import React, { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle, Star, CreditCard } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { DELIVERY_CONFIG } from '../../config/deliveryConfig';
import OrderPlacement from '../diwali/OrderPlacement';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

const XmasCart = () => {
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
  const getItemGST = (item: { category?: string; price: number; quantity: number }) => {
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
    
    const message = `🎄 *Christmas & New Year Order* 🎄
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

*Merry Christmas & Happy New Year!* ✨

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
    }, 4000);
  };

  if (cart.length === 0) {
    return (
      <section id="cart" className="relative py-20">
        <div className="container mx-auto text-center px-6">
          <div className="xmas-glass-card p-16 max-w-md mx-auto shadow-xl">
            <div className="text-8xl mb-6 opacity-60">🛒</div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'hsl(var(--xmas-dark))', textShadow: '1px 1px 2px hsla(var(--xmas-shadow), 0.2)' }}>Your Cart is Empty</h2>
            <p className="mb-8 leading-relaxed font-medium" style={{ color: 'hsl(var(--xmas-text))' }}>
              Start adding some delicious festive treats to your cart!
            </p>
            <button
              onClick={() => document.getElementById('sweets')?.scrollIntoView({ behavior: 'smooth' })}
              className="xmas-btn px-8 py-4 rounded-full font-bold xmas-shadow transition-all duration-300 hover:scale-110"
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
            <ShoppingBag className="h-8 w-8 mr-2" style={{ color: 'hsl(var(--xmas-red))' }} />
            <h2 className="text-4xl md:text-6xl font-bold" style={{ color: 'hsl(var(--xmas-dark))', textShadow: '2px 2px 4px hsla(var(--xmas-shadow), 0.3)' }}>
              Your Festive Cart
            </h2>
            <ShoppingBag className="h-8 w-8 ml-2" style={{ color: 'hsl(var(--xmas-green))' }} />
          </div>
          <p className="text-xl font-semibold" style={{ color: 'hsl(var(--xmas-text))', textShadow: '1px 1px 2px hsla(var(--xmas-shadow), 0.2)' }}>
            Review your selection and proceed to order
          </p>
        </div>

        <div className="xmas-glass-card overflow-hidden shadow-xl">
          {/* Customer name input */}
          <div className="p-6 border-b" style={{ borderColor: 'hsla(var(--xmas-gold), 0.3)', background: 'hsla(var(--xmas-white), 0.5)' }}>
            <label className="block font-bold mb-3" style={{ color: 'hsl(var(--xmas-dark))' }}>
              👤 Your Name (Optional)
            </label>
            <Input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name (optional)"
              className="w-full p-3 border-2 rounded-xl font-medium"
              style={{ 
                borderColor: 'hsl(var(--xmas-gold))', 
                background: 'hsl(var(--xmas-cream))', 
                color: 'hsl(var(--xmas-dark))',
              }}
            />
          </div>

          {/* Cart items */}
          <div className="p-6">
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:scale-102 transition-all duration-300 shadow-sm" style={{ background: 'hsla(var(--xmas-cream), 0.9)', border: '1px solid hsla(var(--xmas-gold), 0.3)'}}>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base sm:text-lg leading-snug" style={{ color: 'hsl(var(--xmas-dark))', textShadow: '1px 1px 2px hsla(var(--xmas-shadow), 0.1)' }}>{item.name}</h3>
                      <p className="text-xs sm:text-sm font-medium" style={{ color: 'hsl(var(--xmas-text))' }}>₹{item.price}/kg</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 sm:hidden"
                      style={{ background: 'hsl(var(--xmas-red))', color: 'white' }}
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(0.5, item.quantity - 0.5))}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold hover:scale-110 transition-all duration-300"
                        style={{ background: 'hsl(var(--xmas-green))', color: 'white' }}
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                      <span className="font-black text-lg sm:text-xl min-w-[3rem] sm:min-w-[4rem] text-center" style={{ color: 'hsl(var(--xmas-dark))' }}>
                        {item.quantity}kg
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 0.5)}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold hover:scale-110 transition-all duration-300"
                        style={{ background: 'hsl(var(--xmas-green))', color: 'white' }}
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-black text-lg sm:text-xl" style={{ color: 'hsl(var(--xmas-red))' }}>
                        ₹{(item.price * item.quantity + getItemGST(item)).toFixed(2)}
                      </p>
                      <p className="text-xs font-medium" style={{ color: 'hsl(var(--xmas-muted))' }}>
                        incl. GST
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="hidden sm:flex w-10 h-10 rounded-full items-center justify-center hover:scale-110 transition-all duration-300"
                      style={{ background: 'hsl(var(--xmas-red))', color: 'white' }}
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order summary */}
          <div className="p-6 border-t space-y-3" style={{ borderColor: 'hsla(var(--xmas-gold), 0.3)', background: 'hsla(var(--xmas-white), 0.5)' }}>
            <div className="flex justify-between items-center font-semibold">
              <span style={{ color: 'hsl(var(--xmas-text))' }}>Subtotal:</span>
              <span style={{ color: 'hsl(var(--xmas-dark))' }}>₹{getSubtotal()}</span>
            </div>
            <div className="flex justify-between items-center font-semibold">
              <span style={{ color: 'hsl(var(--xmas-text))' }}>GST:</span>
              <span style={{ color: 'hsl(var(--xmas-dark))' }}>₹{getTotalGST().toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t" style={{ borderColor: 'hsla(var(--xmas-gold), 0.5)' }}>
              <span className="text-xl font-black" style={{ color: 'hsl(var(--xmas-dark))' }}>Total:</span>
              <span className="text-2xl font-black" style={{ color: 'hsl(var(--xmas-red))' }}>₹{getFinalTotal().toFixed(2)}</span>
            </div>
            <p className="text-xs text-center pt-2" style={{ color: 'hsl(var(--xmas-muted))' }}>
              Total Items: {getTotalItems()}kg
            </p>
          </div>

          {/* Order buttons */}
          <div className="p-6 space-y-4">
            <button
              onClick={handleWhatsAppOrder}
              disabled={isProcessing}
              className="w-full xmas-btn py-4 rounded-xl font-black text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
              style={{
                background: isProcessing ? 'hsl(var(--xmas-muted))' : undefined
              }}
            >
              <MessageCircle className="h-6 w-6" />
              <span>{isProcessing ? 'Opening WhatsApp...' : 'Order via WhatsApp'}</span>
            </button>

            <button
              onClick={() => setShowOrderPlacement(true)}
              className="w-full py-4 rounded-xl font-black text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-3"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--xmas-green)) 0%, hsl(var(--xmas-dark-green)) 100%)',
                color: 'white',
                border: '1px solid hsla(var(--xmas-white), 0.5)',
                boxShadow: '0 8px 25px hsla(var(--xmas-green), 0.4)'
              }}
            >
              <CreditCard className="h-6 w-6" />
              <span>Place Order Online</span>
            </button>
          </div>
        </div>
      </div>

      {/* Order Placement Dialog */}
      <Dialog open={showOrderPlacement} onOpenChange={setShowOrderPlacement}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold" style={{ color: 'hsl(var(--xmas-dark))' }}>
              🎄 Place Your Christmas Order
            </DialogTitle>
          </DialogHeader>
          <OrderPlacement onClose={() => setShowOrderPlacement(false)} />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default XmasCart;
