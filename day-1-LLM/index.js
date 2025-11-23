import OpenAI from 'openai';
import { configDotenv } from 'dotenv';
configDotenv();

const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY, // This is the default and can be omitted
});

const completion = await client.chat.completions.create({
  model: 'gpt-4o',
  messages: [
    { role: 'developer', content: 'Talk like a pirate.' },
    { role: 'user', content: 'Are semicolons optional in JavaScript?' },
  ],
});

console.log(completion);

