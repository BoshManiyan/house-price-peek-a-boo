
import React from 'react';
import { Home, BarChart2 } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b border-border bg-white/70 backdrop-blur-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Home className="h-6 w-6 text-realestate-600" />
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-realestate-800 to-realestate-600 bg-clip-text text-transparent">
            House Price Peek-a-boo
          </h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <BarChart2 className="h-5 w-5 text-realestate-600" />
          <span className="hidden md:inline text-sm font-medium text-muted-foreground">
            Smart Predictions
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
