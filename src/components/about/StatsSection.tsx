
import React from 'react';
import { Trophy, Users, Globe, Calendar } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    { icon: <Trophy />, value: '50+', label: 'Penghargaan' },
    { icon: <Users />, value: '300+', label: 'Klien Puas' },
    { icon: <Globe />, value: '100+', label: 'Proyek Selesai' },
    { icon: <Calendar />, value: '5+', label: 'Tahun Pengalaman' }
  ];

  return (
    <div className="bg-gradient-to-r from-digiblue-800 to-digiblue-600 rounded-2xl p-10 md:p-16 mb-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="text-white">
            <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              {stat.icon}
            </div>
            <div className="text-4xl font-bold mb-2">{stat.value}</div>
            <div className="text-digiblue-200">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
