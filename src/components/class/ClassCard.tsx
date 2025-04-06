
import React from 'react';
import { Class } from '@/types/classTypes';
import { motion } from 'framer-motion';

interface ClassCardProps {
  classData: Class;
}

const ClassCard = ({ classData }: ClassCardProps) => {
  return (
    <div className="bg-dark-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-dark-400 group relative">
      <div className="absolute inset-0 bg-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="bg-dark-300 p-6">
        <div className="w-16 h-16 rounded-lg bg-dark-200 flex items-center justify-center mb-4 border border-neon-purple/30 group-hover:border-neon-purple/60 transition-colors">
          <div className="text-neon-purple group-hover:scale-110 transition-transform">
            {classData.icon}
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2 text-white">{classData.title}</h3>
        <p className="text-gray-400">{classData.description}</p>
      </div>
      
      <div className="p-6 border-b border-dark-400">
        <h4 className="text-sm font-semibold text-gray-400 uppercase mb-3">Detail Kelas</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-gray-500">Durasi</p>
            <p className="text-sm font-medium text-gray-300">{classData.details.duration}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Peserta</p>
            <p className="text-sm font-medium text-gray-300">{classData.details.participants}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Level</p>
            <p className="text-sm font-medium text-gray-300">{classData.details.level}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Jadwal</p>
            <p className="text-sm font-medium text-gray-300">{classData.details.schedule}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h4 className="text-sm font-semibold text-gray-400 uppercase mb-3">Materi Kelas</h4>
        <ul className="space-y-2">
          {classData.topics.map((topic, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-neon-purple mr-2">•</span>
              <span className="text-gray-300 text-sm">{topic}</span>
            </li>
          ))}
        </ul>
        
        <button className="mt-6 w-full py-3 rounded-lg bg-neon-purple hover:bg-neon-violet text-white font-medium transition-colors group-hover:animate-pulse-light">
          Daftar Kelas
        </button>
      </div>
    </div>
  );
};

export default ClassCard;
