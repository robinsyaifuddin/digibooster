
import React, { useState, useEffect } from 'react';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import PortfolioFilters from '@/components/portfolio/PortfolioFilters';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import CtaComponent from '@/components/common/CtaComponent';
import { portfolioItems, portfolioFilters } from '@/data/portfolioData';
import { PortfolioItemType } from '@/types/portfolioTypes';
import { motion } from 'framer-motion';

const Portofolio = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [filteredItems, setFilteredItems] = useState<PortfolioItemType[]>(portfolioItems);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    if (category === "All") {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(portfolioItems.filter(item => item.category === category));
    }
  };

  return (
    <div className="pt-24 md:pt-32 bg-white min-h-screen">
      <motion.div 
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <PortfolioHero />

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <PortfolioFilters 
            filters={portfolioFilters}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <PortfolioGrid items={filteredItems} />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <CtaComponent
            title="Siap Mewujudkan Proyek Digital Anda?"
            description="Kami siap membantu mewujudkan ide dan kebutuhan digital Anda dengan solusi kreatif dan profesional sesuai standar industri."
            buttonText="Diskusikan Proyek Anda"
            buttonLink="/kontak"
            theme="blue"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Portofolio;
