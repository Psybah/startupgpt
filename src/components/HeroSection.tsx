
import React from 'react';
import { Button } from './ui/button';
import { MessageSquare, Rocket } from 'lucide-react';

interface HeroSectionProps {
  onOpenChat: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenChat }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center nigerian-pattern">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/lovable-uploads/81864f48-4da2-4487-86ea-0757c50afeee.png" 
              alt="StartupGPT Logo" 
              className="h-20 mx-auto mb-6"
            />
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Your AI Legal Partner for{' '}
            <span className="text-primary">Nigerian Startup Success</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Navigate CAC registration, equity splits, compliance & contracts with AI guidance
          </p>
          
          {/* CTA Button */}
          <Button 
            onClick={onOpenChat}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4 mb-12"
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Ask Legal Questions Now
          </Button>
          
          {/* Trust Indicators */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex items-center space-x-2">
              <Rocket className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">Backed by Nigerian Legal Experts</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                <span className="text-sm font-semibold text-secondary">CAC Compliant</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                <span className="text-sm font-semibold text-secondary">SEC Approved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
