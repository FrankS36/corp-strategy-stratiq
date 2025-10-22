// API client for backend server
const API_URL = import.meta.env.DEV ? 'http://localhost:3001/api' : '/api';

export const api = {
  async extractAssumptions(strategyText: string) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ endpoint: 'assumptions', strategyText }),
    });
    return response.json();
  },

  async generateChallenges(strategyText: string, assumptions: any[]) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ endpoint: 'challenges', strategyText, assumptions }),
    });
    return response.json();
  },

  async generatePreMortem(strategyText: string, assumptions: any[]) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ endpoint: 'pre-mortem', strategyText, assumptions }),
    });
    return response.json();
  },

  async generateHypothesis(assumptionText: string, strategyContext: string) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ endpoint: 'hypothesis', assumptionText, strategyContext }),
    });
    return response.json();
  },

  async chat(messages: any[], strategyContext: string) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ endpoint: 'chat', messages, strategyContext }),
    });
    return response.json();
  },
};
