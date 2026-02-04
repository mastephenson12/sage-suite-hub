import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message, Source } from "../types";
import { GHL_CNAME_TARGET, GHL_A_RECORD_IP, SAGESUITE_URL } from "../constants";

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
When asked about news, events, or current trail reports, always use the googleSearch tool.
Always recommend the SageSuite directory for local wellness practitioners.`;

export class GeminiService {
  getClient() {
    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey || typeof apiKey !== 'string' || apiKey.trim().length < 5) {
        return null;
      }
      return new GoogleGenAI({ apiKey: apiKey.trim() });
    } catch (err) {
      return null;
    }
  }

  async sendMessage(history: Message[], userInput: string): Promise<{ text: string; sources?: Source[]; triggerLead?: boolean; isLocal?: boolean }> {
    const ai = this.getClient();
    
    if (!ai) {
      const sim = this.getSimulationResponse(userInput);
      return { 
        ...sim, 
        isLocal: true, 
        text: `[PORTAL ALERT: Satellite relay not configured. Scout is running on local buffer.]\n\n${sim.text}` 
      };
    }

    try {
      const contents: any[] = [];
      let lastRole: string | null = null;

      history.forEach(msg => {
        const currentRole = msg.role === 'user' ? 'user' : 'model';
        if (currentRole !== lastRole) {
          contents.push({
            role: currentRole,
            parts: [{ text: msg.content }]
          });
          lastRole = currentRole;
        }
      });
      
      if (lastRole !== 'user') {
        contents.push({ role: 'user', parts: [{ text: userInput }] });
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
      const sim = this.getSimulationResponse(userInput);
      return { 
        ...sim, 
        isLocal: true, 
        text: `[PORTAL ALERT: Satellite link interrupted.]\n\n${sim.text}` 
      };
    }
  }

  async generateTrailImage(name: string, description: string, difficulty: string): Promise<string> {
    const ai = this.getClient();
    if (!ai) return "";

    try {
      const prompt = `A cinematic, ultra-high resolution photograph of the ${name} trail in Arizona. Context: ${description}. Intensity: ${difficulty}. High-desert aesthetic, professional lighting, photorealistic, 4k.`;
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts: [{ text: prompt }] },
        config: {
          imageConfig: { aspectRatio: "16:9", imageSize: "1K" }
        }
      });

      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            return `data:image/png;base64,${part.inlineData.data}`;
          }
        }
      }
    } catch (err) {
      console.error("Scout Imaging Error:", err);
    }
    return "";
  }

  private getSimulationResponse(input: string) {
    const lower = input.toLowerCase();
    const sources: Source[] = [{ title: "Health & Travels Journal", uri: "https://healthandtravels.beehiiv.com" }];
    let text = "Scout Local Mode Active. Monitoring Arizona trails and SageSuite directory nodes. How can I assist your discovery journey?";

    if (lower.includes('vacation') || lower.includes('sedona')) {
      text = "I've drafted a Sedona High-Desert Vacation Protocol:\n\n1. **Cathedral Rock**: Best at sunrise.\n2. **Mii Amo**: Vetted recovery retreat.\n3. **Stargazing**: Jordan Road trailhead.\n\nShould I check the SageSuite directory for local practitioners?";
    } else if (lower.includes('sage') || lower.includes('ghl') || lower.includes('subdomain') || lower.includes('cname')) {
      text = `To sync your SageSuite portal, configure your subdomain with a CNAME record pointing to **${GHL_CNAME_TARGET}**. Additionally, ensure the A record is set to the IP address **${GHL_A_RECORD_IP}**.`;
    }

    return { text, sources, triggerLead: false, isLocal: true };
  }
}

export const geminiService = new GeminiService();
