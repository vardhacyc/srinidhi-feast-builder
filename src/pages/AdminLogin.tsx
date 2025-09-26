import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { authService } from '../lib/supabase';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Lock, Mail, Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type LoginFormData = z.infer<typeof loginSchema>;

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    try {
      await authService.signInWithEmail(data.email, data.password);

      // Check if user is admin
      const isAdmin = await authService.isAdmin();
      if (!isAdmin) {
        await authService.signOut();
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard!"
      });
      
      navigate('/admin');
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid email or password",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-amber-200 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <img 
              src="/cateringLogo.png" 
              alt="Sri Nidhi Catering Logo" 
              className="h-16 w-auto mx-auto logo-hover"
            />
          </div>
          <CardTitle className="text-2xl text-gray-800 font-bold">
            Admin Login
          </CardTitle>
          <p className="text-gray-600">
            Access the orders dashboard
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email Address
              </Label>
              <div className="relative mt-2">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="Enter your email"
                  className="pl-10 bg-white/80 border-amber-300 focus:border-amber-500 text-gray-800"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </Label>
              <div className="relative mt-2">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  placeholder="Enter your password"
                  className="pl-10 bg-white/80 border-amber-300 focus:border-amber-500 text-gray-800"
                  disabled={isLoading}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-3"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in to Admin Dashboard'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              onClick={() => navigate('/diwali')}
              className="text-gray-700 border-amber-300 hover:bg-amber-50"
            >
              Back to Diwali Store
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;