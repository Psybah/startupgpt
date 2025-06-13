import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { SidebarTrigger } from './ui/sidebar';
import { Clock, ArrowLeft, ExternalLink, FileText, Download } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  content: string;
  tags: string[];
  lastUpdated: string;
}

interface DetailedLegalArticleProps {
  article: Article;
  onBack: () => void;
}

export const DetailedLegalArticle: React.FC<DetailedLegalArticleProps> = ({ article, onBack }) => {
  // Helper function for inline text formatting
  const formatInlineText = (text: string) => {
    return text
      // Bold text
      .replace(/\*\*(.*?)\*\*/g, '<span class="font-medium text-gray-900">$1</span>')
      // Italic text
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // Code
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      // Currency
      .replace(/₦(\d+(?:,\d{3})*(?:\.\d{2})?)/g, '<span class="font-medium text-green-600">₦$1</span>');
  };

  // Enhanced content with proper formatting for Nigerian legal articles
  const getFormattedContent = (content: string) => {
    // Split content into lines and process each line
    const lines = content.split('\n');
    const processedLines: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip empty lines - compact mobile spacing
      if (!line) {
        processedLines.push('<div class="h-2 sm:h-4"></div>');
        continue;
      }
      
      // Process headings (remove # symbols) - more compact on mobile
      if (line.startsWith('# ')) {
        const text = line.replace(/^# /, '');
        processedLines.push(`<h1 class="text-lg sm:text-xl font-semibold mt-4 sm:mt-6 mb-2 sm:mb-4 text-gray-900">${text}</h1>`);
      } else if (line.startsWith('## ')) {
        const text = line.replace(/^## /, '');
        processedLines.push(`<h2 class="text-base sm:text-lg font-semibold mt-3 sm:mt-5 mb-2 sm:mb-3 text-gray-900">${text}</h2>`);
      } else if (line.startsWith('### ')) {
        const text = line.replace(/^### /, '');
        processedLines.push(`<h3 class="text-sm sm:text-base font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2 text-gray-900">${text}</h3>`);
      } else if (line.startsWith('#### ')) {
        const text = line.replace(/^#### /, '');
        processedLines.push(`<h4 class="text-xs sm:text-sm font-semibold mt-2 sm:mt-3 mb-1 sm:mb-2 text-gray-900">${text}</h4>`);
      } 
      // Process bullet points (remove markdown -) - compact mobile spacing
      else if (line.startsWith('- ')) {
        const text = line.replace(/^- /, '');
        const formatted = formatInlineText(text);
        processedLines.push(`<div class="flex items-start mb-1 sm:mb-2"><span class="text-gray-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 text-xs sm:text-sm">•</span><span class="flex-1 text-sm sm:text-base">${formatted}</span></div>`);
      }
      // Process numbered lists - compact mobile spacing
      else if (/^\d+\.\s/.test(line)) {
        const formatted = formatInlineText(line);
        processedLines.push(`<div class="flex items-start mb-1 sm:mb-2"><span class="text-gray-600 mr-2 sm:mr-3 font-medium text-sm sm:text-base">${formatted}</span></div>`);
      }
      // Process special callouts - compact mobile spacing
      else if (line.startsWith('💡 Pro Tip:')) {
        const text = line.replace(/^💡 Pro Tip:\s*/, '');
        const formatted = formatInlineText(text);
        processedLines.push(`<div class="bg-blue-50 border-l-4 border-blue-400 p-2 sm:p-3 my-2 sm:my-4 rounded-r"><div class="text-xs sm:text-sm"><span class="font-medium text-blue-700">💡 Pro Tip:</span> ${formatted}</div></div>`);
      } else if (line.startsWith('⚠️ Important:')) {
        const text = line.replace(/^⚠️ Important:\s*/, '');
        const formatted = formatInlineText(text);
        processedLines.push(`<div class="bg-yellow-50 border-l-4 border-yellow-400 p-2 sm:p-3 my-2 sm:my-4 rounded-r"><div class="text-xs sm:text-sm"><span class="font-medium text-yellow-700">⚠️ Important:</span> ${formatted}</div></div>`);
      } else if (line.startsWith('🚨 Compliance Alert:')) {
        const text = line.replace(/^🚨 Compliance Alert:\s*/, '');
        const formatted = formatInlineText(text);
        processedLines.push(`<div class="bg-red-50 border-l-4 border-red-400 p-2 sm:p-3 my-2 sm:my-4 rounded-r"><div class="text-xs sm:text-sm"><span class="font-medium text-red-700">🚨 Compliance Alert:</span> ${formatted}</div></div>`);
      } else if (line.startsWith('📋 Next Steps:')) {
        const text = line.replace(/^📋 Next Steps:\s*/, '');
        const formatted = formatInlineText(text);
        processedLines.push(`<div class="bg-green-50 border-l-4 border-green-400 p-2 sm:p-3 my-2 sm:my-4 rounded-r"><div class="text-xs sm:text-sm"><span class="font-medium text-green-700">📋 Next Steps:</span> ${formatted}</div></div>`);
      }
      // Regular paragraphs - compact mobile spacing
      else {
        const formatted = formatInlineText(line);
        processedLines.push(`<p class="mb-2 sm:mb-3 leading-relaxed text-sm sm:text-base">${formatted}</p>`);
      }
    }
    
    return processedLines.join('');
  };

  const getEstimatedReadTime = (content: string) => {
    const wordCount = content.split(' ').length;
    const wordsPerMinute = 200;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const getRelatedArticles = (currentArticle: Article) => {
    // Based on current article category, suggest related articles
    const relatedMap: Record<string, Array<{title: string, path: string}>> = {
      'Company Formation': [
        { title: 'Post-Incorporation Compliance Checklist', path: '#compliance' },
        { title: 'Opening Corporate Bank Accounts in Nigeria', path: '#banking' },
        { title: 'Understanding CAMA 2020 Requirements', path: '#cama' }
      ],
      'Legal Documents': [
        { title: 'Employment Contract Templates', path: '#employment' },
        { title: 'Service Agreement Best Practices', path: '#service' },
        { title: 'Privacy Policy for Nigerian Startups', path: '#privacy' }
      ],
      'Equity & Investment': [
        { title: 'Convertible Note Structures in Nigeria', path: '#convertible' },
        { title: 'Due Diligence Checklist for Investors', path: '#due-diligence' },
        { title: 'Foreign Investment Approvals (CBN)', path: '#foreign-investment' }
      ],
      'Sector Regulations': [
        { title: 'Data Protection Compliance (NDPR)', path: '#data-protection' },
        { title: 'Cross-Border Payment Regulations', path: '#payments' },
        { title: 'Consumer Protection for E-commerce', path: '#consumer' }
      ]
    };

    return relatedMap[currentArticle.category] || [];
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center space-x-3 mb-3 sm:mb-4">
            <SidebarTrigger className="h-7 w-7 flex-shrink-0" />
            <Button 
              variant="outline" 
              onClick={onBack} 
              className="text-sm h-8 sm:h-9 hover:bg-muted"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Knowledge Base
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2 flex-wrap">
              <Badge variant="secondary" className="text-xs">{article.category}</Badge>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="w-3 h-3 mr-1" />
                {getEstimatedReadTime(article.content)} min read
              </div>
              <span className="text-xs text-muted-foreground">
                Updated {new Date(article.lastUpdated).toLocaleDateString()}
              </span>
            </div>
            
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight">
              {article.title}
            </h1>
            
            <div className="flex items-center space-x-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-2 sm:p-4 lg:p-6">
          {/* Article Actions - icon-only top right */}
          <div className="flex items-center justify-end mb-4 space-x-2">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0" title="Generate Template">
              <FileText className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0" title="Download PDF">
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Share Article">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>

          {/* Main Content - compact mobile typography */}
          <div className="max-w-none">
            <div 
              className="legal-article-content leading-relaxed text-gray-700"
              dangerouslySetInnerHTML={{ 
                __html: getFormattedContent(article.content)
              }} 
            />
          </div>

          {/* Legal Disclaimer - compact mobile */}
          <Card className="mt-4 sm:mt-8 border-amber-200 bg-amber-50">
            <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm flex items-center text-amber-800">
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Legal Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 p-3 sm:p-6">
              <p className="text-xs leading-relaxed text-amber-700">
                This information is provided for educational purposes only and does not constitute legal advice. 
                Nigerian law is complex and subject to frequent changes. For specific legal matters, always consult 
                with a qualified Nigerian lawyer or legal firm registered with the Nigerian Bar Association.
              </p>
            </CardContent>
          </Card>

          {/* Related Articles - compact mobile */}
          <div className="mt-4 sm:mt-8">
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Related Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
              {getRelatedArticles(article).map((related, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 sm:p-4">
                    <h4 className="font-medium text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2">{related.title}</h4>
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-primary">
                      Read more →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact CTA - compact mobile */}
          <Card className="mt-4 sm:mt-8 bg-primary/5 border-primary/20">
            <CardContent className="p-4 sm:p-6 text-center">
              <h3 className="font-semibold text-sm sm:text-base mb-2">Need Personalized Legal Guidance?</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                Get expert advice tailored to your specific startup situation
              </p>
              <Button className="w-full sm:w-auto text-xs sm:text-sm">
                Connect with Legal Expert
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}; 