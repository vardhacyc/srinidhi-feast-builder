-- Enable phone authentication for OTP verification
-- This will allow users to sign up and sign in using phone number + OTP

-- The following settings need to be configured in the Supabase dashboard:
-- 1. Authentication > Settings > Phone Auth: Enable "Enable phone confirmations"
-- 2. Authentication > Settings > Phone Auth: Add your phone provider (e.g., Twilio)
-- 3. Authentication > URL Configuration: Set Site URL and Redirect URLs

-- For now, let's create a simple test to ensure our database is working
SELECT 'Database connection test successful' as status;