const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const {writeFileSync} = require("fs");

async function main() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "text-embedding-004"   // correct embedding model
  });

  const response = await model.embedContent(
    "dog"
  );

//   console.log(response.embedding.values

  writeFileSync('./dog.json', JSON.stringify(response.embedding.values))
  console.log("Dimensions:", response.embedding.values.length);
}

main();
