import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { SidebarTrigger } from '../ui/sidebar';
import { ChatSuggestions } from './ChatSuggestions';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '../ui/use-toast';

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
  const [userContext, setUserContext] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load user context from onboarding data
    const userData = localStorage.getItem('startupgpt_user_data');
    if (userData) {
      const parsed = JSON.parse(userData);
      setUserContext(`User type: ${parsed.userType}, Stage: ${parsed.stage}, Priorities: ${parsed.priorities.join(', ')}`);
    }
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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

    try {
      const { data, error } = await supabase.functions.invoke('chat-ai', {
        body: { 
          message: messageText,
          context: userContext
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
      
      // Fallback response
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble connecting right now. Please try asking your question again, or check out our knowledge base for helpful information about Nigerian startup law.",
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header - Compact */}
      <div className="border-b p-3 sm:p-4 lg:p-6">
        <div className="flex items-center space-x-3">
          <SidebarTrigger className="h-7 w-7 flex-shrink-0" />
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">Legal Chat Assistant</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Ask me anything about Nigerian startup law</p>
          </div>
        </div>
      </div>

      {/* Messages Area - Responsive spacing */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 lg:space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4 sm:space-y-6 lg:space-y-8">
            <div className="text-center px-4">
              <Bot className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-primary mx-auto mb-3 sm:mb-4" />
              <h2 className="text-lg sm:text-xl font-semibold mb-2">Welcome to StartupGPT</h2>
              <p className="text-sm sm:text-base text-muted-foreground">Your AI legal partner for Nigerian startup success</p>
              {userContext && (
                <p className="text-xs sm:text-sm text-primary mt-2 bg-primary/10 px-2 sm:px-3 py-1 rounded-full inline-block">
                  Profile: {userContext.split(',')[0]} • {userContext.split(',')[1]}
                </p>
              )}
            </div>
            <ChatSuggestions onSuggestionClick={handleSendMessage} />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4 lg:space-y-6">
            {messages.map((message) => (
              <div key={message.id} className="flex space-x-2 sm:space-x-3 lg:space-x-4">
                <div className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center ${
                  message.role === 'user' ? 'bg-primary' : 'bg-secondary'
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  )}
                </div>
                <Card className="flex-1 p-3 sm:p-4">
                  <div className="prose prose-sm max-w-none">
                    <div 
                      className="text-sm sm:text-base leading-relaxed"
                      dangerouslySetInnerHTML={{ 
                      __html: message.content.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                      }} 
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </Card>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex space-x-2 sm:space-x-3 lg:space-x-4">
                <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <Card className="flex-1 p-3 sm:p-4">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </Card>
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Compact */}
      <div className="border-t p-3 sm:p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-2 sm:space-x-3 lg:space-x-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about CAC registration, contracts, compliance..."
              className="flex-1 text-sm sm:text-base"
              disabled={isLoading}
            />
            <Button 
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isLoading}
              className="bg-primary hover:bg-primary/90 px-3 sm:px-4"
              size="sm"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
