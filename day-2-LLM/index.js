import { configDotenv } from "dotenv";
import OpenAI from 'openai'

configDotenv();

const client = new OpenAI({
    apiKey: process.env.GROK_API_KEY
});

// console.log(client.completions.create);
// console.log("------------------------------");

const model = "grok-3.5-turbo";

async function runLLM(temperature) {
    const response = await client.chat.completions.create({
        model,
        temperature,
        messages: [
            {
                role: "user",
                content:"write 2 flowers name"
            }
        ]
    });

    console.log(response.choices[0].message);
    console.log("------------------------------");

}

await runLLM(0)
await runLLM(1)



