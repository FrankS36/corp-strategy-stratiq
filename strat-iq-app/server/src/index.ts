import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {
  extractAssumptions,
  generateChallenges,
  generatePreMortem,
  generateHypothesis,
  chatWithStrategy
} from './services/openai.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Extract assumptions
app.post('/api/analyze/assumptions', async (req, res) => {
  try {
    const { strategyText } = req.body;

    if (!strategyText) {
      return res.status(400).json({ error: 'Strategy text is required' });
    }

    const assumptions = await extractAssumptions(strategyText);
    res.json({ assumptions });
  } catch (error: any) {
    console.error('Error extracting assumptions:', error);
    res.status(500).json({ error: error.message || 'Failed to extract assumptions' });
  }
});

// Generate challenges
app.post('/api/analyze/challenges', async (req, res) => {
  try {
    const { strategyText, assumptions } = req.body;

    if (!strategyText) {
      return res.status(400).json({ error: 'Strategy text is required' });
    }

    const challenges = await generateChallenges(strategyText, assumptions || []);
    res.json({ challenges });
  } catch (error: any) {
    console.error('Error generating challenges:', error);
    res.status(500).json({ error: error.message || 'Failed to generate challenges' });
  }
});

// Generate pre-mortem
app.post('/api/analyze/pre-mortem', async (req, res) => {
  try {
    const { strategyText, assumptions } = req.body;

    if (!strategyText) {
      return res.status(400).json({ error: 'Strategy text is required' });
    }

    const preMortem = await generatePreMortem(strategyText, assumptions || []);
    res.json(preMortem);
  } catch (error: any) {
    console.error('Error generating pre-mortem:', error);
    res.status(500).json({ error: error.message || 'Failed to generate pre-mortem' });
  }
});

// Generate hypothesis
app.post('/api/analyze/hypothesis', async (req, res) => {
  try {
    const { assumptionText, context } = req.body;

    if (!assumptionText) {
      return res.status(400).json({ error: 'Assumption text is required' });
    }

    const hypothesis = await generateHypothesis(assumptionText, context || '');
    res.json(hypothesis);
  } catch (error: any) {
    console.error('Error generating hypothesis:', error);
    res.status(500).json({ error: error.message || 'Failed to generate hypothesis' });
  }
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, strategyContext } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const response = await chatWithStrategy(messages, strategyContext || '');
    res.json({ message: response });
  } catch (error: any) {
    console.error('Error in chat:', error);
    res.status(500).json({ error: error.message || 'Chat failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
