
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@/index.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Index from '@/pages/index';
import Tentang from '@/pages/Tentang';
import Portfolio from '@/pages/Portfolio';
import NotFound from '@/pages/NotFound';

function App() {
  return (
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
  );
}

export default App;
