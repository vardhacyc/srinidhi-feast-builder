import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Lazy load WhatsApp Float to reduce initial bundle
const WhatsAppFloat = lazy(() => import("@/components/ui/WhatsAppFloat"));

// Lazy load all page components for code splitting
const Index = lazy(() => import("./pages/Index"));
const DiwaliIndex = lazy(() => import("./pages/DiwaliIndex"));
const Xmas = lazy(() => import("./pages/Xmas"));
const MenuBuilder = lazy(() => import("./pages/MenuBuilder"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const MasterAdminDashboard = lazy(() => import("./pages/MasterAdminDashboard"));
const MasterAdminLogin = lazy(() => import("./pages/MasterAdminLogin"));
const WhatsAppOrdersDashboard = lazy(
  () => import("./pages/WhatsAppOrdersDashboard"),
);
const Quotation = lazy(() => import("./pages/Quotation"));
const LunchPackages = lazy(() => import("./pages/LunchPackages"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-black">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-2 border-[#C9A227] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-white/60 text-sm">Loading...</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isAdminPage =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/master-admin");

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/diwali" element={<DiwaliIndex />} />
        <Route path="/xmas" element={<Xmas />} />
        <Route path="/catering" element={<Index />} />
        <Route path="/menu-builder" element={<MenuBuilder />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/master-admin-login" element={<MasterAdminLogin />} />
        <Route path="/master-admin" element={<MasterAdminDashboard />} />
        <Route path="/whatsapp-orders" element={<WhatsAppOrdersDashboard />} />
        <Route path="/quotation" element={<Quotation />} />
        <Route path="/lunch-packages" element={<LunchPackages />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* Floating WhatsApp Button - Hidden on admin pages and custom pages with their own buttons */}
      {!isAdminPage && !location.pathname.startsWith("/xmas") && (
        <WhatsAppFloat
          phoneNumber="918760101010"
          message="Hi! I'm interested in your Diwali sweets. Could you please provide more information?"
        />
      )}
    </Suspense>
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
