import express from 'express';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';
import { context, MAX_HISTORY } from './store.js';
import cors from 'cors';

dotenv.config();

const port = 8000;
const app = express();

app.use(cors({
    origin: process.env.VITE_FRONTEND_URL,
    methods: ["GET", "POST"],
    Credential: true
}));

app.use(express.json());

// groq ai api

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY
});
const model = "llama-3.1-8b-instant";
const temperature = 0.1;


app.get('/', (req, res) => {
    res.json({ success: true, message: "This is home route" })
});

app.get('/chat', (req, res) => {
    try {
        return res.json({ success: true, answer: context });
    } catch (error) {
       return res.json({ success: false, message: error.message })
    }
});

app.post('/chat', async (req, res) => {
    try {
        const { question } = req.body;

        if (!question)
            return res.json({ success: false, message: "Ask your questions , I am here to help." });

        context.push({ role: "user", content: question })

        // if (context.length > MAX_HISTORY) {
        //     context.splice(0, context.length - MAX_HISTORY)
        // }

        const messageApi = [
            {
                role: "system", content: "keep your answer short and simple"
            },
            ...context
        ]

        const completion = await client.chat.completions.create({
            model,
            temperature,
            messages: messageApi
        });

        context.push({ role: "assistant", content: completion.choices[0].message.content })

        console.log(completion.choices[0].message.content);


        return res.json({ success: true, answer: context });

    } catch (error) {
        return res.json({ success: false, message: error.message });

    }
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})