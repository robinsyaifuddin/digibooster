
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenSquare, Trash2, ExternalLink } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface PortfolioProps {
  id: number;
  title: string;
  category: string;
  client: string;
  image?: string;
}

interface PortfolioGridProps {
  portfolios: PortfolioProps[];
}

const PortfolioGrid = ({ portfolios }: PortfolioGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {portfolios.map((portfolio) => (
        <Card key={portfolio.id} className="hover:shadow-md transition-shadow overflow-hidden">
          <div className="relative">
            <AspectRatio ratio={16/9}>
              {portfolio.image ? (
                <img 
                  src={portfolio.image} 
                  alt={portfolio.title} 
                  className="w-full h-full object-cover rounded-t-lg"
                />
              ) : (
                <div className="h-full bg-gray-200 rounded-t-lg flex items-center justify-center">
                  <PenSquare className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            </AspectRatio>
            <div className="absolute top-2 right-2 z-10">
              <span className="bg-primary/80 text-white text-xs px-2 py-1 rounded-full shadow-md backdrop-blur-sm">
                {portfolio.category}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 backdrop-blur-sm z-10">
              <h3 className="text-base font-medium text-white line-clamp-1 drop-shadow-lg">{portfolio.title}</h3>
              <p className="text-sm text-gray-300 drop-shadow-lg">{portfolio.client}</p>
            </div>
          </div>
          <CardHeader className="bg-black/5">
            <CardTitle className="text-base line-clamp-1 drop-shadow-sm">{portfolio.title}</CardTitle>
            <CardDescription className="drop-shadow-sm">
              Client: {portfolio.client}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between bg-black/5">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <ExternalLink className="w-4 h-4" />
              <span>Lihat</span>
            </Button>
            <div className="space-x-2">
              <Button variant="ghost" size="sm">Edit</Button>
              <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-100 hover:text-red-700">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PortfolioGrid;
