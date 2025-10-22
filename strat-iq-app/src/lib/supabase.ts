import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a dummy client if env vars are not set (for development preview)
const isConfigured = supabaseUrl && supabaseAnonKey &&
                     !supabaseUrl.includes('your_') &&
                     !supabaseAnonKey.includes('your_');

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key');

// Types
export interface Project {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  strategy_text?: string;
  created_at: string;
  updated_at: string;
}

export interface Assumption {
  id: string;
  project_id: string;
  text: string;
  category: 'desirability' | 'feasibility' | 'viability';
  criticality: number;
  confidence: number;
  status: 'pending' | 'validated' | 'invalidated';
  created_at: string;
}

export interface Hypothesis {
  id: string;
  assumption_id: string;
  statement: string;
  metric?: string;
  success_criteria?: string;
  test_suggestion?: string;
  status: 'not_tested' | 'in_progress' | 'validated' | 'invalidated';
  created_at: string;
  updated_at: string;
}

export interface Challenge {
  id: string;
  project_id: string;
  question: string;
  response?: string;
  resolved: boolean;
  created_at: string;
}

export interface Scenario {
  id: string;
  project_id: string;
  type: 'pre_mortem' | 'best_case' | 'worst_case';
  narrative: string;
  failure_reasons?: string[];
  created_at: string;
}
