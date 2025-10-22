# StratIQ - AI-Powered Strategic Thinking App

StratIQ is an MVP application that helps business leaders rigorously pressure-test their strategies through AI-powered critical analysis. It acts as an intelligent "strategy coach" that challenges plans, uncovers hidden assumptions, identifies logical gaps, and helps craft stronger strategies.

## Features

### Core MVP Features Implemented

1. **Assumption Extraction & Mapping**
   - Automatically identifies key assumptions from strategy text
   - Categorizes as desirability, feasibility, or viability
   - Assesses criticality and confidence levels

2. **Devil's Advocate AI Challenger**
   - Generates 10 tough, probing questions to pressure-test strategy
   - Challenges key assumptions
   - Explores potential weaknesses and competitive responses

3. **Pre-Mortem Scenario Generator**
   - Simulates future failure scenarios
   - Identifies 5-7 specific reasons why strategy might fail
   - Helps consider second-order effects and contingencies

4. **User Authentication**
   - Secure authentication via Supabase Auth
   - User signup and login

5. **Project Management**
   - Create and manage multiple strategy projects
   - Store strategy text and analysis results
   - View project dashboard

## Tech Stack

- **Frontend**: TypeScript + Vite + Tailwind CSS
- **Backend**: Vercel Serverless Functions
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenAI GPT-4
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ (recommended: v20+)
- npm or yarn
- Supabase account
- OpenAI API key

## Setup Instructions

### 1. Clone the Repository

```bash
cd strat-iq-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings → API
3. Copy your project URL and anon key
4. Go to SQL Editor and run the schema:

```sql
-- Copy and paste the contents of supabase-schema.sql
```

The schema file is located at `supabase-schema.sql` in the root directory.

### 4. Set Up OpenAI

1. Get your API key from [platform.openai.com](https://platform.openai.com)
2. Make sure you have credits in your OpenAI account

### 5. Configure Environment Variables

Create a `.env` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 6. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Deployment to Vercel

### 1. Install Vercel CLI (optional)

```bash
npm i -g vercel
```

### 2. Deploy

#### Option A: Via Vercel CLI

```bash
vercel
```

Follow the prompts to link your project.

#### Option B: Via GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Vite configuration

### 3. Configure Environment Variables in Vercel

In your Vercel project settings, add:

- `OPENAI_API_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### 4. Deploy

Vercel will automatically deploy on every push to main branch.

## Usage Guide

### Creating Your First Project

1. **Sign Up / Login**
   - Create an account or sign in with email/password

2. **Create New Project**
   - Click "+ New Project"
   - Enter project title and description
   - Paste or type your strategy overview (minimum 100 words recommended)
   - Click "Create & Analyze"

3. **Extract Assumptions**
   - Click "Extract Assumptions" button
   - AI will analyze your strategy and identify key assumptions
   - View assumptions categorized by type with criticality/confidence scores

4. **Run Devil's Advocate**
   - Click "Devil's Advocate" button
   - AI generates 10 challenging questions about your strategy
   - Review questions and consider how to address them

5. **Generate Pre-Mortem**
   - Click "Pre-Mortem Analysis" button
   - AI imagines your strategy failed and explains why
   - Review failure reasons and create mitigation plans

### Best Practices

- **Strategy Text**: Provide detailed strategy descriptions (200-500 words)
- **Be Specific**: Include goals, key initiatives, target markets, and assumptions
- **Iterative**: Run multiple analyses as you refine your strategy
- **Take Notes**: Keep track of insights in a separate document

## Project Structure

```
strat-iq-app/
├── api/                      # Vercel Serverless Functions
│   └── index.js             # OpenAI API endpoints
├── src/
│   ├── lib/
│   │   ├── api.ts           # API client
│   │   └── supabase.ts      # Supabase client & types
│   ├── main.ts              # Main application code
│   └── style.css            # Tailwind styles
├── supabase-schema.sql      # Database schema
├── vercel.json              # Vercel configuration
└── package.json
```

## API Endpoints

All endpoints are handled through `/api`:

- `POST /api` with `endpoint: 'assumptions'` - Extract assumptions
- `POST /api` with `endpoint: 'challenges'` - Generate challenges
- `POST /api` with `endpoint: 'pre-mortem'` - Generate pre-mortem
- `POST /api` with `endpoint: 'hypothesis'` - Generate hypothesis
- `POST /api` with `endpoint: 'chat'` - Chat with AI

## Database Schema

### Tables

- **projects** - User strategy projects
- **assumptions** - Extracted assumptions from strategies
- **hypotheses** - Testable hypotheses from assumptions
- **challenges** - Devil's advocate questions
- **scenarios** - Pre-mortem and scenario analyses

Row Level Security (RLS) is enabled on all tables to ensure users can only access their own data.

## Roadmap

### Future Features (Not in MVP)

- [ ] Hypothesis tracking and validation
- [ ] SWOT analysis framework
- [ ] Porter's Five Forces analysis
- [ ] Team collaboration features
- [ ] Export strategy reports (PDF)
- [ ] Interactive chat interface
- [ ] Multiple scenario generation (best/worst case)
- [ ] Integration with analytics tools
- [ ] Mobile responsive design improvements

## Troubleshooting

### OpenAI API Errors

- **Rate Limit**: Wait and retry, or upgrade OpenAI plan
- **Invalid API Key**: Check your `.env` file
- **Insufficient Credits**: Add credits to OpenAI account

### Supabase Connection Issues

- **Check URLs**: Verify VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
- **RLS Policies**: Ensure schema was applied correctly
- **Auth Issues**: Check Supabase Auth settings

### Deployment Issues

- **Build Failures**: Check Node version (use 18+)
- **Environment Variables**: Ensure all vars are set in Vercel
- **API Timeouts**: Vercel serverless functions have 10s timeout on free tier

## Contributing

This is an MVP. Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use for your own projects

## Support

For issues or questions:
- Create an issue in the repository
- Check the troubleshooting section above

## Acknowledgments

Built based on the Product Requirements Document for an AI-Powered Strategic Thinking App. Inspired by strategic frameworks from:

- Alex Osterwalder (Strategyzer)
- McKinsey strategic planning practices
- Roger Martin's strategic choice frameworks
- MIT Sloan research on strategy formation

---

**Built with ❤️ for better strategic thinking**
