import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { SidebarTrigger } from '../ui/sidebar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Search, Clock, BookOpen, ExternalLink } from 'lucide-react';
import { NigerianLegalKB } from '../../utils/legalKnowledgeBase';
import { DetailedLegalArticle } from '../DetailedLegalArticle';

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
      <DetailedLegalArticle 
        article={selectedArticle} 
        onBack={handleBackToList}
      />
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b p-3 sm:p-4 lg:p-6">
        <div className="flex items-center space-x-3">
          <SidebarTrigger className="h-7 w-7 flex-shrink-0" />
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">Legal Knowledge Base</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Stay updated with Nigerian startup law and regulations</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
        <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles, guides, and legal resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-9 sm:h-10 text-sm"
            />
          </div>

          {/* Featured Articles */}
          {!searchTerm && selectedCategory === 'All' && (
            <div>
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4">Featured Articles</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                {featuredArticles.map((article) => (
                  <Card 
                    key={article.id} 
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleArticleClick(article)}
                  >
                    <CardHeader className="p-3 sm:p-4 lg:p-6">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">{article.category}</Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          5 min read
                        </div>
                      </div>
                      <CardTitle className="text-sm sm:text-base lg:text-lg">{article.title}</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        {article.content.substring(0, 100)}...
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {new Date(article.lastUpdated).toLocaleDateString()}
                        </span>
                        <Button variant="ghost" size="sm" className="h-7 sm:h-8 text-xs">
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
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-foreground">Filter by category:</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 h-9">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* All Articles */}
          <div>
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4">
              {searchTerm ? `Search Results (${filteredArticles.length})` : 'All Articles'}
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {filteredArticles.map((article) => (
                <Card 
                  key={article.id} 
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleArticleClick(article)}
                >
                  <CardContent className="p-3 sm:p-4 lg:p-6">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-primary mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary" className="text-xs">{article.category}</Badge>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="w-3 h-3 mr-1" />
                            5 min read
                          </div>
                        </div>
                        <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-2 line-clamp-2">{article.title}</h3>
                        <p className="text-muted-foreground mb-3 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3">
                          {article.content.substring(0, 150)}...
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {article.tags.slice(0, 2).map((tag: string) => (
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
