
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
      },
      {
        id: '5',
        title: 'Data Protection and Privacy Compliance (NDPR)',
        category: 'Sector Regulations',
        content: `# Nigeria Data Protection Regulation (NDPR) Compliance Guide

## Overview of NDPR Requirements

### What is NDPR?
The Nigeria Data Protection Regulation (NDPR) 2019 is the primary data protection law in Nigeria, enforced by the National Information Technology Development Agency (NITDA).

### Key Definitions
- **Personal Data**: Any information relating to an identified or identifiable natural person
- **Data Controller**: Person/entity that determines purposes and means of processing
- **Data Processor**: Person/entity that processes personal data on behalf of controller
- **Data Subject**: Individual whose personal data is being processed

## Compliance Requirements for Startups

### 1. Lawful Basis for Processing
- **Consent**: Clear, specific, informed and unambiguous
- **Contract**: Necessary for contract performance
- **Legal Obligation**: Required by Nigerian law
- **Vital Interests**: Protection of life/health
- **Public Task**: Public interest/official authority
- **Legitimate Interests**: Balanced against data subject rights

### 2. Data Subject Rights
- **Right to Information**: Clear notice about data processing
- **Right of Access**: Copy of personal data and processing info
- **Right to Rectification**: Correction of inaccurate data
- **Right to Erasure**: Deletion in certain circumstances
- **Right to Object**: Opt-out of certain processing activities
- **Right to Data Portability**: Transfer data between services

### 3. Technical and Organizational Measures
#### Security Requirements:
- **Encryption**: Data at rest and in transit
- **Access Controls**: Role-based permissions
- **Audit Logs**: Processing activity records
- **Regular Backups**: Data recovery procedures
- **Staff Training**: Privacy awareness programs

#### Privacy by Design:
- **Data Minimization**: Collect only necessary data
- **Purpose Limitation**: Use data only for stated purposes
- **Storage Limitation**: Retain data only as long as needed
- **Accuracy**: Keep data up-to-date and correct

### 4. Privacy Policies and Notices
#### Required Elements:
- Identity and contact details of controller
- Purposes and legal basis for processing
- Categories of personal data collected
- Recipients or categories of recipients
- Retention periods or criteria
- Data subject rights and how to exercise them
- Right to lodge complaint with NITDA
- Whether provision is statutory/contractual requirement

### 5. Data Breach Management
#### Response Timeline:
- **72 Hours**: Report to NITDA if high risk
- **Without Delay**: Notify affected individuals if high risk
- **Documentation**: Maintain breach register

#### Breach Response Steps:
1. **Contain the Breach**: Immediate action to stop further exposure
2. **Assess the Risk**: Determine likelihood and severity of harm
3. **Notify Authorities**: Report to NITDA within 72 hours
4. **Inform Data Subjects**: Direct notification if high risk
5. **Document Everything**: Create detailed breach report
6. **Review and Improve**: Update security measures

## Penalties and Enforcement

### Financial Penalties
- **Individuals**: Up to ₦10 million or 2% of annual gross revenue
- **Organizations**: Up to ₦10 million or 2% of annual gross revenue
- **Repeat Offenders**: Enhanced penalties

### Other Sanctions
- **Audit Requirements**: Mandatory privacy audits
- **Training Orders**: Staff privacy training
- **System Improvements**: Technical measure upgrades
- **Public Reprimands**: Reputational damage

## Implementation Checklist for Startups

### Phase 1: Assessment (Week 1-2)
- [ ] Conduct data mapping exercise
- [ ] Identify lawful basis for processing
- [ ] Review current privacy practices
- [ ] Assess third-party vendor compliance

### Phase 2: Documentation (Week 3-4)
- [ ] Draft privacy policy and notices
- [ ] Create data processing agreements
- [ ] Develop breach response procedures
- [ ] Document technical security measures

### Phase 3: Implementation (Week 5-8)
- [ ] Deploy privacy notices on website/app
- [ ] Implement consent management systems
- [ ] Train staff on NDPR requirements
- [ ] Establish data subject request procedures

### Phase 4: Monitoring (Ongoing)
- [ ] Regular privacy impact assessments
- [ ] Quarterly compliance reviews
- [ ] Annual security audits
- [ ] Continuous staff training

## Special Considerations for Startups

### Cross-Border Data Transfers
- **Adequacy Decisions**: NITDA-approved countries
- **Standard Contractual Clauses**: For transfers to third countries
- **Binding Corporate Rules**: For multinational groups
- **Derogations**: Limited exceptions for specific situations

### Employee Data Processing
- **HR Policies**: Clear data processing notices
- **Consent vs. Legal Basis**: Employment context considerations
- **Monitoring**: Legitimate interests balancing test
- **Retention**: Employment record keeping requirements

### Marketing and Communications
- **Email Marketing**: Explicit consent required
- **Cookies and Tracking**: Clear notice and consent
- **Social Media**: Platform-specific compliance
- **Analytics**: Anonymization and pseudonymization

### International Compliance Overlap
- **GDPR Alignment**: Similar principles and requirements
- **US Privacy Laws**: State-specific requirements (CCPA, etc.)
- **Industry Standards**: ISO 27001, SOC 2 compliance
- **Customer Requirements**: Enterprise client data protection demands

**📋 Next Steps**: Conduct comprehensive data audit and implement privacy-by-design principles from day one.

**⚠️ Important**: NDPR compliance is not optional. Non-compliance can result in significant financial penalties and reputational damage.`,
        tags: ['NDPR', 'data protection', 'privacy', 'NITDA', 'compliance'],
        lastUpdated: '2024-01-12'
      },
      {
        id: '6',
        title: 'Employment Law and HR Compliance for Nigerian Startups',
        category: 'Legal Documents',
        content: `# Employment Law Compliance Guide for Nigerian Startups

## Legal Framework Overview

### Primary Laws Governing Employment
- **Labour Act 2004**: Basic employment rights and obligations
- **Employees Compensation Act 2010**: Workplace injury compensation
- **National Minimum Wage Act 2019**: Minimum wage requirements
- **Pension Reform Act 2014**: Retirement savings obligations
- **National Health Insurance Scheme Act**: Healthcare provisions

## Employment Contract Essentials

### Mandatory Contract Terms
- **Job Title and Description**: Clear role definition
- **Remuneration**: Salary, benefits, payment schedule
- **Working Hours**: Standard hours, overtime provisions
- **Probationary Period**: Maximum 6 months for most roles
- **Termination Clauses**: Notice periods, grounds for dismissal
- **Confidentiality**: Trade secrets and non-disclosure
- **Intellectual Property**: Work-for-hire provisions

### Contract Types Available
#### 1. Permanent Employment
- **Full Benefits**: Pension, healthcare, leave entitlements
- **Job Security**: Statutory protection against unfair dismissal
- **Notice Requirements**: 1-3 months based on length of service

#### 2. Fixed-Term Contracts
- **Duration**: Clearly defined start and end dates
- **Renewal**: Automatic conversion rules after multiple renewals
- **Benefits**: Pro-rated entitlements

#### 3. Casual/Contract Work
- **Flexibility**: Project-based engagement
- **Limited Benefits**: Statutory minimums only
- **Tax Implications**: Different withholding requirements

### Probationary Period Rules
- **Duration**: Maximum 6 months (3 months for junior roles)
- **Extension**: Only with employee consent
- **Termination**: Shorter notice period (1 week minimum)
- **Conversion**: Automatic permanent status after probation

## Compensation and Benefits

### National Minimum Wage (2024)
- **Federal Minimum**: ₦30,000 per month
- **State Variations**: Some states set higher minimums
- **Sectors**: Different rates for different industries
- **Review**: Subject to periodic government review

### Mandatory Benefits
#### Leave Entitlements:
- **Annual Leave**: Minimum 6 working days per year of service
- **Sick Leave**: 12 working days per year (with medical certificate)
- **Maternity Leave**: 12 weeks (6 weeks pre-birth, 6 weeks post-birth)
- **Paternity Leave**: Not mandatory under federal law
- **Public Holidays**: 9-12 days per year (state-dependent)

#### Statutory Deductions:
- **Pension**: 8% employee + 10% employer contribution
- **NHIS**: 1.75% of basic salary (shared 1.25% employer, 0.5% employee)
- **NHF**: 2.5% of monthly income (for housing fund)
- **NSITF**: 1% of total monthly payroll (employer only)
- **ITF**: 1% of annual payroll (employer only)

### Overtime and Working Hours
- **Standard Hours**: 8 hours per day, 40 hours per week
- **Overtime Rate**: Time and a half (150% of normal rate)
- **Night Work**: Additional 25% premium (10 PM - 6 AM)
- **Weekend Work**: Double time on Sundays and public holidays
- **Maximum Hours**: 12 hours per day including overtime

## Termination and Dismissal

### Grounds for Termination
#### Justified Termination (No Compensation):
- **Misconduct**: Theft, fraud, insubordination
- **Incompetence**: After documented warnings and training
- **Redundancy**: Economic necessity with proper process
- **Medical Incapacity**: Permanent inability to perform duties

#### Unjustified Termination Compensation:
- **3 Months Salary**: Minimum compensation
- **Notice Pay**: If proper notice not given
- **Accrued Benefits**: Outstanding leave, bonuses
- **Severance**: Based on length of service

### Termination Procedures
#### For Cause Termination:
1. **Investigation**: Fair and thorough inquiry
2. **Warning**: Written notice of issues
3. **Opportunity**: Employee chance to respond
4. **Decision**: Documented termination decision
5. **Final Pay**: Outstanding salary and benefits

#### Redundancy Process:
1. **Consultation**: Employee/union consultation
2. **Selection Criteria**: Fair and objective criteria
3. **Alternative Employment**: Other role opportunities
4. **Notice Period**: Statutory or contractual minimum
5. **Severance Pay**: Based on length of service

### Notice Periods
- **During Probation**: 1 week minimum
- **Under 1 Year**: 1 month notice
- **1-5 Years**: 2 months notice
- **Over 5 Years**: 3 months notice
- **Senior Management**: Often longer contractual periods

## Health and Safety Obligations

### Employer Responsibilities
- **Safe Workplace**: Free from hazards and risks
- **Safety Training**: Regular safety awareness programs
- **Protective Equipment**: Provide necessary safety gear
- **Emergency Procedures**: Fire safety, first aid protocols
- **Insurance**: NSITF registration and contributions
- **Medical Examinations**: Pre-employment and periodic health checks

### Employee Rights
- **Safe Working Conditions**: Right to refuse unsafe work
- **Safety Training**: Right to receive proper training
- **Reporting**: Right to report safety concerns
- **Compensation**: Workplace injury compensation through NSITF

## Anti-Discrimination and Equal Opportunity

### Protected Characteristics
- **Gender**: Equal pay and opportunity
- **Religion**: Accommodation of religious practices
- **Ethnicity**: Non-discrimination in hiring/promotion
- **Disability**: Reasonable accommodation requirements
- **Age**: Protection against age discrimination

### Workplace Harassment
- **Sexual Harassment**: Zero tolerance policies required
- **Bullying**: Workplace anti-bullying measures
- **Complaint Procedures**: Internal grievance mechanisms
- **Investigation**: Fair and prompt investigation process

## Record Keeping Requirements

### Employment Records
- **Personal Files**: Employee personal information
- **Contract Records**: All employment agreements
- **Payroll Records**: Salary, deductions, benefits
- **Leave Records**: Annual leave, sick leave tracking
- **Training Records**: Skills development documentation

### Retention Periods
- **Employment Contracts**: 6 years after termination
- **Payroll Records**: 6 years for tax purposes
- **Tax Records**: 6 years minimum
- **Safety Records**: 40 years for health surveillance
- **Disciplinary Records**: 2 years after resolution

## Startup-Specific Considerations

### Equity Compensation
- **ESOP Plans**: Employee stock option schemes
- **Vesting Schedules**: 4-year standard with 1-year cliff
- **Tax Implications**: Benefit-in-kind treatment
- **Documentation**: Option agreements and plan rules

### Remote Work Policies
- **Work from Home**: Flexible working arrangements
- **Equipment Provision**: Laptop, internet allowances
- **Performance Management**: Remote work productivity
- **Health and Safety**: Home office safety requirements

### International Teams
- **Visa Requirements**: Work permit obligations
- **Tax Residency**: 183-day rule implications
- **Social Security**: Totalization agreements
- **Currency**: Salary payment in Naira vs. foreign currency

### Contractor vs. Employee Classification
- **Control Test**: Degree of employer control
- **Integration Test**: How integrated into business
- **Economic Reality**: Financial dependence
- **Consequences**: Misclassification penalties

**🚨 Compliance Alert**: Employment law violations can result in significant penalties and regulatory scrutiny. Maintain proper HR policies and procedures from day one.

**💡 Pro Tip**: Consider engaging an employment lawyer to review your HR policies and employment contracts to ensure full compliance.`,
        tags: ['employment law', 'HR', 'contracts', 'labour act', 'compliance'],
        lastUpdated: '2024-01-14'
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
