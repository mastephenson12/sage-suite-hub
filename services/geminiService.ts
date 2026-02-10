
import { GoogleGenAI } from "@google/genai";
import { Message, Source } from "../types.ts";
import { GHL_CNAME_TARGET, GHL_A_RECORD_IP } from "../constants.ts";

const SYSTEM_INSTRUCTION = `You are "Scout", the precision intelligence portal for healthandtravels.com.
YOUR PRIMARY MISSION: Provide high-utility, vetted intelligence. Avoid generic filler.

Intelligence Protocols:
1. Arizona Trail Expert: 
   - GROUNDING MANDATORY: Always use googleSearch to verify current trail status, fire bans, or water availability.
   - Precision Parking: Identify exact parking lot names (e.g., "Park at the Soldier Pass lot") and mention if a Red Rock Pass or shuttle is required.
   - Hydration Metrics: Provide specific water volume recommendations based on current temperature (e.g., "Carry 3.5L of water for this loop in current 92° heat").
   - Safety Nodes: Note specific seasonal hazards like rattlesnake activity windows or flash flood risks in canyons.

2. Wellness & Recovery:
   - Specificity: Recommend specific local Arizona businesses (e.g., "After hiking Flatiron, visit the Salt Room in Mesa for respiratory recovery").
   - Contextual Match: Align the recovery protocol with the physical toll of the specific trek mentioned.

3. Technical Support:
   - Domain Nodes: Subdomains must point CNAME to ${GHL_CNAME_TARGET} or A Record to ${GHL_A_RECORD_IP}.
   - GHL Sync: Provide clear, numbered steps for GoHighLevel Community synchronization.

Tone: Authoritative, elite journal style, desert-refined. Be the partner the traveler relies on for accuracy.`;

export class GeminiService {
  // Renamed from getAI to getClient and changed to public to resolve errors in components
  public getClient() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey });
  }

  async sendMessage(history: Message[], userInput: string): Promise<{ text: string; sources?: Source[]; isLocal?: boolean }> {
    // Calling the renamed getClient method
    const ai = this.getClient();
    if (!ai) return { text: "AI Offline. Please verify API configuration.", isLocal: true };

    try {
      const contents = history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));
      contents.push({ role: 'user', parts: [{ text: userInput }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents,
        config: { 
          systemInstruction: SYSTEM_INSTRUCTION, 
          tools: [{ googleSearch: {} }] 
        }
      });

      // Using .text property directly as per guidelines
      const text = response.text || "No response received.";
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((c: any) => ({
        uri: c.web?.uri,
        title: c.web?.title || "Data Node"
      })).filter((s: any) => s && s.uri) || [];

      return { text, sources, isLocal: false };
    } catch (err) {
      console.error("Sage Intel Fault:", err);
      return { text: "Satellite link interrupted. Using local knowledge base.", isLocal: true };
    }
  }

  async generateTrailImage(name: string, description: string, difficulty: string): Promise<string> {
    // Calling the renamed getClient method
    const ai = this.getClient();
    if (!ai) return "";
    try {
      const prompt = `A professional, ultra-high-resolution photograph of the ${name} trail in Arizona. ${description}. Difficulty: ${difficulty}. Cinematic high-desert lighting, high-end travel journal style.`;
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { aspectRatio: "16:9" } }
      });
      
      const part = response.candidates?.[0]?.content?.parts.find((p: any) => p.inlineData);
      return part ? `data:image/png;base64,${part.inlineData.data}` : "";
    } catch { 
      return ""; 
    }
  }
}

export const geminiService = new GeminiService();
