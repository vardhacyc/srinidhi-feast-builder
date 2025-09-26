-- Update RLS policies for orders table to ensure proper authentication
DROP POLICY IF EXISTS "Authenticated users can create orders" ON public.orders;

-- Create a more specific policy that ensures user is authenticated
CREATE POLICY "Authenticated users can create orders" 
ON public.orders 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);