import { GoogleGenAI } from "@google/genai";
import { CloudClient } from "chromadb";
import { configDotenv } from "dotenv";
import path from "path";;
import fs, { readFileSync } from "fs";
import { log } from "console";

configDotenv();

const googleClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const chromaClient = new CloudClient({
    apiKey: process.env.CHROMA_API_KEY,
    tenant: process.env.CHROMA_TENANT,
    database: process.env.CHROMA_DATABASE
});

async function getCollection() {
    const collection = chromaClient.getOrCreateCollection({
        name: "my_collection",
        metadata: { source: "my_dataset" },
    })

    return collection;
}

async function generateEmbedding(params) {
    const embeddedData = await googleClient.models.embedContent({
        model: "gemini-embedding-001",
        contents: params
    })

    return embeddedData.embeddings[0].values
}


async function run() {

    // Read Files

    const folder = './data';
    const files = fs.readdirSync(folder).filter(file => file.endsWith(".txt"));

    let ids = [];
    let documents = [];
    let embeddings = []

    for (let i = 0; i < files.length; i++) {
        const filePath = path.join(folder, files[i]); // this will make full path for each path

        const text = readFileSync(filePath, "utf-8")

        ids.push(`doc-${i + 1}`);
        documents.push(text);
        embeddings.push(await generateEmbedding(text))
    }

    const collection = await getCollection();

    const result = await collection.add({
        ids,
        documents,
        embeddings
    })

    log(result);
}

run();