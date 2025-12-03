import run from './gemini.js';
import epxress from 'express';

const port = 8000;
const app = epxress();

app.use(epxress.json());

app.post('/query', async(req, res)=>{
    try {
        const {question} = req.body;
        console.log(question);
        
        const response = await run(question);
        res.json({success:"true", message:response});
        
    } catch (error) {
        res.json({success:"false", message:error.message});
    }
})

app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
})
run("what projects  shamsher khan has done?");
