-- Fix RLS for anonymous order creation and add comprehensive order management system

-- Drop the existing INSERT policy if it exists
DROP POLICY IF EXISTS "All users can create orders" ON public.orders;

-- Recreate INSERT policy to explicitly allow anonymous users
CREATE POLICY "Anonymous users can create orders"
ON public.orders
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Create products table for admin management
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price NUMERIC NOT NULL CHECK (price >= 0),
  gst_percentage NUMERIC NOT NULL DEFAULT 5 CHECK (gst_percentage >= 0 AND gst_percentage <= 100),
  description TEXT,
  content TEXT,
  image_url TEXT,
  category TEXT NOT NULL DEFAULT 'sweets',
  soft_enabled BOOLEAN NOT NULL DEFAULT true,
  hard_enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create features table for feature flags
CREATE TABLE IF NOT EXISTS public.features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_name TEXT UNIQUE NOT NULL,
  is_enabled BOOLEAN NOT NULL DEFAULT false,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default feature flags
INSERT INTO public.features (feature_name, is_enabled, description)
VALUES 
  ('require_email_otp', true, 'Require email OTP verification for orders'),
  ('send_order_confirmation_email', false, 'Send automated order confirmation emails'),
  ('free_delivery_above_10kg', true, 'Free delivery for orders above 10kg')
ON CONFLICT (feature_name) DO NOTHING;

-- Enable RLS on new tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.features ENABLE ROW LEVEL SECURITY;

-- Products table policies
CREATE POLICY "Anyone can view enabled products"
ON public.products
FOR SELECT
TO anon, authenticated
USING (hard_enabled = true);

CREATE POLICY "Only admins can manage products"
ON public.products
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- Features table policies
CREATE POLICY "Anyone can view features"
ON public.features
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Only admins can update features"
ON public.features
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can insert features"
ON public.features
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can delete features"
ON public.features
FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));

-- Add email column to orders if not exists (for OTP verification)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='orders' AND column_name='customer_email') THEN
    ALTER TABLE public.orders ADD COLUMN customer_email TEXT;
  END IF;
END $$;

-- Create order_items table for detailed order tracking
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  quantity NUMERIC NOT NULL CHECK (quantity > 0),
  price NUMERIC NOT NULL CHECK (price >= 0),
  gst_amount NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on order_items
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Order items policies
CREATE POLICY "Admins can view all order items"
ON public.order_items
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Anonymous users can create order items"
ON public.order_items
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Add triggers for updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_features_updated_at
  BEFORE UPDATE ON public.features
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();