
import React, { useState } from 'react';
import { 
  BedDouble, 
  Bath, 
  Home, 
  MapPin, 
  Calendar, 
  Bike, 
  School, 
  ShoppingBag 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/components/ui/sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

interface PredictionFormProps {
  onPredict: (data: FormData) => void;
  isLoading: boolean;
}

const PredictionForm = ({ onPredict, isLoading }: PredictionFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1500,
    location: 'suburban',
    yearBuilt: 2000,
    hasGarage: true,
    proximityToSchools: 5,
    proximityToShops: 5
  });

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (formData.sqft <= 0) {
      toast("Square footage must be greater than 0");
      return;
    }
    
    onPredict(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="house-card p-6 animate-fade-in">
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <Home className="mr-2 h-5 w-5 text-realestate-600" />
        House Details
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="bedrooms" className="flex items-center">
              <BedDouble className="mr-2 h-4 w-4 text-muted-foreground" />
              Bedrooms
            </Label>
            <span className="text-sm font-medium">{formData.bedrooms}</span>
          </div>
          <Slider 
            id="bedrooms"
            min={1} 
            max={10} 
            step={1} 
            value={[formData.bedrooms]} 
            onValueChange={(value) => handleChange('bedrooms', value[0])}
            className="py-2"
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="bathrooms" className="flex items-center">
              <Bath className="mr-2 h-4 w-4 text-muted-foreground" />
              Bathrooms
            </Label>
            <span className="text-sm font-medium">{formData.bathrooms}</span>
          </div>
          <Slider 
            id="bathrooms"
            min={1} 
            max={7} 
            step={0.5} 
            value={[formData.bathrooms]} 
            onValueChange={(value) => handleChange('bathrooms', value[0])}
            className="py-2"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="sqft" className="flex items-center">
            <Home className="mr-2 h-4 w-4 text-muted-foreground" />
            Square Footage
          </Label>
          <Input 
            id="sqft"
            type="number" 
            value={formData.sqft} 
            onChange={(e) => handleChange('sqft', Number(e.target.value))}
            className="input-field"
            min={1}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
            Location
          </Label>
          <Select 
            value={formData.location} 
            onValueChange={(value) => handleChange('location', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="urban">Urban</SelectItem>
              <SelectItem value="suburban">Suburban</SelectItem>
              <SelectItem value="rural">Rural</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="yearBuilt" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            Year Built
          </Label>
          <Input 
            id="yearBuilt"
            type="number" 
            value={formData.yearBuilt} 
            onChange={(e) => handleChange('yearBuilt', Number(e.target.value))}
            className="input-field"
            min={1900}
            max={new Date().getFullYear()}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="hasGarage" className="flex items-center">
            <Bike className="mr-2 h-4 w-4 text-muted-foreground" />
            Garage
          </Label>
          <Select 
            value={formData.hasGarage ? "yes" : "no"} 
            onValueChange={(value) => handleChange('hasGarage', value === "yes")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Has garage?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="proximityToSchools" className="flex items-center">
              <School className="mr-2 h-4 w-4 text-muted-foreground" />
              Proximity to Schools (1-10)
            </Label>
            <span className="text-sm font-medium">{formData.proximityToSchools}</span>
          </div>
          <Slider 
            id="proximityToSchools"
            min={1} 
            max={10} 
            step={1} 
            value={[formData.proximityToSchools]} 
            onValueChange={(value) => handleChange('proximityToSchools', value[0])}
            className="py-2"
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="proximityToShops" className="flex items-center">
              <ShoppingBag className="mr-2 h-4 w-4 text-muted-foreground" />
              Proximity to Shops (1-10)
            </Label>
            <span className="text-sm font-medium">{formData.proximityToShops}</span>
          </div>
          <Slider 
            id="proximityToShops"
            min={1} 
            max={10} 
            step={1} 
            value={[formData.proximityToShops]} 
            onValueChange={(value) => handleChange('proximityToShops', value[0])}
            className="py-2"
          />
        </div>
      </div>
      
      <div className="mt-8 flex justify-center">
        <Button 
          type="submit" 
          className="gradient-button w-full md:w-auto px-8 py-3"
          disabled={isLoading}
        >
          {isLoading ? "Calculating..." : "Predict Price"}
        </Button>
      </div>
    </form>
  );
};

export default PredictionForm;
