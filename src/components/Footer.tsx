
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram,
  Send,
  ArrowUp,
  Github,
  Twitter,
  Linkedin,
  ExternalLink
} from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { useToast } from '../hooks/use-toast';
import { motion } from 'framer-motion';

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="relative bg-dark-100 text-gray-300 pt-16 pb-6 overflow-hidden border-t border-dark-300">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-100 to-dark-200 opacity-90 z-0"></div>
      
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-cyberpunk-grid opacity-10"></div>
      
      {/* Decorative shapes */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/10 rounded-full filter blur-3xl"
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-neon-violet/10 rounded-full filter blur-3xl"
        animate={{
          opacity: [0.1, 0.18, 0.1],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Back to top button */}
        <div className="absolute right-10 top-0 transform -translate-y-1/2">
          <button 
            onClick={scrollToTop} 
            className="bg-dark-300 text-neon-purple p-4 rounded-full shadow-lg hover:bg-dark-400 hover:shadow-neon-purple/30 transition-all duration-300 group"
            aria-label="Back to top"
          >
            <ArrowUp className="h-6 w-6 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-dark-400"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Link to="/" className="inline-block mb-6">
              <img src="/lovable-uploads/eb7d859a-60c0-4007-afe4-522ffdd5afda.png" alt="DigiBooster Logo" className="h-12" />
            </Link>
            <p className="text-gray-400 mb-6">
              DigiBooster adalah platform agensi dan pengembangan ekosistem digital Indonesia. Kami membantu masyarakat mengoptimalkan digitalisasi.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="https://instagram.com/digibooster.id" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-300 text-neon-purple flex items-center justify-center hover:bg-dark-400 hover:text-white hover:scale-110 transition-all duration-300"
                whileHover={{ y: -3 }}
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-300 text-neon-purple flex items-center justify-center hover:bg-dark-400 hover:text-white hover:scale-110 transition-all duration-300"
                whileHover={{ y: -3 }}
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-300 text-neon-purple flex items-center justify-center hover:bg-dark-400 hover:text-white hover:scale-110 transition-all duration-300"
                whileHover={{ y: -3 }}
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h5 className="font-semibold text-lg mb-6 text-white">Program</h5>
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/program/jasa-digital" 
                  className="text-gray-400 hover:text-neon-purple transition-all duration-200 flex items-center group"
                >
                  <span className="w-0 h-0.5 bg-neon-purple mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Layanan Jasa Digital
                </Link>
              </li>
              <li>
                <Link 
                  to="/program/motivasi-edukasi" 
                  className="text-gray-400 hover:text-neon-purple transition-all duration-200 flex items-center group"
                >
                  <span className="w-0 h-0.5 bg-neon-purple mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Motivasi dan Edukasi Digital
                </Link>
              </li>
              <li>
                <Link 
                  to="/program/sharing-konsultasi" 
                  className="text-gray-400 hover:text-neon-purple transition-all duration-200 flex items-center group"
                >
                  <span className="w-0 h-0.5 bg-neon-purple mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Sharing dan Konsultasi Bisnis Digital
                </Link>
              </li>
              <li>
                <Link 
                  to="/program/kelas" 
                  className="text-gray-400 hover:text-neon-purple transition-all duration-200 flex items-center group"
                >
                  <span className="w-0 h-0.5 bg-neon-purple mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Short Class dan Mini Bootcamp Digital
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h5 className="font-semibold text-lg mb-6 text-white">Kontak</h5>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <MapPin className="w-5 h-5 mr-3 text-neon-purple shrink-0 mt-0.5 group-hover:animate-pulse" />
                <span className="text-gray-400 group-hover:text-white transition-colors duration-200">Way Kandis, Bandar Lampung</span>
              </li>
              <li className="flex items-center group">
                <Phone className="w-5 h-5 mr-3 text-neon-purple shrink-0 group-hover:animate-pulse" />
                <a href="tel:+6282279722417" className="text-gray-400 hover:text-white transition-colors duration-200">082279722417</a>
              </li>
              <li className="flex items-center group">
                <Mail className="w-5 h-5 mr-3 text-neon-purple shrink-0 group-hover:animate-pulse" />
                <a href="mailto:hello.digibooster@gmail.com" className="text-gray-400 hover:text-white transition-colors duration-200">hello.digibooster@gmail.com</a>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
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
                  className="cyber-input flex-1 rounded-l-md"
                />
                <Button 
                  type="submit" 
                  className="bg-neon-purple hover:bg-neon-violet rounded-l-none transition-colors duration-300 group"
                >
                  <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>

        <motion.div 
          className="pt-8 text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p>&copy; {new Date().getFullYear()} DigiBooster. Hak cipta dilindungi.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
