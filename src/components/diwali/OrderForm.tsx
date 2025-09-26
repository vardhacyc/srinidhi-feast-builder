import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useCart } from '../../contexts/CartContext';
import { Phone, User, MapPin, FileText, Loader2 } from 'lucide-react';

const orderSchema = z.object({
  name: z.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  mobile: z.string()
    .trim()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  address: z.string()
    .trim()
    .min(10, 'Address must be at least 10 characters')
    .max(500, 'Address must be less than 500 characters'),
  specialInstructions: z.string()
    .max(200, 'Special instructions must be less than 200 characters')
    .optional()
});

type OrderFormData = z.infer<typeof orderSchema>;

interface OrderFormProps {
  onSubmit: (data: OrderFormData) => Promise<void>;
  isSubmitting: boolean;
}

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, isSubmitting }) => {
  const { cart, getTotalItems, getFinalTotal } = useCart();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema)
  });

  const watchedMobile = watch('mobile');

  const formatMobile = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 10);
  };

  return (
    <div className="diwali-glass-card rounded-3xl p-6 md:p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold diwali-text-gradient mb-2">
          Complete Your Order
        </h2>
        <p className="text-diwali-text">
          Please provide your details to proceed with the order
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Details Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold diwali-text-gradient flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Details
          </h3>
          
          <div>
            <Label htmlFor="name" className="text-diwali-dark font-medium">
              Full Name *
            </Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Enter your full name"
              className="mt-2 diwali-glass border-diwali-gold/30 focus:border-diwali-gold"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="mobile" className="text-diwali-dark font-medium">
              Mobile Number *
            </Label>
            <div className="relative mt-2">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2 text-diwali-subtle">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+91</span>
              </div>
              <Input
                id="mobile"
                {...register('mobile', {
                  onChange: (e) => {
                    e.target.value = formatMobile(e.target.value);
                  }
                })}
                placeholder="Enter 10-digit mobile number"
                className="pl-16 diwali-glass border-diwali-gold/30 focus:border-diwali-gold"
                maxLength={10}
                disabled={isSubmitting}
              />
            </div>
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
            )}
          </div>
        </div>

        {/* Delivery Details Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold diwali-text-gradient flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Delivery Details
          </h3>
          
          <div>
            <Label htmlFor="address" className="text-diwali-dark font-medium">
              Delivery Address *
            </Label>
            <Textarea
              id="address"
              {...register('address')}
              placeholder="Enter complete delivery address including landmarks"
              className="mt-2 diwali-glass border-diwali-gold/30 focus:border-diwali-gold min-h-[100px]"
              disabled={isSubmitting}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
            )}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="diwali-glass-card rounded-xl p-4 border-2 border-diwali-gold/30">
          <h3 className="text-lg font-semibold diwali-text-gradient mb-3">
            Order Summary
          </h3>
          <div className="space-y-2 text-sm">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between">
                <span className="text-diwali-dark">{item.name} ({item.quantity}kg)</span>
                <span className="font-medium text-diwali-dark">₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t border-diwali-gold/20 pt-2 mt-2">
              <div className="flex justify-between font-bold text-diwali-dark">
                <span>Total Items: {getTotalItems()}kg</span>
                <span>₹{getFinalTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Special Instructions Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold diwali-text-gradient flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Special Instructions (Optional)
          </h3>
          
          <div>
            <Label htmlFor="specialInstructions" className="text-diwali-dark font-medium">
              Any special requests or delivery instructions?
            </Label>
            <Textarea
              id="specialInstructions"
              {...register('specialInstructions')}
              placeholder="E.g., Contactless delivery, specific delivery time, packaging preferences..."
              className="mt-2 diwali-glass border-diwali-gold/30 focus:border-diwali-gold"
              disabled={isSubmitting}
            />
            {errors.specialInstructions && (
              <p className="text-red-500 text-sm mt-1">{errors.specialInstructions.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-diwali-gold to-amber-500 hover:from-amber-500 hover:to-diwali-gold text-white font-bold py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Processing Order...
            </>
          ) : (
            'Proceed to OTP Verification'
          )}
        </Button>
      </form>

      <div className="mt-6 p-4 diwali-glass-card rounded-xl border border-blue-400/30">
        <p className="text-sm text-diwali-dark leading-relaxed">
          🔒 <strong>Secure Ordering:</strong> We'll send an OTP to your mobile number to verify your order. 
          Your information is kept secure and will only be used for order processing.
        </p>
      </div>
    </div>
  );
};

export default OrderForm;