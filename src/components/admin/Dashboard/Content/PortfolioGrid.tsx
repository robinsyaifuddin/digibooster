
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";

interface PortfolioProps {
  id: number;
  title: string;
  category: string;
  client: string;
}

interface PortfolioGridProps {
  portfolios: PortfolioProps[];
}

const PortfolioGrid = ({ portfolios }: PortfolioGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {portfolios.map((portfolio) => (
        <Card key={portfolio.id} className="hover:shadow-md transition-shadow">
          <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
            <PenSquare className="w-8 h-8 text-gray-400" />
          </div>
          <CardHeader>
            <CardTitle className="text-base">{portfolio.title}</CardTitle>
            <CardDescription>
              Client: {portfolio.client}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
              {portfolio.category}
            </span>
            <div>
              <Button variant="ghost" size="sm">Edit</Button>
              <Button variant="ghost" size="sm" className="text-red-600">Hapus</Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PortfolioGrid;
