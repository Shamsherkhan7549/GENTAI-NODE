
# 📌 MERN Project — Local Chat App using Groq SDK (Minor Project)
    This is a minor MERN project that demonstrates how to build a simple AI Chat Application using:
    Express.js
    React.js
    Node.js
    Groq SDK (LLAMA 3.1 Models)

    The project allows users to send messages from a React frontend, post them to a backend /chat endpoint, and receive AI-generated replies.

# 🚀 Features

    ✔  React Chat UI Similar to chatgpt
    ✔ Backend /chat API using Groq SDK
    ✔ Sends user prompt → Receives AI response
    ✔ End-to-end working MERN pipeline
    ✔ Easy to extend (authentication, DB storage, chat history, etc.)

#    | Layer    | Technology                          |
    | -------- | ----------------------------------- |
    | Frontend | React + Axios                       |
    | Backend  | Node.js, Express.js                 |
    | AI Model | Groq SDK (LLaMA 3.1)                |


#    project/
    ├── backend/
    │    └── index.js
    |    └── store.js

    ├── frontend/
    │    └── src/
    │         └── App.jsx
    └── README.md

    git clone https://github.com/Shamsherkhan7549/GENTAI-NODE/tree/main/day-7-LLM

#   🧠 Groq SDK Usage Example
    const response = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: message }]
    });

# 🎯 What You Learned
    How to send user input from React
    How to call LLM models using Groq SDK
    How to build a simple MERN AI application
    How to create a functional end-to-end chat demo

#   📌 Future Improvements
        Store chat history in MongoDB
        Add login/signup
        Add streaming responses
        Add dark mode UI
        Deploy using Render / Vercel



