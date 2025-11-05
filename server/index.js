import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { Buffer } from 'buffer';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'developement') {
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const upload = multer({
    storage: multer.memoryStorage(),
});

app.post('/api/analyse-image', upload.single('file'), async (req, res) => {
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
});


if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../client/dist');
  app.use(express.static(distPath));

  // 👇 Catch-all route for React
  app.use((req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("server is running");
})