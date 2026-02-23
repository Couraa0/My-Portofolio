import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import ErrorBoundary from "@/components/ErrorBoundary";
import NetworkDetector from "@/components/NetworkDetector";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
// import ServerError from "./pages/ServerError";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <NetworkDetector>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* Preview route — hapus setelah selesai testing */}
              {/* <Route path="/server-error" element={<ServerError />} /> */}
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Analytics />
        </TooltipProvider>
      </QueryClientProvider>
    </NetworkDetector>
  </ErrorBoundary>
);

export default App;
