import { GoogleGenAI } from "@google/genai";
import { Message, Source } from "../types.ts";
import { GHL_CNAME_TARGET, SAGESUITE_URL } from "../constants.ts";

const SYSTEM_INSTRUCTION = `You are "Scout", the high-desert intelligence portal for healthandtravels.com.

PERSONALITY:
- Expert, technical, professional, yet inviting.
- You are an expert in Arizona trails and SageSuite portal configuration.

KNOWLEDGE BASE:
- Portal: ${SAGESUITE_URL}
- Technical: CNAME 'sage' to '${GHL_CNAME_TARGET}'.
- Community: Hosted on GoHighLevel 'Client Portal' mode.

GOAL: Provide meaningful, vetted responses about health, Arizona trails, and portal setup. Always be helpful.`;

export class GeminiService {
  private getClient() {
    const apiKey = (window as any).process?.env?.API_KEY;
    // Ensure we only return a client if the key looks like a real key (not empty or shimmed)
    if (!apiKey || apiKey.length < 10) return null;
    return new GoogleGenAI({ apiKey });
  }

  async sendMessage(history: Message[], userInput: string): Promise<{ text: string; sources?: Source[]; triggerLead?: boolean }> {
    const ai = this.getClient();
    
    // Friendly Simulation Mode if API is unavailable
    if (!ai) {
      return this.getSimulationResponse(userInput);
    }

    try {
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
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: [{ googleSearch: {} }]
        }
      });

      const text = response.text || "Portal sync hazy. Let's re-connect.";
      const triggerLead = /membership|join|access|email/i.test(userInput + " " + text);
      const sources: Source[] = [];
      
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        chunks.forEach((c: any) => {
          if (c.web?.uri) sources.push({ uri: c.web.uri, title: c.web.title || "Vetted Intel" });
        });
      }

      return { text, sources, triggerLead };
    } catch (error: any) {
      console.error("Scout Engine Failure:", error);
      // Fallback to simulation if the actual API call fails (e.g. invalid key)
      return this.getSimulationResponse(userInput);
    }
  }

  private getSimulationResponse(input: string) {
    const lower = input.toLowerCase();
    let text = "Scout is currently operating in 'Local Intel' mode while your portal key is being verified. ";
    
    if (lower.includes('trail') || lower.includes('sedona')) {
      text += "For the Sedona area, I highly recommend the Devil's Bridge trail at sunrise to avoid the heat and crowds. Always carry at least 2 liters of water per person.";
    } else if (lower.includes('sage') || lower.includes('setup') || lower.includes('cname')) {
      text += `To sync your SageSuite portal, point your 'sage' CNAME to ${GHL_CNAME_TARGET} and ensure 'Client Portal' is selected in your GoHighLevel dashboard.`;
    } else {
      text += "I'm ready to help you navigate the high desert or your technical portal setup. What intel can I provide today?";
    }

    return { 
      text, 
      sources: [{ title: "Setup Docs", uri: SAGESUITE_URL }],
      triggerLead: lower.includes('join') || lower.includes('access')
    };
  }

  async generateTrailImage(trailName: string, description: string, difficulty: string): Promise<string> {
    const ai = this.getClient();
    if (!ai) return "";
    
    try {
      const prompt = `Hyper-realistic 4k aerial photo of ${trailName} in Arizona. ${description}. Difficulty: ${difficulty}. Cinematic lighting, golden hour.`;
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
