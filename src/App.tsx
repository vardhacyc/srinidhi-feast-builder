
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import Index from "./pages/Index";
import DiwaliIndex from "./pages/DiwaliIndex";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/diwali" element={<DiwaliIndex />} />
          <Route path="/catering" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* Floating WhatsApp Button - Always visible */}
        <WhatsAppFloat 
          phoneNumber="918760101010"
          message="Hi! I'm interested in your Diwali sweets. Could you please provide more information?"
        />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
