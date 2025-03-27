
import React from 'react';

const TeamSection = () => {
  const teamMembers = [
    {
      name: 'Andi Wijaya',
      role: 'CEO & Founder',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Lebih dari 10 tahun pengalaman di industri digital dengan fokus pada pengembangan strategi bisnis digital.'
    },
    {
      name: 'Maya Sari',
      role: 'Creative Director',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Spesialis desain dan branding dengan portfolio internasional dan penghargaan di bidang desain kreatif.'
    },
    {
      name: 'Budi Santoso',
      role: 'Tech Lead',
      image: 'https://randomuser.me/api/portraits/men/68.jpg',
      bio: 'Pengembang senior dengan keahlian dalam teknologi web dan mobile, serta implementasi sistem terintegrasi.'
    },
    {
      name: 'Lina Oktaviani',
      role: 'Digital Marketing Strategist',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      bio: 'Ahli strategi pemasaran digital dengan fokus pada kampanye berbasis data dan pertumbuhan organik.'
    }
  ];

  return (
    <div className="mb-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Tim Kami</h2>
        <div className="w-20 h-1 bg-digiblue-600 mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Kenali para ahli di balik DigiBooster yang membawa kreativitas, keahlian teknis, dan 
          dedikasi untuk setiap proyek yang kami tangani.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold mb-1 text-gray-900">{member.name}</h3>
              <p className="text-digiblue-600 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
