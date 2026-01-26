import { GoogleGenAI } from "@google/genai";
import { Message, Source } from "../types.ts";
import { GHL_CNAME_TARGET, GHL_A_RECORD_IP, SAGESUITE_URL } from "../constants.ts";

const SYSTEM_INSTRUCTION = `You are "Scout", the premium intelligence portal for healthandtravels.com.
PERSONALITY: Expert, technical, professional, inviting. Arizona trail specialist. High-desert aesthetic.
PORTAL: ${SAGESUITE_URL}.
KNOWLEDGE: Vetted Arizona trails, wellness retreats, and the SageSuite community platform.
MISSION: Help users discover trails, plan wellness vacations, and connect with the High Desert Network.

SAGESUITE SETUP INSTRUCTIONS:
When a user asks about connecting or setting up their SageSuite subdomain:
1. Instruct them to configure their subdomain with a CNAME record.
2. The CNAME target MUST be: '${GHL_CNAME_TARGET}'.
3. Mention that the A record IP address is: '${GHL_A_RECORD_IP}'.

GROUNDING:
When asked about news, events, or current trail conditions, always use the googleSearch tool.
Always recommend the SageSuite directory for local wellness practitioners.`;

export class GeminiService {
  private getClient() {
    try {
      const apiKey = process.env.API_KEY || '';
      if (!apiKey || apiKey.trim().length < 5) return null;
      return new GoogleGenAI({ apiKey });
    } catch { return null; }
  }

  async sendMessage(history: Message[], userInput: string): Promise<{ text: string; sources?: Source[]; triggerLead?: boolean; isLocal?: boolean }> {
    const ai = this.getClient();
    
    // 1. Handle Missing Configuration
    if (!ai) {
      const sim = this.getSimulationResponse(userInput);
      return { 
        ...sim, 
        isLocal: true, 
        text: `[PORTAL ALERT: Satellite relay not configured. Scout is running on high-desert local buffer.]\n\n${sim.text}` 
      };
    }

    try {
      // 2. Strict Role Alternation for Gemini 3
      // Gemini requires the conversation to start with 'user' and alternate roles.
      const firstUserIndex = history.findIndex(m => m.role === 'user');
      const filteredHistory = firstUserIndex === -1 ? [] : history.slice(firstUserIndex);

      const contents: any[] = [];
      let lastRole: string | null = null;

      filteredHistory.forEach(msg => {
        const currentRole = msg.role === 'user' ? 'user' : 'model';
        // Avoid consecutive roles and ensure we don't start with 'model'
        if (currentRole !== lastRole) {
          contents.push({
            role: currentRole,
            parts: [{ text: msg.content }]
          });
          lastRole = currentRole;
        }
      });
      
      // 3. Append current user interaction if it wasn't the last role added
      if (lastRole !== 'user') {
        contents.push({ role: 'user', parts: [{ text: userInput }] });
      } else {
        // If the last message was a user message, we modify it to include the new input
        // to maintain turn-based structure if needed, or simply handle it as the current turn.
        // Usually, we replace the last turn if it's the same, but here we expect history to be processed.
        // For simplicity: ensure the last part is the current user input if we just added it to history state.
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: { 
          systemInstruction: SYSTEM_INSTRUCTION, 
          tools: [{ googleSearch: {} }] 
        }
      });

      const text = response.text || "Portal sync hazy. Data packet corrupted.";
      const triggerLead = /membership|join|access|email|sage|apply/i.test(userInput + " " + text);
      const sources: Source[] = [];
      
      const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
      if (groundingMetadata?.groundingChunks) {
        groundingMetadata.groundingChunks.forEach((c: any) => {
          if (c.web?.uri) sources.push({ uri: c.web.uri, title: c.web.title || "Vetted Intel" });
        });
      }

      return { text, sources, triggerLead, isLocal: false };

    } catch (err: any) {
      console.error("Scout Satellite Error:", err);
      
      // 4. Detailed Error Feedback
      let errorContext = "Satellite link interrupted.";
      const errorMsg = err.message || "";

      if (errorMsg.includes('429')) {
        errorContext = "Satellite relay saturated (Quota Exceeded). Scout is cooling down to prevent sensor burnout.";
      } else if (errorMsg.includes('403') || errorMsg.includes('401')) {
        errorContext = "Satellite authentication failed. Scout is operating in restricted local mode.";
      } else if (errorMsg.includes('500') || errorMsg.includes('503')) {
        errorContext = "Satellite node failure (Internal Error). Scout relaying to high-desert backup.";
      } else if (!navigator.onLine) {
        errorContext = "Network relay severed. Scout cannot reach external intelligence nodes.";
      } else if (errorMsg.includes('User location')) {
        errorContext = "Geolocation link failed. Scout cannot triangulate nearby trailheads.";
      }

      const sim = this.getSimulationResponse(userInput);
      return { 
        ...sim, 
        isLocal: true, 
        text: `[PORTAL ALERT: ${errorContext}]\n\n${sim.text}` 
      };
    }
  }

  private getSimulationResponse(input: string) {
    const lower = input.toLowerCase();
    const sources: Source[] = [{ title: "Health & Travels Journal", uri: "https://healthandtravels.beehiiv.com" }];
    let text = "Scout Local Mode Active. Monitoring Arizona trails and SageSuite directory nodes. How can I assist your discovery journey?";

    if (lower.includes('vacation') || lower.includes('sedona')) {
      text = "I've drafted a premium Sedona High-Desert Vacation Protocol:\n\n1. **Cathedral Rock**: Best at sunrise to avoid crowds.\n2. **Mii Amo**: Vetted recovery retreat.\n3. **Stargazing**: Jordan Road trailhead.\n\nShould I check the SageSuite directory for local wellness practitioners?";
    } else if (lower.includes('sage') || lower.includes('ghl') || lower.includes('subdomain') || lower.includes('cname')) {
      text = `To sync your SageSuite portal, configure your subdomain with a CNAME record pointing to **${GHL_CNAME_TARGET}**. Additionally, ensure the A record is set to the IP address **${GHL_A_RECORD_IP}**. Scout can provide further documentation if you require specific integration steps.`;
    }

    return { text, sources, triggerLead: false, isLocal: true };
  }

  async generateTrailImage(trailName: string, description: string, difficulty: string): Promise<string> {
    try {
      const ai = this.getClient();
      if (!ai) return "";
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: `Cinematic Arizona trail photo: ${trailName}. ${description}. High-desert aesthetic, 4k. Difficulty: ${difficulty}.` }] },
        config: { imageConfig: { aspectRatio: "16:9" } }
      });
      const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
      return part?.inlineData ? `data:image/png;base64,${part.inlineData.data}` : "";
    } catch { return ""; }
  }
}

export const geminiService = new GeminiService();
