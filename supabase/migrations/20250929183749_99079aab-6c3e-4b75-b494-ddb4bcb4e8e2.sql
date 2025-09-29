-- Create OTP verifications table
CREATE TABLE IF NOT EXISTS public.otp_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create abandoned carts table
CREATE TABLE IF NOT EXISTS public.abandoned_carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  address TEXT NOT NULL,
  special_instructions TEXT,
  cart_items JSONB NOT NULL,
  subtotal NUMERIC NOT NULL,
  gst_amount NUMERIC NOT NULL,
  total_amount NUMERIC NOT NULL,
  total_items INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.abandoned_carts ENABLE ROW LEVEL SECURITY;

-- RLS policies for otp_verifications (public function needs to read/write)
CREATE POLICY "Anyone can insert OTP verifications"
ON public.otp_verifications
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Anyone can read their own OTP verifications"
ON public.otp_verifications
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Anyone can update OTP verifications"
ON public.otp_verifications
FOR UPDATE
TO anon, authenticated
USING (true);

-- RLS policies for abandoned_carts
CREATE POLICY "Anyone can insert abandoned carts"
ON public.abandoned_carts
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Only admins can view abandoned carts"
ON public.abandoned_carts
FOR SELECT
TO authenticated
USING (is_admin(auth.uid()));

-- Create index for faster OTP lookups
CREATE INDEX idx_otp_email_expires ON public.otp_verifications(email, expires_at);
CREATE INDEX idx_abandoned_carts_email ON public.abandoned_carts(customer_email);

-- Create cleanup function for expired OTPs
CREATE OR REPLACE FUNCTION public.cleanup_expired_otps()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.otp_verifications
  WHERE expires_at < now();
END;
$$;