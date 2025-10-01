-- Add payment_status column to orders table
ALTER TABLE public.orders 
ADD COLUMN payment_status text NOT NULL DEFAULT 'pending';

-- Add a check constraint for valid payment statuses
ALTER TABLE public.orders 
ADD CONSTRAINT valid_payment_status 
CHECK (payment_status IN ('pending', 'received'));

-- Add an index for better query performance
CREATE INDEX idx_orders_payment_status ON public.orders(payment_status);