-- Drop existing policy first
DROP POLICY IF EXISTS "Authenticated users can create orders" ON public.orders;

-- Allow all users (authenticated and anonymous) to create orders
CREATE POLICY "All users can create orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);