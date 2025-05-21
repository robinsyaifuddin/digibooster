
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Linkedin, Github, ExternalLink, ChevronRight, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
const Footer = () => {
  const {
    t
  } = useLanguage();
  const currentYear = new Date().getFullYear();
  const footerAnimation = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  const itemAnimation = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  const iconAnimation = {
    initial: {
      scale: 1
    },
    hover: {
      scale: 1.15,
      filter: "drop-shadow(0 0 8px rgba(0, 216, 232, 0.6))",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };
  const buttonAnimation = {
    initial: {
      scale: 1
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 15px rgba(0, 216, 232, 0.6)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };
  const linkAnimation = {
    initial: {},
    hover: {
      x: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };
  return <footer className="bg-dark-200 border-t border-dark-300 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="container mx-auto px-4 pt-16 pb-8">
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12" initial="hidden" whileInView="visible" viewport={{
        once: true,
        margin: "-100px"
      }} variants={footerAnimation}>
          {/* Company Information */}
          <motion.div variants={itemAnimation}>
            
            
            {/* Social Media */}
            <div className="flex space-x-3">
              <motion.a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-dark-300 hover:bg-sky-500/20 text-gray-300 hover:text-sky-400 transition-colors border border-dark-300 hover:border-sky-500/30 icon-3d" variants={iconAnimation} initial="initial" whileHover="hover" whileTap="tap">
                <Facebook size={18} />
              </motion.a>
              <motion.a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-dark-300 hover:bg-sky-500/20 text-gray-300 hover:text-sky-400 transition-colors border border-dark-300 hover:border-sky-500/30 icon-3d" variants={iconAnimation} initial="initial" whileHover="hover" whileTap="tap">
                <Twitter size={18} />
              </motion.a>
              <motion.a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-dark-300 hover:bg-sky-500/20 text-gray-300 hover:text-sky-400 transition-colors border border-dark-300 hover:border-sky-500/30 icon-3d" variants={iconAnimation} initial="initial" whileHover="hover" whileTap="tap">
                <Instagram size={18} />
              </motion.a>
              <motion.a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-dark-300 hover:bg-sky-500/20 text-gray-300 hover:text-sky-400 transition-colors border border-dark-300 hover:border-sky-500/30 icon-3d" variants={iconAnimation} initial="initial" whileHover="hover" whileTap="tap">
                <Linkedin size={18} />
              </motion.a>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div variants={itemAnimation}>
            
            <ul className="space-y-2.5">
              <li>
                <motion.div variants={linkAnimation} initial="initial" whileHover="hover">
                  <Link to="/" className="text-gray-400 hover:text-sky-400 flex items-center transition-colors group">
                    <ChevronRight className="h-4 w-4 mr-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 -ml-4 group-hover:ml-0 icon-3d" />
                    <span>{t('beranda')}</span>
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div variants={linkAnimation} initial="initial" whileHover="hover">
                  <Link to="/program/jasa-digital" className="text-gray-400 hover:text-sky-400 flex items-center transition-colors group">
                    <ChevronRight className="h-4 w-4 mr-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 -ml-4 group-hover:ml-0 icon-3d" />
                    <span>{t('jasa-digital')}</span>
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div variants={linkAnimation} initial="initial" whileHover="hover">
                  <Link to="/program/kelas" className="text-gray-400 hover:text-sky-400 flex items-center transition-colors group">
                    <ChevronRight className="h-4 w-4 mr-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 -ml-4 group-hover:ml-0 icon-3d" />
                    <span>{t('shortclass-bootcamp')}</span>
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div variants={linkAnimation} initial="initial" whileHover="hover">
                  <Link to="/blog" className="text-gray-400 hover:text-sky-400 flex items-center transition-colors group">
                    <ChevronRight className="h-4 w-4 mr-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 -ml-4 group-hover:ml-0 icon-3d" />
                    <span>{t('blog')}</span>
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div variants={linkAnimation} initial="initial" whileHover="hover">
                  <Link to="/portofolio" className="text-gray-400 hover:text-sky-400 flex items-center transition-colors group">
                    <ChevronRight className="h-4 w-4 mr-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 -ml-4 group-hover:ml-0 icon-3d" />
                    <span>{t('portofolio')}</span>
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div variants={linkAnimation} initial="initial" whileHover="hover">
                  <Link to="/tentang" className="text-gray-400 hover:text-sky-400 flex items-center transition-colors group">
                    <ChevronRight className="h-4 w-4 mr-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 -ml-4 group-hover:ml-0 icon-3d" />
                    <span>{t('tentang')}</span>
                  </Link>
                </motion.div>
              </li>
            </ul>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div variants={itemAnimation}>
            <h3 className="text-lg font-semibold text-white mb-4">
              {t('contact-us') || "Contact Us"}
            </h3>
            <ul className="space-y-3">
              <li className="flex">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-sky-500/20 flex items-center justify-center mr-3 mt-0.5 icon-3d">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-sky-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-gray-400 text-sm">
                  Way Kandis, Kec. Tanjung Senang,<br />Bandar Lampung, Lampung 35143
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-sky-500/20 flex items-center justify-center mr-3 mt-0.5 icon-3d">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-sky-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div className="text-gray-400 text-sm">
                  +62 822-7972-2417
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-sky-500/20 flex items-center justify-center mr-3 mt-0.5 icon-3d">
                  <Mail className="h-3 w-3 text-sky-400" />
                </div>
                <div className="text-gray-400 text-sm">
                  hello.digibooster@gmail.com
                </div>
              </li>
            </ul>
          </motion.div>
          
          {/* Newsletter - Moved to appear after social media section */}
          <motion.div variants={itemAnimation}>
            <h3 className="text-lg font-semibold text-white mb-4">
              {t('newsletter') || "Newsletter"}
            </h3>
            
            <div className="flex">
              <Input type="email" placeholder={t('email-placeholder') || "Email anda..."} className="mr-2 bg-dark-300 border-dark-300 focus:border-sky-500 focus-visible:ring-0 text-sm rounded-l-md rounded-r-none" />
              <motion.div variants={buttonAnimation} initial="initial" whileHover="hover" whileTap="tap">
                <Button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white rounded-l-none">
                  {t('subscribe') || "Langganan"}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Bottom Section */}
        <div className="pt-6 mt-8 border-t border-dark-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} DigiBooster. {t('rights-reserved') || "All rights reserved."}
            </p>
            <div className="flex justify-center md:justify-end space-x-4">
              <Link to="/privacy-policy" className="text-gray-500 hover:text-gray-300 text-xs">
                {t('privacy-policy') || "Privacy Policy"}
              </Link>
              <Link to="/terms-of-service" className="text-gray-500 hover:text-gray-300 text-xs">
                {t('terms-of-service') || "Terms of Service"}
              </Link>
              <Link to="/cookies" className="text-gray-500 hover:text-gray-300 text-xs">
                {t('cookie-policy') || "Cookie Policy"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
