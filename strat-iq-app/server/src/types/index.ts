export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  created_at: string;
}

export interface Project {
  id: number;
  user_id: number;
  title: string;
  description: string;
  strategy_text: string;
  created_at: string;
  updated_at: string;
}

export interface Assumption {
  id: number;
  project_id: number;
  text: string;
  category: 'desirability' | 'feasibility' | 'viability';
  criticality: number; // 1-5
  confidence: number; // 1-5
  status: 'pending' | 'validated' | 'invalidated';
  created_at: string;
}

export interface Hypothesis {
  id: number;
  assumption_id: number;
  statement: string;
  metric: string;
  success_criteria: string;
  test_suggestion: string;
  status: 'not_tested' | 'in_progress' | 'validated' | 'invalidated';
  created_at: string;
  updated_at: string;
}

export interface Challenge {
  id: number;
  project_id: number;
  question: string;
  response?: string;
  resolved: boolean;
  created_at: string;
}

export interface Scenario {
  id: number;
  project_id: number;
  type: 'pre_mortem' | 'best_case' | 'worst_case';
  narrative: string;
  failure_reasons?: string[];
  created_at: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}
