const {GoogleGenAI} = require('@google/genai');
const dotenv = require('dotenv');
const {writeFileSync} = require('fs')

dotenv.config();

const googleiClient =  new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

const data = ["dog", "apple", "cat", "banana", "parrot","pegion"]

async function main(){
    const response = await googleiClient.models.embedContent({
        model:'gemini-embedding-001',
        contents:data
    });


    const manageEmbeddings = response.embeddings.map((item,index)=>{
        return {
            [data[index]]:item.values
        }
    })

    // console.log(response.embeddings);
    // console.log(manageEmbeddings);
    
    writeFileSync("data.json", JSON.stringify(manageEmbeddings));
    
}

main();