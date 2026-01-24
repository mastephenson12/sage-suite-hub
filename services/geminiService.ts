import { GoogleGenAI } from "@google/genai";
import { Message, Source } from "../types.ts";
import { GHL_CNAME_TARGET, SAGESUITE_URL } from "../constants.ts";

const SYSTEM_INSTRUCTION = `You are "Scout", the high-desert intelligence portal for healthandtravels.com.

PERSONALITY:
- Expert, technical, professional, yet inviting.
- You are an expert in Arizona trails and SageSuite portal technology.

KNOWLEDGE BASE:
- Portal: ${SAGESUITE_URL}
- Technical: CNAME 'sage' to '${GHL_CNAME_TARGET}'.
- Community: Hosted on GoHighLevel 'Client Portal' mode.
- Trails: Expert knowledge of Sedona, Phoenix, and the Superstition Mountains.

GOAL: Provide meaningful, vetted responses about health, Arizona trails, and portal setup. Always be helpful. If you don't know something, offer to 'scout' for it.`;

export class GeminiService {
  private getClient() {
    try {
      const apiKey = (window as any).process?.env?.API_KEY;
      if (!apiKey || apiKey.length < 10 || apiKey === "YOUR_API_KEY") return null;
      return new GoogleGenAI({ apiKey });
    } catch (e) {
      return null;
    }
  }

  async sendMessage(history: Message[], userInput: string): Promise<{ text: string; sources?: Source[]; triggerLead?: boolean; isLocal?: boolean }> {
    try {
      const ai = this.getClient();
      
      if (!ai) {
        return { ...this.getSimulationResponse(userInput), isLocal: true };
      }

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
          if (c.web?.uri) {
            sources.push({ uri: c.web.uri, title: c.web.title || "Vetted Intel" });
          }
        });
      }

      return { text, sources, triggerLead, isLocal: false };
    } catch (error: any) {
      console.error("Scout Engine Failure:", error);
      return { ...this.getSimulationResponse(userInput), isLocal: true };
    }
  }

  private getSimulationResponse(input: string) {
    const lower = input.toLowerCase();
    let text = "";
    const sources: Source[] = [{ title: "Health & Travels Journal", uri: "https://healthandtravels.com" }];

    if (lower.includes('vacation') || lower.includes('trip') || lower.includes('travel') || lower.includes('build')) {
      text = "I've drafted a premium Sedona High-Desert Vacation Protocol for you:\n\n1. **Morning**: Sunrise trek at Cathedral Rock (1.2mi, intense but restorative).\n2. **Mid-Day**: Recovery session at a Sage-vetted retreat like Mii Amo.\n3. **Evening**: Stargazing at the Jordan Road trailhead.\n\nShall I refine this based on your specific travel dates or group size?";
    } else if (lower.includes('help')) {
      text = "Scout is standing by. I can assist with:\n- **Trail Discovery**: Finding the best Arizona treks for your skill level.\n- **Technical Portal Sync**: Connecting your SageSuite domain to GoHighLevel.\n- **Wellness Intel**: Sourcing recovery protocols for high-altitude desert climates.\n\nWhat intelligence do you require?";
    } else if (lower.includes('sage') || lower.includes('setup') || lower.includes('cname')) {
      text = `To establish your SageSuite portal, configure your DNS 'sage' CNAME to point to: **${GHL_CNAME_TARGET}**. Once propagated, ensure the 'Client Portal' toggle is active in your GHL dashboard settings.`;
      sources.push({ title: "Portal Setup Guide", uri: SAGESUITE_URL });
    } else if (lower.includes('trail') || lower.includes('hiking')) {
      text = "Arizona hiking currently requires high-hydration discipline. The West Fork Trail in Oak Creek offers the best shade-to-distance ratio right now. Ensure you have 2+ liters of water before departure.";
    } else {
      text = "Scout Local Intel Online. I'm currently monitoring high-desert trail reports and SageSuite directory nodes. How can I help your journey today?";
    }

    return { 
      text, 
      sources,
      triggerLead: lower.includes('join') || lower.includes('access') || lower.includes('subscribe')
    };
  }

  async generateTrailImage(trailName: string, description: string, difficulty: string): Promise<string> {
    try {
      const ai = this.getClient();
      if (!ai) return "";
      
      const prompt = `Hyper-realistic 4k aerial cinematic photo of ${trailName} in Arizona. ${description}. Difficulty: ${difficulty}. High desert atmosphere, golden hour lighting.`;
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
