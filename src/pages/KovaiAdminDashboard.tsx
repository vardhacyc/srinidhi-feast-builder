import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kovaiOrderService, kovaiAuthService, KovaiOrder } from '../lib/kovaiSupabase';
import { authService } from '../lib/supabase';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
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
  Store
} from 'lucide-react';

const KovaiAdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [orders, setOrders] = useState<KovaiOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
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
      fetchOrders();
    } catch (error) {
      console.error('Error checking admin access:', error);
      navigate('/kovai/admin-login');
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const ordersData = await kovaiOrderService.getOrders();
      setOrders(ordersData);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch orders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, status: KovaiOrder['status']) => {
    try {
      await kovaiOrderService.updateOrderStatus(orderId, status);
      toast({
        title: "Success",
        description: "Order status updated",
      });
      fetchOrders();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const handlePaymentUpdate = async (orderId: string, paymentStatus: KovaiOrder['payment_status']) => {
    try {
      await kovaiOrderService.updatePaymentStatus(orderId, paymentStatus);
      toast({
        title: "Success",
        description: "Payment status updated",
      });
      fetchOrders();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update payment status",
        variant: "destructive",
      });
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    
    try {
      await kovaiOrderService.deleteOrder(orderId);
      toast({
        title: "Success",
        description: "Order deleted",
      });
      fetchOrders();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete order",
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

  const sendWhatsAppMessage = (order: KovaiOrder) => {
    const message = encodeURIComponent(
      `Hello ${order.customer_name},\n\nYour order #${order.id.slice(0, 8)} for ₹${order.total_amount.toFixed(2)} has been received.\n\nStatus: ${order.status}\n\nThank you for ordering from Kovai Caterers!`
    );
    window.open(`https://wa.me/${order.mobile.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.mobile.includes(searchTerm) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'received': return 'default';
      case 'preparing': return 'secondary';
      case 'delivered': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'default';
    }
  };

  const getPaymentBadgeVariant = (status: string) => {
    return status === 'paid' ? 'outline' : 'destructive';
  };

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
                Kovai Caterers Admin
              </CardTitle>
              <p className="text-muted-foreground mt-1">Order Management Dashboard</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={fetchOrders} variant="outline" size="sm">
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

        {/* Filters */}
        <Card className="mb-6 border-green-100">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                  <SelectItem value="preparing">Preparing</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {loading ? (
            <Card>
              <CardContent className="py-8 text-center">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p>Loading orders...</p>
              </CardContent>
            </Card>
          ) : filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No orders found</p>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow border-green-100">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{order.customer_name}</h3>
                      <p className="text-sm text-muted-foreground">Order #{order.id.slice(0, 8)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={getStatusBadgeVariant(order.status)}>
                        {order.status}
                      </Badge>
                      <Badge variant={getPaymentBadgeVariant(order.payment_status)}>
                        {order.payment_status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{order.mobile}</span>
                    </div>
                    {order.customer_email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{order.customer_email}</span>
                      </div>
                    )}
                    {order.delivery_date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{order.delivery_date}</span>
                      </div>
                    )}
                    {order.delivery_time && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{order.delivery_time}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{order.address}</span>
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium">Total Amount:</span>
                      <span className="text-lg font-bold text-green-600 flex items-center">
                        <IndianRupee className="h-4 w-4" />
                        {order.total_amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-muted-foreground mt-1">
                      <span>Items: {order.total_items}</span>
                      <span>GST: ₹{order.gst_amount.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Select
                      value={order.status}
                      onValueChange={(value) => handleStatusUpdate(order.id, value as KovaiOrder['status'])}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="received">Received</SelectItem>
                        <SelectItem value="preparing">Preparing</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={order.payment_status}
                      onValueChange={(value) => handlePaymentUpdate(order.id, value as KovaiOrder['payment_status'])}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => sendWhatsAppMessage(order)}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default KovaiAdminDashboard;
