
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FileText, Download } from 'lucide-react';
import { Badge } from '../ui/badge';

export const DocumentGeneratorTab: React.FC = () => {
  const [selectedDocType, setSelectedDocType] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    founders: '',
    businessType: '',
    shareCapital: ''
  });

  const documentTypes = [
    {
      id: 'shareholders-agreement',
      title: 'Shareholders Agreement',
      description: 'Comprehensive agreement for founder equity and governance',
      category: 'Incorporation'
    },
    {
      id: 'employment-contract',
      title: 'Employment Contract',
      description: 'Standard employment agreement template',
      category: 'Contracts'
    },
    {
      id: 'nda',
      title: 'Non-Disclosure Agreement',
      description: 'Protect confidential information and trade secrets',
      category: 'Contracts'
    },
    {
      id: 'memart',
      title: 'MEMART Form',
      description: 'Memorandum and Articles of Association',
      category: 'CAC Registration'
    },
    {
      id: 'board-resolution',
      title: 'Board Resolution',
      description: 'Template for board meeting resolutions',
      category: 'Governance'
    },
    {
      id: 'esop-agreement',
      title: 'ESOP Agreement',
      description: 'Employee Stock Option Plan documentation',
      category: 'Equity'
    }
  ];

  const handleGenerate = () => {
    // This would connect to your document generation API
    console.log('Generating document:', selectedDocType, formData);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-foreground">Document Generator</h1>
        <p className="text-muted-foreground">Generate CAC-compliant legal documents for your startup</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Document Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Document Type</CardTitle>
              <CardDescription>Choose the legal document you need to generate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documentTypes.map((doc) => (
                  <Card 
                    key={doc.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedDocType === doc.id ? 'ring-2 ring-primary bg-primary/5' : ''
                    }`}
                    onClick={() => setSelectedDocType(doc.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <FileText className="w-6 h-6 text-primary mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{doc.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{doc.description}</p>
                          <Badge variant="secondary" className="mt-2 text-xs">{doc.category}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Document Configuration Form */}
          {selectedDocType && (
            <Card>
              <CardHeader>
                <CardTitle>Document Details</CardTitle>
                <CardDescription>Provide information to customize your document</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      placeholder="Enter your company name"
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select value={formData.businessType} onValueChange={(value) => setFormData({...formData, businessType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fintech">FinTech</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="saas">SaaS</SelectItem>
                        <SelectItem value="healthtech">HealthTech</SelectItem>
                        <SelectItem value="edtech">EdTech</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="founders">Number of Founders</Label>
                    <Input
                      id="founders"
                      type="number"
                      placeholder="e.g., 3"
                      value={formData.founders}
                      onChange={(e) => setFormData({...formData, founders: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shareCapital">Share Capital (₦)</Label>
                    <Input
                      id="shareCapital"
                      placeholder="e.g., 1000000"
                      value={formData.shareCapital}
                      onChange={(e) => setFormData({...formData, shareCapital: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <Button variant="outline">
                    Preview
                  </Button>
                  <Button onClick={handleGenerate} className="bg-primary hover:bg-primary/90">
                    <Download className="w-4 h-4 mr-2" />
                    Generate Document
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
