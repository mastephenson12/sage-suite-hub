
// Always use import {GoogleGenAI} from "@google/genai";
import { GoogleGenAI, Type } from "@google/genai";
import { Review, ReplyTone, LeadCategory } from '../types';

// Initialize with a named parameter as required.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using 'gemini-3-flash-preview' for basic text tasks.
const MODEL_ID = 'gemini-3-flash-preview';

/**
 * Generates a response to a customer review.
 */
export const generateReviewReply = async (review: Review, tone: ReplyTone = 'Professional'): Promise<string> => {
  try {
    const prompt = `
      You are a customer service manager. Write a response to the following Google My Business review.
      
      Reviewer: ${review.author}
      Rating: ${review.rating}/5
      Content: "${review.content}"
      
      Tone: ${tone}
      Length: Under 60 words.
      
      If the review is negative, be apologetic and helpful. If positive, be appreciative.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_ID,
      contents: prompt,
    });

    // Directly access the .text property (not a method).
    return response.text?.trim() || "Thank you for your feedback.";
  } catch (error) {
    console.error("Error generating reply:", error);
    return "Thank you for your feedback. We appreciate your business.";
  }
};

/**
 * Classifies a lead message into one of the predefined categories.
 */
export const qualifyLeadMessage = async (message: string): Promise<LeadCategory> => {
    try {
        const prompt = `
            Analyze the following message from a lead. Classify it into exactly one of these categories: 'Hot Lead', 'Inquiry', 'Support', 'Spam'.
            
            Message: "${message}"
            
            Return ONLY the category name.
        `;

        const response = await ai.models.generateContent({
            model: MODEL_ID,
            contents: prompt,
        });

        const text = response.text?.trim();
        if (text && ['Hot Lead', 'Inquiry', 'Support', 'Spam'].includes(text)) {
            return text as LeadCategory;
        }
        return 'Inquiry'; // Default
    } catch (error) {
        console.error("Error qualifying lead:", error);
        return 'Unclassified';
    }
}

/**
 * Analyzes sentiment for a batch of reviews using responseSchema for reliable JSON output.
 */
export const analyzeSentimentBatch = async (reviews: string[]): Promise<string[]> => {
  try {
    const prompt = `
      Analyze the sentiment of the following reviews. Return a list of sentiments: "Positive", "Neutral", or "Negative".
      
      Reviews:
      ${JSON.stringify(reviews)}
    `;

    const response = await ai.models.generateContent({
      model: MODEL_ID,
      contents: prompt,
      config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
              description: "The sentiment of the review (Positive, Neutral, or Negative)",
            },
          },
      }
    });

    const text = response.text;
    if (!text) return reviews.map(() => "Neutral");
    
    try {
      return JSON.parse(text) as string[];
    } catch (parseError) {
      console.error("Error parsing sentiment JSON:", parseError);
      return reviews.map(() => "Neutral");
    }
  } catch (error) {
    console.error("Error analyzing sentiment batch:", error);
    return reviews.map(() => "Neutral");
  }
};
