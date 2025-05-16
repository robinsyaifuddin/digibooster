
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Search, Filter, ChevronDown, Star } from 'lucide-react';
import ServiceCard from '@/components/services/ServiceCard';

// Sample services data
const servicesData = [
  {
    id: 'service-1',
    title: 'Website Development',
    description: 'Pembuatan website profesional dengan teknologi modern dan design responsif',
    image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    rating: 4.8,
    year: '2023',
    category: 'Development'
  },
  {
    id: 'service-2',
    title: 'Mobile App Development',
    description: 'Pengembangan aplikasi mobile untuk Android dan iOS dengan performa tinggi',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    rating: 4.7,
    year: '2023',
    category: 'Development'
  },
  {
    id: 'service-3',
    title: 'UI/UX Design',
    description: 'Desain antarmuka pengguna yang intuitif dan menarik untuk aplikasi digital',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    rating: 4.9,
    year: '2023',
    category: 'Design'
  },
  {
    id: 'service-4',
    title: 'Digital Marketing',
    description: 'Strategi marketing digital komprehensif untuk meningkatkan brand awareness',
    image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    rating: 4.6,
    year: '2023',
    category: 'Marketing'
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
    title: 'Content Creation',
    description: 'Pembuatan konten berkualitas tinggi untuk kebutuhan marketing digital',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    rating: 4.5,
    year: '2023',
    category: 'Content'
  },
  {
    id: 'service-7',
    title: 'E-Commerce Solutions',
    description: 'Solusi e-commerce lengkap dengan sistem pembayaran dan pengiriman terintegrasi',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    rating: 4.8,
    year: '2023',
    category: 'Development'
  },
  {
    id: 'service-8',
    title: 'Social Media Management',
    description: 'Pengelolaan media sosial profesional untuk meningkatkan engagement',
    image: 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    rating: 4.6,
    year: '2023',
    category: 'Marketing'
  },
  {
    id: 'service-9',
    title: 'Video Production',
    description: 'Produksi video profesional untuk berbagai kebutuhan digital marketing',
    image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    rating: 4.7,
    year: '2023',
    category: 'Video'
  },
  {
    id: 'service-10',
    title: 'Brand Identity',
    description: 'Pengembangan identitas brand yang konsisten dan memorable',
    image: 'https://images.unsplash.com/photo-1494887205043-c5f291293cf6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    rating: 4.9,
    year: '2023',
    category: 'Branding'
  },
  {
    id: 'service-11',
    title: 'IT Consulting',
    description: 'Konsultasi teknologi informasi untuk transformasi digital bisnis',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    rating: 4.8,
    year: '2023',
    category: 'Consulting'
  },
  {
    id: 'service-12',
    title: 'Analytics & Reporting',
    description: 'Analisis data dan pembuatan laporan untuk pengambilan keputusan bisnis',
    image: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    rating: 4.7,
    year: '2023',
    category: 'Analytics'
  }
];

// Category options
const categories = [
  'All Categories',
  'Development',
  'Design',
  'Marketing',
  'SEO',
  'Content',
  'Branding',
  'Video',
  'Consulting',
  'Analytics'
];

// Rating filters
const ratingFilters = [
  { value: 0, label: 'All Ratings' },
  { value: 4.5, label: '4.5+' },
  { value: 4, label: '4+' },
  { value: 3.5, label: '3.5+' }
];

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortOrder, setSortOrder] = useState('popular');
  
  // Filter services based on search term, category, and rating
  const filteredServices = servicesData.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || service.category === selectedCategory;
    const matchesRating = service.rating >= selectedRating;
    
    return matchesSearch && matchesCategory && matchesRating;
  });
  
  // Sort services based on selected sort order
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortOrder === 'popular') {
      return b.rating - a.rating;
    } else if (sortOrder === 'newest') {
      return b.year.localeCompare(a.year);
    } else if (sortOrder === 'a-z') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-4 py-16">
        {/* Hero section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Digital Services</h1>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Explore our comprehensive range of digital services designed to help businesses thrive in the digital era.
            From website development to digital marketing, we have everything you need to boost your online presence.
          </p>
        </div>
        
        {/* Search and filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                placeholder="Search for services"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-sky-500 focus:ring focus:ring-sky-500/20 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4">
              <div className="relative">
                <select
                  className="appearance-none pl-4 pr-10 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-sky-500 focus:ring focus:ring-sky-500/20 focus:outline-none"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              
              <div className="relative">
                <select
                  className="appearance-none pl-4 pr-10 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-sky-500 focus:ring focus:ring-sky-500/20 focus:outline-none"
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(parseFloat(e.target.value))}
                >
                  {ratingFilters.map(filter => (
                    <option key={filter.label} value={filter.value}>{filter.label}</option>
                  ))}
                </select>
                <Star className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              
              <Button 
                variant="outline" 
                className="border-gray-700 text-white bg-gray-900 hover:bg-sky-500/20 hover:border-sky-500"
              >
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </Button>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-gray-300">
              Showing <span className="text-white font-medium">{sortedServices.length}</span> services
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Sort by:</span>
              <div className="flex">
                <Button 
                  variant="ghost" 
                  className={`px-3 py-1 ${sortOrder === 'popular' ? 'bg-sky-500/20 text-sky-400' : 'text-gray-300'}`}
                  onClick={() => setSortOrder('popular')}
                >
                  Popular
                </Button>
                <Button 
                  variant="ghost" 
                  className={`px-3 py-1 ${sortOrder === 'newest' ? 'bg-sky-500/20 text-sky-400' : 'text-gray-300'}`}
                  onClick={() => setSortOrder('newest')}
                >
                  Newest
                </Button>
                <Button 
                  variant="ghost" 
                  className={`px-3 py-1 ${sortOrder === 'a-z' ? 'bg-sky-500/20 text-sky-400' : 'text-gray-300'}`}
                  onClick={() => setSortOrder('a-z')}
                >
                  A-Z
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedServices.length > 0 ? (
            sortedServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ServiceCard
                  id={service.id}
                  title={service.title}
                  description={service.description}
                  image={service.image}
                  rating={service.rating}
                  year={service.year}
                  category={service.category}
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-4xl text-gray-600 mb-4">😢</div>
              <h3 className="text-xl font-semibold text-white mb-2">No services found</h3>
              <p className="text-gray-400">Try adjusting your search or filter to find what you're looking for.</p>
              <Button 
                className="mt-4 bg-sky-500 hover:bg-sky-600 text-white"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All Categories');
                  setSelectedRating(0);
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {sortedServices.length > 0 && (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-gray-700 text-white hover:bg-sky-500/20 hover:border-sky-500">
                Previous
              </Button>
              {[1, 2, 3].map((page) => (
                <Button 
                  key={page}
                  variant={page === 1 ? "default" : "outline"}
                  className={page === 1 
                    ? "bg-sky-500 hover:bg-sky-600 text-white" 
                    : "border-gray-700 text-white hover:bg-sky-500/20 hover:border-sky-500"
                  }
                >
                  {page}
                </Button>
              ))}
              <Button variant="outline" className="border-gray-700 text-white hover:bg-sky-500/20 hover:border-sky-500">
                Next
              </Button>
            </div>
          </div>
        )}
        
        {/* CTA section */}
        <div className="mt-16">
          <div className="glass-card p-8 md:p-12 rounded-2xl relative overflow-hidden">
            <div className="absolute -right-20 top-0 bottom-0 w-1/2 bg-sky-500/20 rounded-full blur-3xl"></div>
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Need a custom solution?</h2>
              <p className="text-gray-300 mb-8">
                Our team of experts is ready to help you find the perfect digital solution for your unique business needs. Let's discuss your project!
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-sky-500 hover:bg-sky-600 text-white">
                  Get Free Consultation
                </Button>
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-sky-500/20 hover:border-sky-500">
                  View Case Studies
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
