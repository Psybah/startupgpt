
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle, Circle, Clock, ArrowRight } from 'lucide-react';

export const RegistrationAssistant: React.FC = () => {
  const [currentStage, setCurrentStage] = useState(0);

  const registrationStages = [
    {
      id: 'pre-reg',
      title: 'Pre-Registration',
      description: 'Prepare for company registration',
      status: 'completed',
      tasks: [
        'Choose company name (3 alternatives)',
        'Define business objectives',
        'Agree on shareholding structure',
        'Prepare founders agreement'
      ]
    },
    {
      id: 'name-reservation',
      title: 'Name Reservation',
      description: 'Reserve your company name with CAC',
      status: 'current',
      tasks: [
        'Conduct name search (₦500)',
        'Submit name reservation application',
        'Await CAC approval (1-2 days)',
        'Receive name reservation certificate'
      ]
    },
    {
      id: 'cac-submission',
      title: 'CAC Submission',
      description: 'Submit incorporation documents',
      status: 'pending',
      tasks: [
        'Complete CAC 1.1 Form',
        'Prepare MEMART document',
        'Submit incorporation package',
        'Pay incorporation fees'
      ]
    },
    {
      id: 'post-reg',
      title: 'Post-Registration',
      description: 'Complete compliance requirements',
      status: 'pending',
      tasks: [
        'Obtain Tax Identification Number (TIN)',
        'Register for VAT (if applicable)',
        'NSITF registration',
        'Open corporate bank account'
      ]
    },
    {
      id: 'active',
      title: 'Active Company',
      description: 'Company is fully operational',
      status: 'pending',
      tasks: [
        'Set up accounting system',
        'Implement board governance',
        'Maintain statutory records',
        'Annual compliance planning'
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'current':
        return <Clock className="h-5 w-5 text-primary" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'current':
        return 'bg-primary/10 text-primary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            CAC Registration Assistant
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Step-by-step guidance through the Nigerian company registration process
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Progress Timeline */}
          <div className="flex items-center justify-center mb-12 overflow-x-auto pb-4">
            {registrationStages.map((stage, index) => (
              <div key={stage.id} className="flex items-center flex-shrink-0">
                <div className="flex flex-col items-center text-center min-w-[200px]">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-primary mb-2">
                    {getStatusIcon(stage.status)}
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{stage.title}</h3>
                  <Badge className={getStatusColor(stage.status)}>
                    {stage.status}
                  </Badge>
                </div>
                {index < registrationStages.length - 1 && (
                  <ArrowRight className="h-5 w-5 text-muted-foreground mx-4 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Current Stage Details */}
          <div className="grid lg:grid-cols-2 gap-8">
            {registrationStages.map((stage, index) => (
              <Card 
                key={stage.id} 
                className={`${stage.status === 'current' ? 'ring-2 ring-primary' : ''}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        {getStatusIcon(stage.status)}
                        <span className="ml-2">{stage.title}</span>
                      </CardTitle>
                      <CardDescription>{stage.description}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(stage.status)}>
                      {stage.status}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    {stage.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          stage.status === 'completed' ? 'bg-green-500' : 
                          stage.status === 'current' ? 'bg-primary' : 'bg-muted-foreground'
                        }`} />
                        <span className={`text-sm ${
                          stage.status === 'completed' ? 'line-through text-muted-foreground' : ''
                        }`}>
                          {task}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {stage.status === 'current' && (
                    <Button className="w-full mt-4">
                      Start {stage.title}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Reference */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Quick Reference: CAC Registration Costs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className="font-semibold text-lg">Name Search</h4>
                  <p className="text-2xl font-bold text-primary">₦500</p>
                  <p className="text-sm text-muted-foreground">Per search attempt</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-lg">Registration Fee</h4>
                  <p className="text-2xl font-bold text-primary">₦10,000</p>
                  <p className="text-sm text-muted-foreground">Standard processing</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-lg">Total Timeline</h4>
                  <p className="text-2xl font-bold text-primary">7-14 days</p>
                  <p className="text-sm text-muted-foreground">From start to finish</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
