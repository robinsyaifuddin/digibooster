
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Kontak from './pages/Kontak';
import MotivasiEdukasi from './pages/MotivasiEdukasi';
import PelatihanDigital from './pages/PelatihanDigital';
import Portofolio from './pages/Portofolio';
import PortfolioDetail from './pages/PortfolioDetail';
import NotFound from './pages/NotFound';
import Tentang from './pages/Tentang';
import Beranda from './pages/Beranda';
import JasaDigital from './pages/JasaDigital';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import ServiceDetailPage from './pages/ServiceDetailPage';
import Kelas from './pages/Kelas';
import OrderForm from './pages/OrderForm';

// Theme context for light/dark mode
import { ThemeProvider } from './contexts/ThemeContext';

// Language context for multi-language support
import { LanguageProvider } from './contexts/LanguageContext';

// Auth context for user authentication
import { AuthProvider } from './contexts/AuthContext';

// Home content context for dynamic content
import { HomeContentProvider } from './contexts/HomeContentContext';

// Toast provider for notifications
import { Toaster } from '@/components/ui/toaster';

// Import PageTransition component
import { PageTransition } from './components/animation/PageTransition';

// Layout component to handle navigation visibility
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const path = location.pathname;
  
  // Hide Navbar and Footer on dashboard and admin pages
  const isDashboardPage = path === '/dashboard' || path.startsWith('/admin');
  
  return (
    <div className="App bg-black text-white min-h-screen flex flex-col">
      {!isDashboardPage && <Navbar />}
      <main className="flex-grow">
        <PageTransition>{children}</PageTransition>
      </main>
      {!isDashboardPage && <Footer />}
      <Toaster />
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <AuthProvider>
            <HomeContentProvider>
              <AppLayout>
                <Routes>
                  {/* Main routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/beranda" element={<Beranda />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogDetail />} />
                  <Route path="/kontak" element={<Kontak />} />
                  <Route path="/motivasi-edukasi" element={<MotivasiEdukasi />} />
                  <Route path="/pelatihan-digital" element={<PelatihanDigital />} />
                  <Route path="/sharing-konsultasi" element={<PelatihanDigital />} />
                  <Route path="/shortclass-bootcamp" element={<PelatihanDigital />} />
                  <Route path="/portofolio" element={<Portofolio />} />
                  <Route path="/portofolio/:id" element={<PortfolioDetail />} />
                  <Route path="/tentang" element={<Tentang />} />
                  
                  {/* Fix for Jasa Digital routes */}
                  <Route path="/jasa-digital" element={<JasaDigital />} />
                  <Route path="/program/jasa-digital" element={<JasaDigital />} />
                  
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:id" element={<ServiceDetails />} />
                  <Route path="/layanan/:slug" element={<ServiceDetailPage />} />
                  <Route path="/kelas" element={<Kelas />} />
                  <Route path="/order-form" element={<OrderForm />} />

                  {/* Auth routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Dashboard routes */}
                  <Route path="/dashboard" element={<UserDashboard />} />
                  <Route path="/admin/*" element={<AdminDashboard />} />

                  {/* 404 route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AppLayout>
            </HomeContentProvider>
          </AuthProvider>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
