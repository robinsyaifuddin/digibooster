
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { HomeContentProvider } from "./contexts/HomeContentContext";
import { SplashScreenProvider } from "./contexts/SplashScreenContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import React from 'react';

// Pages
import Beranda from "./pages/Beranda";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import Blog from "./pages/Blog";
import JasaDigital from "./pages/JasaDigital";
import MotivasiEdukasi from "./pages/MotivasiEdukasi";
import SharingKonsultasi from "./pages/SharingKonsultasi";
import Kelas from "./pages/Kelas";
import Portofolio from "./pages/Portofolio";
import PortfolioDetail from "./pages/PortfolioDetail";
import Tentang from "./pages/Tentang";
import { BlogDetail } from "./pages";

// Layout component to wrap content with Navbar and Footer
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-dark">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

// Layout without navbar and footer for auth pages
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-dark">
      {children}
    </div>
  );
};

// Create QueryClient instance inside the component
function App() {
  // Create a new QueryClient instance inside the component body
  const queryClient = React.useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  }), []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <HomeContentProvider>
            <SplashScreenProvider>
              <Toaster />
              <Sonner />
              <Routes>
                {/* Pages with Navbar and Footer */}
                <Route
                  path="/"
                  element={
                    <Layout>
                      <Beranda />
                    </Layout>
                  }
                />
                
                <Route
                  path="/blog"
                  element={
                    <Layout>
                      <Blog />
                    </Layout>
                  }
                />
                
                <Route
                  path="/blog/:id"
                  element={
                    <Layout>
                      <BlogDetail />
                    </Layout>
                  }
                />
                
                <Route
                  path="/program/jasa-digital"
                  element={
                    <Layout>
                      <JasaDigital />
                    </Layout>
                  }
                />
                
                <Route
                  path="/program/motivasi-edukasi"
                  element={
                    <Layout>
                      <MotivasiEdukasi />
                    </Layout>
                  }
                />
                
                <Route
                  path="/program/sharing-konsultasi"
                  element={
                    <Layout>
                      <SharingKonsultasi />
                    </Layout>
                  }
                />
                
                <Route
                  path="/program/kelas"
                  element={
                    <Layout>
                      <Kelas />
                    </Layout>
                  }
                />
                
                <Route
                  path="/portofolio"
                  element={
                    <Layout>
                      <Portofolio />
                    </Layout>
                  }
                />
                
                <Route
                  path="/portofolio/:id"
                  element={
                    <Layout>
                      <PortfolioDetail />
                    </Layout>
                  }
                />
                
                <Route
                  path="/tentang"
                  element={
                    <Layout>
                      <Tentang />
                    </Layout>
                  }
                />
                
                <Route
                  path="/login"
                  element={
                    <AuthLayout>
                      <Login />
                    </AuthLayout>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <AuthLayout>
                      <Register />
                    </AuthLayout>
                  }
                />
                
                <Route
                  path="/admin/*"
                  element={
                    <AuthLayout>
                      <AdminDashboard />
                    </AuthLayout>
                  }
                />
                
                <Route
                  path="*"
                  element={
                    <Layout>
                      <NotFound />
                    </Layout>
                  }
                />
              </Routes>
            </SplashScreenProvider>
          </HomeContentProvider>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
