
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const FeatureCard = ({ title, description, icon: Icon }: FeatureCardProps) => {
  return (
    <div className="house-card p-6 flex flex-col items-center text-center animate-fade-in">
      <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-realestate-600" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
