import express, { json } from 'express';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();
import {context, MAX_HISTORY} from './store.js';

const app = express();

const port = 3000;

app.use(json());

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY
});



// const response = await client.responses.create({   // grok does not have response endpoint
//     model:"llama-3.1-8b-instant",
//     input:"hi"
// })

// console.log(response);

app.post('/chat', async(req, res) => {

    try {
        const {message} = req.body;

        console.log(context.length);
        
        if(context.length>MAX_HISTORY){
            context.splice(0,(context.length - MAX_HISTORY)*2);
        }

        context.push({role:"user", content:message});

        const completion = await client.chat.completions.create({
            model: "llama-3.1-8b-instant",
            temperature:1,
            messages:context
        });
        context.push({role:"assistant", content: completion.choices[0].message.content});
        console.log(context);
        
        res.json({ success: true, answers: completion.choices[0].message.content});
    } catch (error) {
        res.json({ success: false, answers: error.message })
    }
});

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})