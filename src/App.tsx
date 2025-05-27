import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Toaster } from './components/ui/sonner';
import { HomeContentProvider } from './contexts/HomeContentContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/chatbot/ChatBot';
import './App.css';
import { Beranda, JasaDigital, Portofolio, Blog, Kelas, ClassDetail, Tentang, NotFound, Login, Register, PortfolioDetail, BlogDetail } from './pages';
import OrderForm from './pages/OrderForm';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <LanguageProvider>
            <HomeContentProvider>
              <Router>
                <div className="flex flex-col min-h-screen bg-black text-white">
                  <Navbar />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Beranda />} />
                      <Route path="/jasa-digital" element={<JasaDigital />} />
                      <Route path="/portofolio" element={<Portofolio />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/kelas" element={<Kelas />} />
                      <Route path="/kelas/:classId" element={<ClassDetail />} />
                      <Route path="/tentang" element={<Tentang />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/portofolio/:portfolioId" element={<PortfolioDetail />} />
                      <Route path="/blog/:blogId" element={<BlogDetail />} />
                      <Route path="/order" element={<OrderForm />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                  <ChatBot />
                  <Toaster />
                </div>
              </Router>
            </HomeContentProvider>
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
