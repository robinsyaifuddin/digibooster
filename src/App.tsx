
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@/index.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Index from '@/pages/index';
import Tentang from '@/pages/Tentang';
import Portfolio from '@/pages/Portfolio';
import NotFound from '@/pages/NotFound';
import { AuthProvider } from '@/contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
