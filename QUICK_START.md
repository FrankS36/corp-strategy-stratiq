# StratIQ - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Prerequisites
- Node.js 18+ installed
- Supabase account
- OpenAI API key

### 2. Setup

```bash
cd strat-iq-app
npm install
```

### 3. Configure Environment

Create `.env` file:

```env
OPENAI_API_KEY=sk-your-key-here
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Set Up Database

1. Create Supabase project
2. Copy `supabase-schema.sql` into SQL Editor
3. Run the schema

### 5. Run

```bash
npm run dev
```

Visit `http://localhost:5173`

## 📝 What You Built

An AI-powered strategic thinking app with:

- **Assumption Extraction** - AI identifies hidden assumptions in strategies
- **Devil's Advocate** - Generates challenging questions to pressure-test plans
- **Pre-Mortem Analysis** - Simulates failure scenarios to find weaknesses
- **Project Management** - Organize multiple strategy projects
- **Secure Auth** - User authentication via Supabase

## 🏗️ MVP Architecture

```
Frontend (Vite + TypeScript + Tailwind)
    ↓
Vercel Serverless Functions (AI Processing)
    ↓
OpenAI GPT-4 (Strategic Analysis)

Frontend (Vite + TypeScript + Tailwind)
    ↓
Supabase (Database + Auth)
```

## 📚 Documentation

- **Full README**: `strat-iq-app/README.md`
- **Deployment Guide**: `strat-iq-app/DEPLOYMENT.md`
- **Database Schema**: `strat-iq-app/supabase-schema.sql`

## 🎯 Core Features Reference

### Extract Assumptions
Analyzes strategy text and returns:
- Assumption text
- Category (desirability/feasibility/viability)
- Criticality score (1-5)
- Confidence score (1-5)

### Devil's Advocate
Generates 10 critical questions about:
- Key assumptions
- Potential weaknesses
- Competitive responses
- Market risks
- Feasibility concerns

### Pre-Mortem Analysis
Produces:
- Failure scenario narrative
- 5-7 specific failure reasons
- Risk mitigation insights

## 🚢 Deploy to Production

See `DEPLOYMENT.md` for complete guide.

Quick deploy to Vercel:

```bash
# Push to GitHub
git add .
git commit -m "Ready for deployment"
git push

# Go to vercel.com
# Import your GitHub repo
# Add environment variables
# Deploy!
```

## 📊 Cost Estimate

**Free Tier Usage:**
- Supabase: Free (up to 500MB DB, 50k users)
- Vercel: Free (100GB bandwidth/month)
- OpenAI: ~$0.02-0.05 per strategy analysis

**Monthly estimate for 100 analyses**: ~$2-5

## 🎓 What's Next?

Potential enhancements:
- Hypothesis tracking
- SWOT analysis framework
- Team collaboration
- Export to PDF
- Mobile app
- More strategic frameworks

## 🐛 Troubleshooting

**Can't connect to Supabase?**
- Check your `.env` file
- Verify credentials from Supabase dashboard

**OpenAI API errors?**
- Verify API key
- Check you have credits
- Review usage limits

**Build errors?**
- Node version 18+ required
- Run `npm install` again
- Check for TypeScript errors

## 💡 Tips

1. **Strategy Text**: Provide 200-500 words for best results
2. **Be Specific**: Include goals, markets, and key initiatives
3. **Iterate**: Run multiple analyses as you refine
4. **Export**: Copy insights to your own strategy docs

## 📧 Support

Questions or issues?
- Check the README
- Review deployment guide
- Create a GitHub issue

---

**Built based on the AI-Powered Strategic Thinking App PRD**

Ready to deploy? Follow `DEPLOYMENT.md` →
