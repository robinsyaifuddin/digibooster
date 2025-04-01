
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import PortfolioFilters from '@/components/portfolio/PortfolioFilters';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import CtaComponent from '@/components/common/CtaComponent';
import { PortfolioItemType } from '@/types/portfolioTypes';

const Portfolio = () => {
  // Dummy data for portfolio items
  const allItems: PortfolioItemType[] = [
    {
      id: '1',
      title: 'E-Commerce Platform Redesign',
      description: 'Redesign dan pengembangan platform e-commerce dengan UI modern dan UX yang intuitif.',
      category: 'Web Development',
      client: 'FashionHub Indonesia',
      services: ['UI/UX Design', 'Frontend Development', 'Backend Integration'],
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      slug: 'ecommerce-platform-redesign'
    },
    {
      id: '2',
      title: 'Mobile App untuk Startup Fintech',
      description: 'Aplikasi mobile untuk fintech startup dengan fitur payment gateway dan wallet.',
      category: 'Mobile App',
      client: 'PayEasy',
      services: ['UI/UX Design', 'Mobile Development', 'API Integration'],
      image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      slug: 'fintech-mobile-app'
    },
    {
      id: '3',
      title: 'Digital Marketing Campaign',
      description: 'Kampanye pemasaran digital untuk produk baru dengan strategi yang komprehensif.',
      category: 'Digital Marketing',
      client: 'Health Nutrition',
      services: ['Social Media Marketing', 'Content Creation', 'Paid Advertising'],
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      slug: 'digital-marketing-campaign'
    },
    {
      id: '4',
      title: 'Brand Identity Design',
      description: 'Desain identitas brand yang konsisten termasuk logo, warna, tipografi dan aplikasinya.',
      category: 'Branding',
      client: 'Organic Farm',
      services: ['Logo Design', 'Brand Guidelines', 'Marketing Collateral'],
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80',
      slug: 'brand-identity-design'
    },
    {
      id: '5',
      title: 'Company Website Redesign',
      description: 'Redesign website perusahaan dengan pendekatan modern dan responsif.',
      category: 'Web Development',
      client: 'Industrial Solutions',
      services: ['UI/UX Design', 'Frontend Development', 'CMS Integration'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2015&q=80',
      slug: 'company-website-redesign'
    },
    {
      id: '6',
      title: 'SEO & Content Strategy',
      description: 'Strategi SEO dan konten untuk meningkatkan organic traffic dan konversi.',
      category: 'Digital Marketing',
      client: 'Travel Blog',
      services: ['SEO Audit', 'Content Strategy', 'Performance Tracking'],
      image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      slug: 'seo-content-strategy'
    }
  ];

  // Available filters
  const allFilters = ['All Projects', 'Web Development', 'Mobile App', 'Digital Marketing', 'Branding'];
  
  // State for active filter
  const [activeFilter, setActiveFilter] = useState('All Projects');
  // State for filtered items
  const [filteredItems, setFilteredItems] = useState<PortfolioItemType[]>(allItems);

  // Filter items when active filter changes
  useEffect(() => {
    if (activeFilter === 'All Projects') {
      setFilteredItems(allItems);
    } else {
      const filtered = allItems.filter(item => item.category === activeFilter);
      setFilteredItems(filtered);
    }
  }, [activeFilter]);

  // Handle filter change
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div className="pt-28 pb-20 bg-gradient-to-b from-cyber-darker to-cyber-dark min-h-screen">
      <div className="container mx-auto px-4">
        {/* Background elements */}
        <div className="fixed inset-0 cyber-grid-bg opacity-10 z-0"></div>
        <div className="fixed top-1/4 right-1/3 w-80 h-80 bg-cyber-primary/5 blur-3xl rounded-full z-0"></div>
        <div className="fixed bottom-1/3 left-1/4 w-80 h-80 bg-cyber-accent/5 blur-3xl rounded-full z-0"></div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <PortfolioHero />
          
          <PortfolioFilters 
            filters={allFilters} 
            activeFilter={activeFilter} 
            onFilterChange={handleFilterChange} 
          />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <PortfolioGrid items={filteredItems} />
            </motion.div>
          </AnimatePresence>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <CtaComponent
              title="Have a Project in Mind?"
              description="Let's discuss how we can help bring your vision to life with our digital expertise and creative solutions."
              buttonText="Contact Us"
              buttonLink="/kontak"
              theme="blue"
              size="large"
              className="cyber-card border-cyber-primary/20"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;
