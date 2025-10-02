-- Fix critical security issues with RLS policies

-- 1. Remove the dangerous user_roles INSERT policy that allows self-assignment
DROP POLICY IF EXISTS "Users can insert their own role" ON public.user_roles;

-- 2. Create a secure function to assign roles (only callable by existing admins)
CREATE OR REPLACE FUNCTION public.assign_user_role(
  target_user_id uuid,
  target_role text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow existing admins to assign roles
  IF NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Only admins can assign roles';
  END IF;
  
  -- Insert or update the role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (target_user_id, target_role)
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;

-- 3. Remove the unrestricted order_items INSERT policy
DROP POLICY IF EXISTS "Anonymous users can create order items" ON public.order_items;

-- Note: order_items will now only be insertable via Edge Functions using service role
-- This prevents client-side price manipulation