import { configDotenv } from "dotenv";
configDotenv();
import { GoogleGenAI } from "@google/genai";

const googleClient = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

async function main(question, sysPrompts){
    const res = await googleClient.models.generateContent({
        model:"gemini-2.5-flash",
        contents:question,
        config:{
            systemInstruction:sysPrompts
        }
    });

    console.log(res.text);
    
};

const docs = "Java is platform independent because of JVM."

const sysPrompts = `
    You are a helpful assistant for a RAG system.
    RULES:
    - Answer ONLY using the information in the <context>.
    - If answer not present, say "I don't know".
    - Don’t guess or use outside knowledge.

    <context>
    ${docs}
`

main(sysPrompts, "what is js?")