import express from 'express';
import OpenAI from 'openai';
import { configDotenv } from 'dotenv';

configDotenv();

const app = express();
const port = 3000;

app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_KEY
})

console.log("---------------------------------------------------------------------------------------------");
// const response = await client.responses._chat.create({
//     InputItems:"hi",
//     model:"gpt-4o"
// })
const model = "gpt-4o-mini";


app.post("/chat", async (req, res) => {
    try {
        const {message} = req.body;
        
        if(!message) return res.json({success:false, message:"Please ask something"})
            
        const response = await client.responses.create({
            model,
            
            input:[
                {
                    role:"system",
                    content:"write only in bisfi context only in hinglish"
                },
                {
                    role:"user",
                    content:message
                }
            ]
        });

        return res.json({success:true, message:response.output_text});


        // const completion = await client.chat.completions.create({
        //     model,
        //     messages:[
        //         {
        //             role:"user",
        //             content:message
        //         }
        //     ]
        // });

        // console.log(completion.choices[0].message.content);
        // return res.json({success:true, answer:completion.choices[0].message.content});

    } catch (error) {
        return res.json({success:false, message:error.message})
    }
})



app.listen(port, () => {
    console.log(`server running on port ${port}`);

})