-- Fix OTP security issue: Restrict access to otp_verifications table
-- The edge functions use service role and bypass RLS, so they will continue to work
-- This prevents hackers from stealing OTP codes by querying the table directly

-- Drop the overly permissive policies
DROP POLICY IF EXISTS "Anyone can read their own OTP verifications" ON public.otp_verifications;
DROP POLICY IF EXISTS "Anyone can insert OTP verifications" ON public.otp_verifications;
DROP POLICY IF EXISTS "Anyone can update OTP verifications" ON public.otp_verifications;

-- No public access policies needed
-- Edge functions use service role which bypasses RLS
-- This completely prevents unauthorized access to OTP codes