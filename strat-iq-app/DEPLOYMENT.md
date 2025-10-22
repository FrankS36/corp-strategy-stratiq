# StratIQ Deployment Guide

Complete step-by-step guide to deploy StratIQ to production on Vercel with Supabase.

## Prerequisites Checklist

- [ ] GitHub account
- [ ] Vercel account (free tier works)
- [ ] Supabase account (free tier works)
- [ ] OpenAI account with API access and credits

## Step 1: Set Up Supabase Database

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new organization (if you don't have one)
4. Click "New Project"
5. Fill in:
   - Name: `strat-iq` (or your choice)
   - Database Password: Generate a strong password (save it!)
   - Region: Choose closest to your users
6. Click "Create new project"
7. Wait 2-3 minutes for provisioning

### 1.2 Run Database Schema

1. In your Supabase project, go to "SQL Editor" in the left sidebar
2. Click "+ New query"
3. Copy the entire contents of `supabase-schema.sql` from your project
4. Paste it into the SQL editor
5. Click "Run" (or press Cmd/Ctrl + Enter)
6. You should see "Success. No rows returned"

### 1.3 Get Supabase Credentials

1. Go to "Project Settings" → "API"
2. Copy these values (you'll need them later):
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

### 1.4 Configure Email Authentication (Optional)

1. Go to "Authentication" → "Providers"
2. Enable "Email" provider
3. Configure email templates if desired
4. For production, set up a custom SMTP provider (optional)

## Step 2: Get OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign in or create an account
3. Go to "API keys" in the left sidebar
4. Click "+ Create new secret key"
5. Name it "StratIQ Production"
6. Copy the key (you won't be able to see it again!)
7. Make sure you have billing set up and credits available

**Cost Estimate**: ~$0.01-0.05 per strategy analysis (GPT-4 pricing)

## Step 3: Prepare Your Code

### 3.1 Update Environment Variables Template

Create `.env.example`:

```env
OPENAI_API_KEY=your_openai_api_key_here
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3.2 Test Locally First

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your actual credentials
nano .env

# Run development server
npm run dev
```

Visit `http://localhost:5173` and test:
- [ ] Sign up with email
- [ ] Create a project
- [ ] Extract assumptions
- [ ] Generate challenges
- [ ] Generate pre-mortem

## Step 4: Push to GitHub

### 4.1 Initialize Git Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: StratIQ MVP"

# Create repository on GitHub
# Go to github.com and create new repository named "strat-iq"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/strat-iq.git

# Push to GitHub
git push -u origin main
```

## Step 5: Deploy to Vercel

### 5.1 Import Project to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Click "Import Git Repository"
4. Select your GitHub repository
5. Configure project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - Leave other settings as default

### 5.2 Add Environment Variables

**CRITICAL**: Before clicking "Deploy", add these environment variables:

1. Click "Environment Variables" section
2. Add each variable:

| Key | Value | Environment |
|-----|-------|-------------|
| `OPENAI_API_KEY` | `sk-...` | Production |
| `VITE_SUPABASE_URL` | `https://xxxxx.supabase.co` | Production |
| `VITE_SUPABASE_ANON_KEY` | `eyJ...` | Production |

3. Make sure to check "Production" for each variable

### 5.3 Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for build and deployment
3. You'll get a URL like `https://strat-iq.vercel.app`

## Step 6: Verify Deployment

### 6.1 Test Production App

1. Visit your Vercel URL
2. Test complete flow:
   - [ ] Sign up with a new email
   - [ ] Check email for confirmation (if email verification enabled)
   - [ ] Login
   - [ ] Create a strategy project
   - [ ] Extract assumptions (this tests OpenAI API)
   - [ ] Generate challenges
   - [ ] Generate pre-mortem
   - [ ] Logout and login again

### 6.2 Check Logs

If anything fails:
1. In Vercel, go to your project
2. Click "Deployments"
3. Click on the latest deployment
4. Check "Functions" tab for serverless function logs
5. Look for errors

## Step 7: Configure Custom Domain (Optional)

### 7.1 Add Domain in Vercel

1. In Vercel project, go to "Settings" → "Domains"
2. Click "Add"
3. Enter your domain (e.g., `stratiq.yourdomain.com`)
4. Follow DNS configuration instructions

### 7.2 Update Supabase Redirect URLs

1. Go to Supabase project settings
2. Navigate to "Authentication" → "URL Configuration"
3. Add your custom domain to "Site URL"
4. Add to "Redirect URLs"

## Step 8: Production Checklist

Before announcing your app:

- [ ] Test all features work in production
- [ ] Verify email notifications work
- [ ] Check OpenAI API usage/costs
- [ ] Set up error monitoring (optional: Sentry)
- [ ] Set up analytics (optional: Vercel Analytics)
- [ ] Create user documentation
- [ ] Set up support channel (email/Discord)
- [ ] Monitor Supabase and Vercel usage

## Monitoring & Maintenance

### Monitor OpenAI Usage

- Check [platform.openai.com/usage](https://platform.openai.com/usage)
- Set up billing alerts
- Average cost: $0.02-0.05 per analysis

### Monitor Supabase

- Database size (500MB free tier limit)
- Active users (50k monthly active users on free tier)
- API requests

### Monitor Vercel

- Bandwidth usage (100GB/month on free tier)
- Serverless function executions (100GB-hours/month)
- Build minutes

## Troubleshooting

### Build Fails

**Error**: `Cannot find module 'openai'`
- Solution: Ensure `openai` is in `dependencies`, not `devDependencies`

**Error**: Node version mismatch
- Solution: Add `.node-version` file with content `18` or higher

### Runtime Errors

**Error**: `Missing environment variables`
- Solution: Check Vercel environment variables are set correctly
- Redeploy after adding variables

**Error**: `CORS error`
- Solution: Check API handler includes CORS headers (already included in code)

### Database Errors

**Error**: `Row level security policy violation`
- Solution: Ensure you ran the complete schema including RLS policies

**Error**: `Relation does not exist`
- Solution: Re-run the database schema SQL

### OpenAI API Errors

**Error**: `Rate limit exceeded`
- Solution: Implement request queuing or upgrade OpenAI tier

**Error**: `Insufficient quota`
- Solution: Add credits to OpenAI account

## Scaling Considerations

### If you get significant traffic:

1. **OpenAI Costs**
   - Consider implementing request caching
   - Use GPT-3.5-turbo for some analyses (cheaper)
   - Implement rate limiting per user

2. **Supabase**
   - Upgrade to Pro ($25/mo) for:
     - 8GB database
     - 100GB bandwidth
     - Better performance

3. **Vercel**
   - Pro plan ($20/mo) for:
     - Better performance
     - More bandwidth
     - Priority support

## Support

If you run into issues:

1. Check Vercel function logs
2. Check Supabase logs
3. Check browser console
4. Review this guide again
5. Check GitHub issues

## Next Steps

After successful deployment:

1. Share with initial users
2. Gather feedback
3. Monitor usage and costs
4. Plan next features
5. Iterate!

---

**Congratulations!** 🎉 Your StratIQ MVP is now live!
