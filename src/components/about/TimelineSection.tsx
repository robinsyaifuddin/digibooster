import React from 'react';
const TimelineSection = () => {
  const milestones = [{
    year: '2018',
    title: 'Pendirian DigiBooster',
    description: 'Diawali sebagai konsultan digital untuk bisnis kecil dan menengah.'
  }, {
    year: '2019',
    title: 'Ekspansi Layanan',
    description: 'Menambahkan layanan pengembangan website dan aplikasi mobile ke portofolio.'
  }, {
    year: '2020',
    title: 'Program Edukasi Digital',
    description: 'Meluncurkan program pelatihan dan mentoring untuk pendidikan digital.'
  }, {
    year: '2021',
    title: 'Penghargaan Industri',
    description: 'Menerima penghargaan sebagai Digital Agency Terbaik untuk UKM.'
  }, {
    year: '2022',
    title: 'Ekspansi Tim',
    description: 'Mengembangkan tim menjadi 15+ spesialis digital di berbagai bidang.'
  }, {
    year: '2023',
    title: 'Inovasi Layanan',
    description: 'Meluncurkan layanan baru dengan fokus pada integrasi AI dan automasi digital.'
  }];
  return <div className="mb-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Perjalanan Kami</h2>
        <div className="w-20 h-1 bg-digiblue-600 mx-auto"></div>
      </div>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-digiblue-100"></div>
        
        <div className="space-y-12">
          {milestones.map((milestone, index) => <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
              <div className="flex-1"></div>
              
              {/* Timeline point */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-digiblue-600 border-4 border-white z-10"></div>
              
              <div className="flex-1 bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow mx-6 md:mx-12">
                <div className="text-digiblue-600 font-bold text-xl mb-2">{milestone.year}</div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{milestone.title}</h3>
                <p className="text-gray-600">{milestone.description}</p>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
export default TimelineSection;