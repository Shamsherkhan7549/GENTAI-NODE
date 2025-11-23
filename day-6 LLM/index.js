import express from "express";
import Groq from "groq-sdk";
import dotenv from "dotenv";
import { context, MAX_HISTORY } from './store.js';

dotenv.config();


const app = express();
const port = 8000;


app.use(express.json())

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const model = "llama-3.1-8b-instant";
const temperature = 0.1;
// const rules = `
// - Do NOT guess.
// - If the answer is not in the provided facts or context, say: “I don’t know based on the provided information.”
// - Use ONLY the facts given in the context.
// - Do NOT hallucinate new names, events, or numbers.
// - Keep answers short and accurate.
// - Follow the user instructions strictly while staying within provided facts.
// - If the user requests unsafe, harmful, or unknown information, politely refuse.
// `


app.post('/chat', async (req, res) => {
    try {
        const { question,facts } = req.body;

        if (!question) return res.json({ sucess: false, answer: "Please ask question" })

        context.push({ role: "user", content: question })

        const systemPrompt = `
            You are a precise and factual AI assistant.
            Follow only the facts provided below.
            If the facts are missing, say "I don't know based on the provided information."

            Facts:
            ${facts}
        `

        const messageApi = [
            {
                role: "system",
                content: systemPrompt
            },
            ...context
        ]



        const completion = await client.chat.completions.create({
            model,
            temperature,
            messages: messageApi,

        })

        context.push({role:"assistant", content:completion.choices[0].message.content})
        

        return res.json({ sucess: true, answer: completion.choices[0].message.content })


    } catch (error) {
        return res.json({ sucess: false, answer: "error found" })
    }
})





app.listen(port, () => {
    console.log(`server running on port ${port}`)
})