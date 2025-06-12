
import React, { useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { FeaturesShowcase } from '../components/FeaturesShowcase';
import { LegalKnowledgeBase } from '../components/LegalKnowledgeBase';
import { DocumentGenerator } from '../components/DocumentGenerator';
import { RegistrationAssistant } from '../components/RegistrationAssistant';
import { Footer } from '../components/Footer';
import { ChatWidget } from '../components/ChatWidget';

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onOpenChat={() => setIsChatOpen(true)} />
      <FeaturesShowcase />
      <LegalKnowledgeBase />
      <DocumentGenerator />
      <RegistrationAssistant />
      <Footer />
      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Index;
