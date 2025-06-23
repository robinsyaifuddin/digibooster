
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { HomeContentProvider } from '@/contexts/HomeContentContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatBot from '@/components/chatbot/ChatBot';

// Pages
import Home from '@/pages/Home';
import Tentang from '@/pages/Tentang';
import Services from '@/pages/Services';
import ServiceDetails from '@/pages/ServiceDetails';
import Portofolio from '@/pages/Portofolio';
import PortfolioDetail from '@/pages/PortfolioDetail';
import Blog from '@/pages/Blog';
import BlogDetail from '@/pages/BlogDetail';
import Kontak from '@/pages/Kontak';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import UserDashboard from '@/pages/UserDashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import NotFound from '@/pages/NotFound';
import OrderForm from '@/pages/OrderForm';

// Program Pages
import JasaDigital from '@/pages/JasaDigital';
import ServiceDetailPage from '@/pages/ServiceDetailPage';
import BundleUmkmDetail from '@/pages/BundleUmkmDetail';
import PelatihanDigital from '@/pages/PelatihanDigital';
import MotivasiEdukasi from '@/pages/MotivasiEdukasi';
import Kelas from '@/pages/Kelas';
import ClassDetail from '@/pages/ClassDetail';

import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <HomeContentProvider>
              <Router>
                <div className="min-h-screen bg-background text-foreground">
                  <Navbar />
                  <main>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/tentang" element={<Tentang />} />
                      <Route path="/layanan" element={<Services />} />
                      <Route path="/layanan/:slug" element={<ServiceDetails />} />
                      <Route path="/portofolio" element={<Portofolio />} />
                      <Route path="/portofolio/:id" element={<PortfolioDetail />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:slug" element={<BlogDetail />} />
                      <Route path="/kontak" element={<Kontak />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/dashboard" element={<UserDashboard />} />
                      <Route path="/admin" element={<AdminDashboard />} />
                      <Route path="/order-form" element={<OrderForm />} />
                      
                      {/* Program Routes */}
                      <Route path="/program/jasa-digital" element={<JasaDigital />} />
                      <Route path="/layanan/paket-digitalisasi-umkm-lembaga" element={<BundleUmkmDetail />} />
                      <Route path="/layanan/:slug" element={<ServiceDetailPage />} />
                      <Route path="/program/pelatihan-digital" element={<PelatihanDigital />} />
                      <Route path="/program/motivasi-edukasi" element={<MotivasiEdukasi />} />
                      <Route path="/program/kelas" element={<Kelas />} />
                      <Route path="/kelas/:id" element={<ClassDetail />} />
                      
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                  <ChatBot />
                  <Toaster />
                </div>
              </Router>
            </HomeContentProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
