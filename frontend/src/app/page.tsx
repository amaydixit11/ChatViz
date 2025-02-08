import React from 'react';
import Navbar from '@/components/home/Navbar';
import Hero from '@/components/home/Hero';
import Feature from '@/components/home/Feature';
import StepCard from '@/components/home/StepCard';
import Testimonial from '@/components/home/Testimonial';
import PricingCard from '@/components/home/PricingCard';
import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import { features, steps, testimonials, pricingTiers } from '@/data/homeData';

const Home: React.FC = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(147,51,234,0.1),transparent)]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <Navbar />

        {/* Privacy Notice */}
        <div className="text-center">
          <Card className="inline-block">
            <CardContent className="flex items-center justify-center px-6 py-4">
              <Shield className="w-5 h-5 mr-3 text-primary" />
              <span className="text-sm font-medium">Your data is processed locally - we never store your chat history</span>
            </CardContent>
          </Card>
        </div>
        <Hero />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>

        {/* How It Works */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step) => (
              <StepCard key={step.step} {...step} />
            ))}
          </div>
        </div>

        {/* Testimonials */}
        {/* <div className="mb-32">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Testimonial key={index} {...testimonial} />
            ))}
          </div>
        </div> */}

        {/* Pricing */}
        {/* <div className="mb-32">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16">Simple Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <PricingCard key={index} {...tier} />
            ))}
          </div>
        </div> */}

      </div>
    </main>
  );
};

export default Home;