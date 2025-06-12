
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Search, Clock, BookOpen, ExternalLink } from 'lucide-react';

export const KnowledgeBaseTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const articles = [
    {
      id: 1,
      title: "Complete Guide to CAC Registration in 2024",
      excerpt: "Step-by-step process for registering your startup with the Corporate Affairs Commission, including new digital requirements and fees.",
      category: "Company Formation",
      readTime: "8 min read",
      publishedAt: "2024-01-15",
      featured: true
    },
    {
      id: 2,
      title: "Understanding Nigerian Startup Equity Structures",
      excerpt: "How to structure founder equity, implement vesting schedules, and create Employee Stock Option Plans (ESOPs) under Nigerian law.",
      category: "Equity & Investment",
      readTime: "12 min read",
      publishedAt: "2024-01-10",
      featured: true
    },
    {
      id: 3,
      title: "FinTech Regulatory Requirements in Nigeria",
      excerpt: "Navigate CBN licensing, payment service provider requirements, and compliance obligations for financial technology startups.",
      category: "Sector Regulations",
      readTime: "15 min read",
      publishedAt: "2024-01-08",
      featured: false
    },
    {
      id: 4,
      title: "Intellectual Property Protection for Startups",
      excerpt: "Trademark registration, copyright protection, and patent filing strategies for Nigerian technology companies.",
      category: "IP Protection",
      readTime: "10 min read",
      publishedAt: "2024-01-05",
      featured: false
    },
    {
      id: 5,
      title: "Tax Obligations for Nigerian Startups",
      excerpt: "Understanding VAT registration, company income tax, PAYE, and other tax requirements for growing businesses.",
      category: "Tax & Compliance",
      readTime: "7 min read",
      publishedAt: "2024-01-03",
      featured: false
    },
    {
      id: 6,
      title: "Employment Law Essentials for Founders",
      excerpt: "Creating compliant employment contracts, understanding labor laws, and implementing proper HR practices.",
      category: "Employment Law",
      readTime: "9 min read",
      publishedAt: "2024-01-01",
      featured: false
    }
  ];

  const categories = ["All", "Company Formation", "Equity & Investment", "Sector Regulations", "IP Protection", "Tax & Compliance", "Employment Law"];

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredArticles = articles.filter(article => article.featured);

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
          {!searchTerm && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Featured Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredArticles.map((article) => (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{article.category}</Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          {article.readTime}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                      <CardDescription>{article.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {new Date(article.publishedAt).toLocaleDateString()}
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
              <Button key={category} variant="outline" size="sm">
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
                <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <BookOpen className="w-8 h-8 text-primary mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary" className="text-xs">{article.category}</Badge>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="w-3 h-3 mr-1" />
                            {article.readTime}
                          </div>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                        <p className="text-muted-foreground mb-3">{article.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            Published {new Date(article.publishedAt).toLocaleDateString()}
                          </span>
                          <Button variant="ghost" size="sm">
                            Read Article <ExternalLink className="w-3 h-3 ml-1" />
                          </Button>
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
