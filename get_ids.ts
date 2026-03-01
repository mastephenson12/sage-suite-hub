import { GoogleGenAI } from "@google/genai";

async function getUnsplashIds() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Provide the most accurate Unsplash photo IDs for the following Arizona landmarks. Return ONLY a JSON object with the landmark name as key and the ID as value. Landmarks: 'Devil's Bridge Sedona', 'Camelback Mountain Phoenix', 'Humphreys Peak Flagstaff', 'Flatiron Superstition Mountains'.",
  });
  console.log(response.text);
}

getUnsplashIds();

