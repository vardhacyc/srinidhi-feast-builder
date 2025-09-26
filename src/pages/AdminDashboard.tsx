import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderService, authService, Order } from '../lib/supabase';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  Clock,
  Package,
  DollarSign,
  Users,
  TrendingUp,
  LogOut
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
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
          description: "You don't have admin privileges.",
          variant: "destructive"
        });
        navigate('/diwali');
        return;
      }
      setIsAdmin(true);
      loadOrders();
    } catch (error) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access the admin dashboard.",
        variant: "destructive"
      });
      navigate('/diwali');
    }
  };

  const loadOrders = async () => {
    try {
      setLoading(true);
      const ordersData = await orderService.getOrders();
      setOrders(ordersData);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load orders.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: Order['status']) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus, updated_at: new Date().toISOString() }
          : order
      ));
      toast({
        title: "Status Updated",
        description: "Order status has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update order status.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    
    try {
      await orderService.deleteOrder(orderId);
      setOrders(orders.filter(order => order.id !== orderId));
      toast({
        title: "Order Deleted",
        description: "Order has been deleted successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete order.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = async () => {
    try {
      await authService.signOut();
      navigate('/diwali');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive"
      });
    }
  };

  const exportToCSV = () => {
    const headers = [
      'Order ID', 'Customer Name', 'Mobile', 'Address', 'Items',
      'Subtotal', 'GST', 'Total Amount', 'Status', 'Created At'
    ];
    
    const csvData = filteredOrders.map(order => [
      order.id.slice(0, 8).toUpperCase(),
      order.customer_name,
      order.mobile,
      order.address.replace(/\n/g, ' '),
      order.items.map(item => `${item.name} (${item.quantity}kg)`).join('; '),
      order.subtotal,
      order.gst_amount,
      order.total_amount,
      order.status,
      new Date(order.created_at).toLocaleDateString('en-IN')
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `diwali-orders-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.mobile.includes(searchTerm) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Order['status']) => {
    const variants = {
      received: 'bg-blue-100 text-blue-800',
      processing: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    
    return <Badge className={variants[status]}>{status.toUpperCase()}</Badge>;
  };

  const getOrderStats = () => {
    return {
      total: orders.length,
      revenue: orders.reduce((sum, order) => sum + order.total_amount, 0),
      pending: orders.filter(order => order.status === 'received').length,
      completed: orders.filter(order => order.status === 'completed').length
    };
  };

  const stats = getOrderStats();

  if (!isAdmin) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold diwali-text-gradient">
              🪔 Diwali Orders Dashboard
            </h1>
            <p className="text-diwali-text mt-2">
              Manage your sweet orders efficiently
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-diwali-gold text-diwali-gold hover:bg-diwali-gold hover:text-white"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="diwali-glass-card border-diwali-gold/30">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-diwali-gold" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-diwali-subtle">Total Orders</p>
                  <p className="text-2xl font-bold text-diwali-dark">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="diwali-glass-card border-diwali-gold/30">
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-diwali-subtle">Total Revenue</p>
                  <p className="text-2xl font-bold text-diwali-dark">₹{stats.revenue.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="diwali-glass-card border-diwali-gold/30">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-diwali-subtle">Pending</p>
                  <p className="text-2xl font-bold text-diwali-dark">{stats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="diwali-glass-card border-diwali-gold/30">
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-diwali-subtle">Completed</p>
                  <p className="text-2xl font-bold text-diwali-dark">{stats.completed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Management */}
        <Card className="diwali-glass-card border-diwali-gold/30">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-2xl diwali-text-gradient">
                Order Management
              </CardTitle>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 diwali-glass border-diwali-gold/30"
                  />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40 diwali-glass border-diwali-gold/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="received">Received</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button
                  onClick={exportToCSV}
                  variant="outline"
                  className="border-diwali-gold text-diwali-gold hover:bg-diwali-gold hover:text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-diwali-gold mx-auto"></div>
                <p className="mt-4 text-diwali-text">Loading orders...</p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-diwali-subtle mx-auto mb-4" />
                <p className="text-diwali-text">No orders found.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="diwali-glass-card rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-diwali-dark">
                              {order.customer_name}
                            </h3>
                            <p className="text-sm text-diwali-subtle">
                              Order #{order.id.slice(0, 8).toUpperCase()}
                            </p>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-diwali-dark">
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            +91 {order.mobile}
                          </div>
                          <div className="flex items-center gap-1">
                            <Package className="h-3 w-3" />
                            {order.total_items}kg items
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            ₹{order.total_amount}
                          </div>
                        </div>
                        
                        <p className="text-xs text-diwali-subtle mt-1">
                          {new Date(order.created_at).toLocaleString('en-IN')}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Select
                          value={order.status}
                          onValueChange={(value: Order['status']) => 
                            handleStatusUpdate(order.id, value)
                          }
                        >
                          <SelectTrigger className="w-32 h-8 text-xs border-diwali-gold/30">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="received">Received</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button
                          onClick={() => setSelectedOrder(order)}
                          variant="outline"
                          size="sm"
                          className="h-8"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        
                        <Button
                          onClick={() => handleDeleteOrder(order.id)}
                          variant="outline"
                          size="sm"
                          className="h-8 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;