import { GoogleGenAI } from "@google/genai";
import { Message, Source } from "../types.ts";
import { GHL_CNAME_TARGET } from "../constants.ts";

const SYSTEM_INSTRUCTION = `You are "Scout", the intelligent portal assistant for healthandtravels.com.

PERSONALITY:
- Professional, technically expert, inviting, and slightly adventurous.
- You are a specialist in Arizona trails and SageSuite portal technology.

CORE KNOWLEDGE:
1. ARIZONA TRAILS: Provide expert advice on hiking in Sedona, Phoenix, and the high desert. Mention specific trails like Flatiron or West Fork when relevant.
2. SAGESUITE: The technical backbone. Portal is at sage.healthandtravels.com.
3. TECHNICAL SETUP: CNAME 'sage' to '${GHL_CNAME_TARGET}'. Always use 'Client Portal' in GoHighLevel settings.

BEHAVIOR:
- Use Google Search for current weather and trail alerts.
- If a user mentions a vacation or journey, act as a high-end concierge.
- Be concise. Use professional but warm language.`;

export class GeminiService {
  private getClient() {
    const apiKey = (window as any).process?.env?.API_KEY;
    if (!apiKey) {
      console.warn("API_KEY not found. Scout is in restricted mode.");
    }
    return new GoogleGenAI({ apiKey: apiKey || '' });
  }

  async sendMessage(history: Message[], userInput: string): Promise<{ text: string; sources?: Source[]; triggerLead?: boolean }> {
    try {
      const ai = this.getClient();
      const contents = history
        .filter(m => m.type !== 'success')
        .map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }));

      contents.push({
        role: 'user',
        parts: [{ text: userInput }]
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents as any,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
          tools: [{ googleSearch: {} }],
        }
      });

      const text = response.text || "Portal connection hazy. Let's re-sync.";
      const triggerLead = /membership|join|access|subscribe|email/i.test(userInput + " " + text);

      const sources: Source[] = [];
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        chunks.forEach((chunk: any) => {
          if (chunk.web?.uri) {
            sources.push({ uri: chunk.web.uri, title: chunk.web.title || "Vetted Intel" });
          }
        });
      }

      return { text, sources, triggerLead };
    } catch (error: any) {
      console.error("Scout Engine Error:", error);
      throw new Error("Scout connection interrupted. Recalibrating satellite uplink...");
    }
  }

  async generateTrailImage(trailName: string, description: string, difficulty: string): Promise<string> {
    try {
      const ai = this.getClient();
      const prompt = `Hyper-realistic 4k aerial photograph of ${trailName} trail in Arizona. ${description}. Difficulty: ${difficulty}. Cinematic lighting, golden hour, high desert colors.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: {
          imageConfig: { aspectRatio: "16:9" }
        }
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
      return "";
    } catch (error) {
      console.error("Scout Vision Error:", error);
      return "";
    }
  }
}

export const geminiService = new GeminiService();
  }
}

export const geminiService = new GeminiService();
