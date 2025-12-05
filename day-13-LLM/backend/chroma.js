import { CloudClient } from 'chromadb';
import dotenv from 'dotenv';
import {generateEmbedding, main} from './gemini.js';
import findMaches from './utils/textMatch.js';


dotenv.config();


const chromaClient = new CloudClient({
    apiKey: process.env.CHROMA_API_KEY,
    tenant: process.env.CHROMA_TENANT,
    database: process.env.CHROMA_DATABASE,
});

async function searchQuery(userQuery) {

    const collection = await chromaClient.getOrCreateCollection({
        name: "my_collection"
    });

    const embeddedData = await generateEmbedding(userQuery);

    const result = await collection.query({
        nResults: 5,
        queryEmbeddings: [embeddedData]
    });

    const documents = result.documents[0];
    const ids = result.ids[0];
    const distances = result.distances[0];

    // Prepare sources array to send to UI
    const sources = documents.map((ele, idx) => {
        const matchWords = findMaches(ele, userQuery);
        
        return {
            id:ids[idx],
            text: ele,
            score: distances[idx],
            matches: matchWords
        }
    });   

    const contextBlock = sources
        .map(
            (s, i) =>
                `Source ${i + 1} (${s.id}):\n${s.text}\n`
        ).join("\n\n");

    const prompt = `You are a RAG assistant. Answer using ONLY the context
        CONTEXT:
        ${contextBlock}
        QUESTION:
        ${userQuery}
        If answer not found, say "I don't know".
    `;
    const response = {
        result: await main(prompt, userQuery) ,
        sources:sources
    } 
    
    
    return response;
};

export default searchQuery;
