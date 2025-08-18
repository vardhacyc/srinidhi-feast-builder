
import React, { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
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
      <section id="cart" className="py-16 px-4 bg-gradient-to-br from-food-yellow-50 to-food-yellow-100 animate-gradient">
        <div className="container mx-auto text-center">
          <div className="bg-white rounded-xl shadow-lg p-12 max-w-md mx-auto">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-orange-800 mb-4">Your Cart is Empty</h2>
            <p className="text-orange-600 mb-6">
              Start adding some delicious sweets to your cart!
            </p>
            <button
              onClick={() => document.getElementById('sweets')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all"
            >
              Browse Sweets
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="cart" className="py-16 px-4 bg-gradient-to-br from-food-yellow-50 to-food-yellow-100 animate-gradient">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-800 mb-4">
            🛒 Your Sweet Cart
          </h2>
          <p className="text-orange-600">
            Review your selection and proceed to order via WhatsApp
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Customer name input */}
          <div className="p-6 border-b border-orange-100 bg-gradient-to-r from-orange-100 to-yellow-100">
            <label className="block text-orange-800 font-bold mb-2">
              👤 Your Name (Required)
            </label>
            <Input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full p-3 border-2 border-orange-200 rounded-lg focus:border-orange-500"
            />
          </div>

          {/* Cart items */}
          <div className="p-6">
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg">
                  <div className="text-3xl">{item.image}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-orange-800">{item.name}</h3>
                    <p className="text-orange-600 text-sm">{item.description}</p>
                    <p className="text-orange-800 font-semibold">₹{item.price}/kg</p>
                  </div>
                  
                  {/* Quantity controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-orange-200 hover:bg-orange-300 text-orange-800 p-1 rounded"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="bg-white px-3 py-1 rounded font-bold text-orange-800 min-w-[60px] text-center">
                      {item.quantity}kg
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-orange-200 hover:bg-orange-300 text-orange-800 p-1 rounded"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {/* Item total */}
                  <div className="text-right min-w-[80px]">
                    <div className="font-bold text-orange-800">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                  
                  {/* Remove button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Cart summary */}
            <div className="mt-6 p-4 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-orange-800 font-semibold">Total Items:</span>
                <span className="text-orange-800 font-bold">{getTotalItems()}kg</span>
              </div>
              <div className="flex justify-between items-center text-xl">
                <span className="text-orange-800 font-bold">Total Amount:</span>
                <span className="text-orange-800 font-bold">₹{getTotalPrice()}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button
                onClick={clearCart}
                variant="outline"
                className="flex-1 border-2 border-orange-300 text-orange-600 hover:bg-orange-100"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
              <Button
                onClick={handleWhatsAppOrder}
                disabled={isProcessing || !customerName.trim()}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed animate-pulse-glow btn-enhanced"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
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
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-800 text-sm">
                📞 <strong>Note:</strong> After clicking "Order via WhatsApp", you'll be redirected to WhatsApp 
                where you can confirm your order details, delivery address, and payment method with us directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiwaliCart;
