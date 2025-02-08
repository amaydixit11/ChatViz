import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FeatureProps } from '@/types/home';

export const Feature: React.FC<FeatureProps> = ({ icon: Icon, title, description }) => (
  <Card className="group relative overflow-hidden">
    <CardContent className="p-8">
      <div className="absolute -right-20 -top-20 h-40 w-40 bg-primary/5 rounded-full" />
      <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6 transform transition-transform group-hover:scale-110 relative">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
      <p className="text-secondary-foreground leading-relaxed">{description}</p>
      <div className="absolute bottom-0 left-0 h-1 bg-primary/20 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </CardContent>
  </Card>
);

export default Feature;