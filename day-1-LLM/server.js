import { OpenAI } from "openai";
import { configDotenv } from "dotenv";

configDotenv();

const client = new OpenAI({
    apiKey:process.env.OPENAI_KEY
});
const model = "gpt-4o-mini";

const context = [
    {
        role:"system",
        content:"keep answers short and simple"
    }
]
 

async function runLLm(q){
    context.push({role:"user", content:q});
   const response = await client.responses.create({
    input:context,
    model,
    temperature:0.2,
    max_output_tokens:200,
    store:true
    
    });
   
    context.push({role:"assistant", content:response.output_text});
    console.log(context);
    
    console.log(response);
    
}

const oldRes = await client.responses.retrieve("resp_0b0fcb7e1746181c00691c5c9fa27881a3895b1da2f9dbc9f8");

console.log("oldRes ", oldRes);



//  ai answer
process.stdout.write("ask me anything: ");

process.stdin.on("data", (data)=>{
    const q = data.toString().trim();

    if(q==="exit"){
        process.exit()
    }else{
        runLLm(q)
    }
})

