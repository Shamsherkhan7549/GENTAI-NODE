import { CloudClient } from "chromadb";
import { GoogleGenAI } from "@google/genai";
import { configDotenv } from "dotenv";

configDotenv();


const googleClient = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
const chromaClient = new CloudClient({
    apiKey:process.env.CHROMA_API_KEY,
    tenant:process.env.CHROMA_TENANT,
    database:process.env.CHROMA_DATABASE,
});

async function generateEmbedding(params){
    const embeddedData = await googleClient.models.embedContent({
        model:"gemini-embedding-001",
        contents:params
    });
    return embeddedData.embeddings[0].values;
};

async function getCollection(){
    const collection = chromaClient.getOrCreateCollection({
        name:"my_collection"
    });
    return collection;
};

async function main(systemPrompts, userQuestion) {  
    const response = await googleClient.models.generateContent({
        model:"gemini-2.5-flash",
        contents:userQuestion,
        config:{
            systemInstruction:systemPrompts
        }
    });
    return response.text;
};


async function run(question) {
    const embeddedData = await generateEmbedding(question);
    const collection = await getCollection();
    
    const result  = await collection.query({
        queryEmbeddings:[embeddedData],
        nResults:1
    })

    const passage = result.documents[0]
    const systemPrompts = `
        You are a RAG assistant.
        Use only the context provided.
        If answer not found in context --> say "Not found in documents".
        
        Context:
       ${passage.map((item, index) => `(--> ${index + 1}) ${item}`).join('\n')}

    `
   return await main(systemPrompts, question);
}

export default  run;