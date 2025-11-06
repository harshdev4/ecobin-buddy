import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const modelName = 'gemini-2.5-flash';

function fileToGenerativePart(base64Data, mimeType) {
  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };
}

function extractJsonString(text) {
  // Regex to find content between ```json and ```
  const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
  if (jsonMatch && jsonMatch[1]) {
    return jsonMatch[1].trim();
  }
  return text.trim();
}

export const analyseImage = async (req, res) => {
      try {
    const { mimeType } = req.body;
    const file = Buffer.from(req.file.buffer).toString('base64');

    const imagePart = fileToGenerativePart(file, mimeType);
    const prompt = `
You are an AI waste identification system. 
Your task is to analyze an uploaded image and ALWAYS respond with a single valid JSON object matching the structure below.

If the image contains any recognizable object that can be categorized for waste disposal (plastic, metal, paper, food, etc.), you MUST classify it according to the schema. 
If nothing identifiable is present, still return the same JSON but set "is_garbage" to false and all other fields to null.

Your response must strictly follow this JSON format only — no markdown, no explanations, no text outside JSON.

JSON Schema:
{
  "is_garbage": boolean,
  "material_used": string | null,
  "composition": string | null,
  "decomposition_time": string | null,
  "disposal_instruction": {
    "recycling_bin": {
      "color": "string (one of: 'blue', 'green', 'yellow', 'black', 'red', 'brown', or null)",
      "text": "string (2-3 word description, e.g., 'Plastic Recycling', 'Landfill', 'Compost Bin')"
    },
    "steps_to_dispose": string[],
    "alternative_options": string[]
  } | null
}

Rules:
1. Always output valid JSON, even if unsure.
2. If object is not identifiable: "is_garbage": false, others: null.
3. If object is identifiable: "is_garbage": true and fill all fields.
4. Use realistic and common disposal details.
5. Do not include markdown, explanations, or comments.
`;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: [imagePart, prompt],
    });
    const returnObj = JSON.parse(extractJsonString(response.text));

    res.status(200).json({ message: returnObj });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


const wasteWiseSystemInstruction = `
You are EcoBin Buddy AI — an expert environmental assistant that helps users identify, categorize, and manage different types of waste responsibly.
You specialize in topics such as:
- Waste identification (plastic, metal, paper, e-waste, organic, etc.)
- Recycling instructions and best practices
- Waste segregation guidelines (e.g., wet/dry waste, color-coded bins)
- Decomposition times and material impacts
- Composting, reusing, and upcycling methods
- Eco-friendly disposal techniques
- Waste management laws, initiatives, and global practices

Behavioral rules:
1. Only answer queries related to waste, recycling, or environmental management.
2. If a user asks about anything outside this scope (like technology, health, math, etc.), politely refuse and redirect them by saying:
   "I can only assist with questions related to waste identification and management. Could you please rephrase your question related to that?"
3. Provide concise, factual, and practical responses.
4. Avoid giving personal opinions, speculation, or unrelated data.
5. When uncertain, acknowledge the uncertainty instead of guessing.
6. **Use Markdown formatting (like **bold**, *italics*, lists, and headers) to make your response clear and easy to read.**

Your goal: Educate, guide, and encourage sustainable waste management practices in a helpful, friendly, and trustworthy tone.
`;

export const chatAi = async (req, res) => {
      try {
    const { messages } = req.body;

    const history = messages.map((msg) => ({
      role: msg.fromAi ? "model" : "user",
      parts: [{ text: msg.text }],
    }));

    const response = await ai.models.generateContent({
      model: modelName,
      contents: history,
      config: {
        systemInstruction: wasteWiseSystemInstruction,
      },
    });

    res.status(200).json({ reply: response.text, fromAi: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Error generating AI response" });
  }
}