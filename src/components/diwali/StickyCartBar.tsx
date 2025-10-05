import React from 'react';
import { ShoppingCart, MessageCircle } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/button';
import { supabase } from '../../lib/supabase';

const StickyCartBar: React.FC = () => {
  const { cart, getTotalItems, getFinalTotal } = useCart();
  
  const handleWhatsAppOrder = async () => {
    if (cart.length === 0) return;
    
    // Save to database before WhatsApp redirect (no OTP needed)
    try {
      const totalWeight = getTotalItems();
      const finalTotal = getFinalTotal();
      
      await supabase.from('abandoned_carts').insert([{
        customer_email: 'whatsapp-order@pending.com',
        customer_name: 'WhatsApp Order',
        mobile: 'pending',
        address: 'To be confirmed via WhatsApp',
        special_instructions: 'WhatsApp order - awaiting customer details',
        cart_items: cart as any,
        subtotal: finalTotal / 1.05,
        gst_amount: finalTotal * 0.05 / 1.05,
        total_amount: finalTotal,
        total_items: totalWeight,
      }]);
    } catch (error) {
      console.error('Error saving WhatsApp cart:', error);
    }
    
    // Create message without prices
    const orderDetails = cart.map(item => 
      `${item.name} - ${item.quantity}kg`
    ).join('\n');
    
    const message = `🪔 *Diwali Sweet Order* 🪔\n\nMy Order:\n${orderDetails}\n\n*Total Items: ${getTotalItems()}kg*\n\nPlease share the pricing and confirm availability and delivery details!\n\n*Happy Diwali!* ✨`;
    
    const whatsappUrl = `https://wa.me/918760101010?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const scrollToCart = () => {
    const cartSection = document.getElementById('cart');
    if (cartSection) {
      cartSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (cart.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-amber-300 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Cart Summary */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-amber-700" />
              <span className="font-bold text-amber-900">
                {getTotalItems()}kg
              </span>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-amber-900">
                ₹{getFinalTotal().toFixed(2)}
              </span>
              <p className="text-xs text-amber-600">
                🚚 Free delivery over ₹6000
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              onClick={scrollToCart}
              variant="outline"
              className="border-2 border-amber-400 text-amber-700 hover:bg-amber-50 font-semibold px-4 py-2 rounded-xl"
            >
              <span className="hidden sm:inline">View </span>Cart
            </Button>
            
            <Button
              onClick={handleWhatsAppOrder}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Order via </span>WhatsApp
            </Button>
          </div>
        </div>
        
        {/* GST Notice */}
        <div className="pb-2">
          <p className="text-xs text-amber-600 text-center">
            ₹ GST extra: 5% on all items • 🎁 Gift boxes available in multiple sizes
          </p>
        </div>
      </div>
    </div>
  );
};

export default StickyCartBar;