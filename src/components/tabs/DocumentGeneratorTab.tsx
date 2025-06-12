
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { FileText, Download, Eye, Loader2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '../ui/use-toast';

interface DocumentFormData {
  companyName: string;
  founders: string;
  businessType: string;
  shareCapital: string;
  registeredAddress: string;
  businessObjects: string;
}

export const DocumentGeneratorTab: React.FC = () => {
  const [selectedDocType, setSelectedDocType] = useState('');
  const [formData, setFormData] = useState<DocumentFormData>({
    companyName: '',
    founders: '',
    businessType: '',
    shareCapital: '',
    registeredAddress: '',
    businessObjects: ''
  });
  const [generatedDocument, setGeneratedDocument] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  const documentTypes = [
    {
      id: 'shareholders-agreement',
      title: 'Shareholders Agreement',
      description: 'Comprehensive agreement for founder equity and governance',
      category: 'Incorporation',
      template: `SHAREHOLDERS AGREEMENT

This Shareholders Agreement is made on [DATE] between the shareholders of [COMPANY_NAME], a company incorporated under the laws of the Federal Republic of Nigeria.

PARTIES:
[FOUNDERS_LIST]

SHARE CAPITAL:
The authorized share capital of the Company is ₦[SHARE_CAPITAL] divided into shares of ₦1.00 each.

BUSINESS OBJECTS:
[BUSINESS_OBJECTS]

GOVERNANCE:
1. Board of Directors shall consist of [BOARD_SIZE] directors
2. Quorum for board meetings: [QUORUM]
3. Decision making: Majority vote required

TRANSFER RESTRICTIONS:
1. Right of first refusal applies to all share transfers
2. Pre-emption rights for existing shareholders
3. Drag-along and tag-along provisions apply

VESTING:
Standard 4-year vesting with 1-year cliff applies to founder shares.

This agreement is governed by Nigerian law and subject to Lagos jurisdiction.`
    },
    {
      id: 'employment-contract',
      title: 'Employment Contract',
      description: 'Standard employment agreement template',
      category: 'Contracts',
      template: `EMPLOYMENT CONTRACT

EMPLOYER: [COMPANY_NAME]
EMPLOYEE: [EMPLOYEE_NAME]
POSITION: [POSITION]

TERMS OF EMPLOYMENT:
1. Commencement: [START_DATE]
2. Probation Period: 6 months
3. Salary: ₦[SALARY] per month
4. Working Hours: 40 hours per week

DUTIES AND RESPONSIBILITIES:
[JOB_DESCRIPTION]

BENEFITS:
- Annual leave: 21 working days
- Health insurance coverage
- Pension contribution as per Nigerian law

CONFIDENTIALITY:
Employee agrees to maintain confidentiality of company information.

INTELLECTUAL PROPERTY:
All work-related IP belongs to the Company.

TERMINATION:
Either party may terminate with 1 month written notice.

Governed by Nigerian Labour Act and Employment laws.`
    },
    {
      id: 'nda',
      title: 'Non-Disclosure Agreement',
      description: 'Protect confidential information and trade secrets',
      category: 'Contracts',
      template: `NON-DISCLOSURE AGREEMENT

This NDA is between [COMPANY_NAME] (Disclosing Party) and [RECIPIENT_NAME] (Receiving Party).

CONFIDENTIAL INFORMATION:
All non-public information shared during business discussions.

OBLIGATIONS:
1. Maintain strict confidentiality
2. Use information only for evaluation purposes
3. Return all materials upon request

DURATION: 
This agreement remains in effect for 2 years from signing.

REMEDIES:
Breach may result in injunctive relief and damages.

GOVERNING LAW:
This agreement is governed by Nigerian law.`
    },
    {
      id: 'memart',
      title: 'MEMART Form',
      description: 'Memorandum and Articles of Association',
      category: 'CAC Registration',
      template: `MEMORANDUM OF ASSOCIATION
OF
[COMPANY_NAME]

1. NAME OF COMPANY
The name of the company is "[COMPANY_NAME]"

2. REGISTERED OFFICE
The registered office of the company is situated at:
[REGISTERED_ADDRESS]

3. OBJECTS
The objects for which the company is established are:
[BUSINESS_OBJECTS]

4. LIABILITY
The liability of the members is limited.

5. SHARE CAPITAL
The authorized share capital is ₦[SHARE_CAPITAL] divided into shares of ₦1.00 each.

ARTICLES OF ASSOCIATION

INTERPRETATION
1. In these Articles, words and expressions have meanings assigned by CAMA 2020.

SHARE CAPITAL
2. Subject to provisions of the Act, shares may be issued with or without voting rights.

BOARD OF DIRECTORS
3. The number of directors shall not be less than 2.
4. Directors shall be appointed by ordinary resolution.

MEETINGS
5. Annual General Meeting shall be held within 15 months of incorporation.`
    }
  ];

  const handleGenerate = async () => {
    if (!selectedDocType || !formData.companyName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const selectedDoc = documentTypes.find(doc => doc.id === selectedDocType);
      if (!selectedDoc) throw new Error('Document template not found');

      // Generate document using the template and form data
      let document = selectedDoc.template;
      
      // Replace placeholders with form data
      document = document.replace(/\[COMPANY_NAME\]/g, formData.companyName);
      document = document.replace(/\[SHARE_CAPITAL\]/g, formData.shareCapital || '1,000,000');
      document = document.replace(/\[REGISTERED_ADDRESS\]/g, formData.registeredAddress || 'To be provided');
      document = document.replace(/\[BUSINESS_OBJECTS\]/g, formData.businessObjects || 'General commercial activities as permitted by law');
      document = document.replace(/\[FOUNDERS_LIST\]/g, formData.founders || 'Founder names to be inserted');
      document = document.replace(/\[BUSINESS_TYPE\]/g, formData.businessType || 'Technology');
      document = document.replace(/\[DATE\]/g, new Date().toLocaleDateString());
      document = document.replace(/\[BOARD_SIZE\]/g, formData.founders ? formData.founders.split(',').length.toString() : '2');
      document = document.replace(/\[QUORUM\]/g, '2');

      // Use AI to enhance the document
      const { data, error } = await supabase.functions.invoke('chat-ai', {
        body: { 
          message: `Please review and enhance this ${selectedDoc.title} for a Nigerian startup. Make it more comprehensive and legally compliant with CAMA 2020:\n\n${document}`,
          context: `Company: ${formData.companyName}, Business: ${formData.businessType}, Founders: ${formData.founders}`
        }
      });

      if (error) throw error;

      setGeneratedDocument(data.response);
      setShowPreview(true);
      
      toast({
        title: "Document Generated",
        description: `${selectedDoc.title} has been generated successfully`,
      });
    } catch (error) {
      console.error('Document generation error:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generatedDocument], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedDocType}-${formData.companyName || 'document'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
          {!showPreview ? (
            <>
              {/* Document Type Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Select Document Type</CardTitle>
                  <CardDescription>Choose the legal document you need to generate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <Label htmlFor="companyName">Company Name *</Label>
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
                        <Label htmlFor="founders">Founders (comma-separated)</Label>
                        <Input
                          id="founders"
                          placeholder="John Doe, Jane Smith"
                          value={formData.founders}
                          onChange={(e) => setFormData({...formData, founders: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="shareCapital">Share Capital (₦)</Label>
                        <Input
                          id="shareCapital"
                          placeholder="1,000,000"
                          value={formData.shareCapital}
                          onChange={(e) => setFormData({...formData, shareCapital: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="registeredAddress">Registered Address</Label>
                      <Input
                        id="registeredAddress"
                        placeholder="Company registered office address"
                        value={formData.registeredAddress}
                        onChange={(e) => setFormData({...formData, registeredAddress: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessObjects">Business Objects</Label>
                      <Textarea
                        id="businessObjects"
                        placeholder="Describe the main business activities and objects of the company"
                        value={formData.businessObjects}
                        onChange={(e) => setFormData({...formData, businessObjects: e.target.value})}
                        rows={3}
                      />
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                      <Button 
                        onClick={handleGenerate} 
                        disabled={isGenerating || !formData.companyName}
                        className="bg-primary hover:bg-primary/90"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <FileText className="w-4 h-4 mr-2" />
                            Generate Document
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            /* Document Preview */
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Generated Document Preview</CardTitle>
                    <CardDescription>Review your generated document below</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => setShowPreview(false)}>
                      <Eye className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button onClick={handleDownload}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm font-mono">{generatedDocument}</pre>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
