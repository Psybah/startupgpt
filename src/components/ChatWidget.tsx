
import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MessageSquare, X, Send, Upload } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQueries = [
    "How to register with CAC?",
    "Draft a shareholder agreement",
    "Explain ESOPs in Nigeria"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(message),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const getAIResponse = (query: string): string => {
    if (query.toLowerCase().includes('cac') || query.toLowerCase().includes('register')) {
      return `For CAC registration in Nigeria:

**1. Standard Approach:**
• Name Reservation: ₦500/search (1-2 days)
• Required documents: MEMART, ARTS, CAC 1.1 Form
• Minimum share capital: ₦10

**2. Key Steps:**
» Step 1: Name search and reservation
» Step 2: Prepare incorporation documents
» Step 3: Submit to CAC office
» Step 4: Post-registration compliance

**3. Next Steps:**
Get TIN → Register for VAT → NSITF/Pension

*Would you like me to generate the required documents?*`;
    }

    if (query.toLowerCase().includes('equity') || query.toLowerCase().includes('split')) {
      return `For 3 Nigerian co-founders:

**1. Standard Approach:**
• CEO: 40%
• CTO: 30%
• CMO: 30%
• Vesting: 4-year with 1-year cliff

**2. Key Considerations:**
» Future ESOP pool (15-20%)
» CAC requirement: Minimum ₦10 share capital
» Include drag-along rights

**3. Next Step:**
Generate draft shareholders agreement?

*[Generate Document] [Explain Vesting]*`;
    }

    return `I'm here to help with Nigerian startup legal matters. I can assist with:

• CAC registration processes
• Document drafting and review
• Equity structuring advice
• Compliance requirements
• Contract templates

What specific legal question can I help you with today?`;
  };

  const TypingIndicator = () => (
    <div className="flex items-center space-x-1 py-2">
      <div className="w-2 h-2 bg-primary rounded-full typing-dot"></div>
      <div className="w-2 h-2 bg-primary rounded-full typing-dot"></div>
      <div className="w-2 h-2 bg-primary rounded-full typing-dot"></div>
      <span className="text-xs text-muted-foreground ml-2">StartupGPT is typing...</span>
    </div>
  );

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setMessages([])}
          className="float-animation bg-primary hover:bg-primary/90 rounded-full w-16 h-16 shadow-lg"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <Card className="h-[600px] flex flex-col shadow-2xl">
        <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">StartupGPT Legal Assistant</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-primary-foreground hover:bg-primary/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Welcome! I'm your AI legal assistant. Try asking:
                </p>
                <div className="space-y-2">
                  {suggestedQueries.map((query, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-left w-full justify-start"
                      onClick={() => handleSendMessage(query)}
                    >
                      {query}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <div className="text-sm whitespace-pre-line">{message.content}</div>
                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="border-t p-4 space-y-3">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask a legal question..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                className="flex-1"
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                size="sm"
                disabled={!inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Upload Documents
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
