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
import AboutPage from "./pages/AboutPage";
import ExperiencePage from "./pages/ExperiencePage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import AchievementPage from "./pages/AchievementPage";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "@/components/theme-provider";

// Admin imports
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminGuard from "./pages/admin/AdminGuard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminAchievements from "./pages/admin/AdminAchievements";
import AdminExperience from "./pages/admin/AdminExperience";
import AdminCompetitions from "./pages/admin/AdminCompetitions";
import AdminEducation from "./pages/admin/AdminEducation";
import AdminGuestbook from "./pages/admin/AdminGuestbook";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminCV from "./pages/admin/AdminCV";
import "./pages/admin/admin.css";
import { ADMIN_PATH } from "./lib/supabase";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <ErrorBoundary>
      <NetworkDetector>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
            </BrowserRouter>
            <Analytics />
          </TooltipProvider>
        </QueryClientProvider>
      </NetworkDetector>
    </ErrorBoundary>
  </ThemeProvider>
);

export default App;
