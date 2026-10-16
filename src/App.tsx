import { lazy, Suspense, useState, useEffect, useCallback, type ComponentType } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, StaticRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import PageTransition from "@/components/PageTransition";
import { ExplorationProvider } from "@/components/ExplorationProvider";
import RouteProgress from "@/components/RouteProgress";
import SkipLink from "@/components/SkipLink";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";

const CommandPalette = lazy(() => import("@/components/CommandPalette"));
const Chatbot = lazy(() => import("@/components/Chatbot"));

// Lazy-load route components for code splitting
const Index = lazy(() => import("./pages/Index"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Achievements = lazy(() => import("./pages/Achievements"));
const Contact = lazy(() => import("./pages/Contact"));
const ProjectIndex = lazy(() => import("./pages/ProjectIndex"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
export interface PageComponents {
  Index: ComponentType; Blog: ComponentType; BlogPost: ComponentType;
  ProjectIndex: ComponentType; ProjectPage: ComponentType;
  Achievements: ComponentType; Contact: ComponentType; NotFound: ComponentType;
  Chatbot: ComponentType; CommandPalette: ComponentType<{ open: boolean; onClose: () => void }>;
}
const defaultPages: PageComponents = { Index, Blog, BlogPost, ProjectIndex, ProjectPage, Achievements, Contact, NotFound, Chatbot, CommandPalette };

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

const AnimatedRoutes = ({ pages }: { pages: PageComponents }) => {
  const location = useLocation();
  const { Index, Blog, BlogPost, ProjectIndex, ProjectPage, Achievements, Contact, NotFound } = pages;

  return (
    <>
      <SEO />
      <StructuredData />
      <Suspense fallback={<PageLoader />}>
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/projects" element={<ProjectIndex />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </Suspense>
    </>
  );
};

const App = ({ url, pages = defaultPages }: { url?: string; pages?: PageComponents } = {}) => {
  const { Chatbot, CommandPalette } = pages;
  const [commandOpen, setCommandOpen] = useState(false);
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
          <ExplorationProvider>
          <div className="relative z-10">
            <Suspense fallback={null}><Chatbot /></Suspense>
            <Toaster />
            <Sonner />
            {url ? <StaticRouter location={url}><AnimatedRoutes pages={pages} /></StaticRouter> :
              <BrowserRouter><RouteProgress /><AnimatedRoutes pages={pages} /></BrowserRouter>}
            <Suspense fallback={null}>
              <CommandPalette open={commandOpen} onClose={closeCommand} />
            </Suspense>
          </div>
          </ExplorationProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
