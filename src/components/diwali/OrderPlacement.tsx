import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { orderService, authService } from '../../lib/supabase';
import { DELIVERY_CONFIG } from '../../config/deliveryConfig';
import OrderForm from './OrderForm';
import OTPVerification from './OTPVerification';
import SweetsConfetti from './SweetsConfetti';
import { Button } from '../ui/button';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type OrderStep = 'form' | 'otp' | 'success';

interface OrderFormData {
  name: string;
  mobile: string;
  address: string;
  specialInstructions?: string;
}

const OrderPlacement: React.FC = () => {
  const { cart, clearCart, getTotalItems } = useCart();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState<OrderStep>('form');
  const [formData, setFormData] = useState<OrderFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpError, setOtpError] = useState('');
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
    try {
      // Send OTP
      await authService.sendOTP(data.mobile);
      setFormData(data);
      setCurrentStep('otp');
      toast({
        title: "OTP Sent!",
        description: `Verification code sent to +91 ${data.mobile}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send OTP. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOTPVerify = async (otp: string) => {
    if (!formData) return;
    
    setIsSubmitting(true);
    setOtpError('');
    
    try {
      // Verify OTP
      await authService.verifyOTP(formData.mobile, otp);
      
      // Create order in database
      const orderData = {
        customer_name: formData.name,
        mobile: formData.mobile,
        address: formData.address,
        special_instructions: formData.specialInstructions || '',
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
      setOtpError(error.message || "Invalid OTP. Please try again.");
      toast({
        title: "Verification Failed",
        description: "Please check your OTP and try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    if (!formData) return;
    
    setIsSubmitting(true);
    try {
      await authService.sendOTP(formData.mobile);
      setOtpError('');
      toast({
        title: "OTP Resent!",
        description: `New verification code sent to +91 ${formData.mobile}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to resend OTP. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToForm = () => {
    setCurrentStep('form');
    setOtpError('');
  };

  const handleStartNewOrder = () => {
    setCurrentStep('form');
    setFormData(null);
    setOrderId('');
    setOtpError('');
  };

  if (currentStep === 'form') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <OrderForm
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    );
  }

  if (currentStep === 'otp') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Button
            onClick={handleBackToForm}
            variant="ghost"
            className="text-diwali-gold hover:text-amber-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Form
          </Button>
        </div>
        
        <OTPVerification
          mobile={formData?.mobile || ''}
          onVerify={handleOTPVerify}
          onResend={handleResendOTP}
          isVerifying={isSubmitting}
          isResending={isSubmitting}
          error={otpError}
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
                onClick={() => window.location.href = '/diwali'}
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