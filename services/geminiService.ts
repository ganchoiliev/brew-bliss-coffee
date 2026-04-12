import { AuditResult } from '../types';

/**
 * Brew Analyzer — calls a server-side proxy to keep the API key secret.
 *
 * In production, deploy an edge function at /api/analyze that:
 *   1. Reads GEMINI_API_KEY from server-side environment
 *   2. Forwards the prompt to the Gemini API
 *   3. Returns the parsed JSON response
 *
 * For local development with the key available via Vite define,
 * falls back to direct client-side call (dev only).
 */

const PROXY_ENDPOINT = '/api/analyze';

// Check if we're in dev mode with a key injected by Vite (dev only — never ships to prod)
const DEV_API_KEY: string | undefined = (() => {
  try {
    return process.env.API_KEY || undefined;
  } catch {
    return undefined;
  }
})();

async function callViaProxy(input: string): Promise<AuditResult> {
  const res = await fetch(PROXY_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input }),
  });

  if (!res.ok) {
    throw new Error(`Proxy error: ${res.status}`);
  }

  return res.json();
}

async function callDirectDev(input: string): Promise<AuditResult> {
  // Dynamic import so the @google/genai package is tree-shaken out of prod builds
  // when DEV_API_KEY is undefined
  const { GoogleGenAI, Type } = await import('@google/genai');

  const ai = new GoogleGenAI({ apiKey: DEV_API_KEY! });

  const prompt = `
    Act as a world-class coffee sommelier and flavor expert.
    Analyze the following coffee preference or description: "${input}".
    Based on this, recommend the perfect coffee blend in JSON format.
    Include a match score (0-100), a short tasting profile critique, and 3 specific bean/blend recommendations.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          critique: { type: Type.STRING },
          recommendations: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: ['score', 'critique', 'recommendations'],
      },
    },
  });

  const jsonStr = response.text?.trim() || '{}';
  return JSON.parse(jsonStr);
}

export const analyzeConversion = async (input: string): Promise<AuditResult> => {
  // Try server-side proxy first (secure — API key stays on server)
  try {
    return await callViaProxy(input);
  } catch {
    // Proxy not available — fall back to dev-only direct call
    if (DEV_API_KEY) {
      console.warn('[Brew Analyzer] Proxy unavailable — using dev-only direct API call. Do NOT ship this to production.');
      return callDirectDev(input);
    }

    throw new Error('Brew Analyzer is not configured. Please set up the server-side API proxy.');
  }
};
