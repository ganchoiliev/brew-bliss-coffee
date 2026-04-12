
import { GoogleGenAI, Type } from "@google/genai";

export const analyzeConversion = async (urlOrDescription: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Act as a world-class coffee sommelier and flavor expert.
    Analyze the following coffee preference or description: "${urlOrDescription}".
    Based on this, recommend the perfect coffee blend in JSON format.
    Include a match score (0-100), a short tasting profile critique, and 3 specific bean/blend recommendations.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            critique: { type: Type.STRING },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["score", "critique", "recommendations"]
        }
      }
    });

    const jsonStr = response.text?.trim() || "{}";
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};
