import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { StepCardProps } from '@/types/home';

export const StepCard: React.FC<StepCardProps> = ({ step, title, description }) => (
  <div className="relative">
    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
        {step}
      </div>
    </div>
    <Card className="pt-8 pb-6 px-6 text-center hover:border-primary/50 transition-colors duration-300">
      <CardContent>
        <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
        <p className="text-secondary-foreground">{description}</p>
      </CardContent>
    </Card>
  </div>
);

export default StepCard;