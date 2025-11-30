import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { CloudClient } from 'chromadb';

dotenv.config();

const googleClient = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

const chromaClient = new CloudClient({
    apiKey:process.env.CHROMA_API_KEY,
    tenant:process.env.CHROMA_TENANT,
    database:process.env.CHROMA_DATABASE
});


async function connectChroma(){
   const chromaConnectioinRes =  await chromaClient.getOrCreateCollection({
        name:"my_collection3"
    }); 
    
    console.log("collection name = ", chromaConnectioinRes._name);
    
}

connectChroma();