import { GoogleGenAI, Type, Schema } from "@google/genai";
import { CVData } from "../types";

// Helper to convert File to Base64
const fileToGenericPart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve({
        inlineData: {
          data: base64String,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const cvSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    personal: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        role: { type: Type.STRING },
        summary: { type: Type.STRING },
        location: { type: Type.STRING },
        email: { type: Type.STRING },
        phone: { type: Type.STRING },
        links: {
          type: Type.OBJECT,
          properties: {
            github: { type: Type.STRING },
            linkedin: { type: Type.STRING },
            website: { type: Type.STRING },
          },
        },
      },
      required: ["name", "role", "summary"],
    },
    skills: {
      type: Type.OBJECT,
      properties: {
        frontend: { type: Type.ARRAY, items: { type: Type.STRING } },
        backend: { type: Type.ARRAY, items: { type: Type.STRING } },
        mobile: { type: Type.ARRAY, items: { type: Type.STRING } },
        tools: { type: Type.ARRAY, items: { type: Type.STRING } },
        others: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
    },
    experience: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          company: { type: Type.STRING },
          role: { type: Type.STRING },
          duration: { type: Type.STRING },
          responsibilities: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["company", "role", "duration", "responsibilities"],
      },
    },
    projects: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          technologies: { type: Type.ARRAY, items: { type: Type.STRING } },
          link: { type: Type.STRING },
        },
        required: ["title", "description", "technologies"],
      },
    },
    education: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          institution: { type: Type.STRING },
          degree: { type: Type.STRING },
          duration: { type: Type.STRING },
        },
        required: ["institution", "degree", "duration"],
      },
    },
  },
  required: ["personal", "skills", "experience", "projects", "education"],
};

export const parseCV = async (file: File, apiKey: string): Promise<CVData> => {
  const ai = new GoogleGenAI({ apiKey });

  const model = "gemini-2.5-flash"; // Excellent for document parsing and speed
  const filePart = await fileToGenericPart(file);

  const prompt = `
    You are an expert resume parser and portfolio content generator.
    Analyze the attached CV document.
    Extract the data into the specified JSON structure.

    CRITICAL INSTRUCTIONS:
    1. Rewrite the "summary" in the "personal" section to be a confident, first-person introduction (max 2 sentences).
    2. Rewrite "responsibilities" in "experience" to be short, punchy, impact-focused bullet points (max 3 per role).
    3. Categorize "skills" intelligently based on the technologies found.
    4. If a section is missing, return an empty array or object for that key.
    5. Ensure the tone is professional, modern, and suitable for a senior developer or professional portfolio.
    6. Extract social links if present.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: {
        role: "user",
        parts: [filePart, { text: prompt }],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: cvSchema,
        temperature: 0.2, // Low temperature for factual extraction
      },
    });

    const text = response.text;
    if (!text) throw new Error("No data returned from Gemini");
    
    return JSON.parse(text) as CVData;
  } catch (error) {
    console.error("Error parsing CV:", error);
    throw new Error("Failed to parse CV. Please ensure the API key is valid and the file is readable.");
  }
};