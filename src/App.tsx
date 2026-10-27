import { useEffect, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Inspiration from "./pages/Inspiration.tsx";
import Cases from "./pages/Cases.tsx";
import About from "./pages/About.tsx";
import Partners from "./pages/Partners.tsx";
import Connect from "./pages/Connect.tsx";
import Guides from "./pages/Guides.tsx";
import GuideArticle from "./pages/GuideArticle.tsx";
import NotFound from "./pages/NotFound.tsx";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/inspiration" element={<Inspiration />} />
    <Route path="/kundcase" element={<Cases />} />
    <Route path="/om-oss" element={<About />} />
    <Route path="/partners" element={<Partners />} />
    <Route path="/anslut" element={<Connect />} />
    <Route path="/guider" element={<Guides />} />
    <Route path="/guider/:slug" element={<GuideArticle />} />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

interface AppProvidersProps {
  queryClient: QueryClient;
  helmetContext?: object;
  children: ReactNode;
}

// Shared by the browser entry (main.tsx) and the build-time prerender (entry-server.tsx)
export const AppProviders = ({ queryClient, helmetContext, children }: AppProvidersProps) => (
  <HelmetProvider context={helmetContext}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

const App = ({ queryClient }: { queryClient: QueryClient }) => (
  <AppProviders queryClient={queryClient}>
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  </AppProviders>
);

export default App;
