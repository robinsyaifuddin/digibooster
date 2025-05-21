
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TrainingCard from './TrainingCard';
import { TrainingProgram } from '@/data/pelatihanData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Laptop, Users, Video } from 'lucide-react';

interface TrainingGridProps {
  programs: TrainingProgram[];
}

const TrainingGrid: React.FC<TrainingGridProps> = ({ programs }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // Filter programs based on the active tab
  const filteredPrograms = activeTab === 'all' 
    ? programs 
    : programs.filter(program => program.type === activeTab);
  
  return (
    <div className="py-8">
      <Tabs 
        defaultValue="all" 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 max-w-lg mx-auto mb-8">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-sky-500 data-[state=active]:text-white"
          >
            Semua
          </TabsTrigger>
          <TabsTrigger 
            value="shortclass"
            className="data-[state=active]:bg-sky-500 data-[state=active]:text-white flex items-center gap-2"
          >
            <Laptop className="h-4 w-4" />
            <span className="hidden sm:inline">Short Class</span>
          </TabsTrigger>
          <TabsTrigger 
            value="bootcamp"
            className="data-[state=active]:bg-purple-500 data-[state=active]:text-white flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Bootcamp</span>
          </TabsTrigger>
          <TabsTrigger 
            value="webinar"
            className="data-[state=active]:bg-amber-500 data-[state=active]:text-white flex items-center gap-2"
          >
            <Video className="h-4 w-4" />
            <span className="hidden sm:inline">Webinar</span>
          </TabsTrigger>
        </TabsList>
      
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program, index) => (
              <TrainingCard key={program.id} program={program} index={index} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="shortclass" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program, index) => (
              <TrainingCard key={program.id} program={program} index={index} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="bootcamp" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program, index) => (
              <TrainingCard key={program.id} program={program} index={index} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="webinar" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program, index) => (
              <TrainingCard key={program.id} program={program} index={index} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrainingGrid;
