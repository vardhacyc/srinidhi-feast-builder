-- Fix security issue: Restrict orders table access to admins only
-- Drop the existing public access policies
DROP POLICY IF EXISTS "Anyone can view orders" ON public.orders;
DROP POLICY IF EXISTS "Anyone can update orders" ON public.orders;

-- Create a security definer function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_roles.user_id = is_admin.user_id
      AND role = 'admin'
  );
$$;

-- Create secure RLS policies for orders table
-- Only admins can view orders (protects sensitive customer data)
CREATE POLICY "Only admins can view orders" 
ON public.orders 
FOR SELECT 
TO authenticated
USING (public.is_admin(auth.uid()));

-- Only admins can update orders (business operations)
CREATE POLICY "Only admins can update orders" 
ON public.orders 
FOR UPDATE 
TO authenticated
USING (public.is_admin(auth.uid()));

-- Only admins can delete orders (data management)
CREATE POLICY "Only admins can delete orders" 
ON public.orders 
FOR DELETE 
TO authenticated
USING (public.is_admin(auth.uid()));

-- Keep anonymous order creation for customers (INSERT remains public)
-- The existing "All users can create orders" policy is kept as-is