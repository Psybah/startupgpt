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
      {/* Header - Fixed on mobile/tablet, normal on desktop */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:relative lg:top-auto lg:left-auto lg:right-auto lg:z-auto border-b p-3 sm:p-4 lg:p-6 bg-background">
        <div className="flex items-center space-x-3">
          <SidebarTrigger className="h-7 w-7 flex-shrink-0" />
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">Legal Chat Assistant</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Ask me anything about Nigerian startup law</p>
          </div>
        </div>
      </div>

      {/* Messages Area - Responsive spacing with top padding for fixed header on mobile/tablet */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 pt-20 sm:pt-24 lg:pt-6 space-y-3 sm:space-y-4 lg:space-y-6">
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
                        __html: (() => {
                          let html = message.content;
                          // Convert markdown headings to HTML (process from most # to least to avoid conflicts)
                          html = html.replace(/^#### (.*$)/gim, '<h4 class="text-sm font-semibold mt-3 mb-1">$1</h4>');
                          html = html.replace(/^### (.*$)/gim, '<h3 class="text-base font-semibold mt-4 mb-2">$1</h3>');
                          html = html.replace(/^## (.*$)/gim, '<h2 class="text-lg font-semibold mt-4 mb-2">$1</h2>');
                          html = html.replace(/^# (.*$)/gim, '<h1 class="text-xl font-semibold mt-4 mb-2">$1</h1>');
                          
                          // Convert line breaks first (but preserve for lists)
                          // Split by lines to process lists properly
                          const lines = html.split('\n');
                          const processedLines: string[] = [];
                          let inList = false;
                          
                          for (let i = 0; i < lines.length; i++) {
                            const line = lines[i];
                            // Check if line is a bullet point (starts with - or •)
                            if (/^\s*[-•]\s+/.test(line)) {
                              if (!inList) {
                                processedLines.push('<ul class="list-disc ml-6 my-2 space-y-1">');
                                inList = true;
                              }
                              processedLines.push(`<li>${line.replace(/^\s*[-•]\s+/, '')}</li>`);
                            }
                            // Check if line is a numbered list
                            else if (/^\s*\d+\.\s+/.test(line)) {
                              if (!inList) {
                                processedLines.push('<ul class="list-decimal ml-6 my-2 space-y-1">');
                                inList = true;
                              }
                              processedLines.push(`<li>${line.replace(/^\s*\d+\.\s+/, '')}</li>`);
                            }
                            // Regular line
                            else {
                              if (inList) {
                                processedLines.push('</ul>');
                                inList = false;
                              }
                              if (line.trim()) {
                                processedLines.push(line);
                              }
                            }
                          }
                          
                          // Close any open list
                          if (inList) {
                            processedLines.push('</ul>');
                          }
                          
                          html = processedLines.join('\n');
                          
                          // Convert bold markdown (after processing lists)
                          html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                          // Convert italic markdown (only single asterisks that aren't part of bold)
                          html = html.replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g, '<em>$1</em>');
                          // Convert remaining line breaks
                          html = html.replace(/\n/g, '<br/>');
                          return html;
                        })()
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
