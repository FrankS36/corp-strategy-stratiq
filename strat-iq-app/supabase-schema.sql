-- Users table (handled by Supabase Auth)

-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  strategy_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assumptions table
CREATE TABLE assumptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  text TEXT NOT NULL,
  category TEXT CHECK(category IN ('desirability', 'feasibility', 'viability')),
  criticality INTEGER CHECK(criticality >= 1 AND criticality <= 5),
  confidence INTEGER CHECK(confidence >= 1 AND confidence <= 5),
  status TEXT CHECK(status IN ('pending', 'validated', 'invalidated')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hypotheses table
CREATE TABLE hypotheses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  assumption_id UUID REFERENCES assumptions(id) ON DELETE CASCADE NOT NULL,
  statement TEXT NOT NULL,
  metric TEXT,
  success_criteria TEXT,
  test_suggestion TEXT,
  status TEXT CHECK(status IN ('not_tested', 'in_progress', 'validated', 'invalidated')) DEFAULT 'not_tested',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Challenges table
CREATE TABLE challenges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  question TEXT NOT NULL,
  response TEXT,
  resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scenarios table
CREATE TABLE scenarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  type TEXT CHECK(type IN ('pre_mortem', 'best_case', 'worst_case')),
  narrative TEXT NOT NULL,
  failure_reasons TEXT[], -- PostgreSQL array
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE assumptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE hypotheses ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenarios ENABLE ROW LEVEL SECURITY;

-- RLS Policies for projects
CREATE POLICY "Users can view their own projects"
  ON projects FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
  ON projects FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects"
  ON projects FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for assumptions
CREATE POLICY "Users can view assumptions for their projects"
  ON assumptions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = assumptions.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert assumptions for their projects"
  ON assumptions FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = assumptions.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can update assumptions for their projects"
  ON assumptions FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = assumptions.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete assumptions for their projects"
  ON assumptions FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = assumptions.project_id
    AND projects.user_id = auth.uid()
  ));

-- RLS Policies for hypotheses
CREATE POLICY "Users can view hypotheses for their projects"
  ON hypotheses FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM assumptions
    JOIN projects ON projects.id = assumptions.project_id
    WHERE assumptions.id = hypotheses.assumption_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert hypotheses for their projects"
  ON hypotheses FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM assumptions
    JOIN projects ON projects.id = assumptions.project_id
    WHERE assumptions.id = hypotheses.assumption_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can update hypotheses for their projects"
  ON hypotheses FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM assumptions
    JOIN projects ON projects.id = assumptions.project_id
    WHERE assumptions.id = hypotheses.assumption_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete hypotheses for their projects"
  ON hypotheses FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM assumptions
    JOIN projects ON projects.id = assumptions.project_id
    WHERE assumptions.id = hypotheses.assumption_id
    AND projects.user_id = auth.uid()
  ));

-- RLS Policies for challenges (similar pattern)
CREATE POLICY "Users can manage challenges for their projects"
  ON challenges FOR ALL
  USING (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = challenges.project_id
    AND projects.user_id = auth.uid()
  ));

-- RLS Policies for scenarios (similar pattern)
CREATE POLICY "Users can manage scenarios for their projects"
  ON scenarios FOR ALL
  USING (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = scenarios.project_id
    AND projects.user_id = auth.uid()
  ));
