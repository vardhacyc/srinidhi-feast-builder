// Kovai Caterers Supabase Service
// Separate database operations for Kovai Caterers
import { supabase } from "@/integrations/supabase/client";

// Database Interface Definitions for Kovai
export interface KovaiOrder {
  id: string;
  customer_name: string;
  customer_email?: string;
  mobile: string;
  address: string;
  special_instructions?: string;
  items: KovaiOrderItem[];
  subtotal: number;
  gst_amount: number;
  total_amount: number;
  total_items: number;
  delivery_date?: string;
  delivery_time?: string;
  status: 'received' | 'preparing' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid';
  created_at: string;
  updated_at: string;
}

export interface KovaiOrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  gst_percentage: number;
}

export interface KovaiProduct {
  id: string;
  name: string;
  price: number;
  description?: string;
  image_url?: string;
  category: string;
  sku?: string;
  content?: string;
  gst_percentage: number;
  hard_enabled: boolean;
  soft_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface KovaiFeature {
  id: string;
  feature_name: string;
  description?: string;
  is_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface KovaiAbandonedCart {
  id: string;
  customer_name: string;
  customer_email: string;
  mobile: string;
  address: string;
  special_instructions?: string;
  cart_items: any[];
  subtotal: number;
  gst_amount: number;
  total_amount: number;
  total_items: number;
  delivery_date?: string;
  delivery_time?: string;
  created_at: string;
}

interface KovaiOrderRow {
  id: string;
  customer_name: string;
  customer_email: string | null;
  mobile: string;
  address: string;
  special_instructions: string | null;
  items: any;
  subtotal: number;
  gst_amount: number;
  total_amount: number;
  total_items: number;
  delivery_date: string | null;
  delivery_time: string | null;
  status: string;
  payment_status: string;
  created_at: string;
  updated_at: string;
}

function convertRowToKovaiOrder(row: KovaiOrderRow): KovaiOrder {
  return {
    id: row.id,
    customer_name: row.customer_name,
    customer_email: row.customer_email || undefined,
    mobile: row.mobile,
    address: row.address,
    special_instructions: row.special_instructions || undefined,
    items: Array.isArray(row.items) ? row.items : [],
    subtotal: Number(row.subtotal),
    gst_amount: Number(row.gst_amount),
    total_amount: Number(row.total_amount),
    total_items: row.total_items,
    delivery_date: row.delivery_date || undefined,
    delivery_time: row.delivery_time || undefined,
    status: row.status as KovaiOrder['status'],
    payment_status: row.payment_status as KovaiOrder['payment_status'],
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

// Kovai Order Service
export const kovaiOrderService = {
  async createOrder(orderData: Omit<KovaiOrder, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase.functions.invoke('create-kovai-order', {
      body: orderData
    });
    
    if (error) throw error;
    return data;
  },

  async getOrders(): Promise<KovaiOrder[]> {
    const { data, error } = await supabase
      .from('kovai_orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(convertRowToKovaiOrder);
  },

  async updateOrderStatus(orderId: string, status: KovaiOrder['status']) {
    const { error } = await supabase
      .from('kovai_orders')
      .update({ status })
      .eq('id', orderId);

    if (error) throw error;
  },

  async updatePaymentStatus(orderId: string, payment_status: KovaiOrder['payment_status']) {
    const { error } = await supabase
      .from('kovai_orders')
      .update({ payment_status })
      .eq('id', orderId);

    if (error) throw error;
  },

  async deleteOrder(orderId: string) {
    const { error } = await supabase
      .from('kovai_orders')
      .delete()
      .eq('id', orderId);

    if (error) throw error;
  }
};

// Kovai Product Service
export const kovaiProductService = {
  async getProducts(): Promise<KovaiProduct[]> {
    const { data, error } = await supabase
      .from('kovai_products')
      .select('*')
      .eq('hard_enabled', true)
      .order('name');

    if (error) throw error;
    return data || [];
  },

  async getAllProducts(): Promise<KovaiProduct[]> {
    const { data, error } = await supabase
      .from('kovai_products')
      .select('*')
      .order('name');

    if (error) throw error;
    return data || [];
  },

  async createProduct(product: Omit<KovaiProduct, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('kovai_products')
      .insert(product)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateProduct(id: string, updates: Partial<KovaiProduct>) {
    const { error } = await supabase
      .from('kovai_products')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
  },

  async deleteProduct(id: string) {
    const { error } = await supabase
      .from('kovai_products')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// Kovai Feature Service
export const kovaiFeatureService = {
  async getFeatures(): Promise<KovaiFeature[]> {
    const { data, error } = await supabase
      .from('kovai_features')
      .select('*')
      .order('feature_name');

    if (error) throw error;
    return data || [];
  },

  async getFeature(featureName: string): Promise<KovaiFeature | null> {
    const { data, error } = await supabase
      .from('kovai_features')
      .select('*')
      .eq('feature_name', featureName)
      .single();

    if (error) return null;
    return data;
  },

  async updateFeature(id: string, isEnabled: boolean) {
    const { error } = await supabase
      .from('kovai_features')
      .update({ is_enabled: isEnabled })
      .eq('id', id);

    if (error) throw error;
  }
};

// Kovai Abandoned Cart Service
export const kovaiAbandonedCartService = {
  async getCarts(): Promise<KovaiAbandonedCart[]> {
    const { data, error } = await supabase
      .from('kovai_abandoned_carts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(cart => ({
      ...cart,
      cart_items: Array.isArray(cart.cart_items) ? cart.cart_items : []
    })) as KovaiAbandonedCart[];
  },

  async createCart(cartData: Omit<KovaiAbandonedCart, 'id' | 'created_at'>) {
    const { error } = await supabase
      .from('kovai_abandoned_carts')
      .insert(cartData);

    if (error) throw error;
  },

  async deleteCart(cartId: string) {
    const { error } = await supabase
      .from('kovai_abandoned_carts')
      .delete()
      .eq('id', cartId);

    if (error) throw error;
  }
};

// Kovai Authentication Service
export const kovaiAuthService = {
  async isKovaiAdmin(): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { data, error } = await supabase
        .from('kovai_user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (error) return false;
      return data?.role === 'admin';
    } catch {
      return false;
    }
  }
};
