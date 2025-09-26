import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useCart } from '../../contexts/CartContext';
import { Phone, User, MapPin, FileText, Loader2, Mail, Lock } from 'lucide-react';

const orderSchema = z.object({
  name: z.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: z.string()
    .trim()
    .email('Please enter a valid email address'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be less than 100 characters'),
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
    <div className="bg-gradient-to-br from-amber-50/90 to-amber-100/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 max-w-2xl mx-auto border-2 border-amber-300 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-amber-900 mb-2" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
          Complete Your Order
        </h2>
        <p className="text-amber-800 font-medium">
          Please provide your details to proceed with the order
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="text-amber-900 font-bold text-sm">
              Email Address *
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
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password" className="text-amber-900 font-bold text-sm">
              Password *
            </Label>
            <div className="relative mt-2">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Lock className="h-4 w-4 text-amber-700" />
              </div>
              <Input
                id="password"
                type="password"
                {...register('password')}
                placeholder="Create a secure password"
                className="pl-10 bg-white/95 border-2 border-amber-300 focus:border-amber-500 text-amber-900 placeholder:text-amber-600 font-medium"
                disabled={isSubmitting}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
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
          <h3 className="text-xl font-bold text-amber-900 flex items-center gap-2" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
            <MapPin className="h-5 w-5 text-amber-700" />
            Delivery Details
          </h3>
          
          <div>
            <Label htmlFor="address" className="text-amber-900 font-bold text-sm">
              Delivery Address *
            </Label>
            <Textarea
              id="address"
              {...register('address')}
              placeholder="Enter complete delivery address including landmarks"
              className="mt-2 bg-white/95 border-2 border-amber-300 focus:border-amber-500 text-amber-900 placeholder:text-amber-600 font-medium min-h-[100px]"
              disabled={isSubmitting}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
            )}
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
              <div className="flex justify-between font-bold text-amber-900 text-base">
                <span>Total Items: {getTotalItems()}kg</span>
                <span>₹{getFinalTotal().toFixed(2)}</span>
              </div>
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
            <Label htmlFor="specialInstructions" className="text-amber-900 font-bold text-sm">
              Any special requests or delivery instructions?
            </Label>
            <Textarea
              id="specialInstructions"
              {...register('specialInstructions')}
              placeholder="E.g., Contactless delivery, specific delivery time, packaging preferences..."
              className="mt-2 bg-white/95 border-2 border-amber-300 focus:border-amber-500 text-amber-900 placeholder:text-amber-600 font-medium"
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
          className="w-full font-bold py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
          style={{
            background: 'linear-gradient(135deg, #D97706 0%, #F59E0B 50%, #D97706 100%)',
            color: '#FFFFFF',
            boxShadow: '0 4px 12px rgba(217, 119, 6, 0.4), 0 2px 6px rgba(0, 0, 0, 0.2)',
            border: 'none'
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Processing Order...
            </>
          ) : (
            'Create Account & Place Order'
          )}
        </Button>
      </form>

      <div className="mt-6 p-4 bg-blue-50/80 backdrop-blur-sm rounded-xl border-2 border-blue-300">
        <p className="text-sm text-blue-900 font-medium leading-relaxed">
          🔒 <strong>Secure Ordering:</strong> We'll create an account for you and place your order securely. 
          Your information is kept secure and will only be used for order processing.
        </p>
      </div>
    </div>
  );
};

export default OrderForm;