
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Users, ChevronRight, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { TrainingProgram } from '@/data/pelatihanData';

interface TrainingCardProps {
  program: TrainingProgram;
  index?: number;
}

const TrainingCard: React.FC<TrainingCardProps> = ({ program, index = 0 }) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    // In a real app, navigate to detailed page. For now, just log.
    console.log(`View details for ${program.title}`);
    // This would typically be something like:
    // navigate(`/pelatihan/${program.id}`);
  };
  
  const handleRegister = () => {
    navigate('/register');
  };
  
  // Generate a random rating between 4.5 and 5.0
  const rating = (4.5 + Math.random() * 0.5).toFixed(1);
  
  // Get badge color based on program type
  const getBadgeColor = () => {
    switch (program.type) {
      case 'shortclass':
        return 'bg-sky-500/20 text-sky-400 hover:bg-sky-500/30';
      case 'bootcamp':
        return 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30';
      case 'webinar':
        return 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30';
      default:
        return 'bg-sky-500/20 text-sky-400 hover:bg-sky-500/30';
    }
  };
  
  // Get type label in Indonesian
  const getTypeLabel = () => {
    switch (program.type) {
      case 'shortclass':
        return 'Short Class';
      case 'bootcamp':
        return 'Bootcamp';
      case 'webinar':
        return 'Webinar';
      default:
        return program.type;
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-gray-900/80 rounded-xl overflow-hidden flex flex-col h-full border border-gray-800 hover:border-sky-500/30 hover:shadow-lg hover:shadow-sky-500/5 transition-all"
    >
      {/* Image container */}
      <div className="h-48 relative overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Featured badge */}
        {program.featured && (
          <Badge className="absolute top-2 right-2 bg-amber-500 hover:bg-amber-600">
            Featured
          </Badge>
        )}
        
        {/* Type badge */}
        <Badge className={`absolute top-2 left-2 ${getBadgeColor()}`}>
          {getTypeLabel()}
        </Badge>
        
        {/* Rating */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-md">
          <Star className="h-3 w-3 text-yellow-500" fill="currentColor" />
          <span className="text-xs font-medium text-white">{rating}</span>
        </div>
        
        {/* Level badge */}
        <div className="absolute bottom-2 right-2">
          <Badge variant="outline" className="text-xs border-gray-700 bg-black/50">
            {program.details.level}
          </Badge>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-white mb-2 line-clamp-2">{program.title}</h3>
        
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{program.description}</p>
        
        <div className="flex flex-col gap-1 mb-3">
          <div className="flex items-center text-xs text-gray-400">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            <span>{program.details.duration}</span>
          </div>
          
          <div className="flex items-center text-xs text-gray-400">
            <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
            <span>{program.details.schedule}</span>
          </div>
          
          <div className="flex items-center text-xs text-gray-400">
            <Users className="h-3.5 w-3.5 mr-1.5" />
            <span>{program.details.participants}</span>
          </div>
        </div>
        
        <div className="text-sky-400 font-semibold mb-3">
          {program.details.price}
        </div>
        
        <div className="mt-auto flex flex-col gap-2">
          <Button 
            size="sm" 
            variant="outline"
            className="border-sky-500/50 hover:bg-sky-500/10 text-white flex items-center justify-center gap-1"
            onClick={handleViewDetails}
          >
            <span>Lihat Detail</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button 
            size="sm" 
            className="bg-sky-500 hover:bg-sky-600 font-medium"
            onClick={handleRegister}
          >
            Daftar Sekarang
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TrainingCard;
