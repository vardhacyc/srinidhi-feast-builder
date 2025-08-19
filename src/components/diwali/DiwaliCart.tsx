import React, { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle, Star } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

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

  const handleWhatsAppOrder = () => {
    if (!customerName.trim()) {
      alert('Please enter your name before proceeding');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsProcessing(true);

    // Create WhatsApp message with timestamp to ensure uniqueness
    const orderDetails = cart.map(item => 
      `• ${item.name} - ${item.quantity}kg × ₹${item.price} = ₹${item.price * item.quantity}`
    ).join('\n');

    const totalAmount = getTotalPrice();
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

👋 Hi! I'm ${customerName}

*My Order:*
${orderDetails}

*Total Amount: ₹${totalAmount}*
*Total Items: ${getTotalItems()}kg*

📱 Please confirm my order and let me know:
- Delivery details
- Payment options
- Estimated delivery time

Thank you! 🙏

*Happy Diwali!* ✨

Order ID: ${Date.now()}`;

    const phoneRaw = '9994316559';
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
      <section id="cart" className="relative py-20 premium-gradient section-divider">
        <div className="container mx-auto text-center px-6">
          <div className="glass-card rounded-3xl p-16 max-w-md mx-auto">
            <div className="text-8xl mb-6 opacity-60">🛒</div>
            <h2 className="text-3xl font-bold text-foreground mb-4 text-shadow-gold">Your Cart is Empty</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Start adding some delicious sweets to your cart!
            </p>
            <button
              onClick={() => document.getElementById('sweets')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-glossy text-white px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all duration-300 hover:scale-110"
            >
              Browse Collection
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="cart" className="relative py-20 premium-gradient section-divider">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            <ShoppingBag className="h-8 w-8 text-primary mr-2" />
            <h2 className="text-4xl md:text-6xl font-bold text-foreground text-shadow-gold">
              Your Sweet Cart
            </h2>
            <ShoppingBag className="h-8 w-8 text-primary ml-2" />
          </div>
          <p className="text-xl text-muted-foreground">
            Review your selection and proceed to order via WhatsApp
          </p>
        </div>

        <div className="glass-card rounded-3xl overflow-hidden">
          {/* Customer name input */}
          <div className="p-8 border-b border-white/10 bg-gradient-to-r from-primary/10 to-accent/10">
            <label className="block text-foreground font-bold mb-3 text-lg">
              👤 Your Name (Required)
            </label>
            <Input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full p-4 bg-card border-2 border-white/20 rounded-xl focus:border-primary text-foreground placeholder:text-muted-foreground text-lg"
            />
          </div>

          {/* Cart items */}
          <div className="p-8">
            <div className="space-y-6">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-6 p-6 glass-card rounded-2xl hover:scale-105 transition-all duration-300">
                  <div className="text-4xl">{item.image}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-lg text-shadow-gold">{item.name}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                    <p className="text-primary font-semibold text-lg">₹{item.price}/kg</p>
                  </div>
                  
                  {/* Quantity controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flowing-card hover:bg-primary/20 text-foreground p-2 rounded-full transition-all duration-300 hover:scale-110"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="bg-card px-4 py-2 rounded-full font-bold text-foreground min-w-[80px] text-center border border-white/20">
                      {item.quantity}kg
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flowing-card hover:bg-primary/20 text-foreground p-2 rounded-full transition-all duration-300 hover:scale-110"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {/* Item total */}
                  <div className="text-right min-w-[100px]">
                    <div className="font-bold text-primary text-xl text-shadow-gold">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                  
                  {/* Remove button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-red-500/20 transition-all duration-300"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Cart summary */}
            <div className="mt-8 p-6 gold-gradient rounded-2xl">
              <div className="flex justify-between items-center mb-3">
                <span className="text-accent-foreground font-semibold text-lg">Total Items:</span>
                <span className="text-accent-foreground font-bold text-lg">{getTotalItems()}kg</span>
              </div>
              <div className="flex justify-between items-center text-2xl">
                <span className="text-accent-foreground font-bold">Total Amount:</span>
                <span className="text-accent-foreground font-bold">₹{getTotalPrice()}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-6">
              <Button
                onClick={clearCart}
                variant="outline"
                className="flex-1 border-2 border-white/30 text-foreground hover:bg-white/10 py-4 text-lg font-semibold rounded-xl"
              >
                <Trash2 className="h-5 w-5 mr-2" />
                Clear Cart
              </Button>
              <Button
                onClick={handleWhatsAppOrder}
                disabled={isProcessing || !customerName.trim()}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Order via WhatsApp
                  </>
                )}
              </Button>
            </div>

            {/* Delivery note */}
            <div className="mt-8 p-6 flowing-card rounded-2xl border border-blue-500/30">
              <p className="text-foreground text-sm leading-relaxed">
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