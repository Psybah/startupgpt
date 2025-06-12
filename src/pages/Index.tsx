
import React, { useState, useEffect } from 'react';
import { OnboardingFlow } from '../components/onboarding/OnboardingFlow';
import { AppSidebar } from '../components/AppSidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '../components/ui/sidebar';
import { ChatInterface } from '../components/chat/ChatInterface';
import { DocumentGeneratorTab } from '../components/tabs/DocumentGeneratorTab';
import { KnowledgeBaseTab } from '../components/tabs/KnowledgeBaseTab';
import { Menu } from 'lucide-react';

export type TabType = 'chat' | 'documents' | 'knowledge';

const Index = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('chat');

  useEffect(() => {
    const onboardingStatus = localStorage.getItem('startupgpt_onboarding_completed');
    if (onboardingStatus === 'true') {
      setHasCompletedOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('startupgpt_onboarding_completed', 'true');
    setHasCompletedOnboarding(true);
  };

  if (!hasCompletedOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatInterface />;
      case 'documents':
        return <DocumentGeneratorTab />;
      case 'knowledge':
        return <KnowledgeBaseTab />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background font-clash">
        <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <SidebarInset className="flex-1">
          {/* Mobile header with sidebar trigger */}
          <div className="md:hidden flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center space-x-3">
              <SidebarTrigger className="h-8 w-8" />
              <img 
                src="/lovable-uploads/81864f48-4da2-4487-86ea-0757c50afeee.png" 
                alt="StartupGPT" 
                className="h-6 w-6" 
              />
              <h1 className="font-clash font-bold text-lg text-primary">StartupGPT</h1>
            </div>
          </div>
          
          {/* Main content area */}
          <main className="flex-1 flex flex-col h-full min-h-0">
            {renderActiveTab()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
