
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram,
  Send,
  ArrowUp
} from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { useToast } from '../hooks/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Berhasil berlangganan!",
      description: "Terima kasih telah berlangganan newsletter DigiBooster.",
    });
    setEmail('');
  };

  return (
    <footer className="relative bg-gray-900 text-gray-300 pt-16 pb-6 overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-diginavy-900 opacity-90 z-0"></div>
      
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-diginavy/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-digiblue-700/10 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Back to top button */}
        <div className="absolute right-10 top-0 transform -translate-y-1/2">
          <button 
            onClick={scrollToTop} 
            className="bg-white text-diginavy p-4 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 group"
          >
            <ArrowUp className="h-6 w-6 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-gray-700">
          <div>
            <Link to="/" className="inline-block mb-6">
              <img src="/lovable-uploads/eb7d859a-60c0-4007-afe4-522ffdd5afda.png" alt="DigiBooster Logo" className="h-12" />
            </Link>
            <p className="text-gray-400 mb-6">
              DigiBooster adalah platform agensi dan pengembangan ekosistem digital Indonesia. Kami membantu masyarakat mengoptimalkan digitalisasi.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/digibooster.id" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-diginavy transition-colors duration-300"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-6 text-white">Layanan</h5>
            <ul className="space-y-4">
              <li><Link to="/layanan/jasa-digital" className="text-gray-400 hover:text-white transition-colors duration-200">Layanan Jasa Digital</Link></li>
              <li><Link to="/layanan/motivasi-edukasi" className="text-gray-400 hover:text-white transition-colors duration-200">Motivasi dan Edukasi Digital</Link></li>
              <li><Link to="/layanan/sharing-konsultasi" className="text-gray-400 hover:text-white transition-colors duration-200">Sharing dan Konsultasi Bisnis Digital</Link></li>
              <li><Link to="/layanan/kelas" className="text-gray-400 hover:text-white transition-colors duration-200">Short Class dan Mini Bootcamp Digital</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-6 text-white">Kontak</h5>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-diginavy-300 shrink-0 mt-0.5" />
                <span className="text-gray-400">Way Kandis, Bandar Lampung</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-diginavy-300 shrink-0" />
                <a href="tel:+6282279722417" className="text-gray-400 hover:text-white transition-colors duration-200">082279722417</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-diginavy-300 shrink-0" />
                <a href="mailto:hello.digibooster@gmail.com" className="text-gray-400 hover:text-white transition-colors duration-200">hello.digibooster@gmail.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-6 text-white">Berlangganan</h5>
            <p className="text-gray-400 mb-4">Dapatkan informasi terbaru dan promo menarik dari kami</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Email kamu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-l-md focus:ring-2 focus:ring-digiblue-500 focus:border-digiblue-500 outline-none"
                />
                <Button type="submit" className="bg-diginavy hover:bg-digiblue-600 rounded-l-none transition-colors duration-300">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} DigiBooster. Hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
