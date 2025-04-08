
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
import { SplashScreenProvider } from "./contexts/SplashScreenContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/common/LoadingScreen";
import SplashScreen from "./components/SplashScreen";

// Root pages
const Beranda = lazy(() => import("./pages/Beranda"));
const Tentang = lazy(() => import("./pages/Tentang"));
const Portofolio = lazy(() => import("./pages/Portofolio"));
const Blog = lazy(() => import("./pages/Blog"));
const JasaDigital = lazy(() => import("./pages/JasaDigital"));
const MotivasiEdukasi = lazy(() => import("./pages/MotivasiEdukasi"));
const SharingKonsultasi = lazy(() => import("./pages/SharingKonsultasi"));
const Kelas = lazy(() => import("./pages/Kelas"));
const PortfolioDetail = lazy(() => import("./pages/PortfolioDetail"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LanguageProvider>
            <BrowserRouter>
              <AuthProvider>
                <HomeContentProvider>
                  <SplashScreenProvider>
                    <Navbar />
                    <Suspense fallback={<LoadingScreen />}>
                      <div className="pt-16">
                        <Routes>
                          <Route path="/" element={<Beranda />} />
                          <Route path="/tentang" element={<Tentang />} />
                          <Route path="/portofolio" element={<Portofolio />} />
                          <Route path="/portofolio/:id" element={<PortfolioDetail />} />
                          <Route path="/blog" element={<Blog />} />
                          <Route path="/program/jasa-digital" element={<JasaDigital />} />
                          <Route path="/program/motivasi-edukasi" element={<MotivasiEdukasi />} />
                          <Route path="/program/sharing-konsultasi" element={<SharingKonsultasi />} />
                          <Route path="/program/kelas" element={<Kelas />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/register" element={<Register />} />
                          <Route path="/admin/*" element={<AdminDashboard />} />
                          <Route path="/404" element={<NotFound />} />
                          <Route path="*" element={<Navigate to="/404" replace />} />
                        </Routes>
                      </div>
                      <Footer />
                      <SplashScreen />
                    </Suspense>
                  </SplashScreenProvider>
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
