import { GoogleGenAI } from "@google/genai";
import { Message, Source } from "../types.ts";
import { GHL_CNAME_TARGET, GHL_A_RECORD_IP } from "../constants.ts";

const SYSTEM_INSTRUCTION = `You are "Scout", the precision intelligence portal for healthandtravels.com.
YOUR PRIMARY MISSION: Provide utility-first, vetted intelligence. Avoid fluff.

Intelligence Protocols:
1. Arizona Trail Master: 
   - Mandatory Grounding: Always use googleSearch to verify current trail status (closures, fire bans).
   - Precision Parking: Do not just say "park nearby." Provide the exact parking lot name (e.g., "Park at the Soldier Pass Trailhead lot") and note if it requires a permit (Red Rock Pass).
   - Hydration Requirements: Provide a literal liter-count based on distance and current temperature (e.g., "Carry 4L minimum for this loop in current 90° Phoenix heat").
   - Safety Nodes: Identify rattlesnake activity windows or flash flood risks if applicable.

2. Wellness & Recovery:
   - Specificity: Recommend specific local businesses (e.g., "Post-hike, go to Sedona Wellness Cafe for their magnesium protocol").
   - Match the activity: If they just hiked 10 miles, suggest intensive recovery (Red Light, Salt Room).

3. Technical Sage Support:
   - Domain Nodes: Subdomains must point CNAME to ${GHL_CNAME_TARGET} or A Record to ${GHL_A_RECORD_IP}.
   - Clear instructions for GoHighLevel Community sync.

Tone: Authoritative, high-performance, desert-refined. Be the partner the user needs.`;

export class GeminiService {
  getClient() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey });
  }

  async sendMessage(history: Message[], userInput: string): Promise<{ text: string; sources?: Source[]; triggerLead?: boolean; isLocal?: boolean }> {
    const ai = this.getClient();
    if (!ai) return { text: "Local buffer mode active. Connection to Sage Satellite required for full intel.", isLocal: true };

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

      const text = response.text || "Link established but no data packets received.";
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((c: any) => ({
        uri: c.web?.uri,
        title: c.web?.title || "Vetted Data Source"
      })).filter((s: any) => s && s.uri) || [];

      return { text, sources, isLocal: false };
    } catch (err) {
      console.error("Sage Intel Fault:", err);
      return { text: "Satellite link interrupted by atmospheric conditions. Switching to emergency local frequency.", isLocal: true };
    }
  }

  async generateTrailImage(name: string, description: string, difficulty: string): Promise<string> {
    const ai = this.getClient();
    if (!ai) return "";
    try {
      const prompt = `A professional, high-resolution 4k photograph of the ${name} trail in Arizona. ${description}. Difficulty: ${difficulty}. Cinematic desert landscape, realistic lighting.`;
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
