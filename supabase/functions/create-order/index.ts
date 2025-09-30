import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

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
