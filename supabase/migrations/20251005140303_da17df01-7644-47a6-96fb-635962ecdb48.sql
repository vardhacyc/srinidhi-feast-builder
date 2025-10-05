-- Add delivery date and time fields to orders table
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS delivery_date DATE,
ADD COLUMN IF NOT EXISTS delivery_time TIME;

-- Add delivery date and time fields to abandoned_carts table
ALTER TABLE public.abandoned_carts 
ADD COLUMN IF NOT EXISTS delivery_date DATE,
ADD COLUMN IF NOT EXISTS delivery_time TIME;

-- Add comment for clarity
COMMENT ON COLUMN public.orders.delivery_date IS 'Customer preferred delivery date';
COMMENT ON COLUMN public.orders.delivery_time IS 'Customer preferred delivery time';
COMMENT ON COLUMN public.abandoned_carts.delivery_date IS 'Customer preferred delivery date';
COMMENT ON COLUMN public.abandoned_carts.delivery_time IS 'Customer preferred delivery time';