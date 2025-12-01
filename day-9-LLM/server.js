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

async function connectChroma(id, noun){
   
   const embededData = await createEmbedding(noun);

   const chromaConnectionRes =  await chromaClient.getOrCreateCollection({
        name:"birds"
    });
    
    chromaConnectionRes.add({
        ids:[id],
        documents:[noun],
        embeddings:[embededData]
    })
    
    console.log("collection name = ", chromaConnectionRes._name);    
    
}

// connectChroma("4", "cat");

async function searchQuery(query) {
    const embeddingForSearch = await createEmbedding(query);

    const collection = await chromaClient.getCollection({
        name: "birds"
    })

    const result = await collection.query({
        queryEmbeddings:[embeddingForSearch],
        nResults:1
    })

    console.log("resutlt: ", result);
}
 searchQuery("give me animal name")

