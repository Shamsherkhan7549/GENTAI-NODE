import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// gemini api 
const googleClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


async function generateEmbedding(userQuery){
    const response = await googleClient.models.embedContent({
        model:"gemini-embedding-001",
        contents:userQuery,
    });
    return response.embeddings[0].values;   
}

async function main(systemPrompts, userQuery){
    const response = await googleClient.models.generateContent({
        model:"gemini-2.5-flash",
        contents:userQuery,
        config:{
            systemInstruction:systemPrompts
        }
    });
    return response.text
}

export {generateEmbedding, main};