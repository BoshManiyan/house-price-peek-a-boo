
import React from 'react';
import { Clock, DollarSign, Home, MapPin, BedDouble, Bath, IndianRupee } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Currency } from '@/pages/Index';

interface Prediction {
  id: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  location: string;
  timestamp: Date;
}

interface RecentPredictionsProps {
  predictions: Prediction[];
  currency: Currency;
}

const RecentPredictions = ({ predictions, currency }: RecentPredictionsProps) => {
  if (predictions.length === 0) return null;
  
  const formatPrice = (price: number) => {
    if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(price);
    } else {
      // Convert USD to INR (approximate exchange rate: 1 USD = 83 INR)
      const inrPrice = price * 83;
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(inrPrice);
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const CurrencyIcon = currency === 'USD' ? DollarSign : IndianRupee;
  
  return (
    <div className="house-card p-6 animate-fade-in">
      <div className="mb-6">
        <h2 className="text-xl font-bold flex items-center mb-2">
          <Clock className="mr-2 h-5 w-5 text-realestate-600" />
          Recent Predictions
        </h2>
        <p className="text-sm text-muted-foreground">
          Your recently calculated house price estimates
        </p>
      </div>
      
      <div className="space-y-4">
        {predictions.map((prediction) => (
          <Card key={prediction.id} className="overflow-hidden">
            <div className="flex">
              <div className="bg-gradient-to-br from-realestate-400 to-realestate-600 text-white p-4 flex items-center justify-center">
                <CurrencyIcon className="h-6 w-6" />
              </div>
              
              <div className="flex-1">
                <CardHeader className="p-3 pb-1">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-bold text-realestate-700">
                      {formatPrice(prediction.price)}
                    </CardTitle>
                    <CardDescription className="text-xs flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTime(prediction.timestamp)}
                    </CardDescription>
                  </div>
                </CardHeader>
                
                <CardContent className="p-3 pt-1">
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center">
                      <Home className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span>{prediction.sqft} sqft</span>
                    </div>
                    <div className="flex items-center">
                      <BedDouble className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span>{prediction.bedrooms} bed</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span>{prediction.bathrooms} bath</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="capitalize">{prediction.location}</span>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecentPredictions;
