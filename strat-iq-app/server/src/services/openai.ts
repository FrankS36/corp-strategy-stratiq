import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const extractAssumptions = async (strategyText: string) => {
  const prompt = `You are an expert business strategist analyzing a strategic plan.

Extract all key assumptions from the following strategy. For each assumption:
1. Identify the assumption text
2. Categorize it as 'desirability' (market/customer), 'feasibility' (operational/technical), or 'viability' (financial/business model)
3. Assess criticality (1-5, where 5 is critical to success)
4. Assess confidence (1-5, where 5 is high confidence)

Strategy:
${strategyText}

Return ONLY a valid JSON array with this exact structure, no markdown formatting:
[{
  "text": "assumption text",
  "category": "desirability|feasibility|viability",
  "criticality": 1-5,
  "confidence": 1-5
}]`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  const content = response.choices[0].message.content || '[]';
  return JSON.parse(content);
};

export const generateChallenges = async (strategyText: string, assumptions: any[]) => {
  const prompt = `You are a critical business strategist playing devil's advocate.

Strategy:
${strategyText}

Key Assumptions:
${assumptions.map((a, i) => `${i + 1}. ${a.text}`).join('\n')}

Generate 10 tough, probing questions to pressure-test this strategy. Questions should:
- Challenge key assumptions
- Explore potential weaknesses
- Consider competitive responses
- Question feasibility and timeline
- Address market risks
- Be specific to this strategy (not generic)

Return ONLY a valid JSON array with this structure, no markdown:
[{
  "question": "specific challenging question"
}]`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.8,
  });

  const content = response.choices[0].message.content || '[]';
  return JSON.parse(content);
};

export const generatePreMortem = async (strategyText: string, assumptions: any[]) => {
  const prompt = `You are conducting a pre-mortem analysis on a business strategy.

Strategy:
${strategyText}

Key Assumptions:
${assumptions.map((a, i) => `${i + 1}. ${a.text}`).join('\n')}

Imagine it's 2 years from now and this strategy has completely failed. Generate:
1. A narrative describing the failure scenario (2-3 paragraphs)
2. 5-7 specific reasons why it failed, each linked to an assumption or strategic element

Return ONLY valid JSON with this structure, no markdown:
{
  "narrative": "detailed failure scenario narrative",
  "failure_reasons": ["reason 1", "reason 2", ...]
}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.8,
  });

  const content = response.choices[0].message.content || '{}';
  return JSON.parse(content);
};

export const generateHypothesis = async (assumptionText: string, context: string) => {
  const prompt = `Convert this assumption into a testable hypothesis with a measurable outcome.

Assumption: ${assumptionText}

Context: ${context}

Return ONLY valid JSON with this structure, no markdown:
{
  "statement": "If [action], then [measurable outcome] within [timeframe]",
  "metric": "specific metric to measure",
  "success_criteria": "what would validate this hypothesis",
  "test_suggestion": "specific experiment or research task to validate"
}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  const content = response.choices[0].message.content || '{}';
  return JSON.parse(content);
};

export const chatWithStrategy = async (messages: any[], strategyContext: string) => {
  const systemMessage = {
    role: 'system',
    content: `You are an expert strategic thinking coach. You help business leaders pressure-test their strategies through critical analysis, asking probing questions, and identifying blind spots. Be constructive but rigorous.

Strategy Context:
${strategyContext}`,
  };

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [systemMessage, ...messages],
    temperature: 0.7,
  });

  return response.choices[0].message.content;
};

export default openai;
