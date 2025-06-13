import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { SidebarTrigger } from '../ui/sidebar';
import { Download, Copy, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const DocumentGeneratorTab: React.FC = () => {
  const [selectedDocType, setSelectedDocType] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDocument, setGeneratedDocument] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    founders: '',
    sector: '',
    fundingStage: '',
    additionalInfo: ''
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

  const formatDocumentContent = (content: string) => {
    // Remove markdown formatting and clean up the content
    return content
      .replace(/\*\*/g, '') // Remove bold markdown
      .replace(/\*/g, '') // Remove italic markdown
      .replace(/#{1,6}\s*/g, '') // Remove heading markers
      .replace(/^\s*-\s*/gm, '• ') // Convert markdown lists to bullet points
      .replace(/^\s*\d+\.\s*/gm, (match, offset, string) => {
        // Keep numbered lists but clean them up
        const lineStart = string.lastIndexOf('\n', offset) + 1;
        const lineContent = string.substring(lineStart, offset);
        return lineContent.trim() === '' ? match : match;
      })
      .trim();
  };

  const handleGenerate = async () => {
    if (!selectedDocType || !formData.companyName) {
      toast.error('Please fill in required fields');
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('chat-ai', {
        body: {
          message: `Generate a ${documentTypes.find(t => t.value === selectedDocType)?.label} for a Nigerian startup with the following details:
          Company Name: ${formData.companyName}
          Number of Founders: ${formData.founders}
          Business Sector: ${formData.sector}
          Funding Stage: ${formData.fundingStage}
          Additional Information: ${formData.additionalInfo}
          
          Please provide a comprehensive, CAC-compliant document that includes all necessary clauses and terms specific to Nigerian corporate law. Format it as a clean, professional legal document without markdown formatting.`,
          isDocumentGeneration: true
        }
      });

      if (error) {
        throw new Error('Failed to generate document');
      }
      const cleanedContent = formatDocumentContent(data.response);
      setGeneratedDocument(cleanedContent);
      toast.success('Document generated successfully!');
    } catch (error) {
      console.error('Error generating document:', error);
      toast.error('Failed to generate document. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedDocument);
    toast.success('Document copied to clipboard!');
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedDocument], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${formData.companyName}-${selectedDocType}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Document downloaded!');
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-3 sm:p-4 lg:p-6">
        <div className="flex items-center space-x-3">
          <SidebarTrigger className="h-7 w-7 flex-shrink-0" />
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">Document Generator</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Generate CAC-compliant legal documents for your startup</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-3 sm:p-4 lg:p-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
          {/* Form Section */}
          <Card className="h-fit">
            <CardHeader className="p-3 sm:p-4 lg:p-6">
              <CardTitle className="text-base sm:text-lg">
                Document Details
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Fill in your startup information to generate customized legal documents
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-3 sm:p-4 lg:p-6 pt-0 space-y-3 sm:space-y-4">
              {/* Document Type Selection */}
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="doc-type" className="text-xs sm:text-sm">Document Type *</Label>
                <Select value={selectedDocType} onValueChange={setSelectedDocType}>
                  <SelectTrigger className="h-9 sm:h-10">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="company-name" className="text-xs sm:text-sm">Company Name *</Label>
                  <Input
                    id="company-name"
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    placeholder="e.g., TechNova Limited"
                    className="h-9 sm:h-10 text-sm"
                  />
                </div>
                
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="founders" className="text-xs sm:text-sm">Number of Founders</Label>
                  <Input
                    id="founders"
                    type="number"
                    value={formData.founders}
                    onChange={(e) => setFormData(prev => ({ ...prev, founders: e.target.value }))}
                    placeholder="e.g., 3"
                    className="h-9 sm:h-10 text-sm"
                  />
                </div>
              </div>

              {/* Business Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="sector" className="text-xs sm:text-sm">Business Sector</Label>
                  <Select value={formData.sector} onValueChange={(value) => setFormData(prev => ({ ...prev, sector: value }))}>
                    <SelectTrigger className="h-9 sm:h-10">
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
                
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="funding-stage" className="text-xs sm:text-sm">Funding Stage</Label>
                  <Select value={formData.fundingStage} onValueChange={(value) => setFormData(prev => ({ ...prev, fundingStage: value }))}>
                    <SelectTrigger className="h-9 sm:h-10">
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

              {/* Additional Information */}
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="additional-info" className="text-xs sm:text-sm">Additional Information</Label>
                <Textarea
                  id="additional-info"
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                  placeholder="Any specific clauses or requirements..."
                  className="min-h-[60px] sm:min-h-[80px] text-sm resize-none"
                />
              </div>

              {/* Generate Button */}
              <Button 
                onClick={handleGenerate}
                className="w-full bg-primary hover:bg-primary/90 h-9 sm:h-10 text-sm"
                disabled={!selectedDocType || !formData.companyName || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  'Generate Document'
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Document Section */}
          {generatedDocument && (
            <Card className="h-fit">
              <CardHeader className="p-3 sm:p-4 lg:p-6">
                <CardTitle className="flex items-center justify-between text-base sm:text-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-600" />
                    Generated Document
                  </div>
                  <div className="flex space-x-1 sm:space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyToClipboard}
                      className="h-8 sm:h-9 px-2 sm:px-3"
                    >
                      <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      <span className="hidden sm:inline">Copy</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownload}
                      className="h-8 sm:h-9 px-2 sm:px-3"
                    >
                      <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      <span className="hidden sm:inline">Download</span>
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
                <div className="bg-muted rounded-lg p-2 sm:p-3 lg:p-4 max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] overflow-auto">
                  <pre className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed font-mono">
                    {generatedDocument}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
