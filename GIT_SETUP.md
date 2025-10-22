# StratIQ - Git Setup & Workflow

## Git Repository Status

**Status:** Local git repository initialized and committed
**Branch:** main
**Commit:** Initial commit with complete MVP (~11,200 lines across 36 files)

---

## Quick Start: Push to GitHub

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `strat-iq` (or your preferred name)
3. Description: "AI-Powered Strategic Thinking App - Pressure-test business strategies with Claude AI"
4. Choose: **Private** (recommended) or Public
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Navigate to project directory
cd /Users/franksellhausen/Projects/strat-iq

# Add GitHub remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/strat-iq.git

# Push to GitHub
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/franksellhausen/strat-iq.git
git push -u origin main
```

### Step 3: Verify on GitHub

1. Refresh your GitHub repository page
2. You should see all 36 files
3. Check that README.md displays properly

---

## Current Git Status

```bash
# View current status
git status

# View commit history
git log

# View what's in the commit
git show HEAD
```

**Current State:**
- 36 files committed
- 11,218 insertions
- All documentation included
- .env file properly excluded (in .gitignore)

---

## Daily Git Workflow

### Making Changes

```bash
# 1. Check current status
git status

# 2. View changes you made
git diff

# 3. Add specific files
git add path/to/file.ts

# Or add all changes
git add .

# 4. Commit with descriptive message
git commit -m "Add feature: description of what you did"

# 5. Push to GitHub
git push
```

### Best Practices for Commit Messages

**Good commit messages:**
```
Add hypothesis tracking UI
Fix assumption extraction API timeout
Update README with deployment instructions
Refactor project creation modal for better UX
```

**Format:**
```
<type>: <subject>

<optional body>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `refactor`: Code refactoring
- `style`: Formatting, missing semicolons, etc.
- `test`: Adding tests
- `chore`: Maintenance tasks

---

## Common Git Operations

### Viewing History

```bash
# View commit log
git log

# View compact log
git log --oneline

# View last 5 commits
git log -5

# View changes in a file
git log -p src/main.ts
```

### Undoing Changes

```bash
# Discard changes to a file (before commit)
git checkout -- path/to/file.ts

# Unstage a file (before commit)
git reset HEAD path/to/file.ts

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes) - DANGEROUS!
git reset --hard HEAD~1
```

### Branches (For Features)

```bash
# Create new branch for a feature
git checkout -b feature/hypothesis-tracking

# Work on the feature, make commits
git add .
git commit -m "feat: add hypothesis tracking"

# Switch back to main
git checkout main

# Merge feature branch
git merge feature/hypothesis-tracking

# Delete feature branch
git branch -d feature/hypothesis-tracking

# Push branch to GitHub
git push -u origin feature/hypothesis-tracking
```

---

## Files Excluded from Git

The `.gitignore` file excludes:

- `node_modules/` - Dependencies (too large, can be reinstalled)
- `.env` - **CRITICAL**: Contains API keys, never commit this
- `dist/` - Build output (generated files)
- `.DS_Store` - macOS system files
- Editor files (`.vscode/`, `.idea/`)
- Log files

**Important:** Never commit `.env` file with real API keys to GitHub!

---

## Protecting Sensitive Data

### Already Protected

The `.env` file is in `.gitignore`, so your API keys are safe:
- ✅ ANTHROPIC_API_KEY (not in git)
- ✅ OPENAI_API_KEY (not in git)
- ✅ VITE_SUPABASE_ANON_KEY (not in git)

### Verification

```bash
# Verify .env is not tracked
git status

# Should NOT show .env file
# Should show "nothing to commit, working tree clean"
```

### If You Accidentally Committed Secrets

```bash
# Remove file from git but keep locally
git rm --cached strat-iq-app/.env

# Commit the removal
git commit -m "Remove .env from git tracking"

# Push to GitHub
git push

# IMPORTANT: Rotate all API keys immediately!
# The keys in the commit history are now public
```

---

## Syncing with GitHub

### Pull Latest Changes

```bash
# Get latest changes from GitHub
git pull

# Or more verbose
git fetch origin
git merge origin/main
```

### Handling Conflicts

If you get a merge conflict:

```bash
# 1. Git will mark conflicted files
# 2. Open the file, look for markers:
#    <<<<<<< HEAD
#    Your changes
#    =======
#    Changes from GitHub
#    >>>>>>> origin/main

# 3. Edit file to resolve conflict
# 4. Remove conflict markers
# 5. Add resolved file
git add path/to/resolved-file.ts

# 6. Complete merge
git commit -m "Resolve merge conflict"

# 7. Push
git push
```

---

## Repository Structure

```
strat-iq/
├── .git/                      # Git repository data
├── .gitignore                 # Files to exclude from git
├── README.md                  # Project overview
├── DEVELOPMENT_LOG.md         # Development session log
├── NEXT_STEPS.md             # Roadmap and next steps
├── GIT_SETUP.md              # This file
├── prd.md                    # Product requirements
└── strat-iq-app/             # Main application
    ├── .env.example          # Template for environment variables
    ├── .env                  # (NOT in git) Real API keys
    ├── package.json          # Dependencies
    ├── src/                  # Source code
    ├── server-claude.js      # Backend API server
    └── ...
```

---

## Useful Git Aliases

Add these to `~/.gitconfig` for shortcuts:

```bash
[alias]
  st = status
  co = checkout
  br = branch
  ci = commit
  lg = log --oneline --graph --all
  unstage = reset HEAD --
  last = log -1 HEAD
```

Usage:
```bash
git st           # Instead of git status
git lg           # Pretty log view
git last         # Show last commit
```

---

## Collaboration Workflow

### If Working with a Team

```bash
# 1. Create feature branch
git checkout -b feature/my-feature

# 2. Make changes and commit
git add .
git commit -m "feat: add new feature"

# 3. Push branch to GitHub
git push -u origin feature/my-feature

# 4. On GitHub: Create Pull Request
# 5. Review and merge on GitHub
# 6. Pull merged changes locally
git checkout main
git pull

# 7. Delete local feature branch
git branch -d feature/my-feature
```

---

## GitHub Repository Settings

### Recommended Settings

After pushing to GitHub:

1. **About Section:**
   - Description: "AI-Powered Strategic Thinking App"
   - Website: Your deployment URL (once deployed)
   - Topics: `ai`, `strategy`, `claude-ai`, `react`, `typescript`, `supabase`

2. **Branch Protection** (for main branch):
   - Settings → Branches → Add rule
   - Branch name pattern: `main`
   - ✅ Require pull request reviews (if team)
   - ✅ Require status checks to pass

3. **Secrets** (for GitHub Actions/Vercel):
   - Settings → Secrets → Actions
   - Add: `ANTHROPIC_API_KEY`
   - Add: `VITE_SUPABASE_URL`
   - Add: `VITE_SUPABASE_ANON_KEY`

---

## Next Steps After GitHub Setup

1. ✅ Connect to Vercel for deployment
2. ✅ Set up automatic deployments (Vercel watches GitHub)
3. ✅ Configure environment variables in Vercel
4. ✅ Set up production Supabase database
5. ✅ Test production deployment

See `DEPLOYMENT.md` for deployment instructions.

---

## Troubleshooting

### "Permission denied (publickey)"

Need to set up SSH key or use HTTPS:

```bash
# Option 1: Use HTTPS (easier)
git remote set-url origin https://github.com/USERNAME/strat-iq.git

# Option 2: Set up SSH key
# Follow: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
```

### "Updates were rejected"

Someone else pushed changes:

```bash
# Pull first, then push
git pull --rebase
git push
```

### "Failed to push some refs"

Force push (ONLY if you're sure):

```bash
# DANGEROUS: Only use if you're the only developer
git push --force-with-lease
```

---

## Git Cheat Sheet

| Command | Description |
|---------|-------------|
| `git status` | Show working tree status |
| `git add .` | Stage all changes |
| `git commit -m "msg"` | Commit staged changes |
| `git push` | Push to GitHub |
| `git pull` | Pull from GitHub |
| `git log` | View commit history |
| `git diff` | Show unstaged changes |
| `git checkout -b branch` | Create and switch to branch |
| `git merge branch` | Merge branch into current |
| `git branch -d branch` | Delete branch |

---

## Resources

- **Git Documentation:** https://git-scm.com/doc
- **GitHub Guides:** https://guides.github.com
- **Pro Git Book:** https://git-scm.com/book/en/v2
- **GitHub CLI:** https://cli.github.com (optional)

---

## Summary

**You are here:** ✅ Git initialized, initial commit complete

**Next step:** Create GitHub repository and push:

```bash
# After creating repo on GitHub:
git remote add origin https://github.com/YOUR-USERNAME/strat-iq.git
git push -u origin main
```

**After that:** See `DEPLOYMENT.md` to deploy to Vercel!

---

*Last Updated: October 22, 2025*
*Git initialized and ready for GitHub sync*
