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
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 650px; margin: 0 auto; padding: 0; background: linear-gradient(to bottom, #fff9e6 0%, #ffffff 50%, #fff9e6 100%);">
              
              <!-- Success Checkmark Animation Section - Enhanced -->
              <div style="text-align: center; padding: 50px 20px 30px; background: transparent;">
                <div style="display: inline-block; width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, #10b981 0%, #059669 100%); margin: 0 auto; box-shadow: 0 12px 40px rgba(16, 185, 129, 0.4), 0 0 0 8px rgba(16, 185, 129, 0.1); position: relative; animation: pulse 2s ease-in-out infinite;">
                  <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Premium Header - Enhanced -->
              <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%); padding: 50px 35px; text-align: center; border-radius: 20px 20px 0 0; margin: 0 20px; box-shadow: 0 15px 50px rgba(217, 119, 6, 0.3); position: relative; overflow: hidden;">
                <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,%3Csvg width=&quot;40&quot; height=&quot;40&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cdefs%3E%3Cpattern id=&quot;grid&quot; width=&quot;40&quot; height=&quot;40&quot; patternUnits=&quot;userSpaceOnUse&quot;%3E%3Cpath d=&quot;M 40 0 L 0 0 0 40&quot; fill=&quot;none&quot; stroke=&quot;rgba(255,255,255,0.05)&quot; stroke-width=&quot;1&quot;/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=&quot;100%&quot; height=&quot;100%&quot; fill=&quot;url(%23grid)&quot; /%3E%3C/svg%3E'); opacity: 0.3;"></div>
                <div style="position: relative; z-index: 1;">
                  <div style="font-size: 56px; margin-bottom: 15px; text-shadow: 0 3px 10px rgba(0,0,0,0.2);">🎊</div>
                  <h1 style="color: white; margin: 0 0 15px 0; font-size: 42px; font-weight: 800; letter-spacing: -1px; text-shadow: 0 3px 15px rgba(0,0,0,0.2);">Order Confirmed!</h1>
                  <div style="background: rgba(255,255,255,0.2); display: inline-block; padding: 10px 25px; border-radius: 30px; backdrop-filter: blur(10px);">
                    <p style="color: white; margin: 0; font-size: 20px; font-weight: 600;">Thank you for choosing Sri Nidhi Catering</p>
                  </div>
                  <div style="margin-top: 25px; padding-top: 25px; border-top: 2px solid rgba(255, 255, 255, 0.3);">
                    <p style="color: rgba(255,255,255,0.95); margin: 0; font-size: 16px; font-weight: 600; letter-spacing: 1px;">Order #${data.id.slice(0, 8).toUpperCase()}</p>
                  </div>
                </div>
              </div>
              
              <!-- Main Content Card - Enhanced -->
              <div style="background: white; padding: 45px 40px; margin: 0 20px; border-radius: 0 0 20px 20px; box-shadow: 0 15px 60px rgba(0,0,0,0.12);">
                
                <!-- Personalized Greeting - Enhanced -->
                <div style="margin-bottom: 35px; text-align: center;">
                  <p style="font-size: 22px; color: #1f2937; margin: 0; line-height: 1.5;">Dear <strong style="color: #f59e0b; font-size: 24px;">${order.customer_name}</strong>,</p>
                </div>
                
                <!-- Success Message with Icon - Enhanced -->
                <div style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 25px 30px; border-radius: 16px; margin: 30px 0; border-left: 6px solid #10b981; box-shadow: 0 8px 20px rgba(16, 185, 129, 0.15); position: relative; overflow: hidden;">
                  <div style="position: absolute; right: -20px; top: -20px; font-size: 100px; opacity: 0.1;">✓</div>
                  <div style="position: relative; z-index: 1;">
                    <div style="display: inline-block; background: #10b981; padding: 8px 12px; border-radius: 8px; margin-bottom: 12px;">
                      <span style="font-size: 18px;">✅</span>
                    </div>
                    <p style="font-size: 20px; font-weight: 700; color: #065f46; margin: 0 0 8px 0; letter-spacing: -0.3px;">Order Successfully Confirmed!</p>
                    <p style="font-size: 16px; color: #047857; margin: 0; line-height: 1.6;">Your Diwali sweets order has been received and is being processed with care</p>
                  </div>
                </div>

                <!-- Order Details Card - Enhanced -->
                <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 30px; border-radius: 16px; margin: 35px 0; box-shadow: 0 8px 24px rgba(251, 191, 36, 0.2); border: 2px solid #fbbf24; position: relative; overflow: hidden;">
                  <div style="position: absolute; right: -30px; bottom: -30px; font-size: 120px; opacity: 0.08;">📋</div>
                  <div style="position: relative; z-index: 1;">
                    <div style="margin-bottom: 25px;">
                      <div style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 10px 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3);">
                        <h2 style="color: white; margin: 0; font-size: 20px; font-weight: 800; letter-spacing: 0.5px;">
                          <span style="font-size: 22px; margin-right: 8px;">📋</span> ORDER DETAILS
                        </h2>
                      </div>
                    </div>
                    <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">
                      <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding: 12px 0; color: #78350f; font-weight: 700; width: 45%; font-size: 15px;">Order ID:</td>
                          <td style="padding: 12px 0; color: #92400e; font-weight: 800; font-size: 16px;">#${data.id.slice(0, 8).toUpperCase()}</td>
                        </tr>
                        <tr style="border-top: 2px solid #fef3c7;">
                          <td style="padding: 12px 0; color: #78350f; font-weight: 700; font-size: 15px;">Order Date:</td>
                          <td style="padding: 12px 0; color: #92400e; font-weight: 600; font-size: 15px;">${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                        </tr>
                        <tr style="border-top: 2px solid #fef3c7;">
                          <td style="padding: 12px 0; color: #78350f; font-weight: 700; font-size: 15px;">Contact Number:</td>
                          <td style="padding: 12px 0; color: #92400e; font-weight: 700; font-size: 16px;">📞 ${order.mobile}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>

                <!-- Order Items Table - Enhanced -->
                <div style="margin: 40px 0;">
                  <div style="margin-bottom: 20px;">
                    <h3 style="color: #1f2937; margin: 0; font-size: 22px; font-weight: 800; display: inline-block; border-bottom: 4px solid #f59e0b; padding-bottom: 8px;">🛍️ Your Order Items</h3>
                  </div>
                  <table style="width: 100%; border-collapse: collapse; background: white; border: 3px solid #fbbf24; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 20px rgba(0,0,0,0.08);">
                    <thead>
                      <tr style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);">
                        <th style="padding: 18px 15px; text-align: left; color: white; font-weight: 800; font-size: 15px; text-transform: uppercase; letter-spacing: 1px;">Item</th>
                        <th style="padding: 18px 15px; text-align: center; color: white; font-weight: 800; font-size: 15px; text-transform: uppercase; letter-spacing: 1px;">Qty</th>
                        <th style="padding: 18px 15px; text-align: right; color: white; font-weight: 800; font-size: 15px; text-transform: uppercase; letter-spacing: 1px;">Price</th>
                        <th style="padding: 18px 15px; text-align: right; color: white; font-weight: 800; font-size: 15px; text-transform: uppercase; letter-spacing: 1px;">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${orderItems}
                    </tbody>
                    <tfoot>
                      <tr style="background: #fef9e6;">
                        <td colspan="3" style="padding: 16px 15px; text-align: right; font-weight: 700; color: #78350f; border-top: 3px solid #fbbf24; font-size: 15px;">Subtotal:</td>
                        <td style="padding: 16px 15px; text-align: right; font-weight: 800; color: #78350f; border-top: 3px solid #fbbf24; font-size: 17px;">₹${order.subtotal.toFixed(2)}</td>
                      </tr>
                      <tr style="background: #fef9e6;">
                        <td colspan="3" style="padding: 14px 15px; text-align: right; color: #78350f; font-weight: 600; font-size: 14px;">GST (5%):</td>
                        <td style="padding: 14px 15px; text-align: right; color: #78350f; font-weight: 700; font-size: 15px;">₹${order.gst_amount.toFixed(2)}</td>
                      </tr>
                      <tr style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);">
                        <td colspan="3" style="padding: 22px 15px; text-align: right; font-weight: 900; font-size: 20px; color: white; border-top: 4px solid #b45309;">💰 Total Amount:</td>
                        <td style="padding: 22px 15px; text-align: right; font-weight: 900; font-size: 24px; color: white; border-top: 4px solid #b45309;">₹${order.total_amount.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <!-- Delivery Address Card -->
                <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); padding: 25px; border-radius: 12px; margin: 30px 0; border: 2px solid #3b82f6; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);">
                  <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);">
                      <span style="font-size: 20px;">📍</span>
                    </div>
                    <h3 style="color: #1e40af; margin: 0; font-size: 18px; font-weight: 700;">Delivery Address</h3>
                  </div>
                  <div style="background: white; padding: 18px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                    <p style="margin: 0; color: #1e3a8a; line-height: 1.6; font-size: 15px; white-space: pre-line;">${order.address}</p>
                  </div>
                  ${order.special_instructions ? `
                  <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #fbbf24;">
                    <p style="margin: 0; color: #78350f;"><span style="font-weight: 700;">📝 Special Instructions:</span> ${order.special_instructions}</p>
                  </div>` : ''}
                </div>

                <!-- What's Next Card -->
                <div style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 25px; border-radius: 12px; margin: 30px 0; border: 2px solid #10b981; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);">
                  <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);">
                      <span style="font-size: 20px;">⏱️</span>
                    </div>
                    <h3 style="color: #065f46; margin: 0; font-size: 18px; font-weight: 700;">What's Next?</h3>
                  </div>
                  <div style="background: white; padding: 18px; border-radius: 8px; border-left: 4px solid #10b981;">
                    <p style="margin: 0; color: #065f46; line-height: 1.6; font-size: 15px;">
                      ✓ Our team will reach out to you shortly to arrange payment for your order
                    </p>
                  </div>
                </div>

                <!-- Payment Information - Premium Design -->
                <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 30px; border-radius: 16px; margin: 30px 0; border: 3px solid #fbbf24; box-shadow: 0 8px 24px rgba(251, 191, 36, 0.25);">
                  <div style="text-align: center; margin-bottom: 20px;">
                    <div style="display: inline-block; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); padding: 12px 24px; border-radius: 25px; box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);">
                      <span style="font-size: 24px; margin-right: 8px;">💳</span>
                      <span style="color: white; font-size: 20px; font-weight: 800; letter-spacing: 0.5px;">PAYMENT INFORMATION</span>
                    </div>
                  </div>
                  
                  <div style="background: white; padding: 30px; border-radius: 12px; margin: 20px 0; box-shadow: 0 4px 16px rgba(0,0,0,0.1);">
                    <p style="margin: 0 0 20px; color: #78350f; font-size: 16px; text-align: center; font-weight: 600;">
                      Please send your payment to complete your order
                    </p>
                    
                    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 25px; border-radius: 12px; margin: 20px 0; text-align: center; border: 3px dashed #fbbf24; box-shadow: inset 0 2px 8px rgba(251, 191, 36, 0.2);">
                      <p style="margin: 0 0 10px; color: #78350f; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">UPI Payment ID</p>
                      <div style="background: white; padding: 15px 25px; border-radius: 8px; display: inline-block; border: 2px solid #fbbf24; box-shadow: 0 2px 8px rgba(251, 191, 36, 0.3);">
                        <span style="font-size: 24px; font-weight: 800; color: #92400e; letter-spacing: 1px;">8760101010@apl</span>
                      </div>
                      <p style="margin: 20px 0 0; color: #92400e; font-size: 18px; font-weight: 700;">
                        Amount: <span style="font-size: 22px;">₹${order.total_amount.toFixed(2)}</span>
                      </p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 2px solid #fde68a;">
                      <p style="margin: 0 0 12px; color: #78350f; font-size: 15px; font-weight: 600;">We accept all UPI payment methods:</p>
                      <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 12px 24px; border-radius: 20px; display: inline-block; border: 2px solid #fbbf24;">
                        <span style="color: #92400e; font-size: 15px; font-weight: 700;">📱 GPay • PhonePe • Paytm • UPI Apps</span>
                      </div>
                    </div>
                    
                    <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-top: 20px; text-align: center; border-left: 4px solid #fbbf24;">
                      <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 600;">
                        💡 After payment, please share the screenshot on WhatsApp for confirmation
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Festive Diwali Message - Enhanced -->
                <div style="text-align: center; margin: 45px 0; padding: 45px 30px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 20%, #fbbf24 60%, #f59e0b 100%); border-radius: 20px; box-shadow: 0 12px 40px rgba(251, 191, 36, 0.4), 0 0 0 4px rgba(251, 191, 36, 0.2); border: 4px solid #d97706; position: relative; overflow: hidden;">
                  <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2) 0%, transparent 50%);"></div>
                  <div style="position: relative; z-index: 1;">
                    <div style="font-size: 64px; margin-bottom: 20px; text-shadow: 3px 3px 8px rgba(0,0,0,0.15); animation: sparkle 2s ease-in-out infinite;">🪔 ✨ 🎆</div>
                    <h2 style="font-size: 40px; margin: 20px 0; color: white; font-weight: 900; text-shadow: 2px 2px 8px rgba(0,0,0,0.3); letter-spacing: 2px; line-height: 1.2;">Happy Diwali!</h2>
                    <div style="background: rgba(255,255,255,0.3); display: inline-block; padding: 20px 35px; border-radius: 15px; backdrop-filter: blur(10px); margin: 15px 0;">
                      <p style="font-size: 19px; color: #78350f; margin: 0; font-weight: 700; line-height: 1.7; max-width: 500px;">
                        May these sweet treats bring joy, prosperity, and light to your festive celebrations! 🎉
                      </p>
                    </div>
                    <div style="margin-top: 25px; font-size: 40px; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">🕯️ 🪔 🕯️</div>
                  </div>
                </div>

                <!-- Need Help Section -->
                <div style="background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); padding: 30px 25px; border-radius: 12px; margin: 30px 0; text-align: center; border: 2px solid #d1d5db; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                  <div style="margin-bottom: 20px;">
                    <div style="display: inline-block; background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%); padding: 10px 20px; border-radius: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.15);">
                      <span style="color: white; font-size: 18px; font-weight: 700; letter-spacing: 0.5px;">💬 NEED HELP?</span>
                    </div>
                  </div>
                  <div style="background: white; padding: 20px; border-radius: 10px; margin-top: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                    <p style="margin: 12px 0; color: #374151; font-size: 16px;">
                      <span style="font-size: 20px; vertical-align: middle;">📞</span>
                      <span style="font-weight: 600; color: #6b7280;"> Call us: </span>
                      <a href="tel:+918760101010" style="color: #f59e0b; text-decoration: none; font-weight: 700; font-size: 17px;">+91 8760101010</a>
                    </p>
                    <div style="height: 1px; background: #e5e7eb; margin: 15px 0;"></div>
                    <p style="margin: 12px 0; color: #374151; font-size: 16px;">
                      <span style="font-size: 20px; vertical-align: middle;">💬</span>
                      <span style="font-weight: 600; color: #6b7280;"> WhatsApp: </span>
                      <a href="https://wa.me/918760101010" style="color: #25D366; text-decoration: none; font-weight: 700; font-size: 17px;">+91 8760101010</a>
                    </p>
                  </div>
                  <p style="margin: 20px 0 0; color: #6b7280; font-size: 14px; font-style: italic;">
                    We're here to help! Contact us anytime for queries or support.
                  </p>
                </div>

                <!-- Thank You Message -->
                <div style="text-align: center; margin: 35px 0; padding: 25px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; border: 2px solid #fbbf24;">
                  <p style="font-size: 18px; color: #78350f; margin: 10px 0; font-weight: 600; line-height: 1.8;">
                    Thank you for choosing <strong style="color: #92400e; font-size: 20px;">Sri Nidhi Catering!</strong>
                  </p>
                  <p style="font-size: 16px; color: #92400e; margin: 15px 0; font-weight: 700;">
                    ⭐ Your satisfaction is our priority ⭐
                  </p>
                </div>
              </div>

              <!-- Footer -->
              <div style="text-align: center; padding: 30px 20px; background: linear-gradient(135deg, #1f2937 0%, #111827 100%); border-top: 4px solid #fbbf24;">
                <div style="margin-bottom: 15px;">
                  <span style="font-size: 28px; color: #fbbf24; font-weight: 800; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); letter-spacing: 1px;">Sri Nidhi Catering</span>
                </div>
                <p style="margin: 10px 0; color: #d1d5db; font-size: 13px; line-height: 1.6;">
                  Crafting delicious memories since years • Premium Quality • Traditional Taste
                </p>
                <div style="margin: 20px 0; height: 2px; background: linear-gradient(to right, transparent, #fbbf24, transparent);"></div>
                <p style="margin: 8px 0; color: #9ca3af; font-size: 12px;">
                  © ${new Date().getFullYear()} Sri Nidhi Catering. All rights reserved.
                </p>
                <p style="margin: 8px 0; color: #6b7280; font-size: 11px; font-style: italic;">
                  This is an automated confirmation email for your order #${data.id.slice(0, 8).toUpperCase()}
                </p>
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
