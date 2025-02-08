import React, { Suspense } from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import FileUpload from '@/components/FileUpload';

export const Hero: React.FC = () => (
  <div className="text-center max-w-4xl mx-auto mb-24 pt-24">
    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
      <Star className="h-4 w-4" />
      <span className="text-sm font-medium">New: Sentiment Analysis Feature</span>
    </div>
    <h1 className="text-6xl font-extrabold text-foreground mb-6 leading-tight">
      WhatsApp Chat <span className="text-primary bg-primary/10 px-4 py-2 rounded-xl">Analyzer</span>
    </h1>
    <p className="text-2xl text-secondary-foreground mb-12 leading-relaxed">
      Transform your WhatsApp conversations into meaningful insights with our advanced analytics tool
    </p>
    
    <Card className="p-10 backdrop-blur-sm border-primary/20">
      <CardContent>
        <Suspense fallback={
          <div className="h-32 flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
          </div>
        }>
          <FileUpload />
        </Suspense>
      </CardContent>
    </Card>
  </div>
);

export default Hero;