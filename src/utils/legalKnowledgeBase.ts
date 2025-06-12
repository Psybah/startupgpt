
export interface LegalDocument {
  id: string;
  title: string;
  category: string;
  content: string;
  tags: string[];
  lastUpdated: string;
}

export interface ComplianceRequirement {
  requirement: string;
  deadline: string;
  penalty: string;
  description: string;
}

export class NigerianLegalKB {
  private static instance: NigerianLegalKB;
  private documents: LegalDocument[] = [];
  private complianceData: Record<string, ComplianceRequirement[]> = {};

  static getInstance(): NigerianLegalKB {
    if (!NigerianLegalKB.instance) {
      NigerianLegalKB.instance = new NigerianLegalKB();
      NigerianLegalKB.instance.initializeKnowledgeBase();
    }
    return NigerianLegalKB.instance;
  }

  private initializeKnowledgeBase() {
    // Core Nigerian startup legal documents
    this.documents = [
      {
        id: '1',
        title: 'Complete Guide to CAC Registration in 2024',
        category: 'Company Formation',
        content: `# CAC Registration Process for Nigerian Startups

## Step 1: Name Reservation (1-2 days)
- **Cost**: ₦500 per name search
- **Requirements**: 3 alternative names + business nature
- **Validity**: 60 days
- **Process**: Submit online via CAC portal or visit nearest office

## Step 2: Document Preparation
### Required Documents:
- **MEMART** (Memorandum and Articles of Association)
- **CAC Form 1.1** (Application for registration)
- **CAC Form 4** (Statement of compliance)
- **CAC Form 7** (Particulars of directors)
- **Consent forms** from all directors/shareholders

### Key Requirements:
- Minimum 2 directors (1 must be Nigerian resident)
- Registered office address in Nigeria
- Share capital structure defined

## Step 3: CAC Submission & Registration
- **Cost**: ₦10,000 - ₦25,000 (based on authorized share capital)
- **Duration**: 7-14 working days
- **Documents**: Completed forms + ID + passport photos + proof of address

## Step 4: Post-Registration Compliance
### Mandatory Registrations:
1. **TIN Registration** (FIRS) - Free
2. **VAT Registration** (if turnover > ₦25M annually)
3. **NSITF Registration** (workplace insurance)
4. **ITF Registration** (skills development levy)
5. **Pension Registration** (if 3+ employees)

### Annual Obligations:
- Annual returns filing (within 42 days of AGM)
- Annual General Meeting (within 15 months)
- Audited financial statements (if applicable)

**💡 Pro Tip**: Use a registered office service if you don't have a physical office yet.`,
        tags: ['CAC', 'registration', 'incorporation', 'startup'],
        lastUpdated: '2024-01-15'
      },
      {
        id: '2',
        title: 'Shareholder Agreement Template for Nigerian Startups',
        category: 'Legal Documents',
        content: `# Shareholder Agreement Essentials

## Key Provisions for Nigerian Startups

### 1. Equity Structure & Share Classes
- **Ordinary Shares**: Voting rights + dividend rights
- **Preference Shares**: Priority dividends, liquidation preference
- **Share Transfer Restrictions**: Right of first refusal, pre-emption rights

### 2. Board Composition & Governance
- **Board Size**: Typically 3-7 directors
- **Appointment Rights**: Based on shareholding thresholds
- **Reserved Matters**: Requiring unanimous/special majority consent

### 3. Founder Protections
#### Vesting Schedules:
- **Standard**: 4-year vesting with 1-year cliff
- **Acceleration**: Single/double trigger on exit events
- **Good Leaver/Bad Leaver**: Different vesting treatments

#### Anti-Dilution Protection:
- **Full Ratchet**: Maximum protection for founders
- **Weighted Average**: More balanced approach

### 4. Investment Terms
- **Valuation Methodology**: Pre-money vs post-money
- **Liquidation Preferences**: 1x non-participating preferred standard
- **Drag-Along Rights**: Force minority to join majority sale
- **Tag-Along Rights**: Allow minority to join majority sale

### 5. Employee Stock Option Pool
- **Size**: 10-20% of total equity
- **Expansion**: Automatic increase triggers
- **Administration**: Option committee structure

### 6. Nigerian Law Compliance
- **Governing Law**: Laws of Federal Republic of Nigeria
- **Dispute Resolution**: Lagos arbitration preferred
- **Foreign Exchange**: CBN approval for foreign investments

**⚠️ Important**: This agreement must comply with CAMA 2020 and SEC regulations.`,
        tags: ['shareholder agreement', 'equity', 'governance', 'founders'],
        lastUpdated: '2024-01-10'
      },
      {
        id: '3',
        title: 'Employee Stock Option Plans (ESOP) in Nigeria',
        category: 'Equity & Investment',
        content: `# ESOP Implementation Guide for Nigerian Startups

## Legal Framework
- **CAMA 2020**: Allows employee share ownership
- **SEC Rules**: Registration required for public companies
- **Tax Implications**: Under review by FIRS

## ESOP Structure Options

### 1. Direct Share Ownership
- **Pros**: Simple, immediate ownership
- **Cons**: Complex administration, voting rights issues
- **Best For**: Small teams, early-stage startups

### 2. Share Option Scheme
- **Pros**: Flexibility, controlled dilution
- **Cons**: Exercise complexity, tax uncertainty
- **Best For**: Scaling startups, international teams

### 3. Phantom Share Plan
- **Pros**: Cash settlement, no dilution
- **Cons**: Company cash flow dependency
- **Best For**: Mature companies, specific incentives

## Implementation Steps

### Phase 1: Board Approval
1. **ESOP Resolution**: Board authorizes scheme
2. **Share Reserve**: Allocate equity pool (10-20%)
3. **Plan Document**: Draft comprehensive ESOP plan
4. **Valuation**: Independent share valuation

### Phase 2: Legal Documentation
- **ESOP Trust Deed** (if using trust structure)
- **Option Agreements** (individual employee contracts)
- **Plan Rules** (vesting, exercise, forfeiture)
- **Board Resolutions** (ongoing administration)

### Phase 3: Implementation
- **Employee Communication**: Education sessions
- **Grant Letters**: Individual allocations
- **Tracking System**: Vesting and exercise monitoring
- **Compliance**: Ongoing regulatory requirements

## Vesting Schedules
### Standard Structure:
- **Cliff Period**: 12 months (no vesting)
- **Vesting Period**: 36 months post-cliff
- **Total Duration**: 4 years
- **Acceleration**: Performance/exit triggers

### Alternative Structures:
- **Milestone-Based**: Product launch, revenue targets
- **Performance Vesting**: KPI achievement
- **Time + Performance**: Hybrid approach

## Tax Considerations
### Current Position:
- **Grant**: Generally no tax implication
- **Exercise**: Potential benefit-in-kind tax
- **Sale**: Capital gains tax may apply

### Planning Strategies:
- **Early Exercise**: Minimize future tax
- **Section 83(b) Election**: US-style early taxation
- **Tax Gross-Up**: Company covers employee tax

## Foreign Exchange Considerations
- **CBN Approval**: Required for foreign investor participation
- **Forex Allocation**: Exercise payments in foreign currency
- **Repatriation**: Exit proceeds for foreign employees

**🚨 Compliance Alert**: Consult tax advisor before implementation.`,
        tags: ['ESOP', 'equity', 'employees', 'taxation', 'CBN'],
        lastUpdated: '2024-01-08'
      },
      {
        id: '4',
        title: 'FinTech Regulatory Landscape in Nigeria',
        category: 'Sector Regulations',
        content: `# FinTech Regulatory Guide for Nigerian Startups

## Primary Regulators

### Central Bank of Nigeria (CBN)
- **Payment Services**: Licensing and oversight
- **Banking Operations**: Traditional and digital banking
- **Foreign Exchange**: Forex regulations and compliance

### Securities and Exchange Commission (SEC)
- **Capital Markets**: Securities offerings and trading
- **Investment Management**: Fund management and advisory
- **Digital Assets**: Cryptocurrency and tokenization

### Nigerian Deposit Insurance Corporation (NDIC)
- **Deposit Protection**: Insured deposit schemes
- **Resolution**: Failed financial institution handling

## FinTech License Categories

### 1. Payment Service Bank (PSB)
- **Minimum Capital**: ₦50 billion
- **Services**: Deposits, payments, remittances
- **Restrictions**: No lending, branch limitations

### 2. Mobile Money Operator (MMO)
- **Minimum Capital**: ₦2 billion
- **Services**: Mobile payments, money transfers
- **Requirements**: Telecom partnership mandatory

### 3. Switching Company
- **Minimum Capital**: ₦1 billion
- **Services**: Payment switching and processing
- **Network**: Inter-bank transaction routing

### 4. Payment Terminal Service Provider (PTSP)
- **Minimum Capital**: ₦100 million
- **Services**: POS deployment and management
- **Coverage**: Agent network development

## Regulatory Sandboxes

### CBN Regulatory Sandbox
- **Purpose**: Test innovative financial services
- **Duration**: Up to 12 months (extendable)
- **Benefits**: Relaxed compliance, market testing
- **Application**: Quarterly intake windows

### SEC FinTech Roadmap
- **Digital Assets**: Cryptocurrency regulations
- **Crowdfunding**: Securities-based fundraising
- **Robo-Advisory**: Automated investment advice

## Compliance Requirements

### Anti-Money Laundering (AML)
- **Customer Due Diligence**: KYC procedures
- **Transaction Monitoring**: Suspicious activity reporting
- **Record Keeping**: 5-year retention requirement
- **SCUML Registration**: Special Control Unit compliance

### Data Protection
- **NDPR Compliance**: Nigeria Data Protection Regulation
- **Data Security**: Encryption and storage requirements
- **Privacy Policies**: User consent and notification
- **Cross-Border**: Data transfer restrictions

### Consumer Protection
- **Dispute Resolution**: Customer complaint handling
- **Disclosure**: Terms and conditions transparency
- **Fair Pricing**: No discriminatory pricing
- **Service Availability**: Uptime requirements

## Capital Requirements Summary

| License Type | Minimum Capital | Processing Time |
|--------------|----------------|-----------------|
| PSB | ₦50 billion | 6-12 months |
| MMO | ₦2 billion | 3-6 months |
| Switching | ₦1 billion | 3-6 months |
| PTSP | ₦100 million | 2-4 months |

## Recent Regulatory Updates (2024)
- **eNaira Integration**: CBDC adoption requirements
- **Open Banking**: API standardization mandate
- **Crypto Regulation**: SEC digital asset framework
- **Tax Digitalization**: FIRS electronic payment push

**📋 Next Steps**: Identify specific license requirements for your FinTech model.`,
        tags: ['fintech', 'CBN', 'SEC', 'licensing', 'compliance'],
        lastUpdated: '2024-01-05'
      }
    ];

    // Compliance requirements by business type
    this.complianceData = {
      'limited-company': [
        {
          requirement: 'Annual Returns Filing',
          deadline: 'Within 42 days of AGM',
          penalty: '₦50,000 + potential strike-off',
          description: 'Submit annual returns to CAC with updated company information'
        },
        {
          requirement: 'Annual General Meeting',
          deadline: 'Within 15 months of incorporation, then annually',
          penalty: 'Default fine + director liability',
          description: 'Hold AGM to present accounts and elect directors'
        },
        {
          requirement: 'Audited Financial Statements',
          deadline: 'Companies with turnover > ₦120M annually',
          penalty: 'Qualification of accounts',
          description: 'Independent audit of financial statements required'
        }
      ],
      'fintech': [
        {
          requirement: 'CBN License Renewal',
          deadline: 'Annually before expiration',
          penalty: 'License revocation',
          description: 'Renew payment service provider license'
        },
        {
          requirement: 'AML/CFT Compliance',
          deadline: 'Ongoing',
          penalty: 'Fines up to ₦10M + license suspension',
          description: 'Maintain anti-money laundering procedures'
        }
      ]
    };
  }

  searchDocuments(query: string, category?: string): LegalDocument[] {
    const searchTerm = query.toLowerCase();
    return this.documents.filter(doc => {
      const matchesCategory = !category || doc.category === category;
      const matchesQuery = 
        doc.title.toLowerCase().includes(searchTerm) ||
        doc.content.toLowerCase().includes(searchTerm) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchTerm));
      
      return matchesCategory && matchesQuery;
    });
  }

  getDocumentById(id: string): LegalDocument | undefined {
    return this.documents.find(doc => doc.id === id);
  }

  getCategories(): string[] {
    return [...new Set(this.documents.map(doc => doc.category))];
  }

  getComplianceRequirements(businessType: string): ComplianceRequirement[] {
    return this.complianceData[businessType] || [];
  }

  getAllDocuments(): LegalDocument[] {
    return this.documents;
  }
}
