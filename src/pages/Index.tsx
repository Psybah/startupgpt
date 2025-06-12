
import React, { useState, useEffect } from 'react';
import { OnboardingFlow } from '../components/onboarding/OnboardingFlow';
import { AppSidebar } from '../components/AppSidebar';
import { SidebarProvider } from '../components/ui/sidebar';
import { ChatInterface } from '../components/chat/ChatInterface';
import { DocumentGeneratorTab } from '../components/tabs/DocumentGeneratorTab';
import { KnowledgeBaseTab } from '../components/tabs/KnowledgeBaseTab';

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
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 flex flex-col">
          {renderActiveTab()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
