
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Search, Clock, BookOpen, ExternalLink } from 'lucide-react';
import { NigerianLegalKB } from '../../utils/legalKnowledgeBase';

export const KnowledgeBaseTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [articles, setArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  useEffect(() => {
    const kb = NigerianLegalKB.getInstance();
    const allArticles = kb.getAllDocuments();
    const allCategories = ['All', ...kb.getCategories()];
    
    setArticles(allArticles);
    setCategories(allCategories);
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = !searchTerm || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = articles.filter(article => 
    ['1', '2'].includes(article.id) // Feature first 2 articles
  );

  const handleArticleClick = (article: any) => {
    setSelectedArticle(article);
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
  };

  if (selectedArticle) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <div className="border-b p-6">
          <Button variant="outline" onClick={handleBackToList} className="mb-4">
            ← Back to Knowledge Base
          </Button>
          <h1 className="text-2xl font-bold text-foreground">{selectedArticle.title}</h1>
          <div className="flex items-center space-x-4 mt-2">
            <Badge variant="secondary">{selectedArticle.category}</Badge>
            <span className="text-sm text-muted-foreground">
              Last updated: {new Date(selectedArticle.lastUpdated).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ 
                __html: selectedArticle.content
                  .replace(/\n/g, '<br/>')
                  .replace(/# (.*)/g, '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>')
                  .replace(/## (.*)/g, '<h2 class="text-xl font-semibold mt-5 mb-3">$2</h2>')
                  .replace(/### (.*)/g, '<h3 class="text-lg font-medium mt-4 mb-2">$3</h3>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/- (.*)/g, '<li class="ml-4">$1</li>')
                  .replace(/(\d+\. .*)/g, '<li class="ml-4">$1</li>')
              }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-foreground">Legal Knowledge Base</h1>
        <p className="text-muted-foreground">Stay updated with Nigerian startup law and regulations</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles, guides, and legal resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Featured Articles */}
          {!searchTerm && selectedCategory === 'All' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Featured Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredArticles.map((article) => (
                  <Card 
                    key={article.id} 
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleArticleClick(article)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{article.category}</Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          5 min read
                        </div>
                      </div>
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                      <CardDescription>
                        {article.content.substring(0, 150)}...
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {new Date(article.lastUpdated).toLocaleDateString()}
                        </span>
                        <Button variant="ghost" size="sm">
                          Read More <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Categories Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button 
                key={category} 
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* All Articles */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {searchTerm ? `Search Results (${filteredArticles.length})` : 'All Articles'}
            </h2>
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <Card 
                  key={article.id} 
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleArticleClick(article)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <BookOpen className="w-8 h-8 text-primary mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary" className="text-xs">{article.category}</Badge>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="w-3 h-3 mr-1" />
                            5 min read
                          </div>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                        <p className="text-muted-foreground mb-3">
                          {article.content.substring(0, 200)}...
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {article.tags.slice(0, 3).map((tag: string) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            Updated {new Date(article.lastUpdated).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
