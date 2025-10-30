import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";
import { Resend } from "npm:resend@2.0.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const resendApiKey = Deno.env.get("RESEND_API_KEY");

const resend = resendApiKey ? new Resend(resendApiKey) : null;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type OrderItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category?: string;
  image?: string;
};

type CreateOrderRequest = {
  customer_name: string;
  customer_email?: string;
  mobile: string;
  address: string;
  special_instructions?: string;
  items: OrderItem[];
  subtotal: number;
  gst_amount: number;
  total_amount: number;
  total_items: number;
  status?: "received" | "processing" | "completed" | "cancelled";
};

// Basic input validation respecting security best practices
const isNonEmptyString = (s: unknown, max = 500) => typeof s === "string" && s.trim().length > 0 && s.trim().length <= max;
const isOptionalString = (s: unknown, max = 500) => s === undefined || (typeof s === "string" && s.trim().length <= max);
const isEmail = (s: unknown) => typeof s === "string" && s.length <= 255 && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(s.trim());
const isIndianMobile = (s: unknown) => typeof s === "string" && /^[6-9]\d{9}$/.test(s.trim());
const isNumber = (n: unknown) => typeof n === "number" && isFinite(n) && n >= 0;

function validateOrder(body: any): { ok: true; value: CreateOrderRequest } | { ok: false; error: string } {
  if (!isNonEmptyString(body?.customer_name, 100)) return { ok: false, error: "Invalid customer name" };
  if (body?.customer_email && !isEmail(body.customer_email)) return { ok: false, error: "Invalid customer email" };
  if (!isIndianMobile(body?.mobile)) return { ok: false, error: "Invalid mobile number" };
  if (!isNonEmptyString(body?.address, 600)) return { ok: false, error: "Invalid address" };
  if (!isOptionalString(body?.special_instructions, 500)) return { ok: false, error: "Invalid special instructions" };
  if (!Array.isArray(body?.items) || body.items.length === 0) return { ok: false, error: "Order items required" };
  for (const it of body.items) {
    if (!isNonEmptyString(it?.id, 100)) return { ok: false, error: "Invalid item id" };
    if (!isNonEmptyString(it?.name, 200)) return { ok: false, error: "Invalid item name" };
    if (!isNumber(it?.price)) return { ok: false, error: "Invalid item price" };
    if (!isNumber(it?.quantity)) return { ok: false, error: "Invalid item quantity" };
  }
  if (!isNumber(body?.subtotal)) return { ok: false, error: "Invalid subtotal" };
  if (!isNumber(body?.gst_amount)) return { ok: false, error: "Invalid GST amount" };
  if (!isNumber(body?.total_amount)) return { ok: false, error: "Invalid total amount" };
  if (!Number.isInteger(body?.total_items) || body.total_items < 0) return { ok: false, error: "Invalid total items" };

  const status = body?.status ?? "received";
  if (!["received", "processing", "completed", "cancelled"].includes(status)) return { ok: false, error: "Invalid status" };

  return { ok: true, value: { ...body, status } };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const validation = validateOrder(body);
    if (!validation.ok) {
      return new Response(JSON.stringify({ success: false, error: validation.error }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const order = validation.value;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // SERVER-SIDE PRICE VALIDATION - Critical security check
    // Verify prices against products table to prevent manipulation
    const productIds = order.items.map(item => String(item.id));

    // Support both UUID product IDs and string SKUs (e.g., SN2025xx)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const idList = productIds.filter((id) => uuidRegex.test(id));
    const skuList = productIds.filter((id) => !uuidRegex.test(id));

    let products: Array<{ id: string; sku?: string | null; name: string; price: number; gst_percentage: number } > = [];

    if (idList.length > 0) {
      const { data, error } = await supabase
        .from("products")
        .select("id, sku, name, price, gst_percentage")
        .in("id", idList);
      if (error) {
        return new Response(JSON.stringify({ success: false, error: "Failed to validate product prices" }), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      products = products.concat(data ?? []);
    }

    if (skuList.length > 0) {
      const { data, error } = await supabase
        .from("products")
        .select("id, sku, name, price, gst_percentage")
        .in("sku", skuList);
      if (error) {
        return new Response(JSON.stringify({ success: false, error: "Failed to validate product prices" }), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      products = products.concat(data ?? []);
    }

    if (products.length === 0) {
      return new Response(JSON.stringify({ success: false, error: "Failed to validate product prices" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Create maps for quick lookup by id or sku
    const productById = new Map(products.filter((p) => p.id).map((p) => [p.id, p]));
    const productBySku = new Map(products.filter((p) => p.sku).map((p) => [String(p.sku), p]));

    // Validate each item's price and recalculate totals
    let calculatedSubtotal = 0;
    for (const item of order.items) {
      const key = String(item.id);
      const product = productById.get(key) ?? productBySku.get(key);
      if (!product) {
        return new Response(JSON.stringify({ success: false, error: `Invalid product: ${item.name}` }), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      // Verify the price matches the database
      if (Math.abs(item.price - Number(product.price)) > 0.01) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: `Price mismatch for ${product.name}. Please refresh and try again.` 
        }), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      calculatedSubtotal += Number(product.price) * item.quantity;
    }

    // Recalculate GST and total (using 5% GST rate)
    const calculatedGST = calculatedSubtotal * 0.05;
    const calculatedTotal = calculatedSubtotal + calculatedGST;

    // Verify submitted amounts match calculated amounts (allow small rounding differences)
    if (Math.abs(order.subtotal - calculatedSubtotal) > 0.01 ||
        Math.abs(order.gst_amount - calculatedGST) > 0.01 ||
        Math.abs(order.total_amount - calculatedTotal) > 0.01) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: "Order total mismatch. Please refresh and try again." 
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Insert order and return the inserted row
    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          customer_name: order.customer_name.trim(),
          customer_email: order.customer_email?.trim() ?? null,
          mobile: order.mobile.trim(),
          address: order.address.trim(),
          special_instructions: order.special_instructions?.trim() ?? null,
          items: order.items,
          subtotal: order.subtotal,
          gst_amount: order.gst_amount,
          total_amount: order.total_amount,
          total_items: order.total_items,
          status: order.status,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Failed to insert order:", error);
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Send order confirmation email if customer email is provided
    if (data && order.customer_email && resend) {
      try {
        const orderItems = order.items.map(item => 
          `<tr>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity} kg</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">₹${item.price.toFixed(2)}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">₹${(item.price * item.quantity).toFixed(2)}</td>
          </tr>`
        ).join('');

        const emailResponse = await resend.emails.send({
          from: "Sri Nidhi Catering <sales@berk-carp.com>",
          to: [order.customer_email],
          subject: "🎉 Order Confirmed - Sri Nidhi Catering Diwali Sweets",
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb;">
              
              <!-- Simple Elegant Header -->
              <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 24px rgba(0,0,0,0.12); margin-bottom: 20px; border: 2px solid #10b981;">
                <!-- Success Banner -->
                <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 35px 20px; text-align: center;">
                  <div style="font-size: 56px; margin-bottom: 12px;">✓</div>
                  <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -0.5px; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">Order Confirmed!</h1>
                  <p style="color: rgba(255,255,255,0.95); margin: 10px 0 0; font-size: 15px; font-weight: 600;">Order #${data.id.slice(0, 8).toUpperCase()}</p>
                </div>
                
                <!-- Main Content -->
                <div style="padding: 30px 25px;">
                  <p style="font-size: 20px; color: #1f2937; margin: 0 0 15px; font-weight: 600;">Hi <strong style="color: #f59e0b; font-size: 22px;">${order.customer_name}</strong>,</p>
                  <p style="color: #4b5563; margin: 0 0 25px; line-height: 1.6; font-size: 15px;">Thank you for your order! Your <strong>Diwali sweets</strong> are being prepared with care.</p>
                  
                  <!-- Order Info -->
                  <div style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); padding: 20px; border-radius: 10px; margin-bottom: 25px; border-left: 4px solid #10b981;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 10px 0; color: #6b7280; font-size: 14px; font-weight: 600;">📅 Order Date:</td>
                        <td style="padding: 10px 0; color: #1f2937; font-weight: 700; font-size: 15px; text-align: right;">${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; color: #6b7280; font-size: 14px; font-weight: 600;">📞 Contact:</td>
                        <td style="padding: 10px 0; color: #1f2937; font-weight: 700; font-size: 15px; text-align: right;">${order.mobile}</td>
                      </tr>
                      ${(order as any).delivery_date ? `<tr>
                        <td style="padding: 10px 0; color: #6b7280; font-size: 14px; font-weight: 600;">🚚 Delivery Date:</td>
                        <td style="padding: 10px 0; color: #10b981; font-weight: 700; font-size: 15px; text-align: right;">${new Date((order as any).delivery_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}${(order as any).delivery_time ? ` at ${(order as any).delivery_time}` : ''}</td>
                      </tr>` : ''}
                    </table>
                  </div>
                  <!-- Order Items -->
                  <div style="background: #fef3c7; padding: 3px; border-radius: 8px; display: inline-block; margin-bottom: 12px;">
                    <h3 style="color: #92400e; margin: 0; font-size: 17px; font-weight: 800; padding: 0 12px;">🛍️ ORDER ITEMS</h3>
                  </div>
                  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 2px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                    <thead>
                      <tr style="background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border-bottom: 3px solid #d1d5db;">
                        <th style="padding: 12px 10px; text-align: left; color: #374151; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Item</th>
                        <th style="padding: 12px 10px; text-align: center; color: #374151; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Qty</th>
                        <th style="padding: 12px 10px; text-align: right; color: #374151; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${orderItems}
                    </tbody>
                  </table>
                  
                  <!-- Totals -->
                  <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 10px; margin-top: 20px; border: 2px solid #fbbf24;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; color: #78350f; font-size: 15px; font-weight: 600;">Subtotal:</td>
                        <td style="padding: 8px 0; text-align: right; color: #92400e; font-weight: 700; font-size: 16px;">₹${order.subtotal.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #78350f; font-size: 15px; font-weight: 600;">GST (5%):</td>
                        <td style="padding: 8px 0; text-align: right; color: #92400e; font-weight: 700; font-size: 16px;">₹${order.gst_amount.toFixed(2)}</td>
                      </tr>
                      <tr style="border-top: 3px solid #f59e0b;">
                        <td style="padding: 15px 0 0; color: #78350f; font-weight: 800; font-size: 18px;">💰 TOTAL:</td>
                        <td style="padding: 15px 0 0; text-align: right; color: #b45309; font-weight: 900; font-size: 24px;">₹${order.total_amount.toFixed(2)}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>

              <!-- Delivery & Payment Card -->
              <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 24px rgba(0,0,0,0.12); margin-bottom: 20px; border: 2px solid #e5e7eb;">
                <div style="padding: 30px 25px;">
                  <!-- Delivery Address -->
                  <div style="background: #10b981; padding: 3px; border-radius: 8px; display: inline-block; margin-bottom: 12px;">
                    <h3 style="color: white; margin: 0; font-size: 17px; font-weight: 800; padding: 0 12px;">📍 DELIVERY ADDRESS</h3>
                  </div>
                  <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); padding: 18px; border-radius: 10px; border-left: 4px solid #10b981; margin-bottom: 30px;">
                    <p style="margin: 0; color: #065f46; line-height: 1.7; font-size: 15px; font-weight: 500; white-space: pre-line;">${order.address}</p>
                    ${order.special_instructions ? `<p style="margin: 15px 0 0; padding-top: 15px; border-top: 2px dashed #10b981; color: #047857; font-size: 14px; font-weight: 600;"><strong>📝 Special Note:</strong> ${order.special_instructions}</p>` : ''}
                  </div>

                  <!-- Payment Info -->
                  <div style="background: #f59e0b; padding: 3px; border-radius: 8px; display: inline-block; margin-bottom: 12px;">
                    <h3 style="color: white; margin: 0; font-size: 17px; font-weight: 800; padding: 0 12px;">💳 PAYMENT DETAILS</h3>
                  </div>
                  <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 25px; border-radius: 10px; text-align: center; border: 3px solid #fbbf24;">
                    <p style="color: #78350f; margin: 0 0 15px; font-size: 15px; font-weight: 700;">Please pay to complete your order</p>
                    <div style="background: white; padding: 15px 25px; border-radius: 8px; margin: 15px 0; display: inline-block; border: 2px solid #f59e0b; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);">
                      <p style="margin: 0 0 8px; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">UPI ID</p>
                      <p style="margin: 0 0 8px; color: #92400e; font-size: 24px; font-weight: 800;">8760101010@apl</p>
                      <p style="margin: 0; color: #78350f; font-size: 14px; font-weight: 700;">Amount: <span style="color: #b45309; font-size: 16px;">₹${order.total_amount.toFixed(2)}</span></p>
                    </div>
                    <p style="color: #92400e; margin: 15px 0 0; font-size: 13px; font-weight: 700;">💡 Share payment screenshot on WhatsApp for confirmation</p>
                  </div>
                </div>
              </div>

              <!-- Simple Footer -->
              <div style="background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); border-radius: 12px; padding: 30px 25px; text-align: center; box-shadow: 0 6px 24px rgba(0,0,0,0.12); margin-bottom: 20px; border: 2px solid #fbbf24;">
                <div style="font-size: 40px; margin-bottom: 12px;">🪔</div>
                <p style="color: #b45309; margin: 0 0 8px; font-size: 26px; font-weight: 800;">Happy Diwali!</p>
                <p style="color: #78350f; margin: 0 0 25px; font-size: 15px; font-weight: 600;">May these sweets bring joy to your celebrations</p>
                <div style="background: white; border-radius: 10px; padding: 20px; border-top: 3px solid #f59e0b;">
                  <p style="color: #1f2937; margin: 0 0 12px; font-size: 16px; font-weight: 700;">Need Help?</p>
                  <p style="margin: 8px 0; font-size: 15px; font-weight: 600;">
                    <a href="tel:+918760101010" style="color: #f59e0b; text-decoration: none; font-weight: 700;">📞 +91 8760101010</a>
                  </p>
                  <p style="margin: 8px 0; font-size: 15px; font-weight: 600;">
                    <a href="https://wa.me/918760101010" style="color: #10b981; text-decoration: none; font-weight: 700;">💬 WhatsApp</a>
                  </p>
                </div>
              </div>

              <!-- Simple Thank You -->
              <div style="text-align: center; padding: 20px;">
                <p style="color: #4b5563; font-size: 14px; margin: 0; font-weight: 600;">Thank you for choosing <strong style="color: #f59e0b; font-size: 15px;">Sri Nidhi Catering</strong></p>
                <p style="color: #6b7280; font-size: 13px; margin: 8px 0 0; font-weight: 500;">⭐ Your satisfaction is our priority ⭐</p>
              </div>
              </div>

              <!-- Footer -->
              <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 11px;">
                <p style="margin: 5px 0;">© ${new Date().getFullYear()} Sri Nidhi Catering. All rights reserved.</p>
                <p style="margin: 5px 0; font-style: italic;">Order confirmation #${data.id.slice(0, 8).toUpperCase()}</p>
              </div>
            </body>
            </html>
          `,
        });
        console.log("Order confirmation email sent successfully:", {
          orderId: data.id.slice(0, 8),
          to: order.customer_email,
          messageId: emailResponse.data?.id
        });
      } catch (emailError: any) {
        console.error("Failed to send confirmation email:", {
          error: emailError.message,
          orderId: data.id.slice(0, 8),
          to: order.customer_email,
          statusCode: emailError.statusCode
        });
        // Don't fail the order if email fails
      }
    }

    return new Response(
      JSON.stringify({ success: true, order: data }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (err: any) {
    console.error("Error in create-order function:", err);
    return new Response(JSON.stringify({ success: false, error: err?.message ?? "Unexpected error" }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
