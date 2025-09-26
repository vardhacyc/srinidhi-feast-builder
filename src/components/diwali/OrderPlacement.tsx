import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { orderService, authService, isSupabaseConnected } from '../../lib/supabase';
import { DELIVERY_CONFIG } from '../../config/deliveryConfig';
import OrderForm from './OrderForm';
import SweetsConfetti from './SweetsConfetti';
import { Button } from '../ui/button';
import { ArrowLeft, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type OrderStep = 'form' | 'success';

interface OrderFormData {
  name: string;
  email: string;
  password: string;
  mobile: string;
  address: string;
  specialInstructions?: string;
}

interface OrderPlacementProps {
  onClose?: () => void;
}

const OrderPlacement: React.FC<OrderPlacementProps> = ({ onClose }) => {
  const { cart, clearCart, getTotalItems } = useCart();
  const { toast } = useToast();
  
  // Check if Supabase is connected
  if (!isSupabaseConnected()) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="diwali-glass-card rounded-3xl p-8">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-8 w-8 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold diwali-text-gradient mb-4">
            Supabase Connection Required
          </h2>
          
          <div className="space-y-4 text-diwali-dark text-left">
            <p>
              To enable online ordering with OTP verification, you need to connect your Supabase project.
            </p>
            
            <div className="diwali-glass-card rounded-xl p-4 border border-blue-400/30">
              <h3 className="font-semibold mb-2">📋 Setup Instructions:</h3>
              <ol className="text-sm space-y-2 list-decimal list-inside">
                <li>Click the green <strong>Supabase</strong> button in the top-right corner</li>
                <li>Follow the setup wizard to connect your project</li>
                <li>Enable <strong>Email Authentication</strong> in your Supabase dashboard</li>
                <li>Create the required database tables (orders, user_roles)</li>
              </ol>
            </div>
            
            <div className="diwali-glass-card rounded-xl p-4 border border-green-400/30">
              <p className="text-sm">
                💡 <strong>Alternative:</strong> You can still use <strong>WhatsApp ordering</strong> 
                which doesn't require Supabase setup. Just close this dialog and use the WhatsApp option.
              </p>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-diwali-gold to-amber-500 hover:from-amber-500 hover:to-diwali-gold text-white"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Refresh After Setup
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  const [currentStep, setCurrentStep] = useState<OrderStep>('form');
  const [formData, setFormData] = useState<OrderFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Calculate order totals
  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemGST = (item: any) => {
    const gstRate = item.category?.toLowerCase() === 'sweets' 
      ? DELIVERY_CONFIG.gstRates.sweets 
      : DELIVERY_CONFIG.gstRates.savouries;
    const itemTotal = item.price * item.quantity;
    return (itemTotal * gstRate) / 100;
  };

  const getTotalGST = () => {
    return cart.reduce((total, item) => total + getItemGST(item), 0);
  };

  const getFinalTotal = () => {
    return getSubtotal() + getTotalGST();
  };

  const handleFormSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);
    setFormData(data);
    
    try {
      // Try to sign up the user first
      let authResult;
      try {
        authResult = await authService.signUpWithEmail(data.email, data.password);
      } catch (signUpError: any) {
        // If user already exists, try to sign them in
        if (signUpError.message?.includes('already registered')) {
          authResult = await authService.signInWithEmail(data.email, data.password);
        } else {
          throw signUpError;
        }
      }

      // Create order in database
      const orderData = {
        customer_name: data.name,
        mobile: data.mobile,
        address: data.address,
        special_instructions: data.specialInstructions || '',
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          quantity: item.quantity,
          category: item.category,
          image: item.image
        })),
        subtotal: getSubtotal(),
        gst_amount: getTotalGST(),
        total_amount: getFinalTotal(),
        total_items: getTotalItems(),
        status: 'received' as const
      };

      const order = await orderService.createOrder(orderData);
      setOrderId(order.id);
      
      // Show success with confetti
      setCurrentStep('success');
      setShowConfetti(true);
      
      toast({
        title: "Order Placed Successfully! 🎉",
        description: "Your order has been received and we'll contact you soon.",
      });
      
      // Clear cart after successful order
      clearCart();
      
    } catch (error: any) {
      toast({
        title: "Order Failed",
        description: error.message || "Failed to place order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleStartNewOrder = () => {
    setCurrentStep('form');
    setFormData(null);
    setOrderId('');
  };

  if (currentStep === 'form') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold diwali-text-gradient">Place Your Order</h1>
          {onClose && (
            <Button
              onClick={onClose}
              variant="ghost"
              className="text-diwali-gold hover:text-amber-600"
            >
              ✕ Close
            </Button>
          )}
        </div>
        <OrderForm
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    );
  }


  if (currentStep === 'success') {
    return (
      <>
        <div className="max-w-2xl mx-auto p-6 text-center">
          <div className="diwali-glass-card rounded-3xl p-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold diwali-text-gradient mb-4">
              Order Placed Successfully! 🎉
            </h2>
            
            <div className="space-y-4 text-diwali-dark">
              <p className="text-lg">
                Thank you <strong>{formData?.name}</strong> for your order!
              </p>
              
              <div className="diwali-glass-card rounded-xl p-4 text-left">
                <h3 className="font-semibold mb-2">Order Details:</h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Order ID:</strong> {orderId.slice(0, 8).toUpperCase()}</p>
                  <p><strong>Email:</strong> {formData?.email}</p>
                  <p><strong>Mobile:</strong> +91 {formData?.mobile}</p>
                  <p><strong>Items:</strong> {getTotalItems()}kg</p>
                  <p><strong>Total:</strong> ₹{getFinalTotal().toFixed(2)}</p>
                </div>
              </div>
              
              <div className="diwali-glass-card rounded-xl p-4 border border-green-400/30">
                <p className="text-sm leading-relaxed">
                  🎊 <strong>What's Next?</strong> Our team will call you within 30 minutes to confirm 
                  your order details, delivery time, and payment method. Keep your phone handy!
                </p>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleStartNewOrder}
                variant="outline"
                className="border-diwali-gold text-diwali-gold hover:bg-diwali-gold hover:text-white"
              >
                Place Another Order
              </Button>
              
              <Button
                onClick={() => {
                  if (onClose) onClose();
                  window.location.href = '/diwali';
                }}
                className="bg-gradient-to-r from-diwali-gold to-amber-500 hover:from-amber-500 hover:to-diwali-gold text-white"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
        
        <SweetsConfetti
          isVisible={showConfetti}
          onAnimationEnd={() => setShowConfetti(false)}
        />
      </>
    );
  }

  return null;
};

export default OrderPlacement;