
import React, { useState } from 'react';
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
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <span className="inline-block py-1 px-3 text-xs font-medium text-digiblue-600 bg-digiblue-100 rounded-full mb-3">KARYA KAMI</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            Portofolio <span className="text-digiblue-600">Proyek Digital</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Kumpulan karya dan proyek digital yang telah kami kerjakan untuk berbagai klien
            di berbagai industri dengan hasil yang memuaskan.
          </p>
        </div>

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
