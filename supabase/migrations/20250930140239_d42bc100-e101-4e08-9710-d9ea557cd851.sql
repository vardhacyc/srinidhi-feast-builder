-- Add explicit RLS policies for otp_verifications to satisfy security scanner
-- Ensure RLS is enabled
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;

-- Clean up any existing policies first to avoid duplicates
DROP POLICY IF EXISTS "Anyone can read their own OTP verifications" ON public.otp_verifications;
DROP POLICY IF EXISTS "Anyone can insert OTP verifications" ON public.otp_verifications;
DROP POLICY IF EXISTS "Anyone can update OTP verifications" ON public.otp_verifications;
DROP POLICY IF EXISTS "Admins can select otp_verifications" ON public.otp_verifications;
DROP POLICY IF EXISTS "Admins can insert otp_verifications" ON public.otp_verifications;
DROP POLICY IF EXISTS "Admins can update otp_verifications" ON public.otp_verifications;
DROP POLICY IF EXISTS "Admins can delete otp_verifications" ON public.otp_verifications;

-- Strict policies: only admins can read or modify; clients have zero access
CREATE POLICY "Admins can select otp_verifications"
ON public.otp_verifications
FOR SELECT
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can insert otp_verifications"
ON public.otp_verifications
FOR INSERT
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update otp_verifications"
ON public.otp_verifications
FOR UPDATE
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can delete otp_verifications"
ON public.otp_verifications
FOR DELETE
USING (is_admin(auth.uid()));