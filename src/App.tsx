import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import ErrorBoundary from "@/components/ErrorBoundary";
import NetworkDetector from "@/components/NetworkDetector";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "@/components/theme-provider";

import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initGA, trackPageView } from "@/lib/ga";
import { logActivity } from "@/lib/logger";
import { ADMIN_PATH } from "./lib/supabase";
import "./pages/admin/admin.css";

// Lazy-loaded public pages
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ExperiencePage = lazy(() => import("./pages/ExperiencePage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AchievementPage = lazy(() => import("./pages/AchievementPage"));

// Lazy-loaded admin pages
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminGuard = lazy(() => import("./pages/admin/AdminGuard"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));
const AdminLogs = lazy(() => import("./pages/admin/AdminLogs"));
const AdminProjects = lazy(() => import("./pages/admin/AdminProjects"));
const AdminAchievements = lazy(() => import("./pages/admin/AdminAchievements"));
const AdminExperience = lazy(() => import("./pages/admin/AdminExperience"));
const AdminCompetitions = lazy(() => import("./pages/admin/AdminCompetitions"));
const AdminEducation = lazy(() => import("./pages/admin/AdminEducation"));
const AdminGuestbook = lazy(() => import("./pages/admin/AdminGuestbook"));
const AdminCategories = lazy(() => import("./pages/admin/AdminCategories"));
const AdminCV = lazy(() => import("./pages/admin/AdminCV"));

// Lightweight loading spinner for route transitions
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin" />
      <span className="text-xs text-muted-foreground font-medium">Loading...</span>
    </div>
  </div>
);

const queryClient = new QueryClient();

// PageTracker component to capture route pageviews & activity log
const PageTracker = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname);

    // Only log public pageviews to activity logger
    if (!location.pathname.startsWith(`/${ADMIN_PATH}`)) {
      logActivity({
        category: 'VISITOR',
        level: 'INFO',
        action: `Navigasi ke ${location.pathname}`,
        page_url: location.pathname,
      });
    }
  }, [location.pathname]);

  return <>{children}</>;
};

const App = () => (
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <ErrorBoundary>
      <NetworkDetector>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <PageTracker>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route element={<Layout />}>
                      <Route path="/" element={<Index />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/experience" element={<ExperiencePage />} />
                      <Route path="/projects" element={<ProjectsPage />} />
                      <Route path="/achievements" element={<AchievementPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                    </Route>

                    {/* Admin Routes */}
                    <Route path={`/${ADMIN_PATH}`} element={<AdminLogin />} />
                    <Route
                      path={`/${ADMIN_PATH}`}
                      element={
                        <AdminGuard>
                          <AdminLayout />
                        </AdminGuard>
                      }
                    >
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="analytics" element={<AdminAnalytics />} />
                      <Route path="logs" element={<AdminLogs />} />
                      <Route path="categories" element={<AdminCategories />} />
                      <Route path="projects" element={<AdminProjects />} />
                      <Route path="achievements" element={<AdminAchievements />} />
                      <Route path="experience" element={<AdminExperience />} />
                      <Route path="competitions" element={<AdminCompetitions />} />
                      <Route path="education" element={<AdminEducation />} />
                      <Route path="guestbook" element={<AdminGuestbook />} />
                      <Route path="cv" element={<AdminCV />} />
                    </Route>

                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </PageTracker>
            </BrowserRouter>
            <Analytics />
          </TooltipProvider>
        </QueryClientProvider>
      </NetworkDetector>
    </ErrorBoundary>
  </ThemeProvider>
);

export default App;
