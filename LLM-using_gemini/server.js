import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const geminiClient = new GoogleGenAI({apiKey: process.env.GOOGLE_API_KEY});

async function generateContent() {
    try {
        const response = await geminiClient.models.generateContent({
            model: "gemini-2.5-flash",
            contents:"Tell me something about india",
            config:{
                // systemInstruction:"give answers in 20 words",
                temperature:2.0,

                // thinkingConfig:{
                //     includeThoughts:true, 
                //     thinkingBudget:100
                // }
            }
        })

        // console.log(response.candidates[0].content);// for thoughts included
        console.log(response.text); // for normal response
        
        
    } catch (error) {
        console.log("error : " , error);
        
    }
}

generateContent();