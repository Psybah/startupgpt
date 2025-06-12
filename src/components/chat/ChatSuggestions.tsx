
import React from 'react';
import { Button } from '../ui/button';

interface ChatSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

export const ChatSuggestions: React.FC<ChatSuggestionsProps> = ({ onSuggestionClick }) => {
  const suggestions = [
    "How do I register my startup with CAC?",
    "What documents do I need for company incorporation?",
    "How should I split equity among founders?",
    "Generate a shareholder agreement template",
    "What are the tax obligations for Nigerian startups?",
    "Explain Employee Stock Option Plans (ESOPs)",
    "What licenses do I need for a FinTech startup?",
    "How to protect my startup's intellectual property?"
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold text-center mb-4">Quick Questions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            className="h-auto p-4 text-left whitespace-normal"
            onClick={() => onSuggestionClick(suggestion)}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
};
