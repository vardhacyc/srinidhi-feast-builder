import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { Resend } from "https://esm.sh/resend@4.0.0";


const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SendOTPRequest {
  email: string;
  customerName: string;
}

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Email normalization function to prevent rate limit bypass
const normalizeEmail = (email: string): string => {
  const trimmedEmail = email.trim().toLowerCase();
  const [localPart, domain] = trimmedEmail.split('@');
  
  if (!domain) return trimmedEmail;
  
  // For Gmail and Googlemail, remove dots and strip plus-addressing
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    const cleanedLocal = localPart.replace(/\./g, '').split('+')[0];
    return `${cleanedLocal}@${domain}`;
  }
  
  // For other providers, just strip plus-addressing
  const cleanedLocal = localPart.split('+')[0];
  return `${cleanedLocal}@${domain}`;
};

// Input validation function
const validateInput = (email: string, customerName: string) => {
  // Trim and validate email
  const trimmedEmail = email.trim().toLowerCase();
  if (!trimmedEmail || trimmedEmail.length > 255) {
    throw new Error("Invalid email format");
  }
  if (!EMAIL_REGEX.test(trimmedEmail)) {
    throw new Error("Invalid email format");
  }

  // Validate customer name
  const trimmedName = customerName.trim();
  if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
    throw new Error("Customer name must be between 2 and 100 characters");
  }

  return { email: trimmedEmail, name: trimmedName };
};

const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Helper: convert ArrayBuffer to hex string
const toHex = (buffer: ArrayBuffer): string => {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

// Hash OTP using a server-side secret + email for binding
const hashOTP = async (otp: string, email: string): Promise<string> => {
  const secret = Deno.env.get("OTP_SECRET") || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "otp-fallback-secret";
  const data = new TextEncoder().encode(`${secret}:${email}:${otp}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return toHex(digest);
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: SendOTPRequest = await req.json();

    // Validate input
    const { email, name } = validateInput(body.email, body.customerName);

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Normalize email for rate limiting to prevent bypass via email variations
    const normalizedEmail = normalizeEmail(email);

    // Rate limiting: Check if OTP was sent recently (within last 60 seconds)
    const { data: recentOTP } = await supabase
      .from("otp_verifications")
      .select("created_at")
      .eq("email", normalizedEmail)
      .gte("created_at", new Date(Date.now() - 60000).toISOString())
      .limit(1)
      .maybeSingle();

    if (recentOTP) {
      return new Response(
        JSON.stringify({ 
          error: "Please wait 60 seconds before requesting another OTP",
          success: false 
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Generate OTP
    const otpCode = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Hash the OTP before storing (security best practice)
    const hashedOTP = await hashOTP(otpCode, email);

    console.log(`OTP generated successfully`);

    // Clean up old OTPs for this email
    await supabase
      .from("otp_verifications")
      .delete()
      .eq("email", email);

    // Store hashed OTP in database
    const { error: dbError } = await supabase
      .from("otp_verifications")
      .insert({
        email,
        otp_code: hashedOTP,
        expires_at: expiresAt.toISOString(),
        verified: false,
      });

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Failed to store OTP: ${dbError.message}`);
    }

    // Send OTP email
    const emailResponse = await resend.emails.send({
      from: "Sri Nidhi Catering <sales@berk-carp.com>",
      to: [email],
      subject: "Your Order Verification Code - Sri Nidhi",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f59e0b, #d97706); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { color: white; margin: 0; font-size: 24px; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
            .otp-box { background: #fef3c7; border: 2px dashed #f59e0b; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
            .otp-code { font-size: 36px; font-weight: bold; color: #d97706; letter-spacing: 8px; font-family: 'Courier New', monospace; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; border-radius: 0 0 10px 10px; }
            .warning { background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🪔 Sri Nidhi Catering</h1>
            </div>
            <div class="content">
              <h2>Hello ${name},</h2>
              <p>Thank you for placing an order with Sri Nidhi Catering!</p>
              <p>To verify your email and confirm your order, please use the following One-Time Password (OTP):</p>
              
              <div class="otp-box">
                <div class="otp-code">${otpCode}</div>
                <p style="margin: 10px 0 0 0; color: #6b7280;">Valid for 5 minutes</p>
              </div>

              <p>Enter this code on the order confirmation page to complete your purchase.</p>

              <div class="warning">
                <strong>🔒 Security Notice:</strong> This OTP is valid for 5 minutes only. Never share this code with anyone. Our team will never ask for your OTP.
              </div>

              <p>If you didn't request this code, please ignore this email or contact us immediately.</p>
              
              <p>Thank you for choosing Sri Nidhi Catering!<br>
              <strong>Premium Sweets & Catering Services</strong></p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Sri Nidhi Catering, Coimbatore | Premium Quality Since Years</p>
              <p>📞 +91 876-010-1010 | 🌐 kovai.food</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Check for Resend errors
    if (emailResponse.error) {
      console.error("Resend API error:", emailResponse.error);
      const message = emailResponse.error.message || "Failed to send email via Resend";
      const status = (emailResponse.error as any).statusCode ?? 500;

      // Surface a friendly actionable message in dev/test mode without throwing
      if (status === 403 && message.includes("verify a domain")) {
        return new Response(
          JSON.stringify({
            success: false,
            error: message,
            code: "RESEND_DOMAIN_UNVERIFIED",
            hint: "Verify your domain in Resend and use a matching 'from' address, or send to your test inbox for now."
          }),
          { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      return new Response(
        JSON.stringify({ success: false, error: message }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "OTP sent successfully",
        expiresAt: expiresAt.toISOString()
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-otp function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to send OTP",
        success: false 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
