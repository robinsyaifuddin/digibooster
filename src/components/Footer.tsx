
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram,
  Send
} from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { useToast } from '../hooks/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Berhasil berlangganan!",
      description: "Terima kasih telah berlangganan newsletter DigiBooster.",
    });
    setEmail('');
  };

  const partnerLogos = [
    { name: 'Google', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/150px-Google_%22G%22_Logo.svg.png' },
    { name: 'Microsoft', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/150px-Microsoft_logo.svg.png' },
    { name: 'Amazon', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/175px-Amazon_logo.svg.png' },
    { name: 'IBM', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/150px-IBM_logo.svg.png' },
    { name: 'Oracle', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/150px-Oracle_logo.svg.png' },
    { name: 'Cisco', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/150px-Cisco_logo_blue_2016.svg.png' },
    { name: 'Intel', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/150px-Intel_logo_%282006-2020%29.svg.png' },
    { name: 'Nvidia', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/150px-Nvidia_logo.svg.png' },
  ];

  return (
    <footer className="bg-gray-50 text-gray-700 pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Partner Logos */}
        <div className="mb-12 overflow-hidden">
          <h4 className="text-xl font-semibold mb-6 text-center">Dipercaya oleh</h4>
          <div className="relative overflow-hidden">
            <div className="flex space-x-12 logo-marquee">
              {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                <div key={index} className="flex items-center justify-center h-16">
                  <img src={logo.image} alt={logo.name} className="h-full object-contain grayscale hover:grayscale-0 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-200">
          <div>
            <Link to="/" className="inline-block mb-6">
              <img src="/lovable-uploads/eb7d859a-60c0-4007-afe4-522ffdd5afda.png" alt="DigiBooster Logo" className="h-12" />
            </Link>
            <p className="text-gray-600 mb-6">
              DigiBooster adalah platform agensi dan pengembangan ekosistem digital Indonesia. Kami membantu masyarakat mengoptimalkan digitalisasi.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/digibooster.id" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-diginavy text-white flex items-center justify-center hover:bg-digiblue-700 transition"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-4">Layanan</h5>
            <ul className="space-y-3">
              <li><Link to="/layanan/jasa-digital" className="hover:text-diginavy transition">Layanan Jasa Digital</Link></li>
              <li><Link to="/layanan/motivasi-edukasi" className="hover:text-diginavy transition">Motivasi dan Edukasi Digital</Link></li>
              <li><Link to="/layanan/sharing-konsultasi" className="hover:text-diginavy transition">Sharing dan Konsultasi Bisnis Digital</Link></li>
              <li><Link to="/layanan/kelas" className="hover:text-diginavy transition">Short Class dan Mini Bootcamp Digital</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-4">Kontak</h5>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 text-diginavy shrink-0 mt-0.5" />
                <span>Way Kandis, Bandar Lampung</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-diginavy shrink-0" />
                <a href="tel:+6282279722417" className="hover:text-diginavy transition">082279722417</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-diginavy shrink-0" />
                <a href="mailto:hello.digibooster@gmail.com" className="hover:text-diginavy transition">hello.digibooster@gmail.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-4">Berlangganan</h5>
            <p className="text-gray-600 mb-4">Dapatkan informasi terbaru dan promo menarik dari kami</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Email kamu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-digiblue-500 focus:border-digiblue-500 outline-none"
                />
                <Button type="submit" className="bg-diginavy hover:bg-diginavy-800 rounded-l-none">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} DigiBooster. Hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
