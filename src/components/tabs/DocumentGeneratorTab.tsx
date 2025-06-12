import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { FileText, Download, Copy, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

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
    { value: 'pre-seed', label: 'Pre-Seed' },
    { value: 'seed', label: 'Seed' },
    { value: 'series-a', label: 'Series A' },
    { value: 'series-b', label: 'Series B+' }
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
      const response = await fetch('/api/chat-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Generate a ${documentTypes.find(t => t.value === selectedDocType)?.label} for a Nigerian startup with the following details:
          Company Name: ${formData.companyName}
          Number of Founders: ${formData.founders}
          Business Sector: ${formData.sector}
          Funding Stage: ${formData.fundingStage}
          Additional Information: ${formData.additionalInfo}
          
          Please provide a comprehensive, CAC-compliant document that includes all necessary clauses and terms specific to Nigerian corporate law. Format it as a clean, professional legal document without markdown formatting.`,
          isDocumentGeneration: true
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate document');
      }

      const data = await response.json();
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
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-6">
        <div className="flex items-center space-x-3">
          <FileText className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Document Generator</h1>
            <p className="text-sm text-muted-foreground">Generate CAC-compliant legal documents for your startup</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Document Details
              </CardTitle>
              <CardDescription>
                Fill in your startup information to generate customized legal documents
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Document Type Selection */}
              <div className="space-y-2">
                <Label htmlFor="doc-type">Document Type *</Label>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name *</Label>
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
              <div className="grid grid-cols-2 gap-4">
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

              {/* Additional Information */}
              <div className="space-y-2">
                <Label htmlFor="additional-info">Additional Information</Label>
                <Textarea
                  id="additional-info"
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                  placeholder="Any specific clauses or requirements..."
                  className="min-h-[80px]"
                />
              </div>

              {/* Generate Button */}
              <Button 
                onClick={handleGenerate}
                className="w-full bg-primary hover:bg-primary/90"
                disabled={!selectedDocType || !formData.companyName || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
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
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                    Generated Document
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyToClipboard}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownload}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="bg-muted rounded-lg p-4 max-h-[600px] overflow-auto">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono">
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
