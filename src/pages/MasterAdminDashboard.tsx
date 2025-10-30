import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderService, authService, isSupabaseConnected, Order } from '../lib/supabase';
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
  IndianRupee,
  Users,
  TrendingUp,
  LogOut,
  RefreshCw,
  Wifi,
  WifiOff,
  MessageCircle,
  Printer,
  FileDown,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  CreditCard,
  Calendar,
  MapPin,
  FileText,
  Settings,
  MoreVertical,
  CheckSquare,
  Square,
  Bell
} from 'lucide-react';

const MasterAdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [orderSourceFilter, setOrderSourceFilter] = useState<string>('all');
  const [timelineFilter, setTimelineFilter] = useState<string>('all');
  const [showCustomTime, setShowCustomTime] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAutoRefresh, setIsAutoRefresh] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  
  const isOrderOverdue = (order: Order): boolean => {
    const orderDate = new Date(order.created_at);
    const hoursDiff = (Date.now() - orderDate.getTime()) / (1000 * 60 * 60);
    return hoursDiff > 24;
  };
  
  const hasPaymentIssue = (order: Order): boolean => {
    const orderDate = new Date(order.created_at);
    const hoursDiff = (Date.now() - orderDate.getTime()) / (1000 * 60 * 60);
    return hoursDiff > 24 && order.status !== 'completed' && order.status !== 'cancelled';
  };
  const [bulkAction, setBulkAction] = useState<string>('');

  useEffect(() => {
    checkAdminAccess();
  }, []);

  // Real-time polling for new orders
  useEffect(() => {
    if (!isAdmin || !isAutoRefresh) return;

    const interval = setInterval(async () => {
      try {
        const ordersData = await orderService.getOrders();
        // Sort by creation date (newest first)
        const sortedOrders = ordersData.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        
        // Check for new orders
        const newOrdersFound = sortedOrders.length > orders.length;
        if (newOrdersFound) {
          const newCount = sortedOrders.length - orders.length;
          setNewOrdersCount(prev => prev + newCount);
          toast({
            title: `🎉 ${newCount} New Order${newCount > 1 ? 's' : ''}!`,
            description: `${newCount} new order${newCount > 1 ? 's have' : ' has'} been received.`,
            duration: 5000,
          });
        }
        
        setOrders(sortedOrders);
        setLastRefresh(new Date());
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(interval);
  }, [isAdmin, isAutoRefresh, orders.length, toast]);

  const checkAdminAccess = async () => {
    try {
      // Check if Supabase is configured first
      if (!isSupabaseConnected()) {
        toast({
          title: "Supabase Not Connected",
          description: "Please connect your Supabase project to access the admin dashboard.",
          variant: "destructive"
        });
        navigate('/diwali');
        return;
      }

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
      // Sort orders by creation date (newest first)
      const sortedOrders = ordersData.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setOrders(sortedOrders);
      setLastRefresh(new Date());
      // Reset new orders count when manually refreshing
      setNewOrdersCount(0);
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

  const handlePaymentStatusUpdate = async (orderId: string, newPaymentStatus: Order['payment_status']) => {
    try {
      await orderService.updatePaymentStatus(orderId, newPaymentStatus);
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, payment_status: newPaymentStatus, updated_at: new Date().toISOString() }
          : order
      ));
      toast({
        title: "Payment Status Updated",
        description: "Payment status has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update payment status.",
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

  const handleManualRefresh = () => {
    loadOrders();
    toast({
      title: "Refreshed",
      description: "Orders list has been updated.",
    });
  };

  const toggleAutoRefresh = () => {
    setIsAutoRefresh(!isAutoRefresh);
    toast({
      title: isAutoRefresh ? "Auto-refresh Disabled" : "Auto-refresh Enabled",
      description: isAutoRefresh 
        ? "Orders will no longer auto-update." 
        : "Orders will auto-update every 10 seconds.",
    });
  };

  // Bulk order selection handlers
  const handleSelectOrder = (orderId: string) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
  };

  const handleBulkAction = async (action: string, value?: string) => {
    if (selectedOrders.length === 0) {
      toast({
        title: "No orders selected",
        description: "Please select orders to perform bulk actions.",
        variant: "destructive",
      });
      return;
    }

    const orderIds = Array.from(selectedOrders);
    
    try {
      switch (action) {
        case 'mark-processing':
          await Promise.all(orderIds.map(id => 
            handleStatusUpdate(id, 'processing')
          ));
          break;
        case 'mark-completed':
          await Promise.all(orderIds.map(id => 
            handleStatusUpdate(id, 'completed')
          ));
          break;
        case 'export-selected':
          exportSelectedOrders(orderIds);
          break;
        case 'send-reminders':
          await sendPaymentReminders(orderIds);
          break;
        default:
          return;
      }
      
      toast({
        title: "Bulk Action Completed",
        description: `Action applied to ${selectedOrders.length} orders successfully.`,
      });
      
      setSelectedOrders([]);
      setBulkAction('');
      loadOrders();
    } catch (error) {
      toast({
        title: "Bulk Action Failed",
        description: "Failed to complete bulk action. Please try again.",
        variant: "destructive"
      });
    }
  };

  const exportSelectedOrders = (orderIds: string[]) => {
    const selectedOrdersData = orders.filter(order => orderIds.includes(order.id));
    const csvContent = generateBulkCSV(selectedOrdersData);
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `selected-orders-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const sendPaymentReminders = async (orderIds: string[]) => {
    const unpaidOrders = orders.filter(order => 
      orderIds.includes(order.id)
    );
    
    // Open WhatsApp messages for each order
    unpaidOrders.forEach(order => {
      const reminderMessage = generatePaymentReminder(order);
      setTimeout(() => handleWhatsAppMessage(order), 500); // Slight delay between opens
    });
    
    toast({
      title: "Payment Reminders Sent",
      description: `WhatsApp reminders opened for ${unpaidOrders.length} orders.`,
    });
  };

  const generatePaymentReminder = (order: Order): string => {
    return `Dear ${order.customer_name},\n\nThis is a friendly reminder regarding your Diwali sweets order:\n\nOrder ID: #${order.id.slice(0, 8).toUpperCase()}\nAmount: ₹${order.total_amount}\nStatus: Payment Pending\n\nPlease complete the payment to confirm your order. You can pay via:\n• UPI: berk@apl\n\nFor any queries, please call: +91 8760101010\n\nThank you,\nSri Nidhi Catering Team`;
  };

  const handlePaymentReminder = (order: Order) => {
    const reminderMessage = generatePaymentReminder(order);
    const whatsappUrl = `https://wa.me/91${order.mobile}?text=${encodeURIComponent(reminderMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Payment Reminder",
      description: `Reminder sent to ${order.customer_name}`,
    });
  };

  const generateBulkCSV = (ordersList: Order[]): string => {
    const headers = [
      'Order ID', 'Customer Name', 'Mobile', 'Address', 'Order Date',
      'Status', 'Items', 'Subtotal', 'GST Amount', 'Total Amount', 
      'Total Weight', 'Special Instructions', 'Days Since Order'
    ];
    
    const csvData = ordersList.map(order => {
      const orderDate = new Date(order.created_at);
      const daysSince = Math.floor((new Date().getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24));
      const itemsList = order.items.map(item => `${item.name}(${item.quantity}kg)`).join('; ');
      
      return [
        order.id.slice(0, 8).toUpperCase(),
        order.customer_name,
        order.mobile,
        order.address.replace(/\n/g, ' '),
        orderDate.toLocaleDateString('en-IN'),
        order.status,
        itemsList,
        order.subtotal,
        order.gst_amount,
        order.total_amount,
        order.total_items,
        order.special_instructions || 'None',
        daysSince
      ];
    });

    return [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
  };

  // WhatsApp messaging functionality
  const getWhatsAppMessage = (order: Order): string => {
    const orderItems = order.items.map(item => 
      `• ${item.name} (${item.quantity}kg × ₹${item.price}) = ₹${item.price * item.quantity}`
    ).join('\n');

    const baseMessage = `*Greetings ${order.customer_name}!*\n\n*Sri Nidhi Catering - Diwali Order Update*\n\n*Order ID:* #${order.id.slice(0, 8).toUpperCase()}\n*Total Amount:* ₹${order.total_amount}\n\n*Your Order Items:*\n${orderItems}\n\n`;

    const statusMessages = {
      received: `*Order Confirmed!*\n\nThank you for choosing Sri Nidhi Catering! Your Diwali sweets order has been received and confirmed.\n\n*Preparation Time:* 2-3 hours\n*Delivery:* Within 4-6 hours\n*Updates:* We'll keep you informed\n\n*Special Diwali Wishes:*\nMay these sweet treats bring joy and prosperity to your celebrations!\n\nFor any questions, please call: +91 8760101010\n\n*Sri Nidhi Catering Team*`,
      
      processing: `*Order in Kitchen!*\n\nGreat news! Our expert chefs have started preparing your delicious Diwali sweets with love and care.\n\n*Status:* Currently being prepared\n*Estimated Time:* 30-45 minutes remaining\n*Quality Check:* Every sweet is handcrafted to perfection\n\n*What's happening now:*\n• Fresh ingredients being used\n• Traditional recipes being followed\n• Quality checks at every step\n\nWe'll notify you once your order is ready for delivery!\n\n*Sri Nidhi Catering Team*`,
      
      completed: `*Order Ready for Delivery!*\n\nFantastic news! Your delicious Diwali sweets are freshly prepared and ready!\n\n*Status:* Packed and ready\n*Delivery:* Out for delivery now\n*ETA:* 15-30 minutes\n\n*Delivery Address:*\n${order.address}\n\nOur delivery partner will contact you shortly. Please keep your phone handy!\n\n*Diwali Special Message:*\nWishing you and your family a very Happy and Prosperous Diwali!\n\n*Sri Nidhi Catering Team*`,
      
      cancelled: `*Order Cancelled*\n\nWe regret to inform you that your order has been cancelled.\n\n*Reason:* Please contact us for details\n*Refund:* Will be processed within 24-48 hours\n*Support:* +91 8760101010\n\nWe sincerely apologize for any inconvenience caused. We hope to serve you better in the future.\n\n*Sri Nidhi Catering Team*`
    };

    return baseMessage + statusMessages[order.status];
  };

  const handleWhatsAppMessage = (order: Order) => {
    const message = getWhatsAppMessage(order);
    const phoneNumber = order.mobile.replace(/\D/g, '');
    const formattedNumber = phoneNumber.startsWith('91') ? phoneNumber : `91${phoneNumber}`;
    
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new window
    const newWindow = window.open(whatsappUrl, '_blank');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      // Fallback if popup is blocked
      window.location.href = whatsappUrl;
    }
    
    toast({
      title: "WhatsApp Message Ready",
      description: `Opening WhatsApp chat with ${order.customer_name}`,
    });
  };

  // Print order functionality
  const handlePrintOrder = (order: Order) => {
    const printContent = generatePrintableOrder(order);
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      
      // Print after content loads
      printWindow.onload = () => {
        printWindow.print();
      };
      
      toast({
        title: "Print Ready",
        description: `Order details for ${order.customer_name} ready to print`,
      });
    } else {
      toast({
        title: "Print Blocked",
        description: "Please allow popups and try again",
        variant: "destructive"
      });
    }
  };

  // Download order functionality
  const handleDownloadOrder = (order: Order) => {
    const orderDetails = generateOrderDetails(order);
    const blob = new Blob([orderDetails], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = `Order-${order.id.slice(0, 8).toUpperCase()}-${order.customer_name.replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: `Order details downloaded for ${order.customer_name}`,
    });
  };

  // Generate printable HTML content
  const generatePrintableOrder = (order: Order): string => {
    const orderItems = order.items.map(item => 
      `<tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}kg</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">₹${item.price}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">₹${item.price * item.quantity}</td>
      </tr>`
    ).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Order Details - Sri Nidhi Catering</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
          .header { background: linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%); padding: 20px; border-radius: 10px; margin-bottom: 20px; }
          .company-name { font-size: 24px; font-weight: bold; color: #92400E; margin: 0; }
          .tagline { color: #D97706; margin: 5px 0 0 0; }
          .order-info { background: #FEF3C7; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
          .customer-info { background: #F3F4F6; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
          .status-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; }
          .status-received { background: #DBEAFE; color: #1E40AF; }
          .status-processing { background: #FEF3C7; color: #92400E; }
          .status-completed { background: #D1FAE5; color: #065F46; }
          .status-cancelled { background: #FEE2E2; color: #991B1B; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th { background: #F59E0B; color: white; padding: 12px; text-align: left; }
          .total-section { background: #FEF3C7; padding: 15px; border-radius: 8px; margin-top: 20px; }
          .total-row { display: flex; justify-content: space-between; margin: 5px 0; }
          .final-total { font-size: 18px; font-weight: bold; color: #92400E; border-top: 2px solid #F59E0B; padding-top: 10px; }
          .footer { text-align: center; margin-top: 30px; color: #6B7280; font-size: 12px; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="company-name">🪔 Sri Nidhi Catering</h1>
          <p class="tagline">Premium Diwali Sweets & Traditional Delicacies</p>
        </div>
        
        <div class="order-info">
          <h2 style="color: #92400E; margin: 0 0 10px 0;">📋 Order Details</h2>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong>Order ID:</strong> #${order.id.slice(0, 8).toUpperCase()}<br>
              <strong>Date:</strong> ${new Date(order.created_at).toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            <span class="status-badge status-${order.status}">${order.status}</span>
          </div>
        </div>
        
        <div class="customer-info">
          <h3 style="color: #92400E; margin: 0 0 10px 0;">👤 Customer Information</h3>
          <strong>Name:</strong> ${order.customer_name}<br>
          <strong>Mobile:</strong> +91 ${order.mobile}<br>
          <strong>Address:</strong><br>
          <div style="background: white; padding: 10px; border-radius: 5px; margin-top: 5px; white-space: pre-line;">${order.address}</div>
          ${order.special_instructions ? `<br><strong>Special Instructions:</strong><br><div style="background: white; padding: 10px; border-radius: 5px; margin-top: 5px;">${order.special_instructions}</div>` : ''}
        </div>
        
        <h3 style="color: #92400E;">🍭 Order Items</h3>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th style="text-align: center;">Quantity</th>
              <th style="text-align: right;">Price/kg</th>
              <th style="text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${orderItems}
          </tbody>
        </table>
        
        <div class="total-section">
          <div class="total-row">
            <span>Subtotal:</span>
            <span>₹${order.subtotal}</span>
          </div>
          <div class="total-row">
            <span>GST (${((order.gst_amount / order.subtotal) * 100).toFixed(1)}%):</span>
            <span>₹${order.gst_amount}</span>
          </div>
          <div class="total-row final-total">
            <span>Final Total:</span>
            <span>₹${order.total_amount}</span>
          </div>
          <div class="total-row" style="margin-top: 10px; color: #6B7280; font-size: 14px;">
            <span>Total Items:</span>
            <span>${order.total_items}kg</span>
          </div>
        </div>
        
        <div class="footer">
          <p>📞 Contact: +91 8760101010 | 🌐 Sri Nidhi Catering</p>
          <p>🪔 Wishing you a Happy and Prosperous Diwali! 🪔</p>
          <p style="margin-top: 20px;">Printed on: ${new Date().toLocaleString('en-IN')}</p>
        </div>
      </body>
      </html>
    `;
  };

  // Generate downloadable text content
  const generateOrderDetails = (order: Order): string => {
    const orderItems = order.items.map(item => 
      `• ${item.name}\n  Quantity: ${item.quantity}kg\n  Price: ₹${item.price}/kg\n  Total: ₹${item.price * item.quantity}\n`
    ).join('\n');

    return `🪔 SRI NIDHI CATERING - ORDER DETAILS 🪔\n${'='.repeat(50)}\n\n📋 ORDER INFORMATION\n${'-'.repeat(25)}\nOrder ID: #${order.id.slice(0, 8).toUpperCase()}\nStatus: ${order.status.toUpperCase()}\nOrder Date: ${new Date(order.created_at).toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}\n\n👤 CUSTOMER DETAILS\n${'-'.repeat(25)}\nName: ${order.customer_name}\nMobile: +91 ${order.mobile}\n\n🏠 DELIVERY ADDRESS\n${'-'.repeat(25)}\n${order.address}\n\n${order.special_instructions ? `📝 SPECIAL INSTRUCTIONS\n${'-'.repeat(25)}\n${order.special_instructions}\n\n` : ''}🍭 ORDER ITEMS\n${'-'.repeat(25)}\n${orderItems}\n💰 BILLING DETAILS\n${'-'.repeat(25)}\nSubtotal: ₹${order.subtotal}\nGST (${((order.gst_amount / order.subtotal) * 100).toFixed(1)}%): ₹${order.gst_amount}\nFinal Total: ₹${order.total_amount}\nTotal Items: ${order.total_items}kg\n\n${'='.repeat(50)}\n📞 Contact: +91 8760101010\n🌐 Sri Nidhi Catering\n🪔 Happy Diwali! 🪔\n\nGenerated on: ${new Date().toLocaleString('en-IN')}\n${'='.repeat(50)}`;
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

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setOrderSourceFilter('all');
    setTimelineFilter('all');
    setCustomStartDate('');
    setCustomEndDate('');
    setShowCustomTime(false);
    toast({
      title: "Filters Cleared",
      description: "All search and filter criteria have been reset.",
    });
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

  const isPaymentOverdue = (order: Order): boolean => {
    const orderDate = new Date(order.created_at);
    const now = new Date();
    const hoursDiff = (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60);
    return hoursDiff > 24 && order.status !== 'completed';
  };

  const isWithinTimeline = (order: Order, timeline: string): boolean => {
    const orderDate = new Date(order.created_at);
    const now = new Date();
    const minutesDiff = (now.getTime() - orderDate.getTime()) / (1000 * 60);
    
    switch(timeline) {
      case '5min':
        return minutesDiff <= 5;
      case '30min':
        return minutesDiff <= 30;
      case '1hr':
        return minutesDiff <= 60;
      case '1day':
        return minutesDiff <= 1440; // 24 hours
      case '1week':
        return minutesDiff <= 10080; // 7 days
      case 'custom':
        if (!customStartDate) return true;
        const startDate = new Date(customStartDate);
        const endDate = customEndDate ? new Date(customEndDate) : now;
        endDate.setHours(23, 59, 59, 999); // End of day
        return orderDate >= startDate && orderDate <= endDate;
      case 'all':
      default:
        return true;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.mobile.includes(searchTerm) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' 
      ? true 
      : statusFilter === 'paid' 
        ? order.payment_status === 'received'
        : order.status === statusFilter;
    
    const matchesTimeline = isWithinTimeline(order, timelineFilter);
    
    const matchesOrderSource = orderSourceFilter === 'all'
      ? true
      : orderSourceFilter === 'online'
        ? order.customer_email && order.customer_email.trim() !== ''
        : !order.customer_email || order.customer_email.trim() === '';
    
    return matchesSearch && matchesStatus && matchesTimeline && matchesOrderSource;
  });

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      received: { label: '📥 New Order', className: 'bg-blue-100 text-blue-800' },
      processing: { label: '⚙️ Preparing', className: 'bg-yellow-100 text-yellow-800' },
      completed: { label: '✅ Delivered', className: 'bg-green-100 text-green-800' },
      cancelled: { label: '❌ Cancelled', className: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getOrderStats = () => {
    const now = new Date();
    const overdueOrders = orders.filter(order => isPaymentOverdue(order));
    const recentOrders = orders.filter(order => !isPaymentOverdue(order));
    const paymentPendingOrders = orders.filter(order => order.payment_status === 'pending');
    const paymentReceivedOrders = orders.filter(order => order.payment_status === 'received');
    
    // Status-based filters
    const newOrders = orders.filter(order => order.status === 'received');
    const preparingOrders = orders.filter(order => order.status === 'processing');
    const completedOrders = orders.filter(order => order.status === 'completed');
    const cancelledOrders = orders.filter(order => order.status === 'cancelled');
    
    // Time-based filters
    const todayOrders = orders.filter(order => {
      const orderDate = new Date(order.created_at);
      return orderDate.toDateString() === now.toDateString();
    });
    
    const last24Hours = orders.filter(order => {
      const orderDate = new Date(order.created_at);
      const hoursDiff = (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60);
      return hoursDiff <= 24;
    });
    
    // Calculate metrics
    const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
    const completedRevenue = completedOrders.reduce((sum, order) => sum + order.total_amount, 0);
    const pendingRevenue = [...newOrders, ...preparingOrders].reduce((sum, order) => sum + order.total_amount, 0);
    const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
    const totalWeight = orders.reduce((sum, order) => sum + order.total_items, 0);
    
    // Completion rate
    const completionRate = orders.length > 0 ? (completedOrders.length / orders.length) * 100 : 0;
    const paymentCollectionRate = orders.length > 0 ? (paymentReceivedOrders.length / orders.length) * 100 : 0;
    
    return {
      // Basic counts
      total: orders.length,
      newOrders: newOrders.length,
      preparing: preparingOrders.length,
      completed: completedOrders.length,
      cancelled: cancelledOrders.length,
      
      // Revenue metrics
      totalRevenue,
      completedRevenue,
      pendingRevenue,
      avgOrderValue,
      todayRevenue: todayOrders.reduce((sum, order) => sum + order.total_amount, 0),
      
      // Payment metrics
      paymentPending: paymentPendingOrders.length,
      paymentPendingAmount: paymentPendingOrders.reduce((sum, order) => sum + order.total_amount, 0),
      paymentReceived: paymentReceivedOrders.length,
      paymentReceivedAmount: paymentReceivedOrders.reduce((sum, order) => sum + order.total_amount, 0),
      paymentCollectionRate,
      
      // Time-based metrics
      todayOrders: todayOrders.length,
      last24Hours: last24Hours.length,
      overdueCount: overdueOrders.length,
      overdueRevenue: overdueOrders.reduce((sum, order) => sum + order.total_amount, 0),
      
      // Operational metrics
      totalWeight,
      avgWeight: orders.length > 0 ? totalWeight / orders.length : 0,
      completionRate,
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
          <div className="flex items-center gap-4">
            <img 
              src="/cateringLogo.png" 
              alt="Sri Nidhi Catering Logo" 
              className="h-12 w-auto logo-hover"
            />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-display text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  🛡️ Master Admin Dashboard
                </h1>
                {newOrdersCount > 0 && (
                  <Badge className="bg-red-500 text-white animate-pulse">
                    {newOrdersCount} New!
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 mt-2">
                <p className="text-gray-600">
                  Full system control & order management
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className={`w-2 h-2 rounded-full ${
                    isAutoRefresh ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                  }`}></div>
                  <span>
                    {isAutoRefresh ? 'Live' : 'Manual'} • Last updated: {lastRefresh.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleManualRefresh}
              variant="outline"
              size="sm"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button
              onClick={toggleAutoRefresh}
              variant="outline"
              size="sm"
              className={`border-green-600 text-green-600 hover:bg-green-600 hover:text-white ${
                isAutoRefresh ? 'bg-green-50' : ''
              }`}
            >
              <Clock className="h-4 w-4 mr-2" />
              {isAutoRefresh ? 'Live ON' : 'Live OFF'}
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Enhanced Insightful Stats Dashboard */}
        <div className="space-y-6 mb-8">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-lg">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Total Orders</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
                    <p className="text-xs text-gray-500 mt-1">Today: {stats.todayOrders}</p>
                  </div>
                  <Package className="h-8 w-8 text-amber-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Total Revenue</p>
                    <p className="text-3xl font-bold text-green-700">₹{stats.totalRevenue.toLocaleString('en-IN')}</p>
                    <p className="text-xs text-green-600 mt-1">Avg: ₹{Math.round(stats.avgOrderValue).toLocaleString('en-IN')}/order</p>
                  </div>
                  <IndianRupee className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Completion Rate</p>
                    <p className="text-3xl font-bold text-blue-700">{stats.completionRate.toFixed(1)}%</p>
                    <p className="text-xs text-blue-600 mt-1">{stats.completed} delivered</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-lg">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Payment Collection</p>
                    <p className="text-3xl font-bold text-purple-700">{stats.paymentCollectionRate.toFixed(1)}%</p>
                    <p className="text-xs text-purple-600 mt-1">₹{stats.paymentReceivedAmount.toLocaleString('en-IN')} collected</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Status Row */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Package className="h-4 w-4" />
              Order Status Breakdown
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-white/90 border-blue-200">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-2">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-blue-700">{stats.newOrders}</p>
                    <p className="text-xs text-gray-600">New Orders</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 border-yellow-200">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 mb-2">
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                    <p className="text-2xl font-bold text-yellow-700">{stats.preparing}</p>
                    <p className="text-xs text-gray-600">Preparing</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 border-green-200">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-2">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-green-700">{stats.completed}</p>
                    <p className="text-xs text-gray-600">Delivered</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 border-red-200">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-2">
                      <XCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <p className="text-2xl font-bold text-red-700">{stats.cancelled}</p>
                    <p className="text-xs text-gray-600">Cancelled</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Payment & Revenue Row */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <IndianRupee className="h-4 w-4" />
              Payment & Revenue Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600">Payment Pending</p>
                      <p className="text-2xl font-bold text-orange-700">{stats.paymentPending}</p>
                      <p className="text-sm font-semibold text-orange-600 mt-1">₹{stats.paymentPendingAmount.toLocaleString('en-IN')}</p>
                    </div>
                    <AlertTriangle className="h-10 w-10 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600">Payment Received</p>
                      <p className="text-2xl font-bold text-emerald-700">{stats.paymentReceived}</p>
                      <p className="text-sm font-semibold text-emerald-600 mt-1">₹{stats.paymentReceivedAmount.toLocaleString('en-IN')}</p>
                    </div>
                    <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Operational Metrics Row */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Operational Metrics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-white/90 border-gray-200">
                <CardContent className="p-4">
                  <p className="text-xs text-gray-600 mb-1">Total Weight</p>
                  <p className="text-xl font-bold text-gray-800">{stats.totalWeight.toFixed(1)}kg</p>
                  <p className="text-xs text-gray-500 mt-1">Avg: {stats.avgWeight.toFixed(1)}kg/order</p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 border-gray-200">
                <CardContent className="p-4">
                  <p className="text-xs text-gray-600 mb-1">Today's Orders</p>
                  <p className="text-xl font-bold text-gray-800">{stats.todayOrders}</p>
                  <p className="text-xs text-gray-500 mt-1">₹{stats.todayRevenue.toLocaleString('en-IN')}</p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 border-gray-200">
                <CardContent className="p-4">
                  <p className="text-xs text-gray-600 mb-1">Last 24 Hours</p>
                  <p className="text-xl font-bold text-gray-800">{stats.last24Hours}</p>
                  <p className="text-xs text-gray-500 mt-1">Recent activity</p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 border-gray-200">
                <CardContent className="p-4">
                  <p className="text-xs text-gray-600 mb-1">Pending Revenue</p>
                  <p className="text-xl font-bold text-gray-800">₹{stats.pendingRevenue.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-gray-500 mt-1">In pipeline</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Orders Management */}
        <Card className="bg-white/90 backdrop-blur-sm border-amber-200 shadow-lg">
          <CardHeader>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="text-2xl text-gray-800 font-bold">
                  Professional Order Management
                </CardTitle>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    onClick={exportToCSV}
                    variant="outline"
                    className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export All
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col lg:flex-row gap-3">
                <div className="flex gap-2 flex-wrap">
                  <Input
                    placeholder="Search orders, names, mobile..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 bg-white/80 border-amber-300 text-gray-800"
                  />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-36 bg-white/80 border-amber-300 text-gray-800">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="received">📥 New Order</SelectItem>
                      <SelectItem value="processing">⚙️ Preparing</SelectItem>
                      <SelectItem value="completed">✅ Delivered</SelectItem>
                      <SelectItem value="cancelled">❌ Cancelled</SelectItem>
                      <SelectItem value="paid">💰 Paid</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={orderSourceFilter} onValueChange={setOrderSourceFilter}>
                    <SelectTrigger className="w-40 bg-white/80 border-amber-300 text-gray-800">
                      <SelectValue placeholder="Order Source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="online">📧 Online</SelectItem>
                      <SelectItem value="whatsapp">💬 WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={timelineFilter} onValueChange={(value) => {
                    setTimelineFilter(value);
                    setShowCustomTime(value === 'custom');
                  }}>
                    <SelectTrigger className="w-44 bg-white/80 border-blue-300 text-gray-800">
                      <SelectValue placeholder="Timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">📅 All Time</SelectItem>
                      <SelectItem value="5min">⚡ Last 5 mins</SelectItem>
                      <SelectItem value="30min">⏱️ Last 30 mins</SelectItem>
                      <SelectItem value="1hr">🕒 Last 1 hour</SelectItem>
                      <SelectItem value="1day">🌅 Last 1 day</SelectItem>
                      <SelectItem value="1week">📆 Last 1 week</SelectItem>
                      <SelectItem value="custom">🔧 Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                  {showCustomTime && (
                    <div className="flex gap-2 items-center">
                      <Input
                        type="date"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                        className="w-40 h-9 bg-white/80 border-blue-300 text-gray-800"
                        placeholder="Start date"
                      />
                      <span className="text-gray-500">to</span>
                      <Input
                        type="date"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                        className="w-40 h-9 bg-white/80 border-blue-300 text-gray-800"
                        placeholder="End date"
                      />
                    </div>
                  )}
                  <Button
                    onClick={handleClearFilters}
                    variant="ghost"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Clear Filters
                  </Button>
                </div>
                
                {selectedOrders.length > 0 && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                    <span className="text-sm font-medium text-blue-700">
                      {selectedOrders.length} selected
                    </span>
                    <Select value={bulkAction} onValueChange={setBulkAction}>
                      <SelectTrigger className="w-40 h-8 bg-white border-blue-300 text-gray-800">
                        <SelectValue placeholder="Bulk Action" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mark-processing">Mark Processing</SelectItem>
                        <SelectItem value="mark-completed">Mark Completed</SelectItem>
                        <SelectItem value="send-reminders">Send Reminders</SelectItem>
                        <SelectItem value="export-selected">Export Selected</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={() => handleBulkAction(bulkAction)}
                      disabled={!bulkAction}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Apply
                    </Button>
                  </div>
                )}
              </div>
              
              {filteredOrders.length > 0 && (
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSelectAll}
                    className="p-0 h-auto font-normal"
                  >
                    {selectedOrders.length === filteredOrders.length ? (
                      <CheckSquare className="h-4 w-4 mr-2" />
                    ) : (
                      <Square className="h-4 w-4 mr-2" />
                    )}
                    Select All ({filteredOrders.length})
                  </Button>
                  <span>•</span>
                  <span>Showing {filteredOrders.length} of {orders.length} orders</span>
                </div>
              )}
            </div>
          </CardHeader>
          
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading orders...</p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No orders found.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order, index) => {
                  const isNewOrder = index < newOrdersCount;
                  const isOverdue = isOrderOverdue(order);
                  return (
                  <div
                    key={order.id}
                    className={`bg-white/80 backdrop-blur-sm border rounded-xl p-4 hover:shadow-lg transition-all duration-300 ${
                      isNewOrder 
                        ? 'border-green-400 shadow-green-100 shadow-lg animate-pulse' 
                        : isOverdue 
                        ? 'border-red-300 shadow-red-100' 
                        : selectedOrders.includes(order.id)
                        ? 'border-blue-400 shadow-blue-100'
                        : 'border-amber-200'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedOrders([...selectedOrders, order.id]);
                            } else {
                              setSelectedOrders(selectedOrders.filter(id => id !== order.id));
                            }
                          }}
                          className="mt-1 h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-800">
                                  {order.customer_name}
                                </h3>
                                {isOverdue && (
                                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                                    OVERDUE
                                  </span>
                                )}
                                {hasPaymentIssue(order) && (
                                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                                    PAYMENT DUE
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">
                                Order #{order.id.slice(0, 8).toUpperCase()}
                              </p>
                            </div>
                            {getStatusBadge(order.status)}
                          </div>
                        
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-700">
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              +91 {order.mobile}
                            </div>
                            <div className="flex items-center gap-1">
                              <Package className="h-3 w-3" />
                              {order.total_items}kg items
                            </div>
                            <div className="flex items-center gap-1">
                              <IndianRupee className="h-3 w-3" />
                              ₹{order.total_amount}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-xs text-gray-500">
                              {new Date(order.created_at).toLocaleString('en-IN')}
                            </p>
                            {isOverdue && (
                              <p className="text-xs text-red-600 font-medium">
                                {Math.ceil((Date.now() - new Date(order.created_at).getTime()) / (1000 * 60 * 60 * 24))} days old
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 flex-wrap">
                        <Select
                          value={order.status}
                          onValueChange={(value: Order['status']) => 
                            handleStatusUpdate(order.id, value)
                          }
                        >
                          <SelectTrigger className="w-32 h-8 text-xs border-amber-300 bg-white/80 text-gray-700">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="received">📥 New Order</SelectItem>
                            <SelectItem value="processing">⚙️ Preparing</SelectItem>
                            <SelectItem value="completed">✅ Delivered</SelectItem>
                            <SelectItem value="cancelled">❌ Cancelled</SelectItem>
                          </SelectContent>
                        </Select>

                        <Select
                          value={order.payment_status}
                          onValueChange={(value: Order['payment_status']) => 
                            handlePaymentStatusUpdate(order.id, value)
                          }
                        >
                          <SelectTrigger className={`w-32 h-8 text-xs bg-white/80 text-gray-700 ${
                            order.payment_status === 'pending' 
                              ? 'border-orange-300' 
                              : 'border-emerald-300'
                          }`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">� Pending</SelectItem>
                            <SelectItem value="received">💵 Paid</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button
                          onClick={() => handleWhatsAppMessage(order)}
                          variant="outline"
                          size="sm"
                          className="h-8 bg-green-50 border-green-300 text-green-700 hover:bg-green-100 hover:border-green-400"
                          title={`Send WhatsApp message to ${order.customer_name}`}
                        >
                          <MessageCircle className="h-3 w-3" />
                        </Button>
                        
                        {(order.status === 'received' || order.status === 'processing') && (
                          <Button
                            onClick={() => handlePaymentReminder(order)}
                            variant="outline"
                            size="sm"
                            className="h-8 bg-orange-50 border-orange-300 text-orange-700 hover:bg-orange-100 hover:border-orange-400"
                            title={`Send payment reminder to ${order.customer_name}`}
                          >
                            <Bell className="h-3 w-3" />
                          </Button>
                        )}
                        
                        <Button
                          onClick={() => handlePrintOrder(order)}
                          variant="outline"
                          size="sm"
                          className="h-8 bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100 hover:border-blue-400"
                          title={`Print order details for ${order.customer_name}`}
                        >
                          <Printer className="h-3 w-3" />
                        </Button>
                        
                        <Button
                          onClick={() => handleDownloadOrder(order)}
                          variant="outline"
                          size="sm"
                          className="h-8 bg-purple-50 border-purple-300 text-purple-700 hover:bg-purple-100 hover:border-purple-400"
                          title={`Download order details for ${order.customer_name}`}
                        >
                          <FileDown className="h-3 w-3" />
                        </Button>
                        
                        <Button
                          onClick={() => handleDeleteOrder(order.id)}
                          variant="outline"
                          size="sm"
                          className="h-8 bg-red-50 border-red-300 text-red-700 hover:bg-red-100 hover:border-red-400"
                          title={`Delete order for ${order.customer_name}`}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MasterAdminDashboard;