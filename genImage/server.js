const {GoogleGenAI} = require("@google/genai")
const dotenv = require("dotenv");
dotenv.config();


const client = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY})

async function main(){

    try {
        const response = await client.models.generateContent({
            model:"gemini-2.5-flash",
            contents:"what is js?"
        })

        console.log("-----------------------------down-----------------------------------------------");
        
        console.log(response.text);
        
     } catch (err) {
      console.error("---------------------------------error exist---------------------------------- ");
    }
}

// main();


const generateImage = async () => {
    try {
        const response = await client.models.generateImages({
        model:'imagen-3.0-generate-001',
        prompt:"robot holding a red sakteboard",
        config:{
            numberOfImages:1
        }        
    });

    console.log(response)

    } catch (error) {
        console.log(error.message); 
    };
}

generateImage();