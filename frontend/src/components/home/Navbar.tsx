import React from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

export const Navbar: React.FC = () => (
  <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50 border-b border-border">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <span className="text-xl font-bold text-primary">ChatViz</span>
        <div className="hidden md:flex gap-6">
          <Button variant="ghost">Features</Button>
          <Button variant="ghost">Pricing</Button>
          <Button variant="ghost">Documentation</Button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button>Sign In</Button>
      </div>
    </div>
  </nav>
);

export default Navbar;