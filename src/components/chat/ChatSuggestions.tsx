
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';

interface ChatSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

export const ChatSuggestions: React.FC<ChatSuggestionsProps> = ({ onSuggestionClick }) => {
  const [personalizedSuggestions, setPersonalizedSuggestions] = useState<string[]>([]);

  useEffect(() => {
    // Load user data from onboarding and personalize suggestions
    const userData = localStorage.getItem('startupgpt_user_data');
    let suggestions = [
      "How do I register my startup with CAC?",
      "What documents do I need for company incorporation?",
      "How should I split equity among founders?",
      "Generate a shareholder agreement template",
      "What are the tax obligations for Nigerian startups?",
      "Explain Employee Stock Option Plans (ESOPs)",
      "What licenses do I need for a FinTech startup?",
      "How to protect my startup's intellectual property?"
    ];

    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        const { userType, stage, priorities } = parsed;

        // Personalize based on user type
        if (userType === 'founder') {
          if (stage === 'ideation') {
            suggestions = [
              "How do I validate my startup idea legally?",
              "What's the first legal step for Nigerian startups?",
              "Do I need to register my business name first?",
              "How much does CAC registration cost?",
              "What are the minimum requirements for company formation?",
              "Should I start as a business name or limited company?",
              "What legal protections do I need for my idea?",
              "How do I choose the right business structure?"
            ];
          } else if (stage === 'pre-seed') {
            suggestions = [
              "How do I structure equity for co-founders?",
              "What legal documents do I need before raising funds?",
              "How do I protect my intellectual property?",
              "What employment contracts should I use?",
              "How do I set up a cap table?",
              "What are vesting schedules and why do I need them?",
              "How do I draft a founders' agreement?",
              "What compliance requirements should I know about?"
            ];
          } else if (stage === 'seed' || stage === 'scaling') {
            suggestions = [
              "How do I prepare for Series A investment?",
              "What are the legal requirements for raising foreign capital?",
              "How do I structure employee stock options (ESOP)?",
              "What regulatory compliance do I need for scaling?",
              "How do I handle international expansion legally?",
              "What are the tax implications of investor funding?",
              "How do I protect my company during due diligence?",
              "What legal structures work best for exits?"
            ];
          }
        }

        // Further personalize based on priorities
        if (priorities.includes('registration')) {
          suggestions.unshift("Walk me through the complete CAC registration process");
        }
        if (priorities.includes('contracts')) {
          suggestions.unshift("What essential contracts does my startup need?");
        }
        if (priorities.includes('funding')) {
          suggestions.unshift("How do I structure my startup for investment?");
        }
        if (priorities.includes('compliance')) {
          suggestions.unshift("What compliance requirements apply to my startup?");
        }

        // Add business type specific suggestions
        if (parsed.businessType === 'fintech') {
          suggestions.push("What CBN licenses do I need for my FinTech?");
          suggestions.push("How do I comply with Nigerian payment regulations?");
        }

      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }

    setPersonalizedSuggestions(suggestions.slice(0, 8)); // Limit to 8 suggestions
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold text-center mb-4">Personalized Questions for You</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {personalizedSuggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            className="h-auto p-4 text-left whitespace-normal text-sm"
            onClick={() => onSuggestionClick(suggestion)}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
};
