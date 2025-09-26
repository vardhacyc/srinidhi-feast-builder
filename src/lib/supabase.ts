import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

// Helper function to check if Supabase is configured
export const isSupabaseConnected = () => {
  return true; // Always connected since we're using the integrated client
};

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

// Database row type (what comes from Supabase)
interface OrderRow {
  id: string;
  customer_name: string;
  mobile: string;
  address: string;
  special_instructions?: string;
  items: Json;
  subtotal: number;
  gst_amount: number;
  total_amount: number;
  total_items: number;
  status: string;
  created_at: string;
  updated_at: string;
}

// Helper function to convert database row to Order
const convertRowToOrder = (row: OrderRow): Order => ({
  ...row,
  items: row.items as unknown as OrderItem[],
  status: row.status as Order['status']
});

// Order management functions
export const orderService = {
  async createOrder(orderData: Omit<Order, 'id' | 'created_at' | 'updated_at'>) {
    const dbData = {
      ...orderData,
      items: orderData.items as unknown as Json
    };
    
    const { data, error } = await supabase
      .from('orders')
      .insert([dbData])
      .select()
      .single();

    if (error) throw error;
    return convertRowToOrder(data as OrderRow);
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

  async deleteOrder(orderId: string) {
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
    
    const { data, error } = await supabase.auth.verifyOtp({
      phone: `+91${phone}`,
      token,
      type: 'sms'
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
