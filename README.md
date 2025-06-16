# StartupGPT - AI Legal Partner for Nigerian Startups

<div align="center">
  <img src="public/lovable-uploads/81864f48-4da2-4487-86ea-0757c50afeee.png" alt="StartupGPT Logo" height="80">
  
  **Your AI Legal Companion for Nigerian Startup Success**
  
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)](https://supabase.com/)
  
  [Live Demo](https://startupgpt.vercel.app/) • [Documentation](#documentation) • [Contributing](#contributing)
</div>

## 🚀 Overview

StartupGPT is an AI-powered legal assistant specifically designed for Nigerian entrepreneurs and startups. It provides comprehensive guidance on company registration, legal document generation, regulatory compliance, and startup-specific legal requirements within the Nigerian business environment.

### 🎯 Key Problem Solved

Navigating Nigeria's complex legal landscape for startups is challenging and expensive. StartupGPT democratizes access to legal knowledge by providing:

- **Instant CAC registration guidance** with current costs and procedures
- **AI-generated legal documents** compliant with Nigerian law (CAMA 2020)
- **Sector-specific compliance** advice (FinTech, HealthTech, EdTech)
- **Cost-effective legal assistance** accessible 24/7

## ✨ Features

### 🤖 AI Legal Assistant
- **Smart Chat Interface** with context-aware responses
- **Nigerian Law Specialization** (CAMA 2020, SEC, CBN regulations)
- **Personalized Guidance** based on user profile and startup stage
- **Cost Estimates** in Nigerian Naira (₦) with accurate timeframes

### 📄 Document Generation
- **Shareholder Agreements** with equity structuring
- **Employment Contracts** and NDAs
- **MEMART** (Memorandum and Articles of Association)
- **Board Resolutions** and corporate templates
- **One-click download** in multiple formats

### 📚 Legal Knowledge Base
- **Comprehensive Guides** on CAC registration process
- **ESOP Implementation** strategies for Nigerian startups
- **FinTech Regulatory** landscape and licensing requirements
- **Compliance Tracking** with deadline management
- **Search & Filter** functionality across legal content

### 🎨 User Experience
- **Onboarding Flow** for personalized experience
- **Mobile-Responsive** design for accessibility
- **Professional UI** with enterprise-grade design
- **Real-time Updates** on legal requirements

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for utility-first styling
- **shadcn/ui + Radix UI** for accessible components
- **React Router** for client-side routing
- **React Query** for server state management

### Backend & AI
- **Supabase Edge Functions** (Deno runtime)
- **Groq API** with Llama3-8b-8192 model
- **PostgreSQL** database via Supabase
- **Real-time subscriptions** for instant updates

### Design & Fonts
- **Clash Display** typography for modern appeal
- **Lucide React** icons for consistency
- **Custom animations** and micro-interactions

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm (or use [nvm](https://github.com/nvm-sh/nvm))
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/psybah/startupgpt.git
   cd startupgpt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment template
   cp .env.example .env.local
   
   # Add your environment variables
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   GROQ_API=your_groq_api_key
   ```

4. **Start development server**
   ```bash
npm run dev
```

5. **Open in browser**
   ```
   http://localhost:8080
   ```

### Building for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
startupgpt/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── chat/            # Chat interface components
│   │   ├── onboarding/      # User onboarding flow
│   │   ├── tabs/            # Main application tabs
│   │   └── ui/              # Base UI components (shadcn/ui)
│   ├── hooks/               # Custom React hooks
│   ├── integrations/        # External service integrations
│   │   └── supabase/        # Supabase client and types
│   ├── lib/                 # Utility functions
│   ├── pages/               # Page components
│   ├── utils/               # Helper functions and data
│   └── index.css           # Global styles and Tailwind config
├── supabase/               # Supabase configuration
│   └── functions/          # Edge functions
│       └── chat-ai/        # AI chat backend
├── public/                 # Static assets
└── package.json           # Dependencies and scripts
```

## 🎯 Usage Guide

### For Startup Founders

1. **Complete Onboarding**: Select your founder type, startup stage, and priorities
2. **Ask Legal Questions**: Use the chat interface for instant legal guidance
3. **Generate Documents**: Create CAC-compliant legal documents
4. **Browse Knowledge Base**: Access comprehensive legal guides
5. **Track Compliance**: Monitor deadlines and requirements

### For Legal Professionals

1. **Access Advanced Features**: Utilize professional-grade document templates
2. **Client Consultation**: Use as a research and reference tool
3. **Stay Updated**: Access latest regulatory changes and requirements

### For Investors

1. **Due Diligence**: Review legal structure requirements
2. **Investment Documentation**: Generate investment-related legal documents
3. **Compliance Verification**: Understand regulatory requirements

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `GROQ_API` | Groq API key for AI features | Yes |

### Customization

- **Styling**: Modify `src/index.css` for design system changes
- **AI Prompts**: Update system prompts in `supabase/functions/chat-ai/index.ts`
- **Legal Content**: Extend knowledge base in `src/utils/legalKnowledgeBase.ts`

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit

# Build test
npm run build
```

## 🤝 Contributing

We welcome contributions to improve StartupGPT! Please follow these guidelines:

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m 'Add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Code Standards

- **TypeScript**: Use proper typing for all new code
- **ESLint**: Follow existing linting rules
- **Components**: Use functional components with hooks
- **Styling**: Utilize Tailwind CSS utilities
- **Naming**: Use descriptive, consistent naming conventions

### Legal Content Guidelines

- **Accuracy**: Ensure all legal information is current and accurate
- **Sources**: Cite relevant Nigerian laws and regulations
- **Disclaimers**: Include appropriate legal disclaimers
- **Updates**: Keep regulatory information current

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### Professional Legal Disclaimer

⚠️ **Important**: StartupGPT provides AI-generated guidance for informational purposes only. For complex legal matters, always consult with qualified Nigerian legal professionals. This tool does not replace professional legal advice.

## 🏆 Acknowledgments

- **shadcn/ui** for the excellent component library
- **Tailwind CSS** for the utility-first CSS framework
- **Supabase** for backend infrastructure
- **Groq** for AI model access
- **Nigerian Legal Community** for domain expertise validation

## 📈 Roadmap

- [ ] **User Authentication** and document history
- [ ] **Payment Integration** for premium features
- [ ] **Real-time Notifications** for regulatory updates
- [ ] **Multi-language Support** (Yoruba, Igbo, Hausa)
- [ ] **Lawyer Network Integration**
- [ ] **Mobile App** development
- [ ] **API Access** for third-party integrations

---

<div align="center">
  <strong>Built with ❤️ for the Nigerian startup ecosystem</strong>
  
  [Website](https://startupgpt.vercel.app/) • [Twitter](https://x.com/_cybersmith) • [LinkedIn](https://www.linkedin.com/in/oluwamurewa/)
</div>
