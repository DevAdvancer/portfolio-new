import { lazy, Suspense, useState, useEffect, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import PageTransition from "@/components/PageTransition";
import GlobalBackground from "@/components/GlobalBackground";
import RouteProgress from "@/components/RouteProgress";
import SkipLink from "@/components/SkipLink";
import SEO from "@/components/SEO";
import { SEO_CONFIG } from "@/data/seoConfig";

const Chatbot = lazy(() => import("@/components/Chatbot"));
const CommandPalette = lazy(() => import("@/components/CommandPalette"));

// Lazy-load route components for code splitting
const Index = lazy(() => import("./pages/Index"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Achievements = lazy(() => import("./pages/Achievements"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div
    role="status"
    aria-label="Loading page"
    className="flex min-h-[60vh] items-center justify-center"
  >
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-muted border-t-foreground" />
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  const seo = SEO_CONFIG[location.pathname] ?? SEO_CONFIG["/"];

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        type={seo.type}
        url={`https://www.abhirupkumar.in${location.pathname}`}
      />
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
    </>
  );
};

const App = () => {
  const [commandOpen, setCommandOpen] = useState(false);
  const openCommand = useCallback(() => setCommandOpen(true), []);
  const closeCommand = useCallback(() => setCommandOpen(false), []);

  useEffect(() => {
    const handler = () => setCommandOpen(true);
    window.addEventListener("abhirup:open-command", handler);
    return () => window.removeEventListener("abhirup:open-command", handler);
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SkipLink />
          <GlobalBackground />
          <div className="relative z-10">
            <Suspense fallback={null}>
              <Chatbot />
            </Suspense>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <RouteProgress />
              <AnimatedRoutes />
            </BrowserRouter>
            <Suspense fallback={null}>
              <CommandPalette open={commandOpen} onClose={closeCommand} />
            </Suspense>
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
