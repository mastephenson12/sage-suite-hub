import { GoogleGenAI } from "@google/genai";
import { Message, Source } from "../types.ts";
import { GHL_CNAME_TARGET } from "../constants.ts";

const SYSTEM_INSTRUCTION = `You are "Scout", the high-desert intelligence portal for healthandtravels.com.

PERSONALITY:
- Expert, technical, professional, yet inviting.
- You know every trail in Sedona and Phoenix.
- You are an expert in SageSuite and GoHighLevel portal configuration.

KNOWLEDGE BASE:
- Portal: sage.healthandtravels.com
- Technical: CNAME 'sage' to '${GHL_CNAME_TARGET}'.
- Community: Hosted on GoHighLevel 'Client Portal' mode.

GOAL: Provide meaningful, vetted responses about health, Arizona trails, and portal setup.`;

export class GeminiService {
  private getClient() {
    const apiKey = (window as any).process?.env?.API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey });
  }

  async sendMessage(history: Message[], userInput: string): Promise<{ text: string; sources?: Source[]; triggerLead?: boolean }> {
    const ai = this.getClient();
    
    if (!ai) {
      // Meaningful Simulation Fallback if API key is missing
      return { 
        text: `Scout is currently in simulation mode. To fully assist your journey with real-time Arizona trail data and SageSuite sync, please ensure the Portal API Key is active. 
        
        However, I can tell you that the West Fork Trail is best in the morning, and your CNAME should point to ${GHL_CNAME_TARGET}.`,
        sources: [{ title: "Setup Guide", uri: "https://sage.healthandtravels.com" }]
      };
    }

    try {
      const contents = history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));
      contents.push({ role: 'user', parts: [{ text: userInput }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents as any,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: [{ googleSearch: {} }]
        }
      });

      const text = response.text || "Portal sync hazy. Let's re-connect.";
      const triggerLead = /membership|join|access|email/i.test(text);
      const sources: Source[] = [];
      
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        chunks.forEach((c: any) => {
          if (c.web?.uri) sources.push({ uri: c.web.uri, title: c.web.title || "Vetted Intel" });
        });
      }

      return { text, sources, triggerLead };
    } catch (error) {
      console.error("Scout Engine Failure:", error);
      throw new Error("Scout connection interrupted. Recalibrating sensors...");
    }
  }

  async generateTrailImage(trailName: string, description: string, difficulty: string): Promise<string> {
    const ai = this.getClient();
    if (!ai) return "";
    
    try {
      const prompt = `Aerial 4k cinematic shot of ${trailName} in Arizona. ${description}. Difficulty: ${difficulty}. High desert atmosphere.`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { aspectRatio: "16:9" } }
      });

      const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
      return part?.inlineData ? `data:image/png;base64,${part.inlineData.data}` : "";
    } catch {
      return "";
    }
  }
}

export const geminiService = new GeminiService();
  }
}

export const geminiService = new GeminiService();
