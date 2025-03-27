
import React, { useState } from 'react';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import PortfolioFilters from '@/components/portfolio/PortfolioFilters';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import CtaSection from '@/components/common/CtaSection';
import { portfolioItems, portfolioFilters } from '@/data/portfolioData';
import { PortfolioItemType } from '@/types/portfolioTypes';

const Portofolio = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [filteredItems, setFilteredItems] = useState<PortfolioItemType[]>(portfolioItems);

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    if (category === "All") {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(portfolioItems.filter(item => item.category === category));
    }
  };

  return (
    <div className="pt-24 md:pt-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <PortfolioHero />

        {/* Filter Buttons */}
        <PortfolioFilters 
          filters={portfolioFilters}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />

        {/* Portfolio Grid */}
        <PortfolioGrid items={filteredItems} />

        {/* CTA Section */}
        <CtaSection
          title="Siap Mewujudkan Proyek Digital Anda?"
          description="Kami siap membantu mewujudkan ide dan kebutuhan digital Anda dengan solusi kreatif dan profesional sesuai standar industri."
          buttonText="Diskusikan Proyek Anda"
          buttonLink="/kontak"
        />
      </div>
    </div>
  );
};

export default Portofolio;
