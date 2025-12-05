import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import searchQuery from './chroma.js';

dotenv.config();

const port = 8000;
const app = express();

app.use(cors({
    origin: process.env.VITE_FRONTEND_URL,
    methods: ["GET", "POST"],
    Credential: true
}));

app.use(express.json());


// rest api routes
app.get('/', (req, res) => {
    res.json({ success: true, message: "This is home route" })
});

app.post('/chat', async (req, res) => {
    try {
        const { question } = req.body;
        if (!question)
            return res.json({ success: false, message: "Ask your questions , I am here to help." });

        const result = await searchQuery(question)

        return res.json({ success: true, answer: result });

    } catch (error) {
        return res.json({ success: false, message: error.message });

    }
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})