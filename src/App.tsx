
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";

// Add providers
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { HomeContentProvider } from "./contexts/HomeContentContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { PageTransition } from "./components/animation/PageTransition";

// Import directly instead of using dynamic imports for core pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Tentang from "./pages/Tentang";
import Portofolio from "./pages/Portofolio";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import JasaDigital from "./pages/JasaDigital";
import MotivasiEdukasi from "./pages/MotivasiEdukasi";
import SharingKonsultasi from "./pages/SharingKonsultasi";
import Kelas from "./pages/Kelas";
import PortfolioDetail from "./pages/PortfolioDetail";
import OrderForm from "./pages/OrderForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Kontak from "./pages/Kontak";
import Beranda from "./pages/Beranda";

// Use lazy loading only for admin dashboard
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const FallbackComponent = () => (
  <div className="min-h-[70vh] flex items-center justify-center">
    <div className="animate-pulse text-primary text-xl font-medium">Loading...</div>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LanguageProvider>
            <BrowserRouter>
              <AuthProvider>
                <HomeContentProvider>
                  <Navbar />
                  <div className="pt-16">
                    <PageTransition>
                      <Routes>
                        <Route path="/" element={<Beranda />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/services/:id" element={<ServiceDetails />} />
                        <Route path="/tentang" element={<Tentang />} />
                        <Route path="/portofolio" element={<Portofolio />} />
                        <Route path="/portofolio/:id" element={<PortfolioDetail />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:id" element={<BlogDetail />} />
                        <Route path="/program/jasa-digital" element={<JasaDigital />} />
                        <Route path="/program/motivasi-edukasi" element={<MotivasiEdukasi />} />
                        <Route path="/program/sharing-konsultasi" element={<SharingKonsultasi />} />
                        <Route path="/program/kelas" element={<Kelas />} />
                        <Route path="/order-form" element={<OrderForm />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/kontak" element={<Kontak />} />
                        <Route path="/404" element={<NotFound />} />
                        <Route path="*" element={<Navigate to="/404" replace />} />
                        <Route 
                          path="/admin/*" 
                          element={
                            <Suspense fallback={<FallbackComponent />}>
                              <AdminDashboard />
                            </Suspense>
                          } 
                        />
                      </Routes>
                    </PageTransition>
                  </div>
                  <Footer />
                </HomeContentProvider>
              </AuthProvider>
            </BrowserRouter>
          </LanguageProvider>
        </ThemeProvider>
        <Toaster position="top-center" />
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
