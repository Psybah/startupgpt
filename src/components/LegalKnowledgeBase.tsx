
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

export const LegalKnowledgeBase: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const knowledgeBase = [
    {
      id: 'company-formation',
      title: 'Company Formation',
      description: 'CAC registration, business structures, and incorporation processes',
      content: `
**Step 1: Name Reservation**
• Cost: ₦500 per search
• Duration: 1-2 business days
• Requirements: 3 alternative names + business nature description

**Step 2: Document Preparation**
• Essential documents: MEMART, ARTS, CAC 1.1 Form
• Founders' agreement (recommended before registration)
• Share capital structure (minimum ₦10)

**Step 3: Submission & Processing**
• Online portal: https://pre.cac.gov.ng
• Processing time: 5-7 business days
• Certificate of incorporation issued upon approval
      `
    },
    {
      id: 'equity-structures',
      title: 'Equity Structures',
      description: 'Shareholding arrangements, vesting schedules, and ESOP implementation',
      content: `
**Founder Equity Distribution**
• Equal split: 33.3% each (for 3 founders)
• Contribution-based: Weight by time, money, idea, execution
• Standard vesting: 4 years with 1-year cliff

**Employee Stock Option Pool (ESOP)**
• Typical size: 15-20% of total equity
• Vesting schedule: Monthly over 4 years
• Exercise price: Fair market value at grant date

**Legal Requirements**
• Minimum directors: 2 for private companies
• Share transfer restrictions in Articles
• Right of first refusal provisions
      `
    },
    {
      id: 'regulatory-compliance',
      title: 'Regulatory Compliance',
      description: 'Ongoing legal obligations and regulatory requirements',
      content: `
**Post-Incorporation Requirements**
• Tax Identification Number (TIN) registration
• VAT registration (if turnover > ₦25M annually)
• NSITF and pension fund registration

**Annual Compliance**
• Annual returns filing with CAC
• Audited financial statements
• Board resolutions documentation

**Sector-Specific Regulations**
• FinTech: CBN licensing requirements
• HealthTech: NAFDAC approvals
• EdTech: Ministry of Education compliance
      `
    },
    {
      id: 'ip-protection',
      title: 'IP Protection',
      description: 'Trademark registration, patent filing, and intellectual property strategy',
      content: `
**Trademark Protection**
• Search and clearance: ₦5,000
• Filing fee: ₦15,000 per class
• Registration period: 12-18 months

**Copyright Protection**
• Automatic protection upon creation
• Optional registration for enhanced protection
• Software and content protection strategies

**Patent Filing**
• Patent search: ₦5,000
• Filing fee: ₦20,000 (small entity)
• Examination and grant process: 2-3 years
      `
    },
    {
      id: 'sector-regulations',
      title: 'Sector Regulations',
      description: 'Industry-specific compliance and licensing requirements',
      content: `
**Financial Technology (FinTech)**
• Payment Service Provider (PSP) license
• Mobile Money Operator (MMO) license
• Minimum capital requirements vary by category

**Healthcare Technology**
• NAFDAC registration for health products
• Data protection compliance (NDPR)
• Professional licensing requirements

**E-commerce & Retail**
• Consumer protection compliance
• Data privacy obligations
• Cross-border trade regulations
      `
    }
  ];

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Nigerian Legal Knowledge Base
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive resources covering all aspects of Nigerian startup law
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-4">
          {knowledgeBase.map((section) => (
            <Card key={section.id} className="overflow-hidden">
              <CardHeader 
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                    <CardDescription className="mt-2">{section.description}</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    {activeSection === section.id ? '−' : '+'}
                  </Button>
                </div>
              </CardHeader>
              
              {activeSection === section.id && (
                <CardContent className="pt-0">
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-line text-sm leading-relaxed text-foreground bg-muted/30 p-4 rounded-lg">
                      {section.content}
                    </pre>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
