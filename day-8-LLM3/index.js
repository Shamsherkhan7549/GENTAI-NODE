const {GoogleGenAI} = require('@google/genai');
const dotenv = require('dotenv');
const {writeFileSync,readFileSync} = require('fs');
const { parse } = require('path');


dotenv.config();

const googleClient =  new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

let dataArray = [];

async function generateEmbedding(dataArray){
    const response = await googleClient.models.embedContent({
        model:"gemini-embedding-001",
        contents:dataArray
    })

    return response.embeddings
    
}

function generateJsonFile(embededData, jsonFile){
    const allEmbededData = embededData.map((item, index)=>{
        return {
            input:dataArray[index], embeddings:item.values
        }
    })

    writeFileSync(jsonFile, JSON.stringify(allEmbededData));
}

async function readFile(){
    const data = readFileSync('data.json');
    dataArray = JSON.parse(data);

    const embededData = await generateEmbedding(dataArray);
    
    generateJsonFile(embededData, 'embededData.json')
    
}

readFile();

