
import React from 'react';

const PortfolioHero = () => {
  return (
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
  );
};

export default PortfolioHero;
