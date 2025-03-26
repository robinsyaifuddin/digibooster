
import { ArrowRight, Zap, Code, PenTool, Users, Lightbulb, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Index = () => {
  // Helper function for scroll animation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animationElements = document.querySelectorAll('.scroll-animation');
    animationElements.forEach(el => {
      el.classList.add('opacity-0');
      observer.observe(el);
    });

    return () => {
      animationElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const services = [
    {
      title: "Layanan Jasa Digital",
      description: "Tingkatkan presence digital Anda dengan layanan jasa design, web development, dan digital marketing kami.",
      icon: <Code className="h-12 w-12 text-diginavy" />,
      link: "/layanan/jasa-digital"
    },
    {
      title: "Motivasi dan Edukasi Digital",
      description: "Dapatkan inspirasi dan pengetahuan digital melalui seminar dan workshop yang kami selenggarakan.",
      icon: <Lightbulb className="h-12 w-12 text-diginavy" />,
      link: "/layanan/motivasi-edukasi"
    },
    {
      title: "Sharing dan Konsultasi Bisnis Digital",
      description: "Konsultasikan kebutuhan digital bisnis Anda dengan pakar kami untuk solusi terbaik.",
      icon: <Users className="h-12 w-12 text-diginavy" />,
      link: "/layanan/sharing-konsultasi"
    },
    {
      title: "Short Class dan Mini Bootcamp",
      description: "Pelajari keterampilan digital terbaru melalui kelas intensif dan bootcamp dari para ahli.",
      icon: <PenTool className="h-12 w-12 text-diginavy" />,
      link: "/layanan/kelas"
    }
  ];

  const testimonials = [
    {
      name: "Budi Santoso",
      role: "Pemilik UMKM",
      content: "DigiBooster membantu bisnis saya bertransformasi secara digital. Penjualan meningkat 300% hanya dalam 3 bulan!",
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      name: "Siti Rahma",
      role: "Freelancer",
      content: "Bootcamp yang diselenggarakan sangat bermanfaat. Saya mendapatkan keterampilan baru yang langsung bisa diterapkan.",
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      name: "Ahmad Fauzi",
      role: "Startup Founder",
      content: "Konsultasi dengan tim DigiBooster membuka wawasan tentang potensi digital marketing yang belum kami maksimalkan.",
      image: "https://randomuser.me/api/portraits/men/3.jpg"
    }
  ];

  const benefits = [
    "Tingkatkan keterampilan digital Anda",
    "Dapatkan konsultasi dari pakar bisnis digital",
    "Akses ke komunitas digital enthusiast",
    "Kesempatan kolaborasi dengan partner kami",
    "Update teknologi terbaru dan implementasinya",
    "Dukungan 24/7 untuk pertanyaan teknis"
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-diginavy to-digiblue-700 text-white py-20 md:py-28">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h5 className="text-digiblue-200 mb-3 font-medium">Platform Agensi dan Pengembangan Digital</h5>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="block mb-2">Skill Up, Stand Out</span>
              <span className="text-digiblue-300">with DigiBooster</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-100">
              Membantu masyarakat Indonesia mengoptimalkan digitalisasi untuk peningkatan kualitas hidup dan bisnis.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/layanan">
                <Button size="lg" className="bg-white text-diginavy hover:bg-gray-100 shadow-lg">
                  Lihat Layanan
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Mulai Sekarang
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Wave effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,266.7C960,267,1056,245,1152,229.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 scroll-animation">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Layanan Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              DigiBooster menyediakan berbagai layanan untuk membantu Anda dan bisnis Anda berkembang di era digital.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 scroll-animation"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link to={service.link} className="text-diginavy font-medium flex items-center hover:underline">
                  Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-diginavy to-digiblue-800 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center scroll-animation">
            <Zap className="h-16 w-16 mx-auto mb-6 text-digiblue-300" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Tingkatkan Keterampilan Digital Anda?</h2>
            <p className="text-lg text-gray-100 mb-8">
              Bergabunglah dengan ribuan orang yang telah meningkatkan kemampuan digitalnya bersama DigiBooster.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-white text-diginavy hover:bg-gray-100">
                  Daftar Sekarang
                </Button>
              </Link>
              <Link to="/layanan/kelas">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Lihat Kelas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10 scroll-animation">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Mengapa DigiBooster?</h2>
              <p className="text-gray-600 mb-8">
                DigiBooster hadir sebagai solusi terpadu untuk kebutuhan digitalisasi Anda. Dengan pendekatan yang komprehensif, kami membantu baik individu maupun bisnis mencapai potensi maksimal di era digital.
              </p>
              
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-diginavy shrink-0 mr-3" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <Link to="/tentang">
                  <Button className="bg-diginavy text-white hover:bg-diginavy-800">
                    Pelajari Lebih Lanjut
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/2 scroll-animation">
              <div className="relative">
                <div className="absolute -top-4 -left-4 bg-diginavy w-24 h-24 rounded-lg opacity-20"></div>
                <div className="absolute -bottom-4 -right-4 bg-digiblue-700 w-24 h-24 rounded-lg opacity-20"></div>
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
                  alt="Digital Transformation" 
                  className="w-full h-auto rounded-lg shadow-lg relative z-10" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 scroll-animation">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Apa Kata Mereka?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cerita sukses dari para pengguna DigiBooster yang telah meningkatkan kemampuan digital mereka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="glass-card rounded-lg shadow-lg p-6 scroll-animation"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-14 h-14 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center scroll-animation">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ada pertanyaan?</h2>
            <p className="text-gray-600 mb-8">
              Tim kami siap membantu Anda dengan segala pertanyaan tentang layanan DigiBooster.
            </p>
            <Link to="/kontak">
              <Button size="lg" className="bg-diginavy text-white hover:bg-diginavy-800">
                Hubungi Kami
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
