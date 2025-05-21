import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Blog from '@/pages/Blog';
import BlogDetail from '@/pages/BlogDetail';
import Portfolio from '@/pages/Portfolio';
import Tentang from '@/pages/Tentang';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import JasaDigital from '@/pages/JasaDigital';
import PelatihanDigital from '@/pages/PelatihanDigital';
import Loader from '@/components/ui/Loader';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import Kelas from '@/pages/Kelas';
import SettingsPage from '@/pages/admin/SettingsPage';
import ProfilePage from '@/pages/admin/ProfilePage';
import NotFound from '@/pages/NotFound';
import ComingSoon from '@/pages/ComingSoon';
import Maintenance from '@/pages/Maintenance';
import { useTheme } from '@/contexts/ThemeContext';

function App() {
  const { theme } = useTheme();

  return (
    <div className={theme}>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* Main routes */}
                <Route index element={<Home />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:slug" element={<BlogDetail />} />
                <Route path="portofolio" element={<Portfolio />} />
                <Route path="tentang" element={<Tentang />} />
                
                {/* Program submenu routes */}
                <Route path="program/jasa-digital" element={<JasaDigital />} />
                <Route path="program/kelas" element={<PelatihanDigital />} />
                
                {/* Authentication routes */}
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>
              
              {/* Admin routes - Protected by AuthGuard */}
              <Route path="/admin" element={<AuthGuard><AdminDashboard /></AuthGuard>} />
              <Route path="/admin/settings" element={<AuthGuard><SettingsPage /></AuthGuard>} />
              <Route path="/admin/profile" element={<AuthGuard><ProfilePage /></AuthGuard>} />
              
              {/* Additional routes */}
              <Route path="/kelas" element={<Kelas />} />
              <Route path="/coming-soon" element={<ComingSoon />} />
              <Route path="/maintenance" element={<Maintenance />} />
              
              {/* Catch-all route for 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

// AuthGuard component to protect routes
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export default App;
