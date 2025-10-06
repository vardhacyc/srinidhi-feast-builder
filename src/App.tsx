
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import Index from "./pages/Index";
import DiwaliIndex from "./pages/DiwaliIndex";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import MasterAdminDashboard from "./pages/MasterAdminDashboard";
import MasterAdminLogin from "./pages/MasterAdminLogin";
import WhatsAppOrdersDashboard from "./pages/WhatsAppOrdersDashboard";
import KovaiIndex from "./pages/KovaiIndex";
import KovaiAdminLogin from "./pages/KovaiAdminLogin";
import KovaiAdminDashboard from "./pages/KovaiAdminDashboard";
import KovaiWhatsAppOrdersDashboard from "./pages/KovaiWhatsAppOrdersDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin') || 
                      location.pathname.startsWith('/master-admin') || 
                      location.pathname.startsWith('/kovai/admin');

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/diwali" element={<DiwaliIndex />} />
        <Route path="/catering" element={<Index />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/master-admin-login" element={<MasterAdminLogin />} />
        <Route path="/master-admin" element={<MasterAdminDashboard />} />
        <Route path="/whatsapp-orders" element={<WhatsAppOrdersDashboard />} />
        
        {/* Kovai Caterers Routes */}
        <Route path="/kovai" element={<KovaiIndex />} />
        <Route path="/kovai/admin-login" element={<KovaiAdminLogin />} />
        <Route path="/kovai/admin" element={<KovaiAdminDashboard />} />
        <Route path="/kovai/whatsapp-orders" element={<KovaiWhatsAppOrdersDashboard />} />
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* Floating WhatsApp Button - Hidden on admin pages */}
      {!isAdminPage && (
        <WhatsAppFloat 
          phoneNumber="918760101010"
          message="Hi! I'm interested in your Diwali sweets. Could you please provide more information?"
        />
      )}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
