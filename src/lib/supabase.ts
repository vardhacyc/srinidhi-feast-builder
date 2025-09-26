import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase credentials are available
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

// Create client only if credentials are available
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database types
export interface Order {
  id: string;
  customer_name: string;
  mobile: string;
  address: string;
  special_instructions?: string;
  items: OrderItem[];
  subtotal: number;
  gst_amount: number;
  total_amount: number;
  total_items: number;
  status: 'received' | 'processing' | 'completed' | 'cancelled';
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

// Order management functions
export const orderService = {
  async createOrder(orderData: Omit<Order, 'id' | 'created_at' | 'updated_at'>) {
    if (!supabase) {
      throw new Error('Supabase is not configured. Please connect your Supabase project.');
    }
    
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getOrders() {
    if (!supabase) {
      throw new Error('Supabase is not configured. Please connect your Supabase project.');
    }
    
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async updateOrderStatus(orderId: string, status: Order['status']) {
    if (!supabase) {
      throw new Error('Supabase is not configured. Please connect your Supabase project.');
    }
    
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
    return data;
  },

  async deleteOrder(orderId: string) {
    if (!supabase) {
      throw new Error('Supabase is not configured. Please connect your Supabase project.');
    }
    
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', orderId);

    if (error) throw error;
  }
};

// Auth functions
export const authService = {
  async sendOTP(phone: string) {
    if (!supabase) {
      throw new Error('Supabase is not configured. Please connect your Supabase project to enable OTP verification.');
    }
    
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: `+91${phone}`,
      options: {
        channel: 'sms'
      }
    });

    if (error) throw error;
    return data;
  },

  async verifyOTP(phone: string, token: string) {
    if (!supabase) {
      throw new Error('Supabase is not configured. Please connect your Supabase project to enable OTP verification.');
    }
    
    const { data, error } = await supabase.auth.verifyOtp({
      phone: `+91${phone}`,
      token,
      type: 'sms'
    });

    if (error) throw error;
    return data;
  },

  async signOut() {
    if (!supabase) {
      throw new Error('Supabase is not configured. Please connect your Supabase project.');
    }
    
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    if (!supabase) {
      throw new Error('Supabase is not configured. Please connect your Supabase project.');
    }
    
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  async isAdmin() {
    if (!supabase) return false;
    
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

// Helper function to check if Supabase is configured
export const isSupabaseConnected = () => {
  return isSupabaseConfigured;
};