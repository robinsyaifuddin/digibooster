
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import ServicesGrid from '@/components/services/ServicesGrid';
import FeaturedServiceCard from '@/components/services/FeaturedServiceCard';
import PricingCard from '@/components/pricing/PricingCard';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

// Sample data
const featuredService = {
  id: 'featured-1',
  title: 'Jasa Pengembangan Website & Aplikasi',
  description: 'Layanan pembuatan website dan aplikasi mobile dengan teknologi terkini untuk berbagai kebutuhan bisnis Anda. Kami membantu mewujudkan visi digital Anda dengan solusi yang terukur, handal, dan user-friendly.',
  features: ['Website Development', 'Mobile Apps', 'Custom CMS', 'E-Commerce', 'API Integration', 'Responsive Design'],
  image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  rating: 4.8,
  year: '2023',
  category: 'Premium'
};

const services = [
  {
    id: 'service-1',
    title: 'Digital Marketing',
    description: 'Strategi digital marketing terbaik untuk meningkatkan awareness dan penjualan',
    image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    rating: 4.7,
    year: '2023',
    category: 'Marketing'
  },
  {
    id: 'service-2',
    title: 'Desain Grafis',
    description: 'Desain visual yang menarik untuk memperkuat brand identity bisnis Anda',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    rating: 4.6,
    year: '2023',
    category: 'Design'
  },
  {
    id: 'service-3',
    title: 'Social Media Management',
    description: 'Pengelolaan media sosial profesional untuk engagement optimal',
    image: 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    rating: 4.5,
    year: '2023',
    category: 'Social'
  },
  {
    id: 'service-4',
    title: 'Video Production',
    description: 'Produksi konten video berkualitas tinggi untuk berbagai kebutuhan',
    image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    rating: 4.8,
    year: '2023',
    category: 'Video'
  },
  {
    id: 'service-5',
    title: 'SEO Optimization',
    description: 'Optimasi mesin pencari untuk meningkatkan peringkat website Anda',
    image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    rating: 4.7,
    year: '2023',
    category: 'SEO'
  },
  {
    id: 'service-6',
    title: 'Content Management',
    description: 'Pengelolaan konten website dan media sosial yang terstruktur',
    image: 'https://images.unsplash.com/photo-1553484771-11998c592b9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    rating: 4.6,
    year: '2023',
    category: 'Content'
  },
  {
    id: 'service-7',
    title: 'E-Commerce Solutions',
    description: 'Solusi toko online lengkap dengan sistem pembayaran dan pengiriman',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    rating: 4.9,
    year: '2023',
    category: 'E-Commerce'
  },
  {
    id: 'service-8',
    title: 'UI/UX Design',
    description: 'Desain antarmuka pengguna yang intuitif dan menarik',
    image: 'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    rating: 4.8,
    year: '2023',
    category: 'UI/UX'
  },
  {
    id: 'service-9',
    title: 'Brand Strategy',
    description: 'Strategi pengembangan brand yang komprehensif',
    image: 'https://images.unsplash.com/photo-1494887205043-c5f291293cf6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    rating: 4.7,
    year: '2023',
    category: 'Branding'
  },
  {
    id: 'service-10',
    title: 'Digital Consulting',
    description: 'Konsultasi digital untuk transformasi bisnis Anda',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    rating: 4.9,
    year: '2023',
    category: 'Consulting'
  }
];

const Home = () => {
  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-4 pt-16">
        {/* Hero Section */}
        <HeroSection 
          title="DigiBooster Indonesia"
          subtitle="Percepatan Digitalisasi Indonesia"
          description="Platform Layanan Jasa Digital Terbaik untuk membantu bisnis Anda bertransformasi ke era digital dengan solusi komprehensif dan profesional. DigiBooster hadir sebagai partner digital terpercaya untuk pertumbuhan bisnis Anda."
          image="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          rating={4.9}
          year="2023"
          ctaText="Explore Services"
          ctaLink="/services"
        />
        
        {/* Featured Service */}
        <div className="mb-16">
          <FeaturedServiceCard 
            id={featuredService.id}
            title={featuredService.title}
            description={featuredService.description}
            features={featuredService.features}
            image={featuredService.image}
            rating={featuredService.rating}
            year={featuredService.year}
            category={featuredService.category}
          />
        </div>
        
        {/* Services Grid */}
        <ServicesGrid 
          services={services} 
          title="Layanan Digital" 
          subtitle="Berbagai layanan digital untuk kebutuhan bisnis Anda"
        />
        
        {/* Categories */}
        <div className="py-10">
          <h2 className="section-heading">Kategori Layanan</h2>
          
          <div className="flex flex-wrap gap-2 md:gap-4">
            {['All', 'Website', 'Mobile Apps', 'Design', 'Marketing', 'Content', 'SEO', 'Video', 'Branding'].map((category, index) => (
              <motion.button
                key={index}
                className={`nav-pill ${index === 0 ? 'nav-pill-active' : 'nav-pill-inactive'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Pricing Section */}
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Choose Your Plan</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Pilih paket layanan digital yang sesuai dengan kebutuhan dan budget Anda
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <PricingCard
              title="Standard"
              price="Rp 1.999k"
              period="bulan"
              features={[
                "Website Responsive",
                "Social Media Management",
                "Basic SEO",
                "Technical Support 8/5",
                "1 Revision"
              ]}
              color="default"
            />
            
            <PricingCard
              title="Premium"
              price="Rp 3.999k"
              period="bulan"
              features={[
                "Website & Mobile App",
                "Full Social Media Management",
                "Advanced SEO",
                "Content Creation",
                "Technical Support 12/6",
                "3 Revisions"
              ]}
              isPopular
              color="sky"
            />
            
            <PricingCard
              title="Enterprise"
              price="Rp 7.999k"
              period="bulan"
              features={[
                "Custom Digital Solutions",
                "Full Digital Marketing",
                "Premium SEO & Analytics",
                "Unlimited Content Creation",
                "Technical Support 24/7",
                "Unlimited Revisions"
              ]}
              color="gold"
            />
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="py-16">
          <div className="glass-card p-8 md:p-12 rounded-2xl relative overflow-hidden">
            <div className="absolute -right-20 top-0 bottom-0 w-1/2 bg-sky-500/20 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Transform Your Business?</h2>
              <p className="text-gray-300 mb-8 max-w-2xl">
                Mulai perjalanan digital Anda bersama DigiBooster dan rasakan perbedaan nyata untuk pertumbuhan bisnis Anda.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-sky-500 hover:bg-sky-600 text-white">
                  Konsultasi Gratis
                </Button>
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-sky-500/20 hover:border-sky-500">
                  Lihat Portfolio
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
