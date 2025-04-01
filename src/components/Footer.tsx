
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-cyber-darker border-t border-cyber-primary/20 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Footer Top - Newsletter */}
        <div className="py-8 px-6 mb-12 glass-card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-2">Stay Connected</h3>
              <p className="text-white/70">Subscribe to our newsletter for updates on digital trends, events, and exclusive offers.</p>
            </div>
            <div>
              <div className="flex space-x-0">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="rounded-r-none border-r-0 bg-cyber-dark border-cyber-primary/30 focus:border-cyber-accent"
                />
                <Button className="rounded-l-none bg-cyber-accent hover:bg-cyber-accent/90">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Main */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <div className="text-cyber-accent font-display text-2xl font-bold">
                <span className="cyber-glow" style={{ "--glow-color": "rgba(75, 255, 209, 0.7)" } as React.CSSProperties}>DIGI</span>
                <span className="text-white">BOOSTER</span>
              </div>
            </Link>
            <p className="text-white/70 mb-6">
              Empowering digital transformation through education, innovation, and collaboration.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-cyber-accent transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-cyber-accent transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-cyber-accent transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-cyber-accent transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/70 hover:text-cyber-accent cyber-link">Home</Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/70 hover:text-cyber-accent cyber-link">Blog</Link>
              </li>
              <li>
                <Link to="/portofolio" className="text-white/70 hover:text-cyber-accent cyber-link">Portfolio</Link>
              </li>
              <li>
                <Link to="/tentang" className="text-white/70 hover:text-cyber-accent cyber-link">About Us</Link>
              </li>
              <li>
                <Link to="/login" className="text-white/70 hover:text-cyber-accent cyber-link">Login</Link>
              </li>
            </ul>
          </div>
          
          {/* Programs */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Our Programs</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/program/jasa-digital" className="text-white/70 hover:text-cyber-accent cyber-link">Digital Services</Link>
              </li>
              <li>
                <Link to="/program/motivasi-edukasi" className="text-white/70 hover:text-cyber-accent cyber-link">Motivation & Education</Link>
              </li>
              <li>
                <Link to="/program/sharing-konsultasi" className="text-white/70 hover:text-cyber-accent cyber-link">Sharing & Consultation</Link>
              </li>
              <li>
                <Link to="/program/kelas" className="text-white/70 hover:text-cyber-accent cyber-link">Classes</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-cyber-accent shrink-0 mt-0.5" />
                <span className="text-white/70">
                  Semarang, Central Java, Indonesia
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-cyber-accent shrink-0" />
                <a href="mailto:info@digibooster.com" className="text-white/70 hover:text-cyber-accent">
                  info@digibooster.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-cyber-accent shrink-0" />
                <a href="tel:+6281234567890" className="text-white/70 hover:text-cyber-accent">
                  +62 812-3456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="pt-10 mt-10 border-t border-cyber-primary/20 text-center md:flex md:justify-between md:text-left">
          <p className="text-white/60 text-sm">
            &copy; {currentYear} DigiBooster. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 space-x-4 text-sm">
            <a href="#" className="text-white/60 hover:text-cyber-accent">Privacy Policy</a>
            <a href="#" className="text-white/60 hover:text-cyber-accent">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
