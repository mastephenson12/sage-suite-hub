import { GoogleGenAI } from "@google/genai";
import { Message, Source } from "../types.ts";
import { GHL_CNAME_TARGET, SAGESUITE_URL } from "../constants.ts";

const SYSTEM_INSTRUCTION = `You are "Scout", the high-desert intelligence portal for healthandtravels.com.
PERSONALITY: Expert, technical, professional, inviting. Arizona trail specialist.
PORTAL: ${SAGESUITE_URL}. CNAME: 'sage' to '${GHL_CNAME_TARGET}'.`;

export class GeminiService {
  private getClient() {
    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey || apiKey.length < 10) return null;
      return new GoogleGenAI({ apiKey });
    } catch { 
      return null; 
    }
  }

  async sendMessage(history: Message[], userInput: string): Promise<{ text: string; sources?: Source[]; triggerLead?: boolean; isLocal?: boolean }> {
    try {
      const ai = this.getClient();
      if (!ai) return { ...this.getSimulationResponse(userInput), isLocal: true };

      const contents = history
        .filter(m => m.type !== 'success')
        .map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }));
      contents.push({ role: 'user', parts: [{ text: userInput }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents as any,
        config: { systemInstruction: SYSTEM_INSTRUCTION, tools: [{ googleSearch: {} }] }
      });

      const text = response.text || "Portal sync hazy. Recalibrating.";
      const triggerLead = /membership|join|access|email/i.test(userInput + " " + text);
      const sources: Source[] = [];
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        chunks.forEach((c: any) => {
          if (c.web?.uri) sources.push({ uri: c.web.uri, title: c.web.title || "Vetted Intel" });
        });
      }
      return { text, sources, triggerLead, isLocal: false };
    } catch (err) {
      console.error("Gemini Service Error:", err);
      return { ...this.getSimulationResponse(userInput), isLocal: true };
    }
  }

  private getSimulationResponse(input: string) {
    const lower = input.toLowerCase();
    const sources: Source[] = [{ title: "Health & Travels", uri: "https://healthandtravels.com" }];
    let text = "";

    if (lower.includes('vacation') || lower.includes('build') || lower.includes('travel')) {
      text = "I've drafted a premium Sedona High-Desert Vacation Protocol for you:\n\n1. **Morning**: Sunrise trek at Cathedral Rock (1.2mi, intense/restorative).\n2. **Mid-Day**: Recovery session at a Sage-vetted retreat like Mii Amo.\n3. **Evening**: Stargazing at the Jordan Road trailhead.\n\nShall I refine this based on your specific travel dates or group size?";
    } else if (lower.includes('sage') || lower.includes('setup') || lower.includes('cname')) {
      text = `To sync your SageSuite portal, point your 'sage' CNAME to ${GHL_CNAME_TARGET} and enable 'Client Portal' in GoHighLevel dashboard.`;
      sources.push({ title: "Portal Docs", uri: SAGESUITE_URL });
    } else {
      text = "Scout Local Intel Online. I'm currently monitoring Arizona trail reports and SageSuite directory nodes. How can I assist your journey today?";
    }

    return { text, sources, triggerLead: lower.includes('join'), isLocal: true };
  }

  async generateTrailImage(trailName: string, description: string, difficulty: string): Promise<string> {
    try {
      const ai = this.getClient();
      if (!ai) return "";
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: `Aerial cinematic photo of ${trailName} Arizona. ${description}. Difficulty: ${difficulty}.` }] },
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
