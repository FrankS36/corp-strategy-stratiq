# StratIQ - AI-Powered Strategic Thinking App

An AI-powered application that helps business leaders rigorously pressure-test their strategies through intelligent critical analysis.

## 📋 Overview

StratIQ acts as your strategic thinking coach - identifying hidden assumptions, asking tough questions, and simulating failure scenarios to help you craft stronger, more resilient strategies.

Built based on the comprehensive Product Requirements Document for an AI-Powered Strategic Thinking App.

## ✨ Key Features

- **🔍 Assumption Extraction** - AI automatically identifies and categorizes key assumptions in your strategy
- **👿 Devil's Advocate** - Generates 10+ challenging questions to pressure-test your plan
- **💀 Pre-Mortem Analysis** - Simulates future failure scenarios to uncover hidden risks
- **📊 Project Management** - Organize and track multiple strategy projects
- **🔐 Secure Authentication** - Enterprise-grade security with Supabase

## 🚀 Quick Start

```bash
cd strat-iq-app
npm install
npm run dev
```

See **[QUICK_START.md](QUICK_START.md)** for 5-minute setup guide.

## 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Get running in 5 minutes
- **[strat-iq-app/README.md](strat-iq-app/README.md)** - Full technical documentation
- **[DEPLOYMENT.md](strat-iq-app/DEPLOYMENT.md)** - Production deployment guide
- **[MVP_SUMMARY.md](MVP_SUMMARY.md)** - What was built and why
- **[prd.md](prd.md)** - Original product requirements

## 🏗️ Technology Stack

- **Frontend**: TypeScript, Vite, Tailwind CSS
- **Backend**: Vercel Serverless Functions
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenAI GPT-4
- **Auth**: Supabase Auth
- **Deployment**: Vercel

## 📸 What You Get

1. **Login & Dashboard**
   - Secure authentication
   - Overview of all strategy projects
   - Quick access to analyses

2. **Strategy Analysis**
   - Paste your strategy text
   - AI extracts assumptions automatically
   - Categorized by desirability, feasibility, viability
   - Criticality and confidence scores

3. **Devil's Advocate Mode**
   - 10 tough questions generated
   - Challenges assumptions
   - Explores weaknesses
   - Considers competitive response

4. **Pre-Mortem Scenarios**
   - "Imagine your strategy failed..."
   - Detailed failure narrative
   - 5-7 specific failure reasons
   - Risk mitigation insights

## 💡 Use Cases

- **Corporate Strategy Teams** - Pressure-test growth strategies
- **Product Leaders** - Validate product strategy assumptions
- **Startup Founders** - Vet business models before execution
- **Consultants** - Enhance client strategy work
- **Business Leaders** - Prepare for board presentations

## 🎯 MVP Status

✅ **Core Features Complete**
- Assumption extraction
- Devil's advocate questioning
- Pre-mortem analysis
- User authentication
- Project management
- Web interface

📅 **Future Enhancements**
- Hypothesis tracking
- SWOT analysis framework
- Team collaboration
- Export to PDF
- Mobile app

See **[MVP_SUMMARY.md](MVP_SUMMARY.md)** for complete feature breakdown.

## 💰 Cost Structure

**Free Tier (Perfect for MVP)**:
- Supabase: $0 (up to 500MB, 50k users)
- Vercel: $0 (100GB bandwidth)
- OpenAI: ~$0.02-0.05 per analysis

**Estimated**: $0-10/month for first 100 users

## 🚢 Deploy to Production

**One-Click Deploy to Vercel**:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or follow the complete guide: **[DEPLOYMENT.md](strat-iq-app/DEPLOYMENT.md)**

### Prerequisites
- GitHub account
- Vercel account (free)
- Supabase account (free)
- OpenAI API key

### Steps
1. Set up Supabase database
2. Get OpenAI API key
3. Push to GitHub
4. Import to Vercel
5. Add environment variables
6. Deploy!

Complete walkthrough in **[DEPLOYMENT.md](strat-iq-app/DEPLOYMENT.md)**

## 📖 How It Works

```
User enters strategy text
         ↓
   [OpenAI GPT-4]
         ↓
Extracts assumptions + categorizes
         ↓
Generates challenges + pre-mortem
         ↓
    Saves to Supabase
         ↓
  Displays in clean UI
```

## 🎓 Example Usage

**Input** (Strategy Text):
```
We plan to enter the premium coffee market in Seattle by opening
5 stores in Q1 2024. We'll target affluent millennials with
artisanal single-origin beans at $8/cup. We assume strong demand
based on market research showing 60% interest...
```

**Output** (AI Analysis):
- **Assumptions Identified**: 8
  - "Strong demand at $8 price point" (Desirability, Critical: 5, Confidence: 3)
  - "Can hire quality baristas in time" (Feasibility, Critical: 4, Confidence: 4)
  - "Unit economics work at this scale" (Viability, Critical: 5, Confidence: 2)

- **Devil's Advocate Questions**: 10
  - "What if competitors respond with price cuts?"
  - "How sensitive is demand to the $8 price point?"
  - "What's the backup plan if barista hiring falls short?"

- **Pre-Mortem Scenario**: Detailed failure narrative
  - "Competition undercut pricing by 30%..."
  - "Hiring delays pushed opening to Q2..."
  - "Premium positioning failed to resonate..."

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Local Setup
```bash
# Install dependencies
cd strat-iq-app
npm install

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Run development server
npm run dev
```

### Project Structure
```
strat-iq/
├── strat-iq-app/          # Main application
│   ├── api/               # Vercel serverless functions
│   ├── src/              # Frontend source
│   │   ├── lib/          # API & Supabase clients
│   │   ├── main.ts       # Main app code
│   │   └── style.css     # Styles
│   ├── supabase-schema.sql
│   └── vercel.json
├── prd.md                # Product requirements
├── QUICK_START.md        # Quick setup guide
├── DEPLOYMENT.md         # Deployment guide
└── MVP_SUMMARY.md        # Implementation summary
```

## 🤝 Contributing

This is an MVP. Contributions welcome!

1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit pull request

## 📄 License

MIT License - Use freely for your own projects

## 🙏 Acknowledgments

Based on strategic frameworks and research from:
- Alex Osterwalder (Strategyzer)
- McKinsey strategic planning practices
- Roger Martin's strategic choice frameworks
- MIT Sloan research on strategy formation

## 📧 Support

- **Documentation**: See `/docs` folder
- **Issues**: Create GitHub issue
- **Deployment Help**: See DEPLOYMENT.md

## 🎯 What's Next?

1. **Deploy** using DEPLOYMENT.md guide
2. **Test** with real strategies
3. **Gather** user feedback
4. **Iterate** on features
5. **Scale** as needed

---

## 🚀 Ready to Get Started?

Choose your path:

- **Just browsing?** → Read [MVP_SUMMARY.md](MVP_SUMMARY.md)
- **Want to try it?** → Follow [QUICK_START.md](QUICK_START.md)
- **Ready to deploy?** → See [DEPLOYMENT.md](strat-iq-app/DEPLOYMENT.md)
- **Developer?** → Check [strat-iq-app/README.md](strat-iq-app/README.md)

---

**Built with ❤️ to help leaders make better strategic decisions**

[Get Started](QUICK_START.md) • [Deploy](strat-iq-app/DEPLOYMENT.md) • [Read PRD](prd.md)
