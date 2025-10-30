import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, supabase } from '../lib/supabase';
import type { Json } from '@/integrations/supabase/types';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  Search,
  LogOut,
  RefreshCw,
  MessageCircle,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  IndianRupee,
  Package,
  Eye,
  FileText
} from 'lucide-react';

interface AbandonedCartRow {
  id: string;
  customer_name: string;
  customer_email: string;
  mobile: string;
  address: string;
  delivery_date: string | null;
  delivery_time: string | null;
  special_instructions: string | null;
  cart_items: Json;
  subtotal: number;
  gst_amount: number;
  total_amount: number;
  total_items: number;
  created_at: string;
}

interface AbandonedCart {
  id: string;
  customer_name: string;
  customer_email: string;
  mobile: string;
  address: string;
  delivery_date?: string;
  delivery_time?: string;
  special_instructions?: string;
  cart_items: any[];
  subtotal: number;
  gst_amount: number;
  total_amount: number;
  total_items: number;
  created_at: string;
}

const WhatsAppOrdersDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [carts, setCarts] = useState<AbandonedCart[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCart, setSelectedCart] = useState<AbandonedCart | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const adminStatus = await authService.isAdmin();
      if (!adminStatus) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges",
          variant: "destructive",
        });
        navigate('/admin-login');
        return;
      }
      setIsAdmin(true);
      fetchCarts();
    } catch (error) {
      console.error('Error checking admin access:', error);
      navigate('/admin-login');
    }
  };

  const fetchCarts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('abandoned_carts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const convertedData = (data as AbandonedCartRow[] || []).map(row => ({
        ...row,
        cart_items: row.cart_items as any[],
        delivery_date: row.delivery_date || undefined,
        delivery_time: row.delivery_time || undefined,
        special_instructions: row.special_instructions || undefined,
      }));
      
      setCarts(convertedData);
    } catch (error) {
      console.error('Error fetching WhatsApp orders:', error);
      toast({
        title: "Error",
        description: "Failed to load WhatsApp orders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this WhatsApp order?')) return;

    try {
      const { error } = await supabase
        .from('abandoned_carts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "WhatsApp order deleted successfully",
      });
      fetchCarts();
    } catch (error) {
      console.error('Error deleting cart:', error);
      toast({
        title: "Error",
        description: "Failed to delete WhatsApp order",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      navigate('/admin-login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const sendWhatsAppMessage = (cart: AbandonedCart) => {
    const items = cart.cart_items.map((item: any) => 
      `${item.name} - ${item.quantity}kg`
    ).join('\n');
    
    const message = `Order Details:\n\n${items}\n\nCustomer: ${cart.customer_name}\nMobile: ${cart.mobile}\nAddress: ${cart.address}`;
    const whatsappUrl = `https://wa.me/91${cart.mobile}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const filteredCarts = carts.filter(cart =>
    cart.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cart.mobile.includes(searchTerm) ||
    cart.customer_email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-green-600" />
                WhatsApp Orders Dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage orders received via WhatsApp
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={fetchCarts}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total WhatsApp Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{carts.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                ₹{carts.reduce((sum, cart) => sum + Number(cart.total_amount), 0).toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {carts.reduce((sum, cart) => sum + cart.total_items, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by name, mobile, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredCarts.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No WhatsApp orders found</p>
              </CardContent>
            </Card>
          ) : (
            filteredCarts.map((cart) => (
              <Card key={cart.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Order Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg text-foreground">{cart.customer_name}</h3>
                          <p className="text-sm text-muted-foreground">{formatDate(cart.created_at)}</p>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          WhatsApp
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          <span>{cart.mobile}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <span>{cart.customer_email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span className="line-clamp-1">{cart.address}</span>
                        </div>
                        {cart.delivery_date && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{cart.delivery_date} {cart.delivery_time && `at ${cart.delivery_time}`}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{cart.total_items} items</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <IndianRupee className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">₹{Number(cart.total_amount).toFixed(2)}</span>
                        </div>
                      </div>

                      {cart.special_instructions && (
                        <div className="flex items-start gap-2 text-sm bg-muted/50 p-3 rounded-md">
                          <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <span className="text-muted-foreground">{cart.special_instructions}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedCart(cart)}
                        className="flex-1 lg:flex-none"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Items
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => sendWhatsAppMessage(cart)}
                        className="flex-1 lg:flex-none bg-green-600 hover:bg-green-700"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(cart.id)}
                        className="flex-1 lg:flex-none text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>

      {/* Order Details Modal */}
      {selectedCart && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Order Items</span>
                <Button variant="ghost" size="sm" onClick={() => setSelectedCart(null)}>
                  ✕
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedCart.cart_items.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{item.quantity}kg</p>
                    <p className="text-sm text-muted-foreground">₹{Number(item.price).toFixed(2)}/kg</p>
                  </div>
                </div>
              ))}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>₹{Number(selectedCart.subtotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">GST:</span>
                  <span>₹{Number(selectedCart.gst_amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>₹{Number(selectedCart.total_amount).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default WhatsAppOrdersDashboard;
