import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

async function generateTrailImage(prompt: string) {
  const response = await genAI.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: prompt }],
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
}

async function run() {
  const prompts = [
    "A high-quality, realistic photograph of Devil's Bridge in Sedona, Arizona. A natural sandstone arch with red rock mountains in the background.",
    "A high-quality, realistic photograph of Camelback Mountain in Phoenix, Arizona. A distinctive mountain shaped like a kneeling camel with desert landscape.",
    "A high-quality, realistic photograph of Humphreys Peak in Flagstaff, Arizona. The highest peak in Arizona with alpine tundra and pine trees.",
    "A high-quality, realistic photograph of the Flatiron rock formation in the Superstition Mountains, Arizona. A massive sheer rock plateau seen from Siphon Draw."
  ];

  const results = [];
  for (const prompt of prompts) {
    console.log(`Generating: ${prompt}`);
    const img = await generateTrailImage(prompt);
    results.push(img);
  }

  console.log(JSON.stringify(results));
}

run();
