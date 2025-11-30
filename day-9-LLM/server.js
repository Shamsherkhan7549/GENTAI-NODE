import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { CloudClient } from 'chromadb';


dotenv.config();

const googleClient = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

async function createEmbedding(noun) {
    const response = await googleClient.models.embedContent({
        model:"gemini-embedding-001",
        contents:noun
    })
    return response.embeddings[0].values
}


const chromaClient = new CloudClient({
    apiKey:process.env.CHROMA_API_KEY,
    tenant:process.env.CHROMA_TENANT,
    database:process.env.CHROMA_DATABASE
});

async function connectChroma(){
    const noun = "pegion"
    const id = "3"
   const embededData = await createEmbedding(noun);

   const chromaConnectioinRes =  await chromaClient.getOrCreateCollection({
        name:"birds"
    });
    
    chromaConnectioinRes.add({
        ids:[id],
        documents:[noun],
        embeddings:[embededData]
    })
    
    console.log("collection name = ", chromaConnectioinRes._name);
    
}

connectChroma();