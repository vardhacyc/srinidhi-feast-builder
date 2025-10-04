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

        await resend.emails.send({
          from: "Sri Nidhi Catering <orders@srinidhi.com>",
          to: [order.customer_email],
          subject: "🎉 Order Confirmed - Sri Nidhi Catering Diwali Sweets",
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
              <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">🎊 Order Confirmed! 🎊</h1>
                <p style="color: white; margin: 10px 0 0; font-size: 16px;">Thank you for choosing Sri Nidhi Catering</p>
              </div>
              
              <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <p style="font-size: 16px; margin-bottom: 20px;">Dear <strong>${order.customer_name}</strong>,</p>
                
                <p style="font-size: 15px; color: #059669; background: #d1fae5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  ✅ Your Diwali sweets order has been successfully received and confirmed!
                </p>

                <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 25px 0;">
                  <h2 style="color: #92400e; margin: 0 0 15px; font-size: 18px;">📋 Order Summary</h2>
                  <p style="margin: 8px 0; color: #78350f;"><strong>Order ID:</strong> #${data.id.slice(0, 8).toUpperCase()}</p>
                  <p style="margin: 8px 0; color: #78350f;"><strong>Order Date:</strong> ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  <p style="margin: 8px 0; color: #78350f;"><strong>Mobile:</strong> ${order.mobile}</p>
                </div>

                <table style="width: 100%; border-collapse: collapse; margin: 25px 0; background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                  <thead>
                    <tr style="background: #fbbf24;">
                      <th style="padding: 12px; text-align: left; color: white; font-weight: 600;">Item</th>
                      <th style="padding: 12px; text-align: center; color: white; font-weight: 600;">Quantity</th>
                      <th style="padding: 12px; text-align: right; color: white; font-weight: 600;">Price</th>
                      <th style="padding: 12px; text-align: right; color: white; font-weight: 600;">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${orderItems}
                  </tbody>
                  <tfoot style="background: #fef3c7;">
                    <tr>
                      <td colspan="3" style="padding: 12px; text-align: right; font-weight: 600; border-top: 2px solid #fbbf24;">Subtotal:</td>
                      <td style="padding: 12px; text-align: right; font-weight: 600; border-top: 2px solid #fbbf24;">₹${order.subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colspan="3" style="padding: 12px; text-align: right;">GST (5%):</td>
                      <td style="padding: 12px; text-align: right;">₹${order.gst_amount.toFixed(2)}</td>
                    </tr>
                    <tr style="background: #fde68a;">
                      <td colspan="3" style="padding: 12px; text-align: right; font-weight: 700; font-size: 18px;">Total Amount:</td>
                      <td style="padding: 12px; text-align: right; font-weight: 700; font-size: 18px; color: #92400e;">₹${order.total_amount.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>

                <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 25px 0;">
                  <h3 style="color: #1e40af; margin: 0 0 10px; font-size: 16px;">📍 Delivery Address</h3>
                  <p style="margin: 0; color: #1e3a8a; white-space: pre-line;">${order.address}</p>
                  ${order.special_instructions ? `<p style="margin: 15px 0 0; color: #1e3a8a;"><strong>Special Instructions:</strong> ${order.special_instructions}</p>` : ''}
                </div>

                <div style="background: #dcfce7; padding: 20px; border-radius: 8px; margin: 25px 0;">
                  <h3 style="color: #166534; margin: 0 0 15px; font-size: 16px;">⏱️ What's Next?</h3>
                  <ul style="margin: 0; padding-left: 20px; color: #14532d;">
                    <li style="margin: 8px 0;">Your order will be freshly prepared with premium ingredients</li>
                    <li style="margin: 8px 0;">Preparation time: 2-3 hours</li>
                    <li style="margin: 8px 0;">Delivery within 4-6 hours</li>
                    <li style="margin: 8px 0;">We'll keep you updated via WhatsApp</li>
                  </ul>
                </div>

                <div style="text-align: center; margin: 30px 0;">
                  <p style="font-size: 20px; margin: 10px 0;">✨ Happy Diwali! ✨</p>
                  <p style="font-size: 14px; color: #6b7280; margin: 10px 0;">May these sweet treats bring joy and prosperity to your celebrations!</p>
                </div>

                <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 25px 0; text-align: center;">
                  <h3 style="color: #374151; margin: 0 0 15px; font-size: 16px;">Need Help?</h3>
                  <p style="margin: 8px 0; color: #6b7280;">📞 Call us: <a href="tel:+918760101010" style="color: #f59e0b; text-decoration: none; font-weight: 600;">+91 8760101010</a></p>
                  <p style="margin: 8px 0; color: #6b7280;">💬 WhatsApp: <a href="https://wa.me/918760101010" style="color: #25D366; text-decoration: none; font-weight: 600;">+91 8760101010</a></p>
                </div>

                <p style="font-size: 14px; color: #6b7280; text-align: center; margin: 30px 0 10px;">
                  Thank you for choosing Sri Nidhi Catering!<br>
                  <strong style="color: #f59e0b;">Your satisfaction is our priority</strong>
                </p>
              </div>

              <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
                <p style="margin: 5px 0;">© ${new Date().getFullYear()} Sri Nidhi Catering. All rights reserved.</p>
                <p style="margin: 5px 0;">This is an automated confirmation email for your order.</p>
              </div>
            </body>
            </html>
          `,
        });
        console.log("Order confirmation email sent for order:", data.id.slice(0, 8));
      } catch (emailError: any) {
        console.error("Failed to send confirmation email:", emailError);
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
