import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useCart } from '../../contexts/CartContext';
import { Phone, User, MapPin, FileText, Loader2, Mail } from 'lucide-react';
import { featureService, supabase } from '../../lib/supabase';
import { useToast } from '@/hooks/use-toast';
import OTPVerification from './OTPVerification';

const orderSchema = z.object({
  name: z.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: z.string()
    .trim()
    .email('Please enter a valid email address'),
  mobile: z.string()
    .trim()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  address: z.string()
    .trim()
    .min(10, 'Address must be at least 10 characters')
    .max(500, 'Address must be less than 500 characters'),
  city: z.string()
    .trim()
    .min(2, 'City is required')
    .max(100, 'City name too long'),
  state: z.string()
    .trim()
    .min(2, 'State is required')
    .max(100, 'State name too long'),
  pincode: z.string()
    .trim()
    .regex(/^\d{6}$/, 'Please enter a valid 6-digit pincode'),
  deliveryDate: z.string()
    .trim()
    .min(1, 'Please select a delivery date'),
  deliveryTime: z.string()
    .trim()
    .min(1, 'Please select a delivery time'),
  specialInstructions: z.string()
    .max(200, 'Special instructions must be less than 200 characters')
    .optional()
});

type OrderFormData = z.infer<typeof orderSchema>;

interface OrderFormWithOTPProps {
  onSubmit: (data: OrderFormData & { otpVerified: boolean }) => Promise<void>;
  isSubmitting: boolean;
}

const OrderFormWithOTP: React.FC<OrderFormWithOTPProps> = ({ onSubmit, isSubmitting }) => {
  const { cart, getTotalItems, getFinalTotal } = useCart();
  const { toast } = useToast();
  const [requireOTP, setRequireOTP] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<OrderFormData | null>(null);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema)
  });

  // Check if OTP is required
  React.useEffect(() => {
    const checkOTPRequirement = async () => {
      try {
        const feature = await featureService.getFeature('require_email_otp');
        setRequireOTP(feature?.is_enabled ?? true);
      } catch (error) {
        console.error('Failed to fetch feature flag:', error);
      }
    };
    checkOTPRequirement();
  }, []);

  const formatMobile = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 10);
  };

  const handleFormSubmission = async (data: OrderFormData) => {
    if (requireOTP) {
      // Save to abandoned cart before sending OTP
      await saveToAbandonedCart(data);
      
      // Send OTP and show verification screen
      setPendingFormData(data);
      setIsSendingOTP(true);
      
      try {
        const { data: otpData, error } = await supabase.functions.invoke('send-otp', {
          body: { 
            email: data.email,
            customerName: data.name
          }
        });

        if (error) throw error;
        if (!otpData?.success) throw new Error(otpData?.error || 'Failed to send OTP');

        setShowOTP(true);
        toast({
          title: "OTP Sent! 📧",
          description: `Verification code sent to ${data.email}`,
        });
      } catch (error: any) {
        toast({
          title: "Failed to Send OTP",
          description: error.message || "Please try again",
          variant: "destructive",
        });
      } finally {
        setIsSendingOTP(false);
      }
    } else {
      // Submit directly without OTP
      await onSubmit({ ...data, otpVerified: false });
    }
  };

  const saveToAbandonedCart = async (data: OrderFormData) => {
    try {
      const totalWeight = getTotalItems();
      const finalTotal = getFinalTotal();
      
      const { error } = await supabase.from('abandoned_carts').insert([{
        customer_email: data.email,
        customer_name: data.name,
        mobile: data.mobile,
        address: `${data.address}, ${data.city}, ${data.state} - ${data.pincode}`,
        delivery_date: data.deliveryDate,
        delivery_time: data.deliveryTime,
        special_instructions: data.specialInstructions || null,
        cart_items: cart as any,
        subtotal: finalTotal / 1.05, // Calculate subtotal (assuming 5% GST)
        gst_amount: finalTotal * 0.05 / 1.05,
        total_amount: finalTotal,
        total_items: totalWeight,
      }]);

      if (error) {
        console.error('Error saving to abandoned cart:', error);
      }
    } catch (err) {
      console.error('Failed to save abandoned cart:', err);
    }
  };

  const handleOTPVerification = async (otp: string) => {
    if (!pendingFormData) return;
    
    setIsVerifyingOTP(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-otp', {
        body: { 
          email: pendingFormData.email,
          otp: otp
        }
      });

      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || 'Invalid OTP');

      toast({
        title: "Email Verified! ✓",
        description: "Placing your order now...",
      });
      await onSubmit({ ...pendingFormData, otpVerified: true });
    } catch (error: any) {
      toast({
        title: "Invalid OTP",
        description: error.message || "Please check your code and try again",
        variant: "destructive"
      });
      // handled via toast
    } finally {
      setIsVerifyingOTP(false);
    }
  };

  const handleResendOTP = async () => {
    if (!pendingFormData) return;
    
    try {
      const { data, error } = await supabase.functions.invoke('send-otp', {
        body: { 
          email: pendingFormData.email,
          customerName: pendingFormData.name
        }
      });

      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || 'Failed to resend OTP');

      toast({
        title: "OTP Resent! 📧",
        description: "Check your email for a new verification code",
      });
    } catch (error: any) {
      toast({
        title: "Failed to Resend OTP",
        description: error.message || "Please try again",
        variant: "destructive",
      });
       // handled via toast
    }
  };

  // Scroll to top when OTP screen is shown
  React.useEffect(() => {
    if (showOTP) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showOTP]);

  const totalWeight = getTotalItems();
  const isFreeDelivery = totalWeight >= 10;

  if (showOTP && pendingFormData) {
    return (
      <div className="bg-gradient-to-br from-amber-50/90 to-amber-100/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 max-w-2xl mx-auto border-2 border-amber-300 shadow-2xl">
        <OTPVerification
          email={pendingFormData.email}
          onVerify={handleOTPVerification}
          onResend={handleResendOTP}
          isVerifying={isVerifyingOTP}
          onBack={() => {
            setShowOTP(false);
            setPendingFormData(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-amber-50/90 to-amber-100/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 max-w-2xl mx-auto border-2 border-amber-300 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-amber-900 mb-2" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
          Complete Your Order
        </h2>
        <p className="text-amber-800 font-medium">
          {requireOTP ? 'We\'ll send an OTP to verify your email' : 'Please provide your details to proceed'}
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmission)} className="space-y-6">
        {/* Personal Details Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-amber-900 flex items-center gap-2" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
            <User className="h-5 w-5 text-amber-700" />
            Personal Details
          </h3>
          
          <div>
            <Label htmlFor="name" className="text-amber-900 font-bold text-sm">
              Full Name *
            </Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Enter your full name"
              className="mt-2 bg-white/95 border-2 border-amber-300 focus:border-amber-500 text-amber-900 placeholder:text-amber-600 font-medium"
              disabled={isSubmitting || isSendingOTP}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="text-amber-900 font-bold text-sm">
              Email Address * {requireOTP && <span className="text-xs">(for OTP verification)</span>}
            </Label>
            <div className="relative mt-2">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Mail className="h-4 w-4 text-amber-700" />
              </div>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="Enter your email address"
                className="pl-10 bg-white/95 border-2 border-amber-300 focus:border-amber-500 text-amber-900 placeholder:text-amber-600 font-medium"
                disabled={isSubmitting || isSendingOTP}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="mobile" className="text-amber-900 font-bold text-sm">
              Mobile Number *
            </Label>
            <div className="relative mt-2">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2 text-amber-700">
                <Phone className="h-4 w-4" />
                <span className="text-sm font-bold">+91</span>
              </div>
              <Input
                id="mobile"
                {...register('mobile', {
                  onChange: (e) => {
                    e.target.value = formatMobile(e.target.value);
                  }
                })}
                placeholder="Enter 10-digit mobile number"
                className="pl-16 bg-white/95 border-2 border-amber-300 focus:border-amber-500 text-amber-900 placeholder:text-amber-600 font-medium"
                maxLength={10}
                disabled={isSubmitting || isSendingOTP}
              />
            </div>
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
            )}
          </div>
        </div>

        {/* Delivery Details Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-amber-900 flex items-center gap-2" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
            <MapPin className="h-5 w-5 text-amber-700" />
            Delivery Details
          </h3>
          
          <div>
            <Label htmlFor="address" className="text-amber-900 font-bold text-sm">
              Street Address *
            </Label>
            <Textarea
              id="address"
              {...register('address')}
              placeholder="House/Flat number, Street name, Landmark"
              className="mt-2 bg-white/95 border-2 border-amber-300 focus:border-amber-500 text-amber-900 placeholder:text-amber-600 font-medium min-h-[80px]"
              disabled={isSubmitting || isSendingOTP}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city" className="text-amber-900 font-bold text-sm">
                City *
              </Label>
              <Input
                id="city"
                {...register('city')}
                placeholder="City"
                className="mt-2 bg-white/95 border-2 border-amber-300 focus:border-amber-500 text-amber-900 placeholder:text-amber-600 font-medium"
                disabled={isSubmitting || isSendingOTP}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="state" className="text-amber-900 font-bold text-sm">
                State *
              </Label>
              <Input
                id="state"
                {...register('state')}
                placeholder="State"
                className="mt-2 bg-white/95 border-2 border-amber-300 focus:border-amber-500 text-amber-900 placeholder:text-amber-600 font-medium"
                disabled={isSubmitting || isSendingOTP}
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="pincode" className="text-amber-900 font-bold text-sm">
              Pincode *
            </Label>
            <Input
              id="pincode"
              {...register('pincode')}
              placeholder="6-digit pincode"
              maxLength={6}
              className="mt-2 bg-white/95 border-2 border-amber-300 focus:border-amber-500 text-amber-900 placeholder:text-amber-600 font-medium"
              disabled={isSubmitting || isSendingOTP}
            />
            {errors.pincode && (
              <p className="text-red-500 text-sm mt-1">{errors.pincode.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="deliveryDate" className="text-amber-900 font-bold text-sm">
                Delivery Date *
              </Label>
              <Input
                id="deliveryDate"
                type="date"
                {...register('deliveryDate')}
                min={new Date().toISOString().split('T')[0]}
                className="mt-2 bg-white/95 border-2 border-amber-300 focus:border-amber-500 text-amber-900 font-medium"
                disabled={isSubmitting || isSendingOTP}
              />
              {errors.deliveryDate && (
                <p className="text-red-500 text-sm mt-1">{errors.deliveryDate.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="deliveryTime" className="text-amber-900 font-bold text-sm">
                Delivery Time *
              </Label>
              <Input
                id="deliveryTime"
                type="time"
                {...register('deliveryTime')}
                className="mt-2 bg-white/95 border-2 border-amber-300 focus:border-amber-500 text-amber-900 font-medium"
                disabled={isSubmitting || isSendingOTP}
              />
              {errors.deliveryTime && (
                <p className="text-red-500 text-sm mt-1">{errors.deliveryTime.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="bg-amber-50/80 backdrop-blur-sm rounded-xl p-4 border-2 border-amber-400">
          <h3 className="text-lg font-bold text-amber-900 mb-3" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
            Order Summary
          </h3>
          <div className="space-y-2 text-sm">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between">
                <span className="text-amber-900 font-medium">{item.name} ({item.quantity}kg)</span>
                <span className="font-bold text-amber-900">₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t border-amber-400 pt-2 mt-2">
              <div className="flex justify-between text-base">
                <span className="font-bold text-amber-900">Total Weight:</span>
                <span className="font-bold text-amber-900">{totalWeight}kg</span>
              </div>
              <div className="flex justify-between font-bold text-amber-900 text-base mt-1">
                <span>Total Amount:</span>
                <span>₹{getFinalTotal().toFixed(2)}</span>
              </div>
              {isFreeDelivery && (
                <div className="mt-2 p-2 bg-green-100 rounded-lg text-center">
                  <span className="text-green-800 font-bold text-sm">🎉 FREE Delivery (10kg+)</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Special Instructions Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-amber-900 flex items-center gap-2" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
            <FileText className="h-5 w-5 text-amber-700" />
            Special Instructions (Optional)
          </h3>
          
          <div>
            <Textarea
              id="specialInstructions"
              {...register('specialInstructions')}
              placeholder="E.g., Delivery time preference, special packaging requests..."
              className="mt-2 bg-white/95 border-2 border-amber-300 focus:border-amber-500 text-amber-900 placeholder:text-amber-600 font-medium"
              disabled={isSubmitting || isSendingOTP}
            />
            {errors.specialInstructions && (
              <p className="text-red-500 text-sm mt-1">{errors.specialInstructions.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || isSendingOTP}
          className="w-full font-bold py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
          style={{
            background: 'linear-gradient(135deg, #D97706 0%, #F59E0B 50%, #D97706 100%)',
            color: '#FFFFFF',
            boxShadow: '0 4px 12px rgba(217, 119, 6, 0.4), 0 2px 6px rgba(0, 0, 0, 0.2)',
            border: 'none'
          }}
        >
          {isSendingOTP || isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              {isSendingOTP ? 'Sending OTP...' : 'Processing Order...'}
            </>
          ) : requireOTP ? (
            'Send OTP & Continue'
          ) : (
            'Place Order'
          )}
        </Button>
      </form>

      {requireOTP && (
        <div className="mt-6 p-4 bg-blue-50/80 backdrop-blur-sm rounded-xl border-2 border-blue-300">
          <p className="text-sm text-blue-900 font-medium leading-relaxed">
            🔒 <strong>Secure Ordering:</strong> We'll send a verification code to your email. 
            Enter the OTP to confirm your order securely.
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderFormWithOTP;
