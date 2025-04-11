
import React from 'react';
import { DollarSign, TrendingUp, Home, Ruler, BedDouble, Bath } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ResultDisplayProps {
  price: number | null;
  features: {
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    location: string;
  };
  confidence: number;
}

const ResultDisplay = ({ price, features, confidence }: ResultDisplayProps) => {
  if (price === null) return null;
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  const priceRange = {
    low: price * 0.95,
    high: price * 1.05
  };
  
  return (
    <div className="house-card p-6 animate-fade-in">
      <div className="mb-6">
        <h2 className="text-xl font-bold flex items-center mb-2">
          <DollarSign className="mr-2 h-5 w-5 text-realestate-600" />
          Estimated Price
        </h2>
        <p className="text-sm text-muted-foreground">
          Based on current market trends and similar properties
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-realestate-50 to-realestate-100 rounded-xl p-6 mb-6">
        <div className="text-center">
          <span className="text-3xl md:text-5xl font-bold text-realestate-800">
            {formatPrice(price)}
          </span>
          <div className="flex items-center justify-center mt-3 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4 mr-1 text-realestate-600" />
            <span>Confidence: {Math.round(confidence * 100)}%</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between text-xs md:text-sm text-muted-foreground">
          <span>Range: {formatPrice(priceRange.low)}</span>
          <span>to {formatPrice(priceRange.high)}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="p-3">
            <CardTitle className="text-sm flex items-center">
              <Home className="h-4 w-4 mr-1 text-muted-foreground" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <p className="font-medium capitalize">{features.location}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-3">
            <CardTitle className="text-sm flex items-center">
              <Ruler className="h-4 w-4 mr-1 text-muted-foreground" />
              Size
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <p className="font-medium">{features.sqft} sqft</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-3">
            <CardTitle className="text-sm flex items-center">
              <BedDouble className="h-4 w-4 mr-1 text-muted-foreground" />
              Bedrooms
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <p className="font-medium">{features.bedrooms}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-3">
            <CardTitle className="text-sm flex items-center">
              <Bath className="h-4 w-4 mr-1 text-muted-foreground" />
              Bathrooms
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <p className="font-medium">{features.bathrooms}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultDisplay;
