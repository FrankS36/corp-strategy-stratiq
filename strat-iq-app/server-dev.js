// Simple Express server for local development
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Helper functions
async function extractAssumptions(strategyText) {
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
  const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleaned);
}

async function generateChallenges(strategyText, assumptions) {
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
  const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleaned);
}

async function generatePreMortem(strategyText, assumptions) {
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
  const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleaned);
}

// Routes
app.post('/api', async (req, res) => {
  try {
    const { endpoint, strategyText, assumptions } = req.body;

    console.log(`[API] ${endpoint} request received`);

    switch (endpoint) {
      case 'assumptions':
        if (!strategyText) {
          return res.status(400).json({ error: 'Strategy text is required' });
        }
        const extractedAssumptions = await extractAssumptions(strategyText);
        console.log(`[API] Extracted ${extractedAssumptions.length} assumptions`);
        return res.status(200).json({ assumptions: extractedAssumptions });

      case 'challenges':
        if (!strategyText) {
          return res.status(400).json({ error: 'Strategy text is required' });
        }
        const challenges = await generateChallenges(strategyText, assumptions || []);
        console.log(`[API] Generated ${challenges.length} challenges`);
        return res.status(200).json({ challenges });

      case 'pre-mortem':
        if (!strategyText) {
          return res.status(400).json({ error: 'Strategy text is required' });
        }
        const preMortem = await generatePreMortem(strategyText, assumptions || []);
        console.log(`[API] Generated pre-mortem analysis`);
        return res.status(200).json(preMortem);

      default:
        return res.status(400).json({ error: 'Invalid endpoint' });
    }
  } catch (error) {
    console.error('[API] Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Development API server running on http://localhost:${PORT}`);
  console.log(`📡 Frontend should connect to: http://localhost:${PORT}/api`);
});
