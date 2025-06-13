import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowRight, Building, User, TrendingUp, CheckCircle } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

type UserType = 'founder' | 'lawyer' | 'investor';
type Stage = 'ideation' | 'pre-seed' | 'seed' | 'scaling';
type Priority = 'registration' | 'contracts' | 'funding' | 'compliance';

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [stage, setStage] = useState<Stage | null>(null);
  const [priorities, setPriorities] = useState<Priority[]>([]);

  const handlePriorityToggle = (priority: Priority) => {
    setPriorities(prev => 
      prev.includes(priority) 
        ? prev.filter(p => p !== priority)
        : [...prev, priority]
    );
  };

  const handleComplete = () => {
    // Store user preferences
    localStorage.setItem('startupgpt_user_data', JSON.stringify({
      userType,
      stage,
      priorities
    }));
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-2xl">
        {/* Logo - Compact for mobile */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <img 
            src="/lovable-uploads/81864f48-4da2-4487-86ea-0757c50afeee.png" 
            alt="StartupGPT" 
            className="h-10 sm:h-12 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-4"
          />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 sm:mb-2">
            Welcome to StartupGPT
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg px-2">
            Your AI Legal Partner for Nigerian Startup Success
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center p-4 sm:p-6">
            {/* Compact progress indicators */}
            <div className="flex justify-center space-x-1 sm:space-x-2 mb-3 sm:mb-4">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                    step >= num 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step > num ? <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" /> : num}
                </div>
              ))}
            </div>
            <CardTitle className="text-lg sm:text-xl md:text-2xl">
              {step === 1 && "Tell us about yourself"}
              {step === 2 && "What's your startup stage?"}
              {step === 3 && "What are your priorities?"}
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              {step === 1 && "Help us personalize your experience"}
              {step === 2 && "We'll tailor our guidance to your needs"}
              {step === 3 && "Choose what matters most to you right now"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3 sm:space-y-4 md:space-y-6 p-4 sm:p-6">
            {step === 1 && (
              <div className="grid gap-2 sm:gap-3 md:gap-4">
                {[
                  { type: 'founder' as UserType, icon: User, title: 'Startup Founder', desc: 'Building or planning to build a startup' },
                  { type: 'lawyer' as UserType, icon: Building, title: 'Legal Professional', desc: 'Providing legal services to startups' },
                  { type: 'investor' as UserType, icon: TrendingUp, title: 'Investor', desc: 'Investing in Nigerian startups' }
                ].map(({ type, icon: Icon, title, desc }) => (
                  <Card 
                    key={type}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      userType === type ? 'ring-2 ring-primary bg-primary/5' : ''
                    }`}
                    onClick={() => setUserType(type)}
                  >
                    <CardContent className="flex items-center p-3 sm:p-4">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary mr-3 sm:mr-4 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-sm sm:text-base">{title}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-2 sm:gap-3 md:gap-4">
                {[
                  { stage: 'ideation' as Stage, title: 'Ideation', desc: 'Early idea stage, researching market' },
                  { stage: 'pre-seed' as Stage, title: 'Pre-Seed', desc: 'Building MVP, seeking initial funding' },
                  { stage: 'seed' as Stage, title: 'Seed', desc: 'Product launched, growing user base' },
                  { stage: 'scaling' as Stage, title: 'Scaling', desc: 'Established business, expanding rapidly' }
                ].map(({ stage: stageType, title, desc }) => (
                  <Card 
                    key={stageType}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      stage === stageType ? 'ring-2 ring-primary bg-primary/5' : ''
                    }`}
                    onClick={() => setStage(stageType)}
                  >
                    <CardContent className="p-3 sm:p-4">
                      <h3 className="font-semibold text-sm sm:text-base">{title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-3 sm:space-y-4">
                <p className="text-xs sm:text-sm text-muted-foreground text-center">Select all that apply:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                  {[
                    { priority: 'registration' as Priority, title: 'CAC Registration', desc: 'Company incorporation' },
                    { priority: 'contracts' as Priority, title: 'Legal Contracts', desc: 'Agreements & templates' },
                    { priority: 'funding' as Priority, title: 'Funding & Investment', desc: 'Equity & legal docs' },
                    { priority: 'compliance' as Priority, title: 'Regulatory Compliance', desc: 'Laws & regulations' }
                  ].map(({ priority, title, desc }) => (
                    <Card 
                      key={priority}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        priorities.includes(priority) ? 'ring-2 ring-primary bg-primary/5' : ''
                      }`}
                      onClick={() => handlePriorityToggle(priority)}
                    >
                      <CardContent className="p-3 sm:p-4 text-center">
                        <h3 className="font-semibold text-xs sm:text-sm">{title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                        {priorities.includes(priority) && (
                          <Badge className="mt-1.5 sm:mt-2 bg-primary text-xs">Selected</Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation buttons - responsive */}
            <div className="flex justify-between pt-4 sm:pt-6 gap-3">
              {step > 1 && (
                <Button 
                  variant="outline" 
                  onClick={() => setStep(step - 1)}
                  className="text-sm sm:text-base px-3 sm:px-4 py-2 h-9 sm:h-10"
                >
                  Back
                </Button>
              )}
              
              <div className="ml-auto">
                {step < 3 ? (
                  <Button 
                    onClick={() => setStep(step + 1)}
                    disabled={
                      (step === 1 && !userType) || 
                      (step === 2 && !stage)
                    }
                    className="text-sm sm:text-base px-3 sm:px-4 py-2 h-9 sm:h-10"
                  >
                    Next <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleComplete}
                    disabled={priorities.length === 0}
                    className="bg-primary hover:bg-primary/90 text-sm sm:text-base px-3 sm:px-4 py-2 h-9 sm:h-10"
                  >
                    Get Started <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
