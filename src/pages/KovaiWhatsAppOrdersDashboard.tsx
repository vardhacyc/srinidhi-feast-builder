import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kovaiAuthService, kovaiAbandonedCartService, KovaiAbandonedCart } from '../lib/kovaiSupabase';
import { authService } from '../lib/supabase';
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
  IndianRupee,
  Package,
  Calendar,
  Clock,
  Eye,
  Store
} from 'lucide-react';

const KovaiWhatsAppOrdersDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [carts, setCarts] = useState<KovaiAbandonedCart[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCart, setSelectedCart] = useState<KovaiAbandonedCart | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const adminStatus = await kovaiAuthService.isKovaiAdmin();
      if (!adminStatus) {
        toast({
          title: "Access Denied",
          description: "You don't have Kovai admin privileges",
          variant: "destructive",
        });
        navigate('/kovai/admin-login');
        return;
      }
      setIsAdmin(true);
      fetchCarts();
    } catch (error) {
      console.error('Error checking admin access:', error);
      navigate('/kovai/admin-login');
    }
  };

  const fetchCarts = async () => {
    try {
      setLoading(true);
      const cartsData = await kovaiAbandonedCartService.getCarts();
      setCarts(cartsData);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch carts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCart = async (cartId: string) => {
    if (!confirm('Are you sure you want to delete this cart?')) return;
    
    try {
      await kovaiAbandonedCartService.deleteCart(cartId);
      toast({
        title: "Success",
        description: "Cart deleted successfully",
      });
      fetchCarts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete cart",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await authService.signOut();
      navigate('/kovai/admin-login');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to logout",
        variant: "destructive",
      });
    }
  };

  const sendWhatsAppMessage = (cart: KovaiAbandonedCart) => {
    const message = encodeURIComponent(
      `Hello ${cart.customer_name},\n\nWe noticed you left items in your cart. Would you like to complete your order?\n\nTotal: ₹${cart.total_amount.toFixed(2)}\n\nKovai Caterers`
    );
    window.open(`https://wa.me/${cart.mobile.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  const filteredCarts = carts.filter(cart => {
    const matchesSearch = 
      cart.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cart.mobile.includes(searchTerm) ||
      cart.customer_email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  if (loading && !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="mb-6 border-green-100 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-2">
                <Store className="h-8 w-8 text-green-600" />
                Kovai WhatsApp Orders
              </CardTitle>
              <p className="text-muted-foreground mt-1">Abandoned Carts Dashboard</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={fetchCarts} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button onClick={handleLogout} variant="destructive" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Search */}
        <Card className="mb-6 border-green-100">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, mobile, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Carts List */}
        <div className="space-y-4">
          {loading ? (
            <Card>
              <CardContent className="py-8 text-center">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p>Loading carts...</p>
              </CardContent>
            </Card>
          ) : filteredCarts.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No WhatsApp orders found</p>
              </CardContent>
            </Card>
          ) : (
            filteredCarts.map((cart) => (
              <Card key={cart.id} className="hover:shadow-lg transition-shadow border-green-100">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{cart.customer_name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(cart.created_at).toLocaleString()}
                      </p>
                    </div>
                    <Badge variant="secondary">WhatsApp Order</Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{cart.mobile}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{cart.customer_email}</span>
                    </div>
                    {cart.delivery_date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{cart.delivery_date}</span>
                      </div>
                    )}
                    {cart.delivery_time && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{cart.delivery_time}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{cart.address}</span>
                  </div>

                  {cart.special_instructions && (
                    <div className="bg-amber-50 p-3 rounded-lg mb-4">
                      <p className="text-sm text-muted-foreground">
                        <strong>Special Instructions:</strong> {cart.special_instructions}
                      </p>
                    </div>
                  )}

                  <div className="bg-green-50 p-3 rounded-lg mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium">Total Amount:</span>
                      <span className="text-lg font-bold text-green-600 flex items-center">
                        <IndianRupee className="h-4 w-4" />
                        {cart.total_amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-muted-foreground mt-1">
                      <span>Items: {cart.total_items}</span>
                      <span>GST: ₹{cart.gst_amount.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCart(selectedCart?.id === cart.id ? null : cart)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {selectedCart?.id === cart.id ? 'Hide' : 'View'} Items
                    </Button>

                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => sendWhatsAppMessage(cart)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteCart(cart.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Items List */}
                  {selectedCart?.id === cart.id && cart.cart_items && (
                    <div className="mt-4 border-t pt-4">
                      <h4 className="font-semibold mb-2">Cart Items:</h4>
                      <div className="space-y-2">
                        {cart.cart_items.map((item: any, index: number) => (
                          <div key={index} className="flex justify-between items-center text-sm bg-white p-2 rounded">
                            <span>{item.name}</span>
                            <span className="font-medium">{item.quantity}kg × ₹{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default KovaiWhatsAppOrdersDashboard;
