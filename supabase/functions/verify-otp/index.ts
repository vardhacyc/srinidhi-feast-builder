import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VerifyOTPRequest {
  email: string;
  otp: string;
}

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// OTP format validation (6 digits)
const OTP_REGEX = /^\d{6}$/;

// Input validation function
const validateInput = (email: string, otp: string) => {
  // Trim and validate email
  const trimmedEmail = email.trim().toLowerCase();
  if (!trimmedEmail || trimmedEmail.length > 255) {
    throw new Error("Invalid email format");
  }
  if (!EMAIL_REGEX.test(trimmedEmail)) {
    throw new Error("Invalid email format");
  }

  // Validate OTP format
  const trimmedOTP = otp.trim();
  if (!OTP_REGEX.test(trimmedOTP)) {
    throw new Error("Invalid OTP format");
  }

  return { email: trimmedEmail, otp: trimmedOTP };
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: VerifyOTPRequest = await req.json();

    // Validate input
    const { email, otp } = validateInput(body.email, body.otp);

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Rate limiting: Check for too many failed attempts (max 3 attempts per 5 minutes - stricter)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { data: recentAttempts } = await supabase
      .from("otp_verifications")
      .select("id")
      .eq("email", email)
      .gte("created_at", fiveMinutesAgo);

    if (recentAttempts && recentAttempts.length > 3) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Too many attempts. Please try again later." 
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Find the most recent OTP record for this email
    const { data: otpRecords, error: fetchError } = await supabase
      .from("otp_verifications")
      .select("*")
      .eq("email", email)
      .eq("verified", false)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(5);

    if (fetchError) {
      console.error("Database error:", fetchError);
      throw new Error("Failed to verify OTP");
    }

    if (!otpRecords || otpRecords.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid or expired OTP" 
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Use constant-time comparison via bcrypt to prevent timing attacks
    let otpRecord = null;
    for (const record of otpRecords) {
      try {
        const isValid = await bcrypt.compare(otp, record.otp_code);
        if (isValid) {
          otpRecord = record;
          break;
        }
      } catch (err) {
        console.error("Bcrypt comparison error:", err);
        continue;
      }
    }

    if (!otpRecord) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid or expired OTP" 
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Mark OTP as verified
    const { error: updateError } = await supabase
      .from("otp_verifications")
      .update({ verified: true })
      .eq("id", otpRecord.id);

    if (updateError) {
      console.error("Update error:", updateError);
      throw new Error("Failed to mark OTP as verified");
    }

    console.log(`OTP verified successfully`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "OTP verified successfully" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in verify-otp function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message || "Failed to verify OTP"
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
