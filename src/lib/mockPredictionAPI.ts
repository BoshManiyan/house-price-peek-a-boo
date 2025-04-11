
interface HouseFeatures {
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  location: string;
  yearBuilt: number;
  hasGarage: boolean;
  proximityToSchools: number;
  proximityToShops: number;
}

// Base price factors
const BASE_PRICE = 150000;
const PRICE_PER_SQFT = {
  urban: 250,
  suburban: 180,
  rural: 120
};

// Feature multipliers
const BEDROOM_FACTOR = 15000;
const BATHROOM_FACTOR = 12000;
const GARAGE_FACTOR = 25000;
const SCHOOL_PROXIMITY_FACTOR = 5000;
const SHOP_PROXIMITY_FACTOR = 3000;

// Age depreciation
const calculateAgeDepreciation = (yearBuilt: number): number => {
  const currentYear = new Date().getFullYear();
  const age = currentYear - yearBuilt;
  
  if (age <= 5) return 1.1; // New houses get premium
  if (age <= 15) return 1.0; // Recent houses maintain value
  if (age <= 30) return 0.9; // Older houses depreciate
  if (age <= 50) return 0.8; // Much older houses depreciate more
  return 0.7; // Very old houses
};

// Random factor to simulate market variations
const getRandomFactor = (): number => {
  return 0.9 + Math.random() * 0.2; // 0.9 to 1.1
};

// Calculate confidence based on input data quality
const calculateConfidence = (features: HouseFeatures): number => {
  // Simulate confidence based on feature completeness 
  // and sensible values
  let confidence = 0.85; // Base confidence
  
  // Reduce confidence for extreme values
  if (features.bedrooms > 7 || features.bedrooms < 1) confidence -= 0.1;
  if (features.bathrooms > 5 || features.bathrooms < 1) confidence -= 0.1;
  if (features.sqft > 5000 || features.sqft < 500) confidence -= 0.1;
  if (features.yearBuilt < 1900) confidence -= 0.1;
  
  // Ensure confidence is between 0.5 and 0.95
  return Math.max(0.5, Math.min(0.95, confidence));
};

export const predictHousePrice = async (features: HouseFeatures): Promise<{
  price: number;
  confidence: number;
}> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Calculate base price from square footage and location
  let price = BASE_PRICE + (features.sqft * PRICE_PER_SQFT[features.location as keyof typeof PRICE_PER_SQFT]);
  
  // Add factors for features
  price += features.bedrooms * BEDROOM_FACTOR;
  price += features.bathrooms * BATHROOM_FACTOR;
  price += features.hasGarage ? GARAGE_FACTOR : 0;
  price += features.proximityToSchools * SCHOOL_PROXIMITY_FACTOR;
  price += features.proximityToShops * SHOP_PROXIMITY_FACTOR;
  
  // Apply age depreciation
  price *= calculateAgeDepreciation(features.yearBuilt);
  
  // Apply random market factor
  price *= getRandomFactor();
  
  // Calculate confidence
  const confidence = calculateConfidence(features);
  
  // Return prediction
  return {
    price: Math.round(price),
    confidence
  };
};
