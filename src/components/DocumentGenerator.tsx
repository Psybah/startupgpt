
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Pen } from 'lucide-react';

export const DocumentGenerator: React.FC = () => {
  const [selectedDocType, setSelectedDocType] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    founders: '',
    sector: '',
    fundingStage: ''
  });

  const documentTypes = [
    { value: 'shareholders-agreement', label: 'Shareholders Agreement' },
    { value: 'employment-contract', label: 'Employment Contract' },
    { value: 'nda', label: 'Non-Disclosure Agreement' },
    { value: 'memart', label: 'MEMART (Articles of Association)' },
    { value: 'board-resolution', label: 'Board Resolution Template' }
  ];

  const sectors = [
    { value: 'fintech', label: 'FinTech' },
    { value: 'healthtech', label: 'HealthTech' },
    { value: 'edtech', label: 'EdTech' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'agtech', label: 'AgTech' },
    { value: 'other', label: 'Other' }
  ];

  const fundingStages = [
    { value: 'pre-seed', label: 'Pre-Seed (idea stage, personal savings/friends & family)' },
    { value: 'seed', label: 'Seed (early product, angel investors/seed funds)' },
    { value: 'series-a', label: 'Series A (proven traction, institutional VCs)' },
    { value: 'series-b', label: 'Series B+ (scaling business, growth capital)' }
  ];

  const handleGenerate = () => {
    // In a real implementation, this would call an API to generate the document
    console.log('Generating document:', { selectedDocType, formData });
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            AI Document Generator
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate CAC-compliant legal documents tailored to your startup's needs
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Pen className="h-5 w-5 mr-2 text-primary" />
                Document Generation Wizard
              </CardTitle>
              <CardDescription>
                Fill in your startup details to generate customized legal documents
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Document Type Selection */}
              <div className="space-y-2">
                <Label htmlFor="doc-type">Document Type</Label>
                <Select value={selectedDocType} onValueChange={setSelectedDocType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Company Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    placeholder="e.g., TechNova Limited"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="founders">Number of Founders</Label>
                  <Input
                    id="founders"
                    type="number"
                    value={formData.founders}
                    onChange={(e) => setFormData(prev => ({ ...prev, founders: e.target.value }))}
                    placeholder="e.g., 3"
                  />
                </div>
              </div>

              {/* Business Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sector">Business Sector</Label>
                  <Select value={formData.sector} onValueChange={(value) => setFormData(prev => ({ ...prev, sector: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectors.map((sector) => (
                        <SelectItem key={sector.value} value={sector.value}>
                          {sector.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="funding-stage">Funding Stage</Label>
                  <Select value={formData.fundingStage} onValueChange={(value) => setFormData(prev => ({ ...prev, fundingStage: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {fundingStages.map((stage) => (
                        <SelectItem key={stage.value} value={stage.value}>
                          {stage.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Generate Button */}
              <Button 
                onClick={handleGenerate}
                className="w-full bg-primary hover:bg-primary/90"
                disabled={!selectedDocType || !formData.companyName}
              >
                Generate Document
              </Button>

              {/* Preview Area */}
              {selectedDocType && (
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Document Preview</h4>
                  <p className="text-sm text-muted-foreground">
                    Your {documentTypes.find(t => t.value === selectedDocType)?.label} will be generated with:
                  </p>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>• CAC-compliant formatting</li>
                    <li>• Sector-specific clauses ({formData.sector || 'general'})</li>
                    <li>• {formData.founders || 'Multiple'} founder structure</li>
                    <li>• Export options: PDF/DOCX</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
