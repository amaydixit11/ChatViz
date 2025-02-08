import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { TestimonialProps } from '@/types/home';

export const Testimonial: React.FC<TestimonialProps> = ({ text, author, role }) => (
  <Card className="p-6 hover:border-primary/50 transition-colors duration-300">
    <CardContent>
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star key={n} className="h-4 w-4 fill-primary text-primary" />
        ))}
      </div>
      <p className="text-secondary-foreground mb-4 italic">"{text}"</p>
      <div>
        <p className="font-semibold text-foreground">{author}</p>
        <p className="text-sm text-secondary-foreground">{role}</p>
      </div>
    </CardContent>
  </Card>
);

export default Testimonial;