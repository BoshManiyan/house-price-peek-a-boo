
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Sparkles, TrendingUp, Search, Presentation, Cpu } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

import Header from '@/components/Header';
import PredictionForm from '@/components/PredictionForm';
import ResultDisplay from '@/components/ResultDisplay';
import RecentPredictions from '@/components/RecentPredictions';
import FeatureCard from '@/components/FeatureCard';
import { predictHousePrice } from '@/lib/mockPredictionAPI';

interface FormData {
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  location: string;
  yearBuilt: number;
  hasGarage: boolean;
  proximityToSchools: number;
  proximityToShops: number;
}

interface Prediction {
  id: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  location: string;
  timestamp: Date;
}

const Index = () => {
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [confidence, setConfidence] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentFeatures, setCurrentFeatures] = useState<FormData | null>(null);
  const [recentPredictions, setRecentPredictions] = useState<Prediction[]>([]);
  
  const handlePredict = async (formData: FormData) => {
    setIsLoading(true);
    
    try {
      const result = await predictHousePrice(formData);
      setPredictedPrice(result.price);
      setConfidence(result.confidence);
      setCurrentFeatures(formData);
      
      // Add to recent predictions
      const newPrediction: Prediction = {
        id: uuidv4(),
        price: result.price,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        sqft: formData.sqft,
        location: formData.location,
        timestamp: new Date()
      };
      
      setRecentPredictions(prev => [newPrediction, ...prev].slice(0, 5));
      
      toast("Price prediction complete!", {
        description: "Based on the provided details, we've calculated an estimate."
      });
    } catch (error) {
      console.error("Prediction error:", error);
      toast("Error calculating price", {
        description: "There was a problem processing your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-realestate-50 to-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-realestate-800 to-realestate-600 bg-clip-text text-transparent">
            Predict House Prices with AI
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Get accurate house price estimates using our advanced machine learning model.
            Simply enter your house details and get an instant prediction.
          </p>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <FeatureCard 
            title="AI-Powered"
            description="Advanced algorithms that learn from market trends to deliver accurate predictions"
            icon={Sparkles}
          />
          <FeatureCard 
            title="Market Insights"
            description="Incorporates local market data to provide context-specific estimates"
            icon={TrendingUp}
          />
          <FeatureCard 
            title="Detailed Analysis"
            description="Consider multiple factors including location, size, and amenities"
            icon={Search}
          />
          <FeatureCard 
            title="User Friendly"
            description="Simple interface that makes house price prediction accessible to everyone"
            icon={Presentation}
          />
        </section>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PredictionForm onPredict={handlePredict} isLoading={isLoading} />
            
            {isLoading && (
              <div className="mt-8 text-center">
                <div className="inline-flex items-center px-4 py-3 bg-white rounded-lg shadow-md animate-pulse-light">
                  <Cpu className="h-5 w-5 mr-2 text-realestate-600 animate-spin" />
                  <span className="text-sm font-medium">
                    AI is calculating the optimal price...
                  </span>
                </div>
              </div>
            )}
            
            {predictedPrice !== null && currentFeatures && (
              <div className="mt-8">
                <ResultDisplay 
                  price={predictedPrice} 
                  features={{
                    bedrooms: currentFeatures.bedrooms,
                    bathrooms: currentFeatures.bathrooms,
                    sqft: currentFeatures.sqft,
                    location: currentFeatures.location
                  }}
                  confidence={confidence}
                />
              </div>
            )}
          </div>
          
          <div>
            <RecentPredictions predictions={recentPredictions} />
            
            {recentPredictions.length === 0 && (
              <div className="house-card p-6 h-full flex flex-col items-center justify-center text-center">
                <div className="bg-secondary h-16 w-16 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-realestate-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No Recent Predictions</h3>
                <p className="text-muted-foreground text-sm">
                  Your prediction history will appear here once you start making predictions.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="mt-16 py-6 border-t border-border bg-white/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 House Price Peek-a-boo. Powered by AI.</p>
          <p className="mt-2">This is a demo application. Predictions are for illustrative purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
