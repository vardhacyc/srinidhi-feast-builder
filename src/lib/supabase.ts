import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

// Export supabase client for use in components
export { supabase };

// Helper function to check if Supabase is configured
export const isSupabaseConnected = () => {
  return true; // Always connected since we're using the integrated client
};

// Database types
export interface Order {
  id: string;
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
  status: 'received' | 'processing' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'received';
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  gst_percentage: number;
  description?: string;
  content?: string;
  image_url?: string;
  category: string;
  soft_enabled: boolean;
  hard_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface Feature {
  id: string;
  feature_name: string;
  is_enabled: boolean;
  description?: string;
  created_at: string;
  updated_at: string;
}

// Database row type (what comes from Supabase)
interface OrderRow {
  id: string;
  customer_name: string;
  customer_email?: string;
  mobile: string;
  address: string;
  special_instructions?: string;
  items: Json;
  subtotal: number;
  gst_amount: number;
  total_amount: number;
  total_items: number;
  status: string;
  payment_status: string;
  created_at: string;
  updated_at: string;
}

// Helper function to convert database row to Order
const convertRowToOrder = (row: OrderRow): Order => ({
  ...row,
  items: row.items as unknown as OrderItem[],
  status: row.status as Order['status'],
  payment_status: row.payment_status as Order['payment_status']
});

// Order management functions
export const orderService = {
  async createOrder(orderData: Omit<Order, 'id' | 'created_at' | 'updated_at'>) {
    // Use Edge Function to bypass client RLS for inserts while keeping server-side validation
    const { data, error } = await supabase.functions.invoke('create-order', {
      body: {
        ...orderData,
        items: orderData.items,
      }
    });

    if (error) throw error;
    if (!data?.success) throw new Error(data?.error || 'Failed to create order');
    return convertRowToOrder(data.order as OrderRow);
  },

  async getOrders(): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data as OrderRow[]).map(convertRowToOrder);
  },

  async updateOrderStatus(orderId: string, status: Order['status']) {
    const { data, error } = await supabase
      .from('orders')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return convertRowToOrder(data as OrderRow);
  },

  async updatePaymentStatus(orderId: string, payment_status: Order['payment_status']) {
    const { data, error } = await supabase
      .from('orders')
      .update({ 
        payment_status,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return convertRowToOrder(data as OrderRow);
  },

  async deleteOrder(orderId: string) {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', orderId);

    if (error) throw error;
  }
};

// Product management functions
export const productService = {
  async getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('hard_enabled', true)
      .order('name');

    if (error) throw error;
    return data as Product[];
  },

  async getAllProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name');

    if (error) throw error;
    return data as Product[];
  },

  async createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();

    if (error) throw error;
    return data as Product;
  },

  async updateProduct(id: string, updates: Partial<Product>) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Product;
  },

  async deleteProduct(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// Feature flags functions
export const featureService = {
  async getFeatures(): Promise<Feature[]> {
    const { data, error } = await supabase
      .from('features')
      .select('*')
      .order('feature_name');

    if (error) throw error;
    return data as Feature[];
  },

  async getFeature(featureName: string): Promise<Feature | null> {
    const { data, error } = await supabase
      .from('features')
      .select('*')
      .eq('feature_name', featureName)
      .maybeSingle();

    if (error) throw error;
    return data as Feature | null;
  },

  async updateFeature(id: string, isEnabled: boolean) {
    const { data, error } = await supabase
      .from('features')
      .update({ is_enabled: isEnabled })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Feature;
  }
};

// Auth functions
export const authService = {
  async sendOTP(email: string) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      }
    });

    if (error) throw error;
    return data;
  },

  async verifyOTP(email: string, token: string) {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email'
    });

    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  async signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  },

  async isAdmin() {
    try {
      const user = await this.getCurrentUser();
      if (!user) return false;

      const { data, error } = await supabase
        .from('user_roles')
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
