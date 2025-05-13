import React from 'react';
import { Target, Star, CheckCircle, Users } from 'lucide-react';
const ValuesSection = () => {
  const values = [{
    icon: <Target className="h-10 w-10 text-digiblue-600" />,
    title: 'Berorientasi Hasil',
    description: 'Kami fokus pada pencapaian hasil nyata yang terukur dan memberikan dampak positif bagi bisnis klien.'
  }, {
    icon: <Star className="h-10 w-10 text-digiblue-600" />,
    title: 'Keunggulan Kualitas',
    description: 'Kami berkomitmen untuk memberikan layanan dan solusi dengan standar kualitas tertinggi tanpa kompromi.'
  }, {
    icon: <CheckCircle className="h-10 w-10 text-digiblue-600" />,
    title: 'Integritas',
    description: 'Kami menjalankan bisnis dengan kejujuran, transparansi, dan etika profesional yang tinggi.'
  }, {
    icon: <Users className="h-10 w-10 text-digiblue-600" />,
    title: 'Kolaborasi',
    description: 'Kami percaya bahwa kerja sama yang baik antara tim dan klien menghasilkan solusi terbaik.'
  }];
  return <div className="mb-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Nilai-Nilai Kami</h2>
        <div className="w-20 h-1 bg-digiblue-600 mx-auto"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((value, index) => <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
            <div className="bg-digiblue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              {value.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
            <p className="text-gray-600">{value.description}</p>
          </div>)}
      </div>
    </div>;
};
export default ValuesSection;