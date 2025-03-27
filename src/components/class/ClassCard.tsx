
import React from 'react';
import { Class } from '@/types/classTypes';

interface ClassCardProps {
  classData: Class;
}

const ClassCard = ({ classData }: ClassCardProps) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
      <div className="bg-digiblue-50 p-6">
        <div className="w-16 h-16 rounded-lg bg-white flex items-center justify-center mb-4">
          {classData.icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-900">{classData.title}</h3>
        <p className="text-gray-600">{classData.description}</p>
      </div>
      
      <div className="p-6 border-b border-gray-100">
        <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Detail Kelas</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-gray-500">Durasi</p>
            <p className="text-sm font-medium">{classData.details.duration}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Peserta</p>
            <p className="text-sm font-medium">{classData.details.participants}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Level</p>
            <p className="text-sm font-medium">{classData.details.level}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Jadwal</p>
            <p className="text-sm font-medium">{classData.details.schedule}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Materi Kelas</h4>
        <ul className="space-y-2">
          {classData.topics.map((topic, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-digiblue-600 mr-2">•</span>
              <span className="text-gray-700 text-sm">{topic}</span>
            </li>
          ))}
        </ul>
        
        <button className="mt-6 w-full py-3 rounded-lg bg-digiblue-600 hover:bg-digiblue-700 text-white font-medium transition-colors">
          Daftar Kelas
        </button>
      </div>
    </div>
  );
};

export default ClassCard;
