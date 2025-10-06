-- Create Kovai Caterers separate database schema
-- All tables prefixed with kovai_ for complete isolation

-- Kovai Products Table
CREATE TABLE public.kovai_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT,
  image_url TEXT,
  category TEXT NOT NULL DEFAULT 'sweets',
  sku TEXT,
  content TEXT,
  gst_percentage NUMERIC NOT NULL DEFAULT 5,
  hard_enabled BOOLEAN NOT NULL DEFAULT true,
  soft_enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Kovai Orders Table
CREATE TABLE public.kovai_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  mobile TEXT NOT NULL,
  address TEXT NOT NULL,
  special_instructions TEXT,
  items JSONB NOT NULL,
  subtotal NUMERIC NOT NULL,
  gst_amount NUMERIC NOT NULL,
  total_amount NUMERIC NOT NULL,
  total_items INTEGER NOT NULL,
  delivery_date DATE,
  delivery_time TIME,
  status TEXT NOT NULL DEFAULT 'received',
  payment_status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Kovai Order Items Table
CREATE TABLE public.kovai_order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL,
  product_id UUID,
  product_name TEXT NOT NULL,
  quantity NUMERIC NOT NULL,
  price NUMERIC NOT NULL,
  gst_amount NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Kovai Abandoned Carts Table
CREATE TABLE public.kovai_abandoned_carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  mobile TEXT NOT NULL,
  address TEXT NOT NULL,
  special_instructions TEXT,
  cart_items JSONB NOT NULL,
  subtotal NUMERIC NOT NULL,
  gst_amount NUMERIC NOT NULL,
  total_amount NUMERIC NOT NULL,
  total_items INTEGER NOT NULL,
  delivery_date DATE,
  delivery_time TIME,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Kovai User Roles Table (separate admin system)
CREATE TABLE public.kovai_user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Kovai Features Table
CREATE TABLE public.kovai_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_name TEXT NOT NULL,
  description TEXT,
  is_enabled BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all Kovai tables
ALTER TABLE public.kovai_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kovai_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kovai_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kovai_abandoned_carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kovai_user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kovai_features ENABLE ROW LEVEL SECURITY;

-- Create Kovai admin check function
CREATE OR REPLACE FUNCTION public.is_kovai_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.kovai_user_roles
    WHERE kovai_user_roles.user_id = is_kovai_admin.user_id
      AND role = 'admin'
  );
$$;

-- RLS Policies for Kovai Products
CREATE POLICY "Anyone can view enabled kovai products"
ON public.kovai_products FOR SELECT
USING (hard_enabled = true);

CREATE POLICY "Only kovai admins can manage products"
ON public.kovai_products FOR ALL
USING (is_kovai_admin(auth.uid()))
WITH CHECK (is_kovai_admin(auth.uid()));

-- RLS Policies for Kovai Orders
CREATE POLICY "Anonymous users can create kovai orders"
ON public.kovai_orders FOR INSERT
WITH CHECK (true);

CREATE POLICY "Only kovai admins can view orders"
ON public.kovai_orders FOR SELECT
USING (is_kovai_admin(auth.uid()));

CREATE POLICY "Only kovai admins can update orders"
ON public.kovai_orders FOR UPDATE
USING (is_kovai_admin(auth.uid()));

CREATE POLICY "Only kovai admins can delete orders"
ON public.kovai_orders FOR DELETE
USING (is_kovai_admin(auth.uid()));

-- RLS Policies for Kovai Order Items
CREATE POLICY "Kovai admins can view all order items"
ON public.kovai_order_items FOR SELECT
USING (is_kovai_admin(auth.uid()));

-- RLS Policies for Kovai Abandoned Carts
CREATE POLICY "Anyone can insert kovai abandoned carts"
ON public.kovai_abandoned_carts FOR INSERT
WITH CHECK (true);

CREATE POLICY "Only kovai admins can view abandoned carts"
ON public.kovai_abandoned_carts FOR SELECT
USING (is_kovai_admin(auth.uid()));

-- RLS Policies for Kovai User Roles
CREATE POLICY "Users can view their own kovai role"
ON public.kovai_user_roles FOR SELECT
USING (auth.uid() = user_id);

-- RLS Policies for Kovai Features
CREATE POLICY "Anyone can view kovai features"
ON public.kovai_features FOR SELECT
USING (true);

CREATE POLICY "Only kovai admins can manage features"
ON public.kovai_features FOR ALL
USING (is_kovai_admin(auth.uid()))
WITH CHECK (is_kovai_admin(auth.uid()));

-- Create trigger for kovai orders updated_at
CREATE TRIGGER update_kovai_orders_updated_at
BEFORE UPDATE ON public.kovai_orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for kovai products updated_at
CREATE TRIGGER update_kovai_products_updated_at
BEFORE UPDATE ON public.kovai_products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for kovai features updated_at
CREATE TRIGGER update_kovai_features_updated_at
BEFORE UPDATE ON public.kovai_features
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();