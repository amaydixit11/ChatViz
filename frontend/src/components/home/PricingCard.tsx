import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PricingCardProps } from '@/types/home';

export const PricingCard: React.FC<PricingCardProps> = ({ title, price, features, recommended = false }) => (
  <Card className={`relative ${recommended ? 'border-primary' : ''}`}>
    {recommended && (
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
        <span className="bg-primary text-primary-foreground text-sm px-4 py-1 rounded-full">
          Recommended
        </span>
      </div>
    )}
    <CardContent className="p-6">
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">{price}</span>
        {price !== 'Free' && <span className="text-secondary-foreground">/month</span>}
      </div>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" />
            <span className="text-secondary-foreground">{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="w-full mt-6" variant={recommended ? 'default' : 'outline'}>
        Get Started <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </CardContent>
  </Card>
);

export default PricingCard;