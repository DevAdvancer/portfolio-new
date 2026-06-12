import { useState, useEffect, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Achievements from "./pages/Achievements";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import PageTransition from "./components/PageTransition";
import Chatbot from "./components/Chatbot";
import GlobalBackground from "./components/GlobalBackground";
import ClickSparkles from "./components/ClickSparkles";
import CustomCursor from "./components/CustomCursor";
import CommandPalette from "./components/CommandPalette";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <PageTransition key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageTransition>
  );
};

const App = () => {
  const [commandOpen, setCommandOpen] = useState(false);
  const openCommand = useCallback(() => setCommandOpen(true), []);
  const closeCommand = useCallback(() => setCommandOpen(false), []);

  // Listen for the global "open command palette" event fired by Navigation
  useEffect(() => {
    const handler = () => setCommandOpen(true);
    window.addEventListener("abhirup:open-command", handler);
    return () => window.removeEventListener("abhirup:open-command", handler);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <GlobalBackground />
        <ClickSparkles />
        <CustomCursor />
        <div className="relative z-10">
          <Chatbot />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
          <CommandPalette open={commandOpen} onClose={closeCommand} />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
