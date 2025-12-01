import { GoogleGenAI } from "@google/genai";
import { CloudClient } from "chromadb";
import { configDotenv } from "dotenv";

configDotenv();

const googleClient = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

const chromadbClient = new CloudClient({
    apiKey:process.env.CHROMA_API_KEY,
    tenant:process.env.CHROMA_TENANT,
    database:process.env.CHROMA_DATABASE
});

async function generateEmbedding(sentence){
    const response = await googleClient.models.embedContent({
        model:"gemini-embedding-001",
        contents:sentence
    });
    return response.embeddings[0].values;
};
// generateEmbedding("i am shamsher khan")

async function generateCollection() {
    const collection = await chromadbClient.getOrCreateCollection({
        name:"user"
    }); 
    return collection;
};

async function addDocuments(id, sentence){
    const embeddedSentence = await generateEmbedding(sentence);
    const collection = await generateCollection()
    const result = await collection.add({
        ids:[id],
        documents:[sentence],
        embeddings:[embeddedSentence]
    })
    
};
// addDocuments("5", "Anil is your friend");

async function searchQuery(question) {
    const embeddedContent = await generateEmbedding(question);
    const collection = await generateCollection();
    const result = await collection.query({
        queryEmbeddings:[embeddedContent],
        nResults:1
    })

    console.log("search result: ",  result);
}

searchQuery('what kind of vehicle anil own?')
