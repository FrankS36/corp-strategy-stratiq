import './style.css';
import { supabase } from './lib/supabase';
import { api } from './lib/api';

// App State
let currentProject: any = null;
let assumptions: any[] = [];
let challenges: any[] = [];
let currentView: 'login' | 'dashboard' | 'project' = 'login';

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    currentView = 'dashboard';
    renderDashboard();
  } else {
    renderLogin();
  }
});

// Render Login
function renderLogin() {
  const app = document.querySelector<HTMLDivElement>('#app')!;
  app.innerHTML = `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">StratIQ</h1>
        <p class="text-gray-600 mb-8">AI-Powered Strategic Thinking</p>

        <div id="auth-form">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" id="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="your@email.com" />
          </div>

          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input type="password" id="password" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="••••••••" />
          </div>

          <button id="login-btn" class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition mb-2">
            Sign In
          </button>

          <button id="signup-btn" class="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition mb-2">
            Sign Up
          </button>

          <button id="demo-btn" class="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">
            🎮 Try Demo Mode
          </button>

          <div id="auth-error" class="mt-4 text-red-600 text-sm hidden"></div>
          <div class="mt-4 text-xs text-gray-500 text-center">
            Demo mode lets you explore the UI without Supabase setup
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('login-btn')?.addEventListener('click', handleLogin);
  document.getElementById('signup-btn')?.addEventListener('click', handleSignup);
  document.getElementById('demo-btn')?.addEventListener('click', handleDemoMode);
}

// Handle Demo Mode
function handleDemoMode() {
  currentView = 'dashboard';
  renderDemoDashboard();
}

// Handle Login
async function handleLogin() {
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    showAuthError(error.message);
  } else {
    currentView = 'dashboard';
    renderDashboard();
  }
}

// Handle Signup
async function handleSignup() {
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    showAuthError(error.message);
  } else {
    showAuthError('Check your email for confirmation!');
  }
}

function showAuthError(message: string) {
  const errorEl = document.getElementById('auth-error');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
  }
}

// Render Dashboard
async function renderDashboard() {
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('updated_at', { ascending: false });

  const app = document.querySelector<HTMLDivElement>('#app')!;
  app.innerHTML = `
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 class="text-2xl font-bold text-indigo-600">StratIQ</h1>
          <button id="logout-btn" class="text-gray-600 hover:text-gray-800">Logout</button>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-3xl font-bold text-gray-800">Your Strategy Projects</h2>
          <button id="new-project-btn" class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
            + New Project
          </button>
        </div>

        <div id="projects-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${projects && projects.length > 0 ? projects.map(p => `
            <div class="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition" data-project-id="${p.id}">
              <h3 class="text-xl font-semibold text-gray-800 mb-2">${p.title}</h3>
              <p class="text-gray-600 text-sm mb-4">${p.description || 'No description'}</p>
              <p class="text-xs text-gray-400">${new Date(p.updated_at).toLocaleDateString()}</p>
            </div>
          `).join('') : '<p class="text-gray-600">No projects yet. Create your first one!</p>'}
        </div>
      </main>
    </div>
  `;

  document.getElementById('logout-btn')?.addEventListener('click', handleLogout);
  document.getElementById('new-project-btn')?.addEventListener('click', showNewProjectModal);

  document.querySelectorAll('[data-project-id]').forEach(el => {
    el.addEventListener('click', (e) => {
      const projectId = (e.currentTarget as HTMLElement).dataset.projectId;
      if (projectId) openProject(projectId);
    });
  });
}

async function handleLogout() {
  await supabase.auth.signOut();
  currentView = 'login';
  renderLogin();
}

function showNewProjectModal() {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50';
  modal.innerHTML = `
    <div class="bg-white rounded-lg p-8 max-w-2xl w-full">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">New Strategy Project</h2>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
        <input type="text" id="project-title" class="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="e.g., New Market Entry Strategy" />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea id="project-description" class="w-full px-4 py-2 border border-gray-300 rounded-lg" rows="2" placeholder="Brief description..."></textarea>
      </div>

      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Strategy Overview</label>
        <textarea id="project-strategy" class="w-full px-4 py-2 border border-gray-300 rounded-lg" rows="6" placeholder="Describe your strategic plan, goals, and key initiatives..."></textarea>
      </div>

      <div class="flex gap-4">
        <button id="create-project-btn" class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition flex-1">
          Create & Analyze
        </button>
        <button id="cancel-btn" class="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition">
          Cancel
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('#cancel-btn')?.addEventListener('click', () => modal.remove());
  modal.querySelector('#create-project-btn')?.addEventListener('click', () => createProject(modal));
}

async function createProject(modal: HTMLElement) {
  const title = (document.getElementById('project-title') as HTMLInputElement).value;
  const description = (document.getElementById('project-description') as HTMLTextAreaElement).value;
  const strategy_text = (document.getElementById('project-strategy') as HTMLTextAreaElement).value;

  if (!title || !strategy_text) {
    alert('Please fill in title and strategy');
    return;
  }

  const { data: { user } } = await supabase.auth.getUser();

  const { data: project, error } = await supabase
    .from('projects')
    .insert({ title, description, strategy_text, user_id: user!.id })
    .select()
    .single();

  if (error) {
    console.error('Error creating project:', error);
    return;
  }

  modal.remove();
  openProject(project.id);
}

async function openProject(projectId: string) {
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single();

  // Load saved assumptions
  const { data: savedAssumptions } = await supabase
    .from('assumptions')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: true });

  // Load saved challenges
  const { data: savedChallenges } = await supabase
    .from('challenges')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: true });

  // Load saved scenarios
  const { data: savedScenarios } = await supabase
    .from('scenarios')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })
    .limit(1);

  currentProject = project;
  assumptions = savedAssumptions || [];
  challenges = savedChallenges || [];

  currentView = 'project';
  renderProject(savedScenarios?.[0] || null);
}

async function renderProject(savedScenario: any = null) {
  const app = document.querySelector<HTMLDivElement>('#app')!;

  // Prepare assumptions HTML
  const assumptionsHTML = assumptions.length > 0
    ? assumptions.map((a: any) => `
        <div class="border-l-4 border-${a.category === 'desirability' ? 'blue' : a.category === 'feasibility' ? 'green' : 'yellow'}-500 pl-3 py-2">
          <p class="font-medium text-gray-800">${a.text}</p>
          <div class="flex gap-4 text-xs text-gray-600 mt-1">
            <span>Criticality: ${a.criticality}/5</span>
            <span>Confidence: ${a.confidence}/5</span>
          </div>
        </div>
      `).join('')
    : 'Click "Extract Assumptions" to begin';

  // Prepare challenges HTML
  const challengesHTML = challenges.length > 0
    ? `
        <h4 class="font-semibold text-gray-800 mb-3">Critical Questions (${challenges.length})</h4>
        <div class="space-y-3">
          ${challenges.map((c: any, i: number) => `
            <div class="border-l-4 border-purple-500 pl-3 py-2 bg-purple-50">
              <p class="text-gray-800">${i + 1}. ${c.question}</p>
            </div>
          `).join('')}
        </div>
      `
    : '';

  // Prepare scenario HTML
  const scenarioHTML = savedScenario
    ? `
        <h4 class="font-semibold text-gray-800 mb-3">Pre-Mortem: Failure Scenario</h4>
        <div class="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p class="text-gray-800 whitespace-pre-wrap">${savedScenario.narrative}</p>
        </div>

        <h4 class="font-semibold text-gray-800 mb-3">Potential Failure Reasons</h4>
        <ul class="space-y-2">
          ${savedScenario.key_points.map((reason: string) => `
            <li class="flex items-start">
              <span class="text-red-500 mr-2">•</span>
              <span class="text-gray-700">${reason}</span>
            </li>
          `).join('')}
        </ul>
      `
    : '';

  const hasResults = challengesHTML || scenarioHTML;

  app.innerHTML = `
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div class="flex items-center gap-4">
            <button id="back-btn" class="text-gray-600 hover:text-gray-800">← Back</button>
            <h1 class="text-2xl font-bold text-indigo-600">${currentProject.title}</h1>
          </div>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Left Panel: Actions -->
          <div class="space-y-4">
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-lg font-semibold mb-4">Analyze Strategy</h3>
              <div class="space-y-2">
                <button id="extract-assumptions-btn" class="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition text-sm">
                  ${assumptions.length > 0 ? 'Re-extract Assumptions' : 'Extract Assumptions'}
                </button>
                <button id="generate-challenges-btn" class="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition text-sm">
                  Devil's Advocate
                </button>
                <button id="generate-premortem-btn" class="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition text-sm">
                  Pre-Mortem Analysis
                </button>
              </div>
            </div>

            <div id="assumptions-panel" class="bg-white rounded-lg shadow p-6">
              <h3 class="text-lg font-semibold mb-4">Assumptions ${assumptions.length > 0 ? `(${assumptions.length})` : ''}</h3>
              <div id="assumptions-list" class="space-y-2 text-sm text-gray-600">
                ${assumptionsHTML}
              </div>
            </div>
          </div>

          <!-- Middle Panel: Strategy Text -->
          <div class="lg:col-span-2 space-y-6">
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-lg font-semibold mb-4">Strategy Overview</h3>
              <div class="prose max-w-none">
                <p class="text-gray-700 whitespace-pre-wrap">${currentProject.strategy_text}</p>
              </div>
            </div>

            <div id="analysis-results" class="bg-white rounded-lg shadow p-6 ${hasResults ? '' : 'hidden'}">
              <h3 class="text-lg font-semibold mb-4">Analysis Results</h3>
              <div id="results-content">
                ${challengesHTML}
                ${challengesHTML && scenarioHTML ? '<div class="my-6 border-t border-gray-200"></div>' : ''}
                ${scenarioHTML}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;

  document.getElementById('back-btn')?.addEventListener('click', () => renderDashboard());
  document.getElementById('extract-assumptions-btn')?.addEventListener('click', extractAssumptionsHandler);
  document.getElementById('generate-challenges-btn')?.addEventListener('click', generateChallengesHandler);
  document.getElementById('generate-premortem-btn')?.addEventListener('click', generatePreMortemHandler);
}

async function extractAssumptionsHandler() {
  const btn = document.getElementById('extract-assumptions-btn');
  if (btn) btn.textContent = 'Analyzing...';

  try {
    const { assumptions: extractedAssumptions } = await api.extractAssumptions(currentProject.strategy_text);

    // Save to database
    for (const assumption of extractedAssumptions) {
      await supabase.from('assumptions').insert({
        project_id: currentProject.id,
        ...assumption
      });
    }

    assumptions = extractedAssumptions;

    // Refresh the UI to show saved assumptions
    renderProject();
  } catch (error) {
    console.error('Error:', error);
    alert('Error extracting assumptions. Make sure the backend server is running.');
  } finally {
    if (btn) btn.textContent = 'Extract Assumptions';
  }
}

async function generateChallengesHandler() {
  const btn = document.getElementById('generate-challenges-btn');
  if (btn) btn.textContent = 'Generating...';

  try {
    const { challenges: generatedChallenges } = await api.generateChallenges(
      currentProject.strategy_text,
      assumptions
    );

    // Save to database
    for (const challenge of generatedChallenges) {
      await supabase.from('challenges').insert({
        project_id: currentProject.id,
        question: challenge.question
      });
    }

    challenges = generatedChallenges;

    // Refresh the UI to show saved challenges
    renderProject();
  } catch (error) {
    console.error('Error:', error);
    alert('Error generating challenges. Make sure the backend server is running.');
  } finally {
    if (btn) btn.textContent = "Devil's Advocate";
  }
}

async function generatePreMortemHandler() {
  const btn = document.getElementById('generate-premortem-btn');
  if (btn) btn.textContent = 'Generating...';

  try {
    const preMortem = await api.generatePreMortem(currentProject.strategy_text, assumptions);

    // Save to database
    const savedScenario = {
      project_id: currentProject.id,
      type: 'pre-mortem',
      narrative: preMortem.narrative,
      key_points: preMortem.failure_reasons
    };

    await supabase.from('scenarios').insert(savedScenario);

    // Refresh the UI to show saved pre-mortem
    renderProject(savedScenario);
  } catch (error) {
    console.error('Error:', error);
    alert('Error generating pre-mortem. Make sure the backend server is running.');
  } finally {
    if (btn) btn.textContent = 'Pre-Mortem Analysis';
  }
}

// Demo Dashboard with sample data
function renderDemoDashboard() {
  const app = document.querySelector<HTMLDivElement>('#app')!;
  const demoProjects = [
    {
      id: 'demo-1',
      title: 'Premium Coffee Market Entry',
      description: 'Strategy to enter Seattle premium coffee market with artisanal single-origin beans',
      updated_at: new Date().toISOString()
    },
    {
      id: 'demo-2',
      title: 'SaaS Product Pivot to Freemium',
      description: 'Evaluating transition from paid-only to freemium model for B2B SaaS',
      updated_at: new Date(Date.now() - 86400000).toISOString()
    }
  ];

  app.innerHTML = `
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 class="text-2xl font-bold text-indigo-600">StratIQ <span class="text-sm text-gray-500">(Demo Mode)</span></h1>
          <button id="logout-btn" class="text-gray-600 hover:text-gray-800">Exit Demo</button>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 py-8">
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p class="text-sm text-yellow-800">
            <strong>Demo Mode:</strong> You're viewing sample projects. Set up Supabase and OpenAI to create real projects and use AI features.
          </p>
        </div>

        <div class="flex justify-between items-center mb-6">
          <h2 class="text-3xl font-bold text-gray-800">Your Strategy Projects</h2>
          <button id="new-project-btn" class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
            + New Project
          </button>
        </div>

        <div id="projects-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${demoProjects.map(p => `
            <div class="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition" data-project-id="${p.id}">
              <h3 class="text-xl font-semibold text-gray-800 mb-2">${p.title}</h3>
              <p class="text-gray-600 text-sm mb-4">${p.description}</p>
              <p class="text-xs text-gray-400">${new Date(p.updated_at).toLocaleDateString()}</p>
            </div>
          `).join('')}
        </div>
      </main>
    </div>
  `;

  document.getElementById('logout-btn')?.addEventListener('click', () => renderLogin());
  document.getElementById('new-project-btn')?.addEventListener('click', showDemoProjectModal);

  document.querySelectorAll('[data-project-id]').forEach(el => {
    el.addEventListener('click', (e) => {
      const projectId = (e.currentTarget as HTMLElement).dataset.projectId;
      if (projectId) openDemoProject(projectId);
    });
  });
}

function showDemoProjectModal() {
  alert('Demo Mode: Project creation requires Supabase setup.\n\nTo use this feature:\n1. Set up Supabase account\n2. Run the database schema\n3. Add credentials to .env file\n4. Restart the app');
}

function openDemoProject(projectId: string) {
  const demoData: any = {
    'demo-1': {
      id: 'demo-1',
      title: 'Premium Coffee Market Entry',
      strategy_text: `We plan to enter the premium coffee market in Seattle by opening 5 stores in Q1 2024. We'll target affluent millennials with artisanal single-origin beans at $8/cup. 

Our strategy assumes strong demand based on market research showing 60% interest in premium coffee among our target demographic. We believe we can achieve 30% market penetration within 18 months.

Key initiatives:
- Secure prime downtown locations
- Partner with ethical coffee importers
- Build Instagram-worthy store aesthetic
- Hire experienced baristas at competitive wages
- Launch with influencer marketing campaign

We expect to reach profitability by month 18 with average daily sales of 300 cups per location.`
    },
    'demo-2': {
      id: 'demo-2',
      title: 'SaaS Product Pivot to Freemium',
      strategy_text: `We're pivoting our B2B SaaS platform from paid-only ($99/month) to a freemium model to accelerate user acquisition.

Strategy: Offer limited free tier (up to 5 users, basic features) with conversion path to paid plans ($199-$499/month for premium features).

Assumptions:
- Free tier will drive 10x more signups
- 5-8% conversion rate from free to paid within 90 days
- Revenue will increase despite lower barrier to entry
- Support costs for free users remain manageable

Success criteria: 50,000 free users and 2,500 paid conversions within 6 months, maintaining 85% gross margin.`
    }
  };

  currentProject = demoData[projectId];
  renderDemoProject();
}

function renderDemoProject() {
  const app = document.querySelector<HTMLDivElement>('#app')!;
  app.innerHTML = `
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div class="flex items-center gap-4">
            <button id="back-btn" class="text-gray-600 hover:text-gray-800">← Back</button>
            <h1 class="text-2xl font-bold text-indigo-600">${currentProject.title}</h1>
            <span class="text-sm text-gray-500">(Demo)</span>
          </div>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 py-8">
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p class="text-sm text-yellow-800">
            <strong>Demo Mode:</strong> AI analysis features require OpenAI API key. This is sample data only.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Left Panel: Actions -->
          <div class="space-y-4">
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-lg font-semibold mb-4">Analyze Strategy</h3>
              <div class="space-y-2">
                <button id="extract-assumptions-btn" class="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition text-sm">
                  Extract Assumptions
                </button>
                <button id="generate-challenges-btn" class="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition text-sm">
                  Devil's Advocate
                </button>
                <button id="generate-premortem-btn" class="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition text-sm">
                  Pre-Mortem Analysis
                </button>
              </div>
            </div>

            <div id="assumptions-panel" class="bg-white rounded-lg shadow p-6">
              <h3 class="text-lg font-semibold mb-4">Assumptions</h3>
              <div id="assumptions-list" class="space-y-2 text-sm text-gray-600">
                <p class="text-gray-500 italic">Click "Extract Assumptions" to see AI-generated analysis</p>
              </div>
            </div>
          </div>

          <!-- Middle Panel: Strategy Text -->
          <div class="lg:col-span-2 space-y-6">
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-lg font-semibold mb-4">Strategy Overview</h3>
              <div class="prose max-w-none">
                <p class="text-gray-700 whitespace-pre-wrap">${currentProject.strategy_text}</p>
              </div>
            </div>

            <div id="analysis-results" class="bg-white rounded-lg shadow p-6 hidden">
              <h3 class="text-lg font-semibold mb-4">Analysis Results</h3>
              <div id="results-content"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;

  document.getElementById('back-btn')?.addEventListener('click', () => renderDemoDashboard());
  document.getElementById('extract-assumptions-btn')?.addEventListener('click', () => showDemoFeatureAlert('Assumption Extraction'));
  document.getElementById('generate-challenges-btn')?.addEventListener('click', () => showDemoFeatureAlert('Devil\'s Advocate'));
  document.getElementById('generate-premortem-btn')?.addEventListener('click', () => showDemoFeatureAlert('Pre-Mortem Analysis'));
}

function showDemoFeatureAlert(feature: string) {
  alert(`Demo Mode: ${feature} requires OpenAI API integration.\n\nTo use AI features:\n1. Get OpenAI API key from platform.openai.com\n2. Add OPENAI_API_KEY to .env file\n3. Restart the app\n\nThe AI will then analyze your strategy and provide intelligent insights!`);
}
