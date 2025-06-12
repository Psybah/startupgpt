
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Send, Bot, User } from 'lucide-react';
import { ChatSuggestions } from './ChatSuggestions';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message?: string) => {
    const messageText = message || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response (replace with actual Groq API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I understand you're asking about "${messageText}". As your AI legal partner for Nigerian startups, I can help you with CAC registration, legal documents, compliance, and more. Let me provide you with specific guidance based on Nigerian law.`,
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-foreground">Legal Chat Assistant</h1>
        <p className="text-muted-foreground">Ask me anything about Nigerian startup law</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <div className="text-center">
              <Bot className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Welcome to StartupGPT</h2>
              <p className="text-muted-foreground">Your AI legal partner for Nigerian startup success</p>
            </div>
            <ChatSuggestions onSuggestionClick={handleSendMessage} />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message) => (
              <div key={message.id} className="flex space-x-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  message.role === 'user' ? 'bg-primary' : 'bg-secondary'
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>
                <Card className="flex-1 p-4">
                  <p className="text-foreground whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </Card>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <Card className="flex-1 p-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full typing-animation"></div>
                    <div className="w-2 h-2 bg-primary rounded-full typing-animation" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-primary rounded-full typing-animation" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about CAC registration, contracts, compliance..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isLoading}
              className="bg-primary hover:bg-primary/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
