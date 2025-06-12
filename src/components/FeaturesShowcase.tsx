
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { MessageSquare, Pen, Rocket, Gavel } from 'lucide-react';

export const FeaturesShowcase: React.FC = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Smart Legal Consultation",
      description: "AI-guided answers on Nigerian startup law with real-time legal research and citation verification."
    },
    {
      icon: Pen,
      title: "Document Automation",
      description: "Generate CAC-compliant templates: Shareholder Agreements, Employment Contracts, MEMART forms."
    },
    {
      icon: Rocket,
      title: "CAC Registration Assistant",
      description: "Step-by-step guidance: Name Reservation → Document Prep → Submission → Post-Registration."
    },
    {
      icon: Gavel,
      title: "Dispute Resolution Tools",
      description: "Cost calculators, mediation vs litigation comparisons, and conflict resolution strategies."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Comprehensive Legal Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything Nigerian startups need to navigate legal complexities with confidence
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
